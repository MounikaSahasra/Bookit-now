import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Navbar from './components/navbar.jsx';
import Landing from './components/landing.jsx';
import Login from './components/Login.js';
import Signup from './components/SignUp.js';
import Choose from './components/choose.jsx';
import UserLogin from './components/userlogin.js';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Now `useLocation` is safely used within a component already under Router
function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Choose />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userlogin" element={<UserLogin />} />
      </Routes>
    </>
  );
}

export default App;
