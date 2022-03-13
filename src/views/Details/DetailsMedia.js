import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faUpRightAndDownLeftFromCenter,
  faDownLeftAndUpRightToCenter,
} from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player';

const DetailsMedia = ({ details: { trailer } }) => {
  const [playTrailer, setPlayTrailer] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [videoId, setVideoId] = useState();

  const movieBlock = document.querySelector('.full-details .details-media');

  const toggleTrailer = () => setPlayTrailer(!playTrailer);
  const toggleFullScreen = () => setFullScreen(!fullScreen);

  useEffect(() => {
    //if (playTrailer) document.getElementById('ghibli-trailer').focus();
    if (fullScreen) toggleFullScreen();
  }, [playTrailer]);

  useEffect(() => {
    if (movieBlock) {
      if (fullScreen) movieBlock.classList.add('full-screen');
      if (!fullScreen) movieBlock.classList.remove('full-screen');
    }
  }, [fullScreen]);

  useEffect(() => {
    let video_id = trailer.split('v=')[1];
    let ampersandPosition = video_id.indexOf('&');
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    setVideoId(video_id);
  }, [trailer]);

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
          id="ghiblitrailer"
          className="trailer-wrapper"
          url={trailer}
          playsinline={true}
          playing={true}
          width="100%"
          height="100%"
        />
      </div>
    );
  };

  return (
    <div className="details-media">
      {playTrailer && <Trailer />}

      {!playTrailer && (
        <button
          className="details-media--trailer"
          onClick={toggleTrailer}
          style={{
            backgroundImage: `url(https://img.youtube.com/vi/${videoId}/mqdefault.jpg)`,
          }}
        >
          <p>trailer</p>
        </button>
      )}
    </div>
  );
};

export default DetailsMedia;
