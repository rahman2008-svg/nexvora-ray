import React, { useRef, useState, useMemo, useEffect } from 'react';
import { SnippetState } from '../types/index.ts';
import { THEMES } from '../utils/themes.ts';
import { highlightCode } from '../utils/highlighter.ts';
import { UploadCloud, Check, Edit2 } from 'lucide-react';

interface CodeCanvasProps {
  state: SnippetState;
  onChange: <K extends keyof SnippetState>(key: K, value: SnippetState[K]) => void;
  cardRef: React.RefObject<HTMLDivElement | null>;
  onFileUpload: (file: File) => void;
}

export const CodeCanvas: React.FC<CodeCanvasProps> = ({
  state,
  onChange,
  cardRef,
  onFileUpload,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const currentTheme = THEMES.find((t) => t.id === state.themeId) || THEMES[0];

  // Tokenize and highlight code
  const highlightedHtml = useMemo(() => {
    return highlightCode(state.code, state.language);
  }, [state.code, state.language]);

  // Compute line count
  const lineCount = useMemo(() => {
    return (state.code.match(/\n/g) || []).length + 1;
  }, [state.code]);

  // Synchronize scroll between textarea and syntax highlight display
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.currentTarget.scrollTop;
      preRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  // Support Tab key indenting and newlines
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      if (!e.shiftKey) {
        // Simple 2-space tab
        const nextCode = state.code.substring(0, start) + '  ' + state.code.substring(end);
        onChange('code', nextCode);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        }, 0);
      } else {
        // Shift + Tab (dedent)
        const beforeCursor = state.code.substring(0, start);
        if (beforeCursor.endsWith('  ')) {
          const nextCode = beforeCursor.slice(0, -2) + state.code.substring(start);
          onChange('code', nextCode);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = Math.max(0, start - 2);
          }, 0);
        }
      }
    }
  };

  // Drag and drop file handling
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Shadow styles
  const shadowClass = useMemo(() => {
    switch (state.dropShadow) {
      case 'none':
        return 'shadow-none';
      case 'subtle':
        return 'shadow-lg';
      case 'medium':
        return 'shadow-2xl shadow-black/40';
      case 'dramatic':
      default:
        return 'shadow-[0_30px_70px_-15px_rgba(0,0,0,0.7)]';
    }
  }, [state.dropShadow]);

  return (
    <div
      className="relative flex-1 min-h-[500px] flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-x-auto canvas-checkerboard"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag & Drop Overlay */}
      {isDragging && (
        <div className="absolute inset-0 z-30 bg-black/75 backdrop-blur-sm border-2 border-dashed border-pink-500 rounded-2xl flex flex-col items-center justify-center text-white pointer-events-none">
          <UploadCloud className="w-12 h-12 text-pink-400 animate-bounce mb-3" />
          <h3 className="text-xl font-bold">Drop your code file here</h3>
          <p className="text-sm text-slate-300">We'll auto-detect the language and load it into the canvas</p>
        </div>
      )}

      {/* Main Snippet Card that gets rendered and captured */}
      <div
        ref={cardRef}
        id="snippet-card"
        className="transition-all duration-200 inline-block min-w-[320px] max-w-[95vw] sm:max-w-4xl"
        style={{
          background: state.showBackground ? currentTheme.background : 'transparent',
          padding: state.showBackground ? `${state.padding}px` : '0px',
          borderRadius: state.showBackground ? '1.5rem' : '0.875rem',
        }}
      >
        {/* Code Window Container */}
        <div
          className={`relative rounded-xl border overflow-hidden transition-colors ${shadowClass} ${
            state.isDarkMode
              ? 'bg-[#15161e] border-white/10 text-slate-100 code-dark'
              : 'bg-white border-black/10 text-slate-900 code-light'
          }`}
          style={{
            fontFamily: state.font,
          }}
        >
          {/* Window Chrome Title Bar */}
          {state.frameStyle !== 'none' && (
            <div
              className={`flex items-center justify-between px-4 py-3 border-b select-none ${
                state.isDarkMode
                  ? 'border-white/5 bg-[#121319]/80'
                  : 'border-black/5 bg-slate-50'
              }`}
            >
              {/* Traffic Lights / Controls */}
              <div className="flex items-center gap-2">
                {state.frameStyle === 'mac' && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/40 shadow-inner" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/40 shadow-inner" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/40 shadow-inner" />
                  </div>
                )}
                {state.frameStyle === 'windows' && (
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span className="hover:text-white cursor-default">─</span>
                    <span className="hover:text-white cursor-default">□</span>
                    <span className="hover:text-rose-400 cursor-default">✕</span>
                  </div>
                )}
              </div>

              {/* Editable Title Bar */}
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md hover:bg-white/5 transition-colors">
                {isEditingTitle ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={state.title}
                      onChange={(e) => onChange('title', e.target.value)}
                      onBlur={() => setIsEditingTitle(false)}
                      onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                      className="text-xs font-mono bg-transparent border-b border-pink-400 text-center outline-none px-1 text-slate-300"
                      autoFocus
                    />
                    <button
                      onClick={() => setIsEditingTitle(false)}
                      className="p-0.5 text-emerald-400"
                    >
                      <Check className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditingTitle(true)}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 font-mono transition-colors group"
                    title="Click to edit file title"
                  >
                    <span>{state.title || 'untitled'}</span>
                    <Edit2 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                )}
              </div>

              {/* Spacer for symmetrical balance */}
              <div className="w-12 flex justify-end">
                <span className="text-[10px] text-slate-500 font-mono">
                  {state.language}
                </span>
              </div>
            </div>
          )}

          {/* Code Body with Synchronized Overlay Editor */}
          <div className="relative flex overflow-hidden min-h-[140px]">
            {/* Line Numbers Column */}
            {state.showLineNumbers && (
              <div
                ref={lineNumbersRef}
                className={`select-none py-4 pl-3.5 pr-3 text-right font-mono tabular-nums overflow-hidden ${
                  state.isDarkMode ? 'text-slate-600 bg-[#121319]/40' : 'text-slate-400 bg-slate-100/50'
                }`}
                style={{
                  fontSize: `${state.fontSize}px`,
                  lineHeight: '1.65',
                }}
              >
                {Array.from({ length: lineCount }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
            )}

            {/* Code Content Container */}
            <div className="relative flex-1 overflow-auto">
              {/* Syntax Highlighted HTML view (Visual Layer) */}
              <pre
                ref={preRef}
                aria-hidden="true"
                className="m-0 p-4 font-mono pointer-events-none select-none overflow-x-auto"
                style={{
                  fontSize: `${state.fontSize}px`,
                  lineHeight: '1.65',
                  tabSize: 2,
                }}
                dangerouslySetInnerHTML={{ __html: highlightedHtml + '\n' }}
              />

              {/* Transparent Textarea (Input Layer) */}
              <textarea
                ref={textareaRef}
                value={state.code}
                onChange={(e) => onChange('code', e.target.value)}
                onScroll={handleScroll}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                className="absolute inset-0 w-full h-full p-4 font-mono resize-none bg-transparent text-transparent caret-pink-400 outline-none overflow-auto"
                style={{
                  fontSize: `${state.fontSize}px`,
                  lineHeight: '1.65',
                  tabSize: 2,
                  whiteSpace: 'pre',
                }}
              />
            </div>
          </div>

          {/* Minimal Status Strip at Bottom */}
          <div
            className={`flex items-center justify-between px-3 py-1.5 text-[10px] border-t select-none ${
              state.isDarkMode
                ? 'border-white/5 text-slate-500 bg-[#121319]/60'
                : 'border-black/5 text-slate-400 bg-slate-50'
            }`}
          >
            <span>NexVora Ray</span>
            <div className="flex items-center gap-3">
              <span>{lineCount} {lineCount === 1 ? 'line' : 'lines'}</span>
              <span>{state.code.length} chars</span>
              <span>UTF-8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
