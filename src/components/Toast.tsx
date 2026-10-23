import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#1e1040]/95 backdrop-blur-md border border-purple-500/50 text-white text-xs sm:text-sm font-semibold shadow-xl shadow-purple-950/80 purple-glow-sm">
        <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
};
