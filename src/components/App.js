import React, { Component } from 'react';
import './App.css';
import { Buffer } from 'buffer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NFTs from './NFTs'
import Memes from './Memes'
import Mint from './Mint'
import Creator from './Creator'
import Home from './Home'
import Docs from './Docs'
import Details from './Details'
import UserProfile from './UserProfile';
import TagManager from 'react-gtm-module'
 
const tagManagerArgs = {
    gtmId: 'GTM-WRCDXD7'
}
global.Buffer = Buffer;
 
TagManager.initialize(tagManagerArgs)



class App extends Component {

  async componentDidMount() {

  }

  render() {
    return (
      <div>
      <Router>
      <Switch>
          <Route path="/nfts">
            <NFTs />
          </Route>
          <Route path="/create">
            <Home />
          </Route>
          <Route path="/mint">
            <Mint />
          </Route>
          <Route path="/kulfys">
            <Memes />
          </Route>
          <Route path="/creator">
            <Creator />
          </Route>
          <Route path="/kulfy" >
            <Details />
          </Route>
          <Route path="/docs" >
            <Docs />
          </Route>
          <Route path="/UserProfile" >
            <UserProfile />
          </Route>
          <Route path="/">
            <Memes />
          </Route>
    
        </Switch>
      
    </Router>
        


      </div>
    );
  }
}

export default App;