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
            {item.listingImage.url
            ?
              <div key={item.id} className="supplemental-articles-item-container">

                <div className="supplemental-articles-image-container">
                  {item.listingImage.url
                    ? <div className="supplemental-articles-item-image-container">
                        <img src={item.listingImage.url}></img>
                      </div>
                    : <div
                        className="supplemental-articles-item-noimage-container">
                        <p>no image</p>
                      </div>
                  }
                </div>

                <div className="supplemental-articles-item-container-info">
                  <a href={item.url} target="_blank"><h4>{item.title}</h4></a>
                  <p>{item.listingDescription}</p>
                </div>

              </div>
            : <></>
            }
          </>
          
        )
      })}
    </div>
  )
}

export default Articles;