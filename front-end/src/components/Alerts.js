import React, { useEffect, useState } from "react";
import NParksServiceRequest from "../apis/nationalParksApi";

import '../css/Alerts.css'

const Alerts = () => {

  const [alerts, setAlerts] = useState(null)
  const [numAlerts, setNumAlerts] = useState(6)
  const [alertDetails, setAlertDetails] = useState('Hover over an alert to see full description')
  const [alertStyle, setAlertStyle] = useState({ border: "2px solid white" })
  const [parkName, setParkName] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const response = await NParksServiceRequest.getAlerts(numAlerts)
      // console.log(response)
      setAlerts(response)
    }
    getData()
  }, [numAlerts])

  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      // year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      // second: 'numeric'
    };
    return date.toLocaleString('en-US', options);
  }


  function convertAlertType(input) {
    if (input === 'Park Closure') {
      return 'alert-type-closure'
    } else if (input === 'Information') {
      return 'alert-type-information'
    } else if (input === 'Caution') {
      return 'alert-type-caution'
    } else if (input === 'Danger') {
      return 'alert-type-danger'
    }
  }

  const getMoreAlerts = () => {
    setNumAlerts(numAlerts+6)
    // console.log('get more alerts')
  }

  const showAlertDetails = (e, input) => {
    setAlertStyle({ border: "2px solid white" })
    setAlertDetails(input)
  }
  const hideAlertDetails = () => {
    setAlertDetails('Hover over an alert to see full description')
    setAlertStyle({ border: "2px solid white" })
  }
  

  return (
    <div id="alerts-container">
      <h1>Park Alerts</h1>
      <div className="alert-details" style={alertStyle}>
        <p>{alertDetails}</p>
      </div>
      <div id="alerts-items">
        {alerts && alerts.map(item => {

          let forMattedDate = formatDate(item.lastIndexedDate)
          let convertedAlertType = convertAlertType(item.category)
          
          return (
            <div 
              key={item.id}
              className="alert-item"
              onMouseEnter={(e) => { showAlertDetails(e, item.description)}}
              onMouseLeave={hideAlertDetails}>
              <div className={convertedAlertType}>
                <p>{item.category}</p>
              </div>
              <div className="alert-information">
                <p>{forMattedDate}</p>
                <p>{item.title}</p>
              </div>
              <div className="more-info-icon">
                {item.url
                  ? <a href={item.url} target="_blank">
                      <img className="more-info-icon" src={require('../images/more-info-icon.png')}></img>
                    </a>
                  : <></>
                }
              </div>
            </div>
          )
        })
        }
      </div>
      <button id='load-more-home-button-alerts' onClick={getMoreAlerts}>See More Alerts</button>
    </div>
  )
}

export default Alerts;