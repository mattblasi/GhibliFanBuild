import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

import { getAllMovies } from './actions/movieActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const App = ({ movies, isLoading, getAllMovies }) => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const searchField = document.getElementById('ghibli-search');

  const toggleSearch = () => setIsSearch(!isSearch);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    let results = movies.filter((m) => {
      return m.title.includes(searchField.value);
    });
  };

  const handleKeyUp = (e) => {
    console.log(e);
    if (e.target.id === 'ghibli-search' && e.keyCode >= 65 && e.keyCode <= 90)
      console.log(e.key);
  };

  useEffect(() => {
    if (isLoading) getAllMovies();
  }, []);

  useEffect(() => {
    console.log('search', isSearch);
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [isSearch]);

  if (isLoading) return <div />;

  return (
    <div id="ghibli" className="ghibli">
      <header className="site-header">
        <nav>
          <div
            className={`search ${isSearch ? 'search-open' : 'search-hidden'}`}
          >
            <input
              id="ghibli-search"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleChange}
            />
            <button onClick={() => handleSearch()}>Go</button>
          </div>
          <a onClick={(location) => toggleSearch()}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </a>
          <Link to="/">News</Link>
          <Link to="/">Movies</Link>
        </nav>
      </header>
      <main id="main" className="site-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>Made by Me ~ Matt Blasi &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

const mapStateToProps = ({ Movies: { isLoading, movies } }) => ({
  isLoading,
  movies,
});

const mapDispatchToProps = (dispatch) => ({
  getAllMovies: () => dispatch(getAllMovies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
