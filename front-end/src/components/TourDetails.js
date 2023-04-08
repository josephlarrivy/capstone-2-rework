import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NParksServiceRequest from "../apis/nationalParksApi";
import NavBar from "../NavBar";
import Weather from "./Weather";
import MiniMap from "./MiniMap";
import Sun from "./Sun";
import '../css/TourDetails.css'
import Loading from "./Loading";

const TourDetails = ({token, setToken}) => {

  const { id } = useParams()
  const [data, setData] = useState(null)
  const [zoom, setZoom] = useState(8)
  const [centerPosition, setCenterPosition] = useState(null)

  useEffect(() => {
    const getData = async () => {

      const tourData = await NParksServiceRequest.getTourDetails(id)
      console.log(tourData)
      setData(tourData)

      const location = await NParksServiceRequest.getParkLatLong(tourData.park.parkCode)
      const parsedLat = parseFloat(location.latitude)
      const parsedLon = parseFloat(location.longitude)
      setCenterPosition([parsedLat, parsedLon])

    }
    getData()
  }, [])


  const convertDurationUnit  = (input) => {
    if (input === 'm') {
      return 'minutes'
    } else if (input === 'h') {
      return 'hours'
    }
  }

  const commaSeparator = (string) => {
    return string.split(',').map(function (item) {
      return item.trim();
    }).join(', ');
  }






  if (data === null) {
    return (
      <Loading />
    )
  } else {
  return (
    <div className="tour-details">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <div className="tour-details-main-container">
        {centerPosition && 
          <>
            <div className="weather">
              <Weather centerPosition={centerPosition} />
            </div>
            <div className="tour-details-header-map-conatiner">
              <MiniMap
                zoom={zoom}
                centerPosition={centerPosition}
              />
            </div>
            <div className="tour-details-map-footer">
              <Sun centerPosition={centerPosition} />
            </div>
          </>
        }

        <div className="tour-details-header-main">
          <h1><b>Tour: </b>{data.title}</h1>
          <p><b>States: </b>{commaSeparator(data.park.states)}</p>
          <p><b>Duration: </b>{data.durationMin}-{data.durationMax} {convertDurationUnit(data.durationUnit)}</p>
          <p>{data.description}</p>
        </div>

        <br></br>

        <div className="tour-details-stops-container">
          <h4>Follow this step-by-step guide to make the most of you visit</h4>
          {data.stops && data.stops.map(item => {
            return (
              <div className="tour-details-stops-item-container">
                <p className="tour-details-stops-item-container-name"><b>Stop {item.ordinal}: </b>{item.assetName}</p>
                <p className="tour-details-stops-item-container-type"><b>Type: </b>{item.assetType}</p>
                <p className="tour-details-stops-item-container-significance"><b>Significance: </b>{item.significance}</p>
                <p className="tour-details-stops-item-container-significance-directions"><b>Directions to next stop: </b>{item.directionsToNextStop}</p>
              </div>
            )
            })
          }
        </div>
      </div>




      {/* <div className="images">
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
      </div> */}

      <br></br>
      <br></br>
      <br></br>
      <br></br>

    </div>
  )
}
}

export default TourDetails;