import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import KulfyV3 from '../abis/KulfyV3.json'
import Navbar from './Navbar'
import NFTs from './NFTs'
import Memes from './Memes'
import Mint from './Mint'
import Home from './Home'
import Main from './Main'
import axios from "axios";
//import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const { create, urlSource } = require('ipfs-http-client')
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const httpClient = axios.create();
httpClient.defaults.timeout = 500000;


class App extends Component {

  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying ethereum based brower')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    //Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = KulfyV3.networks[networkId]
    if (networkData) {
      const kulfyV3 = new web3.eth.Contract(KulfyV3.abi, networkData.address)
      console.log(`kulfyV3`, kulfyV3);
      this.setState({ kulfyV3 })
      //const kulfiesCount = await kulfyV3.methods.kulfyCount().call()
      const kulfiesCount = 0
      console.log(`kulfiesCount`, kulfiesCount);
      this.setState({ kulfiesCount })

      // Load Images
      for (let i = 1; i <= kulfiesCount; i++) {
        const kulfy = await kulfyV3.methods.kulfies(i).call()
        this.setState({
          kulfies: [...this.state.kulfies, kulfy]
        })
      }

    console.log(this.state.kulfies);

      this.setState({ loading: false })
    } else {
      window.alert('Kulfy contarct not deployed to any network')
    }


  }

  captureFile = event => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      this.setState({ file: file });
      console.log('buffer', this.state.buffer)
    }
  }

  uploadKulfy = async description => {
    // upload file to kulfy server to preprocess
    console.log("Submitting file to kulfy for preprocessing...", this.state.file);
    let formData = new FormData();
    formData.append('kulfy', this.state.file);
    formData.append('language', 'TELUGU');
    formData.append('tags', 'gif,Remove it');
    formData.append('title', description);
    console.log(formData);
    console.log(this.state.file);

    let kulfy = await httpClient.post('https://gateway.kulfyapp.com/V3/gifs/upload',
      formData,
      {
        'Accept': 'application/json'
      });
    console.log(kulfy.data);

    // upon success download image from kulfy s3 as binary
    let fileBuffer = Buffer((await httpClient.get(kulfy.data.kulfy_info.gif_url, {
      responseType: 'arraybuffer',
    })).data);

    // submit it to IPFS
    // console.log(fileBuffer);
    console.log("Submitting file to ipfs...")

    //adding file to the IPFS
    const result = await ipfs.add(this.state.buffer);
    // const result = await ipfs.add(urlSource(kulfy.data.kulfy_info.gif_url));

    console.log('Ipfs result', result)

    this.setState({ loading: true })
    this.state.kulfyV3.methods
      .uploadKulfy(result.path, description)
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
  }

  tipKulfyOwner(id, tipAmount) {
    this.setState({ loading: true })
    this.state.kulfyV3.methods.tipKulfyOwner(id).send({
      from: this.state.account,
      value: tipAmount
    }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      kulfyV3: '',
      kulfies: [],
      loading: true
    }
  }

  render() {
    return (




      <div>
      <Router>
      <Switch>
          <Route path="/nfts">
            <NFTs />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/mint">
            <Mint />
          </Route>
          <Route path="/memes">
            <Memes />
          </Route>
          <Route path="/">
            <Home />
          </Route>
    
        </Switch>
      
    </Router>
        


      </div>
    );
  }
}

export default App;