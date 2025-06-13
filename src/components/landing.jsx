import React from "react";
import './landing.css';
import calendar from './assets/calendar.jpg'; 
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <>
    
    <section className="hero">
    <div>
      <br />
      <br />
        <h3 id='s2h3'>Appointments</h3>
        <h1 id='s2h1'>Simplify bookings <br /> and stay organized</h1>
    </div>
    <br />
    <br />
    
    
    </section>
    <section className="hero">
      <div className="hero-text">
        <h1>
          Discover the easiest way to schedule appointments with the
          best online booking system
        </h1>
        <p>
  Tired of endless back-and-forth calls and emails just to schedule an appointment? 😫<br />
 
</p>

<ul style={{ listStyle: "none", paddingLeft: "0", lineHeight: "1.8" }}>
  <li>✅ <strong>Book 24/7</strong> – Let clients schedule even outside business hours!</li>
  <li>⚡ <strong>Live availability</strong> – Show real-time slots and avoid double bookings.</li>
  <li>🔁 <strong>Flexible scheduling</strong> – Set up recurring sessions, buffer times, and rules that fit your style.</li>
  <li>💳 <strong>Automated payments</strong> – Collect fees seamlessly and securely.</li>
  <li>🔔 <strong>Smart reminders</strong> – Reduce no-shows with automatic email/SMS alerts.</li>
  <li>📊 <strong>Manage it all</strong> – From calendars to customers, do everything from one dashboard.</li>
</ul>

<p>
 
  Say goodbye to the chaos and hello to streamlined scheduling. Let your calendar work for you! 🙌
</p>

        <br />
       
        <Link to="/Signup" ><button className="hero-btn">Get started !</button></Link>
        
      </div>
    
      <div className="hero-image">
        <img src={calendar} alt="Calendar Illustration" />
      </div>
    </section>
    </>
  );
}

export default Landing;
