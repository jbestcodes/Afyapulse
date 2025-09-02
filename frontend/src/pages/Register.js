import React, { useState } from 'react';
import api from '../utils/api'; // <-- use your configured axios instance
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/auth/register', { name, email, password, phone });
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="mb-2 w-full p-2 border rounded" required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="mb-2 w-full p-2 border rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="mb-2 w-full p-2 border rounded" required />
        <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className="mb-2 w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Register</button>
        <div className="mt-2 text-sm">Already have an account? <a href="/login" className="text-blue-600">Login</a></div>
      </form>
    </div>
  );
}
