import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';


import NavBar from "../NavBar";
import NParksServiceRequest from '../apis/nationalParksApi';

import '../css/NavBar.css'
import '../css/PhotoGallery.css'




const PhotoGallery = ({token, setToken}) => {

  const [images, setImages] = useState([])
  const [hoveredId, setHoveredId] = useState(null);
  const [loadingMoreImages, setLoadingMoreImages] = useState(true)
  
  useEffect(() => {
    const getInitialImages = async () => {
      let resp = await NParksServiceRequest.getRandomImages()
      // console.log(resp)
      setImages(resp)
      setLoadingMoreImages(false)
    }
    getInitialImages()
  }, [])

  const loadMoreImages = async () => {
    const resp = await NParksServiceRequest.getRandomImages()
    for (let anotherImage of resp) {
      images.push(anotherImage)
    }
    setLoadingMoreImages(false)
  }

  const turnOnIsLoadingImages = () => {
    setLoadingMoreImages(true)
  }

  return (
    <div className="gallery-page-container">
      <NavBar
        token={token}
        setToken={setToken}
      />
      <div className="gallery-container">
        {images && images.map(image => {
          return(
            <div
              key={image.imageUrl}
              className="image"
              style={{
                backgroundImage: `url(${image.imageUrl})`
              }}
              onMouseEnter={() => setHoveredId(image.imageUrl)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {hoveredId === image.imageUrl && (
                <div className="image-hover-div">
                  <p><b><Link
                    to={`/park/${image.parkCode}`
                    }>{image.parkName}</Link> - {image.state}</b></p>
                </div>
              )}
            </div>
          )
          }
        )}
        <div className="page-bottom">
          {loadingMoreImages
            ? <div>Loading</div>
            : <button
              className="load-more-images-button"
              onClick={() => {
                loadMoreImages()
                turnOnIsLoadingImages()
              }}
            ><b>Load more images</b></button>
          }
        </div>
      </div>
    </div>
  )
}

export default PhotoGallery;