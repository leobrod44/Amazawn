import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styling/Tracking.css";

import "..";

const Tracking = () => {
  return (
    <div className="container-page">
      <nav>
        <Header />
      </nav>
     
      <nav>
        <Footer />
      </nav>
    </div>
  )
};

export default Tracking;