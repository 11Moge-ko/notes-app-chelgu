// components/ui/ColorPicker.tsx
import type { BorderColor } from '../../types';

interface ColorPickerProps {
  selectedColor: BorderColor;
  onColorChange: (color: BorderColor) => void;
}

const colors: { value: BorderColor; label: string }[] = [
  { value: '#bc57ca', label: 'Фиолетовый' },
  { value: '#ff3856', label: 'Розовый' },
  { value: '#38b6ff', label: 'Голубой' },
  { value: '#57ca8e', label: 'Зелёный' },
];

export function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <label className="text-gray-400 text-sm">Цвет обводки</label>
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`
              w-8 h-8 rounded-full transition-all duration-200
              hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white
              ${selectedColor === color.value ? 'ring-2 ring-white scale-110' : 'ring-0'}
            `}
            style={{ backgroundColor: color.value }}
            title={color.label}
          />
        ))}
      </div>
    </div>
  );
}