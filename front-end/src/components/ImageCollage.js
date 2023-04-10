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

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gridGap: "10px",
  };

  const imageStyle = {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  };

  return (
    <div style={{width: '96%', margin: 'auto auto', marginBottom: '20px'}}>
      <div style={gridStyle}>
        {imageUrls && imageUrls.map((url, index) => (
          <img key={index} src={url} style={imageStyle} />
        ))}
      </div>
    </div>
  );
};

export default ImageCollage;
