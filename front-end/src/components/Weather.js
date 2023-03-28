import React, { useEffect, useState } from "react";

import WeatherAPI from "../apis/weatherApi";
import { weatherApiKey } from '../keys'

import '../css/Weather.css'


const weatherAPI = new WeatherAPI(weatherApiKey);


const Weather = ({centerPosition}) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
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
    return(
      <div className='weather-container'>
        {weather && weather.map(w => {
          return (
            <div className="weather-day">
              <p><b>Next {w.date.getHours()} hours</b></p>

              <div
                className='weather-image'
                style={{
                  backgroundImage: `url(${w.iconUrl})`
                }}
              ></div>

              <p>{w.description}</p>
              <p>{w.temperature} &#8457;</p>

              
            </div> 
          )
        }
        )}
      </div>
    )
  }
}

export default Weather;