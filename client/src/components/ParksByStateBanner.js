import React, { useState, useEffect } from "react";
import '../css/ParksByStateBanner.css'
import StateSelect from "./StateSelect";
import { useNavigate } from 'react-router-dom';
import useStateNameConverter from "../hooks/useStateNameConverter";
import NParksServiceRequest from "../apis/nationalParksApi";


const ParksByStateBanner = () => {

  const [USstate, setUSstate] = useState(null)
  const [stateName, convertStateName] = useStateNameConverter();
  const [parksList, setParksList] = useState(null)
  const [selectedPark, setSelectedPark] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    convertStateName(USstate)
    const getParks = async () => {
      if (USstate === null) {
        // console.log('null')
      } else {
        const response = await NParksServiceRequest.getParksByState(USstate)
        console.log(response)
        setParksList(response)
      }
    }
    getParks()
    setSelectedPark(null)
  }, [USstate])


  const handleParkSelect = (event) => {
    console.log(event.target.value)
    setSelectedPark(event.target.value)
  }

  const handleGoToPark = async (e) => {
    navigate(`/park/${selectedPark}`)
  }

  return (
    <div id='parks-by-state-container'>
      {USstate === null
        ? <h1>Find a Park</h1>
        : <h1>Parks in {stateName}</h1>
      }

      <div id="state-select">
        <StateSelect USstate={USstate} setUSstate={setUSstate} />
      </div>

      {parksList && 
        <form>
          <label htmlFor="park-select"></label>
          <select id="park-select-dropdown" name="park-select" onChange={handleParkSelect}>
            {parksList.map(item => {
              return (
                <option
                  key={item.parkCode}
                  value={item.parkCode}
                  // onClick={handleParkSelect}
                  >{item.name}
                </option>
              )
            })}
          </select>
        </form>
      }

      {selectedPark === null
        ? <p></p>
        : <div
            id="search-button"
            onClick={(e) => handleGoToPark(e)}
          ><p>View Park</p>
          </div>
      }
      


    </div>
  )
}

export default ParksByStateBanner;