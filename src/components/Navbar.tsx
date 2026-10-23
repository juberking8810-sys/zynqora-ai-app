import React from 'react';
import {
  Sparkles,
  MessageSquare,
  Video,
  Bookmark,
  Globe,
  Wrench,
  Compass,
  User,
} from 'lucide-react';
import { AppLanguage, ActiveTab, UserProfile } from '../types';
import { translations } from '../data/translations';
import { ZLogo } from './ZLogo';

interface NavbarProps {
  currentTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  lang: AppLanguage;
  onToggleLang: () => void;
  savedCount: number;
  user: UserProfile | null;
  onOpenCreate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  lang,
  onToggleLang,
  savedCount,
  user,
  onOpenCreate,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-900/40 bg-[#0a0a0f]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark with new premium glowing Z logo */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95 cursor-pointer"
        >
          <ZLogo size="sm" />
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-purple-300 transition-colors whitespace-nowrap">
              Zynqora <span className="text-[#a855f7]">AI</span>
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => onSelectTab('home')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 cursor-pointer ${
              currentTab === 'home'
                ? 'text-purple-300 border-[#7c3aed] font-bold'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            {lang === 'hi' ? 'होम' : 'Home'}
          </button>

          <button
            onClick={() => onSelectTab('toolbox')}
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors pb-1 border-b-2 cursor-pointer ${
              currentTab === 'toolbox'
                ? 'text-purple-300 border-[#7c3aed] font-bold'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <Wrench className="w-4 h-4 text-purple-400" />
            <span>{lang === 'hi' ? 'टूलबॉक्स' : 'Toolbox'}</span>
            <span className="text-[10px] bg-purple-900/70 text-purple-200 px-1.5 py-0.2 rounded-full border border-purple-500/30">
              17
            </span>
          </button>

          <button
            onClick={() => onSelectTab('explore')}
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors pb-1 border-b-2 cursor-pointer ${
              currentTab === 'explore'
                ? 'text-purple-300 border-[#7c3aed] font-bold'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <Compass className="w-4 h-4 text-purple-400" />
            <span>{lang === 'hi' ? 'एक्सप्लोर' : 'Explore'}</span>
          </button>

          <button
            onClick={() => onSelectTab('shorts')}
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors pb-1 border-b-2 cursor-pointer ${
              currentTab === 'shorts'
                ? 'text-purple-300 border-[#7c3aed] font-bold'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <Video className="w-4 h-4 text-purple-400" />
            <span>{t.navShorts}</span>
          </button>

          <button
            onClick={() => onSelectTab('chat')}
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors pb-1 border-b-2 cursor-pointer ${
              currentTab === 'chat'
                ? 'text-purple-300 border-[#7c3aed] font-bold'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-purple-400" />
            <span>{t.navChat}</span>
          </button>

          <button
            onClick={() => onSelectTab('assets')}
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors pb-1 border-b-2 cursor-pointer ${
              currentTab === 'assets'
                ? 'text-purple-300 border-[#7c3aed] font-bold'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-4 h-4 text-purple-400" />
            <span>{lang === 'hi' ? 'एसेट्स' : 'Assets'}</span>
            {savedCount > 0 && (
              <span className="text-xs bg-purple-900/70 text-purple-200 px-1.5 py-0.5 rounded-full border border-purple-500/30">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Language Toggle & Quick Create Action */}
        <div className="flex items-center gap-2.5">
          {/* Language Toggle Button */}
          <button
            onClick={onToggleLang}
            title={lang === 'en' ? 'Switch to Hindi (हिंदी)' : 'Switch to English'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-purple-500/30 bg-[#160c2e] hover:bg-[#201242] text-purple-200 text-xs font-semibold transition-all shadow-sm active:scale-95 min-h-[38px] cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <span>{lang === 'en' ? 'हिंदी' : 'English'}</span>
          </button>

          {/* Quick Create CTA */}
          <button
            onClick={onOpenCreate}
            className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all shadow-md shadow-purple-900/50 active:scale-95 whitespace-nowrap min-h-[38px] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'Create' : 'Create'}</span>
          </button>

          {/* My Space Avatar / Icon */}
          <button
            onClick={() => onSelectTab('myspace')}
            className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
              currentTab === 'myspace'
                ? 'bg-purple-900/80 border-purple-400 text-white'
                : 'bg-[#140b2a] border-purple-900/50 text-purple-300 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
