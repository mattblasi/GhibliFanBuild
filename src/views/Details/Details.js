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

import DetailsImages from './Pages/DetailsImages';
import DetailsCredits from './Pages/DetailsCredits';
import DetailsStoryline from './Pages/DetailsStoryline';

import Poster from '../../components/Poster';
import MerchList from '../../components/MerchList';

const Details = ({
  show,
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
  const { id, title, synopsis, wallpapers, poster } = details;
  const { director, cast, writer } = people;
  const { movie_id } = useParams();
  const [heroIndex, setHeroIndex] = useState();
  const [bgImage, setBgImage] = useState();

  useEffect(() => {
    if (id !== movie_id || details.length <= 0) {
      // If movie has changed then reupdate data
      clearMovieDetails();
      getMovieDetails(movie_id);
      setBgImage(null);
      setHeroIndex(null);
      updateRecents(movie_id);
    }
    getMoviePeople(movie_id); // always refetch people
    getMoviePhotos(movie_id); // always refetch photos
    getMovieProducts(movie_id);
  }, [movie_id]);

  useEffect(() => {
    if (!bgImage && wallpapers?.length && id === movie_id) {
      let backgroundIndex = heroIndex;
      while (backgroundIndex === heroIndex) {
        backgroundIndex = Math.floor(Math.random() * wallpapers.length);
      }
      setBgImage(wallpapers[backgroundIndex]);
    }
  }, [heroIndex, movie_id]);

  if (isLoading || id !== movie_id) return <div>Loading...</div>;

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
    </div>
  );
};

const mapStateToProps = ({
  Details: { details, people, photos, products },
}) => ({
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
