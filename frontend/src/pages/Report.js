import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Report() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/symptom/report/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReport(res.data);
      } catch (err) {
        setError('Failed to fetch report.');
      }
    };
    fetchReport();
  }, [id]);

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!report) return <div className="p-4">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Your Report</h2>
        <div><b>Symptoms:</b> {report.symptoms}</div>
        <div className="mt-2"><b>AI Result:</b> {report.aiResult}</div>
        {report.paid && report.detailedReport && (
          <div className="mt-2"><b>Detailed Report:</b> {report.detailedReport}</div>
        )}
        {!report.paid && (
          <div className="mt-2 text-yellow-600">Pay to unlock detailed report.</div>
        )}
      </div>
    </div>
  );
}
