// components/NoteCard.tsx
import type { Note, ListItem } from '../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface NoteCardProps {
  note: Note;
  onTogglePin?: (id: string) => void;
}

export function NoteCard({ note, onTogglePin }: NoteCardProps) {
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

  const getListStats = (): { completed: number; total: number } | null => {
    if (note.type === 'list' && Array.isArray(note.content)) {
      const items = note.content as ListItem[];
      const total = items.length;
      const completed = items.filter(item => item.isChecked).length;
      return { completed, total };
    }
    return null;
  };

  const preview = getContentPreview();
  const listStats = getListStats();

  const getBorderColorClass = () => {
    switch (note.borderColor) {
      case '#bc57ca': return 'border-purple';
      case '#ff3856': return 'border-pink';
      case '#38b6ff': return 'border-blue';
      case '#57ca8e': return 'border-green';
      default: return 'border-purple';
    }
  };

  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTogglePin?.(note.id);
  };

  // Объединённый стиль
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
        border-2 ${getBorderColorClass()}
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
      <div className="flex justify-between items-start gap-2 mb-2">
        <h3 className="text-white font-medium text-lg wrap-break-word flex-1">
          {note.title || 'Без заголовка'}
        </h3>
        <button
          onClick={handlePinClick}
          className={`text-base shrink-0 transition-colors ${
            note.pinned ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'
          }`}
          title={note.pinned ? 'Открепить' : 'Закрепить'}
        >
          📌
        </button>
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
      
      <div className="text-secondary text-sm whitespace-pre-line wrap-break-word">
        {preview || <span className="text-muted">Нет содержания</span>}
      </div>
      
      {listStats && (
        <div className="text-muted text-xs mt-3 pt-2 border-t border-gray-800">
          ✓ {listStats.completed} / {listStats.total} выполнено
        </div>
      )}

      {note.type === 'photo' && !note.hasImage && (
        <div className="text-muted text-xs mt-3 pt-2 border-t border-gray-800">🖼️ Без фото</div>
      )}
      
      <div className="text-muted text-xs mt-2 opacity-50">
        {note.type === 'list' && '📋'}
        {note.type === 'text' && '📝'}
        {note.type === 'photo' && '🖼️'}
      </div>
    </div>
  );
}