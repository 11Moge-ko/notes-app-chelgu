// App.tsx

import { useEffect, useState } from 'react';
import { useNotesStore } from './store/useNotesStore';
import { initDB } from './services/indexedDB';
import { NoteModal } from './components/NoteModal';
import { SortableNotesSection } from './components/SortableNotesSection';
import { useDebounce } from './hooks/useDebounce';
import type { Note } from './types';


function App() {
  const { notes, isLoading, loadNotes, addNote, updateNote, deleteNote, togglePin, reorderNotes } = useNotesStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    loadNotes();
    initDB().catch(console.error);
    (window as any).testNotes = { 
      addNote, 
      updateNote, 
      deleteNote, 
      togglePin,
      getNotes: () => useNotesStore.getState().notes 
    };
  }, [loadNotes, addNote, updateNote, deleteNote, togglePin]);

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags || [])));

  // Функция поиска
  const filterNotesBySearch = (notesList: Note[], query: string): Note[] => {
    if (!query.trim()) return notesList;
    
    const lowerQuery = query.toLowerCase();
    return notesList.filter(note => {
      // Поиск по заголовку
      if (note.title?.toLowerCase().includes(lowerQuery)) return true;
      
      // Поиск по тегам
      if (note.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) return true;
      
      // Поиск по содержанию
      if (typeof note.content === 'string') {
        if (note.content.toLowerCase().includes(lowerQuery)) return true;
      } else if (Array.isArray(note.content)) {
        // Для списков ищем по тексту пунктов
        if (note.content.some(item => item.text.toLowerCase().includes(lowerQuery))) return true;
      }
      
      return false;
    });
  };

  const handleSaveNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingNote) {
      updateNote(editingNote.id, noteData);
    } else {
      addNote(noteData);
    }
    setIsModalOpen(false);
    setEditingNote(null);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleNewNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  // Фильтруем заметки по поиску
  const filteredNotes = filterNotesBySearch(notes, debouncedSearchQuery);
  
  // Сортируем: сначала закреплённые, потом обычные
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.pinned === b.pinned) return 0;
    return a.pinned ? -1 : 1;
  });

  const handleReorder = (ids: string[]) => {
    reorderNotes(ids);
  };

  // Показывать ли пустое состояние результатов поиска
  const showNoResults = searchQuery.trim() !== '' && filteredNotes.length === 0;

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
        
        {/* Поле поиска */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по заметкам..."
              className="w-full bg-gray-900 text-white px-4 py-3 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-lg"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        
        {/* Результаты поиска или все заметки */}
        {notes.length === 0 ? (
          <div className="text-center text-muted py-12">
            <p>Нет заметок</p>
            <p className="text-sm mt-2">Нажмите кнопку +, чтобы создать первую</p>
          </div>
        ) : showNoResults ? (
          <div className="text-center text-muted py-12">
            <p>🔍 Ничего не найдено</p>
            <p className="text-sm mt-2">Попробуйте изменить запрос</p>
          </div>
        ) : (
          <SortableNotesSection
            notes={sortedNotes}
            onReorder={handleReorder}
            onTogglePin={togglePin}
            onEditNote={handleEditNote}
            onDeleteNote={deleteNote}
          />
        )}
      </div>

      {/* Кнопка "+" в правом нижнем углу */}
      <button
        onClick={handleNewNote}
        className="fixed bottom-6 right-6 w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white text-3xl font-bold rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center z-20"
        title="Новая заметка"
      >
        +
      </button>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        initialNote={editingNote}
        allTags={allTags}
      />

      <style>{`
        .masonry-grid {
          column-count: 2;
          column-gap: 20px;
        }
        @media (min-width: 768px) {
          .masonry-grid { column-count: 3; }
        }
        @media (min-width: 1024px) {
          .masonry-grid { column-count: 4; }
        }
        @media (min-width: 1280px) {
          .masonry-grid { column-count: 5; }
        }
        .masonry-grid > * {
          break-inside: avoid;
          margin-bottom: 24px;
        }
      `}</style>
    </div>
  );
}

export default App;