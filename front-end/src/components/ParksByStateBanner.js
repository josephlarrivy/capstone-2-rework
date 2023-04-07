import React, { useState, useEffect } from "react";
import '../css/ParksByStateBanner.css'
import StateSelect from "./StateSelect";
import { useNavigate } from 'react-router-dom';
import useStateNameConverter from "../hooks/useStateNameConverter";
import NParksServiceRequest from "../apis/nationalParksApi";


const ParksByStateBanner = () => {

  const [USstate, setUSstate] = useState(null)
  const [stateName, convertStateName] = useStateNameConverter();
  const [parksList, setParksList] = useState([1])
  const navigate = useNavigate();

  useEffect(() => {
    convertStateName(USstate)
  }, [USstate])

  const handleFingParksByState = async (e) => {
    if (USstate === null) {
      console.log('null')
    } else {
      const response = await NParksServiceRequest.getParksByState(USstate)
      console.log(response)
    }
  }

  return (
    <div id="parks-by-state-container">
      {USstate === null
        ? <h1>Pick a state to find Parks</h1>
        : <h1> See Parks in {stateName}</h1>
      }
      <div id="state-select">
        <StateSelect USstate={USstate} setUSstate={setUSstate} />
      </div>
      <div
        id="search-button"
        onClick={(e) => handleFingParksByState(e)}
      >
        <p>Search</p>
      </div>
      <div id="search-parks-by-state-banner-items-container">
        <div className="search-parks-by-state-banner-item"></div>
        <div className="search-parks-by-state-banner-item"></div>
        <div className="search-parks-by-state-banner-item"></div>
        <div className="search-parks-by-state-banner-item"></div>
        <div className="search-parks-by-state-banner-item"></div>
      </div>
    </div>
  )
}

export default ParksByStateBanner;