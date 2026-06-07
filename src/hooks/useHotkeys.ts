import { useEffect } from 'react';

interface HotkeyOptions {
  onNewNote?: () => void;
  onSaveNote?: () => void;
  onFocusSearch?: () => void;
  onCloseModal?: () => void;
  isModalOpen?: boolean;
}

export function useHotkeys({
  onNewNote,
  onSaveNote,
  onFocusSearch,
  onCloseModal,
  isModalOpen = false,
}: HotkeyOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isTyping = activeElement?.tagName === 'INPUT' || 
                       activeElement?.tagName === 'TEXTAREA' ||
                       (activeElement as HTMLElement)?.isContentEditable;
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!isTyping && onNewNote) {
          onNewNote();
        }
        return;
      }
      
      if ((e.ctrlKey || e.metaKey) && (e.key === 'i' || e.key === 'ш')) {
        e.preventDefault();
        if (isModalOpen && onSaveNote) {
          onSaveNote();
        }
        return;
      }
      
      if ((e.ctrlKey || e.metaKey) && (e.key === 'q' || e.key === 'й')) {
        e.preventDefault();
        if (onFocusSearch) {
          onFocusSearch();
        }
        return;
      }
      
      if (e.key === 'Escape') {
        if (isModalOpen && onCloseModal) {
          e.preventDefault();
          onCloseModal();
        }
        return;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNewNote, onSaveNote, onFocusSearch, onCloseModal, isModalOpen]);
}