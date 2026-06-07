// components/NoteEditor/NoteModal.tsx
import { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import type { Note, ListItem, BorderColor, NoteType } from '../../types';
import { generateId } from '../../utils/helpers';
import { TagInput } from '../ui/TagInput';
import { ColorPicker } from '../ui/ColorPicker';
import { getNoteImage, saveNoteImage, deleteNoteImage } from '../../services/indexedDB';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onDelete?: (id: string) => void;
  initialNote?: Note | null;
  allTags?: string[];
  onImageSaved?: (noteId: string, base64: string) => void;
  onSaveAsTemplate?: () => void;
  isTemplateLimitReached?: boolean;
}

const DRAFT_KEY = 'draft_v1';

export const NoteModal = forwardRef<{ save: () => void }, NoteModalProps>(({ 
  isOpen, onClose, onSave, initialNote, allTags = [],
  onDelete, onImageSaved, onSaveAsTemplate, isTemplateLimitReached = false
}, ref) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<NoteType>('text');
  const [textContent, setTextContent] = useState('');
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [borderColor, setBorderColor] = useState<BorderColor>('#bc57ca');
  const [pinned, setPinned] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [savedImageId, setSavedImageId] = useState<string | null>(null);

  const resetForm = () => {
    setTitle('');
    setType('text');
    setTextContent('');
    setListItems([]);
    setBorderColor('#bc57ca');
    setPinned(false);
    setTags([]);
    setError('');
    setSelectedImage(null);
    setImagePreview(null);
    setSavedImageId(null);
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
  };

  const convertTextToListItems = (text: string): ListItem[] => {
    if (!text.trim()) return [];
    const lines = text.split('\n');
    return lines.map((line) => ({
      id: generateId(),
      text: line,
      isChecked: false,
    }));
  };

  const convertListItemsToText = (items: ListItem[]): string => {
    return items.map(item => item.text).join('\n');
  };

  const handleTypeChange = (newType: NoteType) => {
    if (newType === type) return;
    
    if (newType === 'list' && type === 'text') {
      if (textContent.trim()) {
        setListItems(convertTextToListItems(textContent));
        setTextContent('');
      }
    } else if (newType === 'text' && type === 'list') {
      if (listItems.length > 0) {
        setTextContent(convertListItemsToText(listItems));
        setListItems([]);
      }
    }
    
    setType(newType);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    // Если есть сохранённое фото, удаляем его из IndexedDB
    if (savedImageId) {
      deleteNoteImage(savedImageId);
      setSavedImageId(null);
    }
  };

  // Загрузка существующего фото при открытии
  useEffect(() => {
    if (isOpen && initialNote && initialNote.type === 'photo' && initialNote.hasImage) {
      setIsImageLoading(true);
      getNoteImage(initialNote.id).then(base64 => {
        if (base64) {
          setImagePreview(base64);
          setSavedImageId(initialNote.id);
        }
        setIsImageLoading(false);
      });
    }
  }, [isOpen, initialNote]);

  useEffect(() => {
    if (isOpen) {
      if (initialNote) {
        setTitle(initialNote.title || '');
        setType(initialNote.type);
        setBorderColor(initialNote.borderColor);
        setPinned(initialNote.pinned);
        setTags(initialNote.tags || []);
        
        if (initialNote.type === 'list' && Array.isArray(initialNote.content)) {
          setListItems(initialNote.content);
          setTextContent('');
        } else if (initialNote.type === 'photo') {
          setTextContent(typeof initialNote.content === 'string' ? initialNote.content : '');
          setListItems([]);
        } else {
          setTextContent(typeof initialNote.content === 'string' ? initialNote.content : '');
          setListItems([]);
        }
        setError('');
      } else {
        resetForm();
        clearDraft();
      }
    }
  }, [isOpen, initialNote]);

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
    if (initialNote.type === 'photo' && initialNote.hasImage) {
      deleteNoteImage(initialNote.id);
    }
    onDelete?.(initialNote.id);
    clearDraft();
    resetForm();
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleSave = useCallback(async () => {
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
    } else if (type === 'photo') {
      if (textContent.trim().length >= 1 || imagePreview) {
        isValid = true;
        content = textContent;
      }
    }
    
    if (!isValid) {
      setError('Содержание не может быть пустым');
      return;
    }
    
    let savedImageBase64: string | undefined = undefined;
    let noteIdForImage = initialNote?.id;
    
    if (type === 'photo') {
      if (selectedImage) {
        // Новое фото: сохраняем во временный ID или в ID заметки
        const tempId = noteIdForImage || generateId();
        savedImageBase64 = await saveNoteImage(tempId, selectedImage);
        setSavedImageId(tempId);
        onImageSaved?.(tempId, savedImageBase64);
        noteIdForImage = tempId;
      } else if (imagePreview && savedImageId) {
        // Фото уже сохранено
        savedImageBase64 = imagePreview;
      }
    }
    
    onSave({ 
      title: title.trim(), 
      content, 
      type, 
      borderColor, 
      pinned, 
      tags,
      hasImage: type === 'photo' && (!!selectedImage || !!imagePreview),
      imageUrl: savedImageBase64,
    });
    
    clearDraft();
    resetForm();
    onClose();
  }, [type, textContent, listItems, title, borderColor, pinned, tags, initialNote, selectedImage, imagePreview, savedImageId, onSave, onImageSaved, onClose]);

  useImperativeHandle(ref, () => ({
    save: () => {
      if (isOpen) {
        handleSave();
      }
    },
  }));

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
    : type === 'list'
      ? listItems.some(item => item.text.trim().length > 0)
      : textContent.trim().length > 0 || !!imagePreview;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
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
            <button
              onClick={() => handleTypeChange('photo')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                type === 'photo' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              🖼️ Фото
            </button>
          </div>
          
          {type === 'text' && (
            <textarea
              placeholder="Текст заметки..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              rows={8}
              className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 resize-none"
            />
          )}
          
          {type === 'list' && (
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
          
          {type === 'photo' && (
            <div className="space-y-3">
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center">
                {isImageLoading ? (
                  <div className="text-gray-400">Загрузка...</div>
                ) : imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-48 mx-auto rounded-lg object-contain"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <label className="cursor-pointer">
                      <span className="text-purple-400 hover:text-purple-300">📷 Загрузить фото</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </label>
                    <p className="text-gray-500 text-xs mt-2">PNG, JPG, GIF до 5MB</p>
                  </>
                )}
              </div>
              <textarea
                placeholder="Текст под фото..."
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                rows={4}
                className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 resize-none"
              />
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

          {initialNote && onSaveAsTemplate && type !== 'photo' && (
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
                    : 'Сохранить текущую заметку как шаблон'
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
});

NoteModal.displayName = 'NoteModal';