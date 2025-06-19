// src/pages/Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Landing.css';
import calendarImg from '../assets/calendar.png'; // make sure this exists

const Landing = () => {
  return (
    <main className="landing-wrapper">

      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-text">
          <h1>Effortless Appointments. Anytime.</h1>
          <p>Let your clients book online 24/7 with zero hassle.</p>
          <div className="cta-buttons">
            <Link to="/signup"><button className="cta">Get Started</button></Link>
            <Link to="/login"><button className="cta-secondary">Login</button></Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={calendarImg} alt="Booking calendar" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Bookit Now?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>📅 Book 24/7</h3>
            <p>Let users book even after hours without any calls.</p>
          </div>
          <div className="feature-card">
            <h3>🔐 Secure Login</h3>
            <p>Protected with Firebase Auth & Role-based Access.</p>
          </div>
          <div className="feature-card">
            <h3>⚙️ Admin Panel</h3>
            <p>Manage, Approve, or Reject appointment requests.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>Designed for Professionals and Businesses</h2>
        <p>
          <strong>Bookit Now</strong> is a powerful scheduling solution tailored for clinics, salons, consultancies, and other service-based businesses — helping you manage appointments efficiently and deliver a seamless client experience.
        </p>
      </section>


      {/* Footer */}
      <footer className="footer">
        <p>📧 Contact us at pradeep1234@gmail.com</p>
        <p>© {new Date().getFullYear()} Bookit Now | Designed by Pradeep</p>
      </footer>

    </main>
  );
};

export default Landing;
