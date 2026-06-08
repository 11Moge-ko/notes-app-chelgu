import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import type { Settings } from '../../types';

interface FilterBarProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
  allTags: string[];
}

export const FilterBar = forwardRef<{ close: () => void }, FilterBarProps>(({ settings, onSettingsChange, allTags }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    close: () => {
      setIsOpen(false);
      setIsSettingsOpen(false);
    },
  }));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
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
        ? settings.filters.selectedTags.filter((t: string) => t !== tag)
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

  const handleThemeChange = () => {
    const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
    onSettingsChange({ ...settings, theme: newTheme });
    
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
      document.body.style.background = '#ffffff';
    } else {
      document.documentElement.classList.remove('light');
      document.body.style.background = 'var(--bg-app)';
    }
  };

  const handleExportData = () => {
    const notes = localStorage.getItem('notes_v1');
    const templates = localStorage.getItem('templates_v1');
    const settingsData = localStorage.getItem('settings_v1');
    const exportData = {
      notes: notes ? JSON.parse(notes) : [],
      templates: templates ? JSON.parse(templates) : [],
      settings: settingsData ? JSON.parse(settingsData) : {},
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

    const handleImportData = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/json,.json';
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;
        
        try {
          const text = await file.text();
          const data = JSON.parse(text);
          
          // Поддержка двух форматов:
          // 1. Полная структура { notes, templates, settings, exportDate }
          // 2. Просто массив заметок (для обратной совместимости)
          const notes = Array.isArray(data) ? data : data.notes;
          const templates = data.templates;
          const settings = data.settings;
          
          if (!notes || !Array.isArray(notes)) {
            alert('Неверный формат файла: отсутствуют заметки');
            return;
          }
          
          const proceed = confirm(
            `Импорт ${notes.length} заметок${templates ? ` и ${templates.length} шаблонов` : ''}.\n\n` +
            `Текущие данные будут ЗАМЕНЕНЫ. Продолжить?`
          );
          
          if (!proceed) return;
          
          localStorage.setItem('notes_v1', JSON.stringify(notes));
          if (templates && Array.isArray(templates)) {
            localStorage.setItem('templates_v1', JSON.stringify(templates));
          }
          if (settings && typeof settings === 'object') {
            localStorage.setItem('settings_v1', JSON.stringify(settings));
          }
          
          window.location.reload();
        } catch (error) {
          console.error('Ошибка импорта:', error);
          alert('Не удалось прочитать файл. Убедитесь, что это корректный JSON.');
        }
      };
      input.click();
  };

  const handleClearAllData = () => {
    if (confirm('Вы уверены? Вернуть заметки будет нельзя!')) {
      localStorage.removeItem('notes_v1');
      localStorage.removeItem('draft_v1');
      indexedDB.deleteDatabase('NotesAppDB');
      window.location.reload();
    }
  };

  const activeFiltersCount = [
    settings.filters.pinnedOnly,
    settings.filters.hasImageOnly,
    settings.filters.selectedTags.length > 0
  ].filter(Boolean).length;

  return (
    <div className="mb-6 flex gap-3 items-center flex-wrap">
      <select
        value={settings.sortBy}
        onChange={(e) => handleSortChange(e.target.value as 'createdAt' | 'updatedAt')}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 cursor-pointer"
      >
        <option value="updatedAt">📅 По дате изменения</option>
        <option value="createdAt">✨ По дате создания</option>
      </select>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isOpen || activeFiltersCount > 0
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          🔽 Фильтры
          {activeFiltersCount > 0 && (
            <span className="bg-yellow-500 text-black text-xs px-1.5 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
            <div className="p-3 space-y-3">
              <div className="text-white text-sm font-medium border-b border-gray-700 pb-2">Фильтры</div>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.filters.pinnedOnly}
                  onChange={(e) => handleFilterChange('pinnedOnly', e.target.checked)}
                  className="w-4 h-4 accent-purple-600"
                />
                <span className="text-gray-300 text-sm">📌 Только закреплённые</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.filters.hasImageOnly}
                  onChange={(e) => handleFilterChange('hasImageOnly', e.target.checked)}
                  className="w-4 h-4 accent-purple-600"
                />
                <span className="text-gray-300 text-sm">🖼️ Только с фото</span>
              </label>
              
              {allTags.length > 0 && (
                <div className="border-t border-gray-700 pt-2 mt-1">
                  <div className="text-gray-400 text-xs mb-2">Теги:</div>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag: string) => (
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
              
              {activeFiltersCount > 0 && (
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

      <div className="relative" ref={settingsRef}>
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="bg-gray-800 text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          ⚙️ Настройки
        </button>

        {isSettingsOpen && (
          <div className="absolute top-full right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
            <div className="p-2 space-y-1">
              <button
                onClick={handleThemeChange}
                className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <span>{settings.theme === 'dark' ? '🌞' : '🌙'}</span>
                {settings.theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
              </button>
              <button
                onClick={handleExportData}
                className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
              >
                📤 Экспорт в JSON
              </button>
              <button
                onClick={handleImportData}
                className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
              >
                📥 Импорт из JSON
              </button>
              <button
                onClick={handleClearAllData}
                className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors flex items-center gap-2"
              >
                🗑️ Стереть все заметки
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

FilterBar.displayName = 'FilterBar';