export interface ListItem {
  id: string;
  text: string;
  isChecked: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string | ListItem[];
  type: 'text' | 'list' | 'photo';
  borderColor: '#bc57ca' | '#ff3856' | '#38b6ff' | '#57ca8e';
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
  content: string;
  type: 'text' | 'list';
  tags?: string[];
  createdAt: number;
  usageCount: number;
}

export interface AppSettings {
  theme: 'dark' | 'light';
  sortBy: 'createdAt' | 'updatedAt' | 'priority';
  sortDirection: 'asc' | 'desc';
  filters: {
    pinnedOnly: boolean;
    withImage: boolean;
    tags: string[];
  };
}