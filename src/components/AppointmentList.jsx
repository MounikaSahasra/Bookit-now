import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import '../Styles/appointmentList.css'; // ✅ Ensure file exists or comment this line

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const appointmentsRef = collection(db, 'appointments');

        // ✅ Query: Get appointments of this user and listen in real-time
        const q = query(appointmentsRef, where('userId', '==', user.uid));

        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const results = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAppointments(results);
          setLoading(false);
        });

        return () => unsubscribeSnapshot();
      } else {
        setAppointments([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="appointment-list">
      <h3>Your Scheduled Appointments</h3>
      {loading ? (
        <p>⏳ Loading...</p>
      ) : appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul>
          {appointments.map((apt) => (
            <li key={apt.id}>
              <strong>📅 {apt.date}</strong> at <strong>{apt.time}</strong><br />
              Service: {apt.service}<br />
              Status:{' '}
              <span className={`status ${apt.status}`}>
                {apt.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentList;
