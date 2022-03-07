import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import {
  ParallaxProvider,
  ParallaxBanner,
  Parallax,
} from 'react-scroll-parallax';

import Poster from '../../components/Poster';
import DetailsSummary from './DetailsSummary';

const DetailsHero = ({
  title,
  og_title_rm,
  og_title_jp,
  posters,
  wallpapers,
  setHeroLoaded,
  setHeroIndex,
}) => {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    document.title = `Studio Ghibli : ${title}`;
    if (bgLoaded) setHeroLoaded(true);
  }, [bgLoaded]);

  useEffect(() => {
    let imageIndex = Math.floor(Math.random() * wallpapers.length);
    let background = wallpapers ? wallpapers[imageIndex] : '';
    setHeroIndex(imageIndex);
    setBgImage(background);
  }, []);

  if (!title) return <div />;

  return (
    <React.Fragment>
      <CSSTransition
        in={bgLoaded}
        timeout={300}
        classNames="page"
        unmountOnExit
      >
        <div className="details-hero hero">
          <span className="details-title--ghost">{og_title_jp}</span>
          <ParallaxProvider
            className="details-hero--wrapper"
            scrollContainer={document.getElementsByClassName('site-content')[0]}
          >
            <ParallaxBanner layers={[{ image: bgImage, speed: -25 }]} />
            <div className="details-hero--content">
              <Poster src={posters[posters.length - 1]} alt={title} />
              <DetailsSummary />
              <header className="details-header">
                <h1>
                  {title}
                  <span>( {og_title_rm} )</span>
                </h1>
                <p>{og_title_jp}</p>
              </header>
            </div>
          </ParallaxProvider>
        </div>
      </CSSTransition>
      {!bgLoaded && bgImage?.length && (
        <img
          style={{ display: 'none' }}
          src={bgImage}
          onLoad={() => setBgLoaded(true)}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = ({
  Details: {
    details: { title, og_title_rm, og_title_jp, posters, wallpapers },
  },
}) => ({
  title,
  og_title_rm,
  og_title_jp,
  posters,
  wallpapers,
});

export default connect(mapStateToProps)(DetailsHero);
