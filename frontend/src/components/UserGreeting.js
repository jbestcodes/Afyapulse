import React, { useEffect, useState } from 'react';
import api from '../utils/api';

export default function UserGreeting() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchGreeting() {
      try {
        const res = await api.get('/api/auth/hello');
        setMessage(res.data.message);
      } catch (err) {
        setMessage('');
      }
    }
    fetchGreeting();
  }, []);

  if (!message) return null;
  return (
    <div className="p-4 text-green-700 text-lg font-semibold flex items-center">
      {message}
    </div>
  );
}
