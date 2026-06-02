// store/useNotesStore.ts
import { create } from 'zustand';
import type { Note } from '../types';
import { getNotes, saveNotes, addNote as addNoteToStorage, updateNote as updateNoteInStorage, deleteNote as deleteNoteFromStorage } from '../services/localStorage';
import { generateId, now } from '../utils/helpers';

interface NotesStore {
  notes: Note[];
  isLoading: boolean;
  
  // Экшены
  loadNotes: () => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
}

export const useNotesStore = create<NotesStore>((set, get) => ({
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
    
    // Сохраняем в localStorage через сервис
    addNoteToStorage(newNote);
    
    // Обновляем состояние
    set(state => ({ notes: [newNote, ...state.notes] }));
    
    console.log('✅ Добавлена заметка:', newNote.id);
    return newNote;
  },

  updateNote: (id, updates) => {
    // Обновляем в localStorage
    updateNoteInStorage(id, updates);
    
    // Обновляем состояние
    set(state => ({
      notes: state.notes.map(note =>
        note.id === id ? { ...note, ...updates, updatedAt: now() } : note
      )
    }));
    
    console.log('✏️ Обновлена заметка:', id);
  },

  deleteNote: (id) => {
    // Удаляем из localStorage
    deleteNoteFromStorage(id);
    
    // Обновляем состояние
    set(state => ({
      notes: state.notes.filter(note => note.id !== id)
    }));
    
    console.log('🗑️ Удалена заметка:', id);
  },
}));