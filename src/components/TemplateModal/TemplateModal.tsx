import { useState, useEffect } from 'react';
import type { Template } from '../../types';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
  templates: Template[];
  onDeleteTemplate?: (id: string) => void;
}

export function TemplateModal({ isOpen, onClose, onSelectTemplate, templates, onDeleteTemplate }: TemplateModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-black rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto border-2 border-purple-600">
        <div className="sticky top-0 bg-black border-b border-gray-800 p-4 flex justify-between items-center">
          <h2 className="text-white text-xl font-semibold">Выбрать шаблон</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">✕</button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск шаблона..."
              className="w-full bg-gray-900 text-white px-4 py-2 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
          </div>
          
          {filteredTemplates.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p>Нет сохранённых шаблонов</p>
              <p className="text-sm mt-2">Создайте первый, нажав "Сохранить как шаблон" в редакторе</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-gray-900 rounded-lg p-3 hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex justify-between items-start">
                    <div
                      onClick={() => onSelectTemplate(template)}
                      className="flex-1 cursor-pointer"
                    >
                      <h3 className="text-white font-medium">{template.name}</h3>
                      {template.description && (
                        <p className="text-gray-400 text-sm mt-1">{template.description}</p>
                      )}
                      <div className="flex gap-3 mt-2 text-xs text-gray-500">
                        <span>{template.type === 'text' ? '📝 Текст' : '✓ Список'}</span>
                        <span>📊 Использован: {template.usageCount} раз</span>
                      </div>
                    </div>
                    {onDeleteTemplate && (
                      <button
                        onClick={() => onDeleteTemplate(template.id)}
                        className="text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex gap-3 pt-4 border-t border-gray-800">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}