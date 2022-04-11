import React, { useState, useEffect } from 'react';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';

const DetailsWatch = ({ bgImage, title }) => {
  const [scroll, setScroll] = useState();
  const [image, setBgImage] = useState('');

  useEffect(() => {
    setBgImage(image);
    setScroll(document.getElementById('main'));
  }, []);

  return (
    <ParallaxProvider scrollContainer={scroll}>
      <div className="details-hero details-watch page">
        <ParallaxBanner layers={[{ image: bgImage, speed: -25 }]} />
        <div className="details-hero--content page">
          <h2>Where to watch {title}</h2>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default DetailsWatch;
