import axios from 'axios';

const api = axios.create({
  // Make sure this points to your backend server.
  // If you have a proxy in package.json, you can use a relative path like '/'.
  baseURL: 'http://localhost:5000', 
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;