import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-blue-700 font-bold text-xl hover:text-pink-600 transition-all">Home</Link>
        <Link
          to="/symptom-checker"
          className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-2 rounded-xl shadow hover:scale-105 hover:from-blue-600 hover:to-pink-600 transition-all duration-200 font-semibold"
        >
          Analyzer
        </Link>
        {isLoggedIn && (
          <Link to="/report/1" className="text-gray-700 hover:text-blue-600 transition-all">
            Report
          </Link>
        )}
        {/* Admin link removed */}
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/login" className="text-blue-600 hover:text-pink-600 transition-all">Login</Link>
        <Link to="/register" className="text-blue-600 hover:text-pink-600 transition-all">Register</Link>
      </div>
    </nav>
  );
}
