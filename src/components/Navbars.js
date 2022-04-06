import React, { Component } from "react";
import { ReactComponent as UserProfile } from "../assets/images/dp.svg";
import { ReactComponent as Logo } from "../assets/images/logo_green.svg";
import { ReactComponent as NavHam } from "../assets/images/hamburger.svg";
import Identicon from "react-identicons";
import Web3 from "web3";
import MetaTags from "react-meta-tags";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


class Navbars extends Component {
  async AddToMetaMask() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.web3 = new Web3(window.ethereum);
    }
    if (typeof window.web3 !== "undefined") {
      var network = 0;
      network = await window.web3.eth.net.getId();
      console.log(network.toString());
      var params;

      if (network.toString() == "1666700000") {
        alert("Kulfy Network has already been added to Metamask.");
        return;
      } else {
        params = [
          {
            chainId: "0x6357D2E0",
            chainName: "Harmony Testnet",
            nativeCurrency: {
              name: "ONE",
              symbol: "ONE",
              decimals: 18,
            },
            rpcUrls: ["https://api.s0.b.hmny.io"],
            blockExplorerUrls: ["https://explorer.pops.one/"],
          },
        ];
      }

      window.ethereum
        .request({ method: "wallet_addEthereumChain", params })
        .then(() => console.log("Success"))
        .catch((error) => console.log("Error", error.message));
    } else {
      alert("Unable to locate a compatible web3 browser!");
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
          <Navbar className="navbar navbar-light bg-none mb-3" collapseOnSelect expand="xl" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
      <Logo />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className=" navbar-collapse">
          <Nav.Link href="#" className="mx-2 nav-links " onClick={() => this.AddToMetaMask()}> Add MetaMask Network</Nav.Link>
          <Nav.Link href="https://kulfyapp.com/" className="mx-2 nav-links " target="_blank">App</Nav.Link>
          <Nav.Link href="/docs?id=documentation" className="mx-2 nav-links " >Docs</Nav.Link>
          <Nav.Link href="/UserProfile" className="mx-2 nav-links " >My Kulfys</Nav.Link>
          <Nav.Link href="/create" className="mx-2 nav-links ">Create</Nav.Link>
          <Nav.Link href="#" className="mx-2 nav-links "><Identicon string="randomness" size="25" /></Nav.Link>
          
        </Nav>
       
      </Navbar.Collapse>
    </Navbar>
          
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
                  <a href="https://twitter.com/kulfyapp" target="blank">
                    Twitter
                  </a>
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

export default Navbars;
