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

// Function to merge metrics with deduplication and track changes
function mergeMetrics(existing, newMetrics) {
  const merged = [...existing];
  const seen = new Set(existing.map(m => m.name));
  const stats = {
    added: 0,
    modified: 0
  };

  newMetrics.forEach(metric => {
    if (!seen.has(metric.name)) {
      merged.push(metric);
      seen.add(metric.name);
      stats.added++;
    } else {
      // Update existing metric if new one has aliases
      const existingIndex = merged.findIndex(m => m.name === metric.name);
      if (metric.aliases && (!merged[existingIndex].aliases || metric.aliases.length > merged[existingIndex].aliases.length)) {
        merged[existingIndex] = metric;
        stats.modified++;
      }
    }
  });

  return { merged, stats };
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
  const allStats = new Map();

  timeseriesData.forEach(timeseries => {
    const newMetrics = extractTableData(timeseries.cssSelector, document);
    const { merged, stats } = mergeMetrics(timeseries.metrices || [], newMetrics);
    timeseries.metrices = merged;
    allStats.set(timeseries.type, {
      ...stats,
      total: merged.length,
      withAliases: merged.filter(m => m.aliases).length
    });
  });

  // Write updated data back to file
  fs.writeFileSync(
    timeseriesPath,
    JSON.stringify(timeseriesData, null, 2),
    'utf8'
  );

  // Log detailed statistics
  console.log('\nMerge Statistics:');
  console.log('================');
  allStats.forEach((stats, type) => {
    console.log(`\n${type}:`);
    console.log(`  New metrics added: ${stats.added}`);
    console.log(`  Existing metrics modified: ${stats.modified}`);
    console.log(`  Total metrics: ${stats.total}`);
    console.log(`  Metrics with aliases: ${stats.withAliases}`);
    console.log('  ----------------');
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
