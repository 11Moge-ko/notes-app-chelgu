// types/index.ts
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
  description?: string;
  content: string | ListItem[];
  type: 'text' | 'list';
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
}