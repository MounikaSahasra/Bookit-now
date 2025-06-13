import React from 'react';
import UnavailableDateSetter from './UnavailableDateSetter';
import AppointmentRequestList from './AppointmentRequestList';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <UnavailableDateSetter />
      <AppointmentRequestList />
    </div>
  );
};

export default AdminDashboard;
