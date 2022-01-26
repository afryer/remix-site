import { Link } from "remix";
import * as React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" title="Anthony Fryer" className="header-home-link">
          <h1>Anthony Fryer</h1>
        </Link>
        <nav aria-label="Main navigation" className="header-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;