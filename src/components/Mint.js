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

class Mint extends Component {
  async componentDidMount() {
    await this.getKulfy();
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async getKulfy() {
    let kid = "";
    let search = window.location.search;
    let params = new URLSearchParams(search);
    kid = params.get("kid");
    this.state.kid = kid;

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
    //const response = await fetch('https://api.nftport.xyz/v0/search?text=india%20video&chain=all&order_by=relevance');

    console.log("resppoonse ", response.data.kulfy_info);

    // items = JSON.stringify(response.data);

    this.state.kulfy = response.data.kulfy_info;
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

  async processKulfy() {
   
  }

  async mintKulfy() {

       const result = await ipfs.add(urlSource(this.state.kulfy.video_url));
    const asseturl = `https://ipfs.io/ipfs/${result.cid.toString()}`;
    let original = localStorage.getItem("NFT");
    original = JSON.parse(original);
    this.state.asset = asseturl;
    const body = {
      name: this.state.kulfy.name,
      tags: this.state.kulfy.category.join(),
      kid: this.state.kulfy.kid,
      image: asseturl,
      source: original,
    };

    const options2 = {
      pinataMetadata: {
        name: `${this.state.kulfy.kid}-metadata`,
        keyvalues: {
          customKey: "customValue",
          customKey2: "customValue2",
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
      this.setState({ loading: true });
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
      const kulfiesCount = await kulfyV3.methods
        .balanceOf(this.state.account)
        .call();
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

  tipKulfyOwner(id, tipAmount) {
    this.setState({ loading: true });
    this.state.kulfyV3.methods
      .tipKulfyOwner(id)
      .send({
        from: this.state.account,
        value: tipAmount,
      })
      .on("transactionHash", (hash) => {
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
      <div class="body-to-margin">
        <header>
          <nav class="navbar  navbar-light bg-none">
            <div class="container-fluid justify-content-start">
              <a class="navbar-dp" href="/">
                <img
                  src="https://cdn.kulfyapp.com/kulfy/back-white.svg"
                  alt="back"
                />
              </a>
              <a class="navbar-logo" href="/">
                <img
                  class="creator"
                  src="https://cdn.kulfyapp.com/kulfy/kulfy-creator.svg"
                  alt="kulfy-creator-logo"
                />
              </a>
              <span class="navbar-text-right">Almost there!</span>
            </div>
          </nav>
        </header>

        <section class="container">
          <div class="row">
            <div class="col-md-6 my-4">
              <img class="w-100" src={this.state.kulfy.sticker_url} alt="" />
            </div>
            <div class="col-md-6 d-flex justify-content-between flex-column">
              <div class="form publish-form">
                <div class="form-group text-input-with-label my-3">
                  <label for="filename">
                    File Name - {this.state.kulfy.kid}
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="filename"
                    aria-describedby="filename"
                    value={this.state.kulfy.name}
                    placeholder="Ex. Naku English Raadu"
                  />
                </div>
                <div class="form-group d-flex flex-column my-3">
                  <label for="tags my-2">Add Tags</label>
                  <input
                    type="text"
                    class="tag-input my-1"
                    name="tags"
                    id="tags"
                    placeholder="Ex. Chiru, Happy, Comedy, LOL"
                  />
                  <div class="tags-list  my-1">
                    <span>
                      {this.state.kulfy.category}
                      <a href="#">
                        <img
                          src="https://cdn.kulfyapp.com/kulfy/delete-circle-small.svg"
                          width="8px"
                          alt=""
                        />
                      </a>
                    </span>
                  </div>
                </div>

  
              </div>
              <div class="bar-publish">
                <div class="publish-actions">
                  {/* <button><img src="https://cdn.kulfyapp.com/kulfy/delete-white.svg" alt=""/></button> */}
                  <button type="submit" onClick={() => this.processKulfy()}>
                    {" "}
                    <span>Process</span>
                  </button>
                </div>
                <div class="publish-actions">
                  {/* <button><img src="https://cdn.kulfyapp.com/kulfy/delete-white.svg" alt=""/></button> */}
                  <button type="submit" onClick={() => this.mintKulfy()}>
                    <span>Mint</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Mint;
