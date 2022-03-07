import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie: { id, title, posters, og_title_jp, og_title_rm } }) => {
  let poster = posters[posters.length - 1];
  return (
    <Link
      to={id}
      className="card"
      style={{ backgroundImage: `url(${poster})` }}
    >
      <img className="card-img" src={poster} alt={title} />
      <div className="card-info">
        <h3>{title}</h3>
        <p>{og_title_rm}</p>
        <p>{og_title_jp}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
