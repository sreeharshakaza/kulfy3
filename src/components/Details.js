import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import KulfyV3 from "../abis/KulfyV3.json";
import Navbars from "./Navbars";
import Kulfys from "./Kulfys";
import axios from "axios";
import ModelPopUp from "./ModelPopUp";
import ReactLoading from "react-loading";
import ReactDOM from "react-dom";
import { ethers } from "ethers";

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
class Details extends Component {
  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();

    let thread_id = "default_thread";
    let search = window.location.search;
    let params = new URLSearchParams(search);
    thread_id = params.get("id");
    console.log("thread_id ", thread_id);
    this.setState({ thread_id: thread_id });
  }

  submitMessage = async (e) => {
    e.preventDefault();

    const convoApiRoot = "https://theconvo.space/api";
    const convoApiToken = "CONVO";

    axios.defaults.headers.common = {
      "Content-Type": "application/json",
    };

    let thread_id = "default_thread";
    let search = window.location.search;
    let params = new URLSearchParams(search);
    thread_id = params.get("id");
    console.log("sumit message", this.state.thread_id);
    // Post Comment by threadId
    const postCommentsRequestPath = `/comments`;
    let postCommentsRequestBody = {
      token: this.state.token,
      signerAddress: this.state.account,
      comment: this.state.message,
      threadId: thread_id,
      url: encodeURIComponent("http://localhost:3000/kulfy"),
    };

    console.log(
      `send request to convo URL: ${convoApiRoot}${postCommentsRequestPath}?apikey=${convoApiToken} with data: ${JSON.stringify(
        postCommentsRequestBody
      )}`
    );
    const postCommentsResponse = await axios.post(
      `${convoApiRoot}${postCommentsRequestPath}?apikey=${convoApiToken}`,
      postCommentsRequestBody
    );
    console.log(
      `postComments Response from convo: ${JSON.stringify(
        postCommentsResponse
      )}`
    );
    this.state.message = "";

    await this.loadCommentList();
  };

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying ethereum based brower"
      );
    }
  }

  async tipKulfy(id) {
    console.log("tip item kulfy ", id, this.state.account);
    this.setState({
      inputItem: id,
    });
    this.child.current.setInputitemValue(this.state.id);
    this.child.current.isShowModal(true);
    //this.setState({ showModalPopup: true });
    //this.tipKulfyOwner(id, "10");
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    //Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = KulfyV3.networks[networkId];
    if (networkData) {
      this.setState({ loading: true });
      const kulfyV3 = new web3.eth.Contract(KulfyV3.abi, networkData.address);
      console.log(`kulfyV3`, kulfyV3);
      this.setState({ kulfyV3 });
      const kulfiesCount = await kulfyV3.methods.tokenIds().call();
      //const kulfiesCount = 0
      console.log(`kulfiesCount`, kulfiesCount);
      this.setState({ kulfiesCount });

      let id = "";
      let search = window.location.search;
      let params = new URLSearchParams(search);
      id = params.get("id");

      this.state.id = id;
      const kulfy = await kulfyV3.methods.kulfys(id).call();

      console.log("nft kulfy ", kulfy);
      this.setState({ kulfy: kulfy });
      this.setState({ asset_url: kulfy.assetURI });
      this.setState({ kid: kulfy.kid });
      this.setState({ creator: kulfy.author });
      this.setState({ metadata: kulfy.tokenURI });
      this.setState({
        tipAmount: Web3.utils.fromWei(kulfy.tipAmount, "ether"),
      });

      const getKulfyAPI =
        "https://gateway.kulfyapp.com/V3/gifs/getKulfy?client=web&id=" +
        this.state.kid +
        "&language=all,telugu,tamil,hindi,malayalam,english";

      axios.defaults.headers.common = {
        "Content-Type": "application/json",
      };

      const postCommentsResponse = await axios.get(`${getKulfyAPI}`);
      console.log(
        `postComments Response from convo: ${JSON.stringify(
          postCommentsResponse
        )}`
      );

      const response = postCommentsResponse;
      this.state.kulfy = response.data.kulfy_info;
      this.setState({ loading: false });

      await this.loadsignature();
      await this.triggerOAuth();

      const getMetaDataResponse = await axios.get(`${kulfy.tokenURI}`);

      if (getMetaDataResponse.data.source != null) {
        //this.setState({chain:getMetaDataResponse.data.source.chain});
        this.setState({ chain: getMetaDataResponse.data.source.chain });
        this.setState({
          description: getMetaDataResponse.data.source.description,
        });
        this.setState({
          original_url: getMetaDataResponse.data.source.cached_file_url,
        });
      }
    } else {
      window.alert("Kulfy contarct not deployed to any network");
    }
  }

  async tipKulfyOwner(id, tipAmount) {
    this.state.kulfyV3.methods
      .tipKulfyOwner(id)
      .send({
        from: this.state.account,
        value: window.web3.utils.toWei("1", "Ether"),
      })
      .on("transactionHash", (hash) => {
        console.log("tans hash ", hash);
      });
  }
  isShowModal(state) {
    this.setState({ showModalPopup: state });
  }
  updateInputitemValue(evt) {
    this.setState({
      inputItem: evt.target.value,
    });
  }
  updateInputTipValue(evt) {
    this.setState({
      inputTip: evt.target.value,
    });
  }

  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      account: "",
      kulfyV3: "",
      kulfies: [],
      loading: false,
      kulfy: "",
      showModalPopup: false,
      inputTip: "1",
      inputItem: "",
    };
  }

  async shouldComponentUpdate() {
    console.log(`shouldComponentUpdate`);
  }

  async loadsignature() {
    if (
      sessionStorage.getItem("ConvoApiToken") == "" ||
      sessionStorage.getItem("ConvoApiToken") == null
    ) {
      let provider = new ethers.providers.Web3Provider(
        window.web3.currentProvider
      );
      let signer = provider.getSigner();
      let signerAddress = await signer.getAddress();
      this.setState({ signerAddress: signerAddress });
      const timestamp = Date.now();
      this.setState({ timestamp: timestamp });
      let data = `I allow this site to access my data on The Convo Space using the account ${signerAddress}. Timestamp:${timestamp}`;

      let signature = await provider.send("personal_sign", [
        ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data)),
        signerAddress.toLowerCase(),
      ]);

      this.setState({ signature: signature });

      const convoApiRoot = "https://theconvo.space/api";
      const convoApiToken = "CONVO";

      axios.defaults.headers.common = {
        "Content-Type": "application/json",
      };
      const authTokenRequestPath = "/auth";
      const authTokenRequestBody = {
        signature: this.state.signature,
        signerAddress: this.state.signerAddress,
        accountId: this.state.account,
        timestamp: this.state.timestamp,
        chain: "ethereum",
      };
      console.log(
        `send request to convo URL: ${convoApiRoot}${authTokenRequestPath}?apikey=CONVO with Data: ${JSON.stringify(
          authTokenRequestBody
        )}`
      );
      const authResponse = await axios.post(
        `${convoApiRoot}${authTokenRequestPath}?apikey=CONVO`,
        authTokenRequestBody
      );
      console.log(`auth Response from convo: ${JSON.stringify(authResponse)}`);
      this.authToken = authResponse.data.message;
      this.setState({ token: authResponse.data.message });
      this.setConvoApiToken(this.authToken);
    } else {
      this.setState({ token: sessionStorage.getItem("ConvoApiToken") });
      this.authToken = sessionStorage.getItem("ConvoApiToken");
    }
  }

  getInitialState = async () => {
    var ConvoApiToken = sessionStorage.getItem("ConvoApiToken") || "";
    return {
      ConvoApiToken: ConvoApiToken,
    };
  };

  setConvoApiToken = async (option) => {
    sessionStorage.setItem("ConvoApiToken", option);
    this.setState({ ConvoApiToken: option });
  };

  loadCommentList = async () => {
    const convoApiRoot = "https://theconvo.space/api";
    const convoApiToken = "CONVO";

    axios.defaults.headers.common = {
      "Content-Type": "application/json",
    };

    let thread_id = "default_thread";
    let search = window.location.search;
    let params = new URLSearchParams(search);
    thread_id = params.get("id");

    // Query threads
    const queryThreadsRequestPath = "/comments";
    // console.log(`send request to convo URL: ${convoApiRoot}${queryThreadsRequestPath}?apikey=${convoApiToken} with no data`);
    this.queryThreadsResponse = await axios.get(
      `${convoApiRoot}${queryThreadsRequestPath}?apikey=${convoApiToken}&threadId=${thread_id}`
    );
    this.setState({ threads: this.queryThreadsResponse.data });
    this.threads = this.queryThreadsResponse.data;
    //alert(JSON.stringify(this.threads));
    this.setState({ threads: this.threads });

    const listView = this.state.threads.map(function (item, index) {
      return (
        <>
          <div className="tread d-flex flex-row mt-3" height="300">
            <img
              src="https://cdn.kulfyapp.com/kelvin/dp.png"
              alt=""
              width="48"
              height="48"
              className="me-2"
            />
            <div className="context">
              <h6 className="username  color-text" style={{ color: "#FFE033" }}>
                @{item.author}
              </h6>
              <p className="message">{item.text}</p>
            </div>
          </div>
        </>
      );
    });
    console.log("listview ", listView);
    ReactDOM.render(listView, document.getElementById("threads-list"));
  };

  triggerOAuth = async () => {
    //alert(this.authToken);
    // Sample signature generation code using near-api-js.js
    const convoApiRoot = "https://theconvo.space/api";
    const convoApiToken = "CONVO";

    axios.defaults.headers.common = {
      "Content-Type": "application/json",
    };

    if (this.authToken == null || this.authToken == "") {
      this.loadsignature();
    }

    // Validate Token
    const validateTokenRequestPath = "/validateAuth";
    const validateTokenRequestBody = {
      signerAddress: this.state.account,
      token: this.authToken,
    };
    try {
      console.log(
        `send request to convo URL: ${convoApiRoot}${validateTokenRequestPath}?apikey=${convoApiToken} with data: ${JSON.stringify(
          validateTokenRequestBody
        )}`
      );
      const validateTokenResponse = await axios.post(
        `${convoApiRoot}${validateTokenRequestPath}?apikey=${convoApiToken}`,
        validateTokenRequestBody
      );
      console.log(
        `validateToken Response from convo: ${JSON.stringify(
          validateTokenResponse
        )}`
      );
    } catch (e) {
      console.log(`ValidateToken Failed:${e}`);
    }
    await this.loadCommentList();
  };

  render() {
    return (
      <>
        <Navbars />
        {this.state.loading ? (
          <div style={{ marginLeft: "47%", marginTop: "5%" }}>
            <ReactLoading
              type="spinningBubbles"
              color="#ffffff"
              height={100}
              width={70}
            />
          </div>
        ) : (
          <section className="container">
            <div className="row">
              <div className="col-md-6 ">
                <img
                  className="w-100 br-18"
                  src="./assets/images/sample-image.png"
                  alt=""
                />
                <div>
                  <img src="./assets/images/sample-user.svg" alt="" />
                  <video
                    autoPlay
                    loop
                    muted
                    width="480"
                    height="480"
                    controls
                    src={this.state.asset_url}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <div className="col-md-6 d-flex flex-column nft-details">
                <h1>{this.state.kulfy.name}</h1>
                <div className="info my-2">
                  <a href="#">
                    <img src="./assets/images/gifs_white.svg" alt="" />
                    <span>{this.state.kulfy.content_type}</span>
                  </a>
                </div>
                <div className="meta-info">
                  <div className="mt-2">
                    <a href="#" className="link-radium">
                      {this.state.creator}
                    </a>
                    <span>Created by</span>
                  </div>
                  <div className="mt-2">
                    <h6>Feb 17, 2022</h6>
                    <span>Created on</span>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <div>
                      <h6> {this.state.tipAmount} ONE</h6>
                      <span>Tips Received</span>
                    </div>
                    <button
                      className="btn-bluepink "
                      onClick={() => this.tipKulfy(this.state.id)}
                    >
                      Tip Creator
                    </button>
                  </div>
                </div>

                <hr />
                <div className="tips-list">
                  <div>
                    <span>0.1 ONE tipped on Feb 16th @ 10.02pm by</span>
                    <a href="#">0xBFddbD32848F8A1529131F50dDc30d9bc97727eA</a>
                  </div>
                  <div>
                    <span>0.1 ONE tipped on Feb 16th @ 10.02pm by</span>
                    <a href="#">0xBFddbD32848F8A1529131F50dDc30d9bc97727eA</a>
                  </div>
                  <div>
                    <span>0.1 ONE tipped on Feb 16th @ 10.02pm by</span>
                    <a href="#">0xBFddbD32848F8A1529131F50dDc30d9bc97727eA</a>
                  </div>
                  <div>
                    <span>0.1 ONE tipped on Feb 16th @ 10.02pm by</span>
                    <a href="#">0xBFddbD32848F8A1529131F50dDc30d9bc97727eA</a>
                  </div>
                  <div>
                    <span>0.1 ONE tipped on Feb 16th @ 10.02pm by</span>
                    <a href="#">0xBFddbD32848F8A1529131F50dDc30d9bc97727eA</a>
                  </div>
                </div>
                <hr />
                <div className="container">
                  <div className="row">
                    <div className="col-4 other-actions">
                      <span>Like</span>
                      <img src="../assets/images/remix-icon.svg" alt="" />
                    </div>
                    <div className="col-4 other-actions">
                      <span>Copy Link</span>
                      <img src="./assets/images/download-icon.svg" alt="" />
                    </div>
                    <div className="col-4 other-actions">
                      <span>Share</span>
                      <img src="./assets/images/share.svg" alt="" />
                    </div>
                  </div>
                  <div className="row accordion" id="accordionTags">
                    <div className="col text-left accordion-item bg-none border-none">
                      <span className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button bg-none"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        ></button>
                      </span>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionTags"
                      >
                        <div className="accordion-body">
                          <span>
                            <a href="">tagname</a>
                          </span>
                          <span>
                            <a href="">tagname</a>
                          </span>
                          <span>
                            <a href="">tagname</a>
                          </span>
                          <span>
                            <a href="">tagname</a>
                          </span>
                          <span>
                            <a href="">tagname</a>
                          </span>
                          <span>
                            <a href="">tagname</a>
                          </span>
                          <span>
                            <a href="">tagname</a>
                          </span>
                          <span>
                            <a href="">tagname</a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {this.state.description}
                {/*  <div className="nft-actions my-2">
                    <a href={this.state.original_url} target="blank">View Original</a>
                </div>   */}
                <div className="nft-actions my-2">
                  Tips Recieved: {this.state.tipAmount} ONE
                </div>
                <div className="nft-actions my-2">
                  Creator: {this.state.creator}
                </div>
                <div className="nft-actions my-2">
                  <a href={this.state.metadata} target="blank">
                    Metadata: {this.state.metadata}
                  </a>
                </div>
              </div>

              <div
                className="base-container page-wrapper"
                ref={this.props.containerRef}
              >
                {/* <Header /> */}
                <ul className="nav nav-pills nav-fill mt-2 mx-2 ">
                  {/* <li className="nav-item">
            <a className="nav-link active color-bg" aria-current="page" href={`/flow?id=${this.state.thread_id}`}>Impact Flow</a>
        </li> */}
                  {/* <li className="nav-item">
            <a className="nav-link text-white" href={`/convo?id=${this.state.thread_id}`}>Impact Discussion</a>
        </li> */}
                </ul>

                <div
                  className="container featured-grid"
                  ref={this.props.containerRef}
                  style={{ height: "20" }}
                >
                  <div
                    className="container featured-grid"
                    style={{ width: "100%", backgroundColor: "#808080" }}
                  >
                    <h4 className="section-h">Thoughts & Discussions:</h4>
                  </div>
                  <div className="container ">
                    <div className="discussions">
                      <div className="content">
                        <List id="threads-list">
                          <div className="tread d-flex flex-row mt-3">
                            <img
                              src="../assets/images/sample1.png"
                              alt=""
                              width="48"
                              height="48"
                              className="me-2"
                            />
                            <div className="context">
                              <a href="#" className="link-radium">
                                {this.state.creator}
                              </a>
                              <p className="message">
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Nesciunt ad totam debitis.
                                Ratione molestiae voluptatem pariatur doloribus
                                exercitationem nisi quae nihil! Officiis eaque
                                doloribus, ab incidunt esse labore laborum?
                                Consequatur.
                              </p>
                            </div>
                          </div>
                          <div className="tread d-flex flex-row mt-3">
                            <img
                              src="../assets/images/sample1.png"
                              alt=""
                              width="48"
                              height="48"
                              className="me-2"
                            />
                            <div className="context">
                              <a href="#" className="link-radium">
                                {this.state.creator}
                              </a>
                              <p className="message">
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Nesciunt ad totam debitis.
                                Ratione molestiae voluptatem pariatur doloribus
                                exercitationem nisi quae nihil! Officiis eaque
                                doloribus, ab incidunt esse labore laborum?
                                Consequatur.
                              </p>
                            </div>
                          </div>
                        </List>
                      </div>

                      <div className="send">
                        <input
                          type="text"
                          name="message"
                          className="send-msg"
                          onChange={(e) =>
                            this.setState({ message: e.target.value })
                          }
                          placeholder="Comment"
                          style={{ width: "60%" }}
                        />
                        <button
                          className="btn-radium "
                          onClick={this.submitMessage.bind(this)}
                        >
                          Send
                          <img
                            src="../assets/images/send-btn.svg "
                            alt=" "
                            width="46"
                            height="47"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container "></div>
              </div>
            </div>

            <ModelPopUp
              ref={this.child}
              account={this.state.account}
              showModalPopup={this.state.showModalPopup}
              kulfyV3={this.state.kulfyV3}
            />
          </section>
        )}
        <Kulfys />
      </>
    );
  }
}

export default Details;
