import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getOperatorSymbol(operator: string): string {
  switch (operator) {
    case '<': return '<';
    case '>': return '>';
    case '<=': return '≤';
    case '>=': return '≥';
    case '=': return '=';
    case 'range': return 'between';
    default: return operator;
  }
};

