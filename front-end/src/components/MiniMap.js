import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import '../css/MiniMap.css'

const MiniMap = ({ zoom, centerPosition, campgrounds, campgroundsToggleState }) => {

  const customIcon = L.icon({
    iconUrl: require('../images/tent-icon.png'),
    // markerColor: 'red',
    iconSize: [25, 25],
    // iconAnchor: [12, 41]
  });


  return (
    <>
      <MapContainer
        key={'miniMapContainer'}
        center={centerPosition}
        scrollWheelZoom={false}
        zoom={zoom}>

        {centerPosition && centerPosition.map(
          park => {
            const rand = Math.random()
            return (
              <Marker
                key={rand}
                position={[
                  centerPosition[0],
                  centerPosition[1]
                ]}
              ></Marker>
        )})}

        {/* ######################################## */}




        {campgrounds && campgroundsToggleState === 'Hide Campgrounds' &&
          campgrounds.map(site => {
            // console.log(site)
            return (
              <Marker
                key={site.id}
                position={[
                  site.latitude,
                  site.longitude
                ]}
                icon={customIcon}
              >
                <Popup>
                  <h4>{site.name}</h4>


                  <div className='popup-image-div'>
                    <img
                      className='popup-image'
                      src={site.images[0].url}
                    ></img>
                  </div>


                  <div className='popup-description-div'>
                    {/* <p><Link
                      className='link-info'
                      to={`/park/${park.parkCode}`
                      }>View Park
                    </Link></p> */}
                    <p className='popup-description'>{site.description}</p>
                  </div>
                </Popup>
              </Marker>
            )
          })
        }






        {/* ######################################## */}
        
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