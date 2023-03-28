import React, { useEffect, useState } from "react";


import MainMap from './MainMap'
import NavBar from "../NavBar";
import NParksServiceRequest from '../apis/nationalParksApi';

import '../css/NavBar.css'
import '../css/Home.css'


const Home = ({token, setToken}) => {

  const [showingParks, setShowingParks] = useState(null)


  useEffect(() => {
    const getInitialParks = async () => {
      let resp = await NParksServiceRequest.getAllParks(700)
      setShowingParks(resp)
    }
    getInitialParks()
  }, [])

  return (
    <div className="home-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <div className="main-map-container">
        <MainMap
          showingParks={showingParks}
        />
      </div>
      {/* <TestMap /> */}
    </div>
  )
}

export default Home;