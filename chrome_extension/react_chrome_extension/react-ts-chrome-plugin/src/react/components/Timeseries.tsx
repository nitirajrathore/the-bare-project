import { TimeseriesMetricConfig } from '../../types/types';
import TimeseriesCondition from './TimeseriesCondition';

interface TimeseriesMetricProps {
  metric: TimeseriesMetricConfig;
  onUpdate: (updatedMetric: TimeseriesMetricConfig) => void;
  onDelete: (metricId: string) => void;
}

export default function TimeseriesMetric({ metric, onUpdate, onDelete }: TimeseriesMetricProps) {
  return (
    <div className="mb-4 bg-gray-50 p-3 rounded-md border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-medium">{metric.name}</h3>
        <button
          onClick={() => onDelete(metric.id)}
          className="text-red-500 hover:text-red-700 text-sm"
          aria-label="Delete metric"
        >
          Remove
        </button>
      </div>

      <TimeseriesCondition
        metric={metric}
        onUpdate={onUpdate}
      />
    </div>
  );
}