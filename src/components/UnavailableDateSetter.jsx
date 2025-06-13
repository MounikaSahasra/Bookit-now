import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const UnavailableDateSetter = () => {
  const [unavailableDate, setUnavailableDate] = useState(new Date());

  const markUnavailable = () => {
    alert(`Marked ${unavailableDate.toDateString()} as unavailable`);
    // Send to backend
  };

  return (
    <div className="unavailable-date-setter">
      <h3>Mark Unavailable Days</h3>
      <Calendar
        onChange={setUnavailableDate}
        value={unavailableDate}
      />
      <button onClick={markUnavailable} className="mark-unavailable-btn">
        Mark as Unavailable
      </button>
    </div>
  );
};

export default UnavailableDateSetter;
