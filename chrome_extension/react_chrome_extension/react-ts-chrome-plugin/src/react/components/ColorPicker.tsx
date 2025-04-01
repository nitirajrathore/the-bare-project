import React, { useState, useRef, useEffect } from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  
  // Predefined colors for a modern look
  const colorOptions = [
    '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', 
    '#536DFE', '#448AFF', '#40C4FF', '#18FFFF',
    '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41',
    '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'
  ];

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={pickerRef}>
      <button
        type="button"
        className="w-8 h-8 rounded border border-gray-300 shadow-sm"
        style={{ backgroundColor: color }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select color"
      />
      
      {isOpen && (
        <div className="absolute z-10 mt-1 p-2 bg-white rounded shadow-lg grid grid-cols-4 gap-1">
          {colorOptions.map((c) => (
            <button
              key={c}
              type="button"
              className="w-6 h-6 rounded-full border border-gray-200 hover:scale-110 transition-transform"
              style={{ backgroundColor: c }}
              onClick={() => {
                onChange(c);
                setIsOpen(false);
              }}
              aria-label={`Color ${c}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
