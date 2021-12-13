import React, { useState, useEffect } from 'react';
import axios from "axios";

import ReactDOM from "react-dom";
import { Dropdown } from 'react-bootstrap';
import Navbar from './Navbar';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';


let kid = '';
let items=[];
let itemList=[];
let votes=0;
items.forEach((item,index)=>{
  itemList.push( 
)
})

const Mint = () => {
  const [name, setName] = useState(null);
  const [tags,setTags]  = useState(null);
  const [kid,setKid]  = useState(null);
  const [url,setUrl]  = useState(null);
  const [loading,setLoading]  = useState(null);
  useEffect(() => {

    

        getTransactions();
  

    
  }, []);

  async function getTransactions() {


   let kid = ''
    let search = window.location.search;
    let params = new URLSearchParams(search);
    kid = params.get('kid');
   
    

  	const getKulfyAPI = 'https://gateway.kulfyapp.com/V3/gifs/getKulfy?client=web&id='+kid+'&language=all,telugu,tamil,hindi,malayalam,english';
    const convoApiToken = 'CONVO'

    axios.defaults.headers.common = {
      "Content-Type": "application/json"   
    }
   

     

  const postCommentsResponse = await axios.get(`${getKulfyAPI}`);
     console.log(`postComments Response from convo: ${JSON.stringify(postCommentsResponse)}`);


     const response = postCommentsResponse;
    //const response = await fetch('https://api.nftport.xyz/v0/search?text=india%20video&chain=all&order_by=relevance');

     console.log('resppoonse ',response.data.kulfy_info);


   // items = JSON.stringify(response.data);
    setName(response.data.kulfy_info.name);
    setTags(JSON.stringify(response.data.kulfy_info.category.join()));
    setKid(response.data.kulfy_info.kid);
    setUrl(response.data.kulfy_info.sticker_url)
  }






 async function createMeme(item) {

 	window.location.href = 'http://create.kulfy.io/?nft='+item.cached_file_url;
  }









  return (
    <>


   <div class="body-to-margin">
    <header>
        <nav class="navbar  navbar-light bg-none">
            <div class="container-fluid justify-content-start">
                <a class="navbar-dp" href="#">
                    <img src="https://cdn.kulfyapp.com/kulfy/back-white.svg" alt="back" />
                </a>
                <a class="navbar-logo" href="#">
                    <img class="creator" src="https://cdn.kulfyapp.com/kulfy/kulfy-creator.svg" alt="kulfy-creator-logo" />
                </a>
                <span class="navbar-text-right" >Almost there!</span>
            </div>
        </nav>
    </header>

     <section class="container">
        <div class="row">
            <div class="col-md-6 my-4">
                <img class="w-100" src={url} alt="" />
            </div>
            <div class="col-md-6 d-flex justify-content-between flex-column">
                <div class="form publish-form">
                    <div class="form-group text-input-with-label my-3">
                        <label for="filename">File Name -  {kid}</label>
                        <input type="text" class="form-control" id="filename" aria-describedby="filename" value={name} placeholder="Ex. Naku English Raadu" />
                    </div>
                    <div class="form-group d-flex flex-column my-3">
                        <label for="tags my-2">Add Tags</label>
                        <input type="text" class="tag-input my-1" name="tags" id="tags"  placeholder="Ex. Chiru, Happy, Comedy, LOL" />
                        <div class="tags-list  my-1">
                            <span>{tags}<a href="#"><img src="https://cdn.kulfyapp.com/kulfy/delete-circle-small.svg" width="8px" alt="" /></a></span>
                        </div>
                    </div>
                    <div class="form-group my-3">
                        <label for="language">Language</label>
                        <div class="language-lists my-1">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="hindi" value="hindi" />
                                <label class="form-check-label" for="hindi">Hindi</label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="telugu" value="telugu" />
                                <label class="form-check-label" for="telugu">Telugu</label>
                              </div>
                        </div>
                    </div>

                </div>
                <div class="bar-publish">
                    <div class="content-type">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="hindi" value="hindi" />
                            <label class="form-check-label" for="hindi">Video</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="telugu" value="telugu" />
                            <label class="form-check-label" for="telugu">GIF</label>
                          </div>
                    </div>
                    <div class="publish-actions">
                        <button><img src="https://cdn.kulfyapp.com/kulfy/delete-white.svg" alt="" /></button>
                        <button type="submit"><img src="https://cdn.kulfyapp.com/kulfy/check-black.svg" alt="" /> <span>Mint</span></button>
                    </div>
                </div>
            </div>
        
        </div>
    </section>

    </div>

  
    </>
  );
};

export default Mint;
