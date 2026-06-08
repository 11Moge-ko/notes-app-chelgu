## project_dump.md
```md
```

## .github/CODEOWNERS
```github/CODEOWNERS
* @11Moge-ko```

## .github/ISSUE_TEMPLATE/bug_report.yml
```yml
name: Bug report
description: Report errors or unexpected behavior
title: '[BUG] '
labels: [bug]
assignees: []
body:
  - type: textarea
    id: what-happened
    attributes:
      label: Что случилось?
      description: Краткое описание проблемы
      placeholder: 
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Как повторить?
      description: Шаги, чтобы воспроизвести ошибку
      placeholder: |
        1. Создать заметку
        2. Оставить заголовок пустым
        3. Нажать "Сохранить"
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Что должно было произойти?
      placeholder:
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: Что произошло на самом деле?
      placeholder:
    validations:
      required: true

  - type: input
    id: environment
    attributes:
      label: Окружение
      description: Версия браузера
      placeholder: 
    validations:
      required: true

  - type: textarea
    id: screenshot
    attributes:
      label: Скриншот
      description: Вставьте изображение
    validations:
      required: false
```

## .gitignore
```gitignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules/
dist/
dist-ssr/
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea/
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
*.tmp
*.bak

# vitest
coverage/
*.coverage
.test-results/

# typescript
*.tsbuildinfo
*.d.ts.map

# env
.env
.env.local
.env.*.local
*.env
```

## .vite/deps/_metadata.json
```json
{
  "hash": "de63f4f6",
  "configHash": "19adc150",
  "lockfileHash": "0c211a98",
  "browserHash": "29232751",
  "optimized": {},
  "chunks": {}
}```

## .vite/deps/package.json
```json
{
  "type": "module"
}
```

## LICENSE
```LICENSE
MIT License

Copyright (c) 2026 Моге-ко

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## README.md
```md
# Приложение для создания и управления заметками (Notes App)

Интерактивное веб-приложение для создания, редактирования, удаления и изменения порядка отображения карточек заметок. Проект ориентирован на локальное использование и хранение данных на стороне клиента.

---

## Основной функционал

* **Управление контентом:** Создание, наполнение текстом и удаление заметок.
* **Закрепление заметок:** Фиксация важных карточек в начале общего списка.
* **Автономность:** Сохранение данных в локальной базе данных браузера (данные не сбрасываются при обновлении страницы).

---

## Предварительные требования для запуска

Для сборки и запуска приложения на локальном компьютере требуется среда выполнения **NodeJS версии 18.0.0 или выше**. 

### Инструкция по установке NodeJS:
1. Перейдите на официальный сайт [nodejs.org](https://nodejs.org/).
2. Скачайте и установите версию **LTS** (рекомендованную для большинства пользователей).
3. Перезапустите ваш терминал/командную строку.
4. Проверить корректность установки можно командой:
```bash
   node -v

### Инструкция по запуску
1. Установка зависимостей:
Перейдите в корневую директорию проекта и запустите команду для загрузки всех необходимых пакетов и библиотек, указанных в конфигурации:    npm install
2. Запуск сервера разработки:
Запустите локальный сервер сборщика для компиляции и старта приложения:   npm run dev
3. Открытие приложения:
После успешного выполнения команды в терминале отобразится локальный адрес. Скопируйте его и откройте в браузере:   http://localhost:5173/```

## eslint.config.js
```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
```

## index.html
```html
<!doctype html>
<html>
  <head>
    <title>Заметки</title>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>notes-app-chelgu</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## package.json
```json
{
  "name": "notes-app-chelgu",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "idb": "^8.0.3",
    "lucide-react": "^1.17.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@tailwindcss/vite": "^4.3.0",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^24.12.3",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^10.3.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.6.0",
    "jsdom": "^29.1.1",
    "tailwindcss": "^4.3.0",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.59.2",
    "vite": "^8.0.12",
    "vitest": "^4.1.7"
  }
}
```

## src/App.css
```css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}
```

## src/App.tsx
```tsx
import { useEffect, useState, useRef } from 'react';
import { useNotesStore } from './store/useNotesStore';
import { initDB } from './services/indexedDB';
import { NoteModal } from './components/NoteEditor/NoteModal';
import { SortableNotesSection } from './components/SortableNotesSection';
import { FilterBar } from './components/ui/FilterBar';
import { TemplateModal } from './components/TemplateModal/TemplateModal';
import { SaveTemplateModal } from './components/TemplateModal/SaveTemplateModal';
import { AddNoteMenu } from './components/FloatingActionButton/AddNoteMenu';
import { useDebounce } from './hooks/useDebounce';
import { useHotkeys } from './hooks/useHotkeys';
import { ErrorModal } from './components/ui/ErrorModal';
import { PhotoCleanupModal } from './components/ui/PhotoCleanupModal';
import { ConfirmModal } from './components/ui/ConfirmModal';
import type { Note } from './types';
import type { NoteType } from './types';

