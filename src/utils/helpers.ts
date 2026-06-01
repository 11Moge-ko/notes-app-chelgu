// utils/helpers.ts
import type { ListItem, Note } from '../types';

// Генерация уникального ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Получить текущий timestamp
export function now(): number {
  return Date.now();
}

// Подсчёт выполненных элементов в списке
export function calculateListStats(items: ListItem[]): { completedItems: number; totalItems: number } {
  const totalItems = items.length;
  const completedItems = items.filter(item => item.isChecked).length;
  return { completedItems, totalItems };
}

// Превью контента (первые 3 строки)
export function getContentPreview(note: Note, maxLines: number = 3): string {
  if (note.type === 'list' && Array.isArray(note.content)) {
    const items = note.content.slice(0, maxLines).map(item => `• ${item.text}`);
    return items.join('\n');
  }
  if (typeof note.content === 'string') {
    return note.content.split('\n').slice(0, maxLines).join('\n');
  }
  return '';
}

// Дебаунс для поиска
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}