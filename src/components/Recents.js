import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '../images/Studio_Ghibli_logo.svg';

const Recents = ({ recentlyViewed, movies }) => {
  const [recents, setRecents] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    if (recentlyViewed) {
      let sorted = [];
      recentlyViewed.forEach((key) => {
        sorted.push(movies.filter((m) => m.id === key)[0]);
      });
      console.log('sorted', sorted);
      setRecents(sorted);
      setOrder(recentlyViewed);
    }
  }, [recentlyViewed]);

  return (
    <div className="recents">
      <div className="recents-content">
        <h2>Recently Viewed</h2>
        {recents &&
          recents.map((r) => (
            <Link
              to={r.id}
              className="recent-item"
              style={{ backgroundImage: `url(${r.poster})` }}
            >
              <img src={r.poster} style={{ opacity: 0 }} />
            </Link>
          ))}
      </div>
      <img src={logo} className="recents-logo" />
    </div>
  );
};

const mapStateToProps = ({ Site: { recentlyViewed }, Movies: { movies } }) => ({
  recentlyViewed,
  movies,
});

export default connect(mapStateToProps)(Recents);
