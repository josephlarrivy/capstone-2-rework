import React, { useState, useEffect } from 'react'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import '../css/Map.css'

const Map = ({zoom}) => {

  const [mapZoom, setMapZoom] = useState(zoom)

  useEffect(() => {
    setMapZoom(zoom)
    console.log('Map detecting zoom change')
    console.log('mapZoom:', mapZoom)
  }, [zoom])


  return (
    <div className='map-container'>
      <MapContainer
        key={'mapContainer'}
        center={[0,0]}
        zoom={mapZoom}>
        <TileLayer
          key={'tileLayer'}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />



        {/* {showingParks &&
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
                    <Link
                      to={`/park/${park.parkCode}`
                      }>test
                    </Link>
                  </div>


                  <div className='popup-description-div'>
                    <p className='popup-description'>{park.description}</p>
                  </div>
                </Popup>
              </Marker>
            )
          })
        } */}



      </MapContainer>
    </div>
  )
}


export default Map;