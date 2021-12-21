import React, { useState, useEffect } from "react";
import axios from "axios";

import ReactDOM from "react-dom";
import { Dropdown } from "react-bootstrap";
import Navbar from "./Navbar";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import { useCookies } from "react-cookie";

let items = [];
let itemList = [];
let votes = 0;
items.forEach((item, index) => {
  itemList.push();
});

const NFTs = () => {
  const [trasactions, setTrasactions] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    console.log("items ", trasactions);
    getTransactions();
  }, []);

  async function getTransactions() {
    let keyword = "video";
    let search = window.location.search;
    let params = new URLSearchParams(search);
    if (params) {
      keyword = params.get("search") + " video";
    }

    setKeyword(keyword);

    const nftPortApiRoot = `https://api.nftport.xyz/v0/search?text=${keyword}&chain=all&order_by=relevance`;

    axios.defaults.headers.common = {
      "Content-Type": "application/json",
      Authorization: "e97bf230-02d8-4521-81c1-3809e7ff6253",
    };

    const postCommentsResponse = await axios.get(`${nftPortApiRoot}`);
    console.log(
      `postComments Response from convo: ${JSON.stringify(
        postCommentsResponse
      )}`
    );

    const response = postCommentsResponse;
    //const response = await fetch('https://api.nftport.xyz/v0/search?text=india%20video&chain=all&order_by=relevance');
    const nfts = await response;
    items = nfts.data.search_results;

    setTrasactions(items);
  }

  async function createMeme(item) {
    localStorage.setItem("NFT", JSON.stringify(item));
    window.location.href =
      "/creator?nft=" + item.cached_file_url;
  }

  return (
    <>
      <Navbar />

      <section class="container featured-grid">
        <div class="row d-flex justify-content-between">
          <div class="col-6">
            <button
              class="btn btn-outline-secondary dropdown-toggle filter-featured"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              NFT Results for {keyword}s
              <img
                src="https://cdn.kulfyapp.com/kulfy/downarrow_2.svg"
                alt=""
                class="dropdown-arrow2"
              />
            </button>
            <ul class="dropdown-menu dropdown-menu-featured bg-color2">
              <li>
                <a class="dropdown-item" href="#">
                  FRESH-IN
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  POPULAR
                </a>
              </li>
            </ul>
          </div>
          {/* <div class="col-2">
            <button
              type="button"
              class="btn btn-primary border-none bg-none"
              data-bs-toggle="button"
              autocomplete="off"
            >
              <img
                src="https://cdn.kulfyapp.com/kulfy/grid_play.svg"
                alt=""
                class="language-icon"
              />
            </button>
          </div> */}
        </div>
        <div class="row p-05">
          {items.map(function (item, index) {
            if (item.cached_file_url.endsWith(".mp4")) {
              return (
                <>
                  <div class="col-6 col-md-4 col-lg-3 grid-item">
                    <div class="grid-image">
                      <video
                        autoPlay
                        loop
                        muted
                        width="320"
                        height="240"
                        controls
                      >
                        <source src={item.cached_file_url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div class="grid-info">
                        <div>
                          <img
                            src="https://cdn.kulfyapp.com/kulfy/gifs_stack.svg"
                            alt=""
                          />
                          <span>GIF</span>
                          <span>16s</span>
                        </div>
                        <button
                          type="button"
                          class="btn btn-primary border-none btn-bookmark "
                          data-bs-toggle="button"
                          autocomplete="off"
                        >
                          <img
                            src="https://cdn.kulfyapp.com/kulfy/bookmarks_small.svg"
                            alt=""
                            class="language-icon"
                          />
                        </button>
                      </div>
                    </div>
                    <div class="grid-item-details">
                      <h6>{item.name}</h6>
                      <hr />
                      <div class="user-details">
                        <a
                          onClick={() => createMeme(item)}
                          href="#"
                          className="btn-create"
                        >
                          {" "}
                          Create Kulfy{" "}
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>
      </section>
    </>
  );
};

export default NFTs;
