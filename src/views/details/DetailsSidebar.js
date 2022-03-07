import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const DetailsSidebar = ({ director, writer }) => {
  return (
    <aside className="details-sidebar">
      <p>Director{director.length > 1 ? 's' : ''}</p>
      <ul>
        {director.map((d) => (
          <li>{d.name}</li>
        ))}
      </ul>
      <p>Writer{writer.length > 1 ? 's' : ''}</p>
      <ul>
        {writer.map((w) => (
          <li>{w.name}</li>
        ))}
      </ul>
    </aside>
  );
};

const mapStateToProps = ({
  Details: {
    details: {
      people: { director, writer },
    },
  },
}) => ({
  director,
  writer,
});

export default connect(mapStateToProps)(DetailsSidebar);
