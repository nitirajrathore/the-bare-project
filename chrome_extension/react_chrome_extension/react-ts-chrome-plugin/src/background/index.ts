import { METRICS_CONFIG } from '../constants';
import { MetricConfig } from '../types/types';
import { Preset } from '../react/components/PresetSelector';
import { loadPresets } from '../utils/utils';
import storage from '../lib/storage';

const presets = loadPresets();
// Key for storing presets
const CONFIG_PRESETS_KEY = 'config-presets';

chrome.runtime.onInstalled.addListener(async () => {
  console.log('Extension installed - Setting up default config');

  // Get first preset as default configuration
  const firstPresetName = Object.keys(presets)[0];
  const defaultConfig: MetricConfig[] = presets[firstPresetName] || [];

  await storage.set(METRICS_CONFIG, defaultConfig);
  console.log('Default configuration saved:', firstPresetName);

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
