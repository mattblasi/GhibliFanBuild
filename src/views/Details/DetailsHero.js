import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';

import Poster from '../../components/Poster';
import DetailsSummary from './DetailsSummary';
import DetailsSidebar from './DetailsSidebar';

const DetailsHero = ({
  show,
  details: {
    title,
    og_title_rm,
    og_title_jp,
    poster,
    wallpapers,
    summaries,
    people: { director, writer },
  },
  setHeroLoaded,
  setHeroIndex,
}) => {
  const [scroll, setScroll] = useState();
  const [bgLoaded, setBgLoaded] = useState(false);
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    document.title = `Studio Ghibli : ${title}`;
    if (bgLoaded) setHeroLoaded(true);
  }, [bgLoaded]);

  useEffect(() => {
    let imageIndex = Math.floor(Math.random() * wallpapers?.length);
    let background = wallpapers
      ? wallpapers[imageIndex]
      : 'https://bit.ly/37c03oN';
    setHeroIndex(imageIndex);
    setBgImage(background);
    setScroll(document.getElementById('main'));
  }, []);

  const HeaderButton = ({ icon, title, action }) => {
    console.log(icon, title);

    // play trailer
    // where to watch

    return (
      <button className="button" onClick={action}>
        <span className="button-icon">{icon}</span>
        <span className="button-title">{title}</span>
      </button>
    );
  };

  if (!title) return <div />;

  return (
    <React.Fragment>
      <CSSTransition
        in={bgLoaded}
        timeout={300}
        classNames="page"
        unmountOnExit
      >
        <div className="details-hero">
          <span className="details-title--ghost">{og_title_jp}</span>
          <ParallaxProvider
            className="details-hero--wrapper"
            scrollContainer={scroll}
          >
            <ParallaxBanner layers={[{ image: bgImage, speed: -25 }]} />
            <div className="details-hero--content">
              <div className="details-hero--sidebar">
                <Poster src={poster} alt={title} />
                <DetailsSidebar director={director} writer={writer} />
              </div>
              <DetailsSummary summaries={summaries} />
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

export default DetailsHero;
