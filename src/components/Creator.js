import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';


const Creator = () => {
  useEffect(() => {
    loadCreatorParams();
  }, []);
async function loadCreatorParams() {

            let myIframe = document.getElementById("myIframe");
            let nftURL = "";
            let search = window.location.search;
            let params = new URLSearchParams(search);
            nftURL = params.get("nft");

    
            let adsURL = myIframe.src +"?nft="+nftURL;
            console.log('ads',adsURL);
            myIframe.src = adsURL;
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


