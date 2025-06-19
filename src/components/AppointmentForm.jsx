import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return alert('Please log in to book an appointment.');

    try {
      setLoading(true);
      await addDoc(collection(db, 'appointments'), {
        ...formData,
        userId: user.uid,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setSuccessMsg('✅ Appointment request sent! Await admin approval.');
      setFormData({ name: '', email: '', phone: '', date: '', time: '', service: '' });
    } catch (err) {
      alert('❌ Failed to book appointment: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointment-form">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name*
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email*
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Phone
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <label>
          Date*
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>
        <label>
          Time*
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        </label>
        <label>
          Service*
          <select name="service" value={formData.service} onChange={handleChange} required>
            <option value="">-- Select a service --</option>
            <option value="Consultation">Consultation</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Diagnosis">Diagnosis</option>
          </select>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Booking...' : 'Book Now'}
        </button>
      </form>
      {successMsg && <p style={{ color: 'green', marginTop: '1rem' }}>{successMsg}</p>}
    </div>
  );
};

export default AppointmentForm;
