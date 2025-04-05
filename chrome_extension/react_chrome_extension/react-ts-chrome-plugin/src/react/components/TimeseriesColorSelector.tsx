import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SelectWithSearch from './SelectWithSearch';
import TimeseriesMetric from './Timeseries';
import metricsData from '../../resources/metrices.json';
import { TimeseriesMetricConfig } from '../../types/types';

interface TimeseriesColorSelectorProps {
  timeseriesMetrics: TimeseriesMetricConfig[];
  onTimeseriesMetricsChange: (metrics: TimeseriesMetricConfig[]) => void;
}

const TimeseriesColorSelector: React.FC<TimeseriesColorSelectorProps> = ({
  timeseriesMetrics,
  onTimeseriesMetricsChange
}) => {
  const [isAddingMetric, setIsAddingMetric] = useState(false);
  const [newMetricName, setNewMetricName] = useState('');

  const handleAddMetric = () => {
    setIsAddingMetric(true);
  };

  const handleSaveNewMetric = () => {
    if (newMetricName.trim()) {
      const selectedMetric = metricsData.find(m => m.name === newMetricName);
      if (selectedMetric) {
        const newMetric: TimeseriesMetricConfig = {
          id: uuidv4(),
          name: selectedMetric.name,
          aliases: selectedMetric.aliases,
          conditions: [],
          isExpanded: true,
          changeType: 'absolute'
        };

        onTimeseriesMetricsChange([newMetric, ...timeseriesMetrics]);
        setIsAddingMetric(false);
        setNewMetricName('');
      }
    }
  };

  const handleUpdateMetric = (updatedMetric: TimeseriesMetricConfig) => {
    const updatedMetrics = timeseriesMetrics.map(metric =>
      metric.id === updatedMetric.id ? updatedMetric : metric
    );
    onTimeseriesMetricsChange(updatedMetrics);
  };

  const handleDeleteMetric = (metricId: string) => {
    const updatedMetrics = timeseriesMetrics.filter(metric => metric.id !== metricId);
    onTimeseriesMetricsChange(updatedMetrics);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold">Timeseries Coloring</h2>
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
                onClick={() => setIsAddingMetric(false)}
                className="px-3 py-1 text-gray-600 hover:text-gray-800 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {timeseriesMetrics.map(metric => (
          <TimeseriesMetric
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

export default TimeseriesColorSelector;