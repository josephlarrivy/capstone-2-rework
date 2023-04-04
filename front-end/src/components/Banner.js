import React, { useState, useEffect } from "react";
import '../css/Banner.css'
import StateSelect from "./StateSelect";

const Banner = () => {

  const [hoveredDiv, setHoveredDiv] = useState(null);
  const [USstate, setUSstate] = useState(null)

  useEffect(() => {
    console.log(USstate)
  }, [USstate])

  const handleMouseOver = (index) => {
    setHoveredDiv(index);
  }

  const handleMouseLeave = () => {
    setHoveredDiv(null);
  }

  return (
    <div id="banner-one-container">
      <div id="state-select">
        <StateSelect USstate={USstate} setUSstate={setUSstate}/>
      </div>
      <div id="banner-one">
        <div
          id="banner-one-div-one"
          onMouseOver={() => handleMouseOver(1)}
          onMouseLeave={() => handleMouseLeave()}
        >
          {hoveredDiv === 1 && <p>Text for banner one div one</p>}
        </div>
        <div
          id="banner-one-div-two"
          onMouseOver={() => handleMouseOver(2)}
          onMouseLeave={() => handleMouseLeave()}
        >
          {hoveredDiv === 2 && <p>Text for banner one div two</p>}
        </div>
        <div
          id="banner-one-div-three"
          onMouseOver={() => handleMouseOver(3)}
          onMouseLeave={() => handleMouseLeave()}
        >
          {hoveredDiv === 3 && <p>Text for banner one div three</p>}
        </div>
      </div>
    </div>
  )
}

export default Banner;