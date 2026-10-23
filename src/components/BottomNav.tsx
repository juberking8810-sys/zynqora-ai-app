import React from 'react';
import { Home, MessageSquare, Video, Bookmark } from 'lucide-react';
import { ActiveTab, AppLanguage } from '../types';
import { translations } from '../data/translations';

interface BottomNavProps {
  currentTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  lang: AppLanguage;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  lang,
  savedCount,
}) => {
  const t = translations[lang];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c071d]/95 backdrop-blur-lg border-t border-purple-900/40 pb-safe">
      <div className="grid grid-cols-4 items-center h-16 max-w-md mx-auto">
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
            currentTab === 'home' ? 'text-purple-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[11px] leading-none whitespace-nowrap">{t.navHome}</span>
        </button>

        <button
          onClick={() => onSelectTab('chat')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
            currentTab === 'chat' ? 'text-purple-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-5 h-5 mb-1" />
          <span className="text-[11px] leading-none whitespace-nowrap">{t.navChat}</span>
        </button>

        <button
          onClick={() => onSelectTab('shorts')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
            currentTab === 'shorts' ? 'text-purple-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Video className="w-5 h-5 mb-1" />
          </div>
          <span className="text-[11px] leading-none whitespace-nowrap">{t.navShorts}</span>
        </button>

        <button
          onClick={() => onSelectTab('saved')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors relative ${
            currentTab === 'saved' ? 'text-purple-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Bookmark className="w-5 h-5 mb-1" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-purple-600 text-[10px] text-white px-1.5 py-0.2 rounded-full font-bold">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[11px] leading-none whitespace-nowrap">{t.navSaved}</span>
        </button>
      </div>
    </nav>
  );
};
