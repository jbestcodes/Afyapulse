import React from 'react';

export default function Suggestions() {
  return (
    <div className="bg-pink-100 border-l-4 border-pink-400 text-pink-800 p-4 mb-4 rounded shadow w-80">
      <div className="font-semibold mb-1">Suggestions:</div>
      <ul className="list-disc ml-5 text-sm">
        <li>Be as specific as possible about your symptoms.</li>
        <li>Mention duration, severity, and any triggers.</li>
        <li>Include relevant medical history if any.</li>
        <li>Describe any recent travel or exposure.</li>
        <li>For urgent symptoms (chest pain, severe bleeding, etc.), seek emergency care immediately.</li>
      </ul>
    </div>
  );
}
