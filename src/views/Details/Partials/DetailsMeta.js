import React, { useEffect, useState } from 'react';

const DetailsMeta = ({ details }) => {
  const [cert, setCert] = useState();
  const {
    meta: { imdb_score, imdb_popularity, duration, certificates },
    rottentomatoes,
  } = details;

  useEffect(() => {
    if (certificates.length) {
      let certs = certificates.filter((c) => c.country === 'United States');
      setCert(certs);
    }
  }, [certificates]);

  return (
    <div className="details-meta">
      {cert && (
        <div className="details-meta--cert">
          <span>{cert[0].cert}</span>
        </div>
      )}
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
