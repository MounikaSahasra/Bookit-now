import React from 'react';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import './Userdashboard.css';

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <h2>When would you like to visit us?</h2>
      <p className="sub-heading">Choose date & time</p>
      <AppointmentForm />
      <AppointmentList />
    </div>
  );
};

export default UserDashboard;
