import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

import { getAllMovies } from './actions/movieActions';
import { siteSetting } from './actions/siteActions';

import Footer from './views/Partials/Footer';
import Header from './views/Partials/Header';
import Recents from './views/Partials/Recents';
import ScrollTop from './components/ScrollTop';

const App = ({ movies, isLoading, getAllMovies, siteSetting }) => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setResults] = useState();

  const toggleSearch = () => setIsSearch(!isSearch);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClickedSearch = () => {
    toggleSearch();
  };

  useEffect(() => {
    siteSetting();
    if (isLoading) getAllMovies();
    movies = movies.sort(
      // Sort by release year oldest first
      (a, b) => (a.meta.release_year > b.meta.release_year ? 1 : -1)
      // Sort by imdb score highest first
      // (a, b) => (a.meta.imdb_score < b.meta.imdb_score ? 1 : -1)
    );
  }, []);

  if (isLoading) return <div>loading main...</div>;

  return (
    <div id="ghibli" className="ghibli">
      <Header movies={movies} />
      <main id="main" className="site-content">
        <Outlet />
        <Recents />
      </main>
      <Footer />
      <ScrollTop />
    </div>
  );
};

const mapStateToProps = ({ Movies: { isLoading, movies } }) => ({
  isLoading,
  movies,
});

const mapDispatchToProps = (dispatch) => ({
  getAllMovies: () => dispatch(getAllMovies()),
  siteSetting: () => dispatch(siteSetting()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
