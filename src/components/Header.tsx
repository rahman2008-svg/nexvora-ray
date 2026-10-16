import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, 
  Copy, 
  Share2, 
  ChevronDown, 
  Sparkles, 
  Info, 
  FileCode2, 
  Check, 
  Laptop
} from 'lucide-react';

interface HeaderProps {
  onOpenDeveloperModal: () => void;
  onCopyImage: () => Promise<void>;
  onExportPng: () => Promise<void>;
  onExportSvg: () => Promise<void>;
  onCopyUrl: () => void;
  onCopyCode: () => void;
  onLoadPreset: (code: string, language: string, title: string) => void;
  isExporting: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDeveloperModal,
  onCopyImage,
  onExportPng,
  onExportSvg,
  onCopyUrl,
  onCopyCode,
  isExporting,
}) => {
  const [exportOpen, setExportOpen] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setExportOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuickCopy = async () => {
    try {
      await onCopyImage();
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2000);
    } catch {
      // Handled in parent
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#0e0f14]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <a 
            href="/" 
            className="group flex items-center gap-2.5 text-slate-100 hover:text-white transition-colors"
          >
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 via-pink-500 to-indigo-500 p-[1px] shadow-lg shadow-pink-500/10">
              <div className="w-full h-full bg-[#121319] rounded-[7px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform duration-200" />
              </div>
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap">
              NexVora Ray
            </span>
          </a>
          <span className="hidden md:inline-block text-xs font-medium text-slate-500 px-2 py-0.5 rounded border border-white/5 bg-white/[0.02]">
            v1.0.0
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={onOpenDeveloperModal}
            className="hover:text-white transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <Info className="w-4 h-4 text-slate-400" />
            <span>About Developer</span>
          </button>
          <button
            onClick={onOpenDeveloperModal}
            className="hover:text-white transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <Laptop className="w-4 h-4 text-slate-400" />
            <span>NexVora Lab's Ofc</span>
          </button>
          <button
            onClick={onCopyUrl}
            className="hover:text-white transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <Share2 className="w-4 h-4 text-slate-400" />
            <span>Share Snippet</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Export Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3" ref={dropdownRef}>
          {/* Quick Copy Image Button */}
          <button
            onClick={handleQuickCopy}
            disabled={isExporting}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-all duration-150 active:scale-95 disabled:opacity-50"
            title="Copy image directly to clipboard"
          >
            {copiedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-300" />
                <span>Copy Image</span>
              </>
            )}
          </button>

          {/* Export Dropdown Button (Primary Action) */}
          <div className="relative">
            <button
              onClick={() => setExportOpen((prev) => !prev)}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-1.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-lg shadow-lg shadow-pink-500/20 transition-all duration-150 active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Exporting...' : 'Export'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${exportOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {exportOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#16171f] border border-white/10 p-1.5 shadow-2xl text-xs text-slate-200 animate-in fade-in zoom-in-95 duration-150 z-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Image Formats
                </div>
                
                <button
                  onClick={() => {
                    setExportOpen(false);
                    onExportPng();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 text-left transition-colors"
                >
                  <span className="font-medium text-white">Save as PNG</span>
                  <span className="text-[10px] text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">2x Res</span>
                </button>

                <button
                  onClick={() => {
                    setExportOpen(false);
                    onExportSvg();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 text-left transition-colors"
                >
                  <span className="font-medium text-white">Save as SVG</span>
                  <span className="text-[10px] text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">Vector</span>
                </button>

                <div className="my-1 border-t border-white/5" />

                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Clipboard & Links
                </div>

                <button
                  onClick={() => {
                    setExportOpen(false);
                    handleQuickCopy();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/10 text-left transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Image to Clipboard</span>
                </button>

                <button
                  onClick={() => {
                    setExportOpen(false);
                    onCopyCode();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/10 text-left transition-colors"
                >
                  <FileCode2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Raw Code</span>
                </button>

                <button
                  onClick={() => {
                    setExportOpen(false);
                    onCopyUrl();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/10 text-left transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Shareable URL</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Info Button */}
          <button
            onClick={onOpenDeveloperModal}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
            aria-label="About Developer"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
