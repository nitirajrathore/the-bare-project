import { METRICS_CONFIG } from '../constants';
import storage from '../lib/storage';
import { MetricConfig, Condition } from '../react/components/types';
import utils from '../utils/utils';

const METRIC_SELECTORS = {
    staticMetrics: '#top-ratios li.flex',
    quarterlyResults: '#quarters table tbody tr',
    yearlyResults: '#annual table tbody tr'
};

class ScreenerFormatter {
    private config: Record<string, MetricConfig>;

    constructor() {
        this.config = {} as Record<string, MetricConfig>;
        this.init();
        // console.log('ScreenerFormatter initialized');
    }

    async init() {
        console.log("content.js: trying to load configs.")
        this.config = await this.loadConfig();
        this.applyFormatting();
    }
    async loadConfig(): Promise<Record<string, MetricConfig>> {
        const configs = await storage.get(METRICS_CONFIG);
        return configs?.reduce((acc: any, config: any) => ({
            ...acc,
            [config.name]: config
        }), {} as Record<string, MetricConfig>) ?? {};
    }
    // async loadConfig(): Promise<MetricConfig[] | null> {
    //     return storage.get(METRICS_CONFIG);
    // }

    applyFormatting() {
        this.formatStaticMetrics();
        // this.formatTimeSeriesData();
    }

    formatStaticMetrics() {
        const items = document.querySelectorAll(METRIC_SELECTORS.staticMetrics);
        // console.log('Found static metric items:', items.length);

        if (items && items.length > 0) {
            items.forEach(item => {
                if (item != null) {
                    const label = item.querySelector('.name')?.textContent?.trim();
                    const valueElement = item.querySelector('.number');
                    const valueText = valueElement?.textContent?.trim();

                    if (label && valueText && this.config && this.config[label]) {
                        // console.log('Processing metric:', label, valueText);
                        const numValue = utils.parseNumber(valueText);
                        const rule = this.config[label];
                        const color = this.getColorForValue(numValue, rule.conditions);
                        if (color && valueElement) {
                            (valueElement as HTMLElement).style.backgroundColor = color;
                            // console.log('Applied color:', color, 'to:', label);
                        }
                    }
                }

            });
        }
    }

    formatTimeSeriesData() {
        ['#quarters', '#annual'].forEach(tableId => {
            const table = document.querySelector(tableId);
            if (!table) return;

            const headers = Array.from(table.querySelectorAll('thead th'))
                .map(th => th.textContent?.trim() ?? '');

            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                const metric = cells[0]?.textContent?.trim() ?? '';

                // if (this.config[metric] && this.config[metric].timeSeriesRules) {
                //     this.applyTimeSeriesFormatting(cells, this.config[metric].timeSeriesRules);
                // }
            });
        });
    }

    // applyTimeSeriesFormatting(cells, rules) {
    //     for (let i = 1; i < cells.length; i++) {
    //         const currentValue = parseFloat(cells[i].textContent.replace(/,/g, ''));
    //         const previousValue = parseFloat(cells[i - 1].textContent.replace(/,/g, ''));

    //         if (!isNaN(currentValue) && !isNaN(previousValue)) {
    //             const percentChange = ((currentValue - previousValue) / previousValue) * 100;
    //             const color = this.getColorForTimeSeries(percentChange, rules);
    //             if (color) {
    //                 cells[i].style.backgroundColor = color;
    //             }
    //         }
    //     }
    // }

    getColorForValue(value: number, conditions: Condition[]) {
        for (const condition of conditions) {
            if (this.evaluateCondition(value, condition)) {
                return condition.color;
            }
        }
        return null;
    }

    getColorForTimeSeries(percentChange: any, rules: any) {
        for (const rule of rules) {
            if (this.evaluateCondition(percentChange, rule.condition)) {
                return rule.color;
            }
        }
        return null;
    }

    evaluateCondition(metricValue: number, condition: Condition) {
        const { operator, value, valueMax } = condition;

        switch (operator) {
            case '>': return metricValue > value;
            case '<': return metricValue < value;
            case '>=': return metricValue >= value;
            case '<=': return metricValue <= value;
            case '==': return metricValue === value;
            case '!=': return metricValue !== value;
            case 'range': {
                const maxValue = valueMax || value; // Default to value if not provided
                return metricValue >= value && metricValue <= maxValue;
            }
            default: return false;
        }
    }

}

// Initialize formatter when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing ScreenerFormatter');
    new ScreenerFormatter();
});

// Also listen for possible dynamic content loads
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            // console.log('Content changed - Reinitializing ScreenerFormatter');
            new ScreenerFormatter();
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Listen for configuration updates
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'CONFIG_UPDATED') {
        console.log('Config updated - Reinitializing ScreenerFormatter');
        new ScreenerFormatter();
    }
});