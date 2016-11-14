import React from 'react';
import { Link } from 'react-router';

const Navbar = () => (

<nav className="navbar navbar-inverse navbar-static-top">
  <div className="container">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <Link to="/" className="navbar-brand">TVIZ</Link>
    </div>
    <div id="navbar" className="collapse navbar-collapse">
      <ul className="nav navbar-nav">
        <li><Link to="/volume">volume</Link></li>
        <li><Link to="/map">map</Link></li>
        <li><Link to="/recent">recent</Link></li>
        <li><Link to="/cloud">cloud</Link></li>
      </ul>
    </div>
  </div>
</nav>
)


export default Navbar
