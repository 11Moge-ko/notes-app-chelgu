// components/FloatingActionButton/AddNoteMenu.tsx
import { useState, useRef, useEffect } from 'react';

interface AddNoteMenuProps {
  onNewNote: () => void;
  onFromTemplate: () => void;
  onPhotoNote: (file: File) => void;
}

export function AddNoteMenu({ onNewNote, onFromTemplate, onPhotoNote }: AddNoteMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (action: () => void) => {
    setIsOpen(false);
    action();
  };

  const handlePhotoSelect = () => {
    setIsOpen(false);
    setIsPhotoModalOpen(true);
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onPhotoNote(file);
    }
    setIsPhotoModalOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-20" ref={menuRef}>
        {isOpen && (
          <div className="absolute bottom-16 right-0 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden mb-2 min-w-45">
            <button
              onClick={() => handleSelect(onNewNote)}
              className="w-full text-left px-4 py-3 text-white hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <span>📝</span> Заметка
            </button>
            <button
              onClick={() => handleSelect(onFromTemplate)}
              className="w-full text-left px-4 py-3 text-white hover:bg-gray-800 transition-colors flex items-center gap-2 border-t border-gray-800"
            >
              <span>📋</span> Из шаблона
            </button>
            <button
              onClick={handlePhotoSelect}
              className="w-full text-left px-4 py-3 text-white hover:bg-gray-800 transition-colors flex items-center gap-2 border-t border-gray-800"
            >
              <span>🖼️</span> Фотозаметка
            </button>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white text-3xl font-bold leading-none rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center pb-1"
          title="Новая заметка (Ctrl+Enter)"
        >
          +
        </button>
      </div>

      {isPhotoModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setIsPhotoModalOpen(false)}
        >
          <div className="bg-black rounded-xl w-full max-w-md border-2 border-purple-600 p-6">
            <h2 className="text-white text-xl font-semibold mb-4">Выбрать фото</h2>
            <p className="text-gray-400 text-sm mb-4">
              Выберите изображение для фотозаметки
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelected}
              className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
            />
            <button
              onClick={() => setIsPhotoModalOpen(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </>
  );
}