import React, { useState, useEffect } from "react";
import NParksServiceRequest from "../apis/nationalParksApi";
import '../css/Banner.css'
import StateSelect from "./StateSelect";
import { useNavigate } from 'react-router-dom';
import useStateNameConverter from "../hooks/useStateNameConverter";


const Banner = () => {

  const [USstate, setUSstate] = useState('placeholder')
  const [stateName, convertStateName] = useStateNameConverter();
  const navigate = useNavigate();

  useEffect(() => {
    convertStateName(USstate)
  }, [USstate])

  const handleGuidedSearch = async (e, type) => {
    if (USstate === 'placeholder') {
      // setUSstate('Pick a state to search')
    } else {
      navigate(`/supplemental/${type}/${USstate}`);
    }
  }

  return (
    <div id="banner-one-container">
      <h1>Discover Events, Articles, and Things to do</h1>
      <div id="state-select">
        <StateSelect USstate={USstate} setUSstate={setUSstate}/>
      </div>
      {USstate === 'placeholder'
        ? <></>
        : <div id="banner-one-buttons">
          <div
            id="banner-one-div-one"
            onClick={(e) => handleGuidedSearch(e, 'events')}>
            <p>Events in {stateName}</p>
          </div>
          <div
            id="banner-one-div-two"
            onClick={(e) => handleGuidedSearch(e, 'articles')}>
            <p>Articles about {stateName}</p>
          </div>
          <div
            id="banner-one-div-three"
            onClick={(e) => handleGuidedSearch(e, 'thingstodo')}>
            <p>Things To Do in {stateName}</p>
          </div>
        </div>
      }
      
    </div>
  )
}

export default Banner;