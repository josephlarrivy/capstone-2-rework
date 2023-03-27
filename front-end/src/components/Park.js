import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { useParams } from 'react-router';


import '../css/Park.css'
import MiniMap from "./MiniMap";

import NParksServiceRequest from "../apis/nationalParksApi";
import WeatherAPI from "../apis/weatherApi";
import { weatherApiKey } from '../keys'
const weatherAPI = new WeatherAPI(weatherApiKey);



const Park = () => {

  const parkCode = useParams();
  const [parkData, setParkData] = useState(null)
  const [zoom, setZoom] = useState(6)
  const [centerPosition, setCenterPosition] = useState(null)
  const [images, setImages] = useState(null)

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const getSingleParkData = async () => {
      let data = await NParksServiceRequest.getSingleParkData(parkCode.code)
      setParkData(data)
      console.log(data)
      setCenterPosition([data.latitude, data.longitude])
      weatherAPI.getWeather(data.latitude, data.longitude)
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }
    getSingleParkData()

    
  }, [])

  useEffect(() => {
    
  }, [parkData])

  if (parkData === null) {
    return (
      <h1>Loading</h1>
    )
  } else {
    return (
      <div className="park">

        <div className="park-banner">
          <div className="images">
            <img
              className='park-image'
              src={parkData.images[0].url}
            ></img>
          </div>

          <div className="mini-map-conatiner">
            <MiniMap 
              zoom={zoom}
              centerPosition={centerPosition}
            />
          </div>
        </div>
        
        <div className="park-info">
          <h3>{parkData.fullName}</h3>
          <p><b>Location:</b> {parkData.addresses[0].city}, {parkData.addresses[0].stateCode}</p>
          <p><b>Designation:</b> {parkData.designation}</p>
          <p>{parkData.description}</p>
          <p><b>Weather:</b> {parkData.weatherInfo}</p>
          <a href={parkData.url} target='blank'>Visit Official Website</a>
        </div>
        
      </div>
    )
  }

}

export default Park;