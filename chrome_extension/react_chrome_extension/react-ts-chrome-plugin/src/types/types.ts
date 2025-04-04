export type Operator = '<' | '>' | '<=' | '>=' | '=' | 'range' | '!='

export interface Condition {
  id: string;
  operator: Operator;
  value: number;
  valueMax?: number | null; // For range operator
  color: string;
}

export interface MetricInfo {
  name: string;
  aliases?: string[];
  displayName: string;
}

export interface TimeseriesUserConfig {
  cssSelector: string;
  type: string;
  metricConfigs: TimeseriesMetricConfig[];
}

export interface MetricConfig {
  id: string;
  name: string;
  aliases?: string[];
  conditions: Condition[];
  isExpanded?: boolean; // To track if the form is expanded or collapsed
}

export type ChangeType = 'absolute' | 'percentage';

export interface TimeseriesMetricConfig extends MetricConfig {
  changeType: ChangeType;
}

export interface IHighlightingPattern {
  name: string;
  displayName: string;
  description: string;
  image: string;
}

export interface IColoringPattern {
  name: string;
  displayName: string;
  description: string;
  image: string;
}