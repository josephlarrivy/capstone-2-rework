import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import NParksServiceRequest from "../apis/nationalParksApi";
import NavBar from "../NavBar";

const Supplemental = ({token, setToken}) => {

  const { type, USstate } = useParams()

  useEffect(() => {
    const getData = async () => {
      const data = await NParksServiceRequest.getSupplementalData(type, USstate)
      console.log(data)
    }
    getData()
  }, [])

  return (
    <div id="supplemental-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <div className="supplemental-main">
        <h1>{type} {USstate}</h1>
      </div>
    </div>
  )
}

export default Supplemental;