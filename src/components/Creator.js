import React, { useState, useEffect } from 'react';
import Navbars from './Navbars';


const Creator = () => {
  useEffect(() => {

  }, []);

  return (
    <>
    <Navbars />
    <section className="container hero-factory">
         <iframe id="myIframe" src="https://create.kulfyapp.com"  width="100%" height="100%" scrolling="no"  />
    </section>
  
    </>
  );
};

export default Creator;


