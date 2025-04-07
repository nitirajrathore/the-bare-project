import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

// Function to extract metrics from HTML (from extract_timeseries_metrices.js)
function extractTableData(tableSelector, document) {
  const table = document.querySelector(tableSelector);
  const tableData = [];
  if (table) {
    const rows = table.querySelectorAll('tbody > tr');
    for (const row of rows) {
      const firstColumnCell = row.querySelector('td:first-child');
      if (firstColumnCell) {
        let value = firstColumnCell.textContent.trim().replace(/\s+/g, ' ');
        const originalValue = value;
        const hasPlusOrMinus = value.endsWith('+') || value.endsWith('-');
        if (hasPlusOrMinus) {
          value = value.slice(0, -1).trim();
        }
        if (hasPlusOrMinus) {
          tableData.push({
            "name": value,
            "displayName": value,
            "aliases": [
              originalValue.replace(/[+-]$/, "-"),
              originalValue.replace(/[+-]$/, "+")
            ]
          });
        } else {
          tableData.push({
            "name": value,
            "displayName": value
          });
        }
      }
    }
  }
  return tableData;
}

// Function to merge metrics with deduplication
function mergeMetrics(existing, newMetrics) {
  const merged = [...existing];
  const seen = new Set(existing.map(m => m.name));

  newMetrics.forEach(metric => {
    if (!seen.has(metric.name)) {
      merged.push(metric);
      seen.add(metric.name);
    } else {
      // Update existing metric if new one has aliases
      const existingIndex = merged.findIndex(m => m.name === metric.name);
      if (metric.aliases && (!merged[existingIndex].aliases || metric.aliases.length > merged[existingIndex].aliases.length)) {
        merged[existingIndex] = metric;
      }
    }
  });

  return merged;
}

// Main function to process HTML and update timeseries.json
async function updateTimeseriesMetrics(htmlContent) {
  // Create virtual DOM to parse HTML
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  const __dirname = dirname(fileURLToPath(import.meta.url));
  // Read existing timeseries.json
  const timeseriesPath = path.join(__dirname, '../src/resources/timeseries.json');
  const timeseriesData = JSON.parse(fs.readFileSync(timeseriesPath, 'utf8'));

  // Process each timeseries type
  timeseriesData.forEach(timeseries => {
    const newMetrics = extractTableData(timeseries.cssSelector, document);
    timeseries.metrices = mergeMetrics(timeseries.metrices || [], newMetrics);
  });

  // Write updated data back to file
  fs.writeFileSync(
    timeseriesPath,
    JSON.stringify(timeseriesData, null, 2),
    'utf8'
  );

  // Log statistics
  timeseriesData.forEach(timeseries => {
    console.log(`\n${timeseries.type}:`);
    console.log(`Total metrics: ${timeseries.metrices.length}`);
    console.log(`Metrics with aliases: ${timeseries.metrices.filter(m => m.aliases).length}`);
  });
}

// Example usage
const htmlPath = process.argv[2];
if (!htmlPath) {
  console.error('Please provide path to HTML file');
  process.exit(1);
}

const htmlContent = fs.readFileSync(htmlPath, 'utf8');
updateTimeseriesMetrics(htmlContent)
  .then(() => console.log('Done!'))
  .catch(console.error);
