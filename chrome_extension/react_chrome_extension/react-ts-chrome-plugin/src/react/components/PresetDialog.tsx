import React, { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import SelectSearchWithNewButton from './SelectSearchWithNewButton';
import { Preset } from './PresetSelector';

interface PresetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (presetName: string, mode: 'new' | 'existing') => void;
  presets: Preset[];
  selectedPreset: string;
  setSelectedPreset: (value: string) => void;
}

const PresetDialog: React.FC<PresetDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  presets,
  selectedPreset,
  setSelectedPreset
}) => {
  const [saveMode, setSaveMode] = useState<'new' | 'existing'>('new');
  const [newPresetName, setNewPresetName] = useState<string>('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Save Preset</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          {saveMode === 'new' ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="preset-name" className="text-right col-span-1">
                Name
              </Label>
              <Input
                id="preset-name"
                value={newPresetName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPresetName(e.target.value)}
                className="col-span-3"
                placeholder="Enter preset name"
              />
            </div>
          ) : (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right col-span-1">Preset</Label>
              <div className="col-span-3">
                <SelectSearchWithNewButton
                  menuList={presets.map(preset => ({
                    value: preset.name,
                    label: preset.name
                  }))}
                  menuType="Preset"
                  value={selectedPreset}
                  setValue={setSelectedPreset}
                />
              </div>
            </div>
          )}
          
          {presets.length > 0 && (
            <div className="flex justify-end">
              <Button 
                variant="link" 
                onClick={() => setSaveMode(saveMode === 'new' ? 'existing' : 'new')}
              >
                {saveMode === 'new' ? 'Update existing preset' : 'Create new preset'}
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={() => {
              if (saveMode === 'new') {
                onSave(newPresetName, 'new');
              } else {
                onSave(selectedPreset, 'existing');
              }
            }}
            disabled={saveMode === 'new' ? !newPresetName.trim() : !selectedPreset}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PresetDialog;
