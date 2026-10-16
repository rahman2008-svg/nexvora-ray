import React from 'react';
import { MessageSquare, ExternalLink, Sparkles, Command, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenDeveloperModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDeveloperModal }) => {
  return (
    <footer className="w-full border-t border-white/5 bg-[#0a0b0e] text-slate-400 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Company Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-pink-500 to-indigo-500 flex items-center justify-center text-white">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">NexVora Ray</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Create and export pixel-perfect, beautifully framed images of your source code in seconds.
            </p>
            <div className="text-xs text-slate-400">
              <strong className="text-slate-300 block font-semibold mb-0.5">NexVora Lab's Ofc</strong>
              <p className="text-[11px] text-slate-400 leading-normal">
                Focuses on creating innovative Android applications designed to improve productivity, entertainment, learning, and digital experiences.
              </p>
            </div>
          </div>

          {/* Col 2: About Developer */}
          <div className="space-y-3 md:col-span-1">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              About Developer
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p className="font-medium text-white">Prince AR Abdur Rahman</p>
              <p className="text-[11px] text-slate-400 leading-normal">
                Independent App Developer passionate about building modern Android applications, productivity tools, AI-powered experiences, media players, educational apps, and next-generation digital products.
              </p>
            </div>
            <button
              onClick={onOpenDeveloperModal}
              className="text-xs text-pink-400 hover:text-pink-300 transition-colors underline underline-offset-4"
            >
              View Full Profile & Bio →
            </button>
          </div>

          {/* Col 3: Direct Developer Contact */}
          <div className="space-y-3 md:col-span-1">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Developer Contacts
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://wa.me/8801707424006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                  <span>WhatsApp: 01707424006</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/8801796951709"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                  <span>WhatsApp: 01796951709</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/1BNn32qoJo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span className="font-bold text-xs w-3.5 text-center">f</span>
                  <span>Facebook</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/ur___abdur____rahman__2008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
                >
                  <span className="font-bold text-xs w-3.5 text-center">ig</span>
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Technical Information & Shortcuts */}
          <div className="space-y-3 md:col-span-1">
            <div className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Technical Information</span>
            </div>
            <div className="text-xs text-slate-400 space-y-1">
              <div>Version: <span className="text-slate-200 font-mono">1.0.0</span></div>
              <div>Platform: <span className="text-slate-200">NexVora Web Engine</span></div>
              <div>Rendering: <span className="text-slate-200">Client-Side High DPI (2x/SVG)</span></div>
            </div>

            <div className="pt-2 border-t border-white/5">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Command className="w-3 h-3" />
                <span>Shortcuts</span>
              </div>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Copy Image:</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">Ctrl/⌘ + C</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Save PNG:</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">Ctrl/⌘ + S</kbd>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Developed by <strong className="text-slate-300 font-medium">Prince AR Abdur Rahman</strong></span>
            <span>·</span>
            <span>Published by <strong className="text-slate-300 font-medium">NexVora Lab's Ofc</strong></span>
          </div>
          <div>
            © 2026 NexVora Lab's Ofc. All Rights Reserved
          </div>
        </div>

      </div>
    </footer>
  );
};
