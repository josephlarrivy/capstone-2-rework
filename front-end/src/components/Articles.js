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
          <>
            <div className="articles-item-container">
              {item.listingImage.url
                ? <div className="articles-item-image-container">
                    <img src={item.listingImage.url}></img>
                  </div>
                : <div className="articles-item-image-container">
                    <img src={require('../images/black.png')}></img>
                  </div>
              }
              <div className="articles-item-container-info">
                <a href={item.url} target="_blank"><h4>{item.title}</h4></a>
                <p>{item.listingDescription}</p>
              </div>
            </div>
          </>
          
        )
      })}
    </div>
  )
}

export default Articles;