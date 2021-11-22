import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import KulfyV3 from '../abis/KulfyV3.json'
import Navbar from './Navbar'
import Main from './Main'
import axios from "axios";

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

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
      this.setState({ kulfyV3 })
      const imagesCount = await kulfyV3.methods.imageCount().call()
      this.setState({ imagesCount })

      // Load Images
      for (var i = 1; i <= imagesCount; i++) {
        const image = await kulfyV3.methods.images(i).call()
        this.setState({
          images: [...this.state.images, image]
        })
      }

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

  uploadImage = async description => {
    // upload file to kulfy server to preprocess
    console.log("Submitting file to kulfy for preprocessing...", this.state.file);
    let formData = new FormData();
    formData.append('kulfy', this.state.file);
    formData.append('language', 'TELUGU');
    formData.append('tags', 'gif,Remove it');
    formData.append('title', description);

    let kulfy = await httpClient.post('https://gateway.kulfyapp.com/V3/gifs/upload',
      formData,
      {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      });
    console.log(kulfy.data);

    // upon success download image from kulfy s3 as binary
    let fileBuffer = Buffer((await httpClient.get(kulfy.data.kulfy_info.gif_url, {
      responseType: 'arraybuffer',
    })).data);

    // submit it to IPFS
    console.log(fileBuffer);
    console.log("Submitting file to ipfs...")

    //adding file to the IPFS
    const result = await ipfs.add(fileBuffer);
    console.log('Ipfs result', result)

    this.setState({ loading: true })
    this.state.kulfyV3.methods
      .uploadImage(result.path, description)
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
  }

  tipImageOwner(id, tipAmount) {
    this.setState({ loading: true })
    this.state.kulfyV3.methods.tipImageOwner(id).send({
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
      images: [],
      loading: true
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account}/>
        {this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
            images={this.state.images}
            captureFile={this.captureFile}
            uploadImage={this.uploadImage}
            tipImageOwner={this.tipImageOwner}
          />
        }
      </div>
    );
  }
}

export default App;