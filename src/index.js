import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserDashboard from './components/Userdashboard';
import AdminDashboard from './components/AdminDashboard';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    
    {/* <UserDashboard />
    <AdminDashboard /> */}
  </React.StrictMode>
);
