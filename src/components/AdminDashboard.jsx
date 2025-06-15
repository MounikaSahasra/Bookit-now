import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

import AppointmentRequestList from './AppointmentRequestList';
import UnavailableDateSetter from './UnavailableDateSetter';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // Not logged in
        navigate('/login');
      } else {
        // Optional: You can check admin privileges here if needed
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <UnavailableDateSetter />
      <AppointmentRequestList />
    </div>
  );
};

export default AdminDashboard;
