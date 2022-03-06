import React, { Component } from 'react';
import { Outlet, Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="ghibli">
      <header className="site-header">
        <span>Ghibli Fan</span>
        <nav>
          <Link to="/">Search</Link>
          <Link to="/">Ghibli Movies</Link>
          <Link to="/">Merch</Link>
        </nav>
      </header>
      <main className="site-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>Made by Me ~ Matt Blasi &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App;
