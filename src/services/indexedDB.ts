// services/indexedDB.ts
import { openDB } from 'idb';
import type { DBSchema } from 'idb';

interface NotesDB extends DBSchema {
  note_images: {
    key: string;
    value: { noteId: string; imageData: string };
  };
}

let dbPromise: ReturnType<typeof openDB<NotesDB>> | null = null;

export async function initDB(): Promise<void> {
  dbPromise = openDB<NotesDB>('NotesAppDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('note_images')) {
        db.createObjectStore('note_images', { keyPath: 'noteId' });
      }
    },
  });
  await dbPromise;
}

export async function saveImage(noteId: string, base64: string): Promise<void> {
  const db = await dbPromise;
  if (!db) throw new Error('DB not initialized');
  await db.put('note_images', { noteId, imageData: base64 });
}

export async function getImage(noteId: string): Promise<string | null> {
  const db = await dbPromise;
  if (!db) return null;
  const result = await db.get('note_images', noteId);
  return result?.imageData || null;
}

export async function deleteImage(noteId: string): Promise<void> {
  const db = await dbPromise;
  if (!db) return;
  await db.delete('note_images', noteId);
}