import { useState, useEffect } from 'react';
import storage from './lib/storage';
import MetricsColorSelector from './components/MetricsColorSelector';
import { MetricConfig } from './components/types';

const CONFIGS = "configs";
const METRICS_CONFIG = "metrics_config";
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

  // Save settings to Chrome storage
  const saveSettings = () => {
    storage.set(METRICS_CONFIG, metrics);
  };

  // Handle metrics changes
  const handleMetricsChange = (updatedMetrics: MetricConfig[]) => {
    setMetrics(updatedMetrics);
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Extension Settings</h1>

      <div className="mb-6 space-y-4">
        <div className="bg-white p-4 rounded-md shadow-sm min-w-[480px] max-w-[800px] mx-auto">
          <MetricsColorSelector
            metrics={metrics}
            onMetricsChange={handleMetricsChange}
          />
        </div>
      </div>

      <button
        onClick={saveSettings}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Save All Settings
      </button>
    </div>
  );
}

export default App;
