import React, { Component } from "react";
import { ReactComponent as UserProfile } from "../assets/images/dp.svg";
import { ReactComponent as Logo } from "../assets/images/logo_green.svg";
import { ReactComponent as NavHam } from "../assets/images/hamburger.svg";
import Identicon from 'react-identicons';
import Web3 from "web3";
import  MetaTags from 'react-meta-tags';

class Navbar extends Component {
  async AddToMetaMask() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.web3 = new Web3(window.ethereum);
    }
    if (typeof window.web3  !== 'undefined') {
      var network = 0;
      network = await window.web3.eth.net.getId();
      console.log(network.toString())
      var params;
   
   /*   
          if (network.toString() == "1666700000") {
              alert("Harmony Network has already been added to Metamask.");
              return;
          } else {
              params = [{
                  chainId: '0x63564C40',
                  chainName: 'Harmony Testnet',
                  nativeCurrency: {
                      name: 'ONE',
                      symbol: 'ONE',
                      decimals: 18
                  },
                  rpcUrls: ['https://api.s0.b.hmny.io'],
                  blockExplorerUrls: ['https://explorer.pops.one/']
              }]
          }
          */
         
          if (network.toString() == "1666600000") {
              alert("Harmony Mainnet has already been added to Metamask.");
              return;
          } else {
              params = [{
                  chainId: '0x63564C40',
                  chainName: 'Harmony Mainnet',
                  nativeCurrency: {
                      name: 'ONE',
                      symbol: 'ONE',
                      decimals: 18
                  },
                  rpcUrls: ['https://api.harmony.one'],
                  blockExplorerUrls: ['https://explorer.harmony.one/']
              }]
          }
      

      window.ethereum.request({ method: 'wallet_addEthereumChain', params    })
          .then(() => console.log('Success'))
          .catch((error) => console.log("Error", error.message));
  } else {
      alert('Unable to locate a compatible web3 browser!');
  }

  }
  render() {
    return (
      <>
      <div>
      <MetaTags>
            <title>Kulfy - Minting Memes from NFTs</title>
            <meta name="description" content="Some kulfy description." />
            <meta property="og:title" content="MyApp Kulfy" />
          </MetaTags>
        <nav className="navbar  navbar-light bg-none mb-3">
          <div className="container-fluid">
            <a href="/" className="navbar-logo mx-2">
              <Logo />
            </a>
          
            <div>
            <a href='#' className="mx-2 nav-links" onClick={() => this.AddToMetaMask()}>
                Add Harmony Network
              </a>
              <a href='https://kulfyapp.com/' target='_blank' className="mx-2 nav-links ">
                App
              </a>
              <a href='/docs?id=documentation' className="mx-2 nav-links ">
                Docs 
              </a>
              <a href="/UserProfile" className="mx-2 nav-links">
                My Kulfys
              </a>
              <a href="/MyNFTs" className="mx-2 nav-links">
                myNFTs
              </a>
              <a href="/creator" className="mx-2 btn-create">
                Create
              </a>
              <a href="#" className="mx-2 nav-links">
              <Identicon string="randomness" size="25"/>
              </a>
     {/*          <a href="/UserProfile" className="navbar-dp mx-3">
                <UserProfile />
                <small id="account">{this.props.account}</small>
              </a>

              <a href="/" className="navbar-ham">
                <NavHam />
              </a> */}
            </div>
          </div>
        </nav>
        {/* <div className="container">
          <div className="row">
            <div className="col">
              <div className="input-group mb-3">
                <span
                  className="input-group-text searchbar-icon"
                  id="addon-wrapping"
                >
                  <img src="https://cdn.kulfyapp.com/kulfy/search.svg" alt="" />
                </span>
                <input
                  type="text"
                  className="form-control searchbar-text"
                  aria-label="Text input with dropdown button"
                />
                <button
                  className="btn btn-outline-secondary dropdown-toggle language-select"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://cdn.kulfyapp.com/kulfy/letter_english.svg"
                    alt=""
                    className="language-icon"
                  />
                  <img
                    src="https://cdn.kulfyapp.com/kulfy/downarrow_2.svg"
                    alt=""
                    className="dropdown-arrow2"
                  />
                </button>
                <ul className="dropdown-menu dropdown-menu-language bg-color2">
                  <li>
                    <button className="dropdown-item">
                      <img
                        src="https://cdn.kulfyapp.com/kulfy/letter_english.svg"
                        alt=""
                      />
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item">
                      <img
                        src="https://cdn.kulfyapp.com/kulfy/letter_telugu.svg"
                        alt=""
                      />
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item">
                      <img
                        src="https://cdn.kulfyapp.com/kulfy/letter_tamil.svg"
                        alt=""
                      />
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item">
                      <img
                        src="https://cdn.kulfyapp.com/kulfy/letter_malayalam.svg"
                        alt=""
                      />
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item">
                      <img
                        src="https://cdn.kulfyapp.com/kulfy/letter_hindi.svg"
                        alt=""
                      />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div> */}

        <footer className="footer mt-auto py-2 bg-dark fixed-bottom">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <span className="text-muted">© Copyright 2021 Kulfy Inc</span>
              </div>
              <div className="col-6">
                <a href="https://twitter.com/kulfyapp" target="blank">Twitter</a>
                <a href="https://discord.gg/Su4m642a">Discord</a>
                <a href="https://t.me/KulfyGifs">Telegram</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
      </>
    );
  }
}

export default Navbar;
