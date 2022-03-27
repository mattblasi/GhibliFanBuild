import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Card from '../components/Cards/Card';

const MoviesList = ({ movies, isLoading }) => {
  useEffect(() => {
    document.title = `Studio Ghibli`;
  }, []);

  return (
    <div className="movies-list">
      {movies.map((m) => (
        <Card movie={m} key={m.id} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ Movies: { movies } }) => ({
  movies,
});

export default connect(mapStateToProps)(MoviesList);
