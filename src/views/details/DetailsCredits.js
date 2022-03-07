import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const CastList = ({ list, type, title }) => {
  let split = list.length < 10 ? 'two-col' : 'three-col';

  return (
    <React.Fragment>
      <h3 id={`credits_${type}_title`} className="credits-heading">
        {title}
        {type !== 'cast' && list.length > 1 ? 's' : ''}
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

const DetailsCredits = React.memo(
  ({ title, people: { writer, cast, director, ...rest } }) => {
    useEffect(() => {
      document.getElementsByClassName('site-content')[0].scrollTop = 0;
    }, []);

    return (
      <div className="details-credits">
        <h2>{title} Credits</h2>
        <CastList list={director} type="director" title="Director" />
        <CastList list={writer} type="writer" title="Writer" />
        <CastList list={cast} type="cast" title="Cast" />
        {Object.keys(rest).map((key) => (
          <CastList
            list={rest[key]}
            type={key}
            title={key.replace(/_/g, ' ')}
          />
        ))}
      </div>
    );
  }
);

const mapStateToProps = ({
  Details: {
    details: { title },
    people,
  },
}) => ({
  title,
  people,
});

export default connect(mapStateToProps)(DetailsCredits);
