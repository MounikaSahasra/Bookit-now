import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Userdashboard.css'; // Ensure unavailable-tile class is included

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

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleDateChange = (date) => {
    const isUnavailable = unavailableDates.some(d => isSameDay(d, date));
    if (isUnavailable) {
      alert("This date is unavailable. Please choose another one.");
    } else {
      setSelectedDate(date);
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={({ date }) =>
          unavailableDates.some(d => isSameDay(d, date)) ? 'unavailable-tile' : ''
        }
      />
    </div>
  );
};

export default AppointmentCalendar;
