import React, { useState, useEffect } from "react";
import '../css/VisitorCentersBanner.css'
import StateSelect from "./StateSelect";
import { useNavigate } from 'react-router-dom';

const VisitorCentersBanner = () => {

  const [USstate, setUSstate] = useState('placeholder')
  const navigate = useNavigate();

  const handleFindVisitorCenters = async (e, type) => {
    if (USstate === 'placeholder') {
      // setUSstate('Pick a state to search')
    } else {
      navigate(`/visitorcenters/${USstate}`);
    }
  }

  return (
    <div id="visitor-center-search-container">
      <h1>Find Visitor Centers</h1>
      <div id="state-select">
        <StateSelect USstate={USstate} setUSstate={setUSstate} />
      </div>

      {USstate === 'placeholder'
        ? <p></p>
        : <div
            id="search-button"
            onClick={(e) => handleFindVisitorCenters(e, 'events')}
              >
            <p>Find</p>
          </div>
      }
    </div>
  )
}




export default VisitorCentersBanner;