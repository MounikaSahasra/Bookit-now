import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e, role) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // You can define admin based on email
      if (role === 'admin' && user.email === 'admin@example.com') {
        navigate('/AdminDashboard');
      } else if (role === 'user') {
        navigate('/Userdashboard');
      } else {
        alert('🚫 Invalid credentials for selected role.');
      }

    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        alert('⚠️ You must sign up first.');
      } else if (error.code === 'auth/wrong-password') {
        alert('❌ Incorrect password.');
      } else {
        alert('Login failed: ' + error.message);
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

        <button type="submit" onClick={(e) => handleLogin(e, 'user')}>
          Login as User
        </button>
        <button type="submit" onClick={(e) => handleLogin(e, 'admin')}>
          Login as Admin
        </button>
      </form>
    </div>
  );
};

export default Login;
