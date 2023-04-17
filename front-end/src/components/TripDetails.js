import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import BackendApiRequest from "../apis/backendApi";
import NavBar from "../NavBar";


const TripDetails = ({token, setToken}) => {

  const { tripname } = useParams()

  useEffect(() => {
    const getItems = async () => {
      // const items = await BackendApiRequest
    }
    getItems()
  }, [])



  return (
    <div id="trip-details-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <div id="trip-details-inner-container">
        <h1>Trip Details: {tripname}</h1>
      </div>
    </div>
  )
}

export default TripDetails;