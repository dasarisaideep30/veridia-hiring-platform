// src/pages/MyApplications.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function MyApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/applications/my')
      .then(res => setApps(res.data || []))
      .catch(err => {
        console.error('Failed to load apps', err);
        setApps([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h2>My Applications</h2>
      {loading ? <p>Loading...</p> : (
        apps.length === 0 ? <p>No applications yet.</p> : (
          <table>
            <thead>
              <tr><th>Position</th><th>Status</th><th>Submitted At</th></tr>
            </thead>
            <tbody>
              {apps.map(a => (
                <tr key={a.id}>
                  <td>{a.position}</td>
                  <td>{a.status}</td>
                  <td>{new Date(a.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
}