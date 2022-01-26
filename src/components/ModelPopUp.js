import React, { Component } from "react";
import "./App.css";
import { Modal } from "react-bootstrap";
import KulfyV3 from "../abis/KulfyV3.json";

export class ModelPopUp extends Component {
  isShowModal(state) {
    this.setState({ showModalPopup: state });
  }
  updateInputitemValue(evt) {
    this.setState({
      inputItem: evt.target.value,
    });
  }
  setInputitemValue(val) {
    this.setState({
      inputItem: val,
    });
  }
  updateInputTipValue(evt) {
    this.setState({
      inputTip: evt.target.value,
    });
  }
  async tipKulfyAuthor(id, tipAmount) {
    console.log(id);
    this.isShowModal(false);
    this.state.kulfyV3.methods
      .tipKulfyAuthor(id, 5000)
      .send({
        from: this.state.account,
        value: window.web3.utils.toWei(tipAmount, "Ether"),
      })
      .on("transactionHash", (hash) => {
        console.log("tans hash ", hash);
      });
  }
  constructor(props) {
    super(props);
    this.state = {
      account: this.props.account,
      showModalPopup: this.props.showModalPopup,
      inputTip: "1",
      kulfyV3: this.props.kulfyV3,
      inputItem: "",
    };
  }
  render() {
    return (
      <>
        <Modal
          style={{ color: "#000" }}
          show={this.state.showModalPopup}
          onHide={this.handleClose}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="sign-in-title">
              <h1>Add Tip</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="tip-pop">
              <div className="my-4">
                <input
                  type="hidden"
                  value={this.state.inputItem}
                  onChange={(evt) => this.updateInputitemValue(evt)}
                />
                <input
                  type="number"
                  value={this.state.inputTip}
                  onChange={(evt) => this.updateInputTipValue(evt)}
                  placeholder="1"
                  className="input-text-radium"
                  required
                  name="price"
                  min=".1"
                  step="0.1"
                  title="Currency"
                />{" "}
                <span className="text-color">ONE</span>
              </div>
              <div className="my-4 d-flex">
                <a
                  href="#"
                  className="btn-radium"
                  onClick={() =>
                    this.tipKulfyAuthor(
                      this.state.inputItem,
                      this.state.inputTip
                    )
                  }
                >
                  Tip
                </a>
                <a
                  href="#"
                  style={{ marginLeft: "10px" }}
                  className="btn-radium-outline "
                  onClick={() => this.isShowModal(false)}
                >
                  Cancel
                </a>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default ModelPopUp;
