import React, { useEffect, useState } from "react";

import WeatherAPI from "../apis/weatherApi";
import { weatherApiKey } from '../keys'
const weatherAPI = new WeatherAPI(weatherApiKey);


const Weather = ({centerPosition}) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    // weatherAPI.getWeather(centerPosition[0], centerPosition[1])
    //   .then(data => console.log(data))
    //   .then(data => setWeather(data))
    //   .catch(error => console.error(error));
    // console.log('#################')
    const getWeatherData = async () => {
      const data = await weatherAPI.getWeather(centerPosition[0], centerPosition[1])
      console.log(data)
      setWeather(data)
    }
    getWeatherData()
  }, [])


  if (weather === null) {
    return (
      <h4>Loading Weather</h4>
    )
  } else {
    console.log(weather)
    return(
      <>
        <h4>Upcoming Weather</h4>
        {weather && weather.map(w => {
          return (
            <>
              <p><b>Next {w.date.getHours()} hours</b></p>
              <p><b>{w.description}</b> and <b>{w.temperature} &#8457;</b></p>
              {/* <img src={w.url}></img> */}
            </> 
          )
        }
        )}
      </>
    )
  }
}

export default Weather;