import { useState, useEffect } from 'react';
import storage from '../../lib/storage';
import { MAX_QUICK_RATIOS } from '../../constants';

const QuickRatiosSettings = () => {
  const [maxQuickRatios, setMaxQuickRatios] = useState<number>(18);

  useEffect(() => {
    const loadMaxRatios = async () => {
      const savedMaxRatios = await storage.get(MAX_QUICK_RATIOS);
      if (savedMaxRatios) {
        setMaxQuickRatios(savedMaxRatios);
      }
    };
    loadMaxRatios();
  }, []);

  const handleAutoSelect = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = tabs[0];
    if (currentTab.id) {
      chrome.tabs.sendMessage(currentTab.id, { type: 'SELECT_QUICK_RATIOS' });
    }
  };

  const handleClearAll = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = tabs[0];
    if (currentTab.id) {
      chrome.tabs.sendMessage(currentTab.id, { type: 'CLEAR_QUICK_RATIOS' });
    }
  };

  const handleMaxRatiosChange = async (value: number) => {
    setMaxQuickRatios(value);
    await storage.set(MAX_QUICK_RATIOS, value);
  };

  return (
    <div className="mb-6 bg-white p-4 rounded-md shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Quick Ratios Settings</h2>
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={handleAutoSelect}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Auto-Select Quick Ratios
          </button>
          <button
            onClick={handleClearAll}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Clear All Ratios
          </button>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">
            Max Quick Ratios:
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={maxQuickRatios}
            onChange={(e) => handleMaxRatiosChange(parseInt(e.target.value))}
            className="w-20 px-2 py-1 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default QuickRatiosSettings;