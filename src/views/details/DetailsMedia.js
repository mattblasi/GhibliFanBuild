import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faUpRightAndDownLeftFromCenter,
  faDownLeftAndUpRightToCenter,
} from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player';

const DetailsMedia = () => {
  const [playTrailer, setPlayTrailer] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const movieBlock = document.querySelector('.full-details .details-media');

  const toggleTrailer = () => setPlayTrailer(!playTrailer);
  const toggleFullScreen = () => setFullScreen(!fullScreen);

  useEffect(() => {
    if (fullScreen) toggleFullScreen();
  }, [playTrailer]);

  useEffect(() => {
    if (movieBlock) {
      if (fullScreen) movieBlock.classList.add('full-screen');
      if (!fullScreen) movieBlock.classList.remove('full-screen');
    }
  }, [fullScreen]);

  const Trailer = ({ click }) => {
    return (
      <div className="trailer">
        <div className="trailer-controls">
          <button className="trailer-close" onClick={toggleTrailer}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <button className="trailer-fullscreen" onClick={toggleFullScreen}>
            {!fullScreen && (
              <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
            )}
            {fullScreen && (
              <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} />
            )}
          </button>
        </div>
        <ReactPlayer
          className="trailer-wrapper"
          url="https://www.youtube.com/watch?v=awEC-aLDzjs"
        />
      </div>
    );
  };

  return (
    <div className="details-media">
      {playTrailer && <Trailer />}

      {!playTrailer && (
        <button className="details-media--trailer" onClick={toggleTrailer}>
          <p>trailer</p>
        </button>
      )}
    </div>
  );
};

export default DetailsMedia;
