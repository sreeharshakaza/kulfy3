import React, { Component } from 'react';
import Identicon from 'identicon.js';
import photo from '../photo.png'

class Navbar extends Component {

  render() {
    return (
      <div>
        <nav class="navbar  navbar-light bg-none">
            <div class="container-fluid">
                <a class="navbar-dp" href="#">
                  <img src="assets/images/dp.svg" alt="user-profile-picture" />
                  <small id="account">{this.props.account}</small>
                </a>
                <a class="navbar-logo" href="#">
                    <img src="assets/images/logo_green.svg" alt="kulfy-logo" />
                </a>
                <a class="navbar-ham" href="#">
                    <img src="assets/images/hamburger.svg" alt="hamburger-menu-icon" />
                </a>
            </div>
        </nav>
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text searchbar-icon" id="addon-wrapping"><img src="assets/images/search.svg" alt="" /></span>
                        <input type="text" class="form-control searchbar-text" aria-label="Text input with dropdown button" />
                        <button class="btn btn-outline-secondary dropdown-toggle language-select" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="assets/images/letter_english.svg" alt="" class="language-icon"/><img src="assets/images/downarrow_2.svg" alt="" class="dropdown-arrow2" />
                        </button>
                        <ul class="dropdown-menu dropdown-menu-language bg-color2">
                            <li>
                                <a class="dropdown-item" href="#"><img src="assets/images/letter_english.svg" alt="" /></a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#"><img src="assets/images/letter_telugu.svg" alt="" /></a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#"><img src="assets/images/letter_tamil.svg" alt="" /></a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#"><img src="assets/images/letter_malayalam.svg" alt="" /></a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#"><img src="assets/images/letter_hindi.svg" alt="" /></a>
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