// File: src/pages/Login.jsx
import React, { useState } from 'react';
import '../Styles/login.css'; // ✅ Make sure this file and folder exist
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e, selectedRole) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const firestoreRole = userData?.role?.toLowerCase().trim();
        if (firestoreRole === selectedRole.toLowerCase()) {
          navigate(firestoreRole === 'admin' ? '/AdminDashboard' : '/Userdashboard');
        } else {
          alert('🚫 Invalid credentials for selected role.');
        }
      } else {
        alert('⚠️ User data not found in Firestore.');
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        alert('⚠️ No such user, please sign up.');
      } else if (error.code === 'auth/wrong-password') {
        alert('❌ Incorrect password.');
      } else {
        alert('Login failed: ' + error.message);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="role-buttons">
            <button type="button" onClick={(e) => handleLogin(e, 'user')}>Login as User</button>
            <button type="button" onClick={(e) => handleLogin(e, 'admin')}>Login as Admin</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
