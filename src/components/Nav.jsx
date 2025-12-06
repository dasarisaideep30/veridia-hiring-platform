// src/components/Nav.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    // remove header for axios (optional)
    window.location.href = '/';
  };

  return (
    <nav style={{ padding: 12, marginBottom: 12, background: '#fff', borderRadius: 8 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Link to="/">Home</Link>
        {!token ? (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/apply">Apply</Link>
            <Link to="/my">My Applications</Link>
            <Link to="/admin">Admin</Link>
            <button onClick={logout} style={{ marginLeft: 8 }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}