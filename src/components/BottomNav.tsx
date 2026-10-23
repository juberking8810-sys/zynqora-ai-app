import React from 'react';
import { Home, Compass, Plus, FolderHeart, User } from 'lucide-react';
import { ActiveTab, AppLanguage } from '../types';

interface BottomNavProps {
  currentTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  lang: AppLanguage;
  savedCount: number;
  onOpenCreate: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  lang,
  savedCount,
  onOpenCreate,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-purple-900/40 pb-safe">
      <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto px-2 relative">
        {/* 1. Home */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-all cursor-pointer ${
            currentTab === 'home'
              ? 'text-[#a855f7] font-bold scale-105'
              : 'text-slate-400 hover:text-purple-300'
          }`}
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[10px] sm:text-[11px] leading-none whitespace-nowrap">
            {lang === 'hi' ? 'होम' : 'Home'}
          </span>
          {currentTab === 'home' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] mt-1 shadow-[0_0_6px_#a855f7]" />
          )}
        </button>

        {/* 2. Explore */}
        <button
          onClick={() => onSelectTab('explore')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-all cursor-pointer ${
            currentTab === 'explore'
              ? 'text-[#a855f7] font-bold scale-105'
              : 'text-slate-400 hover:text-purple-300'
          }`}
        >
          <Compass className="w-5 h-5 mb-1" />
          <span className="text-[10px] sm:text-[11px] leading-none whitespace-nowrap">
            {lang === 'hi' ? 'एक्सप्लोर' : 'Explore'}
          </span>
          {currentTab === 'explore' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] mt-1 shadow-[0_0_6px_#a855f7]" />
          )}
        </button>

        {/* 3. Big Purple + button in center with lift effect */}
        <div className="flex items-center justify-center -mt-6">
          <button
            onClick={onOpenCreate}
            title={lang === 'hi' ? 'नया AI कंटेंट बनाएं' : 'Create new AI content'}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-700 via-[#7c3aed] to-indigo-500 shadow-2xl shadow-purple-600/60 border-4 border-[#0a0a0f] flex items-center justify-center text-white active:scale-90 hover:scale-105 transition-all transform cursor-pointer group"
          >
            <Plus className="w-7 h-7 text-white stroke-[2.5] group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* 4. Assets */}
        <button
          onClick={() => onSelectTab('assets')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-all cursor-pointer relative ${
            currentTab === 'assets'
              ? 'text-[#a855f7] font-bold scale-105'
              : 'text-slate-400 hover:text-purple-300'
          }`}
        >
          <div className="relative">
            <FolderHeart className="w-5 h-5 mb-1" />
            {savedCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#7c3aed] text-[9px] text-white px-1.5 py-0.2 rounded-full font-extrabold shadow-sm">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] leading-none whitespace-nowrap">
            {lang === 'hi' ? 'एसेट्स' : 'Assets'}
          </span>
          {currentTab === 'assets' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] mt-1 shadow-[0_0_6px_#a855f7]" />
          )}
        </button>

        {/* 5. My Space */}
        <button
          onClick={() => onSelectTab('myspace')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-all cursor-pointer ${
            currentTab === 'myspace'
              ? 'text-[#a855f7] font-bold scale-105'
              : 'text-slate-400 hover:text-purple-300'
          }`}
        >
          <User className="w-5 h-5 mb-1" />
          <span className="text-[10px] sm:text-[11px] leading-none whitespace-nowrap">
            {lang === 'hi' ? 'माई स्पेस' : 'My Space'}
          </span>
          {currentTab === 'myspace' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] mt-1 shadow-[0_0_6px_#a855f7]" />
          )}
        </button>
      </div>
    </nav>
  );
};
