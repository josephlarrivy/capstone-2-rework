import React, { useState, useEffect } from "react";

import '../css/ThingsToDo.css'

const ThingsToDo = ({ stateName, data }) => {


  useEffect(() => {
    console.log(data)
  }, [])

  const breakArrayToString = (arr) => {
    return arr.join(", ");
  }


  return (
    <div id="things-to-do-container">
      <h1>Things to do in {stateName}</h1>
      {data && data.map(item => {

        const seasonsBroken = (breakArrayToString(item.season))

        return (
          <div key={item.id} className="things-to-do-item-container">


            {item.images.length > 0
              ? <div className="things-to-do-item-image-container">
                <img src={`${item.images[0].url}`}></img>
              </div>
              : <div
                className="things-to-do-item-image-container">
                <img src={require('../images/black.png')}></img>
                <p>no image</p>
              </div>
            }



            <div className="supplemental-things-to-do-item-container-main">
              <h4>{item.title} 
                <a href={item.url} target="_blank">
                  <img className="more-info-icon-thing-to-do" src={require('../images/more-info-icon.png')}></img>
                </a>
              </h4>
              {item.location &&
                <p><b>Location: </b>{item.location}</p>
              }
              <p>{item.shortDescription}</p>
            </div>


            


            <div className="supplemental-articles-item-container-other">
              {item.activities
                ? <p><b>Activity: </b>{item.activities[0].name}</p>
                : <p></p>
              }
              {item.duration
                ? <p><b>Duration: </b>{item.duration}</p>
                : <p></p>
              }
              {item.season.length >0
                ? <p><b>Seasons: </b>{seasonsBroken}</p>
                : <p></p>
              }
              
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ThingsToDo;




