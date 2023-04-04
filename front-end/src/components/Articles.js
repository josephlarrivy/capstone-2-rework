import React, { useState, useEffect } from "react";

import '../css/Articles.css'

const Articles = ({ stateName, data }) => {

  useEffect(() => {
    console.log(data)
  }, [])


  return (
    <div id="articles-main-container">
      <h1>Articles about {stateName}</h1>
      {data && data.map(item => {
        return (
          <div key={item.id} className="supplemental-articles-item-container">
            <a href={item.url} target="_blank"><h4>{item.title}</h4></a>
            <p>{item.listingDescription}</p>
            
            <div className="tags-contaier">
              {/* {item.tags && item.tags.map(tag => {
                return (
                  <p>{tag}</p>
                )
              })} */}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Articles;