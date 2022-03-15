import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getMovieToEdit } from '../../actions/adminActions';

// import AdminEdit from './AdminEdit';
import Edit from './Edit';

const Admin = ({ movies, getMovieToEdit }) => {
  const [isEdit, setEdit] = useState(false);
  const [selectedMovie, setMovie] = useState();

  const editMovie = (movie) => setMovie(movie);

  useEffect(() => {
    getMovieToEdit(selectedMovie);
    if (selectedMovie) setEdit(true);
  }, [selectedMovie]);

  const toggleEdit = () => setEdit(!isEdit);

  const MoviesList = () => {
    return (
      <div className="movies">
        <div className="movies-container">
          {movies.map((m, i) => (
            <div className="movie-item" key={`movie-${i}`}>
              <div className="movie-item--container">
                <img className="movie-poster" src={m.poster} />
                <div className="movie-info">
                  <h2 className="movie-title">{m.title}</h2>
                  <p className="movie-subtitle">{m.og_title_rm}</p>
                  <button
                    className="movie-button"
                    onClick={() => editMovie(m.id)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
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
