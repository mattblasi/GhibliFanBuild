import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({
  movie: { id, title, poster, og_title_jp, og_title_rm },
  basic = false
}) => {
  return (
    <Link to={id} style={{ backgroundImage: `url(${poster})` }}>
      <img className="card-img" src={poster} alt={title} />
      {!basic && (
        <div className="card-info">
          <h3>{title}</h3>
          <p>{og_title_rm}</p>
          <p>{og_title_jp}</p>
        </div>
      )}
    </Link>
  );
};

export default MovieCard;
