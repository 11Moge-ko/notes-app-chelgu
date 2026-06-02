// App.tsx
import { useEffect } from 'react';
import { useNotesStore } from './store/useNotesStore';
import { initDB } from './services/indexedDB';
import { NoteCard } from './components/NoteCard';

function App() {
  const { notes, isLoading, loadNotes, addNote, updateNote, deleteNote } = useNotesStore();

  useEffect(() => {
    loadNotes();
    initDB().catch(console.error);
    
    // Для тестирования из консоли
    (window as any).testNotes = { 
      addNote, 
      updateNote, 
      deleteNote, 
      getNotes: () => useNotesStore.getState().notes 
    };
  }, [loadNotes, addNote, updateNote, deleteNote]);

  // Разделяем заметки на закреплённые и обычные
  const pinnedNotes = notes.filter(n => n.pinned);
  const unpinnedNotes = notes.filter(n => !n.pinned);

  // Компонент для отображения секции заметок
  const NotesSection = ({ title, notesList }: { title: string; notesList: typeof notes }) => (
    <div className="mb-8">
      <h2 className="text-white text-xl font-semibold mb-4 pb-2 border-b border-gray-700">
        {title} ({notesList.length})
      </h2>
      {notesList.length === 0 ? (
        <div className="text-muted text-center py-8">
          {title === 'Закреплённые' ? 'Нет закреплённых заметок' : 'Нет обычных заметок'}
        </div>
      ) : (
        <div className="masonry-grid">
          {notesList.map((note) => (
            <div key={note.id} className="relative group">
              <NoteCard note={note} />
              {/* Кнопка удаления (временная, для тестирования) */}
              <button
                onClick={() => deleteNote(note.id)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Загрузка Notes App...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ background: 'var(--bg-app)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <h1 className="text-primary text-3xl font-bold mb-6">Notes App</h1>
        
        {/* Кнопки для тестирования */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => {
              const testNote = {
                title: 'Тестовая заметка',
                content: 'Это первая строка\nВторая строка\nТретья строка\nЧетвёртая строка',
                type: 'text' as const,
                borderColor: '#bc57ca' as const,
                pinned: false,
                tags: [],
              };
              addNote(testNote);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            + Текстовая
          </button>
          
          <button
            onClick={() => {
              const testList = {
                title: 'Мои задачи',
                content: [
                  { id: '1', text: 'Купить продукты', isChecked: true },
                  { id: '2', text: 'Сделать домашку', isChecked: false },
                  { id: '3', text: 'Позвонить маме', isChecked: false },
                  { id: '4', text: 'Сходить в спортзал', isChecked: false },
                ],
                type: 'list' as const,
                borderColor: '#38b6ff' as const,
                pinned: false,
                tags: [],
              };
              addNote(testList);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            + Список
          </button>

          <button
            onClick={() => {
              const pinnedNote = {
                title: 'Закреплённая заметка',
                content: 'Эта заметка всегда будет сверху',
                type: 'text' as const,
                borderColor: '#ff3856' as const,
                pinned: true,
                tags: [],
              };
              addNote(pinnedNote);
            }}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            📌 + Закреплённая
          </button>
        </div>
        
        {/* Статистика */}
        <p className="text-secondary mb-4">Всего заметок: {notes.length}</p>
        
        {/* Masonry Grid через CSS columns */}
        {notes.length === 0 ? (
          <div className="text-center text-muted py-12">
            <p>Нет заметок</p>
            <p className="text-sm mt-2">Нажмите кнопку выше, чтобы создать первую</p>
          </div>
        ) : (
          <>
            {/* Закреплённые заметки */}
            {pinnedNotes.length > 0 && (
              <NotesSection title="📌 Закреплённые" notesList={pinnedNotes} />
            )}
            
            {/* Обычные заметки */}
            <NotesSection title="Все заметки" notesList={unpinnedNotes} />
          </>
        )}
      </div>

      {/* Глобальные стили для Masonry Grid */}
      <style>{`
        .masonry-grid {
          column-count: 2;
          column-gap: 16px;
        }
        
        /* Планшеты (768px - 1023px) */
        @media (min-width: 768px) {
          .masonry-grid {
            column-count: 3;
          }
        }
        
        /* Десктоп (1024px+) */
        @media (min-width: 1024px) {
          .masonry-grid {
            column-count: 4;
          }
        }
        
        /* Крупные десктопы (1280px+) */
        @media (min-width: 1280px) {
          .masonry-grid {
            column-count: 5;
          }
        }
        
        .masonry-grid > * {
          break-inside: avoid;
          margin-bottom: 16px;
        }
      `}</style>
    </div>
  );
}

export default App;