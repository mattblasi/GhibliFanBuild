import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// Sorted keys are obtained in 'key' array
function sortKeys(obj_1) {
  let key = Object.keys(obj_1).sort(function order(key1, key2) {
    if (key1 < key2) return -1;
    else if (key1 > key2) return +1;
    else return 0;
  });

  let temp = {};

  for (let i = 0; i < key.length; i++) {
    temp[key[i]] = obj_1[key[i]];
    delete obj_1[key[i]];
  }

  for (let i = 0; i < key.length; i++) {
    obj_1[key[i]] = temp[key[i]];
  }
  return obj_1;
}

const CastList = ({ list, type, title }) => {
  let split = list.length < 10 ? 'two-col' : 'three-col';

  return (
    <React.Fragment>
      <h3 id={`credits_${type}_title`} className="credits-heading">
        {title}
        {type !== 'cast' && list.length > 1 && title.slice(-1) !== 's'
          ? 's'
          : ''}
      </h3>
      <ul
        id={`credits_${type}_list`}
        className={list.length <= 1 ? `credits-list` : `credits-list ${split}`}
      >
        {list.map((i) => {
          if (i.name) return <CastListItem name={i.name} />;
        })}
      </ul>
    </React.Fragment>
  );
};

const CastListItem = ({ name }) => (
  <li className="credits-list--item">{name}</li>
);

const DetailsCredits = ({ people }) => {
  const { director, writer, cast, ...rest } = people;
  let creditsList = { ...sortKeys(rest) };

  useEffect(() => {
    document.title = `Studio Ghibli : ${title} Credits`;
  }, []);

  return (
    <div className="details-credits">
      <CastList list={director} type="director" title="Director" />
      <CastList list={writer} type="writer" title="Writer" />
      <CastList list={cast} type="cast" title="Cast" />
      {Object.keys(creditsList).map((key) => (
        <CastList
          list={creditsList[key]}
          type={key}
          title={key.replace(/_/g, ' ')}
        />
      ))}
    </div>
  );
};

export default DetailsCredits;
