import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import BackendApiRequest from "../apis/backendApi";
import NavBar from "../NavBar";


const TripDetails = ({token, setToken}) => {

  const { id, tripname } = useParams()

  useEffect(() => {
    const getItems = async () => {
      const items = await BackendApiRequest.getItemsByTripId(id)
      console.log(items)
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