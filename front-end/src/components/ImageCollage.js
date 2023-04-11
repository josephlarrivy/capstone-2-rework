import React, { useEffect, useState } from "react";


const ImageCollage = ({ imagesArray }) => {

  const [imageUrls, setImageUrls] = useState(null)

  useEffect(() => {
    const urls = []
    for (let item of imagesArray) {
      urls.push(item.url)
    }
    // while (urls.length % 3 !== 0) {
    //   urls.pop()
    // }
    setImageUrls(urls)
  }, [imagesArray])

  const gridStyleThreeAcross = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gridGap: "10px",
    marginBottom: '10px'
  };

  const imageStyle = {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  };

  return (
    <div style={{width: '96%', margin: 'auto auto'}}>
      <div style={gridStyleThreeAcross}>
        {imageUrls && imageUrls.slice(0, 3).map((url, index) => (
          <img key={index} src={url} style={imageStyle} />
        ))}
      </div>
      <div style={gridStyleThreeAcross}>
        {imageUrls && imageUrls.slice(3, 5).map((url, index) => (
          <img key={index} src={url} style={imageStyle} />
        ))}
      </div>
    </div>
  );
};

export default ImageCollage;
