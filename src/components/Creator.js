import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';


const Creator = () => {
  useEffect(() => {
    loadCreatorParams();
  }, []);
async function loadCreatorParams() {


}


  return (
    <>
    <Navbar />
    <section className="container hero-factory">
         <iframe id="myIframe" src="https://create.kulfyapp.com"  width="100%" height="100%" scrolling="no"  />
    </section>
  
    </>
  );
};

export default Creator;


