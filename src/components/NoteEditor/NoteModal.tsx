// components/NoteEditor/NoteModal.tsx
import { useState, useEffect, useCallback } from 'react';
import type { Note, ListItem, BorderColor, NoteType } from '../../types';
import { generateId } from '../../utils/helpers';
import { TagInput } from '../ui/TagInput';
import { ColorPicker } from '../ui/ColorPicker';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onDelete?: (id: string) => void;
  initialNote?: Note | null;
  allTags?: string[];
  onSaveAsTemplate?: () => void;
  isTemplateLimitReached?: boolean;
}

const DRAFT_KEY = 'draft_v1';

export function NoteModal({ 
  isOpen, onClose, onSave, initialNote, allTags = [],
  onSaveAsTemplate, isTemplateLimitReached = false, onDelete
}: NoteModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<NoteType>('text');
  const [textContent, setTextContent] = useState('');
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [borderColor, setBorderColor] = useState<BorderColor>('#bc57ca');
  const [pinned, setPinned] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Полный сброс формы в пустое состояние
  const resetForm = () => {
    setTitle('');
    setType('text');
    setTextContent('');
    setListItems([]);
    setBorderColor('#bc57ca');
    setPinned(false);
    setTags([]);
    setError('');
  };

  // Очистка черновика
  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
  };

  // Преобразование текста в элемент списка
  const convertTextToListItems = (text: string): ListItem[] => {
    if (!text.trim()) return [];
    
    // Разбиваем текст по строкам
    const lines = text.split('\n');
    return lines.map((line, index) => ({
      id: generateId(),
      text: line,
      isChecked: false,
    }));
  };

  // Преобразование списка в текст
  const convertListItemsToText = (items: ListItem[]): string => {
    return items.map(item => item.text).join('\n');
  };

  // Обработчик переключения типа заметки
  const handleTypeChange = (newType: NoteType) => {
    if (newType === type) return;
    
    if (newType === 'list' && type === 'text') {
      // Текст → Список: преобразуем текст в элементы списка
      if (textContent.trim()) {
        const newListItems = convertTextToListItems(textContent);
        setListItems(newListItems);
        setTextContent('');
      }
    } else if (newType === 'text' && type === 'list') {
      // Список → Текст: преобразуем список в текст
      if (listItems.length > 0) {
        const newTextContent = convertListItemsToText(listItems);
        setTextContent(newTextContent);
        setListItems([]);
      }
    }
    
    setType(newType);
  };

  // Загрузка данных при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      if (initialNote) {
        // Редактирование существующей заметки — загружаем её данные
        setTitle(initialNote.title || '');
        setType(initialNote.type);
        setBorderColor(initialNote.borderColor);
        setPinned(initialNote.pinned);
        setTags(initialNote.tags || []);
        
        if (initialNote.type === 'list' && Array.isArray(initialNote.content)) {
          setListItems(initialNote.content);
          setTextContent('');
        } else {
          setTextContent(typeof initialNote.content === 'string' ? initialNote.content : '');
          setListItems([]);
        }
        setError('');
      } else {
        // Создание новой заметки — всегда чистая форма
        resetForm();
        clearDraft();
      }
    }
  }, [isOpen, initialNote]);

  // Автосохранение черновика (только при редактировании существующей заметки)
  useEffect(() => {
    if (!isOpen || !initialNote) return;
    
    const hasContent = title.trim() || 
                       textContent.trim() || 
                       listItems.length > 0 ||
                       tags.length > 0;
    
    if (!hasContent) return;
    
    const draft = { title, type, borderColor, pinned, tags, textContent, listItems };
    const interval = setInterval(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    }, 30000);
    
    return () => clearInterval(interval);
  }, [isOpen, initialNote, title, type, borderColor, pinned, tags, textContent, listItems]);

  const handleClose = useCallback(() => {
    if (initialNote) {
      const hasContent = title.trim() || 
                         textContent.trim() || 
                         listItems.length > 0 ||
                         tags.length > 0;
      
      if (hasContent) {
        const draft = { title, type, borderColor, pinned, tags, textContent, listItems };
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      }
    }
    onClose();
  }, [initialNote, title, type, borderColor, pinned, tags, textContent, listItems, onClose]);

  const handleDelete = () => {
    if (!initialNote) return;
    onDelete?.(initialNote.id);
    clearDraft();
    resetForm();
    onClose();
  };

  const handleSave = () => {
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
    
    onSave({ title: title.trim(), content, type, borderColor, pinned, tags });
    clearDraft();
    resetForm();
    onClose();
  };

  const handleAddTag = (tag: string) => {
    if (tags.length < 5 && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const addListItem = () => {
    setListItems([...listItems, { id: generateId(), text: '', isChecked: false }]);
  };

  const updateListItem = (id: string, text: string) => {
    setListItems(listItems.map(item => item.id === id ? { ...item, text } : item));
  };

  const toggleListItem = (id: string) => {
    setListItems(listItems.map(item => item.id === id ? { ...item, isChecked: !item.isChecked } : item));
  };

  const deleteListItem = (id: string) => {
    setListItems(listItems.filter(item => item.id !== id));
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, handleClose]);

  const hasContent = type === 'text' 
    ? textContent.trim().length > 0 
    : listItems.some(item => item.text.trim().length > 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="bg-black rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2" style={{ borderColor }}>
        <div className="sticky top-0 bg-black border-b border-gray-800 p-4 flex justify-between items-center">
          <h2 className="text-white text-xl font-semibold">{initialNote ? 'Редактировать заметку' : 'Новая заметка'}</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white text-2xl leading-none">✕</button>
        </div>
        
        <div className="p-4 space-y-4">
          <input
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-900 text-white text-lg font-medium px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
          />
          
          {/* Переключение типа с сохранением контента */}
          <div className="flex gap-2">
            <button
              onClick={() => handleTypeChange('text')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                type === 'text' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              📝 Текст
            </button>
            <button
              onClick={() => handleTypeChange('list')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                type === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              ✓ Список
            </button>
          </div>
          
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
                  <button onClick={() => deleteListItem(item.id)} className="text-red-400 hover:text-red-300 px-2">🗑️</button>
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
          
          <TagInput tags={tags} onAddTag={handleAddTag} onRemoveTag={handleRemoveTag} existingTags={allTags} maxTags={5} />
          
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          
          <ColorPicker selectedColor={borderColor} onColorChange={setBorderColor} />
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPinned(!pinned)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                pinned ? 'bg-yellow-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <span>📌</span>
              <span>{pinned ? 'Закреплено' : 'Закрепить'}</span>
            </button>
          </div>
          
          <div className="flex gap-3 pt-4 border-t border-gray-800">
            {initialNote && onDelete && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/50 rounded-lg hover:bg-red-600/30 transition-colors"
              >
                Удалить
              </button>
            )}
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

          {onSaveAsTemplate && (
            <button
              onClick={onSaveAsTemplate}
              disabled={!hasContent || isTemplateLimitReached}
              className={`w-full mt-3 px-4 py-2 rounded-lg transition-colors ${
                hasContent && !isTemplateLimitReached
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-800 text-gray-600 cursor-not-allowed'
              }`}
              title={
                !hasContent 
                  ? 'Заполните содержание заметки' 
                  : isTemplateLimitReached 
                    ? 'Достигнут лимит шаблонов (20)' 
                    : ''
              }
            >
              📋 Сохранить как шаблон
            </button>
          )}

          {isTemplateLimitReached && (
            <div className="text-yellow-500 text-sm text-center">
              Достигнут лимит шаблонов (20). Удалите неиспользуемый
            </div>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90"
          onClick={(e) => e.target === e.currentTarget && setShowDeleteConfirm(false)}
        >
          <div className="bg-black rounded-xl w-full max-w-md border-2 border-red-600 p-6">
            <h3 className="text-white text-lg font-semibold mb-3">Удалить заметку?</h3>
            <p className="text-gray-400 text-sm mb-5">
              Вы уверены? Вернуть заметку будет нельзя.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Нет
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Да, удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}