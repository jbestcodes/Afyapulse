import React from 'react';

export default function ChatHistory({ chatHistory }) {
  // Default to empty array if chatHistory is undefined
  const history = chatHistory || [];

  return (
    <div>
      <h3 className="text-lg font-bold mb-2 text-blue-700">Chat History</h3>
      {history.length === 0 ? (
        <div className="text-gray-500">No chat history yet.</div>
      ) : (
        <ul className="space-y-2">
          {history.map((chat, i) => (
            <li key={i} className="border-b pb-2">
              <div className="font-semibold">Symptoms: {chat.symptoms}</div>
              <div>Result: {chat.result.aiResult}</div>
              <div>First Aid: {chat.result.firstAid}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
