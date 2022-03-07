import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllMovies } from '../actions/movieActions';
import { CSSTransition } from 'react-transition-group';

import MovieCard from '../components/MovieCard';
import HomeHero from './homepage/HomeHero';

const MoviesList = ({ movies, isLoading, getAllMovies }) => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    document.title = `Studio Ghibli`;
    if (isLoading) getAllMovies();
    setShowPage(true);
  }, [showPage]);

  return (
    <CSSTransition in={showPage} timeout={300} classNames="page" unmountOnExit>
      <div className="movies-list">
        {movies.map((movie, index) => {
          return <MovieCard movie={movie} key={movie.id} index={index} />;
        })}
      </div>
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
