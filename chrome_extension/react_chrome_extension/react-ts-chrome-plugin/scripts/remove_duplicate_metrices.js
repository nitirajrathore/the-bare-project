import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));

// Read the timeseries.json file
const timeseriesPath = join(__dirname, '../src/resources/timeseries.json');
const timeseriesData = JSON.parse(readFileSync(timeseriesPath, 'utf8'));

// Function to create a unique key for a metric
const getMetricKey = (metric) => {
  return JSON.stringify({
    name: metric.name,
    displayName: metric.displayName,
    aliases: metric.aliases?.sort() || []
  });
};

// Function to remove duplicates from an array of metrics
const removeDuplicateMetrics = (metrics) => {
  const seen = new Map();

  return metrics.filter(metric => {
    const key = getMetricKey(metric);
    if (seen.has(key)) {
      return false;
    }
    seen.set(key, true);
    return true;
  });
};

// Process each timeseries type
const cleanedData = timeseriesData.map(timeseries => ({
  ...timeseries,
  metrices: removeDuplicateMetrics(timeseries.metrices)
}));

// Write the cleaned data back to file
writeFileSync(
  timeseriesPath,
  JSON.stringify(cleanedData, null, 2),
  'utf8'
);

// Log statistics
timeseriesData.forEach((timeseries, index) => {
  const originalCount = timeseries.metrices.length;
  const newCount = cleanedData[index].metrices.length;
  const removed = originalCount - newCount;

  console.log(`${timeseries.type}:`);
  console.log(`  Original metrics: ${originalCount}`);
  console.log(`  After deduplication: ${newCount}`);
  console.log(`  Removed: ${removed}`);
  console.log('---');
});