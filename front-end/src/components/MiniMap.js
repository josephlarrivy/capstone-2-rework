import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';


import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import '../css/MiniMap.css'

const MiniMap = ({ zoom, centerPosition }) => {

  const rand = Math.random()

  return (
    <>
      <MapContainer
        key={'miniMapContainer'}
        center={centerPosition}
        zoom={zoom}>

        {centerPosition && centerPosition.map(
          park => {
            return (
              <Marker
                key={rand}
                position={[
                  centerPosition[0],
                  centerPosition[1]
                ]}
              ></Marker>
        )})}
        
        <TileLayer
          key={'tileLayer'}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

      </MapContainer>
    </>
  )
}


export default MiniMap;