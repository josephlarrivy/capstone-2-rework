import React, {useState, useEffect} from "react";
import NavBar from "../NavBar";

import '../css/PlanATripMain.css'
import useTripPlanningLocalStorage from "../hooks/useTripPlanningLocalStorage";


const PlanEventsTrip = (token, setToken) => {

  const [saveTripType, saveStartDate, saveEndDate, updateTripData, clearTripDates, getTripData] = useTripPlanningLocalStorage()

  useEffect(() => {
    const tripData = getTripData()
    console.log(tripData)
  }, [])

  return (
    <div id="plan-a-trip-full-container">
      <NavBar
        token={token}
        setToken={setToken} />
      <div id="plan-a-trip-page-container">
        <h1>Plan and event-related trip</h1>
      </div>
    </div>
  )
}

export default PlanEventsTrip;