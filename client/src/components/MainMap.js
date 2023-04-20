import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';


import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import '../css/MainMap.css'
import NavBar from '../NavBar';

const MainMap = ({showingParks}) => {

  const [zoom, setZoom] = useState(4)
  const [centerPosition, setCenterPosition] = useState([35, -94])

  return (
    <div className='map-container'>
      <MapContainer
        key={'MapContainer'}
        center={centerPosition}
        zoom={zoom}>
        
        <TileLayer
          key={'tileLayer'}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />



        {showingParks &&
          showingParks.map(park => {
            return (
              <Marker
                key={park.parkCode}
                position={[
                  park.latitude,
                  park.longitude
                ]}
              >
                <Popup>
                  <h4>{park.fullName}</h4>
                  

                  <div className='popup-image-div'>
                    <img
                      className='popup-image'
                      src={park.images[0].url}
                    ></img>
                  </div>


                  <div className='popup-description-div'>
                    <p><Link
                      className='link-info'
                      to={`/park/${park.parkCode}`
                      }>View Park
                    </Link></p>
                    <p className='popup-description'>{park.description}</p>
                  </div>
                </Popup>
              </Marker>
            )
          })
        }



      </MapContainer>
    </div>
  )
}


export default MainMap;