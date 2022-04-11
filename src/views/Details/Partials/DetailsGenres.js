import React from 'react';

const DetailsGenres = ({ genres }) => {
  const url = `${window.location.origin}/movies/`;
  return (
    <div className="details-genres">
      Genres:
      {genres.map((g, i) => (
        <React.Fragment key={`fragment-${i}`}>
          <a href={`${url}${g.toLowerCase()}`}>{g}</a>
          {genres.length - 1 === i ? '' : ', '}
        </React.Fragment>
      ))}
    </div>
  );
};

export default DetailsGenres;
