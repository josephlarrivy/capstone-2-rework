import React, {useState, useEffect} from "react";
import NavBar from "../NavBar";

import '../css/Home.css'

const Home = ({token, setToken}) => {




  return (
    <div className="home-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <div className="home-main">
        <h1>Home</h1>

      </div>
    </div>
  )
}

export default Home;