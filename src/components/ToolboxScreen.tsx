import React from 'react';
import { ArrowLeft, Wrench, Sparkles } from 'lucide-react';
import { AppLanguage, ToolCategoryId, ActiveTab } from '../types';
import { ToolsDashboard } from './ToolsDashboard';

interface ToolboxScreenProps {
  lang: AppLanguage;
  onBack: () => void;
  onSelectTool: (toolId: ToolCategoryId) => void;
}

export const ToolboxScreen: React.FC<ToolboxScreenProps> = ({
  lang,
  onBack,
  onSelectTool,
}) => {
  return (
    <div className="w-full pb-24 md:pb-12 space-y-6 max-w-5xl mx-auto">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between gap-4 border-b border-purple-900/40 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/30 text-purple-200 text-xs font-bold transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'hi' ? 'होम पर वापस जाएं' : 'Back to Home'}</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-900/70 border border-purple-500/40 flex items-center justify-center">
            <Wrench className="w-4 h-4 text-purple-300" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {lang === 'hi' ? 'Zynqora AI टूलबॉक्स' : 'Zynqora AI Toolbox'}
            </h1>
            <p className="text-[11px] text-purple-300/80">
              {lang === 'hi' ? 'सभी 17 शक्तिशाली AI टूल्स' : 'All 17 Creative & Production Tools'}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[11px] font-bold text-emerald-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'hi' ? '100% फ्री टूल्स' : '100% Zero-Cost Tools'}</span>
        </div>
      </div>

      {/* Embedded Tools Dashboard */}
      <ToolsDashboard lang={lang} onSelectTool={onSelectTool} />
    </div>
  );
};
