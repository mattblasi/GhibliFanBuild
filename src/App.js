import React, { Component, useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <div />;

  return (
    <div id="ghibli" className="ghibli">
      <header className="site-header">
        <nav>
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

export default App;
