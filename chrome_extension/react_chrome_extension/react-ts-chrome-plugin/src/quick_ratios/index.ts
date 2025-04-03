import { MAX_QUICK_RATIOS, METRICS_CONFIG } from '../constants';
import storage from '../lib/storage';
import { MetricConfig } from '../types/types';
import { manageCheckboxSelection, deselectAllCheckboxes } from './helper';

class QuickRatiosManager {
  private config: MetricConfig[];

  constructor() {
    this.config = [];
    this.init();
  }

  async init() {
    this.config = await this.loadConfig();
    await this.updateCheckboxSelections();
  }

  async loadConfig(): Promise<MetricConfig[]> {
    return await storage.get(METRICS_CONFIG) || [];
  }

  async updateCheckboxSelections() {
    const metricNames = this.config.map(metric => metric.name);
    if (metricNames.length > 0) {
      const maxRatios = await storage.get(MAX_QUICK_RATIOS) || "18";
      console.log("maxRatios : ", maxRatios);
      await manageCheckboxSelection(metricNames, parseInt(maxRatios, 10));
    }
  }
}

// NOT REQUIRED : Initialize when DOM is ready
// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM Content Loaded - Initializing QuickRatiosManager');
//     new QuickRatiosManager();
// });

// Listen for configuration updates
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('select quick ratios using QuickRatiosManager', message);

  if (message.type === 'SELECT_QUICK_RATIOS') {
    console.log('select quick ratios using QuickRatiosManager');
    new QuickRatiosManager();
  } else if (message.type === 'CLEAR_QUICK_RATIOS') {
    deselectAllCheckboxes();
  }
});

// NOT REQUIRED Observe DOM changes for dynamic content
// const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//         if (mutation.addedNodes.length) {
//             new QuickRatiosManager();
//         }
//     });
// });

// observer.observe(document.body, {
//   childList: true,
//   subtree: true
// });