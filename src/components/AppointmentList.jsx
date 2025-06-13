import React from 'react';

const AppointmentList = () => {
  // Example hardcoded data
  const confirmedAppointments = [
    { date: '2024-12-24', time: '10:00 AM', status: 'Confirmed' },
  ];

  return (
    <div className="appointment-list">
      <h3>Your Scheduled Appointments</h3>
      <ul>
        {confirmedAppointments.map((apt, i) => (
          <li key={i}>
            📅 {apt.date} | ⏰ {apt.time} | ✅ {apt.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
