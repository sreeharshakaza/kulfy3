import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import KulfyV3 from "../abis/KulfyV3.json";
import axios from "axios";

import PinataSDK from "pinata-web-sdk";

import ReactLoading from 'react-loading';
const pinata = new PinataSDK(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxMDVhNmMwNy0yNDlmLTRlOTAtOWEwNC0yZDk0M2VmYjIwZTYiLCJlbWFpbCI6ImdpcmlzaGtvbGx1cmlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZX0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjkxNjk3MTAzZWRlYWFiOThlNDFlIiwic2NvcGVkS2V5U2VjcmV0IjoiYzMxNDc5MzZlN2RhZjNhOWY5MjBiMmFjMTQyNDgxNDcyZTY1ODY0NDAwNTRlOTg1YTU3ZGE0ZTY3MzIyY2JjYyIsImlhdCI6MTYzOTM5MzQ0Nn0.C7ERlKMw_9vJLQFQpC4K2ibNYciXh5Ms4xazOdxE2tw"
);

const { create, urlSource } = require("ipfs-http-client");
const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

const httpClient = axios.create();
httpClient.defaults.timeout = 500000;

class Mint extends Component {
  async componentDidMount() {
    await this.getKulfy();
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  /**
   * [getKulfy Get Kulfy metadata from Kulfy DB]
   */
  async getKulfy() {
    let kid = "";
    let search = window.location.search;
    let params = new URLSearchParams(search);
    kid = params.get("kid");
    this.state.kid = kid;

    this.setState({ loading: true });
    const getKulfyAPI =
      "https://gateway.kulfyapp.com/V3/gifs/getKulfy?client=web&id=" +
      kid +
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

    

    if(response.data.kulfy_info){
      this.state.kulfy = response.data.kulfy_info;
      this.setState({ loading: false });
    }else{
      this.getKulfy();
    }
    
    
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



  /**
   * [mintKulfy Upload assets and metadata to IPFS and mint Kulfy as NFT using ERC 721]
   */
  async mintKulfy() {

    //this.setState({ loading: true });
    const result = await ipfs.add(urlSource(this.state.kulfy.video_url));
    const asseturl = `https://ipfs.io/ipfs/${result.cid.toString()}`;
    let original = localStorage.getItem("NFT");
    original = JSON.parse(original);
    this.state.asset = asseturl;
    let body ={};


    body = {
      name: this.state.kulfy.name,
      tags: this.state.kulfy.category.join(),
      kid: this.state.kulfy.kid,
      image: asseturl,
      source: original,
    };

    if(this.state.kulfy.source_info){
      body.source = this.state.kulfy.source_info;
    }else{     
      body.source = original;
    }

    const options2 = {
      pinataMetadata: {
        name: `${this.state.kulfy.kid}-metadata`,
        keyvalues: {
        },
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };

    pinata
      .pinJSONToIPFS(body, options2)
      .then((result) => {
        var hash = result.IpfsHash;
        hash = `https://ipfs.io/ipfs/${hash}`;
        this.state.url = hash;
        console.log("ipfs url is", hash);
     
      this.state.kulfyV3.methods
      .mintNFT(this.state.account, this.state.url, this.state.asset, this.state.kid)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false });
         window.location.href = "/kulfys"
      });


      })
      .catch((err) => {
        //handle error here
        console.log(err);
      });
  }

  /**
   * [loadBlockchainData Load KulfyV3 contract locally]
   */
  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    //Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = KulfyV3.networks[networkId];
    if (networkData) {
      const kulfyV3 = new web3.eth.Contract(KulfyV3.abi, networkData.address);
      this.setState({ kulfyV3 }); 
      this.setState({ loading: false });
    } else {
      window.alert("Kulfy contarct not deployed to any network");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      kulfyV3: "",
      kulfies: [],
      loading: false,
      kulfy: "",
    };
  }

  render() {
    return (
      <>
      <header>
          <nav className="navbar  navbar-light bg-none">
            <div className="container-fluid justify-content-start">
              <a className="navbar-dp" href="/">
                <img
                  src="https://cdn.kulfyapp.com/kulfy/back-white.svg"
                  alt="back"
                />
              </a>
              <a className="navbar-logo" href="/">
                <img
                  className="creator"
                  src="https://cdn.kulfyapp.com/kulfy/kulfy-creator.svg"
                  alt="kulfy-creator-logo"
                />
              </a>
              <span className="navbar-text-right">Almost there!</span>
            </div>
          </nav>
        </header>
      {this.state.loading ? (
        <div style={{marginLeft:'47%',marginTop: '5%'}}>
          <ReactLoading type="spinningBubbles" color="#ffffff" height={100} width={70} />
        </div>
     
    ) :(
      <div className="body-to-margin">
        

        <section className="container">
          <div className="row">
            <div className="col-md-6 my-4">
              <img className="w-100" src={this.state.kulfy?this.state.kulfy.sticker_url:''} alt="" />
            </div>
            <div className="col-md-6 d-flex justify-content-between flex-column">
              <div className="form publish-form">
                <div className="form-group text-input-with-label my-3">
                  <label for="filename">
                    Name 
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="filename"
                    aria-describedby="filename"
                    value={this.state.kulfy?this.state.kulfy.name:''}
                    placeholder="Ex. Naku English Raadu"
                  />
                </div>
                <div className="form-group d-flex flex-column my-3">
                  <label for="tags my-2">Add Tags</label>
                  <input
                    type="text"
                    className="tag-input my-1"
                    name="tags"
                    id="tags"
                    value={this.state.kulfy?this.state.kulfy.category:''}
                    placeholder="Ex. Chiru, Happy, Comedy, LOL"
                  />

                </div>


              </div>
              <div className="bar-publish">      
                <div className="publish-actions">
                  {/* <button><img src="https://cdn.kulfyapp.com/kulfy/delete-white.svg" alt=""/></button> */}
                  <button type="submit" onClick={() => this.mintKulfy()}>
                    <span>Mint</span>
                  </button>
                  (This will take few seconds to upload)
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      )}
      </>
    );
  }
}

export default Mint;
