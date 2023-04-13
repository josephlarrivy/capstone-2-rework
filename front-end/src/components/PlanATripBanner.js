import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import '../css/PlanATripBanner.css'
import DateSelector from "./DateSelector";
import useTripPlanningLocalStorage from "../hooks/useTripPlanningLocalStorage";

const PlanATripBanner = () => {

  const [tripType, setTripType] = useState(null)
  const [startSelectedDate, setStartSelectedDate] = useState(null);
  const [endSelectedDate, setEndSelectedDate] = useState(null);
  const [saveTripType, saveStartDate, saveEndDate, updateTripData, clearTripDates, getTripData] = useTripPlanningLocalStorage()
  const navigate = useNavigate()

  useEffect(() => {
    clearTripDates()
  }, [])

  const handleStateSelect = (event) => {
    setTripType(event.target.value)
  }

  const goToNext = () => {
    saveTripType(tripType)
    saveStartDate(startSelectedDate)
    saveEndDate(endSelectedDate)
    navigate(`/planTrip/${tripType}`)
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
      {tripType &&
      <div id="date-pickers">
        <div id="date-start">
          <h2>Select a start date:</h2>
          <DateSelector selectedDate={startSelectedDate} setSelectedDate={setStartSelectedDate} />
        </div>
        <div id="date-end">
          <h2>Select an end date:</h2>
          <DateSelector selectedDate={endSelectedDate} setSelectedDate={setEndSelectedDate} />
        </div>
      </div>
      }
      {startSelectedDate && endSelectedDate
        ? <button onClick={() => goToNext()} id="start-planning-button">Start Planning</button>
        : <></>
      }
    </div>
  )
}

export default PlanATripBanner