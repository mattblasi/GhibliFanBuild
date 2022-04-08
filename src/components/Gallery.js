import React, { useEffect, useState } from 'react';


const Gallery = ({ images, title = 'studio ghibli images' }) => {
  const [curImg, setCurImg] = useState(0); // index of shown image in dialog

  const ImageForDialog = () => {
    // this will export the component to pass to the content of the dialog
  }

  const handleImageClick = (index) => {
    console.log(`clicked image: ${index}`);
    setCurImg(index);
    // open dialog
  }

  if (!images.length) return <div className="gallery gallery-noimgs" />

  return (
    <div className="gallery">
      {images.map((img, i) => (
        <button 
          className={`gallery-image gallery-image--${i}`} 
          key={`gallery-img-${i}`}
          onClick={(e) => handleImageClick(i)}
          style={{
            backgroundImage: `url(${img})`
          }}
          >
            <img src={img} style={{ display: 'none' }} alt={`${title} image #${i}`} />
        </button>
      ))}
    </div>
  );
};

export default Gallery;