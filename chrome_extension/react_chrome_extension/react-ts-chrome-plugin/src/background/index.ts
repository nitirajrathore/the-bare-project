import { METRICS_CONFIG } from '../constants';
import { MetricConfig } from '../react/components/types';
import { Preset } from '../react/components/PresetSelector';
import { presets } from '../resources/presets';
import storage from '../lib/storage';

// Key for storing presets
const CONFIG_PRESETS_KEY = 'config-presets';

chrome.runtime.onInstalled.addListener(async () => {
  console.log('Extension installed - Setting up default config');

  // Initialize default configuration
  const defaultConfig: MetricConfig[] = [
    {
      id: 'market-cap',
      name: 'Market Cap',
      conditions: [
        { id: '1', operator: '<', value: 1000, color: '#ffcdd2' },
        { id: '2', operator: '<', value: 10000, color: '#c8e6c9' },
        { id: '3', operator: '>=', value: 10000, color: '#bbdefb' }
      ],
      isExpanded: false
    }
  ];

  await storage.set(METRICS_CONFIG, defaultConfig);
  console.log('Default configuration saved');
  
  // Initialize presets from presets.js
  const defaultPresets: Preset[] = [];
  
  // Convert presets from presets.js to the format we need
  for (const [presetName, metricsArray] of Object.entries(presets)) {
    defaultPresets.push({
      name: presetName,
      metrics: metricsArray as MetricConfig[]
    });
  }
  
  await storage.set(CONFIG_PRESETS_KEY, defaultPresets);
  console.log('Default presets saved');
});
