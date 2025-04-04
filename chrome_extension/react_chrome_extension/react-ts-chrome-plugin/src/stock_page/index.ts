import { METRICS_CONFIG, SETTINGS, SettingKeys, HighlightingPatterns, ColoringPatterns } from '../constants';
import storage from '../lib/storage';
import { MetricConfig, Condition } from '../types/types';
import utils from '../utils/utils';

const METRIC_SELECTORS = {
    staticMetrics: '#top-ratios li.flex',
    quarterlyResults: '#quarters table tbody tr',
    yearlyResults: '#annual table tbody tr'
};

class ScreenerFormatter {
    private config: Record<string, MetricConfig>;
    private settings: Record<string, string>;

    constructor() {
        this.config = {} as Record<string, MetricConfig>;
        this.settings = {} as Record<string, string>;
        this.init();
        // console.log('ScreenerFormatter initialized');
    }

    async init() {
        // console.log("content.js: trying to load configs.")
        this.config = await this.loadConfig();
        this.settings = await this.loadSettings();
        this.applyFormatting();
    }

    async loadSettings(): Promise<Record<string, string>> {
        const settings = await storage.get(SETTINGS) || {};
        // Set defaults if not already set
        settings[SettingKeys.HIGHLIGHTING_PATTERN] = settings[SettingKeys.HIGHLIGHTING_PATTERN] || HighlightingPatterns.Block;
        settings[SettingKeys.COLORING_PATTERN] = settings[SettingKeys.COLORING_PATTERN] || ColoringPatterns.Mono;

        return settings;
    }
    async loadConfig(): Promise<Record<string, MetricConfig>> {
        const configs = await storage.get(METRICS_CONFIG);
        const configMap: Record<string, MetricConfig> = {};

        if (configs) {
            configs.forEach((config: MetricConfig) => {
                // Add entry for the main metric name
                configMap[config.name] = config;

                // Add entries for all aliases if they exist
                if (config.aliases && config.aliases.length > 0) {
                    config.aliases.forEach(alias => {
                        configMap[alias] = config;
                    });
                }
            });
        }

        return configMap;
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
                            let elem = valueElement as HTMLElement;
                            switch (this.settings[SettingKeys.HIGHLIGHTING_PATTERN]) {
                                case HighlightingPatterns.Number:
                                    // Do nothing
                                    break;
                                case HighlightingPatterns.Value:
                                    if (elem.parentElement) {
                                        elem = elem.parentElement as HTMLElement;
                                    }
                                    break;
                                case HighlightingPatterns.Block:
                                    if (elem.parentElement) {
                                        elem = elem.parentElement as HTMLElement;
                                        if (elem.parentElement) {
                                            elem = elem.parentElement as HTMLElement;
                                        }
                                    }
                                    break;
                            }

                            switch (this.settings[SettingKeys.COLORING_PATTERN]) {
                                case ColoringPatterns.Mono:
                                    elem.style.backgroundColor = color;
                                    break;
                                case ColoringPatterns.Gradient:
                                    elem.style.backgroundImage = `linear-gradient( to right, white, ${color})`;
                                    break;
                            }
                        }
                    }
                }

            });
        }
    }
    // DOES NOT WORK and too much to implement
    // colorValueCell(rightEl: HTMLElement, color: string, coloringPattern: string) {
    //     if (rightEl.parentElement == null) {
    //         throw new Error("colorValueCell : Parent element is null");
    //     }
    //     const parentEl = rightEl.parentElement; // or however you get the parent

    //     const parentRect = parentEl.getBoundingClientRect();
    //     const rightRect = rightEl.getBoundingClientRect();

    //     // Calculate the middle point of the parent element
    //     const middleX = parentRect.left + parentRect.width / 2;

    //     // Calculate how much space to cover from middle to right
    //     const gradientStart = middleX - parentRect.left;
    //     const gradientWidth = parentRect.width - gradientStart;

    //     // Create a gradient overlay div
    //     const gradientOverlay = document.createElement('div');
    //     gradientOverlay.style.position = 'absolute';
    //     gradientOverlay.style.top = "0";
    //     gradientOverlay.style.left = `${gradientStart}px`;
    //     gradientOverlay.style.width = `${gradientWidth}px`;
    //     gradientOverlay.style.height = '100%';
    //     if (coloringPattern === ColoringPatterns.Mono) {
    //         gradientOverlay.style.backgroundColor = color;
    //     } else if (coloringPattern === ColoringPatterns.Gradient) {
    //         gradientOverlay.style.backgroundImage = `linear-gradient(to right, white, ${color})`;
    //     }
    //     gradientOverlay.style.pointerEvents = 'none';
    //     gradientOverlay.style.zIndex = "0";

    //     // Ensure the parent has relative positioning
    //     parentEl.style.position = 'relative';

    //     // Append the overlay
    //     parentEl.appendChild(gradientOverlay);

    //     // Optional: Bring all children above the overlay
    //     Array.from(parentEl.children).forEach(child => {
    //         child.style.position = 'relative';
    //         child.style.zIndex = "1";
    //     });
    // }

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
            case '=': return metricValue === value;
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
