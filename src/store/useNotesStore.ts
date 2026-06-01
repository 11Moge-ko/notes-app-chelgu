// store/useNotesStore.ts
import { create } from 'zustand';
import type { Note, Settings } from '../types';
import { getNotes, saveNotes, getSettings, saveSettings } from '../services/localStorage';

interface NotesStore {
  notes: Note[];
  settings: Settings;
  isLoading: boolean;
  loadNotes: () => void;
  addNote: (note: Note) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  updateSettings: (updates: Partial<Settings>) => void;
}

export const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  settings: getSettings(),
  isLoading: true,

  loadNotes: () => {
    const notes = getNotes();
    set({ notes, isLoading: false });
  },

  addNote: (note) => {
    const newNotes = [note, ...get().notes];
    set({ notes: newNotes });
    saveNotes(newNotes);
  },

  updateNote: (id, updates) => {
    const newNotes = get().notes.map((note) =>
      note.id === id ? { ...note, ...updates, updatedAt: Date.now() } : note
    );
    set({ notes: newNotes });
    saveNotes(newNotes);
  },

  deleteNote: (id) => {
    const newNotes = get().notes.filter((note) => note.id !== id);
    set({ notes: newNotes });
    saveNotes(newNotes);
  },

  updateSettings: (updates) => {
    const newSettings = { ...get().settings, ...updates };
    set({ settings: newSettings });
    saveSettings(newSettings);
  },
}));