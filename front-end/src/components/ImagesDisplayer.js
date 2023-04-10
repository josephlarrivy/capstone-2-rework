import React, { useState, useEffect } from "react";
import "../css/ImagesDisplayer.css";

const ImagesDisplayer = ({ imagesArray }) => {

  const [images, setImages] = useState(imagesArray);
  const [isHovering, setIsHovering] = useState(false);


  // const handleMouseEnter = (e) => {
  //   e.currentTarget.className = "single-image-container-open";
  //   const otherDivs = document.querySelectorAll(
  //     "#images-displayer-main-container > div.single-image-container:not(:hover)"
  //   );
  //   otherDivs.forEach((div) => {
  //     div.className = "single-image-container-with-one-open";
  //   });
  //   setContainerState('images-displayer-main-container-with-one-open')
  // };

  // const handleMouseLeave = (e) => {
  //   e.currentTarget.className = "single-image-container";
  //   const otherDivs = document.querySelectorAll(
  //     "#images-displayer-main-container > div"
  //   );
  //   otherDivs.forEach((div) => {
  //     div.className = "single-image-container";
  //   });
  //   setContainerState('images-displayer-main-container')
  // };

  useEffect(() => {
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
      console.log(isHovering)
    }
  };

  const handleMouseEnter = (e) => {
    setIsHovering(true)
    console.log(e.currentTarget)
    e.currentTarget.className = 'single-image-container-open'

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
