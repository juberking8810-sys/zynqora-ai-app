import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Copy, Check, Type } from 'lucide-react';
import { ShortsScript, AppLanguage } from '../types';
import { translations } from '../data/translations';
import { safeCopyToClipboard } from '../utils/storage';

interface TeleprompterModalProps {
  script: ShortsScript | null;
  onClose: () => void;
  lang: AppLanguage;
  onShowToast: (msg: string) => void;
}

export const TeleprompterModal: React.FC<TeleprompterModalProps> = ({
  script,
  onClose,
  lang,
  onShowToast,
}) => {
  if (!script) return null;
  const t = translations[lang];

  const [fontSize, setFontSize] = useState<number>(24);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    let scrollTimer: any;
    if (isScrolling && typeof window !== 'undefined') {
      scrollTimer = setInterval(() => {
        window.scrollBy({ top: scrollSpeed, behavior: 'smooth' });
      }, 50);
    }
    return () => {
      if (scrollTimer) clearInterval(scrollTimer);
    };
  }, [isScrolling, scrollSpeed]);

  const handleCopyVoiceoverOnly = async () => {
    const text = (script.scenes || []).map((s) => s.voiceover).join('\n\n');
    const success = await safeCopyToClipboard(text);
    if (success) {
      setCopied(true);
      onShowToast(t.toastCopied);
      setTimeout(() => setCopied(false), 2000);
    } else {
      onShowToast(t.toastCopied);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070311]/98 backdrop-blur-xl flex flex-col">
      {/* Teleprompter Top Controller */}
      <div className="border-b border-purple-900/50 bg-[#0e0720] px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md">
            {script.topic}
          </h3>
          <span className="text-xs text-purple-300 font-mono">
            ({script.duration})
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Font Size controls */}
          <div className="flex items-center gap-1 bg-purple-950/80 rounded-lg p-1 border border-purple-800/40">
            <button
              onClick={() => setFontSize((s) => Math.max(16, s - 2))}
              className="px-2 py-1 text-xs text-slate-300 hover:text-white"
              title="Decrease Font"
            >
              A-
            </button>
            <span className="text-xs text-purple-300 font-mono px-1">
              {fontSize}px
            </span>
            <button
              onClick={() => setFontSize((s) => Math.min(48, s + 2))}
              className="px-2 py-1 text-xs text-slate-300 hover:text-white"
              title="Increase Font"
            >
              A+
            </button>
          </div>

          {/* Copy Voiceover Only */}
          <button
            onClick={handleCopyVoiceoverOnly}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-xs font-semibold border border-purple-500/40 transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">
              {lang === 'hi' ? 'वॉयसओवर कॉपी' : 'Copy Audio'}
            </span>
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-purple-950/80 hover:bg-purple-900 text-slate-300 hover:text-white border border-purple-800/40"
            title={t.closeTeleprompter}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Reader Content Body */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-12 lg:px-24 py-10 max-w-4xl mx-auto w-full space-y-12">
        <div className="text-center pb-4 border-b border-purple-900/40">
          <p className="text-xs font-semibold uppercase tracking-wider text-purple-400">
            {lang === 'hi' ? 'कैमरा के सामने बोलने के लिए तैयार' : 'Ready to record on camera'}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            "{script.titles[0] || script.topic}"
          </h2>
        </div>

        {script.scenes.map((scene, i) => (
          <div key={i} className="space-y-3 pb-6 border-b border-purple-900/20">
            <div className="flex items-center justify-between text-xs text-purple-400 font-mono">
              <span className="bg-purple-950 px-2.5 py-1 rounded-md border border-purple-800/40">
                {scene.timestamp}
              </span>
              <span className="text-slate-400 italic">{scene.visual}</span>
            </div>

            {/* High-visibility Teleprompter Text */}
            <p
              style={{ fontSize: `${fontSize}px` }}
              className="text-white font-medium leading-relaxed tracking-wide selection:bg-yellow-400 selection:text-black"
            >
              "{scene.voiceover}"
            </p>

            <div className="text-xs text-pink-300 font-mono pt-1">
              {scene.onScreenText} {scene.soundEffect ? `· ${scene.soundEffect}` : ''}
            </div>
          </div>
        ))}

        <div className="pt-8 text-center text-slate-500 text-xs">
          {lang === 'hi'
            ? '— स्क्रिप्ट समाप्त · Zynqora AI के साथ रिकॉर्डिंग शुरू करें —'
            : '— End of Script · Hit Record with Zynqora AI —'}
        </div>
      </div>
    </div>
  );
};
