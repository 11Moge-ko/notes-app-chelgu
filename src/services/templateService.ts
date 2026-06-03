import type { Note, Template, ListItem } from '../types';
import { generateId, now } from '../utils/helpers';

const STORAGE_KEY = 'templates_v1';
const MAX_TEMPLATES = 20;

export interface TemplateInput {
  name: string;
  description?: string;
  content: string | ListItem[];
  type: 'text' | 'list';
  tags?: string[];
}

function getAll(): Template[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveAll(templates: Template[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
}

export function getTemplates(): Template[] {
  return getAll().sort((a, b) => b.createdAt - a.createdAt);
}

export function getTemplateById(id: string): Template | undefined {
  return getAll().find(t => t.id === id);
}

export function isLimitReached(): boolean {
  return getAll().length >= MAX_TEMPLATES;
}

export function saveTemplate(input: TemplateInput): Template {
  const templates = getAll();

  if (templates.length >= MAX_TEMPLATES) {
    throw new Error('Достигнут лимит шаблонов');
  }

  const name = input.name.trim();
  if (!name) throw new Error('Название не может быть пустым');
  if (name.length > 50) throw new Error('Название слишком длинное');

  const template: Template = {
    id: generateId(),
    name,
    description: input.description?.trim() || undefined,
    content: input.content,
    type: input.type,
    tags: input.tags?.filter(Boolean) || [],
    createdAt: now(),
    usageCount: 0,
  };

  templates.push(template);
  saveAll(templates);
  return template;
}

export function saveTemplateFromNote(
  note: Pick<Note, 'content' | 'type' | 'tags'>,
  name: string,
  description?: string
): Template {
  if (note.type === 'photo') {
    throw new Error('Фотозаметки нельзя сохранять как шаблон');
  }
  return saveTemplate({
    name,
    description,
    content: note.content,
    type: note.type,
    tags: note.tags,
  });
}

export function applyTemplate(
  id: string
): Omit<Note, 'id' | 'createdAt' | 'updatedAt'> | null {
  const templates = getAll();
  const idx = templates.findIndex(t => t.id === id);
  if (idx === -1) return null;

  templates[idx].usageCount += 1;
  saveAll(templates);

  const t = templates[idx];
  return {
    title: '',
    content: t.content,
    type: t.type,
    borderColor: '#bc57ca',
    pinned: false,
    tags: [...(t.tags || [])],
    templateId: t.id,
  };
}

export function deleteTemplate(id: string): boolean {
  const templates = getAll();
  const filtered = templates.filter(t => t.id !== id);
  if (filtered.length === templates.length) return false;
  saveAll(filtered);
  return true;
}

export function updateTemplate(
  id: string,
  updates: { name?: string; description?: string }
): Template | undefined {
  const templates = getAll();
  const idx = templates.findIndex(t => t.id === id);
  if (idx === -1) return undefined;

  if (updates.name !== undefined) {
    const name = updates.name.trim();
    if (!name) throw new Error('Название не может быть пустым');
    if (name.length > 50) throw new Error('Название слишком длинное');
    templates[idx].name = name;
  }

  if (updates.description !== undefined) {
    templates[idx].description = updates.description.trim() || undefined;
  }

  saveAll(templates);
  return templates[idx];
}

export function searchTemplates(query: string): Template[] {
  const q = query.trim().toLowerCase();
  if (!q) return getTemplates();
  return getAll().filter(
    t =>
      t.name.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q)
  );
}

export function clearAllTemplates(): void {
  saveAll([]);
}