function App() {
  const { 
    notes, isLoading, loadNotes, addNote, updateNote, deleteNote, 
    togglePin, reorderNotes, settings, updateSettings,
    templates, loadTemplates, saveAsTemplate, applyTemplate, deleteTemplate,
    errorModal, photoCleanupModalOpen, closeErrorModal,
    closePhotoCleanupModal
  } = useNotesStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isSaveTemplateModalOpen, setIsSaveTemplateModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [currentNoteForTemplate, setCurrentNoteForTemplate] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newNoteType, setNewNoteType] = useState<NoteType>('text');
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const noteModalRef = useRef<{ save: () => void }>(null);
  const filterBarRef = useRef<{ close: () => void }>(null);

  const bgStyle = {
    background: settings.theme === 'light' 
      ? '#ffffff' 
      : 'radial-gradient(circle, rgba(0,0,0,1) 14%, rgba(9,6,19,1) 100%)',
    minHeight: '100vh',
  };

  useEffect(() => {
    loadNotes();
    loadTemplates();
    initDB().catch(console.error);
    (window as any).testNotes = { 
      addNote, 
      updateNote, 
      deleteNote, 
      togglePin,
      getNotes: () => useNotesStore.getState().notes 
    };
  }, [loadNotes, loadTemplates, addNote, updateNote, deleteNote, togglePin]);

  useEffect(() => {
    if (settings.theme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  }, [settings.theme]);

  const handleNewNoteHotkey = () => {
    handleNewNote();
  };

  const handleSaveNoteHotkey = () => {
    if (isModalOpen && noteModalRef.current) {
      noteModalRef.current.save();
    }
  };

  const handleFocusSearchHotkey = () => {
    searchInputRef.current?.focus();
  };

  const handleCloseModalHotkey = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      setEditingNote(null);
    }
    if (isTemplateModalOpen) {
      setIsTemplateModalOpen(false);
    }
    if (filterBarRef.current) {
      filterBarRef.current.close();
    }
  };

  useHotkeys({
    onNewNote: handleNewNoteHotkey,
    onSaveNote: handleSaveNoteHotkey,
    onFocusSearch: handleFocusSearchHotkey,
    onCloseModal: handleCloseModalHotkey,
    isModalOpen: isModalOpen || isTemplateModalOpen,
  });

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags || [])));

  const filterNotesBySearch = (notesList: Note[], query: string): Note[] => {
    if (!query.trim()) return notesList;
    
    const lowerQuery = query.toLowerCase();
    return notesList.filter(note => {
      if (note.title?.toLowerCase().includes(lowerQuery)) return true;
      if (note.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) return true;
      if (typeof note.content === 'string') {
        if (note.content.toLowerCase().includes(lowerQuery)) return true;
      } else if (Array.isArray(note.content)) {
        if (note.content.some(item => item.text.toLowerCase().includes(lowerQuery))) return true;
      }
      return false;
    });
  };

  const filterNotesByFilters = (notesList: Note[]): Note[] => {
    let filtered = [...notesList];
    
    if (settings.filters.pinnedOnly) {
      filtered = filtered.filter(n => n.pinned === true);
    }
    
    if (settings.filters.hasImageOnly) {
      filtered = filtered.filter(n => n.hasImage === true);
    }
    
    if (settings.filters.selectedTags.length > 0) {
      filtered = filtered.filter(n => 
        n.tags?.some(tag => settings.filters.selectedTags.includes(tag))
      );
    }
    
    return filtered;
  };

  const sortNotes = (notesList: Note[]): Note[] => {
    return [...notesList].sort((a, b) => {
      if (settings.sortBy === 'createdAt') {
        return b.createdAt - a.createdAt;
      } else {
        return b.updatedAt - a.updatedAt;
      }
    });
  };

  const handleSaveNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): string => {
    let noteId: string;
    if (editingNote) {
      updateNote(editingNote.id, noteData);
      noteId = editingNote.id;
    } else {
      const newNote = addNote(noteData);
      noteId = newNote.id;
    }
    setIsModalOpen(false);
    setEditingNote(null);
    setNewNoteType('text');
    return noteId;
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleNewNote = () => {
    setEditingNote(null);
    setNewNoteType('text');
    setIsModalOpen(true);
  };

  const handleSaveAsTemplateFromModal = () => {
    if (editingNote) {
      setCurrentNoteForTemplate(editingNote);
      setIsSaveTemplateModalOpen(true);
    }
  };

  const handlePhotoNote = () => {
    setEditingNote(null);
    setNewNoteType('photo');
    setIsModalOpen(true);
  };

  const searchedNotes = filterNotesBySearch(notes, debouncedSearchQuery);
  const filteredByFiltersNotes = filterNotesByFilters(searchedNotes);
  const sortedByDateNotes = sortNotes(filteredByFiltersNotes);

  const finalNotes = [...sortedByDateNotes].sort((a, b) => {
    if (a.pinned === b.pinned) return 0;
    return a.pinned ? -1 : 1;
  });

  const handleReorder = (ids: string[]) => {
    reorderNotes(ids);
  };

  const showNoResults = searchQuery.trim() !== '' && filteredByFiltersNotes.length === 0;
  const showNoFiltersResults = !showNoResults && finalNotes.length === 0 && notes.length > 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={bgStyle}>
        <div className="text-white text-xl">Загрузка Notes App...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={bgStyle}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-primary text-3xl font-bold mb-6">Notes App</h1>
        
        <div className="mb-4 flex gap-3">
          <div className="relative flex-1">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по заметкам... (Ctrl+Q)"
              className="w-full bg-gray-900 text-white px-4 py-3 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-lg"
              >
                ✕
              </button>
            )}
          </div>
          
          <button
            onClick={() => setIsTemplateModalOpen(true)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            📋 Шаблоны
          </button>
        </div>
        
        <FilterBar 
          ref={filterBarRef}
          settings={settings} 
          onSettingsChange={updateSettings} 
          allTags={allTags} 
        />
        
        {notes.length === 0 ? (
          <div className="text-center text-muted py-12">
            <p>Нет заметок</p>
            <p className="text-sm mt-2">Нажмите кнопку +, чтобы создать первую (Ctrl+Enter)</p>
            <p className="text-xs mt-1 text-gray-500">Сохранить заметку (Ctrl+I)</p>
          </div>
        ) : showNoResults ? (
          <div className="text-center text-muted py-12">
            <p>🔍 Ничего не найдено</p>
            <p className="text-sm mt-2">Попробуйте изменить запрос</p>
          </div>
        ) : showNoFiltersResults ? (
          <div className="text-center text-muted py-12">
            <p>🔍 Нет заметок, соответствующих фильтрам</p>
          </div>
        ) : (
          <SortableNotesSection
            notes={finalNotes}
            onReorder={handleReorder}
            onTogglePin={togglePin}
            onEditNote={handleEditNote}
            onDeleteNote={deleteNote}
          />
        )}
      </div>

      <AddNoteMenu
        onNewNote={handleNewNote}
        onFromTemplate={() => setIsTemplateModalOpen(true)}
        onPhotoNote={handlePhotoNote}
      />

      <NoteModal
        ref={noteModalRef}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingNote(null); setNewNoteType('text'); }}
        onSave={handleSaveNote}
        onDelete={deleteNote}
        initialNote={editingNote}
        allTags={allTags}
        onImageSaved={(noteId, base64) => {
          updateNote(noteId, { imageUrl: base64, hasImage: true });
        }}
        onSaveAsTemplate={handleSaveAsTemplateFromModal}
        isTemplateLimitReached={templates.length >= 20}
        newNoteType={newNoteType}
      />

      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelectTemplate={(template) => {
          const noteData = applyTemplate(template);
          addNote(noteData);
          setIsTemplateModalOpen(false);
        }}
        templates={templates}
        onDeleteTemplate={deleteTemplate}
      />

      <SaveTemplateModal
        isOpen={isSaveTemplateModalOpen}
        onClose={() => {
          setIsSaveTemplateModalOpen(false);
          setCurrentNoteForTemplate(null);
        }}
        onSave={(name, description) => {
          if (currentNoteForTemplate) {
            saveAsTemplate(name, description, currentNoteForTemplate);
          }
          setIsSaveTemplateModalOpen(false);
          setCurrentNoteForTemplate(null);
        }}
      />

      <ErrorModal
        isOpen={errorModal?.isOpen || false}
        onClose={closeErrorModal}
        title={errorModal?.title || 'Ошибка'}
        message={errorModal?.message || ''}
        buttons={errorModal?.onExport ? [
          { label: 'Экспортировать данные', onClick: errorModal.onExport, variant: 'secondary' },
          { label: 'OK', onClick: closeErrorModal, variant: 'primary' },
        ] : undefined}
      />

      <PhotoCleanupModal
        isOpen={photoCleanupModalOpen}
        onClose={closePhotoCleanupModal}
      />

      {confirmModal && (
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          message={confirmModal.message}
          onConfirm={() => {
            confirmModal.onConfirm();
            setConfirmModal(null);
          }}
          onCancel={() => setConfirmModal(null)}
          confirmText="Да, удалить"
          cancelText="Нет"
        />
      )}

      <style>{`
        .masonry-grid {
          column-count: 2;
          column-gap: 20px;
        }
        @media (min-width: 768px) {
          .masonry-grid { column-count: 3; }
        }
        @media (min-width: 1024px) {
          .masonry-grid { column-count: 4; }
        }
        @media (min-width: 1280px) {
          .masonry-grid { column-count: 5; }
        }
        .masonry-grid > * {
          break-inside: avoid;
          margin-bottom: 24px;
        }
      `}</style>
    </div>
  );
}

export default App;```

## src/components/FloatingActionButton/AddNoteMenu.tsx
```tsx
import { useState, useRef, useEffect } from 'react';

interface AddNoteMenuProps {
  onNewNote: () => void;
  onFromTemplate: () => void;
  onPhotoNote: () => void;
}

export function AddNoteMenu({ onNewNote, onFromTemplate, onPhotoNote }: AddNoteMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (action: () => void) => {
    setIsOpen(false);
    action();
  };

  return (
    <div className="fixed bottom-6 right-6 z-20" ref={menuRef}>
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden mb-2 min-w-45">
          <button
            onClick={() => handleSelect(onNewNote)}
            className="w-full text-left px-4 py-3 text-white hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <span>📝</span> Заметка
          </button>
          <button
            onClick={() => handleSelect(onFromTemplate)}
            className="w-full text-left px-4 py-3 text-white hover:bg-gray-800 transition-colors flex items-center gap-2 border-t border-gray-800"
          >
            <span>📋</span> Из шаблона
          </button>
          <button
            onClick={() => handleSelect(onPhotoNote)}
            className="w-full text-left px-4 py-3 text-white hover:bg-gray-800 transition-colors flex items-center gap-2 border-t border-gray-800"
          >
            <span>🖼️</span> Фотозаметка
          </button>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white text-3xl font-bold leading-none rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center pb-1"
        title="Новая заметка (Ctrl+Enter)"
      >
        +
      </button>
    </div>
  );
}```

## src/components/NoteCard/NoteCard.tsx
```tsx
import { useState, useEffect } from 'react';
import type { Note, ListItem } from '../../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getNoteImage } from '../../services/indexedDB';

interface NoteCardProps {
  note: Note;
  onTogglePin?: (id: string) => void;
}

