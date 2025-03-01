'use client';

import { useChat } from '@ai-sdk/react';
import Spinner from '@/components/spinner';
import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';


export default function Page() {
  const { messages, setMessages, input, handleInputChange, handleSubmit, status, stop, error, reload } =
    useChat({
      streamProtocol: 'data',
      api: '/api/custom-chat',
      onFinish: (message, { usage, finishReason }) => {
        console.log('Finished streaming message:', message);
        console.log('Token usage:', usage);
        console.log('Finish reason:', finishReason);
      },
      onError: error => {
        console.error('An error occurred:', error);
      },
      onResponse: response => {
        console.log('Received HTTP response from server:', response);
      },
    });

  const [localError, setLocalError] = useState(error);

  useEffect(() => {
    setLocalError(error);
  }, [error]);

  const handleDelete = (id) => {
    setMessages(messages.filter(message => message.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-purple-300 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {messages.map(message => (
          <div key={message.id} className="relative mb-2 p-2 rounded-md bg-white dark:bg-gray-800">
            <span className="font-bold">{message.role === 'user' ? 'User: ' : 'AI: '}</span>
            {message.content}
            {/* <div className="text-xs text-gray-500 dark:text-gray-400">
              {JSON.stringify(message, null, 2)}
            </div> */}
            <button
              onClick={() => handleDelete(message.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>

          </div>
        ))}

        {(status === 'submitted' || status === 'streaming') && (
          <div className="flex flex-col items-end mt-4">
            {status === 'submitted' && <Spinner />}
            <button
              type="button"
              onClick={() => stop()}
              className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-purple-500 dark:hover:bg-purple-600"
            >
              Stop
            </button>
          </div>
        )}

        {localError && (
          <div className="flex flex-col items-center mt-4">
            <div className="text-red-500 mb-2">{localError.message}</div>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => reload()}
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-purple-500 dark:hover:bg-purple-600"
              >
                Retry
              </button>
              <button
                type="button"
                onClick={() => setLocalError(undefined)}
                className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <form onSubmit={(event) => {
          handleSubmit(event, {
            body: {
              customKey: 'customValue',
            }
          })
        }} className="mt-4 flex flex-col items-center">
          <Input
            name="prompt"
            value={input}
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <Button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-purple-500 dark:hover:bg-purple-600"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}