import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getMovieToEdit } from '../../actions/adminActions';

// import AdminEdit from './AdminEdit';
import Edit from './Edit';

const Admin = ({ movies, getMovieToEdit }) => {
  const [isEdit, setEdit] = useState(false);
  const [selectedMovie, setMovie] = useState();

  const editMovie = (movie) => setMovie(movie);
  const toggleEdit = () => setEdit(!isEdit);

  useEffect(() => {
    getMovieToEdit(selectedMovie);
    if (selectedMovie) setEdit(true);
  }, [selectedMovie]);

  const MoviesList = () => {
    return (
      <div className="movies">
        <Link to="/products">Products</Link>
        <Link to="/products/unsorted">Unsorted</Link>
        <div className="movies-container">
          {movies.map((m, i) => (
            <button
              className="movie-item"
              key={`movie-${i}`}
              onClick={() => editMovie(m.id)}
            >
              <img className="movie-poster" src={m.poster} />
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="admin">
      {movies.length > 0 && <MoviesList />}
      {isEdit && <Edit />}
    </div>
  );
};

const mapStateToProps = ({ Movies: { movies } }) => ({
  movies,
});

const mapDispatchToProps = (dispatch) => ({
  getMovieToEdit: (movie_id) => dispatch(getMovieToEdit(movie_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
