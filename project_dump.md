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

## project_dump.md
```md
```

## src/components/AddNoteMenu.tsx
```tsx
import { useState, useRef, useEffect } from 'react';

interface AddNoteMenuProps {
  onNewNote: () => void;
  onFromTemplate: () => void;
}

export function AddNoteMenu({ onNewNote, onFromTemplate }: AddNoteMenuProps) {
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
        <div className="absolute bottom-16 right-0 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden mb-2 min-w-[180px]">
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
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white text-3xl font-bold leading-none rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center"
        title="Новая заметка"
      >
        +
      </button>
    </div>
  );
}```

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
```

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

## public/favicon.svg
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>```

## public/icons.svg
```svg
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
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
// App.tsx
import { useEffect, useState } from 'react';
import { useNotesStore } from './store/useNotesStore';
import { initDB } from './services/indexedDB';
import { NoteModal } from './components/NoteModal';
import { SortableNotesSection } from './components/SortableNotesSection';
import { FilterBar } from './components/FilterBar';
import { TemplateModal } from './components/TemplateModal';
import { SaveTemplateModal } from './components/SaveTemplateModal';
import { AddNoteMenu } from './components/AddNoteMenu';
import { useDebounce } from './hooks/useDebounce';
import type { Note } from './types';

function App() {
  const { 
    notes, isLoading, loadNotes, addNote, updateNote, deleteNote, 
    togglePin, reorderNotes, settings, updateSettings,
    templates, loadTemplates, saveAsTemplate, applyTemplate, deleteTemplate
  } = useNotesStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isSaveTemplateModalOpen, setIsSaveTemplateModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [currentNoteForTemplate, setCurrentNoteForTemplate] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

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

  const handleSaveNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingNote) {
      updateNote(editingNote.id, noteData);
    } else {
      addNote(noteData);
    }
    setIsModalOpen(false);
    setEditingNote(null);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleNewNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleOpenSaveTemplateModal = () => {
    if (editingNote) {
      setCurrentNoteForTemplate(editingNote);
      setIsSaveTemplateModalOpen(true);
    } else {}
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Загрузка Notes App...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ background: 'var(--bg-app)' }}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-primary text-3xl font-bold mb-6">Notes App</h1>
        
        <div className="mb-4 flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по заметкам..."
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
        
        <FilterBar settings={settings} onSettingsChange={updateSettings} allTags={allTags} />
        
        {notes.length === 0 ? (
          <div className="text-center text-muted py-12">
            <p>Нет заметок</p>
            <p className="text-sm mt-2">Нажмите кнопку +, чтобы создать первую</p>
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
      />

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingNote(null); }}
        onSave={handleSaveNote}
        onDelete={deleteNote}
        initialNote={editingNote}
        allTags={allTags}
        onSaveAsTemplate={handleOpenSaveTemplateModal}
        isTemplateLimitReached={templates.length >= 20}
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

## src/components/ColorPicker.tsx
```tsx
// components/ColorPicker.tsx
import type { BorderColor } from '../types';

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
  return (
    <div className="space-y-2">
      <label className="text-gray-400 text-sm">Цвет обводки</label>
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`
              w-8 h-8 rounded-full transition-all duration-200
              hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white
              ${selectedColor === color.value ? 'ring-2 ring-white scale-110' : 'ring-0'}
            `}
            style={{ backgroundColor: color.value }}
            title={color.label}
          />
        ))}
      </div>
    </div>
  );
}```

## src/components/FilterBar.tsx
```tsx
// components/FilterBar.tsx
import { useState, useRef, useEffect } from 'react';
import type { Settings } from '../types';

interface FilterBarProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
  allTags: string[];
}

