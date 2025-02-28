'use client';

import { useChat } from '@ai-sdk/react';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({});

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-purple-300 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {messages.map(message => (
          <div key={message.id} className="mb-2 p-2 rounded-md bg-white dark:bg-gray-800">
            <span className="font-bold">{message.role === 'user' ? 'User: ' : 'AI: '}</span>
            {message.content}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-center">
          <input
            name="prompt"
            value={input}
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-purple-500 dark:hover:bg-purple-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}