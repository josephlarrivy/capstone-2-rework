import React, {useState, useEffect} from "react";

import '../css/Events.css'

const Events = ({stateName, data}) => {

  useEffect(() => {
    console.log(data)
  }, [])

  function convertDate(dateStr) {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const [month, day, year] = formattedDate.split(' ');
    return { month: month, day: parseInt(day), year: parseInt(year) };
  }


  return (
    <div id="events-main-container">
      <h1>Events in {stateName}</h1>
      {data && data.map(item => {

        let formattedDate = convertDate(item.date)

        return (
          <div key={item.title} className="events-item-container">
            <div className="events-item-date">
              <p className="event-month">{formattedDate.month}</p>
              <p className="event-day">{formattedDate.day}</p>
              <p className="event-year">{formattedDate.year}</p>
              <hr></hr>
              <p className="event-times">{item.times[0].timestart}</p>
            </div>
            <div className="events-item-container-main">
              {item.images.length>0
                ? <div className="events-item-image-container">
                  <img src={`https://www.nps.gov${item.images[0].url}`}></img>
                </div>
                : <div
                  className="events-item-image-container">
                    <img src={require('../images/black.png')}></img>
                    <p>no image</p>
                  </div>
              }
              <h4>{item.title}</h4>
              <p>{item.parkfullname}</p>
              {item.location
                ? <p><b>Location:</b> {item.location}</p>
                : <p><b>Location:</b> See details</p>
              }
              <p className="event-times"><b>Time:</b> {item.times[0].timestart} - {item.times[0].timeend}</p>
              {item.timeinfo
                ? <>
                    <hr></hr>
                    <p>Time details: {item.timeinfo}</p>
                  </>
                : <p></p>
              }
            </div>
            <div className="events-item-container-other">
              
              {item.isfree
                ? <p><b>Cost:</b> Free</p>
                : <p><b>Cost:</b> Not Free</p>
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