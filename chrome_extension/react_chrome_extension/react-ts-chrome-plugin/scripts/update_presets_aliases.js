// node --experimental-json-modules scripts/update_presets_aliases.js

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read the files
const metricsPath = join(__dirname, '..', 'src', 'resources', 'metrices.json');
const presetsPath = join(__dirname, '..', 'src', 'resources', 'presets.json');

const metrics = JSON.parse(readFileSync(metricsPath, 'utf8'));
const presetsData = JSON.parse(readFileSync(presetsPath, 'utf8'));

// Create a map of metric name to aliases
const metricsMap = new Map();
metrics.forEach(metric => {
    if (metric.aliases) {
        metricsMap.set(metric.name, metric.aliases);
    }
});

// Update presets with aliases
for (const [presetName, presetMetrics] of Object.entries(presetsData)) {
    presetMetrics.forEach(metric => {
        const aliases = metricsMap.get(metric.name);
        if (aliases) {
            metric.aliases = [...new Set([...(metric.aliases || []), ...aliases])];
        }
    });
}

// Write back to file with pretty formatting
writeFileSync(presetsPath, JSON.stringify(presetsData, null, 2));
console.log('Updated presets.json with aliases from metrics.json');