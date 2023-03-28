import React, {useState, useEffect} from "react";

import NavBar from "../NavBar";
import NParksServiceRequest from '../apis/nationalParksApi';

import '../css/NavBar.css'
import '../css/PhotoGallery.css'


const PhotoGallery = ({token, setToken}) => {

  const [images, setImages] = useState(null)
  
  useEffect(() => {
    const getInitialParks = async () => {
      let resp = await NParksServiceRequest.getRandomImages(700)
      // console.log(resp)
      setImages(resp)
    }
    getInitialParks()
  }, [])

  return (
    <div className="gallery-full-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <div className="gallery-container">
        {images && images.map(image => {
          return(
            <div
              key={image.parkName}
              className="image"
              style={{
                backgroundImage: `url(${image.imageUrl})`
              }}
            >
            </div>
          )
          }
        )}
      </div>
    </div>
  )
}

export default PhotoGallery;