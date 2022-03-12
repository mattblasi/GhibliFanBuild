import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

const DetailsImages = ({ photos }) => {
  const [photosLoaded, setPhotosLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const handleImageLoaded = () => {
    let count = loadedCount + 1;
    setLoadedCount(count);
    if (loadedCount === photos.length - 1) setPhotosLoaded(true);
  };

  return (
    <React.Fragment>
      <CSSTransition
        in={photosLoaded}
        timeout={300}
        classNames="page"
        unmountOnExit
      >
        <div className="detail-images">
          {photos.map((p, i) => (
            <div
              className="detail-images--image"
              key={`images-${i}`}
              style={{
                backgroundImage: `url(${p})`,
              }}
            >
              ...
            </div>
          ))}
        </div>
      </CSSTransition>
      {!photosLoaded &&
        photos.map((p, i) => (
          <img
            style={{ display: 'none' }}
            src={p}
            onLoad={() => handleImageLoaded()}
            key={`preload-${i}`}
          />
        ))}
    </React.Fragment>
  );
};

export default DetailsImages;
