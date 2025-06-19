import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // External calendar styles

import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

import '../Styles/UserDashboard.css'; // ✅ Corrected path & casing

const AppointmentCalendar = ({ selectedDate, setSelectedDate }) => {
  const [unavailableDates, setUnavailableDates] = useState([]);

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'unavailableDates'));
        const dates = snapshot.docs.map(doc => new Date(doc.data().date));
        setUnavailableDates(dates);
      } catch (error) {
        console.error("Error fetching unavailable dates:", error);
      }
    };

    fetchUnavailableDates();
  }, []);

  const isSameDay = (d1, d2) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  const handleDateChange = (date) => {
    if (unavailableDates.some(d => isSameDay(d, date))) {
      alert("❌ This date is unavailable.");
    } else {
      setSelectedDate(date);
    }
  };

  return (
    <Calendar
      onChange={handleDateChange}
      value={selectedDate}
      tileClassName={({ date }) =>
        unavailableDates.some(d => isSameDay(d, date)) ? 'unavailable-tile' : ''
      }
    />
  );
};

export default AppointmentCalendar;
