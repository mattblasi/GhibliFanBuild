import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const DetailsSidebar = ({ director, writer }) => {
  return (
    <aside className="details-sidebar">
      <p>Director{director.length > 1 ? 's' : ''}</p>
      <ul>
        {director.map((d, i) => (
          <li key={`director-${i}`}>{d.name}</li>
        ))}
      </ul>
      <p>Writer{writer.length > 1 ? 's' : ''}</p>
      <ul>
        {writer.map((w, i) => (
          <li key={`writer-${i}`}>{w.name}</li>
        ))}
      </ul>
    </aside>
  );
};

export default DetailsSidebar;
