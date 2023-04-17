import React, {useState, useEffect} from "react";
import NavBar from "../NavBar";
import useLocalStorage from "../hooks/useLocalStorage";
import TripNameForm from "../forms/TripNameForm";
import BackendApiRequest from "../apis/backendApi";
import { Link, useNavigate } from "react-router-dom";

import '../css/MyTrips.css'

const MyTrips = ({token, setToken}) => {

  const [localStoreToken, localRemoveToken, localRetrieveToken, localDecodeToken] = useLocalStorage()
  const [username, setUsername] = useState(null)
  const [trips, setTrips] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getUsername = async () => {
      const token = await localDecodeToken()
      setUsername(token.username)
    }
    getUsername()
  }, [])

  
  useEffect(() => {
    const getTrips = async () => {
      const data = await BackendApiRequest.getUserTrips(username)
      console.log(data)
      setTrips(data)
    }
    getTrips()
  }, [username])

  const deleteTrip = async (tripname) => {
    const resp = await BackendApiRequest.deleteTrip(tripname)
    if (resp.status === 202) {
      const getTrips = async () => {
        const data = await BackendApiRequest.getUserTrips(username)
        console.log(data)
        setTrips(data)
      }
      getTrips()
    }
  }

  const viewTripDetails = (tripname) => {
    navigate(`/tripDetails/${tripname}`)
  }


  return (
    <div id="my-trips-main-container">
      <NavBar 
        token={token}
        setToken={setToken}
      />
      <div id="my-trips-page-container">
        <h1>My Trips</h1>
        <div id="trip-name-form">
          <TripNameForm />
        </div>
        <div id="trip-list-container">
          {trips && trips.map(trip => {
            return (
              <div className="trip-container">
                <p key={trip.tripname}>{trip.tripname}
                  <button onClick={() => { deleteTrip(trip.tripname) }}>delete trip</button>
                  <button onClick={() => { viewTripDetails(`${trip.id}/${trip.tripname}`) }}>view trip</button>
                </p>
              </div>
            )
          })

          }
        </div>
        
      </div>
      
    </div>
  )
}

export default MyTrips;