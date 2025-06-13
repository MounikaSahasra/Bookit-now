import React, { useState } from 'react';

const AppointmentRequestList = () => {
  const [requests, setRequests] = useState([
    { id: 1, user: "Praveena", date: "2024-12-24", time: "10:00 AM", reason: "Project discussion", status: "Pending" },
    { id: 2, user: "Aakash", date: "2024-12-25", time: "02:00 PM", reason: "Placement Query", status: "Pending" }
  ]);

  const handleDecision = (id, decision) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: decision } : req
    );
    setRequests(updated);
  };

  return (
    <div className="appointment-request-list">
      <h3>Appointment Requests</h3>
      <ul>
        {requests.map((req) => (
          <li key={req.id} className="request-item">
            <div>
              <strong>{req.user}</strong> requested for {req.date} at {req.time}
              <br />
              Reason: {req.reason}
              <br />
              Status: <span className={`status ${req.status.toLowerCase()}`}>{req.status}</span>
            </div>
            {req.status === 'Pending' && (
              <div className="action-buttons">
                <button onClick={() => handleDecision(req.id, 'Approved')} className="approve-btn">Approve</button>
                <button onClick={() => handleDecision(req.id, 'Rejected')} className="reject-btn">Reject</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentRequestList;
