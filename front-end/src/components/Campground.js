import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NParksServiceRequest from "../apis/nationalParksApi";
import NavBar from "../NavBar";
import Weather from "./Weather";
import MiniMap from "./MiniMap";
import AddToTripDropdown from "./AddToTripDropdown";
import Sun from "./Sun";

import '../css/Campground.css'

const Campground = ({token, setToken}) => {

  const { id } = useParams()

  const [campgroundData, setCampgroundData] = useState(null)
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
    const getDetails = async () => {
      const data = await NParksServiceRequest.getCampgroundDetails(id)
      console.log(data)
      setCampgroundData(data)
      setCenterPosition([data.latitude, data.longitude])
      console.log([data.latitude, data.longitude])
    }
    getDetails()
  }, [])


  useEffect(() => {

  }, [])

  const toggleCampgrounds = () => {
    if (campgroundsToggleState === 'Hide Campgrounds') {
      setCampgroundsToggleState('Show Campgrounds')
    } else if (campgroundsToggleState === 'Show Campgrounds') {
      setCampgroundsToggleState('Hide Campgrounds')
    }
  }


  return (
    <div id="campground-main-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <div id="campground-page-container">
        <div className="weather">
          {/* <Weather centerPosition={centerPosition} /> */}
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
          {/* <Sun centerPosition={centerPosition} /> */}
        </div>

        <div className="park-header-main">
          {/* <h1>{campgroundData.fullName}  <a href={campgroundData.url}target='blank'><img className="more-info-icon-park-page" src={require('../images/more-info-icon.png')}></img></a></h1> */}
          {/* <p className="park-address">{campgroundData.addresses[0].line1} - {campgroundData.addresses[0].city}, {campgroundData.addresses[0].stateCode}</p> */}

          {/* {campgroundData.designation
            ? <p><b>Designation:</b> {campgroundData.designation}</p>
            : <></>
          } */}
          {/* {campgroundData.directionsInfo && campgroundData.directionsUrl
            ? <p><b>Directions: </b>{campgroundData.directionsInfo}<a href={campgroundData.directionsUrl} target='blank'><img className="more-info-icon-park-page" src={require('../images/more-info-icon.png')}></img></a></p>
            : <></>
          } */}
          {/* {campgroundData.entranceFees[0].description && campgroundData.entranceFees[0].cost
            ? <div className="entrance-fees">
              <p><b>Entrance Fees:</b> {campgroundData.entranceFees[0].description}</p>
              <p><b>Cost:</b> {campgroundData.entranceFees[0].cost}</p>
            </div>
            : <></>
          } */}
          {/* {campgroundData.description
            ? <p>{campgroundData.description}</p>
            : <></>
          } */}
        </div>

      </div>
    </div>
  )
}

export default Campground;