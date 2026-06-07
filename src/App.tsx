// App.tsx
import { useEffect, useState, useRef } from 'react';
import { useNotesStore } from './store/useNotesStore';
import { initDB } from './services/indexedDB';
import { NoteModal } from './components/NoteEditor/NoteModal';
import { SortableNotesSection } from './components/SortableNotesSection';
import { FilterBar } from './components/ui/FilterBar';
import { TemplateModal } from './components/TemplateModal/TemplateModal';
import { SaveTemplateModal } from './components/TemplateModal/SaveTemplateModal';
import { AddNoteMenu } from './components/FloatingActionButton/AddNoteMenu';
import { useDebounce } from './hooks/useDebounce';
import { useHotkeys } from './hooks/useHotkeys';
import { ErrorModal } from './components/ui/ErrorModal';
import { PhotoCleanupModal } from './components/ui/PhotoCleanupModal';
import { ConfirmModal } from './components/ui/ConfirmModal';
import type { Note } from './types';

function App() {
  const { 
    notes, isLoading, loadNotes, addNote, updateNote, deleteNote, 
    togglePin, reorderNotes, settings, updateSettings,
    templates, loadTemplates, saveAsTemplate, applyTemplate, deleteTemplate,
    errorModal, photoCleanupModalOpen, closeErrorModal,
    closePhotoCleanupModal
  } = useNotesStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isSaveTemplateModalOpen, setIsSaveTemplateModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [currentNoteForTemplate, setCurrentNoteForTemplate] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const noteModalRef = useRef<{ save: () => void }>(null);
  const filterBarRef = useRef<{ close: () => void }>(null);

  const bgStyle = {
    background: settings.theme === 'light' 
      ? '#ffffff' 
      : 'radial-gradient(circle, rgba(0,0,0,1) 14%, rgba(9,6,19,1) 100%)',
    minHeight: '100vh',
  };

  useEffect(() => {
    loadNotes();
    loadTemplates();
    initDB().catch(console.error);
    (window as any).testNotes = { 
      addNote, 
      updateNote, 
      deleteNote, 
      togglePin,
      getNotes: () => useNotesStore.getState().notes 
    };
  }, [loadNotes, loadTemplates, addNote, updateNote, deleteNote, togglePin]);

  useEffect(() => {
    if (settings.theme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  }, [settings.theme]);

  const handleNewNoteHotkey = () => {
    handleNewNote();
  };

  const handleSaveNoteHotkey = () => {
    if (isModalOpen && noteModalRef.current) {
      noteModalRef.current.save();
    }
  };

  const handleFocusSearchHotkey = () => {
    searchInputRef.current?.focus();
  };

  const handleCloseModalHotkey = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      setEditingNote(null);
    }
    if (isTemplateModalOpen) {
      setIsTemplateModalOpen(false);
    }
    if (filterBarRef.current) {
      filterBarRef.current.close();
    }
  };

  useHotkeys({
    onNewNote: handleNewNoteHotkey,
    onSaveNote: handleSaveNoteHotkey,
    onFocusSearch: handleFocusSearchHotkey,
    onCloseModal: handleCloseModalHotkey,
    isModalOpen: isModalOpen || isTemplateModalOpen,
  });

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags || [])));

  const filterNotesBySearch = (notesList: Note[], query: string): Note[] => {
    if (!query.trim()) return notesList;
    
    const lowerQuery = query.toLowerCase();
    return notesList.filter(note => {
      if (note.title?.toLowerCase().includes(lowerQuery)) return true;
      if (note.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) return true;
      if (typeof note.content === 'string') {
        if (note.content.toLowerCase().includes(lowerQuery)) return true;
      } else if (Array.isArray(note.content)) {
        if (note.content.some(item => item.text.toLowerCase().includes(lowerQuery))) return true;
      }
      return false;
    });
  };

  const filterNotesByFilters = (notesList: Note[]): Note[] => {
    let filtered = [...notesList];
    
    if (settings.filters.pinnedOnly) {
      filtered = filtered.filter(n => n.pinned === true);
    }
    
    if (settings.filters.hasImageOnly) {
      filtered = filtered.filter(n => n.hasImage === true);
    }
    
    if (settings.filters.selectedTags.length > 0) {
      filtered = filtered.filter(n => 
        n.tags?.some(tag => settings.filters.selectedTags.includes(tag))
      );
    }
    
    return filtered;
  };

  const sortNotes = (notesList: Note[]): Note[] => {
    return [...notesList].sort((a, b) => {
      if (settings.sortBy === 'createdAt') {
        return b.createdAt - a.createdAt;
      } else {
        return b.updatedAt - a.updatedAt;
      }
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
    window.location.reload();
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleNewNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleSaveAsTemplateFromModal = () => {
    if (editingNote) {
      setCurrentNoteForTemplate(editingNote);
      setIsSaveTemplateModalOpen(true);
    }
  };

  const handlePhotoNote = () => {
    const newNoteData = {
      title: '',
      content: '',
      type: 'photo' as const,
      borderColor: '#bc57ca' as const,
      pinned: false,
      tags: [],
      hasImage: false,
      imageUrl: undefined,
    };
    addNote(newNoteData);
    setTimeout(() => {
      const noteId = useNotesStore.getState().notes[0]?.id;
      if (noteId) {
        const note = useNotesStore.getState().notes.find(n => n.id === noteId);
        if (note) handleEditNote(note);
      }
    }, 100);
  };

  const searchedNotes = filterNotesBySearch(notes, debouncedSearchQuery);
  const filteredByFiltersNotes = filterNotesByFilters(searchedNotes);
  const sortedByDateNotes = sortNotes(filteredByFiltersNotes);

  const finalNotes = [...sortedByDateNotes].sort((a, b) => {
    if (a.pinned === b.pinned) return 0;
    return a.pinned ? -1 : 1;
  });

  const handleReorder = (ids: string[]) => {
    reorderNotes(ids);
  };

  const showNoResults = searchQuery.trim() !== '' && filteredByFiltersNotes.length === 0;
  const showNoFiltersResults = !showNoResults && finalNotes.length === 0 && notes.length > 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={bgStyle}>
        <div className="text-white text-xl">Загрузка Notes App...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={bgStyle}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-primary text-3xl font-bold mb-6">Notes App</h1>
        
        <div className="mb-4 flex gap-3">
          <div className="relative flex-1">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по заметкам... (Ctrl+Q)"
              className="w-full bg-gray-900 text-white px-4 py-3 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-lg"
              >
                ✕
              </button>
            )}
          </div>
          
          <button
            onClick={() => setIsTemplateModalOpen(true)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            📋 Шаблоны
          </button>
        </div>
        
        <FilterBar 
          ref={filterBarRef}
          settings={settings} 
          onSettingsChange={updateSettings} 
          allTags={allTags} 
        />
        
        {notes.length === 0 ? (
          <div className="text-center text-muted py-12">
            <p>Нет заметок</p>
            <p className="text-sm mt-2">Нажмите кнопку +, чтобы создать первую (Ctrl+Enter)</p>
            <p className="text-xs mt-1 text-gray-500">Сохранить заметку (Ctrl+I)</p>
          </div>
        ) : showNoResults ? (
          <div className="text-center text-muted py-12">
            <p>🔍 Ничего не найдено</p>
            <p className="text-sm mt-2">Попробуйте изменить запрос</p>
          </div>
        ) : showNoFiltersResults ? (
          <div className="text-center text-muted py-12">
            <p>🔍 Нет заметок, соответствующих фильтрам</p>
          </div>
        ) : (
          <SortableNotesSection
            notes={finalNotes}
            onReorder={handleReorder}
            onTogglePin={togglePin}
            onEditNote={handleEditNote}
            onDeleteNote={deleteNote}
          />
        )}
      </div>

      <AddNoteMenu
        onNewNote={handleNewNote}
        onFromTemplate={() => setIsTemplateModalOpen(true)}
        onPhotoNote={handlePhotoNote}
      />

      <NoteModal
        ref={noteModalRef}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingNote(null); }}
        onSave={handleSaveNote}
        onDelete={deleteNote}
        initialNote={editingNote}
        allTags={allTags}
        onImageSaved={(noteId, base64) => {
          updateNote(noteId, { imageUrl: base64, hasImage: true });
        }}
        onSaveAsTemplate={handleSaveAsTemplateFromModal}
        isTemplateLimitReached={templates.length >= 20}
      />

      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelectTemplate={(template) => {
          const noteData = applyTemplate(template);
          addNote(noteData);
          setIsTemplateModalOpen(false);
        }}
        templates={templates}
        onDeleteTemplate={deleteTemplate}
      />

      <SaveTemplateModal
        isOpen={isSaveTemplateModalOpen}
        onClose={() => {
          setIsSaveTemplateModalOpen(false);
          setCurrentNoteForTemplate(null);
        }}
        onSave={(name, description) => {
          if (currentNoteForTemplate) {
            saveAsTemplate(name, description, currentNoteForTemplate);
          }
          setIsSaveTemplateModalOpen(false);
          setCurrentNoteForTemplate(null);
        }}
      />

      <ErrorModal
        isOpen={errorModal?.isOpen || false}
        onClose={closeErrorModal}
        title={errorModal?.title || 'Ошибка'}
        message={errorModal?.message || ''}
        buttons={errorModal?.onExport ? [
          { label: 'Экспортировать данные', onClick: errorModal.onExport, variant: 'secondary' },
          { label: 'OK', onClick: closeErrorModal, variant: 'primary' },
        ] : undefined}
      />

      <PhotoCleanupModal
        isOpen={photoCleanupModalOpen}
        onClose={closePhotoCleanupModal}
      />

      {confirmModal && (
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          message={confirmModal.message}
          onConfirm={() => {
            confirmModal.onConfirm();
            setConfirmModal(null);
          }}
          onCancel={() => setConfirmModal(null)}
          confirmText="Да, удалить"
          cancelText="Нет"
        />
      )}

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