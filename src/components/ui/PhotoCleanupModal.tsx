import { useState, useEffect } from 'react';
import { getNoteImage, deleteNoteImage, clearAllImages } from '../../services/indexedDB';
import { useNotesStore } from '../../store/useNotesStore';

interface PhotoCleanupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PhotoCleanupModal({ isOpen, onClose }: PhotoCleanupModalProps) {
  const [photos, setPhotos] = useState<{ id: string; preview: string | null }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { notes, deleteNote } = useNotesStore();

  useEffect(() => {
    if (isOpen) {
      loadPhotos();
    }
  }, [isOpen]);

  const loadPhotos = async () => {
    setIsLoading(true);
    const photoNotes = notes.filter(n => n.type === 'photo' && n.hasImage);
    const loadedPhotos = await Promise.all(
      photoNotes.map(async (note) => ({
        id: note.id,
        preview: await getNoteImage(note.id),
      }))
    );
    setPhotos(loadedPhotos);
    setIsLoading(false);
  };

  const handleDeletePhoto = async (noteId: string) => {
    await deleteNoteImage(noteId);
    deleteNote(noteId);
    setPhotos(prev => prev.filter(p => p.id !== noteId));
  };

  const handleClearAll = async () => {
    await clearAllImages();
    const photoNotes = notes.filter(n => n.type === 'photo');
    photoNotes.forEach(note => deleteNote(note.id));
    setPhotos([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-black rounded-xl w-full max-w-lg max-h-[80vh] overflow-y-auto border-2 border-red-600 p-6">
        <h3 className="text-white text-xl font-semibold mb-3">Управление фотозаметками</h3>
        <p className="text-gray-400 text-sm mb-4">
          Недостаточно места для новых фото. Удалите старые фотозаметки:
        </p>
        
        {isLoading ? (
          <div className="text-center text-gray-400 py-8">Загрузка...</div>
        ) : photos.length === 0 ? (
          <div className="text-center text-gray-400 py-8">Нет фотозаметок для удаления</div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
            {photos.map(photo => (
              <div key={photo.id} className="flex items-center gap-3 bg-gray-900 rounded-lg p-3">
                {photo.preview && (
                  <img src={photo.preview} alt="preview" className="w-12 h-12 object-cover rounded" />
                )}
                <div className="flex-1">
                  <p className="text-white text-sm truncate">ID: {photo.id.slice(0, 8)}...</p>
                </div>
                <button
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex gap-3 mt-4">
          {photos.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Удалить все фото
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}