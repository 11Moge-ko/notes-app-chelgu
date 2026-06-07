import { openDB } from 'idb';
import type { DBSchema } from 'idb';

interface NotesDB extends DBSchema {
  note_images: {
    key: string;
    value: { noteId: string; imageData: string; createdAt?: number };
    indexes: { 'createdAt': number };
  };
}

let dbPromise: ReturnType<typeof openDB<NotesDB>> | null = null;

export async function initDB(): Promise<void> {
  dbPromise = openDB<NotesDB>('NotesAppDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('note_images')) {
        const store = db.createObjectStore('note_images', { keyPath: 'noteId' });
        store.createIndex('createdAt', 'createdAt');
      }
    },
  });
  await dbPromise;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function saveNoteImage(noteId: string, file: File): Promise<string> {
  const db = await dbPromise;
  if (!db) throw new Error('DB not initialized');
  
  const base64 = await fileToBase64(file);
  await db.put('note_images', { noteId, imageData: base64, createdAt: Date.now() });
  return base64;
}

export async function getNoteImage(noteId: string): Promise<string | null> {
  const db = await dbPromise;
  if (!db) return null;
  const result = await db.get('note_images', noteId);
  return result?.imageData || null;
}

export async function deleteNoteImage(noteId: string): Promise<void> {
  const db = await dbPromise;
  if (!db) return;
  await db.delete('note_images', noteId);
}

export async function clearAllImages(): Promise<void> {
  const db = await dbPromise;
  if (!db) return;
  const keys = await db.getAllKeys('note_images');
  for (const key of keys) {
    await db.delete('note_images', key);
  }
}