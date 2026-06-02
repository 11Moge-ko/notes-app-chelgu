// components/NoteCard.tsx
import type { Note, ListItem } from '../types';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  // Получить превью контента (первые 3 строки)
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

  // Получить статистику для списка
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

  // Цвет обводки из CSS-переменной
  const getBorderColorClass = () => {
    switch (note.borderColor) {
      case '#bc57ca': return 'border-purple';
      case '#ff3856': return 'border-pink';
      case '#38b6ff': return 'border-blue';
      case '#57ca8e': return 'border-green';
      default: return 'border-purple';
    }
  };

  return (
    <div 
      className={`
        bg-black rounded-xl p-4 
        border-2 ${getBorderColorClass()}
        transition-all duration-100 
        hover:-translate-y-0.5 hover:shadow-lg hover:shadow-current/20
        break-inside-avoid mb-4
      `}
      style={{ 
        borderColor: note.borderColor,
        boxShadow: `0 0 0 0 ${note.borderColor}40`
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 4px 12px 0 ${note.borderColor}60`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Заголовок с иконкой закрепления */}
      <div className="flex justify-between items-start gap-2 mb-2">
        <h3 className="text-white font-medium text-lg wrap-break-word flex-1">
          {note.title || 'Без заголовка'}
        </h3>
        {note.pinned && (
          <span className="text-yellow-400 text-base shrink-0" title="Закреплено">
            📌
          </span>
        )}
      </div>
      
      {/* Превью контента */}
      <div className="text-secondary text-sm whitespace-pre-line wrap-break-word">
        {preview || <span className="text-muted">Нет содержания</span>}
      </div>
      
      {/* Статистика для списка */}
      {listStats && (
        <div className="text-muted text-xs mt-3 pt-2 border-t border-gray-800">
          ✓ {listStats.completed} / {listStats.total} выполнено
        </div>
      )}

      {/* Placeholder для фотозаметок */}
      {note.type === 'photo' && !note.hasImage && (
        <div className="text-muted text-xs mt-3 pt-2 border-t border-gray-800">
          🖼️ Без фото
        </div>
      )}
      
      {/* Индикатор типа заметки */}
      <div className="text-muted text-xs mt-2 opacity-50">
        {note.type === 'list' && '📋'}
        {note.type === 'text' && '📝'}
        {note.type === 'photo' && '🖼️'}
      </div>
    </div>
  );
}