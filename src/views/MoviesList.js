import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllMovies } from '../actions/movieActions';
import { CSSTransition } from 'react-transition-group';

import Card from '../components/card/Card';
import HomeHero from './homepage/HomeHero';

const MoviesList = ({ movies, isLoading, getAllMovies }) => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    document.title = `Studio Ghibli`;
    if (isLoading) getAllMovies();
    setShowPage(true);
  });

  return (
    <CSSTransition in={showPage} timeout={300} classNames="page" unmountOnExit>
      <React.Fragment>
        <div className="movies-list">
          {movies.map((movie, index) => {
            return <Card movie={movie} key={movie.id} index={index} />;
          })}
        </div>
        <div className="expand">
          <h3>Merchandise -</h3>
        </div>
      </React.Fragment>
    </CSSTransition>
  );
};

const mapStateToProps = ({ Movies: { isLoading, movies } }) => ({
  isLoading,
  movies,
});

const mapDispatchToProps = (dispatch) => ({
  getAllMovies: () => dispatch(getAllMovies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
