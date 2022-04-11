import React from 'react';
import { Link } from 'react-router-dom';

const DetailsCast = ({ cast }) => {
  return (
    <article className="details-cast">
      <h2>
        Cast <Link to="./credits">View Full Credits</Link>
      </h2>
      <ul className="details-cast--list">
        {cast.map((c, i) => (
          <li className="details-cast--listitem" key={`cast-${i}`}>
            <div className="cast-image">
              <img
                src={c.photo_url}
                alt={c.name}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p>{c.name}</p>
            <span>{c.role}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default DetailsCast;
