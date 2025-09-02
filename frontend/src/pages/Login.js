import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/api/auth/login', { email, password });
      // Save token and user info
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.name);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">
      <form
        onSubmit={handleLogin}
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Login</h2>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded pr-10"
          />
          <span
            className="absolute right-3 top-2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white p-2 rounded mb-2 transition-all duration-200
            ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700 hover:scale-105'}`}
          disabled={loading}
        >
          {loading ? (
            <span>
              <svg className="inline mr-2 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z" />
              </svg>
              Logging in...
            </span>
          ) : (
            'Log In'
          )}
        </button>
        <button
          type="button"
          className="w-full bg-gray-200 text-blue-700 p-2 rounded hover:bg-gray-300"
          onClick={() => navigate('/reset-password')}
        >
          Forgot Password?
        </button>
      </form>
    </div>
  );
}
