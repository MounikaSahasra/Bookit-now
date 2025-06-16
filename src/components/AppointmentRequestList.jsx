import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import {
  collection,
  // getDocs,
  updateDoc,
  doc,
  onSnapshot
} from 'firebase/firestore';

const AppointmentRequestList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'appointments'), (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(fetched);
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  const handleDecision = async (id, decision) => {
    const ref = doc(db, 'appointments', id);
    await updateDoc(ref, { status: decision });
    alert(`Appointment ${decision}`);
  };

  return (
    <div className="appointment-request-list">
      <h3>Appointment Requests</h3>
      <ul>
        {requests.map((req) => (
          <li key={req.id} className="request-item">
            <div>
              <strong>{req.email}</strong> requested for {req.date} at {req.time}
              <br />
              Reason: {req.reason}
              <br />
              Status:{' '}
              <span className={`status ${req.status.toLowerCase()}`}>
                {req.status}
              </span>
            </div>
            {req.status === 'pending' && (
              <div className="action-buttons">
                <button
                  onClick={() => handleDecision(req.id, 'approved')}
                  className="approve-btn"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDecision(req.id, 'rejected')}
                  className="reject-btn"
                >
                  Reject
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
