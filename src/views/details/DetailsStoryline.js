import React, { useState } from 'react';
import { connect } from 'react-redux';

const DetailsStoryline = ({ synopsis }) => {
  const [useFullSynopsis, setFullSynopsis] = useState(false);

  return (
    <div className="details-synopsis">
      <h2>
        Synopsis
        <button onClick={() => setFullSynopsis(!useFullSynopsis)}>
          {useFullSynopsis ? 'Read Less' : 'Read More'}
        </button>
      </h2>

      <div
        className="details-synopsis--content"
        dangerouslySetInnerHTML={{
          __html: useFullSynopsis
            ? synopsis[0]
            : synopsis[0].slice(0, 500).concat('...'),
        }}
      />
      {useFullSynopsis && (
        <button onClick={() => setFullSynopsis(!useFullSynopsis)}>
          {useFullSynopsis ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

const mapStateToProps = ({
  Details: {
    details: { synopsis },
  },
}) => ({
  synopsis,
});

export default connect(mapStateToProps)(DetailsStoryline);
