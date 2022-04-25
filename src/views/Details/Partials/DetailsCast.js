import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../../components/Cards/Card';

const DetailsCast = ({ cast }) => {
  if (!cast) return <div />;

  return (
    <div className="details-section details-cast">
      <h2>
        Cast <Link to="./credits">View Full Credits</Link>
      </h2>
      <div className="details-cast--list">
        {cast.map((c, i) => (
          <Card props={{ cast: c }} key={`cast-${i}`} />
        ))}
      </div>
    </div>
  );
};

export default DetailsCast;
