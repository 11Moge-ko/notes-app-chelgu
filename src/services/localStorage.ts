// services/localStorage.ts
import type { Note, Settings, Template } from '../types';

const NOTES_KEY = 'notes_v1';
const TEMPLATES_KEY = 'templates_v1';
const SETTINGS_KEY = 'settings_v1';

// ========== ЗАМЕТКИ ==========
export function getNotes(): Note[] {
  const data = localStorage.getItem(NOTES_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    console.error('Ошибка парсинга заметок');
    return [];
  }
}

export function saveNotes(notes: Note[]): void {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export function addNote(note: Note): void {
  const notes = getNotes();
  notes.unshift(note);
  saveNotes(notes);
}

export function updateNote(id: string, updates: Partial<Note>): void {
  const notes = getNotes();
  const index = notes.findIndex(n => n.id === id);
  if (index !== -1) {
    notes[index] = { ...notes[index], ...updates, updatedAt: Date.now() };
    saveNotes(notes);
  }
}

export function deleteNote(id: string): void {
  const notes = getNotes();
  const filtered = notes.filter(n => n.id !== id);
  saveNotes(filtered);
}

// ========== ШАБЛОНЫ ==========
export function getTemplates(): Template[] {
  const data = localStorage.getItem(TEMPLATES_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveTemplates(templates: Template[]): void {
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
}

// ========== НАСТРОЙКИ ==========
export function getSettings(): Settings {
  const defaults: Settings = {
    theme: 'dark',
    sortBy: 'updatedAt',
    filters: { pinnedOnly: false, hasImageOnly: false, selectedTags: [] },
  };
  const data = localStorage.getItem(SETTINGS_KEY);
  if (!data) return defaults;
  try {
    return { ...defaults, ...JSON.parse(data) };
  } catch {
    return defaults;
  }
}

export function saveSettings(settings: Settings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// ========== ШАБЛОНЫ (полная реализация) ==========
export function addTemplate(template: Template): void {
  const templates = getTemplates();
  if (templates.length >= 20) {
    throw new Error('Достигнут лимит шаблонов (20)');
  }
  templates.unshift(template);
  saveTemplates(templates);
}

export function deleteTemplate(id: string): void {
  const templates = getTemplates();
  const filtered = templates.filter(t => t.id !== id);
  saveTemplates(filtered);
}

export function updateTemplateUsage(id: string): void {
  const templates = getTemplates();
  const index = templates.findIndex(t => t.id === id);
  if (index !== -1) {
    templates[index].usageCount += 1;
    saveTemplates(templates);
  }
}