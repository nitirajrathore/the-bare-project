import React from 'react';
import { Condition } from '../../types/types';
import { getOperatorSymbol } from '../lib/utils';

interface ConditionSummaryProps {
  condition: Condition;
  onClick: () => void;
}

const ConditionSummary: React.FC<ConditionSummaryProps> = ({ condition, onClick }) => {

  const getValueText = (): string => {
    if (condition.operator === 'range' && condition.valueMax !== undefined) {
      return `${condition.value} - ${condition.valueMax}`;
    }
    return `${condition.value}`;
  };

  return (
    <div
      className="flex items-center p-2 bg-white rounded-md shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <div
        className="w-3 h-3 rounded-full mr-2"
        style={{ backgroundColor: condition.color }}
      />
      <span className="text-sm">
        {getOperatorSymbol(condition.operator)} {getValueText()}
      </span>
    </div>
  );
};

export default ConditionSummary;
