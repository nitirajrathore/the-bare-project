import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import SelectSearchWithNewButton from './SelectSearchWithNewButton';
import PresetDialog from './PresetDialog';
import { MetricConfig } from './types';
import storage from '../../lib/storage';

interface PresetSelectorProps {
  metrics: MetricConfig[];
  onApplyPreset: (metrics: MetricConfig[]) => void;
}

export interface Preset {
  name: string;
  metrics: MetricConfig[];
}

const CONFIG_PRESETS_KEY = 'config-presets';

const PresetSelector: React.FC<PresetSelectorProps> = ({ metrics, onApplyPreset }) => {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newPresetName, setNewPresetName] = useState<string>('');
  const [saveMode, setSaveMode] = useState<'new' | 'existing'>('new');

  // Load presets from storage
  useEffect(() => {
    const loadPresets = async () => {
      const storedPresets = await storage.get(CONFIG_PRESETS_KEY);
      if (storedPresets) {
        setPresets(storedPresets);
      }
    };
    
    loadPresets();
  }, []);

  const handleApplyPreset = () => {
    if (selectedPreset) {
      const preset = presets.find(p => p.name === selectedPreset);
      if (preset) {
        // Set isExpanded to false for all metrics when applying a preset
        const collapsedMetrics = preset.metrics.map(metric => ({
          ...metric,
          isExpanded: false
        }));
        onApplyPreset(collapsedMetrics);
      }
    }
  };

  const handleSaveAsPreset = () => {
    setIsDialogOpen(true);
    setSaveMode('new');
    setNewPresetName('');
  };

  const handleSavePreset = async (presetName: string, mode: 'new' | 'existing') => {
    let updatedPresets = [...presets];
    
    if (mode === 'new' && presetName.trim()) {
      // Add new preset
      updatedPresets.push({
        name: presetName.trim(),
        metrics: [...metrics]
      });
    } else if (mode === 'existing' && presetName) {
      // Update existing preset
      updatedPresets = updatedPresets.map(preset => 
        preset.name === presetName 
          ? { ...preset, metrics: [...metrics] } 
          : preset
      );
    }
    
    // Save to storage
    await storage.set(CONFIG_PRESETS_KEY, updatedPresets);
    setPresets(updatedPresets);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <SelectSearchWithNewButton
        menuList={presets.map(preset => ({
          value: preset.name,
          label: preset.name
        }))}
        menuType="Preset"
        value={selectedPreset}
        setValue={setSelectedPreset}
        onNewItem={handleSaveAsPreset}
        newItemLabel="Save as new preset"
      />
      
      <Button 
        onClick={handleApplyPreset} 
        disabled={!selectedPreset}
        variant="outline"
        size="sm"
        className="whitespace-nowrap"
      >
        Apply Preset
      </Button>
      
      <Button 
        onClick={handleSaveAsPreset}
        variant="outline"
        size="sm"
        className="whitespace-nowrap ml-auto"
      >
        Save as Preset
      </Button>

      <PresetDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSavePreset}
        presets={presets}
        selectedPreset={selectedPreset}
        setSelectedPreset={setSelectedPreset}
      />
    </div>
  );
};

export default PresetSelector;
