import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const EditGenres = ({ genres }) => {
  const [genreList, updateGenres] = useState();

  const handleGenreChange = (index, value) => {
    let genreUpdate = [...genreList];
    genreUpdate[index] = value;
    updateGenres(genreUpdate);
  };

  useEffect(() => {
    if (genres) updateGenres([...genres]);
  }, [genres]);

  return (
    <div className="edit--genres">
      <h3>Genres</h3>
      {genreList &&
        genreList.map((g, i) => (
          <input
            type="text"
            key={`genre-${i}`}
            name={`genre-${g}`}
            value={g}
            onChange={(e) => handleGenreChange(i, e.target.value)}
          />
        ))}
    </div>
  );
};

export default EditGenres;
