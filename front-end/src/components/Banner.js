import React, { useState, useEffect } from "react";
import NParksServiceRequest from "../apis/nationalParksApi";
import '../css/Banner.css'
import StateSelect from "./StateSelect";
import { useNavigate } from 'react-router-dom';

const Banner = () => {

  const [hoveredDiv, setHoveredDiv] = useState(null);
  const [USstate, setUSstate] = useState('placeholder')
  const navigate = useNavigate();

  const handleMouseOver = (index) => {
    setHoveredDiv(index);
  }

  const handleMouseLeave = () => {
    setHoveredDiv(null);
  }

  const handleGuidedSearch = async (e, type) => {
    if (USstate === 'placeholder') {
      // setUSstate('Pick a state to search')
    } else {
      navigate(`/supplemental/${type}/${USstate}`);
    }
  }

  return (
    <div id="banner-one-container">
      <h1>Discover Your Next Adventure</h1>
      <div id="state-select">
        <StateSelect USstate={USstate} setUSstate={setUSstate}/>
      </div>
      <div id="banner-one-buttons">
        <div
          id="banner-one-div-one"
          onClick={(e) => handleGuidedSearch(e, 'events')}
          onMouseOver={() => handleMouseOver(1)}
          onMouseLeave={() => handleMouseLeave()}
        >
          {/* {hoveredDiv === 1 && <p>Events</p>} */}
          <p>Events</p>
        </div>
        <div
          id="banner-one-div-two"
          onClick={(e) => handleGuidedSearch(e, 'articles')}
          onMouseOver={() => handleMouseOver(2)}
          onMouseLeave={() => handleMouseLeave()}
        >
          {/* {hoveredDiv === 2 && <p>Articles</p>} */}
          <p>Articles</p>
        </div>
        <div
          id="banner-one-div-three"
          onClick={(e) => handleGuidedSearch(e, 'thingstodo')}
          onMouseOver={() => handleMouseOver(3)}
          onMouseLeave={() => handleMouseLeave()}
        >
          {/* {hoveredDiv === 3 && <p>Things To Do</p>} */}
          <p>Things To Do</p>
        </div>
      </div>
    </div>
  )
}

export default Banner;