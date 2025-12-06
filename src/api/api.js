// src/api/api.js
import axios from 'axios';

const API_BASE = 'http://localhost:4000/api'; // change if backend runs elsewhere

const api = axios.create({
  baseURL: API_BASE,
});

// set or remove Authorization header easily
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

export default api;