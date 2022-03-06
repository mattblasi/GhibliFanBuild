import React from 'react';
import { connect } from 'react-redux';

const DetailsImages = ({ synopsis }) => {
  return (
    <div className="detail-images">
      <div className="detail-images--image image-1"></div>
      <div className="detail-images--image image-2"></div>
      <div className="detail-images--image image-3"></div>
    </div>
  );
};

const mapStateToProps = ({ Details: { synopsis } }) => ({
  synopsis,
});

export default connect(mapStateToProps)(DetailsImages);
