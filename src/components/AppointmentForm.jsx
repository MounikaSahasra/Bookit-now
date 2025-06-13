import React, { useState } from 'react';
import AppointmentCalendar from './AppointmentCalendar';
import './Userdashboard.css';

const AppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');

  const timeSlots = {
    morning: ['9:00 AM', '9:30 AM', '10:00 AM', '11:00 AM'],
    afternoon: ['1:00 PM', '2:00 PM', '3:00 PM'],
    evening: ['4:00 PM', '5:00 PM', '6:00 PM'],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ selectedDate, selectedTime, reason });
    alert("Appointment Requested!");
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <AppointmentCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="time-selection">
        <div>
          <h4>Morning:</h4>
          {timeSlots.morning.map((time) => (
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

        <div>
          <h4>Afternoon:</h4>
          {timeSlots.afternoon.map((time) => (
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

        <div>
          <h4>Evening:</h4>
          {timeSlots.evening.map((time) => (
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
      </div>

      <textarea
        placeholder="Enter your reason for appointment..."
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        required
      ></textarea>

      <div className="form-buttons">
        <button type="submit" className="submit-btn">Save</button>
      </div>
    </form>
  );
};

export default AppointmentForm;
