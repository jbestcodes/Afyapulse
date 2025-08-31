import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, reports: 0 });
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/admin/usage', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        setError('Failed to fetch stats.');
      }
    };
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/admin/payments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPayments(res.data);
      } catch (err) {
        setError('Failed to fetch payments.');
      }
    };
    fetchStats();
    fetchPayments();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div><b>Total Users:</b> {stats.users}</div>
        <div><b>Total Reports:</b> {stats.reports}</div>
        <div className="mt-4">
          <b>Payments:</b>
          <ul className="list-disc ml-5">
            {payments.map((p, i) => (
              <li key={i}>{p.user?.name} ({p.user?.email}) - {p.createdAt?.slice(0,10)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
