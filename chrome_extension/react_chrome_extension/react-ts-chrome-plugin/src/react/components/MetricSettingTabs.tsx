import { TableIcon, LineChartIcon } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/src/react/components/ui/scroll-area"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/react/components/ui/tabs"
import MetricsColorSelector from './MetricsColorSelector'
import TimeseriesColorSelector from './TimeseriesColorSelector'
import { MetricConfig, TimeseriesConfig } from '../../types/types'

interface MetricSettingTabsProps {
  metrics: MetricConfig[];
  onMetricsChange: (metrics: MetricConfig[]) => void;
  timeseriesMetrics: TimeseriesConfig[];
  onTimeseriesMetricsChange: (metrics: TimeseriesConfig[]) => void;
}

export default function MetricSettingTabs({
  metrics,
  onMetricsChange,
  timeseriesMetrics,
  onTimeseriesMetricsChange
}: MetricSettingTabsProps) {
  return (
    <Tabs defaultValue="metrics">
      <ScrollArea>
        <TabsList className="before:bg-border relative mb-3 h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
          <TabsTrigger
            value="metrics"
            className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
          >
            <TableIcon
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Metrics Coloring
          </TabsTrigger>
          <TabsTrigger
            value="timeseries"
            className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
          >
            <LineChartIcon
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Timeseries Coloring
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <TabsContent value="metrics" className="border-none p-0">
        <MetricsColorSelector
          metrics={metrics}
          onMetricsChange={onMetricsChange}
        />
      </TabsContent>

      <TabsContent value="timeseries" className="border-none p-0">
        <TimeseriesColorSelector
          timeseriesMetrics={timeseriesMetrics}
          onTimeseriesMetricsChange={onTimeseriesMetricsChange}
        />
      </TabsContent>
    </Tabs>
  )
}
