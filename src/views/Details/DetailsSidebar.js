import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const DetailsSidebar = ({ director, writer }) => {
  const [directorsList, setDirector] = useState([]);
  const [writerList, setWriter] = useState([]);

  useEffect(() => {
    let directors = [];
    director.map(d => {
      directors.push(d.name);
    });
    setDirector([ ...new Set(directors)]);

    let writers = [];
    writer.map(w => {
      writers.push(w.name);
    });
    setWriter([ ...new Set(writers)]);

  },[director, writer])

  return (
    <aside className="details-sidebar">
      <p>Director{director.length > 1 ? 's' : ''}</p>
      <ul>
        {directorsList && directorsList.map((d, i) => (
          <li key={`director-${i}`}>{d}</li>
        ))}
      </ul>
      <p>Writer{writer.length > 1 ? 's' : ''}</p>
      <ul>
        {writerList && writerList.map((w, i) => (
          <li key={`writer-${i}`}>{w}</li>
        ))}
      </ul>
    </aside>
  );
};

export default DetailsSidebar;
