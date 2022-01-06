import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Kulfys from './Kulfys'

class Memes extends Component {
  async componentDidMount() {
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
