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

export const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  isLoading: true,

  loadNotes: () => {
    const notes = getNotes();
    // Убеждаемся, что у всех заметок есть поле pinned (по умолчанию false)
    const normalizedNotes = notes.map(note => ({
      ...note,
      pinned: note.pinned === true, // преобразуем undefined/null/false в false, true оставляем true
    }));
    set({ notes: normalizedNotes, isLoading: false });
    console.log('📝 Загружено заметок:', normalizedNotes.length);
  },

  addNote: (noteData) => {
    const newNote: Note = {
      ...noteData,
      id: generateId(),
      createdAt: now(),
      updatedAt: now(),
      pinned: noteData.pinned === true, // явное приведение к boolean
      tags: noteData.tags || [],
    };
    
    addNoteToStorage(newNote);
    set(state => ({ notes: [newNote, ...state.notes] }));
    console.log('✅ Добавлена заметка:', newNote.id, 'pinned:', newNote.pinned);
    return newNote;
  },

  updateNote: (id, updates) => {
    updateNoteInStorage(id, updates);
    set(state => ({
      notes: state.notes.map(note =>
        note.id === id ? { ...note, ...updates, updatedAt: now() } : note
      )
    }));
    console.log('✏️ Обновлена заметка:', id, updates);
  },

  deleteNote: (id) => {
    deleteNoteFromStorage(id);
    set(state => ({
      notes: state.notes.filter(note => note.id !== id)
    }));
    console.log('🗑️ Удалена заметка:', id);
  },

  togglePin: (id: string) => {
    console.log('🔄 togglePin вызван для:', id);
    
    const currentNotes = get().notes;
    const currentNote = currentNotes.find(n => n.id === id);
    if (!currentNote) {
      console.log('❌ Заметка не найдена:', id);
      return;
    }
    
    const newPinnedValue = !currentNote.pinned;
    console.log(`Заметка "${currentNote.title}" была ${currentNote.pinned}, станет ${newPinnedValue}`);
    
    // Обновляем конкретную заметку
    const updatedNotes = currentNotes.map(note =>
      note.id === id 
        ? { ...note, pinned: newPinnedValue, updatedAt: now() }
        : note
    );
    
    // Сортируем: закреплённые вверх, обычные вниз
    const sortedNotes = [...updatedNotes].sort((a, b) => {
      // Сначала сравниваем по pinned
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });
    
    // Сохраняем в localStorage
    saveNotes(sortedNotes);
    set({ notes: sortedNotes });
    
    console.log('✅ Новый статус pinned:', newPinnedValue);
  },

  reorderNotes: (ids: string[]) => {
    set(state => {
      const notesMap = new Map(state.notes.map(note => [note.id, note]));
      const reorderedNotes = ids.map(id => notesMap.get(id)).filter(Boolean) as Note[];
      const remainingNotes = state.notes.filter(note => !ids.includes(note.id));
      const newNotes = [...reorderedNotes, ...remainingNotes];
      
      saveNotes(newNotes);
      return { notes: newNotes };
    });
  },
}));