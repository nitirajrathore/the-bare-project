import React, { useState, useEffect } from 'react';
import { Condition, MetricConfig } from './types';
import ConditionForm from './ConditionForm';
import ConditionSummary from './ConditionSummary';
import { v4 as uuidv4 } from 'uuid';

interface MetricConditionProps {
  metric: MetricConfig;
  onUpdate: (updatedMetric: MetricConfig) => void;
  onDelete: (metricId: string) => void;
}

const MetricCondition: React.FC<MetricConditionProps> = ({ 
  metric, 
  onUpdate, 
  onDelete 
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(metric.isExpanded || false);
  
  // Update local state when metric.isExpanded changes (e.g., when a preset is applied)
  useEffect(() => {
    setIsExpanded(metric.isExpanded || false);
  }, [metric.isExpanded]);
  const [isAddingCondition, setIsAddingCondition] = useState<boolean>(false);
  const [editingConditionId, setEditingConditionId] = useState<string | null>(null);

  const handleAddCondition = () => {
    setIsAddingCondition(true);
  };

  const handleSaveCondition = (condition: Condition) => {
    const updatedConditions = [...metric.conditions];
    
    if (editingConditionId) {
      // Update existing condition
      const index = updatedConditions.findIndex(c => c.id === editingConditionId);
      if (index !== -1) {
        updatedConditions[index] = condition;
      }
      setEditingConditionId(null);
    } else {
      // Add new condition
      updatedConditions.push(condition);
    }
    
    onUpdate({
      ...metric,
      conditions: updatedConditions
    });
    
    setIsAddingCondition(false);
  };

  const handleCancelCondition = () => {
    setIsAddingCondition(false);
    setEditingConditionId(null);
  };

  const handleEditCondition = (conditionId: string) => {
    setEditingConditionId(conditionId);
  };

  const handleDeleteCondition = (conditionId: string) => {
    const updatedConditions = metric.conditions.filter(c => c.id !== conditionId);
    onUpdate({
      ...metric,
      conditions: updatedConditions
    });
  };

  const toggleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onUpdate({
      ...metric,
      isExpanded: newExpandedState
    });
  };

  return (
    <div className="mb-4 bg-gray-50 p-3 rounded-md border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-medium">{metric.name}</h3>
        <button
          onClick={() => onDelete(metric.id)}
          className="text-red-500 hover:text-red-700 text-sm"
          aria-label="Delete metric"
        >
          Remove
        </button>
      </div>

      {isExpanded ? (
        <div className="space-y-2">
          {metric.conditions.map((condition) => (
            <div key={condition.id} className="flex items-center gap-2">
              {editingConditionId === condition.id ? (
                <ConditionForm
                  condition={condition}
                  onSave={handleSaveCondition}
                  onCancel={handleCancelCondition}
                />
              ) : (
                <>
                  <div className="flex-1">
                    <ConditionSummary 
                      condition={condition} 
                      onClick={() => handleEditCondition(condition.id)} 
                    />
                  </div>
                  <button
                    onClick={() => handleDeleteCondition(condition.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                    aria-label="Delete condition"
                  >
                    ×
                  </button>
                </>
              )}
            </div>
          ))}

          {isAddingCondition ? (
            <ConditionForm
              onSave={handleSaveCondition}
              onCancel={handleCancelCondition}
            />
          ) : (
            <button
              onClick={handleAddCondition}
              className="text-blue-500 hover:text-blue-700 text-sm flex items-center"
            >
              <span className="mr-1">+</span> Add Condition
            </button>
          )}

          <div className="flex justify-end mt-2">
            <button
              onClick={toggleExpand}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Collapse
            </button>
          </div>
        </div>
      ) : (
        <div 
          className="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
          onClick={toggleExpand}
        >
          <div className="flex flex-wrap gap-2">
            {metric.conditions.map((condition) => (
              <div key={condition.id} className="inline-flex items-center">
                <div 
                  className="w-2 h-2 rounded-full mr-1" 
                  style={{ backgroundColor: condition.color }}
                />
                <span className="text-xs text-gray-600">
                  {condition.operator === 'range' 
                    ? `${condition.value} - ${condition.valueMax}` 
                    : `${condition.operator} ${condition.value}`}
                </span>
              </div>
            ))}
            {metric.conditions.length === 0 && (
              <span className="text-xs text-gray-400">No conditions defined</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricCondition;
