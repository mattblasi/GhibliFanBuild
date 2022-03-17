import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Recents = ({ recentlyViewed, movies }) => {
  const [recents, setRecents] = useState([]);

  useEffect(() => {
    if (recentlyViewed) {
      let sorted = [];
      recentlyViewed.forEach((key) => {
        sorted.push(movies.filter((m) => m.id === key)[0]);
      });
      setRecents(sorted);
    }
  }, [recentlyViewed]);

  if (recents.length < 1) return <span />;
  return (
    <div className="recents">
      <div className="recents-content">
        <h2>Recently Viewed</h2>
        {recents &&
          recents.map((r, i) => (
            <Link
              to={r.id}
              key={`recently-viewed-movies-${i}`}
              className="recent-item"
              style={{ backgroundImage: `url(${r.poster})` }}
            >
              <img src={r.poster} style={{ opacity: 0 }} />
            </Link>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ Site: { recentlyViewed }, Movies: { movies } }) => ({
  recentlyViewed,
  movies,
});

export default connect(mapStateToProps)(Recents);
