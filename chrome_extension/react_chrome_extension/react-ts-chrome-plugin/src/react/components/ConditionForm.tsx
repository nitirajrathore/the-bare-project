import React, { useState, useEffect } from 'react';
import { Condition, Operator } from './types';
import ColorPicker from './ColorPicker';
import { v4 as uuidv4 } from 'uuid';

interface ConditionFormProps {
  condition?: Condition;
  onSave: (condition: Condition) => void;
  onCancel: () => void;
}

const ConditionForm: React.FC<ConditionFormProps> = ({
  condition,
  onSave,
  onCancel
}) => {
  const [operator, setOperator] = useState<Operator>(condition?.operator || '<');
  const [value, setValue] = useState<string>(condition?.value?.toString() || '');
  const [valueMax, setValueMax] = useState<string>(condition?.valueMax?.toString() || '');
  const [color, setColor] = useState<string>(condition?.color || '#448AFF');

  const operators: { value: Operator; label: string }[] = [
    { value: '<', label: 'Less than' },
    { value: '>', label: 'Greater than' },
    { value: '<=', label: 'Less than or equal to' },
    { value: '>=', label: 'Greater than or equal to' },
    { value: '==', label: 'Equal to' },
    { value: 'range', label: 'Range' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCondition: Condition = {
      id: condition?.id || uuidv4(),
      operator,
      value: value ? parseFloat(value) : null,
      color
    };

    if (operator === 'range') {
      newCondition.valueMax = valueMax ? parseFloat(valueMax) : null;
    }

    onSave(newCondition);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-white rounded-md shadow-sm border border-gray-200">
      <div className="flex items-center mb-3 gap-2">
        <div className="flex-1">
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value as Operator)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          >
            {operators.map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          {operator === 'range' ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Min"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                required
              />
              <span>-</span>
              <input
                type="number"
                value={valueMax}
                onChange={(e) => setValueMax(e.target.value)}
                placeholder="Max"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>
          ) : (
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Value"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              required
            />
          )}
        </div>

        <ColorPicker color={color} onChange={setColor} />
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save
        </button>

      </div>
    </form>
  );
};

export default ConditionForm;
