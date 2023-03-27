import React, { useEffect, useState } from "react";

import Map from '../components/Map'
import NParksServiceRequest from '../nationalParksApi';



const Home = () => {

  const [zoom, setZoom] = useState(2)
  const [centerPosition, setCenterPosition] = useState([0,0])
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
      <Map
        zoom={zoom}
        centerPosition={centerPosition}
        showingParks={showingParks}
      />
    </div>
  )
}

export default Home;