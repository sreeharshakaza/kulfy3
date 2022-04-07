import React, { useState, useEffect } from 'react';
import Navbars from './Navbars';

const Home = () => {
  const [keyword, setKeyword] = useState(null);

  useEffect(() => {  
  }, []);


  function onKeyUp(event) {   
    if (event.charCode === 13) {
      console.log('presing enter',event.target.value, keyword);
     searchNFTs();
    }
  }

  async function searchNFTs() {
    window.location.href = '/nfts?search='+keyword; 
  }

  return (
    <>

    <Navbars />

<section className="container hero-creator">
        <div className="row ">
            <img src="https://cdn.kulfyapp.com/kulfy/kulfy-creator.svg" alt="" />
        </div>
    </section>
    <section className="tab-bar footer fixed-bottom">
        <div className="container">
            <div className="row">
                <div className="tabs">
                    <a href=""><img src="https://cdn.kulfyapp.com/kulfy/tab-bar_home_active.svg" alt="" /></a>
                    <a href=""><img src="https://cdn.kulfyapp.com/kulfy/tab-bar-search-inactive.svg" alt="" /></a>
                    <a href=""><img src="https://cdn.kulfyapp.com/kulfy/tab-bar-create-inactive.svg" alt="" /></a>
                    <a href=""><img src="https://cdn.kulfyapp.com/kulfy/tab-bar-bookmark-inactive.svg" alt="" /></a>
                    <a href=""><img src="https://cdn.kulfyapp.com/kulfy/tab-bar-switch-to-app.svg" alt="" /></a>
                </div>

            </div>
        </div>
    </section>
    <section className="container col-md-6">
        <div className="row">
            <div className="search">
                <div className="inside">
                    <input type="text" onChange={e => setKeyword(e.target.value)} name="keyword" id="" onKeyPress={e => onKeyUp(e)}  placeholder="Search for NFTs" />
                    <img src="https://cdn.kulfyapp.com/kulfy/kulfy-radium.svg" alt="" />
                </div>
                <button type="submit" className="bg-radium">
                 <a onClick={() => searchNFTs()} href="#">   <img src="https://cdn.kulfyapp.com/kulfy/search-button.svg" alt="" /></a>
                </button>
            </div>
        </div>
        <div className="row my-2  ">
            <div className="hero-actions col-md-6 m-auto">
                <a href="/creator">
                    <img src="https://cdn.kulfyapp.com/kulfy/upload-radium.svg" alt="" />
                    <span>Or Upload Video</span>
                </a>
                <a href="/creator">
                    <img src="https://cdn.kulfyapp.com/kulfy/link-radium.svg" alt="" />
                    <span>Or Paste a link</span>
                </a>
            </div>
        </div>
        
    </section>
  
    </>
  );
};

export default Home;


