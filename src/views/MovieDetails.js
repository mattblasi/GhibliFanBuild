import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getMovieDetails, clearMovieDetails } from '../actions/movieActions';
import { useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import DetailsHero from './details/DetailsHero';
import Details from './details/Details';

const MovieDetails = ({
  isLoading,
  id,
  clearMovieDetails,
  getMovieDetails,
}) => {
  const { movie_id } = useParams();
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [heroIndex, setHeroIndex] = useState();

  useEffect(() => {
    if (id !== movie_id) {
      clearMovieDetails();
      getMovieDetails(movie_id);
    }
  }, []);

  if (isLoading || id !== movie_id) return <div />;

  return (
    <div className="full-details">
      {!isLoading && (
        <React.Fragment>
          <DetailsHero isLoaded={setHeroLoaded} setHeroIndex={setHeroIndex} />
          <CSSTransition
            in={heroLoaded && heroIndex >= 0}
            timeout={300}
            classNames="page"
            unmountOnExit
          >
            <React.Fragment>
              <Details heroIndex={heroIndex} />
            </React.Fragment>
          </CSSTransition>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = ({
  Details: {
    isLoading,
    details: { id },
  },
}) => ({
  isLoading,
  id,
});

const mapDispatchToProps = (dispatch) => ({
  getMovieDetails: (movie_id) => dispatch(getMovieDetails(movie_id)),
  clearMovieDetails: () => dispatch(clearMovieDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
