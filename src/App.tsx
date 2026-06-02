// App.tsx
import { useEffect, useState } from 'react';
import { useNotesStore } from './store/useNotesStore';
import { initDB } from './services/indexedDB';
import { NoteCard } from './components/NoteCard';
import { NoteModal } from './components/NoteModal';
import type { Note } from './types';

function App() {
  const { notes, isLoading, loadNotes, addNote, updateNote, deleteNote } = useNotesStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    loadNotes();
    initDB().catch(console.error);
    
    (window as any).testNotes = { 
      addNote, 
      updateNote, 
      deleteNote, 
      getNotes: () => useNotesStore.getState().notes 
    };
  }, [loadNotes, addNote, updateNote, deleteNote]);

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

  const NotesSection = ({ title, notesList }: { title: string; notesList: typeof notes }) => (
    <div className="mb-8">
      <h2 className="text-white text-xl font-semibold mb-4 pb-2 border-b border-gray-700">
        {title} ({notesList.length})
      </h2>
      {notesList.length === 0 ? (
        <div className="text-muted text-center py-8">
          {title === '📌 Закреплённые' ? 'Нет закреплённых заметок' : 'Нет обычных заметок'}
        </div>
      ) : (
        <div className="masonry-grid">
          {notesList.map((note) => (
            <div key={note.id} className="relative group">
              <div onClick={() => handleEditNote(note)} className="cursor-pointer">
                <NoteCard note={note} />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-primary text-3xl font-bold">Notes App</h1>
          <button
            onClick={handleNewNote}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-lg"
          >
            + Новая заметка
          </button>
        </div>
        
        {/* Статистика */}
        <p className="text-secondary mb-4">Всего заметок: {notes.length}</p>
        
        {/* Список заметок */}
        {notes.length === 0 ? (
          <div className="text-center text-muted py-12">
            <p>Нет заметок</p>
            <button
              onClick={handleNewNote}
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Создать первую заметку
            </button>
          </div>
        ) : (
          <>
            {pinnedNotes.length > 0 && (
              <NotesSection title="📌 Закреплённые" notesList={pinnedNotes} />
            )}
            <NotesSection title="Все заметки" notesList={unpinnedNotes} />
          </>
        )}
      </div>

      {/* Модальное окно */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        initialNote={editingNote}
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