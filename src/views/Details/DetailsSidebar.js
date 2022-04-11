import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const DetailsSidebar = ({ director, writer }) => {
  const [directorsList, setDirector] = useState([]);
  const [writerList, setWriter] = useState([]);

  useEffect(() => {
    let directors = [];
    director.map((d) => {
      directors.push(d.name);
    });
    setDirector([...new Set(directors)]);

    let writers = [];
    writer.map((w) => {
      writers.push(w.name);
    });
    setWriter([...new Set(writers)]);
  }, [director, writer]);

  return (
    <div className="details-sidebar--content">
      <p className="title" id="directors">
        Director{director.length > 1 ? 's' : ''}
      </p>
      <ul className="list" aria-labelledby="directors">
        {directorsList &&
          directorsList.map((d, i) => <li key={`director-${i}`}>{d}</li>)}
      </ul>
      <p className="title" id="writers">
        Writer{writer.length > 1 ? 's' : ''}
      </p>
      <ul className="list" aria-labelledby="writers">
        {writerList &&
          writerList.map((w, i) => <li key={`writer-${i}`}>{w}</li>)}
      </ul>
    </div>
  );
};

export default DetailsSidebar;
