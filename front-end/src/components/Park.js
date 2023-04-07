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



const Park = ({token, setToken}) => {

  const parkCode = useParams();

  const [parkData, setParkData] = useState(null)
  const [zoom, setZoom] = useState(5)
  const [centerPosition, setCenterPosition] = useState(null)

  const [numImages, setNumImages] = useState(null)
  const [currentImageIdx, setCurrentImageIdx] = useState(0)


  useEffect(() => {
    const getSingleParkData = async () => {
      let data = await NParksServiceRequest.getSingleParkData(parkCode.code)
      console.log(data)
      setParkData(data)
      setCenterPosition([data.latitude, data.longitude])
      setNumImages(data.images.length)
    }
    getSingleParkData()    
  }, [])


  const increaseCurrentImageIdx = () => {
    setCurrentImageIdx(currentImageIdx + 1)
  }

  const decreaseCurrentImageIdx = () => {
    setCurrentImageIdx(currentImageIdx - 1)
  }






  if (parkData === null) {
    return (
      <Loading />
    )
  } else {
    return (
      <div className="park">
        <NavBar
          token={token}
          setToken={setToken}
        />
        <div className="park-main-container">

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
            <h1>{parkData.fullName}</h1>
          </div>


        </div>







        <div className="park-leftside">

          <div className="park-header">
            <p><b>Location:</b> {parkData.addresses[0].city}, {parkData.addresses[0].stateCode}</p>
            <p><b>Designation:</b> {parkData.designation}</p>
            <p>{parkData.description}</p>
            <a href={parkData.url} target='blank'>Visit Official Website</a>

            <h2>Conditions</h2>

          </div>

          
        
        </div>

        
        <div className="images">
          <div className="image-buttons-container">
            {currentImageIdx > 0
              ? <div className="back-arrow" onClick={decreaseCurrentImageIdx}><p>prev</p></div>
              : <div className="back-arrow-off"><p>prev</p></div>
            }
            {currentImageIdx < numImages - 1
              ? <div className="forward-arrow" onClick={increaseCurrentImageIdx}><p>next</p></div>
              : <div className="forward-arrow-off"><p>next</p></div>
            }
          </div>

          <img
            className='park-image'
            src={parkData.images[currentImageIdx].url}
          ></img>
        </div>


        
      </div>
    )
  }

}

export default Park;