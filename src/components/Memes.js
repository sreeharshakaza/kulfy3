import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import KulfyV3 from "../abis/KulfyV3.json";
import Navbar from "./Navbar";
import Kulfys from './Kulfys'
import axios from "axios";

class Memes extends Component {
  async componentDidMount() {
  }
 
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Navbar />
        <Kulfys />
      </>
    );
  }
}

export default Memes;
