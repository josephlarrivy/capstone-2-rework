import React, { useState, useEffect } from "react";
import "../css/ImagesDisplayer.css";

const ImagesDisplayer = ({ imagesArray }) => {

  const [images, setImages] = useState(imagesArray);
  const [imagesRowOne, setImagesRowOne] = useState(images.slice(0,4))
  const [isHovering, setIsHovering] = useState(false);



  useEffect(() => {
    console.log(imagesRowOne.length)
    const allImageDivs = document.querySelectorAll(
      "#images-displayer-main-container > div.single-image-container"
    );
    allImageDivs.forEach((div) => {
      div.className = "single-image-container";
    });
  }, [])

  useEffect(() => {
    console.log(isHovering)
  }, [isHovering])

  const handleMouseMove = (e) => {
    if (isHovering) {
      // console.log(`Mouse position: x=${e.clientX}, y=${e.clientY}`);
      e.currentTarget.className = "single-image-container-open";
      // console.log(isHovering)
    }
  };

  const handleMouseEnter = (e) => {
    setIsHovering(true)
    e.currentTarget.className = 'single-image-container-open'
    e.currentTarget.style.zIndex = '2'

    const otherDivs = document.querySelectorAll(
      "#images-displayer-main-container > div.single-image-container"
    );
    otherDivs.className = 'single-image-container-with-one-open'
  }

  const handleMouseLeave = (e) => {
    setIsHovering(false)
    const allImageDivs = document.querySelectorAll(
      "#images-displayer-main-container > div"
    );
    allImageDivs.forEach((div) => {
      div.className = "single-image-container";
    });


    const allDivs = document.querySelectorAll(
      "#images-displayer-main-container > div"
    );

    allDivs.forEach((div) => {
      if (div !== e.currentTarget) {
        div.style.zIndex = '1';
      } else {
        div.style.zIndex = '2';
      }
    });
  }
  

  return (
    <div
      id='images-displayer-main-container'
      >
      {images &&
        images.map((image) => {
          return (
            <div
              key={image.url}
              // id={image.url}
              className="single-image-container"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              // onMouseMove={handleMouseMove}
            >
              <img 
                src={image.url}
                />
            </div>
          );
        })}
    </div>
  );
};

export default ImagesDisplayer;
