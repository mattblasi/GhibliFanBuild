import React from 'react';
import { connect } from 'react-redux';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';

const DetailsWatch = ({ bgImage, title }) => {
  return (
    <div className="details-watch">
      <ParallaxProvider
        className="details-watch--wrapper"
        scrollContainer={document.getElementsByClassName('site-content')[0]}
      >
        <ParallaxBanner layers={[{ image: bgImage, speed: -25 }]}>
          <div className="details-watch--content">
            <h3>Where to watch {title}</h3>
          </div>
        </ParallaxBanner>
      </ParallaxProvider>
    </div>
  );
};

export default DetailsWatch;
