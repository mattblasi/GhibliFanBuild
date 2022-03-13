import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import AdminEdit from './AdminEdit';

const Admin = ({ movies }) => {
  const [isEdit, setEdit] = useState(false);
  const [selectedMovie, setMovie] = useState();

  function editMovie(movie) {
    setMovie(movies.filter((m) => m.id === movie));
    setEdit(true);
  }

  function toggleEdit() {
    setEdit(!isEdit);
  }

  const MoviesList = () => {
    return (
      <div className="movies">
        <div className="movies-container">
          {movies.map((m, i) => (
            <div className="movie-item" key={`movie-${i}`}>
              <div className="movie-item--container">
                <img
                  className="movie-poster"
                  src={m.posters[m.posters.length - 1]}
                />
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
      {isEdit && <AdminEdit movie={selectedMovie} />}
    </div>
  );
};

const mapStateToProps = ({ Movies: { movies } }) => ({
  movies,
});

export default connect(mapStateToProps)(Admin);
