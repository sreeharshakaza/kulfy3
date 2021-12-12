import React, { Component } from 'react';
// import Identicon from 'identicon.js';
// import photo from '../photo.png'


class Home extends Component {

  render() {
    return (
      <div>
      <section class="container hero-creator">
        <div class="row ">
            <img src="https://cdn.kulfyapp.com/kulfy/kulfy-creator.svg" alt="" />
        </div>
    </section>
    <section class="tab-bar footer fixed-bottom">
        <div class="container">
            <div class="row">
                <div class="tabs">
                    <a href=""><img src="https://cdn.kulfyapp.com/kulfy/tab-bar_home_active.svg" alt="" /></a>
                    <a href=""><img src="https://cdn.kulfyapp.com/kulfy/tab-bar-search-inactive.svg" alt="" /></a>
                    <a href=""><img src="https://cdn.kulfyapp.com/kulfy/tab-bar-create-inactive.svg" alt="" /></a>
                    <a href=""><img src="https://cdn.kulfyapp.com/kulfy/tab-bar-bookmark-inactive.svg" alt="" /></a>
                    <a href=""><img src="https://cdn.kulfyapp.com/kulfy/tab-bar-switch-to-app.svg" alt="" /></a>
                </div>

            </div>
        </div>
    </section>
    <section class="container col-md-6">
        <div class="row">
            <div class="search">
                <div class="inside">
                    <input type="text" name="search" id="" placeholder="Search on Kulfy" />
                    <img src="https://cdn.kulfyapp.com/kulfy/kulfy-radium.svg" alt="" />
                </div>
                <button type="submit" class="bg-radium">
                    <img src="https://cdn.kulfyapp.com/kulfy/search-button.svg" alt="" />
                </button>
            </div>
        </div>
        <div class="row my-2  ">
            <div class="hero-actions col-md-6 m-auto">
                <a href="#">
                    <img src="https://cdn.kulfyapp.com/kulfy/upload-radium.svg" alt="" />
                    <span>Or Upload Video</span>
                </a>
                <a href="#">
                    <img src="https://cdn.kulfyapp.com/kulfy/link-radium.svg" alt="" />
                    <span>Or Paste a link</span>
                </a>
            </div>
        </div>
    </section>
      </div>
    );
  }
}

export default Home;