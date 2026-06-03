// components/SortableNotesSection.tsx
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
import { NoteCard } from './NoteCard';
import type { Note } from '../types';

interface SortableNotesSectionProps {
  title?: string;
  notes: Note[];
  onReorder: (ids: string[]) => void;
  onTogglePin: (id: string) => void;
  onEditNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  pinnedIds: string[];
  unpinnedIds: string[];
}

export function SortableNotesSection({
  notes,
  onReorder,
  onTogglePin,
  onEditNote,
  onDeleteNote,
  pinnedIds,
  unpinnedIds,
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
            <div key={note.id} className="relative group">
              <div onClick={() => onEditNote(note)} className="cursor-pointer">
                <NoteCard note={note} onTogglePin={onTogglePin} />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(note.id);
                }}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}