import React from 'react';
import {
  User,
  Sparkles,
  Trophy,
  Globe,
  LogOut,
  ShieldCheck,
  Zap,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
import { AppLanguage, UserProfile, ActiveTab } from '../types';
import { ZLogo } from './ZLogo';

interface MySpaceScreenProps {
  user: UserProfile | null;
  lang: AppLanguage;
  onToggleLang: () => void;
  onSignOut: () => void;
  onSelectTab: (tab: ActiveTab) => void;
}

export const MySpaceScreen: React.FC<MySpaceScreenProps> = ({
  user,
  lang,
  onToggleLang,
  onSignOut,
  onSelectTab,
}) => {
  return (
    <div className="w-full pb-24 md:pb-12 space-y-6 max-w-3xl mx-auto">
      {/* Profile Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#180e38] to-[#110826] border border-purple-500/40 p-6 shadow-xl shadow-purple-950/60">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          {/* Avatar or Z Logo */}
          <div className="relative">
            <ZLogo size="lg" />
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">
                {user?.name || (lang === 'hi' ? 'Zynqora क्रिएटर' : 'Zynqora Creator')}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-900/70 text-purple-300 border border-purple-500/30">
                {user?.provider === 'google'
                  ? 'Google Verified'
                  : user?.provider === 'email'
                  ? 'Email Account'
                  : 'Guest Mode'}
              </span>
            </div>
            <p className="text-xs text-purple-300/80 font-mono">{user?.email || 'creator@zynqora.ai'}</p>
          </div>

          <button
            onClick={onSignOut}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-950/80 hover:bg-rose-950/80 border border-purple-800/40 hover:border-rose-700/50 text-rose-300 text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{lang === 'hi' ? 'लॉग आउट' : 'Sign Out'}</span>
          </button>
        </div>

        {/* 100k Credits Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-purple-950/80 via-purple-900/60 to-indigo-950/80 border border-purple-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-xs text-purple-200 font-semibold uppercase tracking-wider">
                {lang === 'hi' ? 'AI चैलेंज क्रेडिट्स' : 'AI Challenge Balance'}
              </span>
              <div className="text-xl font-extrabold text-white">
                {user?.credits ? user.credits.toLocaleString() : '100,000'}{' '}
                <span className="text-xs font-bold text-amber-300">CREDITS</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
              <CheckCircle2 className="w-3 h-3" />
              {lang === 'hi' ? 'एक्टिव' : 'Active'}
            </span>
          </div>
        </div>
      </div>

      {/* Settings & Language */}
      <div className="rounded-3xl bg-[#120a26] border border-purple-900/40 p-5 space-y-4">
        <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider">
          {lang === 'hi' ? 'प्राथमिकताएं और सेटिंग्स' : 'Preferences & Studio Settings'}
        </h3>

        {/* Language switch */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#170e33] border border-purple-900/30">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-purple-400" />
            <div>
              <span className="text-sm font-bold text-white">
                {lang === 'hi' ? 'भाषा (Language)' : 'App Language'}
              </span>
              <p className="text-xs text-slate-400">
                {lang === 'hi' ? 'हिंदी व अंग्रेजी में सामग्री देखें' : 'Switch between English and Hindi'}
              </p>
            </div>
          </div>

          <button
            onClick={onToggleLang}
            className="px-4 py-2 rounded-xl bg-[#7c3aed] text-white text-xs font-bold transition-all shadow-md active:scale-95"
          >
            {lang === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}
          </button>
        </div>

        {/* Quick jump to Toolbox */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#170e33] border border-purple-900/30">
          <div className="flex items-center gap-3">
            <Wrench className="w-5 h-5 text-purple-400" />
            <div>
              <span className="text-sm font-bold text-white">
                {lang === 'hi' ? 'सभी 17 AI टूल्स खोलें' : 'All 17 AI Tools'}
              </span>
              <p className="text-xs text-slate-400">
                {lang === 'hi' ? 'वीडियो, ऑडियो, थंबनेल व राइटिंग स्टूडियो' : 'Video, Voice, Images & Writing Assistant'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('toolbox')}
            className="px-4 py-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-500/30 text-xs font-bold transition-all"
          >
            {lang === 'hi' ? 'टूलबॉक्स' : 'Toolbox'}
          </button>
        </div>
      </div>
    </div>
  );
};
