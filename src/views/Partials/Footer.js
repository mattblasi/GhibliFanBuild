import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/Studio_Ghibli_logo.svg';

import apple from '../../images/appstores/appstore-apple.svg';
import google from '../../images/appstores/appstore-google.svg';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer--left">
        <nav className="footer-nav">
          <Link className="footer-link" to="/about">
            About
          </Link>
          &middot;
          <Link className="footer-link" to="/api">
            API
          </Link>
          &middot;
          <Link className="footer-link" to="/terms">
            Terms
          </Link>
          &middot;
          <Link className="footer-link" to="/admin">
            Admin
          </Link>
          &middot;
          <Link className="footer-link" to="/contribute">
            Contribute
          </Link>
        </nav>
        <p>Made by Me ~ Matt Blasi &copy; {new Date().getFullYear()}</p>
      </div>
      <div className="site-footer--right">
        <a href="#" className="app-bar--link" title="download for iOS">
          <img src={apple} />
        </a>
        <a href="#" className="app-bar--link" title="download for Android">
          <img src={google} />
        </a>

        <img src={logo} className="recents-logo" />
      </div>
    </footer>
  );
};

export default Footer;
