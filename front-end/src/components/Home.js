import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";

import '../css/Home.css'
import Banner from "./Banner";
import NewsReleases from "./NewsReleases";
import Alerts from "./Alerts";
import VisitorCentersBanner from "./VisitorCentersBanner";

const Home = ({ token, setToken }) => {
  

  return (
    <div className="home-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <div className="home-main">
        <Banner />
        <br></br>
        <br></br>
        <NewsReleases />
        <br></br>
        <VisitorCentersBanner />
        <br></br>
        <br></br>
        <Alerts />
      </div>
    </div>
  )
}

export default Home;