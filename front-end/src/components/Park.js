import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { useParams } from 'react-router';

import '../css/Park.css'

import NavBar from "../NavBar";
import MiniMap from "./MiniMap";
import Weather from "./Weather";

import NParksServiceRequest from "../apis/nationalParksApi";
import Sun from "./Sun";
import Loading from "./Loading";
import ImagesDisplayer from "./ImagesDisplayer";
import ImageCollage from "./ImageCollage";



const Park = ({token, setToken}) => {

  const parkCode = useParams();

  const [parkData, setParkData] = useState(null)
  const [zoom, setZoom] = useState(5)
  const [centerPosition, setCenterPosition] = useState(null)
  const [imagesArray, setImagesArray] = useState(null)
  

  useEffect(() => {
    const getSingleParkData = async () => {
      let data = await NParksServiceRequest.getSingleParkData(parkCode.code)
      console.log(data)
      setParkData(data)
      setCenterPosition([data.latitude, data.longitude])
      let images = await NParksServiceRequest.getSingleParkImages(parkCode.code)
      setImagesArray(images)
    }
    getSingleParkData()
    console.log(imagesArray)
  }, [])


  
  if (parkData === null) {
    return (
      <Loading />
    )
  } else {
    return (
      <div id="park">
        <NavBar
          token={token}
          setToken={setToken}
        />
        <div id="park-main-container">

          <div className="weather">
            <Weather centerPosition={centerPosition} />
          </div>

          <div className="park-header-map-conatiner">
            <MiniMap
              zoom={zoom}
              centerPosition={centerPosition}
            />
          </div>

          <div className="park-map-footer">
            <Sun centerPosition={centerPosition} />
          </div>

          <div className="park-header-main">
            <h1>{parkData.fullName}  <a href={parkData.url} target='blank'><img className="more-info-icon-park-page" src={require('../images/more-info-icon.png')}></img></a></h1>
            <p><b>Location:</b> {parkData.addresses[0].city}, {parkData.addresses[0].stateCode}</p>
            <p><b>Designation:</b> {parkData.designation}</p>
            <p>{parkData.description}</p>
          </div>
        </div>

        {imagesArray && 
          <ImageCollage imagesArray={imagesArray}/>
        }

      </div>
    )
  }

}

export default Park;