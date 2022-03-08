import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import {
  getMovieDetails,
  getMoviePeople,
  clearMovieDetails,
} from '../actions/movieActions';

import DetailsCast from './details/DetailsCast';
import DetailsCredits from './details/DetailsCredits';
import DetailsGenres from './details/DetailsGenres';
import DetailsHero from './details/DetailsHero';
import DetailsMedia from './details/DetailsMedia';
import DetailsMeta from './details/DetailsMeta';
import DetailsSidebar from './details/DetailsSidebar';
import DetailsStoryline from './details/DetailsStoryline';
import DetailsVideos from './details/DetailsVideos';
import DetailsWatch from './details/DetailsWatch';
import MerchList from '../components/MerchList';

const MovieDetails = ({
  show,
  isLoading,
  details,
  people,
  clearMovieDetails,
  getMovieDetails,
  getMoviePeople,
}) => {
  const { id, title, wallpapers } = details;
  const { movie_id } = useParams();
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [heroIndex, setHeroIndex] = useState();
  const [bgLoaded, setBgLoaded] = useState(false);
  const [bgImage, setBgImage] = useState();

  useEffect(() => {
    if (id !== movie_id) {
      clearMovieDetails();
      getMovieDetails(movie_id);
      setBgImage(null);
      setBgLoaded(false);
      setHeroIndex(null);
      setHeroLoaded(false);
    }
    getMoviePeople(movie_id);
  }, [movie_id]);

  useEffect(() => {
    document.querySelector('#main').scrollTo({ top: 0, behavior: 'smooth' });
    if (!bgImage && wallpapers?.length && id === movie_id) {
      let backgroundIndex = heroIndex;
      while (backgroundIndex === heroIndex) {
        backgroundIndex = Math.floor(Math.random() * wallpapers.length);
      }
      let background = wallpapers ? wallpapers[backgroundIndex] : '';
      setBgImage(background);
    }
  }, [heroIndex, movie_id]);

  if (isLoading || id !== movie_id) return <div>Loading...</div>;

  return (
    <div className="full-details">
      <DetailsHero
        details={details}
        setHeroLoaded={setHeroLoaded}
        setHeroIndex={setHeroIndex}
      />

      <CSSTransition
        in={heroLoaded && bgLoaded}
        timeout={1000}
        classNames="page"
        unmountOnExit
      >
        <article className="details">
          <div className="details-container">
            <DetailsMeta details={details} />
            <DetailsGenres />
            <div className="details-content">
              {show === 'default' && <DetailsMedia />}
              {show === 'credits' && <DetailsCredits people={people} />}
              {show === 'gallery' && <DetailsMedia />}
              {show === 'story' && <DetailsMedia />}
            </div>
            <DetailsSidebar />
          </div>
          {show === 'default' && (
            <React.Fragment>
              <DetailsWatch bgImage={bgImage} title={title} />
              <div className="details-container">
                <DetailsCast cast={details.people.cast} />
                <DetailsVideos />
                <DetailsStoryline synopsis={details.synopsis} />
              </div>
            </React.Fragment>
          )}
          <MerchList movie_id={movie_id} />
        </article>
      </CSSTransition>
      {!bgLoaded && bgImage?.length && (
        <img
          style={{ display: 'none' }}
          src={bgImage}
          onLoad={() => setBgLoaded(true)}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ Details: { isLoading, details, people } }) => ({
  isLoading,
  details,
  people,
});

const mapDispatchToProps = (dispatch) => ({
  getMovieDetails: (movie_id) => dispatch(getMovieDetails(movie_id)),
  getMoviePeople: (movie_id) => dispatch(getMoviePeople(movie_id)),
  clearMovieDetails: () => dispatch(clearMovieDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
