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
        getTransactions();

    
  }, []);

  async function getTransactions() {
    const response = await fetch('https://api.projectkelvin.io/uservotes/getProposalPage?pageNumber=1');
    const users = await response.json();
    items = users.data;

    getProposalScores(items);
    getVotesForTransactions(items,'temperature');
    getVotesForTransactions(items,'time');
    getVotesForTransactions(items,'capital');
    setTrasactions(users);
  }

  async function getProposalScores(items) {
    let transactions_request = '';
    for(var i = 0;i<items.length;i++){
        transactions_request = transactions_request+'&proposals='+items[i].proposalId;
    }

   
    const response = await fetch('https://api.projectkelvin.io/uservotes/getProposalScore?'+transactions_request);
    let proposal_score = await response.json();
    proposal_score = proposal_score.data;

    for(var i = 0;i<proposal_score.length;i++){
            items[i].votes = proposal_score[i]; 
    } 


    setTrasactions(proposal_score);
  }


  async function getVotesForTransactions(items,collection) {
    let transactions_request = '';
    for(var i = 0;i<items.length;i++){
        transactions_request = transactions_request+'&proposals='+items[i].proposalId;
    }

    transactions_request = transactions_request+`&collection=`+collection;
    const response = await fetch('https://api.projectkelvin.io/uservotes/getVotesByProposal?'+transactions_request);
    let transaction_votes = await response.json();
    transaction_votes = transaction_votes.data;

    if(collection == 'time'){
        for(var i = 0;i<transaction_votes.length;i++){
            items[i].timevotes = transaction_votes[i]; 
        }    
    } else if(collection == 'capital'){
        for(var i = 0;i<transaction_votes.length;i++){
            items[i].capitalvotes = transaction_votes[i]; 
        }        
    } else if(collection == 'temperature'){
        for(var i = 0;i<transaction_votes.length;i++){
            items[i].tempvotes = transaction_votes[i]; 
        } 
    }

    setTrasactions(transaction_votes);
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
                    <input type="text" onChange={e => setKeyword(e.target.value)} name="keyword" id="" placeholder="Search for NFTs" />
                    <img src="https://cdn.kulfyapp.com/kulfy/kulfy-radium.svg" alt="" />
                </div>
                <button type="submit" class="bg-radium">
                 <a onClick={() => searchNFTs()} href="#">   <img src="https://cdn.kulfyapp.com/kulfy/search-button.svg" alt="" /></a>
                </button>
            </div>
        </div>
        <div class="row my-2  ">
            <div class="hero-actions col-md-6 m-auto">
                <a href="#">
                    <img src="https://cdn.kulfyapp.com/kulfy/upload-radium.svg" alt="" />
                    <span>Or Upload Video</span>
                </a>
                <a href="#">
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


