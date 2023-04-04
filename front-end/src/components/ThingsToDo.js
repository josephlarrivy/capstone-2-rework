import React, { useState, useEffect } from "react";

const ThingsToDo = ({ stateName, data }) => {

  useEffect(() => {
    console.log(data)
  }, [])


  return (
    <div>
      <h1>Things to do in {stateName}</h1>
      {data && data.map(item => {
        return (
          <div key={item.id} className="supplemental-things-to-do-item-container">
            <h4>{item.title}</h4>
            <p>{item.shortDescription}</p>
            <a href={item.url} target="_blank">see on National Parks website</a>
          </div>
        )
      })}
    </div>
  )
}

export default ThingsToDo;