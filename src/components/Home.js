import React, { useState, useEffect } from 'react';
import axios from "axios";
import ReactDOM from "react-dom";
import { Dropdown } from 'react-bootstrap';
import Navbar from './Navbar';


let items=[];
let itemList=[];
let votes=0;
items.forEach((item,index)=>{
  itemList.push( 
)
})

const Home = () => {
  const [trasactions, setTrasactions] = useState([]);

  const [keyword, setKeyword] = useState(null);

  useEffect(() => {

    console.log('items ',trasactions);
       // getTransactions();

    
  }, []);


  function onKeyUp(event) {
    
    if (event.charCode === 13) {
      console.log('presing enter',event.target.value, keyword);
     searchNFTs();
    }
  }

  async function searchNFTs() {

    window.location.href = '/nfts?search='+keyword;
  
  }

 

  return (
    <>

    <Navbar />

<section class="container hero-creator">
        <div class="row ">
            <img src="https://cdn.kulfyapp.com/kulfy/kulfy-creator.svg" alt="" />
        </div>
    </section>
    <section class="tab-bar footer fixed-bottom">
        <div class="container">
            <div class="row">
                <div class="tabs">
                    <a href=""><img src="https://cdn.kulfyapp.com/kulfy/tab-bar_home_active.svg" alt="" /></a>
                    <a href=""><img src="https://cdn.kulfyapp.com/kulfy/tab-bar-search-inactive.svg" alt="" /></a>
                    <a href=""><img src="https://cdn.kulfyapp.com/kulfy/tab-bar-create-inactive.svg" alt="" /></a>
                    <a href=""><img src="https://cdn.kulfyapp.com/kulfy/tab-bar-bookmark-inactive.svg" alt="" /></a>
                    <a href=""><img src="https://cdn.kulfyapp.com/kulfy/tab-bar-switch-to-app.svg" alt="" /></a>
                </div>

            </div>
        </div>
    </section>
    <section class="container col-md-6">
        <div class="row">
            <div class="search">
                <div class="inside">
                    <input type="text" onChange={e => setKeyword(e.target.value)} name="keyword" id="" onKeyPress={e => onKeyUp(e)}  placeholder="Search for NFTs" />
                    <img src="https://cdn.kulfyapp.com/kulfy/kulfy-radium.svg" alt="" />
                </div>
                <button type="submit" class="bg-radium">
                 <a onClick={() => searchNFTs()} href="#">   <img src="https://cdn.kulfyapp.com/kulfy/search-button.svg" alt="" /></a>
                </button>
            </div>
        </div>
        <div class="row my-2  ">
            <div class="hero-actions col-md-6 m-auto">
                <a href="/creator">
                    <img src="https://cdn.kulfyapp.com/kulfy/upload-radium.svg" alt="" />
                    <span>Or Upload Video</span>
                </a>
                <a href="/creator">
                    <img src="https://cdn.kulfyapp.com/kulfy/link-radium.svg" alt="" />
                    <span>Or Paste a link</span>
                </a>
            </div>
        </div>
        
    </section>
  
    </>
  );
};

export default Home;


