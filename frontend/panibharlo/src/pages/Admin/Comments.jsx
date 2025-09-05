// src/pages/Admin/Comments.jsx (Moved from src/pages/User/Comments.jsx)
import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function Comments() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data } = await api.get('/contact');
        setSubmissions(data);
      } catch (err) {
        setError('Failed to load submissions.');
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []); // The dependency array was missing here

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Contact Form Submissions</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {submissions.map((sub) => (
          <div key={sub._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{sub.name}</h3>
              <a href={`mailto:${sub.email}`} className="text-sm text-blue-600">{sub.email}</a>
            </div>
            <p className="font-medium text-gray-800 mb-2">{sub.subject}</p>
            <p className="text-gray-700 mb-2">{sub.message}</p>
            <p className="text-xs text-gray-500 text-right">
              Received on: {new Date(sub.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}