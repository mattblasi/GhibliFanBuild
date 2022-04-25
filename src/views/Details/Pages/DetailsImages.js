import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Gallery from '../../../components/Gallery';

const DetailsImages = ({ photos, show, title }) => {
  const [photosList, setPhotosList] = useState([]);

  useEffect(() => {
    if (photos.length) 
      setPhotosList(show ? photos.slice(0, show) : photos);
  }, [photos]);

  return (
    <div className="details-section detail-images">
      {title && (
        <h2>
          {title}
          <Link to="./gallery">View Full Gallery</Link>
        </h2>
      )}
      <Gallery images={photosList} title={} />
    </div>
  );
};

export default DetailsImages;
