// App.tsx
import { useEffect } from 'react';
import { useNotesStore } from './store/useNotesStore';
import { initDB } from './services/indexedDB';

function App() {
  const { notes, isLoading, loadNotes, addNote, updateNote, deleteNote } = useNotesStore();

  useEffect(() => {
    loadNotes();
    initDB().catch(console.error);
    
    // Для тестирования из консоли
    (window as any).testNotes = { addNote, updateNote, deleteNote, getNotes: () => useNotesStore.getState().notes };
  }, [loadNotes, addNote, updateNote, deleteNote]);

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
        <p className="text-gray-400 mb-4">Заметок: {notes.length}</p>
        
        {/* Временные кнопки для тестирования */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => {
              const testNote = {
                title: 'Тестовая заметка',
                content: 'Это тестовое содержание заметки',
                type: 'text' as const,
                borderColor: '#bc57ca' as const,
                pinned: false,
              };
              addNote(testNote);
            }}
            className="bg-purple-600 text-white px-3 py-1 rounded"
          >
            + Тестовая заметка
          </button>
        </div>
        
        {/* Список заметок (временный) */}
        <div className="space-y-2">
          {notes.map(note => (
            <div key={note.id} className="bg-black p-3 rounded border border-purple-600 text-white">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">{note.title || 'Без заголовка'}</h3>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-400 text-sm"
                >
                  Удалить
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-1">
                {typeof note.content === 'string' ? note.content.slice(0, 50) : 'Список'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;