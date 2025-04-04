export type Operator = '<' | '>' | '<=' | '>=' | '=' | 'range' | '!='

export interface Condition {
  id: string;
  operator: Operator;
  value: number;
  valueMax?: number | null; // For range operator
  color: string;
}

export interface Metric {
  name: string;
  aliases?: string[];
  displayName: string;
}

export interface MetricConfig {
  id: string;
  name: string;
  aliases?: string[];
  conditions: Condition[];
  isExpanded?: boolean; // To track if the form is expanded or collapsed
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