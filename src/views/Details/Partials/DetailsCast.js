import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../../components/Cards/Card';

const DetailsCast = ({ cast }) => {
  return (
    <article className="details-cast">
      <h2>
        Cast <Link to="./credits">View Full Credits</Link>
      </h2>
      <ul className="details-cast--list">
        {cast.map((c, i) => (
          <Card cast={c} key={`cast-${i}`} />
        ))}
      </ul>
    </article>
  );
};

export default DetailsCast;
