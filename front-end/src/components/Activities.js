import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import NavBar from "../NavBar";
import NParksServiceRequest from '../apis/nationalParksApi';

import '../css/NavBar.css'
import '../css/Activities.css'




const Activities = ({ token, setToken }) => {


  const handleActivityClick = async (event) => {
    const activity = event.target.id;
    console.log(activity);
    
    
  }


  return (
    <div className="activities-page-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <div className="activities-container">
        <div className="activities-buttons-container">
          <div className="activities-button">
            <button id="hiking" onClick={handleActivityClick}>button</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activities;