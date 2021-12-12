import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
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

const NFTs = () => {
  const [trasactions, setTrasactions] = useState([]);


  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    // 
    // 
    // 
    
    console.log('items ',trasactions);
        getTransactions();
        getUserStamps();

    
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

  async function getUserStamps() {

    const response = await fetch('https://api.projectkelvin.io/uservotes/getUserStamps?user=gkolluri.testnet');
    const response_body = await response.json();
    votes = response_body.data;
    
   setTrasactions(votes);
  }

 async function AddVote(item,collection) {
    votes = votes - 1;
    console.log('add vote transaction before ',item);
    item.votes = item.votes  + 1;
    console.log('add vote transaction after',item);
   


    if(collection == 'time' ){
        item.timevotes = item.timevotes  + 1;
    }else if(collection == 'temperature'){
        item.tempvotes = item.tempvotes +1
    }else if(collection == 'capital'){
        item.capitalvotes = item.capitalvotes+1;
    }
     setTrasactions(item);
    const response = await fetch(`https://api.projectkelvin.io/uservotes/updateVoteForProposal?stampType=stamp&proposer=${item.proposer}&proposerName=null&toIdSource=null&toProposal=${item.proposalId}&fromId=${item.proposer}&fromName=null&collection=${collection}&negative=false`);
    //const users = await response.json();
    //setUsers(users);
  }

async function DownVote(item,collection) {
    votes = votes - 1;
    item.votes = item.votes  - 1;

        if(collection == 'time' ){
        item.timevotes = item.timevotes  - 1;
    }else if(collection == 'temperature'){
        item.tempvotes = item.tempvotes -1
    }else if(collection == 'capital'){
        item.capitalvotes = item.capitalvotes-1;
    }
    setTrasactions(item);
    const response = await fetch(`https://api.projectkelvin.io/uservotes/updateVoteForProposal?stampType=stamp&proposer=${item.proposer}&proposerName=null&toIdSource=null&toProposal=${item.proposalId}&fromId=${item.proposer}&fromName=null&collection=${collection}&negative=true`);
    const users = await response.json();
    
  }

  return (
    <>
    <Navbar />


  
    </>
  );
};

export default NFTs;
