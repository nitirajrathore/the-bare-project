import { useState, useEffect } from 'react';
import storage from '../../lib/storage';
import PresetSelector from './PresetSelector';
import QuickRatiosSettings from './QuickRatiosSettings';
import { MetricConfig, TimeseriesMetricConfig } from '../../types/types';
import { METRICS_CONFIG, TIMESERIES_CONFIG } from '../../constants';
import { Button } from './ui/button';
import StyleSettings from './StyleSettings';
import MetricSettingTabs from './MetricSettingTabs';

function App() {
  const [metrics, setMetrics] = useState<MetricConfig[]>([]);
  const [timeseriesMetrics, setTimeseriesMetrics] = useState<TimeseriesMetricConfig[]>([]);
  const [isQuickRatiosPage, setIsQuickRatiosPage] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
      const [metricsConfig, timeseriesConfig] = await Promise.all([
        storage.get(METRICS_CONFIG),
        storage.get(TIMESERIES_CONFIG)
      ]);

      if (metricsConfig) {
        setMetrics(metricsConfig);
      }
      if (timeseriesConfig) {
        setTimeseriesMetrics(timeseriesConfig);
      }
    })();
  }, []);

  // Save settings to Chrome storage and notify content script
  const saveSettings = async () => {
    setIsSaving(true);

    await Promise.all([
      storage.set(METRICS_CONFIG, metrics),
      storage.set(TIMESERIES_CONFIG, timeseriesMetrics)
    ]);

    // Send message to all tabs with screener.in URL
    const tabs = await chrome.tabs.query({ url: 'https://www.screener.in/*' });
    tabs.forEach(tab => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, { type: 'CONFIG_UPDATED' });
      }
    });

    // Show success notification
    setShowSaveSuccess(true);

    // Hide after 3 seconds
    setTimeout(() => {
      setShowSaveSuccess(false);
    }, 3000);

    // Reset button text after 2 seconds
    setTimeout(() => {
      setIsSaving(false);
    }, 2000);
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

  // Handle timeseries metrics changes
  const handleTimeseriesMetricsChange = (updatedMetrics: TimeseriesMetricConfig[]) => {
    setTimeseriesMetrics(updatedMetrics);
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
            <div className="flex items-center">
              <Button
                onClick={saveSettings}
                size="sm"
                disabled={isSaving}
                className={`${isSaving
                  ? 'bg-green-500 hover:bg-green-500'
                  : 'bg-blue-500 hover:bg-blue-600'
                  } text-white min-w-[100px] text-center`}
              >
                {isSaving ? 'Saved' : 'Save Settings'}
              </Button>
              <StyleSettings />
            </div>
          </div>

          <MetricSettingTabs
            metrics={metrics}
            onMetricsChange={handleMetricsChange}
            timeseriesMetrics={timeseriesMetrics}
            onTimeseriesMetricsChange={handleTimeseriesMetricsChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
