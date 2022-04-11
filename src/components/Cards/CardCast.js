import React from 'react';

const CastCard = ({ person }) => {
  const { photo_url, name, role } = person;

  return (
    <div className="cast">
      <img src={photo_url} alt={name} />
      <p>{name}</p>
      <p>{role}</p>
    </div>
  );
};

export default CastCard;
