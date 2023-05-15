import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NParksServiceRequest from "../apis/nationalParksApi";
import NavBar from "../NavBar";
import Weather from "./Weather";
import MiniMap from "./MiniMap";
import Sun from "./Sun";
import '../css/TourDetails.css'
import Loading from "./Loading";
import AudioPlayer from "./AudioPlayer";
import useStateNameConverter from "../hooks/useStateNameConverter";
import AddToTripDropdown from "./AddToTripDropdown";

const TourDetails = ({token, setToken}) => {

  const { id } = useParams()
  const [data, setData] = useState(null)
  const [zoom, setZoom] = useState(8)
  const [centerPosition, setCenterPosition] = useState(null)
  const [stateName, convertStateName] = useStateNameConverter();
  const navigate = useNavigate();


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
    let abbreviation = string.split(',').map(function (item) {
      return item.trim();
    }).join(', ');
    return abbreviation
  }


  const createParkLink = (item) => {
    return (<button onClick={() => navigate(`/park/${item.parkCode}`)}>{item.fullName}</button>)
  }

  useEffect(() => {
    console.log(centerPosition)
  }, [centerPosition])


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
          <div id="park-options-buttons">
            <AddToTripDropdown
              type='tour'
              route={`/tourDetails/${data.id}`}
              name={data.park.fullName}
              description={data.description}
              parkcode={data.park.parkCode}
              latitude={centerPosition[0].toString()}
              longitude={centerPosition[1].toString()}
            />
          </div>
            <div className="tour-details-map-footer">
              <Sun centerPosition={centerPosition} />
            </div>
          </>
        }

        <div className="tour-details-header-main">
          <h1><b>Tour: </b>{data.title}</h1>
          {data.park
            ? <div className="related-parks-buttons">
              <b>Located in: </b>{createParkLink(data.park)}
            </div>
            : <></>
          }
          <p><b>States: </b>{commaSeparator(data.park.states)}</p>
          <p><b>Duration: </b>{data.durationMin}-{data.durationMax} {convertDurationUnit(data.durationUnit)}</p>
          <p>{data.description}</p>
        </div>

        <br></br>

        <div className="tour-details-stops-container">
          <h4>Follow this step-by-step guide to make the most of you visit</h4>
          {data.stops && data.stops.map(item => {
            return (
              <div key={item.ordinal} className="tour-details-stops-item-container">
                <div className="left">
                  <p><u><b>Stop {item.ordinal}</b></u></p>
                  <p className="tour-details-stops-item-container-name">{item.assetName}</p>
                  {item.audioFileUrl
                    ? <p>Click to play audio</p>
                    : <p>No audio for this stop</p>
                  }
                  <AudioPlayer src={item.audioFileUrl} />
                </div>
                <div className="right">
                  <p><b>Type: </b>{item.assetType}</p>
                  <p><b>Significance: </b>{item.significance}</p>
                  <p><b>Directions to next stop: </b>{item.directionsToNextStop}</p>
                </div>
              </div>
            )
            })
          }
        </div>
      </div>


      <br></br>
      <br></br>
      <br></br>
      <br></br>

    </div>
  )
}
}

export default TourDetails;