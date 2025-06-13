import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <span className="logo-icon">B</span>
        <span className="logo-text">Bookit Now</span>
      </div>
      <nav>
        <Link to="/landing">Home</Link>
        <a href="#">Customers</a>
        <a href="#">Contact Us</a>
        <a href="#">Enterprise</a>
        <a href="#">Pricing</a>
        <Link to="/login">Login</Link>
        <Link to="/signup" ><button className="signup-btn">Sign Up</button></Link>
      </nav>
    </header>
  );
}

export default Navbar;