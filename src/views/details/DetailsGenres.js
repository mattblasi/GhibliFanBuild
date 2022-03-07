import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const DetailsGenres = ({ genres }) => {
  return (
    <div className="details-genres">
      <p>
        Genres:{' '}
        {genres.map((g, i) => (
          <React.Fragment>
            <a href={`${window.location.origin}/movies/${g.toLowerCase()}`}>
              {g}
            </a>
            {genres.length - 1 === i ? '' : ', '}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

const mapStateToProps = ({
  Details: {
    details: { genres },
  },
}) => ({
  genres,
});

export default connect(mapStateToProps)(DetailsGenres);