export function NoteCard({ note, onTogglePin }: NoteCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: note.id });

  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  useEffect(() => {
    if (note.type === 'photo' && note.hasImage) {
      if (note.imageUrl) {
        setImageUrl(note.imageUrl);
        setIsImageLoading(false);
      } else {
        setIsImageLoading(true);
        getNoteImage(note.id).then(base64 => {
          if (base64) {
            setImageUrl(base64);
          } else {
            setImageUrl(null);
          }
          setIsImageLoading(false);
        }).catch(() => {
          setIsImageLoading(false);
        });
      }
    } else {
      setImageUrl(null);
    }
  }, [note.id, note.type, note.hasImage, note.imageUrl]);

  const getContentPreview = (): string => {
    if (note.type === 'list' && Array.isArray(note.content)) {
      const items = (note.content as ListItem[]).slice(0, 3);
      return items.map(item => `• ${item.text}`).join('\n');
    }
    if (typeof note.content === 'string') {
      return note.content.split('\n').slice(0, 3).join('\n');
    }
    return '';
  };

  const preview = getContentPreview();

  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onTogglePin?.(note.id);
  };

  const isPinned = note.pinned === true;

  const combinedStyle = {
    borderColor: note.borderColor,
    boxShadow: `0 0 0 0 ${note.borderColor}40`,
    ...dragStyle,
  };

  return (
    <div
      ref={setNodeRef}
      style={combinedStyle}
      {...attributes}
      {...listeners}
      className={`
        bg-black rounded-xl p-4 
        border-2
        transition-all duration-100 
        hover:-translate-y-0.5 hover:shadow-lg hover:shadow-current/20
        break-inside-avoid mb-4
        cursor-grab active:cursor-grabbing
        ${isDragging ? 'cursor-grabbing' : ''}
      `}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 4px 12px 0 ${note.borderColor}60`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
        {note.type === 'photo' ? (
          <>
            {/* Изображение на всю ширину карточки */}
            <div className="-mx-4 -mt-4 mb-3 relative">
              {isImageLoading ? (
                <div className="w-full h-48 bg-gray-800 rounded-t-xl flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Загрузка...</span>
                </div>
              ) : imageUrl ? (
                <>
                  <img 
                    src={imageUrl} 
                    alt="preview" 
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  {isPinned && (
                    <button
                      onClick={handlePinClick}
                      className="absolute top-2 right-2 bg-black/60 text-yellow-400 rounded-full w-8 h-8 flex items-center justify-center text-base hover:bg-black/80 transition-colors"
                      title="Открепить"
                    >
                      📌
                    </button>
                  )}
                </>
              ) : (
                <div className="w-full h-48 bg-gray-800 rounded-t-xl flex items-center justify-center">
                  <span className="text-4xl">🖼️</span>
                </div>
              )}
            </div>
            
            {/* Контент под изображением */}
            <div>
              <h3 className="text-white font-medium text-lg break-words line-clamp-2 mb-2">
                {note.title || 'Без заголовка'}
              </h3>
              
              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {note.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="bg-gray-800 text-gray-300 text-xs px-2 py-0.5 rounded-full">
                      #{tag}
                    </span>
                  ))}
                  {note.tags.length > 3 && (
                    <span className="text-gray-500 text-xs">+{note.tags.length - 3}</span>
                  )}
                </div>
              )}
              
              <div className="text-secondary text-sm wrap-break-word line-clamp-4">
                {preview || <span className="text-muted">Нет текста</span>}
              </div>
            </div>
          </>
        ) : (
        <>
          <div className="flex justify-between items-start gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium text-lg break-words line-clamp-2">
                {note.title || 'Без заголовка'}
              </h3>
            </div>
            {isPinned && (
              <button
                onClick={handlePinClick}
                className="text-base shrink-0 text-yellow-400 scale-110 transition-all duration-200 hover:scale-125"
                title="Открепить"
              >
                📌
              </button>
            )}
          </div>
          
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {note.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="bg-gray-800 text-gray-300 text-xs px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
              {note.tags.length > 3 && (
                <span className="text-gray-500 text-xs">+{note.tags.length - 3}</span>
              )}
            </div>
          )}
          
          <div className="text-secondary text-base wrap-break-word line-clamp-4">
            {preview || <span className="text-muted">Нет текста</span>}
          </div>
          
          <div className="text-muted text-xs mt-2 opacity-50">
            {note.type === 'list' && '📋'}
            {note.type === 'text' && '📝'}
          </div>
        </>
      )}
    </div>
  );
}```

## src/components/NoteEditor/NoteModal.tsx
```tsx
import { useState, useEffect, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import type { Note, ListItem, BorderColor, NoteType } from '../../types';
import { generateId } from '../../utils/helpers';
import { TagInput } from '../ui/TagInput';
import { ColorPicker } from '../ui/ColorPicker';
import { getNoteImage, saveNoteImage, deleteNoteImage } from '../../services/indexedDB';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => string;
  onDelete?: (id: string) => void;
  initialNote?: Note | null;
  allTags?: string[];
  onImageSaved?: (noteId: string, base64: string) => void;
  onSaveAsTemplate?: () => void;
  isTemplateLimitReached?: boolean;
  newNoteType?: NoteType;
}

const DRAFT_KEY = 'draft_v1';

export const NoteModal = forwardRef<{ save: () => void }, NoteModalProps>(({ 
  isOpen, onClose, onSave, initialNote, allTags = [],
  onDelete, onImageSaved, onSaveAsTemplate, isTemplateLimitReached = false,
  newNoteType
}, ref) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<NoteType>('text');
  const [textContent, setTextContent] = useState('');
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [borderColor, setBorderColor] = useState<BorderColor>('#bc57ca');
  const [pinned, setPinned] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [savedImageId, setSavedImageId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const resetForm = () => {
    setTitle('');
    setType('text');
    setTextContent('');
    setListItems([]);
    setBorderColor('#bc57ca');
    setPinned(false);
    setTags([]);
    setError('');
    setSelectedImage(null);
    setImagePreview(null);
    setSavedImageId(null);
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
  };

  const convertTextToListItems = (text: string): ListItem[] => {
    if (!text.trim()) return [];
    const lines = text.split('\n');
    return lines.map((line) => ({
      id: generateId(),
      text: line,
      isChecked: false,
    }));
  };

  const convertListItemsToText = (items: ListItem[]): string => {
    return items.map(item => item.text).join('\n');
  };

  const handleTypeChange = (newType: NoteType) => {
    if (newType === type) return;
    
    if (type === 'list') {
      setTextContent(convertListItemsToText(listItems));
      setListItems([]);
    }
    
    if (newType === 'list' && textContent.trim()) {
      setListItems(convertTextToListItems(textContent));
    }
    
    setType(newType);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (isOpen && initialNote && initialNote.type === 'photo' && initialNote.hasImage) {
      setIsImageLoading(true);
      getNoteImage(initialNote.id).then(base64 => {
        if (base64) {
          setImagePreview(base64);
          setSavedImageId(initialNote.id);
        }
        setIsImageLoading(false);
      });
    }
  }, [isOpen, initialNote]);



  useEffect(() => {
    if (isOpen) {
      if (initialNote) {
        setTitle(initialNote.title || '');
        setType(initialNote.type);
        setBorderColor(initialNote.borderColor);
        setPinned(initialNote.pinned);
        setTags(initialNote.tags || []);
        
        if (initialNote.type === 'list' && Array.isArray(initialNote.content)) {
          setListItems(initialNote.content);
          setTextContent('');
        } else if (initialNote.type === 'photo') {
          setTextContent(typeof initialNote.content === 'string' ? initialNote.content : '');
          setListItems([]);
        } else {
          setTextContent(typeof initialNote.content === 'string' ? initialNote.content : '');
          setListItems([]);
        }
        setError('');
      } else {
        resetForm();
        clearDraft();
      }
    }
  }, [isOpen, initialNote]);

  useEffect(() => {
    if (!isOpen || !initialNote) return;
    
    const hasContent = title.trim() || 
                       textContent.trim() || 
                       listItems.length > 0 ||
                       tags.length > 0;
    
    if (!hasContent) return;
    
    const draft = { title, type, borderColor, pinned, tags, textContent, listItems };
    const interval = setInterval(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    }, 30000);
    
    return () => clearInterval(interval);
  }, [isOpen, initialNote, title, type, borderColor, pinned, tags, textContent, listItems]);

    useEffect(() => {
    if (isOpen && !initialNote && newNoteType && newNoteType !== type) {
      setType(newNoteType);
      if (newNoteType === 'photo') {
        setTimeout(() => {
          fileInputRef.current?.click();
        }, 300);
      }
    }
  }, [isOpen, initialNote, newNoteType]);

  const handleClose = useCallback(() => {
    if (initialNote) {
      const hasContent = title.trim() || 
                         textContent.trim() || 
                         listItems.length > 0 ||
                         tags.length > 0;
      
      if (hasContent) {
        const draft = { title, type, borderColor, pinned, tags, textContent, listItems };
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      }
    }
    onClose();
  }, [initialNote, title, type, borderColor, pinned, tags, textContent, listItems, onClose]);

  const handleDelete = () => {
    if (!initialNote) return;
    if (initialNote.type === 'photo' && initialNote.hasImage) {
      deleteNoteImage(initialNote.id);
    }
    onDelete?.(initialNote.id);
    clearDraft();
    resetForm();
    setShowDeleteConfirm(false);
    onClose();
  };

const handleSave = useCallback(async () => {
  let isValid = false;
  let content: string | ListItem[] = '';
  
  if (type === 'text') {
    if (textContent.trim().length >= 1) {
      isValid = true;
      content = textContent;
    }
  } else if (type === 'list') {
    const validItems = listItems.filter(item => item.text.trim());
    if (validItems.length >= 1) {
      isValid = true;
      content = listItems;
    }
  } else if (type === 'photo') {
    if (!imagePreview && !selectedImage) {
      setError('Для фотозаметки необходимо загрузить изображение');
      const uploadArea = document.getElementById('photo-upload-area');
      if (uploadArea) {
        uploadArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    if (textContent.trim().length >= 1 || imagePreview || selectedImage) {
      isValid = true;
      content = textContent;
    }
  }
  
  if (!isValid) {
    setError('Содержание не может быть пустым');
    return;
  }
  
  const noteId = onSave({ 
    title: title.trim(), 
    content, 
    type, 
    borderColor, 
    pinned, 
    tags,
    hasImage: type === 'photo' && (!!selectedImage || !!imagePreview),
    imageUrl: undefined,
  });
  
  if (type === 'photo' && selectedImage) {
    try {
      const base64 = await saveNoteImage(noteId, selectedImage);
      onImageSaved?.(noteId, base64);
    } catch (error) {
      console.error('Ошибка сохранения изображения:', error);
    }
  } else if (type === 'photo' && imagePreview && savedImageId && savedImageId !== noteId) {
    try {
      await deleteNoteImage(savedImageId);
      const blob = await fetch(imagePreview).then(r => r.blob());
      const file = new File([blob], 'img', { type: blob.type });
      const base64 = await saveNoteImage(noteId, file);
      onImageSaved?.(noteId, base64);
    } catch (error) {
      console.error('Ошибка сохранения изображения:', error);
    }
  }
  
  clearDraft();
  resetForm();
  onClose();
}, [type, textContent, listItems, title, borderColor, pinned, tags, initialNote, selectedImage, imagePreview, savedImageId, onSave, onImageSaved, onClose]);

  useImperativeHandle(ref, () => ({
    save: () => {
      if (isOpen) {
        handleSave();
      }
    },
  }));

  const handleAddTag = (tag: string) => {
    if (tags.length < 5 && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const addListItem = () => {
    setListItems([...listItems, { id: generateId(), text: '', isChecked: false }]);
  };

  const updateListItem = (id: string, text: string) => {
    setListItems(listItems.map(item => item.id === id ? { ...item, text } : item));
  };

  const toggleListItem = (id: string) => {
    setListItems(listItems.map(item => item.id === id ? { ...item, isChecked: !item.isChecked } : item));
  };

  const deleteListItem = (id: string) => {
    setListItems(listItems.filter(item => item.id !== id));
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, handleClose]);

  const hasContent = type === 'text' 
    ? textContent.trim().length > 0 
    : type === 'list'
      ? listItems.some(item => item.text.trim().length > 0)
      : textContent.trim().length > 0 || !!imagePreview;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-black rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2" style={{ borderColor }}>
        <div className="sticky top-0 bg-black border-b border-gray-800 p-4 flex justify-between items-center z-10">
          <h2 className="text-white text-xl font-semibold">{initialNote ? 'Редактировать заметку' : 'Новая заметка'}</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white text-2xl leading-none">✕</button>
        </div>
        
        <div ref={modalContentRef} className="p-4 space-y-4">
          <input
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-900 text-white text-lg font-medium px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
          />
          
          <div className="flex gap-2">
            <button
              onClick={() => handleTypeChange('text')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                type === 'text' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              📝 Текст
            </button>
            <button
              onClick={() => handleTypeChange('list')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                type === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              ✓ Список
            </button>
            <button
              onClick={() => handleTypeChange('photo')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                type === 'photo' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              🖼️ Фото
            </button>
          </div>
          
          {type === 'text' && (
            <textarea
              placeholder="Текст заметки..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              rows={8}
              className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 resize-none"
            />
          )}
          
          {type === 'list' && (
            <div className="space-y-2">
              {listItems.map((item) => (
                <div key={item.id} className="flex items-center gap-2 bg-gray-900 rounded-lg p-2">
                  <input
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={() => toggleListItem(item.id)}
                    className="w-5 h-5 accent-purple-600"
                  />
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => updateListItem(item.id, e.target.value)}
                    placeholder="Пункт списка..."
                    className="flex-1 bg-transparent text-white px-2 py-1 focus:outline-none"
                  />
                  <button onClick={() => deleteListItem(item.id)} className="text-red-400 hover:text-red-300 px-2">🗑️</button>
                </div>
              ))}
              <button
                onClick={addListItem}
                className="w-full text-gray-400 hover:text-white text-sm py-2 border border-dashed border-gray-700 rounded-lg hover:border-gray-500 transition-colors"
              >
                + Добавить пункт
              </button>
            </div>
          )}
          
          {type === 'photo' && (
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <div id="photo-upload-area">
                {isImageLoading ? (
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                    <div className="text-gray-400">Загрузка...</div>
                  </div>
                ) : imagePreview ? (
                  <div 
                    className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-900"
                    onClick={openFilePicker}
                  >
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full max-h-96 object-contain block"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white text-sm bg-black/70 px-4 py-2 rounded-lg transition-opacity pointer-events-none">
                        📷 Нажмите, чтобы заменить фото
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openFilePicker();
                      }}
                      className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm transition-colors"
                      type="button"
                      title="Заменить фото"
                    >
                      
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={openFilePicker}
                    className="w-full border-2 border-dashed border-gray-700 rounded-lg p-10 text-center text-purple-400 hover:text-purple-300 hover:border-purple-500 cursor-pointer transition-colors"
                  >
                    <div className="text-5xl mb-2">📷</div>
                    <div className="text-sm">Нажмите, чтобы загрузить фото</div>
                  </button>
                )}
              </div>
              <textarea
                placeholder="Текст под фото..."
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                rows={4}
                className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>
          )}
          
          <TagInput tags={tags} onAddTag={handleAddTag} onRemoveTag={handleRemoveTag} existingTags={allTags} maxTags={5} />
          
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          
          <ColorPicker selectedColor={borderColor} onColorChange={setBorderColor} />
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPinned(!pinned)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                pinned ? 'bg-yellow-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <span>📌</span>
              <span>{pinned ? 'Закреплено' : 'Закрепить'}</span>
            </button>
          </div>
          
          <div className="flex gap-3 pt-4 border-t border-gray-800">
            {initialNote && onDelete && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/50 rounded-lg hover:bg-red-600/30 transition-colors"
              >
                Удалить
              </button>
            )}
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Сохранить
            </button>
          </div>

          {initialNote && onSaveAsTemplate && type !== 'photo' && (
            <button
              onClick={onSaveAsTemplate}
              disabled={!hasContent || isTemplateLimitReached}
              className={`w-full mt-3 px-4 py-2 rounded-lg transition-colors ${
                hasContent && !isTemplateLimitReached
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-800 text-gray-600 cursor-not-allowed'
              }`}
            >
              📋 Сохранить как шаблон
            </button>
          )}

          {isTemplateLimitReached && (
            <div className="text-yellow-500 text-sm text-center">
              Достигнут лимит шаблонов (20). Удалите неиспользуемый
            </div>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90"
          onClick={(e) => e.target === e.currentTarget && setShowDeleteConfirm(false)}
        >
          <div className="bg-black rounded-xl w-full max-w-md border-2 border-red-600 p-6">
            <h3 className="text-white text-lg font-semibold mb-3">Удалить заметку?</h3>
            <p className="text-gray-400 text-sm mb-5">
              Вы уверены? Вернуть заметку будет нельзя.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Нет
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Да, удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

NoteModal.displayName = 'NoteModal';```

## src/components/SortableNotesSection.tsx
```tsx
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { NoteCard } from './NoteCard/NoteCard';
import type { Note } from '../types';

interface SortableNotesSectionProps {
  notes: Note[];
  onReorder: (ids: string[]) => void;
  onTogglePin: (id: string) => void;
  onEditNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
}

export function SortableNotesSection({
  notes,
  onReorder,
  onTogglePin,
  onEditNote,
}: SortableNotesSectionProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = notes.findIndex((n) => n.id === active.id);
      const newIndex = notes.findIndex((n) => n.id === over.id);
      const newOrder = arrayMove(notes, oldIndex, newIndex).map((n) => n.id);
      onReorder(newOrder);
    }
  };

  const handleCardClick = (note: Note) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    onEditNote(note);
  };

  if (notes.length === 0) {
    return (
      <div className="text-muted text-center py-8">
        Нет заметок
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={notes.map((n) => n.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="masonry-grid">
          {notes.map((note) => (
            <div key={note.id}>
              <div onClick={() => handleCardClick(note)} className="cursor-pointer">
                <NoteCard note={note} onTogglePin={onTogglePin} />
              </div>
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}```

## src/components/TemplateModal/SaveTemplateModal.tsx
```tsx
import { useState } from 'react';

interface SaveTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
}

export function SaveTemplateModal({ isOpen, onClose, onSave }: SaveTemplateModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim()) {
      setError('Название обязательно');
      return;
    }
    if (name.length > 50) {
      setError('Название не может быть длиннее 50 символов');
      return;
    }
    onSave(name.trim(), description.trim());
    setName('');
    setDescription('');
    setError('');
    onClose();
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="bg-black rounded-xl w-full max-w-md border-2 border-purple-600">
        <div className="border-b border-gray-800 p-4 flex justify-between items-center">
          <h2 className="text-white text-xl font-semibold">Сохранить как шаблон</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white text-2xl leading-none">✕</button>
        </div>
        
        <div className="p-4 space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Название шаблона *"
            className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
            autoFocus
          />
          
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание (необязательно)"
            rows={3}
            className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 resize-none"
          />
          
          {error && <div className="text-red-400 text-sm">{error}</div>}
          
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}```

## src/components/TemplateModal/TemplateModal.tsx
```tsx
import { useState, useEffect } from 'react';
import type { Template } from '../../types';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
  templates: Template[];
  onDeleteTemplate?: (id: string) => void;
}

export function TemplateModal({ isOpen, onClose, onSelectTemplate, templates, onDeleteTemplate }: TemplateModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-black rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto border-2 border-purple-600">
        <div className="sticky top-0 bg-black border-b border-gray-800 p-4 flex justify-between items-center">
          <h2 className="text-white text-xl font-semibold">Выбрать шаблон</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">✕</button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск шаблона..."
              className="w-full bg-gray-900 text-white px-4 py-2 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
          </div>
          
          {filteredTemplates.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p>Нет сохранённых шаблонов</p>
              <p className="text-sm mt-2">Создайте первый, нажав "Сохранить как шаблон" в редакторе</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-gray-900 rounded-lg p-3 hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex justify-between items-start">
                    <div
                      onClick={() => onSelectTemplate(template)}
                      className="flex-1 cursor-pointer"
                    >
                      <h3 className="text-white font-medium">{template.name}</h3>
                      {template.description && (
                        <p className="text-gray-400 text-sm mt-1">{template.description}</p>
                      )}
                      <div className="flex gap-3 mt-2 text-xs text-gray-500">
                        <span>{template.type === 'text' ? '📝 Текст' : '✓ Список'}</span>
                        <span>📊 Использован: {template.usageCount} раз</span>
                      </div>
                    </div>
                    {onDeleteTemplate && (
                      <button
                        onClick={() => onDeleteTemplate(template.id)}
                        className="text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex gap-3 pt-4 border-t border-gray-800">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}```

## src/components/ui/ColorPicker.tsx
```tsx
import { useNotesStore } from '../../store/useNotesStore';
import type { BorderColor } from '../../types';

interface ColorPickerProps {
  selectedColor: BorderColor;
  onColorChange: (color: BorderColor) => void;
}

const colors: { value: BorderColor; label: string }[] = [
  { value: '#bc57ca', label: 'Фиолетовый' },
  { value: '#ff3856', label: 'Розовый' },
  { value: '#38b6ff', label: 'Голубой' },
  { value: '#57ca8e', label: 'Зелёный' },
];

export function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  const { settings } = useNotesStore();
  const isLightTheme = settings.theme === 'light';

  return (
    <div className="space-y-2">
      <label className={`text-sm ${isLightTheme ? 'text-gray-700' : 'text-gray-400'}`}>
        Цвет обводки
      </label>
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`
              w-8 h-8 rounded-full transition-all duration-200
              hover:scale-110 focus:outline-none
              ${selectedColor === color.value 
                ? isLightTheme 
                  ? 'ring-2 ring-gray-900 scale-110' 
                  : 'ring-2 ring-white scale-110'
                : 'ring-0'
              }
            `}
            style={{ backgroundColor: color.value }}
            title={color.label}
            aria-label={color.label}
          />
        ))}
      </div>
    </div>
  );
}```

## src/components/ui/ConfirmModal.tsx
```tsx
interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Отмена',
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="bg-black rounded-xl w-full max-w-sm border-2 border-purple-600 p-5">
        <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm mb-5 whitespace-pre-line">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}```

## src/components/ui/ErrorModal.tsx
```tsx
interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttons?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'danger' | 'secondary';
  }[];
}

export function ErrorModal({ isOpen, onClose, title, message, buttons }: ErrorModalProps) {
  if (!isOpen) return null;

  const defaultButtons = buttons || [
    { label: 'OK', onClick: onClose, variant: 'primary' as const },
  ];

  return (
    <div 
      className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-black rounded-xl w-full max-w-md border-2 border-red-600 p-6">
        <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-400 text-sm mb-5 whitespace-pre-line">{message}</p>
        <div className="flex gap-3">
          {defaultButtons.map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.onClick}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                btn.variant === 'danger' 
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : btn.variant === 'secondary'
                    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}```

## src/components/ui/FilterBar.tsx
```tsx
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import type { Settings } from '../../types';

interface FilterBarProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
  allTags: string[];
}

export const FilterBar = forwardRef<{ close: () => void }, FilterBarProps>(({ settings, onSettingsChange, allTags }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    close: () => {
      setIsOpen(false);
      setIsSettingsOpen(false);
    },
  }));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortChange = (sortBy: 'createdAt' | 'updatedAt') => {
    onSettingsChange({ ...settings, sortBy });
  };

  const handleFilterChange = (filterKey: keyof typeof settings.filters, value: boolean | string) => {
    if (filterKey === 'selectedTags') {
      const tag = value as string;
      const newTags = settings.filters.selectedTags.includes(tag)
        ? settings.filters.selectedTags.filter((t: string) => t !== tag)
        : [...settings.filters.selectedTags, tag];
      onSettingsChange({
        ...settings,
        filters: { ...settings.filters, selectedTags: newTags }
      });
    } else {
      onSettingsChange({
        ...settings,
        filters: { ...settings.filters, [filterKey]: value as boolean }
      });
    }
  };

  const handleThemeChange = () => {
    const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
    onSettingsChange({ ...settings, theme: newTheme });
    
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
      document.body.style.background = '#ffffff';
    } else {
      document.documentElement.classList.remove('light');
      document.body.style.background = 'var(--bg-app)';
    }
  };

  const handleExportData = () => {
    const notes = localStorage.getItem('notes_v1');
    const templates = localStorage.getItem('templates_v1');
    const settingsData = localStorage.getItem('settings_v1');
    const exportData = {
      notes: notes ? JSON.parse(notes) : [],
      templates: templates ? JSON.parse(templates) : [],
      settings: settingsData ? JSON.parse(settingsData) : {},
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

    const handleImportData = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/json,.json';
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;
        
        try {
          const text = await file.text();
          const data = JSON.parse(text);
          
          // Поддержка двух форматов:
          // 1. Полная структура { notes, templates, settings, exportDate }
          // 2. Просто массив заметок (для обратной совместимости)
          const notes = Array.isArray(data) ? data : data.notes;
          const templates = data.templates;
          const settings = data.settings;
          
          if (!notes || !Array.isArray(notes)) {
            alert('Неверный формат файла: отсутствуют заметки');
            return;
          }
          
          const proceed = confirm(
            `Импорт ${notes.length} заметок${templates ? ` и ${templates.length} шаблонов` : ''}.\n\n` +
            `Текущие данные будут ЗАМЕНЕНЫ. Продолжить?`
          );
          
          if (!proceed) return;
          
          localStorage.setItem('notes_v1', JSON.stringify(notes));
          if (templates && Array.isArray(templates)) {
            localStorage.setItem('templates_v1', JSON.stringify(templates));
          }
          if (settings && typeof settings === 'object') {
            localStorage.setItem('settings_v1', JSON.stringify(settings));
          }
          
          window.location.reload();
        } catch (error) {
          console.error('Ошибка импорта:', error);
          alert('Не удалось прочитать файл. Убедитесь, что это корректный JSON.');
        }
      };
      input.click();
  };

  const handleClearAllData = () => {
    if (confirm('Вы уверены? Вернуть заметки будет нельзя!')) {
      localStorage.removeItem('notes_v1');
      localStorage.removeItem('draft_v1');
      indexedDB.deleteDatabase('NotesAppDB');
      window.location.reload();
    }
  };

  const activeFiltersCount = [
    settings.filters.pinnedOnly,
    settings.filters.hasImageOnly,
    settings.filters.selectedTags.length > 0
  ].filter(Boolean).length;

  return (
    <div className="mb-6 flex gap-3 items-center flex-wrap">
      <select
        value={settings.sortBy}
        onChange={(e) => handleSortChange(e.target.value as 'createdAt' | 'updatedAt')}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 cursor-pointer"
      >
        <option value="updatedAt">📅 По дате изменения</option>
        <option value="createdAt">✨ По дате создания</option>
      </select>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isOpen || activeFiltersCount > 0
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          🔽 Фильтры
          {activeFiltersCount > 0 && (
            <span className="bg-yellow-500 text-black text-xs px-1.5 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
            <div className="p-3 space-y-3">
              <div className="text-white text-sm font-medium border-b border-gray-700 pb-2">Фильтры</div>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.filters.pinnedOnly}
                  onChange={(e) => handleFilterChange('pinnedOnly', e.target.checked)}
                  className="w-4 h-4 accent-purple-600"
                />
                <span className="text-gray-300 text-sm">📌 Только закреплённые</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.filters.hasImageOnly}
                  onChange={(e) => handleFilterChange('hasImageOnly', e.target.checked)}
                  className="w-4 h-4 accent-purple-600"
                />
                <span className="text-gray-300 text-sm">🖼️ Только с фото</span>
              </label>
              
              {allTags.length > 0 && (
                <div className="border-t border-gray-700 pt-2 mt-1">
                  <div className="text-gray-400 text-xs mb-2">Теги:</div>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag: string) => (
                      <label key={tag} className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.filters.selectedTags.includes(tag)}
                          onChange={() => handleFilterChange('selectedTags', tag)}
                          className="w-3.5 h-3.5 accent-purple-600"
                        />
                        <span className="text-gray-300 text-xs">#{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              
              {activeFiltersCount > 0 && (
                <button
                  onClick={() => {
                    onSettingsChange({
                      ...settings,
                      filters: { pinnedOnly: false, hasImageOnly: false, selectedTags: [] }
                    });
                  }}
                  className="w-full mt-2 text-center text-xs text-purple-400 hover:text-purple-300 py-1 border-t border-gray-700"
                >
                  Сбросить все фильтры
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="relative" ref={settingsRef}>
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="bg-gray-800 text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          ⚙️ Настройки
        </button>

        {isSettingsOpen && (
          <div className="absolute top-full right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
            <div className="p-2 space-y-1">
              <button
                onClick={handleThemeChange}
                className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <span>{settings.theme === 'dark' ? '🌞' : '🌙'}</span>
                {settings.theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
              </button>
              <button
                onClick={handleExportData}
                className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
              >
                📤 Экспорт в JSON
              </button>
              <button
                onClick={handleImportData}
                className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
              >
                📥 Импорт из JSON
              </button>
              <button
                onClick={handleClearAllData}
                className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors flex items-center gap-2"
              >
                🗑️ Стереть все заметки
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

FilterBar.displayName = 'FilterBar';```

## src/components/ui/PhotoCleanupModal.tsx
```tsx
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
}```

## src/components/ui/TagInput.tsx
```tsx
import { useState, useRef, useEffect } from 'react';

interface TagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  existingTags: string[];
  maxTags?: number;
}

export function TagInput({ tags, onAddTag, onRemoveTag, existingTags, maxTags = 5 }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = existingTags.filter(
        tag => tag.toLowerCase().includes(inputValue.toLowerCase()) && !tags.includes(tag)
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, existingTags, tags]);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < maxTags) {
      onAddTag(trimmedTag);
    }
    setInputValue('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (inputValue.trim()) {
        addTag(inputValue);
      }
      setShowSuggestions(false);
    }, 150);
  };

  const handleSuggestionClick = (suggestion: string) => {
    addTag(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-2">
      <label className="text-gray-400 text-sm">Теги (до {maxTags})</label>
      
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={() => inputValue.trim() && setShowSuggestions(suggestions.length > 0)}
          placeholder="Добавить тег..."
          disabled={tags.length >= maxTags}
          className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 disabled:opacity-50"
        />
        
        {showSuggestions && (
          <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
              >
                #{suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div key={tag} className="flex items-center gap-1 bg-gray-800 rounded-full px-3 py-1 text-sm text-gray-300">
              <span>#{tag}</span>
              <button onClick={() => onRemoveTag(tag)} className="text-gray-500 hover:text-red-400 transition-colors ml-1">✕</button>
            </div>
          ))}
        </div>
      )}
      
      {tags.length >= maxTags && (
        <p className="text-yellow-500 text-xs">Достигнут лимит тегов ({maxTags})</p>
      )}
    </div>
  );
}```

## src/hooks/useDebounce.ts
```ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}```

## src/hooks/useHotkeys.ts
```ts
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
}```

## src/index.css
```css
@import "tailwindcss";

:root {
  --bg-app: radial-gradient(circle, rgba(0,0,0,1) 14%, rgba(9,6,19,1) 100%);
  --bg-panel: #1a1a1a;
  --bg-card: #000000;
  --border-purple: #bc57ca;
  --border-pink: #ff3856;
  --border-blue: #38b6ff;
  --border-green: #57ca8e;
  --text-primary: #ffffff;
  --text-secondary: #e0e0e0;
  --text-muted: #a0a0a0;
  --accent: #bc57ca;
  --accent-hover: #d67be0;
  --danger: #ff3856;
}

body {
  margin: 0;
  min-height: 100vh;
  background: var(--bg-app);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: background 0.3s ease, color 0.3s ease;
}

.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.text-muted { color: var(--text-muted); }

.border-purple { border-color: var(--border-purple); }
.border-pink { border-color: var(--border-pink); }
.border-blue { border-color: var(--border-blue); }
.border-green { border-color: var(--border-green); }

/* ========== СВЕТЛАЯ ТЕМА ========== */
.light body {
  background: #ffffff !important;
}

.light .bg-black {
  background-color: #ffffff !important;
}

.light .bg-gray-800,
.light .bg-gray-900 {
  background-color: #f5f5f5 !important;
}

.light .text-white,
.light h1,
.light h2,
.light h3,
.light .text-gray-300,
.light .text-gray-400,
.light .text-gray-500,
.light .text-muted,
.light .text-secondary,
.light .text-primary {
  color: #000000 !important;
}

.light .border-gray-700,
.light .border-gray-800 {
  border-color: #e0e0e0 !important;
}

.light button.bg-purple-600 {
  background-color: #bc57ca !important;
  color: white !important;
}

.light button.bg-gray-800 {
  background-color: #e0e0e0 !important;
  color: #000000 !important;
}

.light button.bg-gray-800:hover {
  background-color: #cccccc !important;
}

.light input,
.light textarea,
.light select {
  background-color: #ffffff !important;
  color: #000000 !important;
  border-color: #cccccc !important;
}

.light input:focus,
.light textarea:focus {
  border-color: #bc57ca !important;
  outline: none;
}

.light .bg-black\/80,
.light .bg-black\/90 {
  background-color: rgba(255, 255, 255, 0.95) !important;
}

.light .fixed.inset-0 .bg-black,
.light .bg-black.rounded-xl {
  background-color: #ffffff !important;
}

.light .text-yellow-400 {
  color: #e6b800 !important;
}

.light .bg-yellow-600 {
  background-color: #e6b800 !important;
  color: #000000 !important;
}

.light .border-red-600 {
  border-color: #dc2626 !important;
}

.light .bg-red-600 {
  background-color: #dc2626 !important;
  color: white !important;
}

.light .bg-red-600\/20 {
  background-color: rgba(220, 38, 38, 0.1) !important;
}

.light .text-red-400 {
  color: #dc2626 !important;
}

.light .bg-purple-600 {
  background-color: #bc57ca !important;
}

.light .bg-green-600 {
  background-color: #22c55e !important;
}

.light .border-purple-600 {
  border-color: #bc57ca !important;
}

.light .text-purple-400 {
  color: #bc57ca !important;
}

.light .bg-gray-700 {
  background-color: #e0e0e0 !important;
  color: #000000 !important;
}

.light .text-gray-600 {
  color: #666666 !important;
}

.light .divide-gray-700 > * {
  border-color: #e0e0e0 !important;
}

.light .bg-black\/80 .bg-black,
.light .bg-black\/90 .bg-black,
.light .bg-black\/80 .rounded-xl,
.light .bg-black\/90 .rounded-xl {
  background-color: #ffffff !important;
}

.light .bg-black\/80 .text-gray-400,
.light .bg-black\/90 .text-gray-400,
.light .bg-black\/80 .text-gray-300,
.light .bg-black\/90 .text-gray-300 {
  color: #000000 !important;
}

.light button.bg-purple-600,
.light button.bg-purple-600:hover {
  background-color: #bc57ca !important;
  color: white !important;
}

.light button.bg-red-600,
.light button.bg-red-600:hover {
  background-color: #dc2626 !important;
  color: white !important;
}

.light .bg-black\/80 button.bg-gray-800,
.light .bg-black\/90 button.bg-gray-800 {
  background-color: #e0e0e0 !important;
  color: #000000 !important;
}```

## src/main.tsx
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## src/services/indexedDB.ts
```ts
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
}```

## src/services/localStorage.ts
```ts
import type { Note, Settings, Template } from '../types';

const NOTES_KEY = 'notes_v1';
const TEMPLATES_KEY = 'templates_v1';
const SETTINGS_KEY = 'settings_v1';

export function isQuotaExceededError(error: unknown): boolean {
  return error instanceof DOMException && 
    (error.name === 'QuotaExceededError' || error.code === 22);
}

export function safeSaveNotes(notes: Note[]): { success: boolean; error?: Error } {
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    return { success: true };
  } catch (error) {
    if (isQuotaExceededError(error)) {
      return { success: false, error: new Error('QUOTA_EXCEEDED') };
    }
    throw error;
  }
}

export function getNotes(): Note[] {
  const data = localStorage.getItem(NOTES_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    console.error('Ошибка парсинга заметок');
    throw new Error('CORRUPTED_DATA');
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
}```

## src/services/templateService.ts
```ts
import type { Note, Template, ListItem, BorderColor } from '../types';
import { generateId, now } from '../utils/helpers';

const STORAGE_KEY = 'templates_v1';
const MAX_TEMPLATES = 20;

export interface TemplateInput {
  name: string;
  title: string;
  description?: string;
  content: string | ListItem[];
  type: 'text' | 'list';
  borderColor: BorderColor;
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

function normalizeContentForSave(content: string | ListItem[]): string | ListItem[] {
  if (Array.isArray(content)) {
    return content;
  }
  if (typeof content === 'string') {
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return parsed as ListItem[];
      }
    } catch {
      // не парсится
    }
  }
  return content;
}

function normalizeContentForApply(content: string | ListItem[]): string | ListItem[] {
  if (Array.isArray(content)) {
    return content;
  }
  if (typeof content === 'string') {
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return parsed as ListItem[];
      }
    } catch {
      // не парсится
    }
  }
  return content;
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
    title: input.title,
    description: input.description?.trim() || undefined,
    content: normalizeContentForSave(input.content),
    type: input.type,
    borderColor: input.borderColor,
    tags: input.tags?.filter(Boolean) || [],
    createdAt: now(),
    usageCount: 0,
  };

  templates.push(template);
  saveAll(templates);
  return template;
}

export function saveTemplateFromNote(
  note: Pick<Note, 'content' | 'type' | 'tags' | 'borderColor' | 'title'>,
  name: string,
  description?: string
): Template {
  if (note.type === 'photo') {
    throw new Error('Фотозаметки нельзя сохранять как шаблон');
  }
  return saveTemplate({
    name,
    title: note.title,
    description,
    content: note.content,
    type: note.type,
    borderColor: note.borderColor,
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
    title: t.title,
    content: normalizeContentForApply(t.content),
    type: t.type,
    borderColor: t.borderColor,
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
}```

## src/store/useNotesStore.ts
```ts
import { create } from 'zustand';
import type { Note, Settings, Template } from '../types';
import { 
  getNotes, saveNotes, 
  deleteNote as deleteNoteFromStorage,
  getSettings, saveSettings,
  getTemplates, addTemplate, deleteTemplate, updateTemplateUsage,
  safeSaveNotes
} from '../services/localStorage';
import { generateId, now } from '../utils/helpers';
import { deleteNoteImage, saveNoteImage } from '../services/indexedDB';

interface ErrorModalState {
  isOpen: boolean;
  title: string;
  message: string;
  onExport?: () => void;
}

interface NotesStore {
  notes: Note[];
  settings: Settings;
  templates: Template[];
  isLoading: boolean;
  isLoadingTemplates: boolean;
  errorModal: ErrorModalState | null;
  photoCleanupModalOpen: boolean;
  
  loadNotes: () => void;
  loadTemplates: () => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => Note;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  reorderNotes: (ids: string[]) => void;
  updateSettings: (updates: Partial<Settings>) => void;
  saveAsTemplate: (name: string, description: string, note: Note) => boolean;
  applyTemplate: (template: Template) => Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
  deleteTemplate: (id: string) => void;
  updateNoteImage: (id: string, base64: string) => Promise<void>;
  showErrorModal: (title: string, message: string, onExport?: () => void) => void;
  closeErrorModal: () => void;
  showPhotoCleanupModal: () => void;
  closePhotoCleanupModal: () => void;
}

export const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  settings: getSettings(),
  templates: [],
  isLoading: true,
  isLoadingTemplates: true,
  errorModal: null,
  photoCleanupModalOpen: false,

  showErrorModal: (title, message, onExport) => {
    set({ errorModal: { isOpen: true, title, message, onExport } });
  },

  closeErrorModal: () => {
    set({ errorModal: null });
  },

  showPhotoCleanupModal: () => {
    set({ photoCleanupModalOpen: true });
  },

  closePhotoCleanupModal: () => {
    set({ photoCleanupModalOpen: false });
  },

  loadNotes: () => {
    try {
      const notes = getNotes();
      const normalizedNotes = notes.map(note => ({
        ...note,
        pinned: note.pinned === true,
      }));
      set({ notes: normalizedNotes, isLoading: false });
      console.log('📝 Загружено заметок:', normalizedNotes.length);
    } catch (error) {
      console.error('Ошибка загрузки заметок:', error);
      set({ 
        isLoading: false,
        errorModal: {
          isOpen: true,
          title: 'Ошибка загрузки данных',
          message: 'Данные повреждены. Загрузите экспортированные данные',
          onExport: () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'application/json';
            input.onchange = async (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                const text = await file.text();
                try {
                  const data = JSON.parse(text);
                  if (data.notes) localStorage.setItem('notes_v1', JSON.stringify(data.notes));
                  if (data.templates) localStorage.setItem('templates_v1', JSON.stringify(data.templates));
                  if (data.settings) localStorage.setItem('settings_v1', JSON.stringify(data.settings));
                  window.location.reload();
                } catch {
                  alert('Неверный формат файла');
                }
              }
            };
            input.click();
          }
        }
      });
    }
  },

  loadTemplates: () => {
    const templates = getTemplates();
    set({ templates, isLoadingTemplates: false });
    console.log('📋 Загружено шаблонов:', templates.length);
  },

  addNote: (noteData) => {
    const newNote: Note = {
      ...noteData,
      id: generateId(),
      createdAt: now(),
      updatedAt: now(),
      pinned: noteData.pinned === true,
      tags: noteData.tags || [],
      hasImage: noteData.type === 'photo' ? !!noteData.imageUrl : false,
    };
    
    const currentNotes = get().notes;
    const newNotes = [newNote, ...currentNotes];
    const { success, error } = safeSaveNotes(newNotes);
    
    if (!success && error?.message === 'QUOTA_EXCEEDED') {
      get().showErrorModal(
        'Не удалось сохранить!',
        'Освободите место, удалив старые заметки',
        () => {
          const exportData = {
            notes: get().notes,
            templates: get().templates,
            settings: get().settings,
            exportDate: new Date().toISOString(),
          };
          const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `notes-backup-${Date.now()}.json`;
          a.click();
          URL.revokeObjectURL(url);
        }
      );
      return newNote; 
    }
    
    set({ notes: newNotes });
    console.log('✅ Добавлена заметка:', newNote.id, 'pinned:', newNote.pinned);
    return newNote;
  },

  updateNote: (id, updates) => {
    const currentNotes = get().notes;
    const updatedNotes = currentNotes.map(note =>
      note.id === id ? { ...note, ...updates, updatedAt: now() } : note
    );
    
    const { success, error } = safeSaveNotes(updatedNotes);
    
    if (!success && error?.message === 'QUOTA_EXCEEDED') {
      get().showErrorModal(
        'Не удалось сохранить изменения!',
        'Освободите место, удалив старые заметки',
        () => {
          const exportData = {
            notes: get().notes,
            templates: get().templates,
            settings: get().settings,
            exportDate: new Date().toISOString(),
          };
          const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `notes-backup-${Date.now()}.json`;
          a.click();
          URL.revokeObjectURL(url);
        }
      );
      return;
    }
    
    set({ notes: updatedNotes });
    console.log('✏️ Обновлена заметка:', id, updates);
  },

  deleteNote: (id) => {
    deleteNoteImage(id).catch(console.error);
    deleteNoteFromStorage(id);
    set(state => ({
      notes: state.notes.filter(note => note.id !== id)
    }));
    console.log('🗑️ Удалена заметка:', id);
  },

  togglePin: (id: string) => {
    console.log('🔄 togglePin вызван для:', id);
    
    const currentNotes = get().notes;
    const currentNote = currentNotes.find(n => n.id === id);
    if (!currentNote) {
      console.log('❌ Заметка не найдена:', id);
      return;
    }
    
    const newPinnedValue = !currentNote.pinned;
    console.log(`Заметка "${currentNote.title}" была ${currentNote.pinned}, станет ${newPinnedValue}`);
    
    const updatedNotes = currentNotes.map(note =>
      note.id === id 
        ? { ...note, pinned: newPinnedValue, updatedAt: now() }
        : note
    );
    
    const sortedNotes = [...updatedNotes].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });
    
    saveNotes(sortedNotes);
    set({ notes: sortedNotes });
  },

  reorderNotes: (ids: string[]) => {
    set(state => {
      const notesMap = new Map(state.notes.map(note => [note.id, note]));
      const reorderedNotes = ids.map(id => notesMap.get(id)).filter(Boolean) as Note[];
      const remainingNotes = state.notes.filter(note => !ids.includes(note.id));
      const newNotes = [...reorderedNotes, ...remainingNotes];
      
      saveNotes(newNotes);
      return { notes: newNotes };
    });
  },

  updateSettings: (updates) => {
    set(state => {
      const newSettings = { ...state.settings, ...updates };
      saveSettings(newSettings);
      return { settings: newSettings };
    });
  },

  saveAsTemplate: (name: string, description: string, note: Note) => {
    try {
      const newTemplate: Template = {
        id: generateId(),
        name,
        title: note.title,
        description,
        content: note.content,
        type: note.type === 'photo' ? 'text' : note.type,
        borderColor: note.borderColor,
        tags: note.tags,
        createdAt: now(),
        usageCount: 0,
      };
      
      addTemplate(newTemplate);
      set(state => ({ templates: [newTemplate, ...state.templates] }));
      return true;
    } catch (error) {
      console.error('Ошибка сохранения шаблона:', error);
      return false;
    }
  },

  applyTemplate: (template: Template) => {
    updateTemplateUsage(template.id);
    
    set(state => ({
      templates: state.templates.map(t =>
        t.id === template.id ? { ...t, usageCount: t.usageCount + 1 } : t
      )
    }));
    
    let content: string | import('../types').ListItem[] = template.content;
    if (typeof template.content === 'string') {
      try {
        const parsed = JSON.parse(template.content);
        if (Array.isArray(parsed)) {
          content = parsed;
        }
      } catch {
        // оставляем как строку
      }
    }
    
    return {
      title: template.title,
      content,
      type: template.type,
      borderColor: template.borderColor,
      pinned: false,
      tags: template.tags || [],
    };
  },

  deleteTemplate: (id: string) => {
    deleteTemplate(id);
    set(state => ({
      templates: state.templates.filter(t => t.id !== id)
    }));
    console.log('🗑️ Удалён шаблон:', id);
  },

  updateNoteImage: async (id: string, base64: string) => {
    const response = await fetch(base64);
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type });
    await saveNoteImage(id, file);
  },
}));```

## src/store/useTemplateStore.ts
```ts
import { create } from 'zustand';
import type { Note, Template } from '../types';
import * as templateService from '../services/templateService';

interface TemplateStore {
  templates: Template[];
  isLoading: boolean;
  loadTemplates: () => void;
  createFromNote: (
    note: Pick<Note, 'content' | 'type' | 'tags' | 'borderColor' | 'title'>,
    name: string,
    description?: string
  ) => Template | null;
  deleteTemplate: (id: string) => void;
  updateTemplate: (id: string, updates: { name?: string; description?: string }) => void;
  applyTemplate: (id: string) => Omit<Note, 'id' | 'createdAt' | 'updatedAt'> | null;
  searchTemplates: (query: string) => Template[];
  isLimitReached: () => boolean;
  clearAll: () => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  templates: [],
  isLoading: true,

  loadTemplates: () => {
    set({ templates: templateService.getTemplates(), isLoading: false });
  },

  createFromNote: (note, name, description) => {
    try {
      const template = templateService.saveTemplateFromNote(note, name, description);
      set(state => ({ templates: [template, ...state.templates] }));
      return template;
    } catch {
      return null;
    }
  },

  deleteTemplate: (id) => {
    if (templateService.deleteTemplate(id)) {
      set(state => ({ templates: state.templates.filter(t => t.id !== id) }));
    }
  },

  updateTemplate: (id, updates) => {
    try {
      const updated = templateService.updateTemplate(id, updates);
      if (updated) {
        set(state => ({
          templates: state.templates.map(t => (t.id === id ? updated : t)),
        }));
      }
    } catch {
      // ignore
    }
  },

  applyTemplate: (id) => {
    const data = templateService.applyTemplate(id);
    if (data) {
      set(state => ({
        templates: state.templates.map(t =>
          t.id === id ? { ...t, usageCount: t.usageCount + 1 } : t
        ),
      }));
    }
    return data;
  },

  searchTemplates: (query) => templateService.searchTemplates(query),

  isLimitReached: () => templateService.isLimitReached(),

  clearAll: () => {
    templateService.clearAllTemplates();
    set({ templates: [] });
  },
}));```

## src/types/index.ts
```ts
export type BorderColor = '#bc57ca' | '#ff3856' | '#38b6ff' | '#57ca8e';
export type NoteType = 'text' | 'list' | 'photo';

export interface ListItem {
  id: string;
  text: string;
  isChecked: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string | ListItem[];
  type: NoteType;
  borderColor: BorderColor;
  tags?: string[];
  pinned: boolean;
  createdAt: number;
  updatedAt: number;
  templateId?: string;
  completedItems?: number;
  totalItems?: number;
  hasImage?: boolean;
  imageUrl?: string;
}

export interface Template {
  id: string;
  name: string;
  title: string;
  description?: string;
  content: string | ListItem[];
  type: 'text' | 'list';
  borderColor: BorderColor;
  tags?: string[];
  createdAt: number;
  usageCount: number;
}

export interface Settings {
  theme: 'light' | 'dark';
  sortBy: 'createdAt' | 'updatedAt';
  filters: {
    pinnedOnly: boolean;
    hasImageOnly: boolean;
    selectedTags: string[];
  };
}```

## src/utils/helpers.ts
```ts
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
}```

## tsconfig.app.json
```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

## tsconfig.json
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

## tsconfig.node.json
```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "module": "esnext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

## vite.config.ts
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})```

