/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as htmlToImage from 'html-to-image';
import { SnippetState } from './types/index.ts';
import { LANGUAGES, detectLanguage } from './utils/languages.ts';
import { Header } from './components/Header.tsx';
import { Toolbar } from './components/Toolbar.tsx';
import { CodeCanvas } from './components/CodeCanvas.tsx';
import { Footer } from './components/Footer.tsx';
import { DeveloperModal } from './components/DeveloperModal.tsx';
import { ToastContainer, ToastMessage } from './components/Toast.tsx';

export default function App() {
  const [developerModalOpen, setDeveloperModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  // Initial default state
  const [state, setState] = useState<SnippetState>(() => {
    // Check URL parameters for shared state
    try {
      const params = new URLSearchParams(window.location.search);
      const encodedCode = params.get('c');
      const lang = params.get('l');
      const theme = params.get('t');
      const pad = params.get('p');
      const title = params.get('title');

      const initialLang = lang || 'typescript';
      const sample = LANGUAGES.find((l) => l.id === initialLang)?.sample || LANGUAGES[0].sample;

      return {
        code: encodedCode ? decodeURIComponent(atob(encodedCode)) : sample,
        title: title || (initialLang === 'typescript' ? 'useLiveMetrics.ts' : 'snippet'),
        language: initialLang,
        themeId: theme || 'candy',
        showBackground: true,
        isDarkMode: true,
        padding: (pad ? Number(pad) : 64) as SnippetState['padding'],
        showLineNumbers: false,
        font: 'JetBrains Mono',
        fontSize: 14,
        frameStyle: 'mac',
        dropShadow: 'dramatic',
      };
    } catch {
      return {
        code: LANGUAGES[0].sample,
        title: 'useLiveMetrics.ts',
        language: 'typescript',
        themeId: 'candy',
        showBackground: true,
        isDarkMode: true,
        padding: 64,
        showLineNumbers: false,
        font: 'JetBrains Mono',
        fontSize: 14,
        frameStyle: 'mac',
        dropShadow: 'dramatic',
      };
    }
  });

  const showToast = useCallback((text: string, type: ToastMessage['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleStateChange = <K extends keyof SnippetState>(key: K, value: SnippetState[K]) => {
    setState((prev) => {
      const next = { ...prev, [key]: value };
      // If language changed and user hasn't modified title, adapt extension
      if (key === 'language') {
        const langObj = LANGUAGES.find((l) => l.id === value);
        if (langObj && prev.title.includes('.')) {
          const baseName = prev.title.split('.')[0];
          next.title = `${baseName}.${langObj.extension}`;
        }
      }
      return next;
    });
  };

  // Reset to default sample of the currently selected language
  const handleResetSample = () => {
    const langObj = LANGUAGES.find((l) => l.id === state.language) || LANGUAGES[0];
    setState((prev) => ({
      ...prev,
      code: langObj.sample,
      title: `example.${langObj.extension}`,
    }));
    showToast(`Loaded ${langObj.name} sample`, 'info');
  };

  // Handle uploaded file
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        const detected = detectLanguage(file.name, content);
        setState((prev) => ({
          ...prev,
          code: content,
          title: file.name,
          language: detected,
        }));
        showToast(`Loaded "${file.name}" (${detected})`, 'success');
      }
    };
    reader.onerror = () => {
      showToast('Failed to read file', 'error');
    };
    reader.readAsText(file);
  };

  // Export as PNG
  const handleExportPng = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement('a');
      const filename = (state.title || 'nexvora-ray').replace(/\s+/g, '-').replace(/\.[^/.]+$/, '');
      link.download = `${filename}.png`;
      link.href = dataUrl;
      link.click();
      showToast('Saved high-resolution PNG!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to export PNG', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  // Export as SVG
  const handleExportSvg = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await htmlToImage.toSvg(cardRef.current, {
        cacheBust: true,
      });
      const link = document.createElement('a');
      const filename = (state.title || 'nexvora-ray').replace(/\s+/g, '-').replace(/\.[^/.]+$/, '');
      link.download = `${filename}.svg`;
      link.href = dataUrl;
      link.click();
      showToast('Saved vector SVG!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to export SVG', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  // Copy Image to Clipboard
  const handleCopyImage = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const blob = await htmlToImage.toBlob(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      });

      if (!blob) {
        throw new Error('Blob creation failed');
      }

      if (navigator.clipboard && 'write' in navigator.clipboard) {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob,
          }),
        ]);
        showToast('Image copied to clipboard!', 'success');
      } else {
        // Fallback: download if clipboard API is not available in environment
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${state.title || 'snippet'}.png`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Clipboard unavailable; saved PNG instead.', 'info');
      }
    } catch (err) {
      console.error(err);
      showToast('Unable to copy image directly. Try Export PNG.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  // Copy URL with encoded state
  const handleCopyUrl = async () => {
    try {
      const encoded = btoa(encodeURIComponent(state.code));
      const url = new URL(window.location.origin + window.location.pathname);
      url.searchParams.set('c', encoded);
      url.searchParams.set('l', state.language);
      url.searchParams.set('t', state.themeId);
      url.searchParams.set('p', String(state.padding));
      url.searchParams.set('title', state.title);

      await navigator.clipboard.writeText(url.toString());
      window.history.replaceState({}, '', url.toString());
      showToast('Shareable URL copied to clipboard!', 'success');
    } catch {
      showToast('Failed to copy URL to clipboard', 'error');
    }
  };

  // Copy raw code
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(state.code);
      showToast('Source code copied to clipboard!', 'success');
    } catch {
      showToast('Failed to copy code to clipboard', 'error');
    }
  };

  // Load preset snippet
  const handleLoadPreset = (code: string, language: string, title: string) => {
    setState((prev) => ({
      ...prev,
      code,
      language,
      title,
    }));
    showToast(`Loaded ${title}`, 'info');
  };

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl/Cmd + S (Save PNG)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleExportPng();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-slate-100 selection:bg-pink-500/30">
      {/* Top Header */}
      <Header
        onOpenDeveloperModal={() => setDeveloperModalOpen(true)}
        onCopyImage={handleCopyImage}
        onExportPng={handleExportPng}
        onExportSvg={handleExportSvg}
        onCopyUrl={handleCopyUrl}
        onCopyCode={handleCopyCode}
        onLoadPreset={handleLoadPreset}
        isExporting={isExporting}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col max-w-full">
        {/* Floating Toolbar Controls */}
        <Toolbar
          state={state}
          onChange={handleStateChange}
          onResetSample={handleResetSample}
        />

        {/* Central Code Preview Canvas */}
        <CodeCanvas
          state={state}
          onChange={handleStateChange}
          cardRef={cardRef}
          onFileUpload={handleFileUpload}
        />
      </main>

      {/* Footer with Developer & Company Info */}
      <Footer onOpenDeveloperModal={() => setDeveloperModalOpen(true)} />

      {/* About Developer & Company Modal */}
      <DeveloperModal
        isOpen={developerModalOpen}
        onClose={() => setDeveloperModalOpen(false)}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
