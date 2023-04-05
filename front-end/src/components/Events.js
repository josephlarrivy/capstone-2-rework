import React, {useState, useEffect} from "react";

import '../css/Events.css'

const Events = ({stateName, data}) => {

  useEffect(() => {
    console.log(data)
  }, [])


  return (
    <div id="events-main-container">
      <h1>Events in {stateName}</h1>
      {data && data.map(item => {
        return (
          <div key={item.title} className="supplemental-events-item-container">
            <div className="supplemental-events-item-container-main">
              <h4>{item.title}</h4>
              <p>{item.parkfullname}</p>
              <p>{item.times[0].timestart} - {item.times[0].timeend}</p>
              <p>{item.timeinfo}</p>
            </div>
            <div className="supplemental-events-item-container-other">
              {item.location
              ? <p><b>Location:</b> {item.location}</p>
              : <p><b>Location:</b> See details</p>
              }
              <p><b>Category:</b> {item.category}</p>
              <p>
                <b>Types:</b>{" "}
                {item.types && (
                  <span>{item.types.join(", ")}</span>
                )}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Events;