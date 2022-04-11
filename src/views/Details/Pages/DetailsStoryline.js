import React, { useState } from 'react';

const DetailsStoryline = ({ synopsis }) => {
  const [useFullSynopsis, setFullSynopsis] = useState(false);

  return (
    <div className="details-synopsis">
      <h2>Synopsis</h2>
      <div
        className="details-synopsis--content"
        dangerouslySetInnerHTML={{
          __html: synopsis[0],
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

export default DetailsStoryline;
