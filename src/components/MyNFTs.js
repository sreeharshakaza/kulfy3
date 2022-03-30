import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import Navbar from "./Navbar";
import KulfyV3 from "../abis/KulfyV3.json";
import { Modal } from 'react-bootstrap';
import ModelPopUp from './ModelPopUp';
import ReactLoading from 'react-loading';

class MyNFTs extends Component {

  async componentDidMount() {
    await this.loadWeb3();
    //await this.loadBlockchainData();
    await this.getMoviesFromApi();
    
  }
  async  getMoviesFromApi() {
    try {
      const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    let ApiURL='https://api.kulfyapp.com/V3/gifs/search?client=keyword_ios&exact=true&sort=latest&keyword=polygon&skip=0&limit=20&content=image&language=english&address='+this.state.account +'&nft=true';
    console.log(ApiURL);
      let response = await fetch(ApiURL,
      );
      let responseJson = await response.json();
      console.log(responseJson);
      this.setState({ kulfyList: responseJson })

      console.log("test");
      console.log(this.state.kulfyList.data.length);

      for(let i=0; i<(this.state.kulfyList.data.length); i++)
      {
        console.log(this.state.kulfyList.data[i].image_url);
        if(this.state.kulfyList.data[i].image_url!=null)
        {
        this.setState({
          kulfies: [...this.state.kulfies, this.state.kulfyList.data[i]],
                      });
        }
       
      }

      return responseJson;
    } catch (error) {
      console.error(error);
    }
    //alert(this.state.kulfyList);
   

  }
  /**
   * [loadWeb3 Connecting to web3]
   * 
   */
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
    this.setState({
      inputItem: id
    });
     this.child.current.setInputitemValue (this.state.account)
     this.child.current.isShowModal(true);
    //this.setState({ showModalPopup: true });
    //this.tipKulfyAuthor(id, "10");
  }


  /**
   * [tipKulfyOwner Transfer tip amount to Kulfy author]
   * @param  {[type]} id        [tokenId of the NFT in contract]
   * @param  {[type]} tipAmount [amount to be transferred]
   */
  async tipKulfyAuthor(id, tipAmount) {
    this.isShowModal(false)
    this.state.kulfyV3.methods
      .tipKulfyAuthor(id,5000)
      .send({
        from: this.state.account,
        value: window.web3.utils.toWei(tipAmount, "Ether"),
      })
      .on("transactionHash", (hash) => {
        console.log("tans hash ", hash);
      });
  }
  isShowModal(state)
  {
    this.setState({ showModalPopup: state });
  }
  updateInputitemValue(evt) {
  
    this.setState({
      inputItem: evt.target.value
    });
  }
  updateInputTipValue(evt) {
 
    this.setState({
      inputTip:  evt.target.value
    });
  }
  constructor(props) {
    super(props);
    this.child=React.createRef();
    this.state = {
      account: "",
      kulfyV3: "",
      kulfies: [],
      loading: false,
      kulfy: "",
      showModalPopup: false,
      inputTip:"1",
      inputItem:""
    };
  }

  

  render() {
    return (
      <>
      <Navbar />
        {this.state.loading ? (
          <div style={{marginLeft:'47%',marginTop: '5%'}}>
            <ReactLoading type="spinningBubbles" color="#ffffff" height={100} width={70} />
          </div>
       
      ) :(
        <section class="container featured-grid">
          <div class="row d-flex justify-content-between">
            <div class="col-6">
              <button
                class="btn btn-outline-secondary dropdown-toggle filter-featured"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                My NFTs
              
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
            
          </div>
          
          <div class="row p-05">
            {this.state.kulfies.map((item, index) => {
              return (
                <>
                  <div class="col-6 col-md-4 col-lg-3 grid-item">
                    <div class="grid-image">
                      <a href={item.image_thumbnail_url} target="_blank">
                      <img
                            src={item.image_thumbnail_url}
                            alt=""
                          />
                      </a>

                      
                    </div>
                    <div class="grid-item-details">
                      <a
                        href={item.image_url}
                        target="blank"
                      >
                        {" "}
                        <h6>Kulfy: {item.kulfy_id}</h6>
                      </a>
                      <div class="grid-item-details">
                         {/* <a
                        // href={item.image_url}
                        target="blank"
                      >
                        
                        Contract Address: {item.category_en}
                      </a> */}
                      </div>
                      {/* <a
                        // href={item.image_url}
                        target="blank"
                      >
                        
                        Contract Address: {item.category_en}
                      </a> */}
                      <hr />
                      <div class="user-details">
                        {/* 
                        TODO:
                        *intially show Tip Creator button.
                        * When Tip Creator button clicked, Hide the button and show div with id tip-send.
                        * User will enter amount and click send button. Then meta mask will open and trasction will be made.
                        * On transaction success show hide tip-send and show div with id tip-success.
                        * after few seconds we hide tip-success and show tip creator button
                        */}
                        {/* <div id="tip-success">
                          <p>Thanks for Tipping the Creator <img src="https://cdn.kulfyapp.com/kulfy/bookmarks_small.svg"/></p>
                          <a
                          href="#"
                          className="btn-create "
                          onClick={() => this.tipKulfy(item.id)}
                        >
                          Send Tip
                        </a>
                        </div>
                        <div id="tip-send">
                          <input type="text" name="" id="" />
                          <a
                          href="#"
                          className="btn-create "
                          onClick={() => this.tipKulfy(item.id)}
                        >
                          Tip Again
                        </a>
                        </div>
                        <a
                          href="#"
                          className="btn-create "
                          onClick={}
                        >
                          Tip Creator
                        </a> */}                        
                        {/* <button onClick={() => this.tipKulfy(item.id)}>
                          tip kulfy
                        </button> */}
                      </div>
                    </div>
                  </div>
              
                </>
              );
            })
            }
          </div>
          <div></div>
          {this.state.NoData?<div id="kulfy-NoData" class="row d-flex justify-content-between">
                          <a></a><p>Hello Creator,</p><p> Welcome to Kulfyverse creatorspace.</p>
                          <p>Start building Kulfys and Enjoy Kulfying !</p>
                          </div>:null}
        <ModelPopUp ref={this.child} account={this.state.account} showModalPopup={this.state.showModalPopup} kulfyV3={this.state.kulfyV3}  />

     
        </section>
            )}
      </>
    );
  }
}

export default MyNFTs;