import React from 'react';
import { X, MessageSquare, ExternalLink, Code2, Building2, ShieldCheck, Heart, User, Sparkles } from 'lucide-react';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#14151b] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">About NexVora Ray</h2>
            <p className="text-xs text-slate-400">Developer profile, company mission & technical details</p>
          </div>
        </div>

        <div className="space-y-6 pt-6">
          {/* About Developer Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-pink-400 tracking-wide uppercase">
              <User className="w-4 h-4" />
              <span>About Developer</span>
            </div>
            
            <div className="bg-[#1b1c24] border border-white/5 rounded-xl p-4 sm:p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Prince AR Abdur Rahman
                </h3>
                <span className="text-xs px-2.5 py-1 bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-md font-medium inline-block w-fit">
                  Lead Software Developer
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Independent App Developer passionate about building modern Android applications, productivity tools, AI-powered experiences, media players, educational apps, and next-generation digital products.
              </p>

              {/* Developer Contacts */}
              <div className="pt-2 border-t border-white/5 space-y-2">
                <div className="text-xs font-medium text-slate-400">Direct Contact & Channels:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {/* WhatsApp 1 */}
                  <a
                    href="https://wa.me/8801707424006"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20 hover:text-emerald-200 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>WhatsApp: 01707424006</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
                  </a>

                  {/* WhatsApp 2 */}
                  <a
                    href="https://wa.me/8801796951709"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20 hover:text-emerald-200 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>WhatsApp: 01796951709</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/share/1BNn32qoJo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/20 hover:text-blue-200 transition-colors"
                  >
                    <span className="font-bold text-blue-400 text-sm w-4 text-center">f</span>
                    <span>Facebook Profile</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/ur___abdur____rahman__2008"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 hover:bg-fuchsia-500/20 hover:text-fuchsia-200 transition-colors"
                  >
                    <span className="font-bold text-fuchsia-400 text-sm w-4 text-center">IG</span>
                    <span>Instagram Profile</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* About Company Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-400 tracking-wide uppercase">
              <Building2 className="w-4 h-4" />
              <span>About Company</span>
            </div>

            <div className="bg-[#1b1c24] border border-white/5 rounded-xl p-4 sm:p-5 space-y-2">
              <h3 className="text-lg font-bold text-white tracking-tight">NexVora Lab's Ofc</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                NexVora Lab's Ofc focuses on creating innovative Android applications designed to improve productivity, entertainment, learning, and digital experiences.
              </p>
              <div className="mt-3 p-3 rounded-lg bg-white/5 border border-white/5">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                  Mission
                </span>
                <p className="text-sm text-slate-200 italic">
                  "Build fast, beautiful, privacy-friendly, and user-focused applications accessible to everyone."
                </p>
              </div>
            </div>
          </div>

          {/* Technical Information & Credits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Technical Information */}
            <div className="bg-[#1b1c24] border border-white/5 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Technical Information</span>
              </div>
              <div className="text-sm text-slate-300 flex items-center justify-between">
                <span>Application Version</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/10 text-white font-medium">1.0.0</span>
              </div>
              <div className="text-sm text-slate-300 flex items-center justify-between">
                <span>Framework</span>
                <span className="text-xs text-slate-400 font-medium">React 19 + Vite + Tailwind</span>
              </div>
            </div>

            {/* Credits */}
            <div className="bg-[#1b1c24] border border-white/5 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Credits</span>
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <div><span className="text-slate-400">Developed by:</span> <strong className="text-white">Prince AR Abdur Rahman</strong></div>
                <div><span className="text-slate-400">Published by:</span> <strong className="text-white">NexVora Lab's Ofc</strong></div>
              </div>
            </div>
          </div>

          {/* Copyright notice */}
          <div className="text-center pt-2 text-xs text-slate-500">
            © 2026 NexVora Lab's Ofc. All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};
