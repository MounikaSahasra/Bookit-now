import React from 'react';
import './navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <span className="logo-icon">B</span>
        <span className="logo-text">Bookit Now</span>
      </div>
      <nav>
        <a href="#">Home</a>
        <a href="#">Customers</a>
        <a href="#">Contact Us</a>
        <a href="#">Enterprise</a>
        <a href="#">Pricing</a>
        <a href="#">Login</a>
        <button className="signup-btn">Sign Up</button>
      </nav>
    </header>
  );
}

export default Navbar;