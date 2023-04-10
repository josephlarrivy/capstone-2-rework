import React, { useState, useEffect } from "react";
import "../css/ImagesDisplayer.css";

const ImagesDisplayer = ({ imagesArray }) => {

  const [containerState, setContainerState] = useState('images-displayer-main-container')
  const [images, setImages] = useState(imagesArray);

  const handleMouseEnter = (e) => {
    e.currentTarget.className = "single-image-container-open";
    const otherDivs = document.querySelectorAll(
      "#images-displayer-main-container > div.single-image-container:not(:hover)"
    );
    otherDivs.forEach((div) => {
      div.className = "single-image-container-with-one-open";
    });
    setContainerState('images-displayer-main-container-with-one-open')
    console.log('mouseenter')
  };

  const handleMouseLeave = (e) => {
    // e.currentTarget.className = "single-image-container";
    const otherDivs = document.querySelectorAll(
      "#images-displayer-main-container > div"
    );
    otherDivs.forEach((div) => {
      div.className = "single-image-container";
    });
    setContainerState('images-displayer-main-container')
    console.log('mouseleave')
  };

  return (
    <div id={containerState} onMouseLeave={handleMouseLeave}>
      {images &&
        images.map((image) => {
          return (
            <div
              key={image.url}
              className="single-image-container"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img 
                src={image.url}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                />
            </div>
          );
        })}
    </div>
  );
};

export default ImagesDisplayer;
