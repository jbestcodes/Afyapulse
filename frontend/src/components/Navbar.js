
import React from 'react';
import { Link } from 'react-router-dom';
import UserGreeting from './UserGreeting';

export default function Navbar() {
  const token = localStorage.getItem('token');
  return (
    <nav className="bg-blue-600 p-4 text-white flex flex-col md:flex-row md:justify-between md:items-center">
      <div className="font-bold text-lg mb-2 md:mb-0"><Link to="/">AfyaPulse</Link></div>
  {/* UserGreeting removed from Navbar */}
      <div>
        {token ? (
          <>
            <Link to="/" className="mr-4">Symptom Checker</Link>
            <Link to="/admin" className="mr-4">Admin</Link>
            <button onClick={() => { localStorage.removeItem('token'); window.location.reload(); }} className="bg-red-500 px-2 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
