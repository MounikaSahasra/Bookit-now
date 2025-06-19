import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

// ✅ Correct casing for styles path
import '../Styles/Navbar.css';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => navigate('/login'))
      .catch((error) => {
        console.error('Error signing out:', error);
        alert('❌ Failed to log out. Try again.');
      });
  };

  const userInitial = currentUser?.email?.charAt(0).toUpperCase() || 'U';

  // Determines if login button should be hidden on dashboard/admin pages
  const isMinimal =
    location.pathname.includes('/dashboard') ||
    location.pathname.includes('/Userdashboard') ||
    location.pathname.includes('/AdminDashboard');

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <span className="logo-icon">B</span>
        <span className="logo-text">Bookit Now</span>
      </Link>

      {!isMinimal ? (
        <nav>
          <Link to="/login">
            <button className="signup-btn">LOGIN</button>
          </Link>
        </nav>
      ) : (
        <div className="user-badge-container">
          <div
            className="user-badge"
            onClick={() => setShowDropdown((prev) => !prev)}
            title="User Menu"
          >
            {userInitial}
          </div>

          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
