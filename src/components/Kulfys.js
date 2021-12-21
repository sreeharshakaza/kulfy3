import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import KulfyV3 from "../abis/KulfyV3.json";
import Navbar from "./Navbar";
import axios from "axios";

import PinataSDK from "pinata-web-sdk";

const pinata = new PinataSDK(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxMDVhNmMwNy0yNDlmLTRlOTAtOWEwNC0yZDk0M2VmYjIwZTYiLCJlbWFpbCI6ImdpcmlzaGtvbGx1cmlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZX0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjkxNjk3MTAzZWRlYWFiOThlNDFlIiwic2NvcGVkS2V5U2VjcmV0IjoiYzMxNDc5MzZlN2RhZjNhOWY5MjBiMmFjMTQyNDgxNDcyZTY1ODY0NDAwNTRlOTg1YTU3ZGE0ZTY3MzIyY2JjYyIsImlhdCI6MTYzOTM5MzQ0Nn0.C7ERlKMw_9vJLQFQpC4K2ibNYciXh5Ms4xazOdxE2tw"
);

const { create, urlSource } = require("ipfs-http-client");
const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

const httpClient = axios.create();
httpClient.defaults.timeout = 500000;

class Kulfys extends Component {
  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

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
    this.tipKulfyOwner(id, "10");
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    //Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = KulfyV3.networks[networkId];
    if (networkData) {
      const kulfyV3 = new web3.eth.Contract(KulfyV3.abi, networkData.address);
      console.log(`kulfyV3`, kulfyV3);
      this.setState({ kulfyV3 });
      const kulfiesCount = await kulfyV3.methods.tokenIds().call();
      //const kulfiesCount = 0
      console.log(`kulfiesCount`, kulfiesCount);
      this.setState({ kulfiesCount });

      // Load Images
      for (let i = 1; i <= kulfiesCount; i++) {
        //get tokenURI from contract
        const ipfs_metadata = await kulfyV3.methods.tokenURI(i).call();
        console.log("ipfs_metadata ", ipfs_metadata);

        //get owner of
        const owner_address = await kulfyV3.methods.ownerOf(i).call();
        console.log("ipfs_metadata ", ipfs_metadata, i, owner_address);

        const kulfy = await kulfyV3.methods.kulfies(i).call();
        this.setState({
          kulfies: [...this.state.kulfies, kulfy],
        });
      }
      console.log(this.state.kulfies);
      this.setState({ loading: false });
    } else {
      window.alert("Kulfy contarct not deployed to any network");
    }
  }

  async tipKulfyOwner(id, tipAmount) {
    this.setState({ loading: true });
    this.state.kulfyV3.methods
      .tipKulfyOwner(id)
      .send({
        from: this.state.account,
        value: window.web3.utils.toWei("1", "Ether"),
      })
      .on("transactionHash", (hash) => {
        console.log("tans hash ", hash);
        this.setState({ loading: false });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      kulfyV3: "",
      kulfies: [],
      loading: true,
      kulfy: "",
    };
  }

  render() {
    return (
      <>
        <section class="container featured-grid">
          <div class="row d-flex justify-content-between">
            <div class="col-6">
              <button
                class="btn btn-outline-secondary dropdown-toggle filter-featured"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                FEATURED GIFS
                <img
                  src="https://cdn.kulfyapp.com/kulfy/downarrow_2.svg"
                  alt=""
                  class="dropdown-arrow2"
                />
              </button>
              <ul class="dropdown-menu dropdown-menu-featured bg-color2">
                <li>
                  <a class="dropdown-item" href="#">
                    FRESH-IN
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    POPULAR
                  </a>
                </li>
              </ul>
            </div>
            {/* <div class="col-2">
              <button
                type="button"
                class="btn btn-primary border-none bg-none"
                data-bs-toggle="button"
                autocomplete="off"
              >
                <img
                  src="https://cdn.kulfyapp.com/kulfy/grid_play.svg"
                  alt=""
                  class="language-icon"
                />
              </button>
            </div> */}
          </div>
          <div class="row p-05">
            {this.state.kulfies.map((item, index) => {
              return (
                <>
                  <div class="col-6 col-md-4 col-lg-3 grid-item">
                    <div class="grid-image">
                    <a href={'/kulfy?id='+item.id} >
                      <video
                        autoPlay
                        loop
                        muted
                        width="320"
                        height="240"
                        
                      >
                        <source src={item.assetURI} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      </a>

                      {/* <div class="grid-info">
                        <div>
                          <img
                            src="https://cdn.kulfyapp.com/kulfy/gifs_stack.svg"
                            alt=""
                          />
                          <span>GIF</span>
                          <span>16s</span>
                        </div>
                        <button
                          type="button"
                          class="btn btn-primary border-none btn-bookmark "
                          data-bs-toggle="button"
                          autocomplete="off"
                        >
                          <img
                            src="https://cdn.kulfyapp.com/kulfy/bookmarks_small.svg"
                            alt=""
                            class="language-icon"
                          />
                        </button>
                      </div> */}
                    </div>
                    <div class="grid-item-details">
                     <a href={'https://kulfyapp.com/kulfy/'+item.kid} target="blank" > <h6>Kulfy: {item.kid}</h6></a>
                      <h6>tip: {item.tipAmount}</h6>
                    <a href={'/kulfy?id='+item.id} >  <h6>id: {item.id}</h6></a>
                     <h6><a href={item.tokenURI} target="blank" >Token URI: {item.tokenURI}</a></h6>
                      <hr />
                      <div class="user-details">
                        <a
                          href="#"
                          className="btn-create "
                          onClick={() => this.tipKulfy(item.id)}
                        >
                          Tip Kulfy
                        </a>
                        {/* <button onClick={() => this.tipKulfy(item.id)}>
                          tip kulfy
                        </button> */}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </>
    );
  }
}

export default Kulfys;
