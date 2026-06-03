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

  const pinnedNotes = notes.filter(n => n.pinned);
  const unpinnedNotes = notes.filter(n => !n.pinned);

  const handleReorderPinned = (ids: string[]) => {
    // Получаем все ID закреплённых заметок в новом порядке
    reorderNotes([...ids, ...unpinnedNotes.map(n => n.id)]);
  };

  const handleReorderUnpinned = (ids: string[]) => {
    // Получаем все ID обычных заметок в новом порядке
    reorderNotes([...pinnedNotes.map(n => n.id), ...ids]);
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-primary text-3xl font-bold">Notes App</h1>
          <button onClick={handleNewNote} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-lg">
            + Новая заметка
          </button>
        </div>
        
        <p className="text-secondary mb-4">Всего заметок: {notes.length}</p>
        
        {notes.length === 0 ? (
          <div className="text-center text-muted py-12">
            <p>Нет заметок</p>
            <button onClick={handleNewNote} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
              Создать первую заметку
            </button>
          </div>
        ) : (
          <>
            {pinnedNotes.length > 0 && (
              <SortableNotesSection
                title="📌 Закреплённые"
                notes={pinnedNotes}
                onReorder={handleReorderPinned}
                onTogglePin={togglePin}
                onEditNote={handleEditNote}
                onDeleteNote={deleteNote}
              />
            )}
            
            <SortableNotesSection
              title="Все заметки"
              notes={unpinnedNotes}
              onReorder={handleReorderUnpinned}
              onTogglePin={togglePin}
              onEditNote={handleEditNote}
              onDeleteNote={deleteNote}
            />
          </>
        )}
      </div>

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
          column-gap: 16px;
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