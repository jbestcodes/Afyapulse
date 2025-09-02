import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl p-10 mt-10 border border-blue-200">
        <h1 className="text-4xl font-extrabold mb-4 text-blue-700 text-center">Hey, welcome to AfyaPulse! 👋</h1>
        <p className="mb-6 text-lg text-gray-700 text-center">
          AfyaPulse is an <span className="font-semibold text-blue-600">AI-powered symptom analyzer</span> for Kenya.<br />
          Enter your symptoms, get possible conditions, receive first aid suggestions, and unlock detailed reports.<br />
          <span className="font-semibold text-pink-600">If you want your chat history saved, you must log in.</span><br />
          <span className="font-semibold text-green-600">You get one free trial per day!</span>
        </p>
        <a
          href="/symptom-checker"
          className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:from-blue-600 hover:to-pink-600 transition-all duration-200 font-semibold"
        >
          Start Symptom Analysis
        </a>
      </div>
    </div>
  );
}