import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import './Userdashboard.css';

const UserDashboard = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // If not logged in, redirect to login
        navigate('/login');
      }
    });

    return () => unsubscribe(); // clean up listener
  }, [auth, navigate]);

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

