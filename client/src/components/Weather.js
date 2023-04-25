import React, { useEffect, useState } from "react";

import WeatherAPI from "../apis/weatherApi";

import '../css/Weather.css'

const weatherAPI = new WeatherAPI("0486eaf725aeecc834735c80086222e9");


const Weather = ({centerPosition}) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const getWeatherData = async () => {
      const data = await weatherAPI.getWeather(centerPosition[0], centerPosition[1])
      // console.log(data)
      const [first, , last] = data.slice(0, 3)
      setWeather([first, last])
    }
    getWeatherData()
  }, [])

  function convertTimestampToDayAndTime(timestamp) {
    const date = new Date(timestamp);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const time = `${formattedHours}:${formattedMinutes} ${ampm}`;
    return `${dayOfWeek} ${time}`;
  }


  if (weather === null) {
    return (
      <></>
    )
  } else {
    return(
      <div key="weather-container" className="weather-container">
        {/* <h2>Weather Forcast</h2> */}
        <div key='weather-days-container' className='weather-days-container'>
          {weather && weather.map(w => {

            const convertedDay = convertTimestampToDayAndTime(w.date.getTime())

            return (
              <div key={w.date} className="weather-day">
                <p>{convertedDay}</p>

                <div
                  className='weather-image'
                  key={w.temperature}
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
      </div>
      
    )
  }
}

export default Weather;