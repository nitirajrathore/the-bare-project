import { RadioGroup, RadioGroupItem } from "@/src/react/components/ui/radio-group"
import { Label } from "@/src/react/components/ui/label"
import MetricCondition from './MetricCondition'
import { TimeseriesMetricConfig, ChangeType } from '../../types/types'

interface TimeseriesConditionProps {
  metric: TimeseriesMetricConfig;
  onUpdate: (metric: TimeseriesMetricConfig) => void;
}

export default function TimeseriesCondition({
  metric,
  onUpdate
}: TimeseriesConditionProps) {
  const handleChangeTypeUpdate = (changeType: ChangeType) => {
    onUpdate({
      ...metric,
      changeType
    });
  };

  return (
    <div className="space-y-4">
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
        onUpdate={(updatedMetric) => {
          onUpdate({ ...updatedMetric, changeType: metric.changeType });
        }}
      />
    </div>
  );
}