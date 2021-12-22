import React, { Component } from "react";
// import Identicon from 'identicon.js';
// import photo from '../photo.png'
import { ReactComponent as UserProfile } from "../assets/images/dp.svg";
import { ReactComponent as Logo } from "../assets/images/logo_green.svg";
import { ReactComponent as NavHam } from "../assets/images/hamburger.svg";
import Identicon from 'react-identicons';
class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar  navbar-light bg-none mb-3">
          <div className="container-fluid">
            <a href="/" className="navbar-logo mx-2">
              <Logo />
            </a>
          
            <div>

              <a href="/kulfys" className="mx-2 nav-links ">
                Kulfys
              </a>
              <a href="/create" className="mx-2 btn-create">
                Create
              </a>
              <a href="#" className="mx-2 nav-links">
              <Identicon string="randomness" size="25"/>
              </a>
     {/*          <a href="#" className="navbar-dp mx-3">
                <UserProfile />
                <small id="account">{this.props.account}</small>
              </a>

              <a href="/" className="navbar-ham">
                <NavHam />
              </a> */}
            </div>
          </div>
        </nav>
        {/* <div className="container">
          <div className="row">
            <div className="col">
              <div className="input-group mb-3">
                <span
                  className="input-group-text searchbar-icon"
                  id="addon-wrapping"
                >
                  <img src="https://cdn.kulfyapp.com/kulfy/search.svg" alt="" />
                </span>
                <input
                  type="text"
                  className="form-control searchbar-text"
                  aria-label="Text input with dropdown button"
                />
                <button
                  className="btn btn-outline-secondary dropdown-toggle language-select"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://cdn.kulfyapp.com/kulfy/letter_english.svg"
                    alt=""
                    className="language-icon"
                  />
                  <img
                    src="https://cdn.kulfyapp.com/kulfy/downarrow_2.svg"
                    alt=""
                    className="dropdown-arrow2"
                  />
                </button>
                <ul className="dropdown-menu dropdown-menu-language bg-color2">
                  <li>
                    <button className="dropdown-item">
                      <img
                        src="https://cdn.kulfyapp.com/kulfy/letter_english.svg"
                        alt=""
                      />
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item">
                      <img
                        src="https://cdn.kulfyapp.com/kulfy/letter_telugu.svg"
                        alt=""
                      />
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item">
                      <img
                        src="https://cdn.kulfyapp.com/kulfy/letter_tamil.svg"
                        alt=""
                      />
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item">
                      <img
                        src="https://cdn.kulfyapp.com/kulfy/letter_malayalam.svg"
                        alt=""
                      />
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item">
                      <img
                        src="https://cdn.kulfyapp.com/kulfy/letter_hindi.svg"
                        alt=""
                      />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div> */}

        <footer class="footer mt-auto py-2 bg-dark fixed-bottom">
          <div class="container">
            <div class="row">
              <div class="col-6">
                <span class="text-muted">© Copyright 2021 Kulfy Inc</span>
              </div>
              <div class="col-6">
                <a href="https://twitter.com/kulfyapp" target="blank">Twitter</a>
                <a href="https://discord.gg/Su4m642a">Discord</a>
                <a href="https://t.me/KulfyGifs">Telegram</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Navbar;
