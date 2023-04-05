import React, { useState, useEffect } from "react";

import '../css/ThingsToDo.css'

const ThingsToDo = ({ stateName, data }) => {

  useEffect(() => {
    console.log(data)
  }, [])


  return (
    <div id="things-to-do-container">
      <h1>Things to do in {stateName}</h1>
      {data && data.map(item => {
        return (
          <div key={item.id} className="supplemental-things-to-do-item-container">

            <div className="supplemental-things-to-do-item-container-main">
              <h4>{item.title}</h4>
              <p>{item.shortDescription}</p>
              <a href={item.url} target="_blank">nps.gov</a>
            </div>
            <div className="supplemental-articles-item-container-other">
              
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ThingsToDo;




