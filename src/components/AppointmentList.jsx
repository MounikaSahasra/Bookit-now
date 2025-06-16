import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from './firebase'; // Adjust path if needed

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in to view appointments.");
        return;
      }

      try {
        const q = query(
          collection(db, 'appointments'),
          where('uid', '==', user.uid)
        );

        const querySnapshot = await getDocs(q);
        const fetchedAppointments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAppointments(fetchedAppointments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        alert('Failed to load appointments.');
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="appointment-list">
      <h3>Your Scheduled Appointments</h3>

      {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((apt) => (
            <li key={apt.id}>
              📅 <strong>{apt.date}</strong> | ⏰ {apt.time} | 📝 {apt.reason} | 🔁 {apt.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentList;
