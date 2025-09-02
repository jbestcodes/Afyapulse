import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import UserGreeting from '../components/UserGreeting';
import Suggestions from '../components/Suggestions';
import ChatHistory from '../components/ChatHistory';


export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [suggestions] = useState([
    "Describe your symptoms in detail.",
    "E.g. 'headache and fever', 'stomach pain', 'cough and sore throat'."
  ]);
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally fetch chat history from backend if logged in
  }, []);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) return;
    try {
      const res = await api.post('/api/symptom/analyze', { symptoms });
      setResult(res.data);
      setChatHistory(prev => [
        ...prev,
        { symptoms, result: res.data }
      ]);
      setSymptoms('');
    } catch {
      setResult({ error: 'Analysis failed. Please try again.' });
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
    if (idx === 'all') setChatHistory([]);
    else setChatHistory(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 pt-8">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Left: Suggestions & Chat History */}
        <div className="md:w-1/2 w-full flex flex-col">
          <div className="mb-4">
            <span className="text-lg font-semibold text-blue-700">
              Hello {userName || 'User'}, hope you are fine today <span role="img" aria-label="smile">😊</span>
            </span>
          </div>
          <Suggestions suggestions={suggestions} />
          <ChatHistory chatHistory={chatHistory} />
        </div>
        {/* Right: Analyzer Box */}
        <div className="md:w-1/2 w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-pink-200">
            <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">Symptom Analyzer</h2>
            <form onSubmit={handleAnalyze}>
              <input
                type="text"
                value={symptoms}
                onChange={e => setSymptoms(e.target.value)}
                placeholder="Enter your symptoms..."
                className="w-full p-2 border rounded mb-4"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white p-2 rounded-xl shadow hover:scale-105 hover:from-blue-600 hover:to-pink-600 transition-all duration-200 font-semibold"
              >
                Analyze
              </button>
            </form>
            {result && (
              <div className="mt-4 p-4 bg-blue-50 rounded">
                {result.error ? (
                  <span className="text-red-500">{result.error}</span>
                ) : (
                  <>
                    <div className="font-semibold text-blue-800">
                      Possible Condition: {result.aiResult || 'N/A'}
                    </div>
                    <div className="text-green-700">
                      First Aid: {result.firstAid || 'N/A'}
                    </div>
                    <button onClick={handlePay} className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded transition">Pay via M-Pesa for Detailed Report</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
