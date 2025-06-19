// File: src/components/UserDashboard.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';

import '../Styles/UserDashboard.css'; // ✅ Match correct path and casing

const UserDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

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
