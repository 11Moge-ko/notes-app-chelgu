// components/FilterBar.tsx
import { useState, useRef, useEffect } from 'react';
import type { Settings } from '../types';

interface FilterBarProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
  allTags: string[];
}

export function FilterBar({ settings, onSettingsChange, allTags }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortChange = (sortBy: 'createdAt' | 'updatedAt') => {
    onSettingsChange({ ...settings, sortBy });
  };

  const handleFilterChange = (filterKey: keyof typeof settings.filters, value: boolean | string) => {
    if (filterKey === 'selectedTags') {
      const tag = value as string;
      const newTags = settings.filters.selectedTags.includes(tag)
        ? settings.filters.selectedTags.filter(t => t !== tag)
        : [...settings.filters.selectedTags, tag];
      onSettingsChange({
        ...settings,
        filters: { ...settings.filters, selectedTags: newTags }
      });
    } else {
      onSettingsChange({
        ...settings,
        filters: { ...settings.filters, [filterKey]: value as boolean }
      });
    }
  };

  return (
    <div className="mb-6 relative" ref={dropdownRef}>
      <div className="flex gap-3 items-center">
        {/* Сортировка */}
        <select
          value={settings.sortBy}
          onChange={(e) => handleSortChange(e.target.value as 'createdAt' | 'updatedAt')}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 cursor-pointer"
        >
          <option value="updatedAt">📅 По дате изменения</option>
          <option value="createdAt">✨ По дате создания</option>
        </select>

        {/* Кнопка фильтрации */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isOpen || Object.values(settings.filters).some(v => 
              typeof v === 'boolean' ? v : (Array.isArray(v) && v.length > 0)
            )
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          🔽 Фильтры
          {(settings.filters.pinnedOnly || settings.filters.hasImageOnly || settings.filters.selectedTags.length > 0) && (
            <span className="bg-yellow-500 text-black text-xs px-1.5 py-0.5 rounded-full">
              {[
                settings.filters.pinnedOnly && '📌',
                settings.filters.hasImageOnly && '🖼️',
                settings.filters.selectedTags.length > 0 && `${settings.filters.selectedTags.length}т`
              ].filter(Boolean).join(' ')}
            </span>
          )}
        </button>
      </div>

      {/* Выпадающее меню фильтров */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
          <div className="p-3 space-y-3">
            <div className="text-white text-sm font-medium border-b border-gray-700 pb-2">Фильтры</div>
            
            {/* Закреплённые */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.filters.pinnedOnly}
                onChange={(e) => handleFilterChange('pinnedOnly', e.target.checked)}
                className="w-4 h-4 accent-purple-600"
              />
              <span className="text-gray-300 text-sm">📌 Только закреплённые</span>
            </label>
            
            {/* С изображением */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.filters.hasImageOnly}
                onChange={(e) => handleFilterChange('hasImageOnly', e.target.checked)}
                className="w-4 h-4 accent-purple-600"
              />
              <span className="text-gray-300 text-sm">🖼️ Только с фото</span>
            </label>
            
            {/* Теги */}
            {allTags.length > 0 && (
              <div className="border-t border-gray-700 pt-2 mt-1">
                <div className="text-gray-400 text-xs mb-2">Теги:</div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <label key={tag} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.filters.selectedTags.includes(tag)}
                        onChange={() => handleFilterChange('selectedTags', tag)}
                        className="w-3.5 h-3.5 accent-purple-600"
                      />
                      <span className="text-gray-300 text-xs">#{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            {/* Сбросить фильтры */}
            {(settings.filters.pinnedOnly || settings.filters.hasImageOnly || settings.filters.selectedTags.length > 0) && (
              <button
                onClick={() => {
                  onSettingsChange({
                    ...settings,
                    filters: { pinnedOnly: false, hasImageOnly: false, selectedTags: [] }
                  });
                }}
                className="w-full mt-2 text-center text-xs text-purple-400 hover:text-purple-300 py-1 border-t border-gray-700"
              >
                Сбросить все фильтры
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}