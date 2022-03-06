import React from 'react';

const Poster = (props) => {
  const { src, alt } = props;
  return <img src={src} alt={alt} className="poster" />;
};

export default Poster;
