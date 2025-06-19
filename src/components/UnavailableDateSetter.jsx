import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import {
  deleteDoc,
  doc,
  collection,
  addDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore';

import { db } from '../firebase';
import '../Styles/UserDashboard.css'; // ✅ Ensure this exists and includes .unavailable-tile etc.

const UnavailableDateSetter = () => {
  const [unavailableDate, setUnavailableDate] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);

  // Fetch unavailable dates on mount
  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'unavailableDates'));
        const dates = snapshot.docs.map(doc => new Date(doc.data().date));
        setUnavailableDates(dates);
      } catch (error) {
        console.error('❌ Failed to load unavailable dates:', error);
      }
    };

    fetchUnavailableDates();
  }, []);

  // Mark a date as unavailable
  const markUnavailable = async () => {
    const selected = unavailableDate.toDateString();

    try {
      const q = query(
        collection(db, 'unavailableDates'),
        where('date', '==', selected)
      );
      const existing = await getDocs(q);

      if (!existing.empty) {
        alert(`❌ ${selected} is already marked as unavailable.`);
        return;
      }

      await addDoc(collection(db, 'unavailableDates'), {
        date: selected,
        createdAt: new Date()
      });

      setUnavailableDates(prev => [...prev, new Date(selected)]);
      alert(`✅ Marked ${selected} as unavailable`);
    } catch (error) {
      console.error('❌ Error marking date:', error);
      alert('❌ Failed to mark unavailable date');
    }
  };

  // Undo unavailable mark
  const undoMarkUnavailable = async () => {
    const selected = unavailableDate.toDateString();

    try {
      const q = query(
        collection(db, 'unavailableDates'),
        where('date', '==', selected)
      );
      const existing = await getDocs(q);

      if (existing.empty) {
        alert(`ℹ️ ${selected} is not marked as unavailable.`);
        return;
      }

      const docId = existing.docs[0].id;
      await deleteDoc(doc(db, 'unavailableDates', docId));

      setUnavailableDates(prev =>
        prev.filter(d => d.toDateString() !== selected)
      );

      alert(`🗑️ Removed unavailable mark from ${selected}`);
    } catch (error) {
      console.error('❌ Error removing unavailable date:', error);
      alert('❌ Failed to remove unavailable mark.');
    }
  };

  return (
    <div className="unavailable-date-setter">
      <h3>Mark Unavailable Days</h3>

      <Calendar
        onChange={setUnavailableDate}
        value={unavailableDate}
        tileClassName={({ date, view }) =>
          view === 'month' &&
          unavailableDates.some(d => d.toDateString() === date.toDateString())
            ? 'unavailable-tile'
            : null
        }
      />

      <div style={{ marginTop: '1rem' }}>
        <button onClick={markUnavailable} className="mark-unavailable-btn">
          Mark as Unavailable
        </button>
        <button
          onClick={undoMarkUnavailable}
          className="undo-unavailable-btn"
          style={{ marginLeft: '10px' }}
        >
          Undo Mark
        </button>
      </div>
    </div>
  );
};

export default UnavailableDateSetter;
