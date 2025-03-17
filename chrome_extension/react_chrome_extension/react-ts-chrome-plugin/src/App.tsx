import { useState, useEffect } from 'react';
import storage from './lib/storage'

const CONFIGS = "configs"
function App() {
  const [username, setUsername] = useState('');
  const [theme, setTheme] = useState('light');

  // Load settings when the component mounts
  useEffect(() => {
    (async () => {
      const configs = await storage.get(CONFIGS)
      if (configs && configs['username'])
        setUsername(configs['username'])
      if (configs && configs['theme'])
        setTheme(configs['theme']);
    })();
  }, []);

  // Save settings to Chrome storage
  const saveSettings = () => {
    storage.set(CONFIGS, { "username": username, "theme": theme })
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Extension Settings</h1>
      <div className="mb-3">
        <label className="block mb-1">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Theme:</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <button
        onClick={saveSettings}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
}

export default App;
