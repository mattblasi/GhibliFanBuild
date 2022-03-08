import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import MovieCard from '../components/MovieCard';
import HomeHero from './homepage/HomeHero';

const MoviesList = ({ movies, isLoading }) => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    document.title = `Studio Ghibli`;
    setShowPage(true);
  }, [showPage]);

  return (
    <CSSTransition in={showPage} timeout={300} classNames="page" unmountOnExit>
      <React.Fragment>
        {/* <HomeHero /> */}
        <div className="movies-list">
          {movies.map((movie, index) => {
            return <MovieCard movie={movie} key={movie.id} index={index} />;
          })}
        </div>
      </React.Fragment>
    </CSSTransition>
  );
};

const mapStateToProps = ({ Movies: { isLoading, movies } }) => ({
  isLoading,
  movies,
});

export default connect(mapStateToProps)(MoviesList);
