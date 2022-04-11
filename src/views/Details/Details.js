import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import {
  getMovieDetails,
  getMoviePeople,
  getMoviePhotos,
  getMovieProducts,
  clearMovieDetails,
} from '../../actions/movieActions';
import { updateRecents } from '../../actions/siteActions';

import DetailsHero from './DetailsHero';

import DetailsCast from './Partials/DetailsCast';
import DetailsGenres from './Partials/DetailsGenres';
import DetailsMerch from './Partials/DetailsMerch';
import DetailsMeta from './Partials/DetailsMeta';
import DetailsSidebar from './Partials/DetailsSidebar';
import DetailsTrailer from './Partials/DetailsTrailer';
import DetailsVideos from './Partials/DetailsVideos';
import DetailsWatch from './Partials/DetailsWatch';

import DetailsCredits from './Pages/DetailsCredits';
import DetailsImages from './Pages/DetailsImages';
import DetailsStoryline from './Pages/DetailsStoryline';

import Poster from '../../components/Poster';
import MerchList from '../../components/MerchList';

const Details = ({
  show,
  isLoading,
  details,
  people,
  photos,
  products,
  clearMovieDetails,
  getMovieDetails,
  getMoviePeople,
  getMoviePhotos,
  getMovieProducts,
  updateRecents,
}) => {
  const {
    id,
    title,
    synopsis,
    wallpapers,
    poster,
    people: { director, writer },
  } = details;
  const { movie_id } = useParams();
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [heroIndex, setHeroIndex] = useState();
  const [bgLoaded, setBgLoaded] = useState(false);
  const [bgImage, setBgImage] = useState();

  useEffect(() => {
    if (id !== movie_id || details.length <= 0) {
      // If movie has changed then reupdate data
      clearMovieDetails();
      getMovieDetails(movie_id);
      setBgImage(null);
      setBgLoaded(false);
      setHeroIndex(null);
      setHeroLoaded(false);
      updateRecents(movie_id);
    }
    getMoviePeople(movie_id); // always refetch people
    getMoviePhotos(movie_id); // always refetch photos
    getMovieProducts(movie_id);
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
        {page !== 'default' ? page : 'back'}
      </Link>
    );
  };

  return (
    <div className="details">
      <DetailsHero details={details} setHeroIndex={setHeroIndex} />
      <section className="details-page page">
        <div className="details-sidebar">
          <Poster src={poster} alt={title} />
          <DetailsSidebar director={director} writer={writer} />
        </div>
        <div className="details-content">
          <DetailsMeta details={details} />
          <DetailsGenres />
          <DetailsTrailer details={details} />
        </div>
      </section>
      <DetailsWatch bgImage={bgImage} title={title} />
      <section className="details-page page">
        {show === 'story' && <DetailsStoryline synopsis={synopsis} />}
        {show === 'credits' && <DetailsCredits people={people} />}
        {show === 'gallery' && <DetailsImages photos={photos} />}
        {show === 'default' && (
          <React.Fragment>
            <DetailsCast cast={people.cast} />
            <DetailsVideos />
            <DetailsImages photos={photos} show={12} title="Photos" />
          </React.Fragment>
        )}
      </section>
      {products.length && <DetailsMerch products={products} />}
      {/* <section className="details-page page">
        <nav id="page-nav" className="page-nav">
          <div className="details-container">
            <PageLink page="story" />
            <PageLink page="gallery" />
            <PageLink page="credits" />
          </div>
        </nav>
      </section> */}
    </div>
  );
};

const mapStateToProps = ({
  Details: { isLoading, details, people, photos, products },
}) => ({
  isLoading,
  details,
  people,
  photos,
  products,
});

const mapDispatchToProps = (dispatch) => ({
  updateRecents: (movie_id) => dispatch(updateRecents(movie_id)),
  getMovieDetails: (movie_id) => dispatch(getMovieDetails(movie_id)),
  getMoviePeople: (movie_id) => dispatch(getMoviePeople(movie_id)),
  getMoviePhotos: (movie_id) => dispatch(getMoviePhotos(movie_id)),
  getMovieProducts: (movie_id) => dispatch(getMovieProducts(movie_id)),
  clearMovieDetails: () => dispatch(clearMovieDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
