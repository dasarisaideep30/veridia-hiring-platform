// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function AdminDashboard() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await api.get('/admin/applications');
      setApps(res.data || []);
    } catch (err) {
      console.error('Admin fetch failed', err);
      setApps([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await api.post(`/admin/applications/${id}/status`, { status });
      alert('Status updated');
      // open email preview if backend returned one (dev)
      if (res.data?.emailPreviewUrl) window.open(res.data.emailPreviewUrl, '_blank');
      load();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      {loading ? <p>Loading...</p> : (
        <>
          {apps.length === 0 ? <p>No applications or you are not an admin.</p> : (
            <table>
              <thead>
                <tr><th>ID</th><th>Candidate</th><th>Position</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {apps.map(a => (
                  <tr key={a.id}>
                    <td style={{ wordBreak: 'break-word' }}>{a.id}</td>
                    <td>{a.candidate?.name}<br/><small>{a.candidate?.email}</small></td>
                    <td>{a.position}</td>
                    <td>{a.status}</td>
                    <td>
                      <button onClick={() => updateStatus(a.id, 'shortlisted')}>Shortlist</button>
                      <button onClick={() => updateStatus(a.id, 'rejected')}>Reject</button>
                      <button onClick={() => updateStatus(a.id, 'hired')}>Hire</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}