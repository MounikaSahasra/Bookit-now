import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e, selectedRole) => {
    e.preventDefault();

    try {
      // 1️⃣ Sign in user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Fetch role from Firestore
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const roleInFirestore = userData.role?.toLowerCase().trim();
        const selected = selectedRole.toLowerCase();

        console.log('Logged in user:', user.email);
        console.log('Firestore role:', roleInFirestore);
        console.log('Selected role:', selected);

        if (roleInFirestore === selected) {
          if (selected === 'admin') {
            navigate('/AdminDashboard');
          } else {
            navigate('/Userdashboard');
          }
        } else {
          alert('🚫 You are not authorized for the selected role.');
        }
      } else {
        alert('⚠️ User record not found in Firestore.');
      }

    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        alert('⚠️ No such user. Please sign up.');
      } else if (error.code === 'auth/wrong-password') {
        alert('❌ Incorrect password.');
      } else {
        alert('❌ Login failed: ' + error.message);
      }
    }
  };

  return (
    <div className="login-container">
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

        <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
          <button type="button" onClick={(e) => handleLogin(e, 'user')}>
            Login as User
          </button>
          <button type="button" onClick={(e) => handleLogin(e, 'admin')}>
            Login as Admin
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
