import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import '../css/PlanATripBanner.css'


const PlanATripBanner = () => {

  const [tripType, setTripType] = useState(null)
  const navigate = useNavigate()

  const handleStateSelect = (event) => {
    console.log(event.target.value)
    setTripType(event.target.value)
  }

  const goToNext = () => {
    navigate(`/planTrip/${tripType}`)
    // console.log(tripType)
  }

  return (
    <div id="plan-a-trip-banner-container">
      <h1>Plan a Trip</h1>
      <form>
        <label htmlFor="state-select"></label>
        <select id="trip-type-select-dropdown" name="state-select" onChange={handleStateSelect}>
          <option value="placeholder">What would you like to plan your trip around?</option>
          <option value="events">Find events to plan around</option>
          <option value="campgrounds">Find campgrounds to plan around</option>
        </select>
      </form>
      {tripType
        ? <button onClick={() => goToNext()} id="start-planning-button">Start Planning</button>
        : <></>
      }
    </div>
  )
}

export default PlanATripBanner