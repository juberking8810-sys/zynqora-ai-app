import React, { useState } from 'react';
import { FolderHeart, Video, FileText, Bookmark, Trash2, ExternalLink, Play } from 'lucide-react';
import { AppLanguage, ShortsScript, ActiveTab } from '../types';

interface AssetsScreenProps {
  savedScripts: ShortsScript[];
  onDeleteScript: (id: string) => void;
  onOpenTeleprompter: (script: ShortsScript) => void;
  onLoadIntoGenerator: (script: ShortsScript) => void;
  lang: AppLanguage;
  onNavigateToGenerator: () => void;
  onShowToast: (msg: string) => void;
}

export const AssetsScreen: React.FC<AssetsScreenProps> = ({
  savedScripts,
  onDeleteScript,
  onOpenTeleprompter,
  onLoadIntoGenerator,
  lang,
  onNavigateToGenerator,
  onShowToast,
}) => {
  const [activeAssetType, setActiveAssetType] = useState<'all' | 'scripts' | 'videos'>('all');

  return (
    <div className="w-full pb-24 md:pb-12 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <FolderHeart className="w-6 h-6 text-purple-400" />
            <span>{lang === 'hi' ? 'मेरी एसेट्स और सेव की गई फाइल्स' : 'My Creative Assets'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-300/80">
            {lang === 'hi'
              ? 'आपकी सभी सहेजी गई स्क्रिप्ट्स, जनरेटेड वीडियो और प्रोजेक्ट्स'
              : 'All your saved scripts, generated audio, and creative projects'}
          </p>
        </div>

        <button
          onClick={onNavigateToGenerator}
          className="px-3.5 py-1.5 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-bold transition-all"
        >
          {lang === 'hi' ? '+ नया बनाएं' : '+ Create New'}
        </button>
      </div>

      {/* Asset Type Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveAssetType('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeAssetType === 'all'
              ? 'bg-[#7c3aed] text-white'
              : 'bg-[#150d30] text-purple-300 border border-purple-900/40'
          }`}
        >
          {lang === 'hi' ? 'सभी' : 'All Assets'} ({savedScripts.length})
        </button>
        <button
          onClick={() => setActiveAssetType('scripts')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeAssetType === 'scripts'
              ? 'bg-[#7c3aed] text-white'
              : 'bg-[#150d30] text-purple-300 border border-purple-900/40'
          }`}
        >
          {lang === 'hi' ? 'स्क्रिप्ट्स' : 'Shorts Scripts'} ({savedScripts.length})
        </button>
      </div>

      {/* List */}
      {savedScripts.length === 0 ? (
        <div className="rounded-3xl bg-[#120a26] border border-purple-900/40 p-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-950/80 border border-purple-800/40 flex items-center justify-center mx-auto text-purple-400">
            <Bookmark className="w-8 h-8 opacity-60" />
          </div>
          <h3 className="text-lg font-bold text-white">
            {lang === 'hi' ? 'कोई भी सहेजी गई एसेट नहीं है' : 'No saved assets yet'}
          </h3>
          <p className="text-xs text-purple-300 max-w-sm mx-auto">
            {lang === 'hi'
              ? 'Shorts Generator या AI Toolbox से कोई भी स्क्रिप्ट बनाकर यहाँ सेव करें।'
              : 'Generate and bookmark scripts in the Shorts Generator or Toolbox to access them here.'}
          </p>
          <button
            onClick={onNavigateToGenerator}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs"
          >
            {lang === 'hi' ? 'पहली स्क्रिप्ट बनाएं' : 'Create First Script'}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {savedScripts.map((script) => (
            <div
              key={script.id}
              className="p-4 rounded-2xl bg-[#120d26] border border-purple-900/50 hover:border-purple-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-500/30 uppercase">
                    {script.niche}
                  </span>
                  <span className="text-xs text-slate-400">{script.duration}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{script.topic}</h3>
                <p className="text-xs text-slate-300 line-clamp-1">{script.description}</p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => onOpenTeleprompter(script)}
                  className="px-3 py-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-xs font-semibold"
                >
                  {lang === 'hi' ? 'टेलीप्रॉम्प्टर' : 'Teleprompter'}
                </button>
                <button
                  onClick={() => onLoadIntoGenerator(script)}
                  className="px-3 py-1.5 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-semibold"
                >
                  {lang === 'hi' ? 'संपादित करें' : 'Open'}
                </button>
                <button
                  onClick={() => onDeleteScript(script.id)}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
