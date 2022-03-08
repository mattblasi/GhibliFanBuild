import React from 'react';

const DetailsMeta = ({
  details: {
    meta: { release_year, imdb_score, imdb_popularity, duration },
    rottentomatoes,
  },
}) => {
  return (
    <div className="details-meta">
      <div className="details-meta--year">Released: {release_year}</div>
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

export default DetailsMeta;
