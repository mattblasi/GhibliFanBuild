import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Header = ({ movies }) => {
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
    if (isSearch) document.getElementById('ghibli-search').focus();
    if (!isSearch) {
      setSearchTerm('');
      setResults(null);
    }
  }, [isSearch]);

  return (
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
        <Link to="/admin">Admin</Link>
      </nav>
    </header>
    )
}

export default Header;