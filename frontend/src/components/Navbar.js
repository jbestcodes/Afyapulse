import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
      setUserName(localStorage.getItem('userName'));
    };
    window.addEventListener('storage', handleStorage);
    handleStorage();
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/login');
  };

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
          <Link
            to="/report/1"
            className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-4 py-2 rounded-xl shadow hover:scale-105 hover:from-green-500 hover:to-blue-500 transition-all duration-200 font-semibold"
          >
            Report
          </Link>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <span className="text-blue-700 font-semibold">Hello, {userName || 'User'} 😊</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 hover:text-pink-600 transition-all">Login</Link>
            <Link to="/register" className="text-blue-600 hover:text-pink-600 transition-all">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