export function FilterBar({ settings, onSettingsChange, allTags }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
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
        ? settings.filters.selectedTags.filter(t => t !== tag)
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

  return (
    <div className="mb-6 relative" ref={dropdownRef}>
      <div className="flex gap-3 items-center">
        {/* Сортировка */}
        <select
          value={settings.sortBy}
          onChange={(e) => handleSortChange(e.target.value as 'createdAt' | 'updatedAt')}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 cursor-pointer"
        >
          <option value="updatedAt">📅 По дате изменения</option>
          <option value="createdAt">✨ По дате создания</option>
        </select>

        {/* Кнопка фильтрации */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isOpen || Object.values(settings.filters).some(v => 
              typeof v === 'boolean' ? v : (Array.isArray(v) && v.length > 0)
            )
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          🔽 Фильтры
          {(settings.filters.pinnedOnly || settings.filters.hasImageOnly || settings.filters.selectedTags.length > 0) && (
            <span className="bg-yellow-500 text-black text-xs px-1.5 py-0.5 rounded-full">
              {[
                settings.filters.pinnedOnly && '📌',
                settings.filters.hasImageOnly && '🖼️',
                settings.filters.selectedTags.length > 0 && `${settings.filters.selectedTags.length}т`
              ].filter(Boolean).join(' ')}
            </span>
          )}
        </button>
      </div>

      {/* Выпадающее меню фильтров */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
          <div className="p-3 space-y-3">
            <div className="text-white text-sm font-medium border-b border-gray-700 pb-2">Фильтры</div>
            
            {/* Закреплённые */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.filters.pinnedOnly}
                onChange={(e) => handleFilterChange('pinnedOnly', e.target.checked)}
                className="w-4 h-4 accent-purple-600"
              />
              <span className="text-gray-300 text-sm">📌 Только закреплённые</span>
            </label>
            
            {/* С изображением */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.filters.hasImageOnly}
                onChange={(e) => handleFilterChange('hasImageOnly', e.target.checked)}
                className="w-4 h-4 accent-purple-600"
              />
              <span className="text-gray-300 text-sm">🖼️ Только с фото</span>
            </label>
            
            {/* Теги */}
            {allTags.length > 0 && (
              <div className="border-t border-gray-700 pt-2 mt-1">
                <div className="text-gray-400 text-xs mb-2">Теги:</div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
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
            
            {/* Сбросить фильтры */}
            {(settings.filters.pinnedOnly || settings.filters.hasImageOnly || settings.filters.selectedTags.length > 0) && (
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
  );
}```

## src/components/NoteCard.tsx
```tsx
// components/NoteCard.tsx
import type { Note, ListItem } from '../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface NoteCardProps {
  note: Note;
  onTogglePin?: (id: string) => void;
}

export function NoteCard({ note, onTogglePin }: NoteCardProps) {
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

  const getListStats = (): { completed: number; total: number } | null => {
    if (note.type === 'list' && Array.isArray(note.content)) {
      const items = note.content as ListItem[];
      const total = items.length;
      const completed = items.filter(item => item.isChecked).length;
      return { completed, total };
    }
    return null;
  };

  const preview = getContentPreview();
  const listStats = getListStats();

  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('📌 Клик, заметка:', note.id, 'текущий pinned:', note.pinned);
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
      {/* Заголовок и кнопка закрепления в одной строке */}
      <div className="flex justify-between items-start gap-2 mb-2">
        <h3 className="text-white font-medium text-lg break-words overflow-hidden flex-1 min-w-0">
          {note.title || 'Без заголовка'}
        </h3>
        <button
          onClick={handlePinClick}
          className={`text-base shrink-0 transition-all duration-200 ${
            isPinned 
              ? 'text-yellow-400 scale-110' 
              : 'text-gray-500 hover:text-yellow-400 hover:scale-110'
          }`}
          title={isPinned ? 'Открепить' : 'Закрепить'}
        >
          {isPinned ? '📌' : '📌'}
        </button>
      </div>
      
      {/* Теги */}
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
      
      {/* Превью контента */}
      <div className="text-secondary text-sm whitespace-pre-line break-words overflow-hidden max-h-40">
        {preview || <span className="text-muted">Нет содержания</span>}
      </div>
      
      {/* Статистика для списка */}
      {listStats && (
        <div className="text-muted text-xs mt-3 pt-2 border-t border-gray-800">
          ✓ {listStats.completed} / {listStats.total} выполнено
        </div>
      )}

      {/* Плейсхолдер для фото */}
      {note.type === 'photo' && !note.hasImage && (
        <div className="text-muted text-xs mt-3 pt-2 border-t border-gray-800">
          🖼️ Без фото
        </div>
      )}
      
      {/* Индикатор типа заметки */}
      <div className="text-muted text-xs mt-2 opacity-50">
        {note.type === 'list' && '📋'}
        {note.type === 'text' && '📝'}
        {note.type === 'photo' && '🖼️'}
      </div>
    </div>
  );
}```

## src/components/NoteModal.tsx
```tsx
// components/NoteModal.tsx
import { useState, useEffect, useCallback } from 'react';
import type { Note, ListItem, BorderColor, NoteType } from '../types';
import { generateId } from '../utils/helpers';
import { TagInput } from './TagInput';
import { ColorPicker } from './ColorPicker';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onDelete?: (id: string) => void;
  initialNote?: Note | null;
  allTags?: string[];
  onSaveAsTemplate?: () => void;
  isTemplateLimitReached?: boolean;
}

const DRAFT_KEY = 'draft_v1';

export function NoteModal({ 
  isOpen, onClose, onSave, initialNote, allTags = [],
  onSaveAsTemplate, isTemplateLimitReached = false, onDelete
}: NoteModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<NoteType>('text');
  const [textContent, setTextContent] = useState('');
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [borderColor, setBorderColor] = useState<BorderColor>('#bc57ca');
  const [pinned, setPinned] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
        } else {
          setTextContent(typeof initialNote.content === 'string' ? initialNote.content : '');
          setListItems([]);
        }
        setError('');
      } else {
        const draft = localStorage.getItem(DRAFT_KEY);
        if (draft) {
          try {
            const draftData = JSON.parse(draft);
            setTitle(draftData.title || '');
            setType(draftData.type || 'text');
            setBorderColor(draftData.borderColor || '#bc57ca');
            setPinned(draftData.pinned || false);
            setTags(draftData.tags || []);
            setTextContent(draftData.textContent || '');
            setListItems(draftData.listItems || []);
          } catch {
            resetForm();
          }
        } else {
          resetForm();
        }
      }
    }
  }, [isOpen, initialNote]);

  useEffect(() => {
    if (!isOpen) return;
    
    const draft = { title, type, borderColor, pinned, tags, textContent, listItems };
    const interval = setInterval(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    }, 30000);
    
    return () => clearInterval(interval);
  }, [isOpen, title, type, borderColor, pinned, tags, textContent, listItems]);

  const resetForm = () => {
    setTitle('');
    setType('text');
    setTextContent('');
    setListItems([]);
    setBorderColor('#bc57ca');
    setPinned(false);
    setTags([]);
    setError('');
  };

  const handleClose = useCallback(() => {
    const draft = { title, type, borderColor, pinned, tags, textContent, listItems };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    onClose();
  }, [title, type, borderColor, pinned, tags, textContent, listItems, onClose]);

  const handleDelete = () => {
    if (!initialNote) return;
    onDelete(initialNote.id);
    localStorage.removeItem(DRAFT_KEY);
    resetForm();
    onClose();
  };

  const handleSave = () => {
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
    }
    
    if (!isValid) {
      setError('Содержание не может быть пустым');
      return;
    }
    
    onSave({ title: title.trim(), content, type, borderColor, pinned, tags });
    localStorage.removeItem(DRAFT_KEY);
    resetForm();
    onClose();
  };

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
    : listItems.some(item => item.text.trim().length > 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="bg-black rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2" style={{ borderColor }}>
        <div className="sticky top-0 bg-black border-b border-gray-800 p-4 flex justify-between items-center">
          <h2 className="text-white text-xl font-semibold">{initialNote ? 'Редактировать заметку' : 'Новая заметка'}</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white text-2xl leading-none">✕</button>
        </div>
        
        <div className="p-4 space-y-4">
          <input
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-900 text-white text-lg font-medium px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
          />
          
          <div className="flex gap-2">
            <button
              onClick={() => setType('text')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                type === 'text' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              📝 Текст
            </button>
            <button
              onClick={() => setType('list')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                type === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              ✓ Список
            </button>
          </div>
          
          {type === 'text' ? (
            <textarea
              placeholder="Текст заметки..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              rows={8}
              className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 resize-none"
            />
          ) : (
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

          {onSaveAsTemplate && (
            <button
              onClick={onSaveAsTemplate}
              disabled={!hasContent || isTemplateLimitReached}
              className={`w-full mt-3 px-4 py-2 rounded-lg transition-colors ${
                hasContent && !isTemplateLimitReached
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-800 text-gray-600 cursor-not-allowed'
              }`}
              title={
                !hasContent 
                  ? 'Заполните содержание заметки' 
                  : isTemplateLimitReached 
                    ? 'Достигнут лимит шаблонов (20)' 
                    : ''
              }
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
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90"
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
}```

## src/components/SaveTemplateModal.tsx
```tsx
// components/SaveTemplateModal.tsx
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

## src/components/SortableNotesSection.tsx
```tsx
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
  notes: Note[];
  onReorder: (ids: string[]) => void;
  onTogglePin: (id: string) => void;
  onEditNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  pinnedIds?: string[];
  unpinnedIds?: string[];
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

## src/components/TagInput.tsx
```tsx
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
}```

## src/components/TemplateModal.tsx
```tsx
// components/TemplateModal.tsx
import { useState, useEffect } from 'react';
import type { Template } from '../types';

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
          {/* Поиск */}
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
          
          {/* Список шаблонов */}
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
          
          {/* Кнопки */}
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

## src/hooks/useDebounce.ts
```ts
// hooks/useDebounce.ts
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
}

.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.text-muted { color: var(--text-muted); }

.border-purple { border-color: var(--border-purple); }
.border-pink { border-color: var(--border-pink); }
.border-blue { border-color: var(--border-blue); }
.border-green { border-color: var(--border-green); }```

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
// services/indexedDB.ts
import { openDB } from 'idb';
import type { DBSchema } from 'idb';

interface NotesDB extends DBSchema {
  note_images: {
    key: string;
    value: { noteId: string; imageData: string };
  };
}

let dbPromise: ReturnType<typeof openDB<NotesDB>> | null = null;

export async function initDB(): Promise<void> {
  dbPromise = openDB<NotesDB>('NotesAppDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('note_images')) {
        db.createObjectStore('note_images', { keyPath: 'noteId' });
      }
    },
  });
  await dbPromise;
}

export async function saveImage(noteId: string, base64: string): Promise<void> {
  const db = await dbPromise;
  if (!db) throw new Error('DB not initialized');
  await db.put('note_images', { noteId, imageData: base64 });
}

export async function getImage(noteId: string): Promise<string | null> {
  const db = await dbPromise;
  if (!db) return null;
  const result = await db.get('note_images', noteId);
  return result?.imageData || null;
}

export async function deleteImage(noteId: string): Promise<void> {
  const db = await dbPromise;
  if (!db) return;
  await db.delete('note_images', noteId);
}```

## src/services/localStorage.ts
```ts
// services/localStorage.ts
import type { Note, Settings, Template } from '../types';

const NOTES_KEY = 'notes_v1';
const TEMPLATES_KEY = 'templates_v1';
const SETTINGS_KEY = 'settings_v1';

// ========== ЗАМЕТКИ ==========
export function getNotes(): Note[] {
  const data = localStorage.getItem(NOTES_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    console.error('Ошибка парсинга заметок');
    return [];
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

// ========== ШАБЛОНЫ ==========
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

// ========== НАСТРОЙКИ ==========
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
}

// ========== ШАБЛОНЫ (полная реализация) ==========
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
}```

## src/services/templateService.ts
```ts
import type { Note, Template, ListItem } from '../types';
import { generateId, now } from '../utils/helpers';

const STORAGE_KEY = 'templates_v1';
const MAX_TEMPLATES = 20;

export interface TemplateInput {
  name: string;
  description?: string;
  content: string | ListItem[];
  type: 'text' | 'list';
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
    description: input.description?.trim() || undefined,
    content: input.content,
    type: input.type,
    tags: input.tags?.filter(Boolean) || [],
    createdAt: now(),
    usageCount: 0,
  };

  templates.push(template);
  saveAll(templates);
  return template;
}

export function saveTemplateFromNote(
  note: Pick<Note, 'content' | 'type' | 'tags'>,
  name: string,
  description?: string
): Template {
  if (note.type === 'photo') {
    throw new Error('Фотозаметки нельзя сохранять как шаблон');
  }
  return saveTemplate({
    name,
    description,
    content: note.content,
    type: note.type,
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
    title: '',
    content: t.content,
    type: t.type,
    borderColor: '#bc57ca',
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
// store/useNotesStore.ts
import { create } from 'zustand';
import type { Note, Settings, Template, ListItem } from '../types';
import { 
  getNotes, saveNotes, addNote as addNoteToStorage, 
  updateNote as updateNoteInStorage, deleteNote as deleteNoteFromStorage,
  getSettings, saveSettings,
  getTemplates, addTemplate, deleteTemplate, updateTemplateUsage
} from '../services/localStorage';
import { generateId, now } from '../utils/helpers';

interface NotesStore {
  notes: Note[];
  settings: Settings;
  templates: Template[];
  isLoading: boolean;
  isLoadingTemplates: boolean;
  
  loadNotes: () => void;
  loadTemplates: () => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  reorderNotes: (ids: string[]) => void;
  updateSettings: (updates: Partial<Settings>) => void;
  saveAsTemplate: (name: string, description: string, note: Note) => boolean;
  applyTemplate: (template: Template) => Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
  deleteTemplate: (id: string) => void;
}

export const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  settings: getSettings(),
  templates: [],
  isLoading: true,
  isLoadingTemplates: true,

  loadNotes: () => {
    const notes = getNotes();
    const normalizedNotes = notes.map(note => ({
      ...note,
      pinned: note.pinned === true,
    }));
    set({ notes: normalizedNotes, isLoading: false });
    console.log('📝 Загружено заметок:', normalizedNotes.length);
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
    };
    
    addNoteToStorage(newNote);
    set(state => ({ notes: [newNote, ...state.notes] }));
    console.log('✅ Добавлена заметка:', newNote.id, 'pinned:', newNote.pinned);
    return newNote;
  },

  updateNote: (id, updates) => {
    updateNoteInStorage(id, updates);
    set(state => ({
      notes: state.notes.map(note =>
        note.id === id ? { ...note, ...updates, updatedAt: now() } : note
      )
    }));
    console.log('✏️ Обновлена заметка:', id, updates);
  },

  deleteNote: (id) => {
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
        description,
        content: note.content,
        type: note.type === 'photo' ? 'text' : note.type,
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
    
    return {
      title: '',
      content: template.content,
      type: template.type,
      borderColor: '#bc57ca',
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
    note: Pick<Note, 'content' | 'type' | 'tags'>,
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

