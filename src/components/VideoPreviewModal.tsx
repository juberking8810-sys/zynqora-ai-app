import React, { useState } from 'react';
import { X, Play, Pause, Sparkles, Copy, Check, ArrowRight, Clock, Tag } from 'lucide-react';
import { AppLanguage } from '../types';

export interface RecommendedCard {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnailSvg: React.ReactNode;
  prompt: string;
  aspectRatio: string;
  model: string;
  views: string;
}

interface VideoPreviewModalProps {
  card: RecommendedCard | null;
  onClose: () => void;
  lang: AppLanguage;
  onRemix: (prompt: string) => void;
  onShowToast: (msg: string) => void;
}

export const VideoPreviewModal: React.FC<VideoPreviewModalProps> = ({
  card,
  onClose,
  lang,
  onRemix,
  onShowToast,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  if (!card) return null;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(card.prompt);
    setIsCopied(true);
    onShowToast(lang === 'hi' ? 'प्रॉम्प्ट कॉपी हो गया!' : 'Prompt copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#120a26] border border-purple-500/40 overflow-hidden shadow-2xl shadow-purple-950/90 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-purple-900/40 bg-[#160d30]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-900/60 text-purple-200 border border-purple-500/30">
              {card.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-purple-300">
              <Clock className="w-3.5 h-3.5" />
              {card.duration}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white bg-purple-950/60 border border-purple-800/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas / Player Simulation */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
          <div className={`w-full h-full transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}>
            {card.thumbnailSvg}
          </div>

          {/* Playing Simulation Glow */}
          {isPlaying && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
          )}

          {/* Center Play/Pause toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-10 w-14 h-14 rounded-full bg-purple-600/80 hover:bg-purple-500 text-white flex items-center justify-center shadow-xl shadow-purple-950 backdrop-blur-sm transition-transform active:scale-95"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className={`h-full bg-purple-500 transition-all ${
                isPlaying ? 'w-full duration-[8000ms] ease-linear' : 'w-1/3'
              }`}
            />
          </div>
        </div>

        {/* Content details */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{card.title}</h3>
            <p className="text-xs text-purple-300/70">
              {lang === 'hi'
                ? `Zynqora AI मॉडल • ${card.views} क्रिएटर व्यूज`
                : `Generated with Zynqora Cinematic V3 • ${card.views} creator views`}
            </p>
          </div>

          {/* Prompt Box */}
          <div className="rounded-2xl bg-[#0c061d] border border-purple-900/50 p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-purple-300">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                {lang === 'hi' ? 'AI प्रॉम्प्ट' : 'Generation Prompt'}
              </span>
              <button
                onClick={handleCopyPrompt}
                className="flex items-center gap-1 text-purple-300 hover:text-white transition-colors"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? (lang === 'hi' ? 'कॉपी हुआ' : 'Copied') : (lang === 'hi' ? 'कॉपी करें' : 'Copy')}</span>
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-mono selection:bg-purple-800">
              "{card.prompt}"
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={() => onRemix(card.prompt)}
              className="flex-1 min-h-[46px] rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'hi' ? 'इस प्रॉम्प्ट से बनाएं (Remix)' : 'Remix & Create with Prompt'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
