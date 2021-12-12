import React, { Component } from 'react';
// import Identicon from 'identicon.js';
// import photo from '../photo.png'
import { ReactComponent as UserProfile } from '../assets/images/dp.svg';
import { ReactComponent as Logo } from '../assets/images/logo_green.svg'
import { ReactComponent as NavHam } from '../assets/images/hamburger.svg'

class Navbar extends Component {

  render() {
    return (
      <div>
      
        <nav className="navbar  navbar-light bg-none">
          <div className="container-fluid">
            <button className="navbar-dp">
              <UserProfile/>
              <small id="account">{this.props.account}</small>
            </button>
            <button className="navbar-logo">
              <Logo/>
            </button>
            <button className="navbar-ham">
              <NavHam/>
            </button>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="input-group mb-3">
                <span className="input-group-text searchbar-icon" id="addon-wrapping"><img
                  src="assets/images/search.svg" alt=""/></span>
                <input type="text" className="form-control searchbar-text"
                       aria-label="Text input with dropdown button"/>
                <button className="btn btn-outline-secondary dropdown-toggle language-select" type="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="assets/images/letter_english.svg" alt="" className="language-icon"/><img
                  src="assets/images/downarrow_2.svg" alt="" className="dropdown-arrow2"/>
                </button>
                <ul className="dropdown-menu dropdown-menu-language bg-color2">
                  <li>
                    <button className="dropdown-item">
                      <img src="assets/images/letter_english.svg" alt=""/>
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item">
                      <img src="assets/images/letter_telugu.svg" alt=""/>
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item">
                      <img src="assets/images/letter_tamil.svg" alt=""/>
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item">
                      <img src="assets/images/letter_malayalam.svg" alt=""/>
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item">
                      <img src="assets/images/letter_hindi.svg" alt=""/>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;