import React,{ useState, useEffect } from 'react';
import AppointmentCalendar from './AppointmentCalendar';
import './Userdashboard.css';

import { db, auth } from './firebase';
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  // query,
  // where
} from 'firebase/firestore';

const AppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [unavailableDates, setUnavailableDates] = useState([]);

  const timeSlots = {
    morning: ['9:00 AM', '9:30 AM', '10:00 AM', '11:00 AM'],
    afternoon: ['1:00 PM', '2:00 PM', '3:00 PM'],
    evening: ['4:00 PM', '5:00 PM', '6:00 PM'],
  };

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      const snapshot = await getDocs(collection(db, 'unavailableDates'));
      const dates = snapshot.docs.map((doc) => new Date(doc.data().date));
      setUnavailableDates(dates);
    };
    fetchUnavailableDates();
  }, []);

  const isDateUnavailable = (date) => {
    return unavailableDates.some(
      (d) =>
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("⚠️ You must be logged in to book an appointment.");
      return;
    }

    if (!selectedTime || !reason) {
      alert("❗ Please select a time and enter a reason.");
      return;
    }

    if (isDateUnavailable(selectedDate)) {
      alert("❌ This date is unavailable. Please choose another date.");
      return;
    }

    try {
      await addDoc(collection(db, "appointments"), {
        uid: user.uid,
        email: user.email,
        date: selectedDate.toDateString(),
        time: selectedTime,
        reason: reason,
        status: "pending",
        createdAt: Timestamp.now()
      });

      alert("✅ Appointment requested successfully!");
      setSelectedTime('');
      setReason('');
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert("❌ Failed to save appointment. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <AppointmentCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="time-selection">
        {Object.entries(timeSlots).map(([period, times]) => (
          <div key={period}>
            <h4>{period.charAt(0).toUpperCase() + period.slice(1)}:</h4>
            {times.map((time) => (
              <button
                key={time}
                type="button"
                className={`time-btn ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        ))}
      </div>

      <textarea
        placeholder="Enter your reason for appointment..."
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        required
      />

      <div className="form-buttons">
        <button type="submit" className="submit-btn">Save</button>
      </div>
    </form>
  );
};

export default AppointmentForm;
