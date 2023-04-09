import React, {useState, useEffect} from "react";

import '../css/ImagesDisplayer.css'

const ImagesDisplayer = ({imagesArray}) => {

  const [images, setImages] = useState(imagesArray)

  useEffect(() => {
    console.log(imagesArray)
  }, [])




  return (
    <div id="images-displayer-main-container">
      {images && images.map(image => {
        return (
          <div className="single-image-container">
            <img className="single-image" src={image.url}></img>
          </div>
        )
        })}
    </div>
  )
}

export default ImagesDisplayer;