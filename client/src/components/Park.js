import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router';

import '../css/Park.css'

import NavBar from "../NavBar";
import MiniMap from "./MiniMap";
import Weather from "./Weather";

import Sun from "./Sun";
import Loading from "./Loading";
import ImagesDisplayer from "./ImagesDisplayer";
import ImageCollage from "./ImageCollage";
import AlertsByPark from "./AlertsByPark";

import NParksServiceRequest from "../apis/nationalParksApi";
import RecreationAPI from "../apis/RecreationApi";
import AddToTripDropdown from "./AddToTripDropdown";



const Park = ({token, setToken}) => {

  const parkCode = useParams();

  const [parkData, setParkData] = useState(null)
  const [zoom, setZoom] = useState(7)
  const [centerPosition, setCenterPosition] = useState(null)
  const [imagesArray, setImagesArray] = useState(null)
  const [tourLinks, setTourLinks] = useState(null)
  const [alerts, setAlerts] = useState(null)
  const [campgrounds, setCampgrounds] = useState(null)
  const [campgroundsToggleState, setCampgroundsToggleState] = useState('Show Campgrounds')
  const [numCampgrounds, setNumCampgrounds] = useState(0)
  const navigate = useNavigate()
  

  useEffect(() => {
    const getSingleParkData = async () => {
      const data = await NParksServiceRequest.getSingleParkData(parkCode.code)
      console.log(data)
      setParkData(data)
      setCenterPosition([data.latitude, data.longitude])
      let images = await NParksServiceRequest.getSingleParkImages(parkCode.code)
      setImagesArray(images)
    }
    getSingleParkData()

    const createTourLinks = async (code) => {
      const arrayOfButtons = []
      const tours = await NParksServiceRequest.getToursByParkCode(code)
      if (tours === null) {
        setTourLinks(null)
      } else {
        for (let tour of tours) {
          arrayOfButtons.push(
            <button 
              onClick={() => navigate(`/tourDetails/${tour.id}`)}
              key={tour.id}
            >{tour.title}</button>)
        }
        setTourLinks(arrayOfButtons)
      }
    }
    createTourLinks(parkCode.code)

    const getParkAlerts = async (code) => {
      const alertsData = await NParksServiceRequest.getAlertsByParkCode(code)
      // console.log(alertsData)
      setAlerts(alertsData)
    }
    getParkAlerts(parkCode.code)

    const getCampgrounds = async (code) => {
      const campgroundsData = await NParksServiceRequest.getCampgroundsByPark(code)
      console.log(campgroundsData)
      setCampgrounds(campgroundsData)
      setNumCampgrounds(campgroundsData.length)
      if (campgroundsData.length === 0) {
        setCampgroundsToggleState('No Campgrounds')
      }
    }
    getCampgrounds(parkCode.code)

  }, [])

  const toggleCampgrounds = () => {
    if (campgroundsToggleState === 'Hide Campgrounds') {
      setCampgroundsToggleState('Show Campgrounds')
    } else if (campgroundsToggleState === 'Show Campgrounds') {
      setCampgroundsToggleState('Hide Campgrounds')
    }
  }

  
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

          <div className="park-header-map-conatiner-small">
            <MiniMap
              zoom={zoom}
              centerPosition={centerPosition}
              campgrounds={campgrounds}
              campgroundsToggleState={campgroundsToggleState}
            />
          </div>

          <div className="park-map-footer">
            <div id="park-options-buttons">
              <button id="toggle-campgrounds-button" onClick={() => toggleCampgrounds()}>{campgroundsToggleState} ({numCampgrounds})</button>
              {/* <AddToTripDropdown 
                type='park'
                route={`/park/${parkData.parkCode}`}
                name={parkData.fullName}
                description={parkData.description}
                parkcode={parkData.parkCode}
                latitude={parkData.latitude}
                longitude={parkData.longitude}
              /> */}
            </div>
            <Sun centerPosition={centerPosition} />
          </div>

          <div className="park-header-main">
            <h1>{parkData.fullName}  <a href={parkData.url} target='blank'><img className="more-info-icon-park-page" src={require('../images/more-info-icon.png')}></img></a></h1>
            <p className="park-address">{parkData.addresses[0].line1} - {parkData.addresses[0].city}, {parkData.addresses[0].stateCode}</p>
            
            {parkData.designation
              ? <p><b>Designation:</b> {parkData.designation}</p>
              : <></>
            }
            {tourLinks
              ? <p><b>Tours: </b>{tourLinks}</p>
              : <></>
            }
            {parkData.directionsInfo && parkData.directionsUrl
              ? <p><b>Directions: </b>{parkData.directionsInfo}<a href={parkData.directionsUrl} target='blank'><img className="more-info-icon-park-page" src={require('../images/more-info-icon.png')}></img></a></p>
              : <></>
            }
            {parkData.entranceFees[0].description && parkData.entranceFees[0].cost
              ? <div className="entrance-fees">
                  <p><b>Entrance Fees:</b> {parkData.entranceFees[0].description}</p>
                  <p><b>Cost:</b> {parkData.entranceFees[0].cost}</p>
                </div>
              : <></>
            }
            {parkData.description
              ? <p>{parkData.description}</p>
              : <></>
            }
          </div>
        </div>

        {imagesArray && 
          <ImageCollage imagesArray={imagesArray}/>
        }
        {alerts
          ? <AlertsByPark code={parkCode.code} />
          : <></>
        }

      </div>
    )
  }

}

export default Park;