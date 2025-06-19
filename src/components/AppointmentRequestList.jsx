import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  onSnapshot,
  updateDoc,
  doc
} from 'firebase/firestore';

const AppointmentRequestList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'appointments'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(data);
    });

    return () => unsubscribe(); // ✅ Clean up real-time listener
  }, []);

  const handleDecision = async (id, decision) => {
    try {
      const ref = doc(db, 'appointments', id);
      await updateDoc(ref, { status: decision });
      alert(`✅ Appointment ${decision}`);
    } catch (err) {
      console.error('Error updating status:', err);
      alert('❌ Failed to update appointment status');
    }
  };

  return (
    <div className="appointment-request-list" style={{ padding: '1rem' }}>
      <h3>Appointment Requests</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {requests.map((req) => (
          <li key={req.id} className="request-item" style={{
            background: '#f8f8f8',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div>
              <strong>{req.email}</strong> requested for <b>{req.date}</b> at <b>{req.time}</b><br />
              Reason: {req.reason || req.service || '—'}<br />
              Status: <span className={`status ${req.status?.toLowerCase() || 'pending'}`}>
                {req.status || 'pending'}
              </span>
            </div>

            {req.status === 'pending' && (
              <div className="action-buttons" style={{ marginTop: '0.5rem' }}>
                <button
                  onClick={() => handleDecision(req.id, 'approved')}
                  className="approve-btn"
                  style={{
                    marginRight: '0.5rem',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '4px'
                  }}
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => handleDecision(req.id, 'rejected')}
                  className="reject-btn"
                  style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '4px'
                  }}
                >
                  ❌ Reject
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentRequestList;
