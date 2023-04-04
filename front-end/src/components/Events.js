import React, {useState, useEffect} from "react";

const Events = ({stateName, data}) => {

  useEffect(() => {
    console.log(data)
  }, [])


  return (
    <div>
      <h1>Events in {stateName}</h1>
      {data && data.map(item => {
        return (
          <div key={item.title} className="supplemental-events-item-container">
            <h4>{item.title}</h4>
            {item.types.map(val => {
              return (
                <p>{val}</p>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Events;