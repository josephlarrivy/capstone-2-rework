import React, { useEffect, useState } from "react";


import MainMap from './MainMap'
import NParksServiceRequest from '../nationalParksApi';

import '../css/Home.css'


const Home = () => {

  const [showingParks, setShowingParks] = useState(null)


  useEffect(() => {
    const getInitialParks = async () => {
      let resp = await NParksServiceRequest.getAllParks(700)
      setShowingParks(resp)
    }
    getInitialParks()
  })

  return (
    <div className="home-container">
      <MainMap
        showingParks={showingParks}
      />
    </div>
  )
}

export default Home;