import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AppointmentCalendar = ({ selectedDate, setSelectedDate }) => {
  return (
    <div className="calendar-container">
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={({ date, view }) => {
          // You can mark special days here if needed
          return '';
        }}
      />
    </div>
  );
};

export default AppointmentCalendar;
