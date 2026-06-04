import { useState, useRef, useEffect } from 'react';

interface AddNoteMenuProps {
  onNewNote: () => void;
  onFromTemplate: () => void;
}

export function AddNoteMenu({ onNewNote, onFromTemplate }: AddNoteMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="fixed bottom-6 right-6 z-20" ref={menuRef}>
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden mb-2 min-w-[180px]">
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
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white text-3xl font-bold leading-none rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center"
        title="Новая заметка"
      >
        +
      </button>
    </div>
  );
}