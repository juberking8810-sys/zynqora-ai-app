import React from 'react';
import { Sparkles, MessageSquare, Video, Bookmark, Globe } from 'lucide-react';
import { AppLanguage, ActiveTab } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  lang: AppLanguage;
  onToggleLang: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  lang,
  onToggleLang,
  savedCount,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-900/40 bg-[#090514]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-500 flex items-center justify-center purple-glow-sm shadow-purple-900/40">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors whitespace-nowrap">
              Zynqora <span className="text-purple-400">AI</span>
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => onSelectTab('home')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
              currentTab === 'home'
                ? 'text-purple-300 border-purple-500 font-semibold'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            {t.navHome}
          </button>

          <button
            onClick={() => onSelectTab('chat')}
            className={`flex items-center gap-2 whitespace-nowrap transition-colors pb-1 border-b-2 ${
              currentTab === 'chat'
                ? 'text-purple-300 border-purple-500 font-semibold'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-purple-400" />
            <span>{t.navChat}</span>
          </button>

          <button
            onClick={() => onSelectTab('shorts')}
            className={`flex items-center gap-2 whitespace-nowrap transition-colors pb-1 border-b-2 ${
              currentTab === 'shorts'
                ? 'text-purple-300 border-purple-500 font-semibold'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <Video className="w-4 h-4 text-purple-400" />
            <span>{t.navShorts}</span>
          </button>

          <button
            onClick={() => onSelectTab('saved')}
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors pb-1 border-b-2 ${
              currentTab === 'saved'
                ? 'text-purple-300 border-purple-500 font-semibold'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-4 h-4 text-purple-400" />
            <span>{t.navSaved}</span>
            {savedCount > 0 && (
              <span className="text-xs bg-purple-900/70 text-purple-200 px-1.5 py-0.5 rounded-full border border-purple-500/30">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Language Toggle & Quick Action */}
        <div className="flex items-center gap-3">
          {/* Language Toggle Button */}
          <button
            onClick={onToggleLang}
            title={lang === 'en' ? 'Switch to Hindi (हिंदी)' : 'Switch to English'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-500/30 bg-purple-950/40 hover:bg-purple-900/50 text-purple-200 text-xs font-medium transition-all shadow-sm active:scale-95 min-h-[40px]"
          >
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-semibold">{lang === 'en' ? 'हिंदी' : 'English'}</span>
          </button>

          {/* Direct CTA */}
          <button
            onClick={() => onSelectTab('shorts')}
            className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all purple-glow-sm active:scale-95 whitespace-nowrap min-h-[40px]"
          >
            <Video className="w-3.5 h-3.5" />
            <span>{t.shortsFeatureAction}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
