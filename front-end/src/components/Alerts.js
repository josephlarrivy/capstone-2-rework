import React, { useEffect, useState } from "react";
import NParksServiceRequest from "../apis/nationalParksApi";




const Alerts = () => {

  const [alerts, setAlerts] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const response = await NParksServiceRequest.getAlerts(6)
      console.log(response)
      setAlerts(response)
    }
    getData()
  }, [])

  function formatDate(dateString) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;

    return (`${month} ${day}, ${year} at ${formattedHour}:${formattedMinute} ${period}`);
  }


  return (
    <div id="alerts-container">
      <h1>Alerts</h1>
      {alerts && alerts.map(item => {
        return (
          <div key={item.id} className="alert-container">
            <p>{item.category}</p>
          </div>
        )
      })

      }
    </div>
  )
}

export default Alerts;