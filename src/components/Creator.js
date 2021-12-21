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

const Creator = () => {
  const [trasactions, setTrasactions] = useState([]);

  const [keyword, setKeyword] = useState(null);
  useEffect(() => {

    console.log('items ',trasactions);
        getTransactions();

    
  }, []);

  async function getTransactions() {

    let nft = "";
    let search = window.location.search;
    let params = new URLSearchParams(search);
    nft = params.get("nft");

    if(nft){
        let myIframe = document.getElementById("myIframe");
         myIframe.src = 'https://create.kulfyapp.com/?nft='+nft ;
    }

  }


  async function searchNFTs() {

    window.location.href = '/nfts?search='+keyword;
  
  }

 

  return (
    <>

    <Navbar />

    <section class="container hero-factory">
         <iframe id="myIframe" src="https://create.kulfyapp.com"  width="100%" height="100%" scrolling="no"  />
    </section>
  
    </>
  );
};

export default Creator;


