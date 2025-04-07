import presets from '../resources/presets.json';
import { PresetsType } from '../types/presets';

export const loadPresets = (): PresetsType => {
  return presets as PresetsType;
};

export interface Utils {
  parseNumber: (value: string) => number;
  formatPercentage: (value: number) => string;
  isNumeric: (value: unknown) => boolean;
  deepClone: <T>(obj: T) => T;
  isValidColor: (color: string) => boolean;
  generateId: () => string;
  debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => (...args: Parameters<T>) => void;
  log: (message: string, data?: any) => void;
}

const utils: Utils = {
  parseNumber: (value: string): number => {
    if (typeof value !== 'string') return NaN;
    value = value.replace(/[,%]/g, '');
    return parseFloat(value);
  },

  formatPercentage: (value: number): string => {
    return `${value.toFixed(2)}%`;
  },

  isNumeric: (value: unknown): boolean => {
    if (typeof value !== 'string') return false;
    return !isNaN(utils.parseNumber(value));
  },

  deepClone: <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
  },

  isValidColor: (color: string): boolean => {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
  },

  generateId: (): string => {
    return '_' + Math.random().toString(36).substr(2, 9);
  },

  debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  log: (message: string, data: any = null): void => {
    if (chrome.runtime.getManifest().version_name === 'development') {
      console.log(`[Screener Formatter] ${message}`, data || '');
    }
  }
};

export default utils;