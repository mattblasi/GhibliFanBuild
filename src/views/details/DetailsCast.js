import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const DetailsCast = ({ id, cast }) => {
  return (
    <div className="details-cast">
      <h2>
        <span>Cast</span>
        <Link to="./credits">View Full Credits</Link>
      </h2>
      <ul className="details-cast--list">
        {cast.map((c) => (
          <li className="details-cast--listitem">
            <div className="cast-image"></div>
            <p>{c.name}</p>
            <span>{c.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({
  Details: {
    isLoading,
    details: {
      id,
      people: { cast },
    },
  },
}) => ({
  isLoading,
  id,
  cast,
});

export default connect(mapStateToProps)(DetailsCast);
