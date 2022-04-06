import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';

import Card from '../components/Cards/Card';

const MoviesList = ({ movies, isLoading }) => {
  const [scroll, setScroll] = useState();

  const IMAGE1 = 'https://wallpaperaccess.com/full/42613.jpg';
  const IMAGE2 = 'https://wallpaperaccess.com/full/1542329.jpg';
  const IMAGE3 = 'https://wallpaperaccess.com/full/458203.jpg';

  useEffect(() => {
    document.title = `Studio Ghibli`;
    setScroll(document.getElementById('main'));
  }, []);

  return (
    <React.Fragment>
      <div className="hero">
        <ParallaxProvider className="hero--wrapper" scrollContainer={scroll}>
          <ParallaxBanner
            layers={[
              { image: IMAGE1, speed: -25 },
              {
                speed: -50,
                children: (
                  <div className="title">
                    <h1>Ghibli Fan</h1>
                  </div>
                ),
              },
            ]}
          ></ParallaxBanner>
        </ParallaxProvider>
      </div>
      {/* <div className="hero">
        <ParallaxProvider className="hero--wrapper" scrollContainer={scroll}>
          <ParallaxBanner layers={[{ image: IMAGE2, speed: -25 }]} />
        </ParallaxProvider>
      </div> */}
      <div className="movies-list">
        <h1 className="title">Movie List</h1>
        {movies.map((m) => (
          <Card props={{ movie: m }} key={m.id} />
        ))}
      </div>
      <div className="hero">
        <ParallaxProvider className="hero--wrapper" scrollContainer={scroll}>
          <ParallaxBanner layers={[{ image: IMAGE3, speed: -25 }]} />
        </ParallaxProvider>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ Movies: { movies } }) => ({
  movies,
});

export default connect(mapStateToProps)(MoviesList);
