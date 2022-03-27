import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

import Dialog from '../../components/Dialog';

const DetailsImages = ({ photos, show, title }) => {
  const [photosList, setPhotosList] = useState([]);
  const [photosLoaded, setPhotosLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const handleImageLoaded = () => {
    let count = loadedCount + 1;
    setLoadedCount(count);
    if (loadedCount === photosList.length - 1) setPhotosLoaded(true);
  };

  useEffect(() => {
    if (photos.length) setPhotosList(show ? photos.slice(0, show) : photos);
  }, [photos]);

  return (
    <React.Fragment>
      <CSSTransition
        in={photosLoaded}
        timeout={300}
        classNames="page"
        unmountOnExit
      >
        <div className="detail-images">
          {title && (
            <h2>
              <span>{title}</span>
              <Link to="./gallery">View Full Gallery</Link>
            </h2>
          )}
          {photosList.map((p, i) => (
            <div
              className="detail-images--image"
              key={`images-${i}`}
              style={{
                backgroundImage: `url(${p})`,
              }}
              onClick={() => console.log('click: ', i, p)}
            >
              <img style={{ display: 'none' }} src={p} />
            </div>
          ))}
        </div>
      </CSSTransition>
      {!photosLoaded &&
        photosList.map((p, i) => (
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
