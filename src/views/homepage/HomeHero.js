import React, { useEffect, useState } from 'react';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';

import Mouse from '../../components/Mouse';

const HomeHero = () => {
  const bg =
      'https://raw.githubusercontent.com/mattblasi/GhibliFanBuild/master/src/images/hero_bg.png',
    fg =
      'https://raw.githubusercontent.com/mattblasi/GhibliFanBuild/master/src/images/hero_fg.png',
    porco =
      'https://raw.githubusercontent.com/mattblasi/GhibliFanBuild/master/src/images/hero_porco.png',
    nausica =
      'https://raw.githubusercontent.com/mattblasi/GhibliFanBuild/master/src/images/hero_nausica.png';

  return (
    <ParallaxProvider
      scrollAxis="vertical"
      scrollContainer={document.getElementsByClassName('site-content')[0]}
    >
      <div className="home-hero">
        <ParallaxBanner
          className="hero__parallax"
          layers={[
            {
              image: bg,
              amount: 0.5,
              expanded: true,
              speed: 15,
            },
            {
              image: porco,
              amount: 0.1,
              speed: -25,
              scale: [0.75, 1.5, 'easeInQuad'],
              translateX: [-40, 40],
            },
            {
              image: nausica,
              amount: -0.1,
              expanded: true,
              speed: -1,
              scale: [0.25, 1.75, 'easeInQuad'],
              translateX: [30, -40],
              translateY: [-50, 0],
            },
            {
              image: fg,
              amount: 0.1,
              expanded: true,
              speed: -15,
              scale: [1, 1.5, 'easeIn'],
              translateX: [-10, 10],
            },
          ]}
          style={{
            height: '100%',
          }}
        ></ParallaxBanner>
        <Mouse />
      </div>
    </ParallaxProvider>
  );
};

export default HomeHero;
