// components/TagInput.tsx
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
}