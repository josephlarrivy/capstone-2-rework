import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { useParams } from 'react-router';


import '../css/Park.css'
import MiniMap from "./MiniMap";
import Weather from "./Weather";

import NParksServiceRequest from "../apis/nationalParksApi";



const Park = () => {

  const parkCode = useParams();
  const [parkData, setParkData] = useState(null)
  const [zoom, setZoom] = useState(6)
  const [centerPosition, setCenterPosition] = useState(null)
  const [images, setImages] = useState(null)


  useEffect(() => {
    const getSingleParkData = async () => {
      let data = await NParksServiceRequest.getSingleParkData(parkCode.code)
      setParkData(data)
      console.log(data)
      setCenterPosition([data.latitude, data.longitude])
      
    }
    getSingleParkData()    
  }, [])


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
        <br></br>
        <Weather
          centerPosition={centerPosition}
        />
      </div>
    )
  }

}

export default Park;