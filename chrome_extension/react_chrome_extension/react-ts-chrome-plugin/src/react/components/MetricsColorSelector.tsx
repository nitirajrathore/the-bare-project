import React, { useState } from 'react';
import { MetricConfig } from '../../types/types';
import Metric from './Metric';
import { v4 as uuidv4 } from 'uuid';
import metricsData from '../../resources/metrices.json';
import SelectWithSearch from './SelectWithSearch';

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
          aliases: selectedMetric.aliases,
          conditions: [],
          isExpanded: true
        };

        onMetricsChange([newMetric, ...metrics]);
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
        <h2 className="text-sm font-semibold">Conditional Formatting</h2>
        {!isAddingMetric && (
          <button
            onClick={handleAddMetric}
            className="flex items-center text-blue-500 hover:text-blue-700 text-sm"
          >
            <span className="mr-1 text-lg">+</span> Add New Metric
          </button>
        )}
      </div>

      {isAddingMetric && (
        <div className="p-3 bg-white rounded-md shadow-sm border border-gray-200">
          <div className="mb-3">
            <div className="flex gap-2">
              <SelectWithSearch
                menuList={metricsData.map(metric => ({
                  value: metric.name,
                  label: metric.displayName
                }))}
                menuType="Metric"
                value={newMetricName}
                setValue={setNewMetricName}
              />

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
      )}

      <div className="space-y-3">
        {metrics.map(metric => (
          <Metric
            key={metric.id}
            metric={metric}
            onUpdate={handleUpdateMetric}
            onDelete={handleDeleteMetric}
          />
        ))}
      </div>
    </div>
  );
};

export default MetricsColorSelector;
