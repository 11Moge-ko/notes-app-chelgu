// store/useNotesStore.ts
import { create } from 'zustand';
import type { Note } from '../types';
import { getNotes, saveNotes, addNote as addNoteToStorage, updateNote as updateNoteInStorage, deleteNote as deleteNoteFromStorage } from '../services/localStorage';
import { generateId, now } from '../utils/helpers';

interface NotesStore {
  notes: Note[];
  isLoading: boolean;
  
  loadNotes: () => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  reorderNotes: (ids: string[]) => void;
}

export const useNotesStore = create<NotesStore>((set) => ({
  notes: [],
  isLoading: true,

  loadNotes: () => {
    const notes = getNotes();
    set({ notes, isLoading: false });
    console.log('📝 Загружено заметок:', notes.length);
  },

  addNote: (noteData) => {
    const newNote: Note = {
      ...noteData,
      id: generateId(),
      createdAt: now(),
      updatedAt: now(),
      pinned: noteData.pinned || false,
      tags: noteData.tags || [],
    };
    
    addNoteToStorage(newNote);
    set(state => ({ notes: [newNote, ...state.notes] }));
    console.log('✅ Добавлена заметка:', newNote.id);
    return newNote;
  },

  updateNote: (id, updates) => {
    updateNoteInStorage(id, updates);
    set(state => ({
      notes: state.notes.map(note =>
        note.id === id ? { ...note, ...updates, updatedAt: now() } : note
      )
    }));
    console.log('✏️ Обновлена заметка:', id);
  },

  deleteNote: (id) => {
    deleteNoteFromStorage(id);
    set(state => ({
      notes: state.notes.filter(note => note.id !== id)
    }));
    console.log('🗑️ Удалена заметка:', id);
  },

  togglePin: (id: string) => {
    set(state => {
      const note = state.notes.find(n => n.id === id);
      if (!note) return state;
      
      const newPinned = !note.pinned;
      const updatedNotes = state.notes.map(n =>
        n.id === id ? { ...n, pinned: newPinned, updatedAt: now() } : n
      );
      
      // Сортируем: закреплённые сверху
      const sortedNotes = [...updatedNotes].sort((a, b) => {
        if (a.pinned === b.pinned) return 0;
        return a.pinned ? -1 : 1;
      });
      
      saveNotes(sortedNotes);
      return { notes: sortedNotes };
    });
  },

  reorderNotes: (ids: string[]) => {
    set(state => {
      // Создаём карту заметок для быстрого доступа
      const notesMap = new Map(state.notes.map(note => [note.id, note]));
      // Сортируем согласно переданному порядку ID
      const reorderedNotes = ids.map(id => notesMap.get(id)).filter(Boolean) as Note[];
      
      // Добавляем заметки, которые не вошли в перестановку (на всякий случай)
      const remainingNotes = state.notes.filter(note => !ids.includes(note.id));
      const newNotes = [...reorderedNotes, ...remainingNotes];
      
      saveNotes(newNotes);
      return { notes: newNotes };
    });
  },
}));