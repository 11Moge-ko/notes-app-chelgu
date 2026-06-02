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

  return (
    <div className="bg-black border border-white rounded-lg p-4 hover:border-gray-400 transition-colors">
      {/* Заголовок */}
      <h3 className="text-white font-medium text-lg mb-2">
        {note.title || 'Без заголовка'}
      </h3>
      
      {/* Превью контента */}
      <div className="text-gray-300 text-sm whitespace-pre-line">
        {preview || <span className="text-gray-500">Нет содержания</span>}
      </div>
      
      {/* Статистика для списка */}
      {listStats && (
        <div className="text-gray-400 text-xs mt-2">
          ✓ {listStats.completed} / {listStats.total} выполнено
        </div>
      )}
      
      {/* Индикатор типа заметки */}
      <div className="text-gray-500 text-xs mt-2">
        {note.type === 'list' && '📋 Список'}
        {note.type === 'text' && '📝 Текст'}
        {note.type === 'photo' && '🖼️ Фото'}
      </div>
    </div>
  );
}