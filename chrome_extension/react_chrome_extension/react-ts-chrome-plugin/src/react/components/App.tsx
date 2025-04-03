import { useState, useEffect } from 'react';
import storage from '../../lib/storage';
import MetricsColorSelector from './MetricsColorSelector';
import PresetSelector from './PresetSelector';
import { MetricConfig } from './types';
import { METRICS_CONFIG } from '../../constants'

// const CONFIGS = "configs";
function App() {
  const [metrics, setMetrics] = useState<MetricConfig[]>([]);

  // Load settings when the component mounts
  useEffect(() => {
    (async () => {
      const metricsConfig = await storage.get(METRICS_CONFIG);
      if (metricsConfig) {
        setMetrics(metricsConfig);
      }
    })();
  }, []);

  // Save settings to Chrome storage and notify content script
  const saveSettings = async () => {
    await storage.set(METRICS_CONFIG, metrics);

    // Send message to all tabs with screener.in URL
    const tabs = await chrome.tabs.query({ url: 'https://www.screener.in/*' });
    tabs.forEach(tab => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, { type: 'CONFIG_UPDATED' });
      }
    });
  };

  // Handle metrics changes
  const handleMetricsChange = (updatedMetrics: MetricConfig[]) => {
    setMetrics(updatedMetrics);
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100 text-gray-800">
      <div className="mb-6 space-y-4">
        <div className="bg-white p-4 rounded-md shadow-sm min-w-[480px] max-w-[800px] mx-auto">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold">Metric Configuration</h1>
            </div>
            <PresetSelector 
              metrics={metrics}
              onApplyPreset={handleMetricsChange}
            />
          </div>
          
          <MetricsColorSelector
            metrics={metrics}
            onMetricsChange={handleMetricsChange}
          />
          
          <button
            onClick={saveSettings}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
