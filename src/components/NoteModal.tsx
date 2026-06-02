// components/NoteModal.tsx
import { useState, useEffect, useCallback } from 'react';
import type { Note, ListItem, BorderColor, NoteType } from '../types';
import { generateId } from '../utils/helpers';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialNote?: Note | null;
}

const DRAFT_KEY = 'draft_v1';

export function NoteModal({ isOpen, onClose, onSave, initialNote }: NoteModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<NoteType>('text');
  const [textContent, setTextContent] = useState('');
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [borderColor, setBorderColor] = useState<BorderColor>('#bc57ca');
  const [pinned, setPinned] = useState(false);
  const [error, setError] = useState('');

  // Загрузка черновика или начальной заметки
  useEffect(() => {
    if (isOpen) {
      if (initialNote) {
        // Редактирование существующей заметки
        setTitle(initialNote.title || '');
        setType(initialNote.type);
        setBorderColor(initialNote.borderColor);
        setPinned(initialNote.pinned);
        
        if (initialNote.type === 'list' && Array.isArray(initialNote.content)) {
          setListItems(initialNote.content);
          setTextContent('');
        } else {
          setTextContent(typeof initialNote.content === 'string' ? initialNote.content : '');
          setListItems([]);
        }
        setError('');
      } else {
        // Загрузка черновика
        const draft = localStorage.getItem(DRAFT_KEY);
        if (draft) {
          try {
            const draftData = JSON.parse(draft);
            setTitle(draftData.title || '');
            setType(draftData.type || 'text');
            setBorderColor(draftData.borderColor || '#bc57ca');
            setPinned(draftData.pinned || false);
            setTextContent(draftData.textContent || '');
            setListItems(draftData.listItems || []);
          } catch {
            resetForm();
          }
        } else {
          resetForm();
        }
      }
    }
  }, [isOpen, initialNote]);

  // Автосохранение черновика каждые 30 секунд
  useEffect(() => {
    if (!isOpen) return;
    
    const draft = {
      title,
      type,
      borderColor,
      pinned,
      textContent,
      listItems,
    };
    
    const interval = setInterval(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      console.log('💾 Черновик сохранён');
    }, 30000);
    
    return () => clearInterval(interval);
  }, [isOpen, title, type, borderColor, pinned, textContent, listItems]);

  const resetForm = () => {
    setTitle('');
    setType('text');
    setTextContent('');
    setListItems([]);
    setBorderColor('#bc57ca');
    setPinned(false);
    setError('');
  };

  const handleClose = useCallback(() => {
    // Сохраняем черновик перед закрытием
    const draft = {
      title,
      type,
      borderColor,
      pinned,
      textContent,
      listItems,
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    onClose();
  }, [title, type, borderColor, pinned, textContent, listItems, onClose]);

  const handleSave = () => {
    // Валидация
    let isValid = false;
    let content: string | ListItem[] = '';
    
    if (type === 'text') {
      if (textContent.trim().length >= 1) {
        isValid = true;
        content = textContent;
      }
    } else if (type === 'list') {
      const validItems = listItems.filter(item => item.text.trim());
      if (validItems.length >= 1) {
        isValid = true;
        content = listItems;
      }
    }
    
    if (!isValid) {
      setError('Содержание не может быть пустым');
      return;
    }
    
    const noteData = {
      title: title.trim(),
      content,
      type,
      borderColor,
      pinned,
      tags: initialNote?.tags || [],
    };
    
    onSave(noteData);
    
    // Очищаем черновик после успешного сохранения
    localStorage.removeItem(DRAFT_KEY);
    resetForm();
    onClose();
  };

  // Управление элементами списка
  const addListItem = () => {
    const newItem: ListItem = {
      id: generateId(),
      text: '',
      isChecked: false,
    };
    setListItems([...listItems, newItem]);
  };

  const updateListItem = (id: string, text: string) => {
    setListItems(listItems.map(item =>
      item.id === id ? { ...item, text } : item
    ));
  };

  const toggleListItem = (id: string) => {
    setListItems(listItems.map(item =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    ));
  };

  const deleteListItem = (id: string) => {
    setListItems(listItems.filter(item => item.id !== id));
  };

  // Обработка Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const colors: BorderColor[] = ['#bc57ca', '#ff3856', '#38b6ff', '#57ca8e'];

  // Мобильные стили
  const modalClasses = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm';
  const contentClasses = 'bg-black rounded-xl w-full overflow-y-auto border-2'
    + ' max-w-2xl max-h-[90vh]'
    + ' mobile:fixed mobile:inset-0 mobile:max-w-none mobile:rounded-none mobile:max-h-none';

  return (
    <div className={modalClasses} onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className={contentClasses} style={{ borderColor }}>
        {/* Заголовок */}
        <div className="sticky top-0 bg-black border-b border-gray-800 p-4 flex justify-between items-center">
          <h2 className="text-white text-xl font-semibold">
            {initialNote ? 'Редактировать заметку' : 'Новая заметка'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white text-2xl leading-none"
          >
            ✕
          </button>
        </div>
        
        {/* Форма */}
        <div className="p-4 space-y-4">
          {/* Заголовок */}
          <input
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-900 text-white text-lg font-medium px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
          />
          
          {/* Переключение типа */}
          <div className="flex gap-2">
            <button
              onClick={() => setType('text')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                type === 'text'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              📝 Текст
            </button>
            <button
              onClick={() => setType('list')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                type === 'list'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              ✓ Список
            </button>
          </div>
          
          {/* Контент */}
          {type === 'text' ? (
            <textarea
              placeholder="Текст заметки..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              rows={8}
              className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 resize-none"
            />
          ) : (
            <div className="space-y-2">
              {listItems.map((item) => (
                <div key={item.id} className="flex items-center gap-2 bg-gray-900 rounded-lg p-2">
                  <input
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={() => toggleListItem(item.id)}
                    className="w-5 h-5 accent-purple-600"
                  />
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => updateListItem(item.id, e.target.value)}
                    placeholder="Пункт списка..."
                    className="flex-1 bg-transparent text-white px-2 py-1 focus:outline-none"
                  />
                  <button
                    onClick={() => deleteListItem(item.id)}
                    className="text-red-400 hover:text-red-300 px-2"
                  >
                    🗑️
                  </button>
                </div>
              ))}
              <button
                onClick={addListItem}
                className="w-full text-gray-400 hover:text-white text-sm py-2 border border-dashed border-gray-700 rounded-lg hover:border-gray-500 transition-colors"
              >
                + Добавить пункт
              </button>
            </div>
          )}
          
          {/* Ошибка валидации */}
          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}
          
          {/* Выбор цвета обводки */}
          <div className="space-y-2">
            <label className="text-gray-400 text-sm">Цвет обводки</label>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setBorderColor(color)}
                  className={`w-8 h-8 rounded-full transition-all ${
                    borderColor === color ? 'ring-2 ring-white scale-110' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          
          {/* Закрепить */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPinned(!pinned)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                pinned
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <span>📌</span>
              <span>{pinned ? 'Закреплено' : 'Закрепить'}</span>
            </button>
          </div>
          
          {/* Кнопки */}
          <div className="flex gap-3 pt-4 border-t border-gray-800">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
      
      {/* Стили для мобильного fullscreen */}
      <style>{`
        @media (max-width: 767px) {
          .mobile\\:fixed {
            position: fixed !important;
            inset: 0 !important;
            max-width: none !important;
            border-radius: 0 !important;
            max-height: none !important;
          }
        }
      `}</style>
    </div>
  );
}