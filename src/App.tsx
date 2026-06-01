// App.tsx
import { useEffect } from 'react';
import { useNotesStore } from './store/useNotesStore';
import { initDB } from './services/indexedDB';

function App() {
  const { notes, isLoading, loadNotes } = useNotesStore();

  useEffect(() => {
    loadNotes();
    initDB().catch(console.error);
  }, [loadNotes]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Загрузка Notes App...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-6">Notes App</h1>
        <p className="text-gray-400">Заметок: {notes.length}</p>
      </div>
    </div>
  );
}

export default App;