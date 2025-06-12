import React from "react";
import './landing.css';
import calendar from './assets/calendar.jpg'; 

function Landing() {
  return (
    <>
    
    <section className="hero">
    <div>
        <h3 id='s2h3'>Appointments</h3>
        <h1 id='s2h1'>Simplify bookings <br /> and stay organized</h1>
    </div>
    </section>
    <section className="hero">
      <div className="hero-text">
        <h1>
          Discover the easiest way to schedule appointments with the
          best online booking system
        </h1>
        <p>
          Save time spent on coordinating appointments over phone and email with an all-in-one appointment booking software.
          Accept online bookings 24x7, automate payments, business management, marketing, and more!
        </p>
        <br />
       
        <button className="hero-btn">Get started !</button>
      </div>
    
      <div className="hero-image">
        <img src={calendar} alt="Calendar Illustration" />
      </div>
    </section>
    </>
  );
}

export default Landing;
