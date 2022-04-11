import React, { useState, useEffect } from 'react';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';

import DetailsSummary from './Partials/DetailsSummary';

const DetailsHero = ({
  details: { title, og_title_rm, og_title_jp, wallpapers, summaries },
  setHeroIndex,
}) => {
  const [scroll, setScroll] = useState();
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    document.title = `Studio Ghibli : ${title}`;
    let imageIndex = Math.floor(Math.random() * wallpapers?.length);
    let background = wallpapers
      ? wallpapers[imageIndex]
      : 'https://bit.ly/37c03oN';
    setHeroIndex(imageIndex);
    setBgImage(background);
    setScroll(document.getElementById('main'));
  }, []);

  if (!title) return <div />;

  return (
    <ParallaxProvider scrollContainer={scroll}>
      <header className="details-hero">
        <ParallaxBanner layers={[{ image: bgImage, speed: -25 }]} />
        <div className="details-hero--content page">
          <div className="details-header">
            <h1>
              {title}
              <span>( {og_title_rm} )</span>
            </h1>
            <p>{og_title_jp}</p>
          </div>
          <DetailsSummary summaries={summaries} />
        </div>
        <span className="details-ghost">{og_title_jp}</span>
      </header>
    </ParallaxProvider>
  );
};

export default DetailsHero;
