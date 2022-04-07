import React, { Component } from "react";
import "./App.css";
import Navbars from "./Navbars";
import Kulfys from './Kulfys'

class Memes extends Component {
  async componentDidMount() {
  }
 
  render() {
    return (
      <>
        <Navbars />
        <Kulfys />
      </>
    );
  }
}

export default Memes;
