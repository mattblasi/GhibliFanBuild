import React, { useState, useEffect } from 'react';

const DetailsSidebar = ({ director, writer }) => {
  const [directorsList, setDirector] = useState([]);
  const [writerList, setWriter] = useState([]);

  const SidebarList = ({ people, type }) => {
    let title = people.length > 1 ? `${type}s` : type;
    return (
      <React.Fragment>
        <p className="title" id={type}>
          {title}
        </p>
        <ul className="list" aria-labelledby={type}>
          {people.map((p, i) => (
            <li key={`${type}-${i}`}>{p}</li>
          ))}
        </ul>
      </React.Fragment>
    );
  };

  useEffect(() => {
    let directors = new Set();
    if (director) {
      director.map((d) => directors.add(d.name));
      setDirector([...directors]);
    }

    let writers = new Set();
    if (writer) {
      writer.map((w) => writers.add(w.name));
      setWriter([...writers]);
    }
  }, [director, writer]);

  if (!directorsList.length || !writerList.length) return <span />;
  return (
    <div className="details-sidebar--content">
      {directorsList.length && (
        <SidebarList people={directorsList} type={'director'} />
      )}
      {writerList.length && <SidebarList people={writerList} type={'writer'} />}
    </div>
  );
};

export default DetailsSidebar;
