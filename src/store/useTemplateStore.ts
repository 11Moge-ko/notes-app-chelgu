import { create } from 'zustand';
import type { Note, Template } from '../types';
import * as templateService from '../services/templateService';

interface TemplateStore {
  templates: Template[];
  isLoading: boolean;
  loadTemplates: () => void;
  createFromNote: (
    note: Pick<Note, 'content' | 'type' | 'tags' | 'borderColor' | 'title'>,
    name: string,
    description?: string
  ) => Template | null;
  deleteTemplate: (id: string) => void;
  updateTemplate: (id: string, updates: { name?: string; description?: string }) => void;
  applyTemplate: (id: string) => Omit<Note, 'id' | 'createdAt' | 'updatedAt'> | null;
  searchTemplates: (query: string) => Template[];
  isLimitReached: () => boolean;
  clearAll: () => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  templates: [],
  isLoading: true,

  loadTemplates: () => {
    set({ templates: templateService.getTemplates(), isLoading: false });
  },

  createFromNote: (note, name, description) => {
    try {
      const template = templateService.saveTemplateFromNote(note, name, description);
      set(state => ({ templates: [template, ...state.templates] }));
      return template;
    } catch {
      return null;
    }
  },

  deleteTemplate: (id) => {
    if (templateService.deleteTemplate(id)) {
      set(state => ({ templates: state.templates.filter(t => t.id !== id) }));
    }
  },

  updateTemplate: (id, updates) => {
    try {
      const updated = templateService.updateTemplate(id, updates);
      if (updated) {
        set(state => ({
          templates: state.templates.map(t => (t.id === id ? updated : t)),
        }));
      }
    } catch {
      // ignore
    }
  },

  applyTemplate: (id) => {
    const data = templateService.applyTemplate(id);
    if (data) {
      set(state => ({
        templates: state.templates.map(t =>
          t.id === id ? { ...t, usageCount: t.usageCount + 1 } : t
        ),
      }));
    }
    return data;
  },

  searchTemplates: (query) => templateService.searchTemplates(query),

  isLimitReached: () => templateService.isLimitReached(),

  clearAll: () => {
    templateService.clearAllTemplates();
    set({ templates: [] });
  },
}));