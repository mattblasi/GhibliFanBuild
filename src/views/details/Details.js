import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  ParallaxProvider,
  ParallaxBanner,
  Parallax,
} from 'react-scroll-parallax';

import DetailsMedia from './DetailsMedia';
import DetailsMeta from './DetailsMeta';
import DetailsStoryline from './DetailsStoryline';

const Details = ({ synopsis, wallpapers, heroIndex }) => {
  const [showGallery, setShowGallery] = useState(true);
  const [bgImage, setBgImage] = useState();

  useEffect(() => {
    if (!bgImage && wallpapers.length) {
      let backgroundIndex = heroIndex;
      while (backgroundIndex === heroIndex) {
        backgroundIndex = Math.floor(Math.random() * wallpapers.length);
      }
      let background = wallpapers ? wallpapers[backgroundIndex] : '';
      setBgImage(background);
    }
  }, []);

  if (!synopsis) return <div />;
  return (
    <React.Fragment>
      <article className="details">
        <div className="details-container">
          <DetailsMeta />
          <div className="details-content">
            <DetailsMedia />
            <DetailsStoryline />
          </div>
          <aside className="details-sidebar">
            <p>Something needs to go here</p>
          </aside>
        </div>
        <div className="details-watch">
          <ParallaxProvider
            className="details-watch--wrapper"
            scrollContainer={document.getElementsByClassName('site-content')[0]}
          >
            <ParallaxBanner layers={[{ image: bgImage, speed: -25 }]} />
          </ParallaxProvider>
        </div>
      </article>
    </React.Fragment>
  );
};

const mapStateToProps = ({
  Details: {
    details: { synopsis, wallpapers },
  },
}) => ({
  synopsis,
  wallpapers,
});

export default connect(mapStateToProps)(Details);
