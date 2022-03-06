import React from 'react';
import { connect } from 'react-redux';

import DetailsImages from './DetailsImages';

const Details = ({
  synopsis,
  release_year,
  imdb_score,
  imdb_popularity,
  duration,
  rottentomatoes,
}) => {
  if (!synopsis) return <div />;
  return (
    <React.Fragment>
      <article className="details">
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
        <div className="details-content">
          <div className="details-synopsis">
            <h2>Synopsis</h2>
            <div
              className="details-synopsis--content"
              dangerouslySetInnerHTML={{ __html: synopsis[0] }}
            />
          </div>
        </div>
        <aside className="details-sidebar">
          <p>Something needs to go here</p>
        </aside>
      </article>
    </React.Fragment>
  );
};

const mapStateToProps = ({
  Details: {
    details: {
      synopsis,
      meta: { release_year, imdb_score, imdb_popularity, duration },
      rottentomatoes,
    },
  },
}) => ({
  synopsis,
  release_year,
  imdb_score,
  imdb_popularity,
  duration,
  rottentomatoes,
});

export default connect(mapStateToProps)(Details);
