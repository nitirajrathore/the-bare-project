export type Operator = '<' | '>' | '<=' | '>=' | '==' | 'range';

export interface Condition {
  id: string;
  operator: Operator;
  value: number;
  valueMax?: number | null; // For range operator
  color: string;
}

export interface MetricConfig {
  id: string;
  name: string;
  conditions: Condition[];
  isExpanded?: boolean; // To track if the form is expanded or collapsed
}
