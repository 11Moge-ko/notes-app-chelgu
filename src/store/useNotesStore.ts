// store/useNotesStore.ts
import { create } from 'zustand';
import type { Note, Settings, Template, ListItem } from '../types';
import { 
  getNotes, saveNotes, addNote as addNoteToStorage, 
  updateNote as updateNoteInStorage, deleteNote as deleteNoteFromStorage,
  getSettings, saveSettings,
  getTemplates, addTemplate, deleteTemplate, updateTemplateUsage
} from '../services/localStorage';
import { generateId, now } from '../utils/helpers';

interface NotesStore {
  notes: Note[];
  settings: Settings;
  templates: Template[];
  isLoading: boolean;
  isLoadingTemplates: boolean;
  
  loadNotes: () => void;
  loadTemplates: () => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  reorderNotes: (ids: string[]) => void;
  updateSettings: (updates: Partial<Settings>) => void;
  saveAsTemplate: (name: string, description: string, note: Note) => boolean;
  applyTemplate: (template: Template) => Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
  deleteTemplate: (id: string) => void;
}

export const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  settings: getSettings(),
  templates: [],
  isLoading: true,
  isLoadingTemplates: true,

  loadNotes: () => {
    const notes = getNotes();
    const normalizedNotes = notes.map(note => ({
      ...note,
      pinned: note.pinned === true,
    }));
    set({ notes: normalizedNotes, isLoading: false });
    console.log('📝 Загружено заметок:', normalizedNotes.length);
  },

  loadTemplates: () => {
    const templates = getTemplates();
    set({ templates, isLoadingTemplates: false });
    console.log('📋 Загружено шаблонов:', templates.length);
  },

  addNote: (noteData) => {
    const newNote: Note = {
      ...noteData,
      id: generateId(),
      createdAt: now(),
      updatedAt: now(),
      pinned: noteData.pinned === true,
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
    
    const updatedNotes = currentNotes.map(note =>
      note.id === id 
        ? { ...note, pinned: newPinnedValue, updatedAt: now() }
        : note
    );
    
    const sortedNotes = [...updatedNotes].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });
    
    saveNotes(sortedNotes);
    set({ notes: sortedNotes });
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

  updateSettings: (updates) => {
    set(state => {
      const newSettings = { ...state.settings, ...updates };
      saveSettings(newSettings);
      return { settings: newSettings };
    });
  },

  saveAsTemplate: (name: string, description: string, note: Note) => {
    try {
      // Нормализуем content: если это массив — оставляем как массив, если строка — пробуем распарсить
      let normalizedContent: string | ListItem[] = note.content;
      
      // Если content — строка, проверяем, не является ли она JSON-строкой от массива
      if (typeof note.content === 'string') {
        try {
          const parsed = JSON.parse(note.content);
          if (Array.isArray(parsed)) {
            // Это JSON-строка массива — восстанавливаем массив
            normalizedContent = parsed as ListItem[];
          }
        } catch {
          // Не парсится — оставляем как строку
          normalizedContent = note.content;
        }
      }
      
      const newTemplate: Template = {
        id: generateId(),
        name,
        description,
        content: normalizedContent,
        type: note.type === 'photo' ? 'text' : note.type,
        borderColor: note.borderColor,
        tags: note.tags,
        createdAt: now(),
        usageCount: 0,
      };
      
      addTemplate(newTemplate);
      set(state => ({ templates: [newTemplate, ...state.templates] }));
      return true;
    } catch (error) {
      console.error('Ошибка сохранения шаблона:', error);
      return false;
    }
  },

  applyTemplate: (template: Template) => {
    updateTemplateUsage(template.id);
    
    set(state => ({
      templates: state.templates.map(t =>
        t.id === template.id ? { ...t, usageCount: t.usageCount + 1 } : t
      )
    }));
    
    // Нормализуем content для заметки
    let noteContent: string | ListItem[] = template.content;
    
    // Если content — строка, пробуем распарсить как JSON-массив
    if (typeof template.content === 'string') {
      try {
        const parsed = JSON.parse(template.content);
        if (Array.isArray(parsed)) {
          noteContent = parsed as ListItem[];
        }
      } catch {
        // Не парсится — оставляем как строку
        noteContent = template.content;
      }
    }
    
    return {
      title: '',
      content: noteContent,
      type: template.type,
      borderColor: template.borderColor,
      pinned: false,
      tags: template.tags || [],
    };
  },

  deleteTemplate: (id: string) => {
    deleteTemplate(id);
    set(state => ({
      templates: state.templates.filter(t => t.id !== id)
    }));
    console.log('🗑️ Удалён шаблон:', id);
  },
}));