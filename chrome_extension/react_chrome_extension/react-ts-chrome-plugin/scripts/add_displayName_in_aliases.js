import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get current file's directory in ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// Read the JSON file
const filePath = join(__dirname, '..', 'src', 'resources', 'metrices.json');
const metrics = JSON.parse(readFileSync(filePath, 'utf8'));

const updatedMetrics = metrics.map(metric => {
  if (metric.name !== metric.displayName) {
    return {
      ...metric,
      aliases: [
        ...(metric.aliases || []),
        metric.displayName
      ].filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
    };
  }
  return metric;
});

writeFileSync(filePath, JSON.stringify(updatedMetrics, null, 2));
console.log('Updated metrics file successfully');