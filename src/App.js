import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

import { getAllMovies, forceReloadDetails } from './actions/movieActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const App = ({ movies, isLoading, getAllMovies, forceReloadDetails }) => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setResults] = useState();

  const toggleSearch = () => setIsSearch(!isSearch);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClickedSearch = () => {
    forceReloadDetails();
    toggleSearch();
  };

  useEffect(() => {
    if (isLoading) getAllMovies();
    movies = movies.sort(
      (a, b) => (a.meta.release_year > b.meta.release_year ? 1 : -1) // Sort by release year oldest first
      //(a, b) => (a.meta.imdb_score < b.meta.imdb_score ? 1 : -1) // sort by imdb score highest first
    );
  }, []);

  /**
   * Handle search terms to check against the title, 
   * japanese title, genres, and release year. Searches 
   * within the current images state short form
   */
  useEffect(() => {
    setResults(
      movies.filter((m) => {
        let hasGenre = false,
          title = m.title.toLowerCase(),
          ogTitle = m.og_title_rm,
          year = m.meta.release_year + '';
        if (m.genres) {
          for (const genre of m.genres) {
            if (genre.toLowerCase().includes(searchTerm)) hasGenre = true;
          }
        }
        return (
          title.includes(searchTerm) ||
          year.includes(searchTerm) ||
          hasGenre ||
          ogTitle.includes(searchTerm)
        );
      })
    );
  }, [searchTerm]);

  /**
   * Empty out the search and reset the fields
   * when search form is closed
   */
  useEffect(() => {
    if (!isSearch) {
      setSearchTerm('');
      setResults(null);
    }
  }, [isSearch]);

  if (isLoading) return <div>loading main...</div>;

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
            {searchResults && searchResults?.length !== movies.length && (
              <ul className="search-list">
                {searchResults.map((m, i) => (
                  <li key={`link-${i}`}>
                    <Link to={`/${m.id}`} onClick={handleClickedSearch}>
                      {m.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <a onClick={() => toggleSearch()}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </a>
          <Link to="/">News</Link>
          <Link to="/">Movies</Link>
          <Link to="/">GhibliFest 2022</Link>
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
  forceReloadDetails: () => dispatch(forceReloadDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
