import { RadioGroup, RadioGroupItem } from "@/src/react/components/ui/radio-group"
import { Label } from "@/src/react/components/ui/label"
import MetricCondition from './MetricCondition'
import { TimeseriesMetricConfig, ChangeType } from '../../types/types'

interface TimeseriesMetricConditionProps {
  metric: TimeseriesMetricConfig;
  onUpdate: (metric: TimeseriesMetricConfig) => void;
  onDelete: (id: string) => void;
}

export default function TimeseriesMetricCondition({
  metric,
  onUpdate,
  onDelete
}: TimeseriesMetricConditionProps) {
  const handleChangeTypeUpdate = (changeType: ChangeType) => {
    onUpdate({
      ...metric,
      changeType
    });
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-md shadow-sm border border-gray-200">
      {/* <div className="flex items-center justify-between">
        <h3 className="font-medium">{metric.name}</h3>
        <button
          onClick={() => onDelete(metric.id)}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div> */}

      <RadioGroup
        value={metric.changeType}
        onValueChange={handleChangeTypeUpdate as (value: string) => void}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="absolute" id={`absolute-${metric.id}`} />
          <Label htmlFor={`absolute-${metric.id}`}>Absolute Change</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="percentage" id={`percentage-${metric.id}`} />
          <Label htmlFor={`percentage-${metric.id}`}>Percentage Change</Label>
        </div>
      </RadioGroup>

      <MetricCondition
        metric={metric}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </div>
  );
}