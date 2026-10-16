import React, { useState, useRef, useEffect } from 'react';
import { 
  Palette, 
  Sun, 
  Moon, 
  Sliders, 
  Type, 
  Hash, 
  Layers, 
  ChevronDown, 
  Search,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { THEMES } from '../utils/themes.ts';
import { LANGUAGES } from '../utils/languages.ts';
import { FontFamily, FrameStyle, PaddingOption, SnippetState } from '../types/index.ts';

interface ToolbarProps {
  state: SnippetState;
  onChange: <K extends keyof SnippetState>(key: K, value: SnippetState[K]) => void;
  onResetSample: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ state, onChange, onResetSample }) => {
  const [themePopover, setThemePopover] = useState(false);
  const [languagePopover, setLanguagePopover] = useState(false);
  const [settingsPopover, setSettingsPopover] = useState(false);
  const [languageSearch, setLanguageSearch] = useState('');

  const themeRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) setThemePopover(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLanguagePopover(false);
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) setSettingsPopover(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTheme = THEMES.find((t) => t.id === state.themeId) || THEMES[0];
  const currentLang = LANGUAGES.find((l) => l.id === state.language) || LANGUAGES[0];

  const filteredLanguages = LANGUAGES.filter((l) =>
    l.name.toLowerCase().includes(languageSearch.toLowerCase()) ||
    l.id.toLowerCase().includes(languageSearch.toLowerCase())
  );

  return (
    <div className="w-full flex justify-center py-4 px-2 sm:px-4">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 p-1.5 sm:p-2 rounded-2xl bg-[#14151c]/90 border border-white/10 shadow-2xl backdrop-blur-xl">
        
        {/* 1. Theme Selector Popover */}
        <div className="relative" ref={themeRef}>
          <button
            onClick={() => {
              setThemePopover(!themePopover);
              setLanguagePopover(false);
              setSettingsPopover(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 transition-colors border border-white/5"
            title="Change Theme & Gradient"
          >
            <span
              className="w-3.5 h-3.5 rounded-full ring-1 ring-white/20 shrink-0 shadow-sm"
              style={{ background: currentTheme.background }}
            />
            <span className="max-w-[70px] truncate sm:max-w-none">{currentTheme.name}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {themePopover && (
            <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 mt-2 w-64 p-3 rounded-2xl bg-[#181922] border border-white/10 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Color Gradients
              </div>
              <div className="grid grid-cols-2 gap-1.5 max-h-64 overflow-y-auto pr-1">
                {THEMES.map((theme) => {
                  const isSelected = theme.id === state.themeId;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => {
                        onChange('themeId', theme.id);
                        setThemePopover(false);
                      }}
                      className={`flex items-center gap-2 p-1.5 rounded-lg text-left text-xs transition-all ${
                        isSelected 
                          ? 'bg-white/15 text-white font-medium ring-1 ring-white/20' 
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full ring-1 ring-white/20 shrink-0 shadow"
                        style={{ background: theme.background }}
                      />
                      <span className="truncate">{theme.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 2. Background Padding Toggle (Ray.so feature) */}
        <button
          onClick={() => onChange('showBackground', !state.showBackground)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors border ${
            state.showBackground
              ? 'bg-white/10 text-white border-white/10'
              : 'bg-transparent text-slate-400 hover:text-white border-white/5'
          }`}
          title="Toggle Background Gradient Frame"
        >
          <Palette className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Background</span>
        </button>

        {/* 3. Dark / Light Window Mode Toggle */}
        <button
          onClick={() => onChange('isDarkMode', !state.isDarkMode)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-200 border border-white/5 transition-colors"
          title={`Switch to ${state.isDarkMode ? 'Light' : 'Dark'} Code Window`}
        >
          {state.isDarkMode ? (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Dark</span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Light</span>
            </>
          )}
        </button>

        {/* 4. Padding Selector (16, 32, 64, 128) */}
        <div className="flex items-center p-0.5 rounded-xl bg-white/5 border border-white/5">
          {([16, 32, 64, 128] as PaddingOption[]).map((pad) => (
            <button
              key={pad}
              onClick={() => onChange('padding', pad)}
              className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                state.padding === pad
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {pad}
            </button>
          ))}
        </div>

        {/* 5. Language Selector Popover */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => {
              setLanguagePopover(!languagePopover);
              setThemePopover(false);
              setSettingsPopover(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 transition-colors border border-white/5"
            title="Select Language"
          >
            <span className="max-w-[70px] truncate sm:max-w-none">{currentLang.name}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {languagePopover && (
            <div className="absolute right-0 sm:left-1/2 sm:-translate-x-1/2 mt-2 w-56 p-2 rounded-2xl bg-[#181922] border border-white/10 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="relative mb-2">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search language..."
                  value={languageSearch}
                  onChange={(e) => setLanguageSearch(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500/50"
                  autoFocus
                />
              </div>

              <div className="max-h-56 overflow-y-auto space-y-0.5 pr-1">
                {filteredLanguages.map((lang) => {
                  const isSelected = lang.id === state.language;
                  return (
                    <button
                      key={lang.id}
                      onClick={() => {
                        onChange('language', lang.id);
                        setLanguagePopover(false);
                        setLanguageSearch('');
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors ${
                        isSelected
                          ? 'bg-pink-500/20 text-pink-300 font-medium'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{lang.name}</span>
                      <span className="text-[10px] text-slate-500 uppercase">{lang.extension}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 6. Advanced Settings Popover (Font, Size, Line Numbers, Frame Style, Drop Shadow) */}
        <div className="relative" ref={settingsRef}>
          <button
            onClick={() => {
              setSettingsPopover(!settingsPopover);
              setThemePopover(false);
              setLanguagePopover(false);
            }}
            className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 transition-colors border border-white/5"
            title="Custom Styling & Typography"
          >
            <Sliders className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden md:inline">Options</span>
          </button>

          {settingsPopover && (
            <div className="absolute right-0 mt-2 w-72 p-4 rounded-2xl bg-[#181922] border border-white/10 shadow-2xl z-50 text-xs space-y-4 animate-in fade-in zoom-in-95 duration-150">
              
              {/* Line Numbers Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <Hash className="w-4 h-4 text-slate-400" />
                  <span>Line Numbers</span>
                </div>
                <button
                  onClick={() => onChange('showLineNumbers', !state.showLineNumbers)}
                  className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                    state.showLineNumbers ? 'bg-pink-500 justify-end' : 'bg-white/10 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </button>
              </div>

              {/* Font Family */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-300">
                  <Type className="w-4 h-4 text-slate-400" />
                  <span>Font Family</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {(['JetBrains Mono', 'Fira Code', 'Source Code Pro', 'Space Mono'] as FontFamily[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => onChange('font', f)}
                      className={`px-2 py-1.5 rounded-lg text-left truncate transition-colors ${
                        state.font === f
                          ? 'bg-white/20 text-white font-medium'
                          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                      }`}
                      style={{ fontFamily: f }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Font Size</span>
                  <span className="text-slate-400 font-mono">{state.fontSize}px</span>
                </div>
                <div className="flex items-center gap-1">
                  {[12, 14, 16, 18].map((size) => (
                    <button
                      key={size}
                      onClick={() => onChange('fontSize', size)}
                      className={`flex-1 py-1 rounded-lg text-center transition-colors ${
                        state.fontSize === size
                          ? 'bg-white/20 text-white font-semibold'
                          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Window Controls Frame Style */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-300">
                  <Layers className="w-4 h-4 text-slate-400" />
                  <span>Window Header Style</span>
                </div>
                <div className="flex items-center gap-1">
                  {(['mac', 'windows', 'none'] as FrameStyle[]).map((frame) => (
                    <button
                      key={frame}
                      onClick={() => onChange('frameStyle', frame)}
                      className={`flex-1 py-1 rounded-lg text-center capitalize transition-colors ${
                        state.frameStyle === frame
                          ? 'bg-white/20 text-white font-semibold'
                          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                      }`}
                    >
                      {frame === 'mac' ? 'macOS' : frame}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drop Shadow */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Drop Shadow</span>
                  <span className="text-slate-400 capitalize">{state.dropShadow}</span>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {(['none', 'subtle', 'medium', 'dramatic'] as const).map((shadow) => (
                    <button
                      key={shadow}
                      onClick={() => onChange('dropShadow', shadow)}
                      className={`py-1 rounded-lg text-center capitalize text-[11px] transition-colors ${
                        state.dropShadow === shadow
                          ? 'bg-white/20 text-white font-medium'
                          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                      }`}
                    >
                      {shadow}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset to Sample Snippet */}
              <div className="pt-2 border-t border-white/5">
                <button
                  onClick={() => {
                    onResetSample();
                    setSettingsPopover(false);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>Reset to {currentLang.name} Sample</span>
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
