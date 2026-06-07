// components/NoteCard/NoteCard.tsx
import { useState, useEffect } from 'react';
import type { Note, ListItem } from '../../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getNoteImage } from '../../services/indexedDB';

interface NoteCardProps {
  note: Note;
  onTogglePin?: (id: string) => void;
}

export function NoteCard({ note, onTogglePin }: NoteCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: note.id });

  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  useEffect(() => {
    if (note.type === 'photo' && note.hasImage) {
      setIsImageLoading(true);
      getNoteImage(note.id).then(base64 => {
        if (base64) {
          setImageUrl(base64);
        }
        setIsImageLoading(false);
      }).catch(() => {
        setIsImageLoading(false);
      });
    }
  }, [note.id, note.type, note.hasImage]);

  const getContentPreview = (): string => {
    if (note.type === 'list' && Array.isArray(note.content)) {
      const items = (note.content as ListItem[]).slice(0, 3);
      return items.map(item => `• ${item.text}`).join('\n');
    }
    if (typeof note.content === 'string') {
      return note.content.split('\n').slice(0, 3).join('\n');
    }
    return '';
  };

  const preview = getContentPreview();

  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onTogglePin?.(note.id);
  };

  const isPinned = note.pinned === true;

  const combinedStyle = {
    borderColor: note.borderColor,
    boxShadow: `0 0 0 0 ${note.borderColor}40`,
    ...dragStyle,
  };

  return (
    <div
      ref={setNodeRef}
      style={combinedStyle}
      {...attributes}
      {...listeners}
      className={`
        bg-black rounded-xl p-4 
        border-2
        transition-all duration-100 
        hover:-translate-y-0.5 hover:shadow-lg hover:shadow-current/20
        break-inside-avoid mb-4
        cursor-grab active:cursor-grabbing
        ${isDragging ? 'cursor-grabbing' : ''}
      `}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 4px 12px 0 ${note.borderColor}60`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {note.type === 'photo' ? (
        <div className="flex gap-3">
          <div className="shrink-0">
            {isImageLoading ? (
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-xs">...</span>
              </div>
            ) : imageUrl ? (
              <img 
                src={imageUrl} 
                alt="preview" 
                className="w-16 h-16 object-cover rounded-lg"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🖼️</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2 mb-2">
              <h3 className="text-white font-medium text-lg wrap-break-word overflow-hidden flex-1 min-w-0">
                {note.title || 'Без заголовка'}
              </h3>
              {isPinned && (
                <button
                  onClick={handlePinClick}
                  className="text-base shrink-0 text-yellow-400 scale-110 transition-all duration-200 hover:scale-125"
                  title="Открепить"
                >
                  📌
                </button>
              )}
            </div>
            
            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {note.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="bg-gray-800 text-gray-300 text-xs px-2 py-0.5 rounded-full">
                    #{tag}
                  </span>
                ))}
                {note.tags.length > 3 && (
                  <span className="text-gray-500 text-xs">+{note.tags.length - 3}</span>
                )}
              </div>
            )}
            
            <div className="text-secondary text-sm whitespace-pre-line wrap-break-word overflow-hidden max-h-40">
              {preview || <span className="text-muted">Нет текста</span>}
            </div>
            
            <div className="text-muted text-xs mt-2 opacity-50">
              🖼️ Фото
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-white font-medium text-lg wrap-break-word overflow-hidden flex-1 min-w-0">
              {note.title || 'Без заголовка'}
            </h3>
            {isPinned && (
              <button
                onClick={handlePinClick}
                className="text-base shrink-0 text-yellow-400 scale-110 transition-all duration-200 hover:scale-125"
                title="Открепить"
              >
                📌
              </button>
            )}
          </div>
          
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {note.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="bg-gray-800 text-gray-300 text-xs px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
              {note.tags.length > 3 && (
                <span className="text-gray-500 text-xs">+{note.tags.length - 3}</span>
              )}
            </div>
          )}
          
          <div className="text-secondary text-base whitespace-pre-line wrap-break-word overflow-hidden max-h-40">
            {preview || <span className="text-muted">Нет текста</span>}
          </div>
          
          <div className="text-muted text-xs mt-2 opacity-50">
            {note.type === 'list' && '📋'}
            {note.type === 'text' && '📝'}
          </div>
        </>
      )}
    </div>
  );
}