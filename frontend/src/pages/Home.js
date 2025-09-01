import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 mt-10">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Welcome to AfyaPulse</h1>
        <p className="mb-6 text-gray-700">
          AfyaPulse is your AI-powered health companion for Kenya. Analyze your symptoms, get possible conditions, receive first aid suggestions, and unlock detailed reports. Your health, your pulse, your peace of mind.
        </p>
        <a href="/symptom-checker" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Start Symptom Analysis
        </a>
      </div>
    </div>
  );
}