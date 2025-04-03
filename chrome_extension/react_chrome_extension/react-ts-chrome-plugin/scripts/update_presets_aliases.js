// node --experimental-json-modules scripts/update_presets_aliases.js

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read the files
const metricsPath = join(__dirname, '..', 'src', 'resources', 'metrices.json');

const presetsPath = join(__dirname, '..', 'src', 'resources', 'presets.js');

const metrics = JSON.parse(readFileSync(metricsPath, 'utf8'));
const presetsContent = readFileSync(presetsPath, 'utf8');

// Create a map of metric name to aliases
const metricsMap = new Map();
metrics.forEach(metric => {
    if (metric.aliases) {
        metricsMap.set(metric.name, metric.aliases);
    }
});

// Parse presets object from the content
let presetsObj = null;
eval('presetsObj = ' + presetsContent.split('export const presets =')[1]);

// Update presets with aliases
for (const [presetName, presetMetrics] of Object.entries(presetsObj)) {
    presetMetrics.forEach(metric => {
        const aliases = metricsMap.get(metric.name);
        if (aliases) {
            metric.aliases = [...new Set([...(metric.aliases || []), ...aliases])];
        }
    });
}

// Create new content
const newContent = `export const presets = ${JSON.stringify(presetsObj, null, 2)};\n`;

// Write back to file
writeFileSync(presetsPath, newContent);
console.log('Updated presets.js with aliases from metrics.json');