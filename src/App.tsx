// App.tsx
import { useEffect } from 'react';
import { useNotesStore } from './store/useNotesStore';
import { initDB } from './services/indexedDB';
import { NoteCard } from './components/NoteCard';

function App() {
  const { notes, isLoading, loadNotes, addNote, updateNote, deleteNote } = useNotesStore();

  useEffect(() => {
    loadNotes();
    initDB().catch(console.error);
    
    // Для тестирования из консоли
    (window as any).testNotes = { 
      addNote, 
      updateNote, 
      deleteNote, 
      getNotes: () => useNotesStore.getState().notes 
    };
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
        {/* Заголовок */}
        <h1 className="text-white text-3xl font-bold mb-6">Notes App</h1>
        
        {/* Кнопка добавления тестовой заметки */}
        <button
          onClick={() => {
            const testNote = {
              title: 'Тестовая заметка',
              content: 'Это первая строка\nВторая строка\nТретья строка\nЧетвёртая строка не войдёт в превью',
              type: 'text' as const,
              borderColor: '#bc57ca' as const,
              pinned: false,
              tags: [],
            };
            addNote(testNote);
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg mb-6 transition-colors"
        >
          + Добавить тестовую заметку
        </button>

        {/* Кнопка добавления тестового списка */}
        <button
          onClick={() => {
            const testList = {
              title: 'Мои задачи',
              content: [
                { id: '1', text: 'Купить продукты', isChecked: true },
                { id: '2', text: 'Сделать домашку', isChecked: false },
                { id: '3', text: 'Позвонить маме', isChecked: false },
                { id: '4', text: 'Сходить в спортзал', isChecked: false },
              ],
              type: 'list' as const,
              borderColor: '#38b6ff' as const,
              pinned: false,
              tags: [],
            };
            addNote(testList);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mb-6 ml-2 transition-colors"
        >
          + Добавить тестовый список
        </button>
        
        {/* Статистика */}
        <p className="text-gray-400 mb-4">Всего заметок: {notes.length}</p>
        
        {/* Список заметок */}
        {notes.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p>Нет заметок</p>
            <p className="text-sm mt-2">Нажмите кнопку выше, чтобы создать первую</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <div key={note.id} className="relative group">
                <NoteCard note={note} />
                {/* Кнопка удаления (временная, для тестирования) */}
                <button
                  onClick={() => deleteNote(note.id)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;