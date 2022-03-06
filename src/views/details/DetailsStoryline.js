import React, { useState } from 'react';
import { connect } from 'react-redux';

const DetailsStoryline = ({ synopsis }) => {
  const [useFullSynopsis, setFullSynopsis] = useState(false);

  return (
    <div className="details-synopsis">
      <h2>Synopsis</h2>
      <button onClick={() => setFullSynopsis(!useFullSynopsis)}>
        {useFullSynopsis ? 'Read Less' : 'Read More'}
      </button>
      <div
        className="details-synopsis--content"
        dangerouslySetInnerHTML={{
          __html: useFullSynopsis
            ? synopsis[0]
            : synopsis[0].slice(0, 500).concat('...'),
        }}
      />
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
