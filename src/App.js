// import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useLocation
} from 'react-router-dom';

import Navbar from './components/navbar.jsx';
import Landing from './components/landing.jsx';
import Signup from './components/SignUp.js';
import UserLogin from './components/userlogin.js';
import UserDashboard from './components/Userdashboard.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import Login from './components/userlogin.js';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/Userdashboard" element={<UserDashboard />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
