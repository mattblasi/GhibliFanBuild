import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const DetailsMeta = ({
  release_year,
  imdb_score,
  imdb_popularity,
  duration,
  rottentomatoes,
}) => {
  return (
    <div className="details-meta">
      <div className="details-meta--imdb">{imdb_score}/10</div>
      <div
        className={`details-meta--rottentomatos-tom ${
          rottentomatoes.certified ? ' certified' : ''
        } ${rottentomatoes.tomatometer < 60 ? 'low' : ''} ${
          rottentomatoes.tomatometer === 0 ? 'none' : ''
        }`}
      >
        {rottentomatoes.tomatometer}%
      </div>
      <div
        className={`details-meta--rottentomatos-aud ${
          rottentomatoes.audience < 60 ? 'low' : ''
        } ${rottentomatoes.audience === 0 ? 'none' : ''}`}
      >
        {rottentomatoes.audience}%
      </div>
      <div className="details-meta--runtime">{duration}</div>
    </div>
  );
};

const mapStateToProps = ({
  Details: {
    details: {
      meta: { release_year, imdb_score, imdb_popularity, duration },
      rottentomatoes,
    },
  },
}) => ({
  release_year,
  imdb_score,
  imdb_popularity,
  duration,
  rottentomatoes,
});

export default connect(mapStateToProps)(DetailsMeta);
