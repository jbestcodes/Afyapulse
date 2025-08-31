
import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import UserGreeting from '../components/UserGreeting';
import Suggestions from '../components/Suggestions';
import ChatHistory from '../components/ChatHistory';


export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [reportId, setReportId] = useState('');
  const [firstAid, setFirstAid] = useState('');
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const handleAnalyze = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/symptom/analyze', { symptoms });
      setAiResult(res.data.aiResult);
      setFirstAid(res.data.firstAid);
      setReportId(res.data.reportId);
      setHistory(prev => [symptoms, ...prev]);
    } catch (err) {
      setError('Analysis failed. Please try again.');
    }
  };

  const handlePay = async () => {
    try {
      const token = localStorage.getItem('token');
      const phone = prompt('Enter your phone number for M-Pesa payment:');
      await api.post('/api/payment/mpesa', { reportId, phone }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Payment successful! You will receive a notification when your detailed report is ready.');
      navigate(`/report/${reportId}`);
    } catch (err) {
      setError('Payment failed.');
    }
  };

  const handleDeleteHistory = (idx) => {
    if (idx === 'all') setHistory([]);
    else setHistory(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Left column: Greeting and Suggestions */}
      <div className="md:w-1/3 flex flex-col items-start p-6">
        <div className="mb-4"><UserGreeting /></div>
        <Suggestions />
      </div>
      {/* Main column: Symptom Checker and Chat History */}
      <div className="flex-1 flex flex-col items-center justify-start p-6">
        <div className="flex flex-col items-center w-full max-w-lg">
          <form onSubmit={handleAnalyze} className="bg-white bg-opacity-95 p-8 rounded-xl shadow-lg border border-blue-200 w-full">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Symptom Checker</h2>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <textarea placeholder="Describe your symptoms..." value={symptoms} onChange={e => setSymptoms(e.target.value)} className="mb-2 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200" required />
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded mt-2 transition">Analyze</button>
          </form>
          {aiResult && (
            <div className="mt-4 bg-blue-50 bg-opacity-95 p-4 rounded shadow w-full border border-blue-200">
              <div className="font-semibold">AI Result:</div>
              <div>{aiResult}</div>
              {firstAid && (
                <div className="mt-2 text-green-700"><b>First Aid Suggestion:</b> {firstAid}</div>
              )}
              <button onClick={handlePay} className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded transition">Pay via M-Pesa for Detailed Report</button>
            </div>
          )}
          <div className="w-full">
            {history.length === 0 ? (
              <div className="bg-white bg-opacity-80 rounded shadow p-4 mt-6 w-full text-center text-gray-500">
                No chat history yet. Your previous symptom checks will appear here.
              </div>
            ) : (
              <ChatHistory history={history} onDelete={handleDeleteHistory} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
