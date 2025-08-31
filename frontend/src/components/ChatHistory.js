import React from 'react';

export default function ChatHistory({ history, onDelete }) {
  if (!history.length) return null;
  return (
    <div className="bg-white bg-opacity-80 rounded shadow p-4 mt-6 w-96">
      <div className="font-semibold mb-2">Chat History</div>
      <ul className="space-y-2">
        {history.map((item, idx) => (
          <li key={idx} className="flex justify-between items-center border-b pb-1">
            <span className="truncate max-w-xs">{item}</span>
            <button onClick={() => onDelete(idx)} className="ml-2 text-xs text-red-600 hover:underline">Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => onDelete('all')} className="mt-3 w-full bg-red-100 text-red-700 rounded p-1 text-xs hover:bg-red-200">Delete All</button>
    </div>
  );
}
