import { useState } from 'react';
import timeseriesData from '../../resources/timeseries.json';
import SelectWithSearch from './SelectWithSearch';
import TimeseriesColorSelector from './TimeseriesColorSelector';
import { TimeseriesMetricConfig, TimeseriesUserConfig } from '../../types/types';

interface TimeseriesProps {
  timeseriesConfigs: TimeseriesUserConfig[];
  onTimeseriesConfigsChange: (configs: TimeseriesUserConfig[]) => void;
}

export default function Timeseries({
  timeseriesConfigs,
  onTimeseriesConfigsChange
}: TimeseriesProps) {
  const [selectedType, setSelectedType] = useState<string>(
    timeseriesConfigs[0]?.type || timeseriesData[0].type
  );

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    // If no config exists for this type, create one
    if (!timeseriesConfigs.find(config => config.type === type)) {
      onTimeseriesConfigsChange([
        ...timeseriesConfigs,
        { type, metricConfigs: [] }
      ]);
    }
  };

  const handleMetricsChange = (metrics: TimeseriesMetricConfig[]) => {
    const updatedConfigs = timeseriesConfigs.map(config =>
      config.type === selectedType
        ? { ...config, metricConfigs: metrics }
        : config
    );
    onTimeseriesConfigsChange(updatedConfigs);
  };

  const currentConfig = timeseriesConfigs.find(config => config.type === selectedType) || {
    type: selectedType,
    metricConfigs: []
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <SelectWithSearch
          menuList={timeseriesData.map(series => ({
            value: series.type,
            label: series.type
          }))}
          menuType="Timeseries Type"
          value={selectedType}
          setValue={handleTypeChange}
        />
      </div>

      <TimeseriesColorSelector
        timeseriesMetrics={currentConfig.metricConfigs}
        onTimeseriesMetricsChange={handleMetricsChange}
        availableMetrics={
          timeseriesData.find(series => series.type === selectedType)?.metrices || []
        }
      />
    </div>
  );
}