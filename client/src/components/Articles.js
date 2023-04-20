import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import '../css/Articles.css'

const Articles = ({ stateName, data }) => {

  const navigate = useNavigate();

  useEffect(() => {
    console.log(data)
  }, [])

  const createParkLink = (arr) => {
    const buttons = []
    for (let item of arr) {
      buttons.push(<button onClick={() => navigate(`/park/${item.parkCode}`)}>{item.name}</button>)
    }
    return buttons
  }

  return (
    <div id="articles-main-container">
      <h1>Articles about {stateName}</h1>
      {data && data.map(item => {
        return (
          <>
            <div key={item.id} className="articles-item-container">
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
                  {item.relatedParks.length > 0
                    ? <div className="related-parks-buttons">
                      <b>Related Parks: </b>{createParkLink(item.relatedParks)}
                    </div>
                    : <></>
                  }
                </div>
            </div>
          </>
          
        )
      })}
    </div>
  )
}

export default Articles;