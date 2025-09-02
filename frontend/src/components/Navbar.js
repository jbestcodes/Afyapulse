import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-blue-700 font-bold text-xl hover:text-pink-600 transition-all">Home</Link>
        <Link to="/symptom-checker" className="text-gray-700 hover:text-blue-600 transition-all">Analyzer</Link>
        <Link to="/report/1" className="text-gray-700 hover:text-blue-600 transition-all">Report</Link>
        <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition-all">Admin</Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/login" className="text-blue-600 hover:text-pink-600 transition-all">Login</Link>
        <Link to="/register" className="text-blue-600 hover:text-pink-600 transition-all">Register</Link>
      </div>
    </nav>
  );
}
