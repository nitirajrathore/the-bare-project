import { useState, useEffect } from 'react';
import storage from '../../lib/storage';
import MetricsColorSelector from './MetricsColorSelector';
import PresetSelector from './PresetSelector';
import QuickRatiosSettings from './QuickRatiosSettings';
import { MetricConfig } from '../../types/types';
import { METRICS_CONFIG } from '../../constants';
import { Button } from './ui/button';

function App() {
  const [metrics, setMetrics] = useState<MetricConfig[]>([]);
  const [isQuickRatiosPage, setIsQuickRatiosPage] = useState(false);

  // Check if current active tab is quick ratios page
  useEffect(() => {
    const checkCurrentTab = async () => {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const currentTab = tabs[0];
      console.log("checking the url of current tab", currentTab.url);
      setIsQuickRatiosPage(currentTab.url?.includes('screener.in/user/quick_ratios') || false);
    };
    checkCurrentTab();
  }, []);

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

  const handleQuickRatiosSelect = async () => {
    console.log("select quick ratios using App");
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = tabs[0];
    if (currentTab.id) {
      chrome.tabs.sendMessage(currentTab.id, { type: 'SELECT_QUICK_RATIOS' });
    }
  };

  // Handle metrics changes
  const handleMetricsChange = (updatedMetrics: MetricConfig[]) => {
    setMetrics(updatedMetrics);
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100 text-gray-800">
      <div className="mb-6 space-y-4">
        <div className="bg-white p-4 rounded-md shadow-sm min-w-[480px] max-w-[800px] mx-auto">
          {isQuickRatiosPage && <QuickRatiosSettings />}

          <div className="mb-4 flex items-center gap-8">
            <div className="flex-1">
              <PresetSelector
                metrics={metrics}
                onApplyPreset={handleMetricsChange}
              />
            </div>
            <Button
              onClick={saveSettings}
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Save Settings
            </Button>
          </div>

          <MetricsColorSelector
            metrics={metrics}
            onMetricsChange={handleMetricsChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
