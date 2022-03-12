import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import {
  getMovieDetails,
  getMoviePeople,
  getMoviePhotos,
  clearMovieDetails,
} from '../../actions/movieActions';

import DetailsCast from './DetailsCast';
import DetailsCredits from './DetailsCredits';
import DetailsGenres from './DetailsGenres';
import DetailsHero from './DetailsHero';
import DetailsImages from './DetailsImages';
import DetailsMedia from './DetailsMedia';
import DetailsMeta from './DetailsMeta';
import DetailsStoryline from './DetailsStoryline';
import DetailsVideos from './DetailsVideos';
import DetailsWatch from './DetailsWatch';
import MerchList from '../../components/MerchList';

const Details = ({
  show,
  isLoading,
  details,
  people,
  photos,
  clearMovieDetails,
  getMovieDetails,
  getMoviePeople,
  getMoviePhotos,
}) => {
  const { id, title, wallpapers } = details;
  const { movie_id } = useParams();
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [heroIndex, setHeroIndex] = useState();
  const [bgLoaded, setBgLoaded] = useState(false);
  const [bgImage, setBgImage] = useState();

  useEffect(() => {
    if (id !== movie_id) {
      // If movie has changed then reupdate data
      clearMovieDetails();
      getMovieDetails(movie_id);
      setBgImage(null);
      setBgLoaded(false);
      setHeroIndex(null);
      setHeroLoaded(false);
    }
    getMoviePeople(movie_id); // always refetch people
    getMoviePhotos(movie_id); // always refetch photos
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

  const PageLink = ({ page }) => {
    return (
      <Link
        to={
          show !== page && page !== 'default'
            ? `/${movie_id}/${page}`
            : `/${movie_id}`
        }
        className={`page-link${show === page ? ' is-active' : ''}`}
      >
        {/* <span className="page-link--icon">
          {page === 'credits' && <FontAwesomeIcon icon={faSkull} />}
          {page === 'story' && <FontAwesomeIcon icon={faBook} />}
          {page === 'gallery' && <FontAwesomeIcon icon={faImages} />}
          {page !== show && page === 'default' && (
            <FontAwesomeIcon icon={faAngleLeft} />
          )}
        </span> */}
        <span className="page-link--text">
          {page !== 'default' ? page : 'back'}
        </span>
      </Link>
    );
  };

  return (
    <div className="full-details">
      <DetailsHero
        details={details}
        setHeroLoaded={setHeroLoaded}
        setHeroIndex={setHeroIndex}
        show={show}
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
              <DetailsMedia details={details} />
            </div>
          </div>
          <DetailsWatch bgImage={bgImage} title={title} />
          <nav id="page-nav" className="page-nav">
            <div className="details-container">
              <PageLink page="story" />
              <PageLink page="gallery" />
              <PageLink page="credits" />
            </div>
          </nav>
          <div className="details-container">
            {show === 'story' && (
              <React.Fragment>
                <DetailsStoryline synopsis={details.synopsis} />
              </React.Fragment>
            )}
            {show === 'credits' && <DetailsCredits people={people} />}
            {show === 'gallery' && <DetailsImages photos={photos} />}
            {show === 'default' && (
              <React.Fragment>
                <DetailsCast cast={details.people.cast} />
                <DetailsVideos />
              </React.Fragment>
            )}
          </div>
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

const mapStateToProps = ({
  Details: { isLoading, details, people, photos },
}) => ({
  isLoading,
  details,
  people,
  photos,
});

const mapDispatchToProps = (dispatch) => ({
  getMovieDetails: (movie_id) => dispatch(getMovieDetails(movie_id)),
  getMoviePeople: (movie_id) => dispatch(getMoviePeople(movie_id)),
  getMoviePhotos: (movie_id) => dispatch(getMoviePhotos(movie_id)),
  clearMovieDetails: () => dispatch(clearMovieDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
