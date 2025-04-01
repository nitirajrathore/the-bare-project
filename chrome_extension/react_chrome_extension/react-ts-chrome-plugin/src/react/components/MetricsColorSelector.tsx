import React, { useState } from 'react';
import { MetricConfig } from './types';
import MetricCondition from './MetricCondition';
import { v4 as uuidv4 } from 'uuid';
import metricsData from '../../resources/metrices.json';

interface MetricsColorSelectorProps {
  metrics: MetricConfig[];
  onMetricsChange: (metrics: MetricConfig[]) => void;
}

const MetricsColorSelector: React.FC<MetricsColorSelectorProps> = ({
  metrics,
  onMetricsChange
}) => {
  const [isAddingMetric, setIsAddingMetric] = useState<boolean>(false);
  const [newMetricName, setNewMetricName] = useState<string>('');

  const handleAddMetric = () => {
    setIsAddingMetric(true);
  };

  const handleSaveNewMetric = () => {
    if (newMetricName.trim()) {
      const selectedMetric = metricsData.find(m => m.name === newMetricName);
      if (selectedMetric) {
        const newMetric: MetricConfig = {
          id: uuidv4(),
          name: selectedMetric.name,
          conditions: [],
          isExpanded: true
        };

        onMetricsChange([...metrics, newMetric]);
        setIsAddingMetric(false);
        setNewMetricName('');
      }
    }
  };

  const handleCancelNewMetric = () => {
    setIsAddingMetric(false);
    setNewMetricName('');
  };

  const handleUpdateMetric = (updatedMetric: MetricConfig) => {
    const updatedMetrics = metrics.map(metric =>
      metric.id === updatedMetric.id ? updatedMetric : metric
    );
    onMetricsChange(updatedMetrics);
  };

  const handleDeleteMetric = (metricId: string) => {
    const updatedMetrics = metrics.filter(metric => metric.id !== metricId);
    onMetricsChange(updatedMetrics);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Conditional Formatting</h2>
      </div>

      <div className="space-y-3">
        {metrics.map(metric => (
          <MetricCondition
            key={metric.id}
            metric={metric}
            onUpdate={handleUpdateMetric}
            onDelete={handleDeleteMetric}
          />
        ))}
      </div>

      {isAddingMetric ? (
        <div className="p-3 bg-white rounded-md shadow-sm border border-gray-200">
          <div className="mb-3">
            <label className="block mb-1 text-sm font-medium">Select Metric:</label>
            <div className="flex gap-2">
              <select
                value={newMetricName}
                onChange={(e) => setNewMetricName(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Select a metric</option>
                {metricsData.map(metric => (
                  <option key={metric.name} value={metric.name}>
                    {metric.displayName}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSaveNewMetric}
                disabled={!newMetricName.trim()}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
              >
                Add
              </button>
              <button
                onClick={handleCancelNewMetric}
                className="px-3 py-1 text-gray-600 hover:text-gray-800 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={handleAddMetric}
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <span className="mr-1 text-lg">+</span> Add New Metric
        </button>
      )}
    </div>
  );
};

export default MetricsColorSelector;
