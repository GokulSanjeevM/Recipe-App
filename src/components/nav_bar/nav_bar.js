import React from 'react';
import { Link } from 'react-router-dom';
import './nav_bar.css';

const Navbar = () => {
  return (
    <nav>
      <ul className='menu'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;