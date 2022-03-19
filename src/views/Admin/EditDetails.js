import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

import EditGenres from './EditGenres';

const EditDetails = ({ details }) => {
  const textInputs = [
    'trailer',
    'title',
    'og_title_rm',
    'og_title_jp',
    'poster',
  ];

  const metaInputs = [
    'imdb_score',
    'release_year',
    'duration',
    'imdb_popularity',
  ];

  const idInputs = ['tmdb', 'imdb', 'trakt'];

  const handleValueChange = (field, val) => {};
  const TextInput = ({ item, parent }) => {
    return (
      <div className="row" id={`field-${item}`} key={`field-${item}`}>
        {item === 'trailer' && (
          <ReactPlayer
            id="ghiblitrailer"
            className="trailer-wrapper"
            url={details.trailer}
            width="100%"
            height="0"
          />
        )}
        <label htmlFor={item}>Field: {item}</label>
        <input
          onChange={(e) => handleValueChange(item, e.target.value)}
          value={!parent ? details[item] : details[parent][item]}
          id={item}
          name={item}
          type="text"
        />
      </div>
    );
  };

  return (
    <div className="edit--details">
      <h3>Details</h3>
      {textInputs.map((item, i) => (
        <TextInput item={item} key={`input-${i}`} />
      ))}
      {metaInputs.map((meta, i) => (
        <TextInput item={meta} key={`meta-${i}`} parent={`meta`} />
      ))}
      {idInputs.map((id, i) => (
        <TextInput item={id} key={`id-${i}`} parent={`ids`} />
      ))}
      <EditGenres genres={details.genres} />
    </div>
  );
};

export default EditDetails;
