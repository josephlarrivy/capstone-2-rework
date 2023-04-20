import React, {useState, useEffect} from "react";

import '../css/Sun.css'
import SunriseSunset from "../apis/sunriseSunsetApi";


const Sun = ({centerPosition}) => {

  const [sunData, setSunData] = useState(null)

  useEffect(() => {
    const getSunData = async () => {
      let data = await SunriseSunset.getSunriseSunset(centerPosition[0], centerPosition[1])
      setSunData(data)
    }
    getSunData()
  }, [])


  return (
    <>
      {sunData &&
        <div className="sun-data-container">
          <div className="sunrise">
            <p>Sunrise: </p>
            <div id="sunrise-animation"></div>
            <p>{sunData.sunrise}</p>
          </div>
          <div className="sunset">
            <p>Sunset: </p>
            <div id="sunset-animation"></div>
            <p>{sunData.sunset}</p>
          </div>
        </div>
      }
    </>
    
  )
}

export default Sun;