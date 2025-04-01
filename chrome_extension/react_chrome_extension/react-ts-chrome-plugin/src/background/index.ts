import { METRICS_CONFIG } from '../constants';
import { MetricConfig } from '../react/components/types';
import storage from '../lib/storage';

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
});