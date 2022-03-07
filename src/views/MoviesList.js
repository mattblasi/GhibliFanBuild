import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllMovies } from '../actions/movieActions';
import { CSSTransition } from 'react-transition-group';

import MovieCard from '../components/MovieCard';
import HomeHero from './homepage/HomeHero';

const MoviesList = ({ movies, isLoading, getAllMovies }) => {
  const [showPage, setShowPage] = useState(false);
  let movieSorted;

  useEffect(() => {
    document.title = `Studio Ghibli`;
    if (isLoading) getAllMovies();
    movieSorted = movies.sort(
      (a, b) => (a.meta.release_year > b.meta.release_year ? 1 : -1) // Sort by release year oldest first
      // (a, b) =>  (a.meta.imdb_score < b.meta.imdb_score ? 1 : -1) // sort by imdb score highest first
    );
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
