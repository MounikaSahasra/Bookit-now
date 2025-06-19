// File: src/pages/AdminDashboard.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import AppointmentRequestList from '../components/AppointmentRequestList';
import UnavailableDateSetter from '../components/UnavailableDateSetter';

import '../Styles/AdminDashboard.css'; // ✅ Use lowercase for folder name

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate('/login');
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>👨‍💼 Admin Control Panel</h1>
        <p>Manage appointment requests and block unavailable days</p>
      </div>

      <section className="admin-section">
        <h2>📅 Mark Unavailable Dates</h2>
        <UnavailableDateSetter />
      </section>

      <section className="admin-section">
        <h2>📨 Appointment Requests</h2>
        <AppointmentRequestList />
      </section>
    </div>
  );
};

export default AdminDashboard;
