import { create } from 'zustand';
import type { Note, Settings, Template } from '../types';
import { 
  getNotes, saveNotes, 
  deleteNote as deleteNoteFromStorage,
  getSettings, saveSettings,
  getTemplates, addTemplate, deleteTemplate, updateTemplateUsage,
  safeSaveNotes
} from '../services/localStorage';
import { generateId, now } from '../utils/helpers';
import { deleteNoteImage, saveNoteImage } from '../services/indexedDB';

interface ErrorModalState {
  isOpen: boolean;
  title: string;
  message: string;
  onExport?: () => void;
}

interface NotesStore {
  notes: Note[];
  settings: Settings;
  templates: Template[];
  isLoading: boolean;
  isLoadingTemplates: boolean;
  errorModal: ErrorModalState | null;
  photoCleanupModalOpen: boolean;
  
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
  updateNoteImage: (id: string, base64: string) => Promise<void>;
  showErrorModal: (title: string, message: string, onExport?: () => void) => void;
  closeErrorModal: () => void;
  showPhotoCleanupModal: () => void;
  closePhotoCleanupModal: () => void;
}

export const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  settings: getSettings(),
  templates: [],
  isLoading: true,
  isLoadingTemplates: true,
  errorModal: null,
  photoCleanupModalOpen: false,

  showErrorModal: (title, message, onExport) => {
    set({ errorModal: { isOpen: true, title, message, onExport } });
  },

  closeErrorModal: () => {
    set({ errorModal: null });
  },

  showPhotoCleanupModal: () => {
    set({ photoCleanupModalOpen: true });
  },

  closePhotoCleanupModal: () => {
    set({ photoCleanupModalOpen: false });
  },

  loadNotes: () => {
    try {
      const notes = getNotes();
      const normalizedNotes = notes.map(note => ({
        ...note,
        pinned: note.pinned === true,
      }));
      set({ notes: normalizedNotes, isLoading: false });
      console.log('📝 Загружено заметок:', normalizedNotes.length);
    } catch (error) {
      console.error('Ошибка загрузки заметок:', error);
      set({ 
        isLoading: false,
        errorModal: {
          isOpen: true,
          title: 'Ошибка загрузки данных',
          message: 'Данные повреждены. Загрузите экспортированные данные',
          onExport: () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'application/json';
            input.onchange = async (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                const text = await file.text();
                try {
                  const data = JSON.parse(text);
                  if (data.notes) localStorage.setItem('notes_v1', JSON.stringify(data.notes));
                  if (data.templates) localStorage.setItem('templates_v1', JSON.stringify(data.templates));
                  if (data.settings) localStorage.setItem('settings_v1', JSON.stringify(data.settings));
                  window.location.reload();
                } catch {
                  alert('Неверный формат файла');
                }
              }
            };
            input.click();
          }
        }
      });
    }
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
      hasImage: noteData.type === 'photo' ? !!noteData.imageUrl : false,
    };
    
    const currentNotes = get().notes;
    const newNotes = [newNote, ...currentNotes];
    const { success, error } = safeSaveNotes(newNotes);
    
    if (!success && error?.message === 'QUOTA_EXCEEDED') {
      get().showErrorModal(
        'Не удалось сохранить!',
        'Освободите место, удалив старые заметки',
        () => {
          const exportData = {
            notes: get().notes,
            templates: get().templates,
            settings: get().settings,
            exportDate: new Date().toISOString(),
          };
          const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `notes-backup-${Date.now()}.json`;
          a.click();
          URL.revokeObjectURL(url);
        }
      );
      return;
    }
    
    set({ notes: newNotes });
    console.log('✅ Добавлена заметка:', newNote.id, 'pinned:', newNote.pinned);
  },

  updateNote: (id, updates) => {
    const currentNotes = get().notes;
    const updatedNotes = currentNotes.map(note =>
      note.id === id ? { ...note, ...updates, updatedAt: now() } : note
    );
    
    const { success, error } = safeSaveNotes(updatedNotes);
    
    if (!success && error?.message === 'QUOTA_EXCEEDED') {
      get().showErrorModal(
        'Не удалось сохранить изменения!',
        'Освободите место, удалив старые заметки',
        () => {
          const exportData = {
            notes: get().notes,
            templates: get().templates,
            settings: get().settings,
            exportDate: new Date().toISOString(),
          };
          const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `notes-backup-${Date.now()}.json`;
          a.click();
          URL.revokeObjectURL(url);
        }
      );
      return;
    }
    
    set({ notes: updatedNotes });
    console.log('✏️ Обновлена заметка:', id, updates);
  },

  deleteNote: (id) => {
    deleteNoteImage(id).catch(console.error);
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
      const newTemplate: Template = {
        id: generateId(),
        name,
        title: note.title,
        description,
        content: note.content,
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
    
    let content: string | import('../types').ListItem[] = template.content;
    if (typeof template.content === 'string') {
      try {
        const parsed = JSON.parse(template.content);
        if (Array.isArray(parsed)) {
          content = parsed;
        }
      } catch {
        // оставляем как строку
      }
    }
    
    return {
      title: template.title,
      content,
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

  updateNoteImage: async (id: string, base64: string) => {
    const response = await fetch(base64);
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type });
    await saveNoteImage(id, file);
  },
}));