import React, { useState } from 'react';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    // Call backend API to send reset link/code
    setMessage('If your email is registered, you will receive reset instructions.');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Reset Password</h2>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          onClick={handleReset}
        >
          Send Reset Instructions
        </button>
        {message && <div className="text-green-600 mt-4">{message}</div>}
      </div>
    </div>
  );
}