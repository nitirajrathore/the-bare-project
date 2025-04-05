import { METRICS_CONFIG, SETTINGS, SettingKeys, HighlightingPatterns, ColoringPatterns, TIMESERIES_CONFIG } from '../constants';
import storage from '../lib/storage';
import { MetricConfig, Condition, TimeseriesUserConfig } from '../types/types';
import utils from '../utils/utils';

const METRIC_SELECTORS = {
    staticMetrics: '#top-ratios li.flex',
    quarterlyResults: '#quarters table tbody tr',
    yearlyResults: '#annual table tbody tr'
};

class ScreenerFormatter {
    private config: Record<string, MetricConfig>;
    private timeseriesConfig: TimeseriesUserConfig[];
    private settings: Record<string, string>;

    constructor() {
        this.config = {} as Record<string, MetricConfig>;
        this.timeseriesConfig = [];
        this.settings = {} as Record<string, string>;
        this.init();
    }

    async init() {
        const [config, timeseriesConfig, settings] = await Promise.all([
            this.loadConfig(),
            this.loadTimeseriesConfig(),
            this.loadSettings()
        ]);

        this.config = config;
        this.timeseriesConfig = timeseriesConfig || [];
        this.settings = settings;
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

    async loadTimeseriesConfig(): Promise<TimeseriesUserConfig[]> {
        return storage.get(TIMESERIES_CONFIG) || [];
    }

    applyFormatting() {
        this.formatStaticMetrics();
        this.formatTimeSeriesData();
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

    formatTimeSeriesData() {
        // Process each timeseries configuration
        this.timeseriesConfig.forEach(timeseriesConfig => {
            const table = document.querySelector(timeseriesConfig.cssSelector);
            if (!table) return;

            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const cells = Array.from(row.querySelectorAll('td'));
                if (cells.length < 2) return;

                const metricName = cells[0]?.textContent?.trim() ?? '';
                const metricConfig = timeseriesConfig.metricConfigs.find(
                    config => config.name === metricName || config.aliases?.includes(metricName)
                );

                if (!metricConfig) return;

                // Process each cell starting from the second one (skip metric name)
                for (let i = 2; i < cells.length; i++) {
                    const currentCell = cells[i];
                    const previousCell = cells[i - 1];

                    const currentValue = utils.parseNumber(currentCell.textContent || '');
                    const previousValue = utils.parseNumber(previousCell.textContent || '');

                    if (isNaN(currentValue) || isNaN(previousValue)) continue;

                    // Calculate change based on changeType
                    let change: number;
                    if (metricConfig.changeType === 'percentage') {
                        change = ((currentValue - previousValue) / Math.abs(previousValue)) * 100;
                    } else { // absolute
                        change = currentValue - previousValue;
                    }

                    // Get color based on conditions
                    const color = this.getColorForValue(change, metricConfig.conditions);
                    if (!color) continue;

                    // Apply coloring based on settings
                    const elem = currentCell as HTMLElement;
                    switch (this.settings[SettingKeys.COLORING_PATTERN]) {
                        case ColoringPatterns.Mono:
                            elem.style.backgroundColor = color;
                            break;
                        case ColoringPatterns.Gradient:
                            elem.style.backgroundImage = `linear-gradient(to right, white, ${color})`;
                            break;
                    }
                }
            });
        });
    }

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
