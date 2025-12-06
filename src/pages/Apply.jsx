// src/pages/Apply.jsx
import React, { useState } from 'react';
import api from '../api/api';

export default function Apply() {
  const [form, setForm] = useState({ position: '', resumeUrl: '', coverLetter: '', answers: '' });
  const [previewLink, setPreviewLink] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/applications/submit', {
        position: form.position,
        resumeUrl: form.resumeUrl,
        coverLetter: form.coverLetter,
        answers: { text: form.answers }
      });
      setPreviewLink(res.data?.emailPreviewUrl || null);
      alert('Application submitted');
      setForm({ position: '', resumeUrl: '', coverLetter: '', answers: '' });
    } catch (err) {
      alert(err?.response?.data?.message || 'Submit failed');
    }
  };

  return (
    <div className="container">
      <h2>Application Form</h2>
      <form onSubmit={submit}>
        <input placeholder="Position" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} />
        <input placeholder="Resume URL (optional)" value={form.resumeUrl} onChange={e => setForm({ ...form, resumeUrl: e.target.value })} />
        <textarea placeholder="Cover letter (optional)" value={form.coverLetter} onChange={e => setForm({ ...form, coverLetter: e.target.value })} />
        <textarea placeholder="Why do you want this role?" value={form.answers} onChange={e => setForm({ ...form, answers: e.target.value })} />
        <button type="submit">Submit</button>
      </form>

      {previewLink && (
        <p style={{ marginTop: 12 }}>
          Email preview (dev): <a href={previewLink} target="_blank" rel="noreferrer">Open</a>
        </p>
      )}
    </div>
  );
}