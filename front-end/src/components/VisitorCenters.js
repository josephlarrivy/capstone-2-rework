import React, {useState, useEffect} from "react";
import NavBar from "../NavBar";
import { useParams } from 'react-router-dom';
import useStateNameConverter from "../hooks/useStateNameConverter";
import NParksServiceRequest from "../apis/nationalParksApi";

import '../css/VisitorsCenters.css'

const VisitorCenters = ({token, setToken}) => {

  const { USstate } = useParams()
  const [stateName, convertStateName] = useStateNameConverter();

  useEffect(() => {
    const getData = async () => {
      const response = await NParksServiceRequest.getVisitorCentersByState(USstate)
      console.log(response)
      // setData(response)
    }
    getData()
    convertStateName(USstate)
  }, [])

  return (
    <div id="visitor-centers-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <div id='visitor-centers-main'>
        <h1>VisitorCenters in {stateName}</h1>

      </div>
    </div>
  )
}

export default VisitorCenters;