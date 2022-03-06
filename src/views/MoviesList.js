import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllMovies } from '../actions/movieActions';
import { CSSTransition } from 'react-transition-group';

import Card from '../components/card/Card';

const MoviesList = ({ movies, isLoading, getAllMovies }) => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    document.title = `Studio Ghibli`;
    if (isLoading) getAllMovies();
    setShowPage(true);
  });

  return (
    <CSSTransition in={showPage} timeout={300} classNames="page" unmountOnExit>
      <div className="movies-list">
        {movies.map((movie, index) => {
          return <Card movie={movie} key={movie.id} index={index} />;
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
