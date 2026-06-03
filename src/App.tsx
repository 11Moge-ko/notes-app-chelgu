// App.tsx
import { useEffect, useState } from 'react';
import { useNotesStore } from './store/useNotesStore';
import { initDB } from './services/indexedDB';
import { NoteModal } from './components/NoteModal';
import { SortableNotesSection } from './components/SortableNotesSection';
import type { Note } from './types';

function App() {
  const { notes, isLoading, loadNotes, addNote, updateNote, deleteNote, togglePin, reorderNotes } = useNotesStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

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

  // ПРАВИЛЬНАЯ СОРТИРОВКА: сначала закреплённые (pinned === true), потом обычные
  const sortedNotes = [...notes].sort((a, b) => {
    // Если оба закреплены или оба не закреплены — сохраняем порядок
    if (a.pinned === b.pinned) return 0;
    // Закреплённые вперёд
    return a.pinned ? -1 : 1;
  });

  // Для отладки: выводим в консоль статус pinned каждой заметки
  console.log('📊 Статус закрепления:', notes.map(n => ({ id: n.id, title: n.title, pinned: n.pinned })));

  const handleReorder = (ids: string[]) => {
    reorderNotes(ids);
  };

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
        <h1 className="text-primary text-3xl font-bold mb-6">Notes App</h1>
        
        {notes.length === 0 ? (
          <div className="text-center text-muted py-12">
            <p>Нет заметок</p>
            <p className="text-sm mt-2">Нажмите кнопку +, чтобы создать первую</p>
          </div>
        ) : (
          <SortableNotesSection
  notes={sortedNotes}
  onReorder={handleReorder}
  onTogglePin={togglePin}  // должна быть эта функция из store
  onEditNote={handleEditNote}
  onDeleteNote={deleteNote}
/>
        )}
      </div>

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
          column-gap: 24px;
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
          margin-bottom: 16px;
        }
      `}</style>
    </div>
  );
}

export default App;