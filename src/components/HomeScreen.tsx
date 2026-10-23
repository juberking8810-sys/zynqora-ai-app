import React from 'react';
import {
  MessageSquare,
  Video,
  Sparkles,
  ArrowRight,
  Zap,
  ShieldCheck,
  Languages,
  CheckCircle2,
  Copy,
  Clock,
  Flame,
} from 'lucide-react';
import { ActiveTab, AppLanguage, ShortsScript, ToolCategoryId } from '../types';
import { translations } from '../data/translations';
import { ToolsDashboard } from './ToolsDashboard';

interface HomeScreenProps {
  onSelectTab: (tab: ActiveTab) => void;
  lang: AppLanguage;
  savedScripts: ShortsScript[];
  onSelectScriptForView: (script: ShortsScript) => void;
  onQuickStartTopic: (topic: string) => void;
  onQuickChatPrompt: (promptText: string) => void;
  onSelectTool: (toolId: ToolCategoryId) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectTab,
  lang,
  savedScripts,
  onSelectScriptForView,
  onQuickStartTopic,
  onQuickChatPrompt,
  onSelectTool,
}) => {
  const t = translations[lang];

  const popularIdeas = lang === 'hi' ? [
    { title: 'स्मार्टफोन के 5 छुपे फीचर्स', niche: 'tech' },
    { title: 'बरमूडा ट्रायंगल का अनसुलझा रहस्य', niche: 'facts' },
    { title: '₹500 से महीने का ₹10,000 कैसे बनाएं?', niche: 'finance' },
    { title: '3 सेकंड में लेजीनेस दूर करने की जापानी ट्रिक', niche: 'fitness' },
    { title: 'दुनिया का सबसे सुरक्षित गुप्त कमरा', niche: 'story' },
  ] : [
    { title: '5 Secret Smartphone Features Nobody Knows', niche: 'tech' },
    { title: 'The Unsolved Mystery of Bermuda Triangle', niche: 'facts' },
    { title: 'How to Turn $100 into $1,000 in College', niche: 'finance' },
    { title: 'The 3-Second Japanese Trick to Beat Procrastination', niche: 'fitness' },
    { title: 'The Most Secure Bunker on Earth', niche: 'story' },
  ];

  const chatPrompts = [
    t.prompt1,
    t.prompt2,
    t.prompt3,
    t.prompt4,
  ];

  return (
    <div className="w-full pb-20 md:pb-12 space-y-10">
      {/* Hero Welcome Aura */}
      <section className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-b from-purple-950/40 via-[#130b29]/80 to-[#0c071d] p-6 sm:p-10 lg:p-12 purple-glow-sm">
        {/* Soft background ambient light circles */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-purple-600/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-indigo-600/15 blur-3xl" />

        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.tagline}</span>
            <span className="text-purple-400/50">·</span>
            <span>{lang === 'hi' ? 'हिंदी और इंग्लिश' : 'Hindi & English'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {t.welcomeHeader}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {t.welcomeSub}
          </p>

          {/* Value Badges */}
          <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-4 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/50 border border-purple-800/40">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.badgeFree}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/50 border border-purple-800/40">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{t.badgeNoKey}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/50 border border-purple-800/40">
              <Languages className="w-4 h-4 text-purple-400" />
              <span>{t.badgeDualLang}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two Features Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {lang === 'hi' ? 'मुख्य एआई फीचर्स' : 'Core AI Features'}
          </h2>
          <span className="text-xs text-purple-300/80">
            {lang === 'hi' ? 'चुनें और तुरंत शुरू करें' : 'Select a tool to begin'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feature 1: AI Chat Card */}
          <div className="group relative rounded-2xl border border-purple-800/40 bg-gradient-to-br from-[#150d2e] via-[#100924] to-[#0d071d] p-6 sm:p-7 transition-all duration-200 hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-950/50 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-purple-900/60 border border-purple-500/40 flex items-center justify-center purple-glow-sm">
                  <MessageSquare className="w-6 h-6 text-purple-300" />
                </div>
                <span className="text-xs px-2.5 py-1 rounded-md bg-purple-950/80 text-purple-300 border border-purple-800/50 font-medium">
                  {lang === 'hi' ? 'मल्टी-टर्न चैट' : 'Interactive Chat'}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {t.chatFeatureTitle}
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {t.chatFeatureDesc}
                </p>
              </div>

              {/* Sample Chat Suggestions */}
              <div className="pt-2 space-y-2">
                <p className="text-xs font-semibold text-purple-300/90 uppercase tracking-wider">
                  {lang === 'hi' ? 'तुरंत पूछें:' : 'Quick Prompts:'}
                </p>
                <div className="space-y-1.5">
                  {chatPrompts.slice(0, 2).map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => onQuickChatPrompt(prompt)}
                      className="w-full text-left text-xs p-2 rounded-lg bg-purple-950/40 hover:bg-purple-900/40 border border-purple-800/30 text-slate-300 hover:text-white transition-colors truncate block"
                    >
                      💬 "{prompt}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onSelectTab('chat')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-semibold text-sm transition-all purple-glow-sm active:scale-[0.98]"
              >
                <span>{t.chatFeatureAction}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Feature 2: YouTube Shorts Script Generator Card */}
          <div className="group relative rounded-2xl border border-purple-600/40 bg-gradient-to-br from-[#1a0e38] via-[#130b2b] to-[#0e0720] p-6 sm:p-7 transition-all duration-200 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-900/50 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center purple-glow-sm shadow-purple-900/50">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-200 border border-purple-500/30 font-medium">
                    <Flame className="w-3.5 h-3.5 text-pink-400" />
                    <span>Viral Studio</span>
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {t.shortsFeatureTitle}
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {t.shortsFeatureDesc}
                </p>
              </div>

              {/* Generator Capabilities Checklist */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>3-Sec Viral Hooks</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Camera Cues & SFX</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>High-CTR Titles</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>SEO Tags & Copy</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onSelectTab('shorts')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-sm transition-all purple-glow-md active:scale-[0.98]"
              >
                <span>{t.shortsFeatureAction}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Complete 17-Category All-in-One AI Studio Dashboard */}
      <ToolsDashboard lang={lang} onSelectTool={onSelectTool} />

      {/* Quick Launch Viral Ideas Carousel */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Flame className="w-4 h-4 text-pink-400" />
            <span>{t.popularTopicsTitle}</span>
          </h2>
          <span className="text-xs text-slate-400">
            {lang === 'hi' ? 'क्लिक करके तुरंत बनाएं' : 'Click to generate'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {popularIdeas.map((idea, idx) => (
            <button
              key={idx}
              onClick={() => onQuickStartTopic(idea.title)}
              className="group text-left p-4 rounded-xl bg-[#140c2b] border border-purple-900/50 hover:border-purple-500/60 hover:bg-[#1b103b] transition-all flex items-center justify-between gap-3 active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 truncate">
                <span className="w-7 h-7 rounded-lg bg-purple-900/60 text-purple-300 flex items-center justify-center text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <span className="text-sm font-medium text-slate-200 group-hover:text-purple-200 transition-colors truncate">
                  {idea.title}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-400 shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </div>
      </section>

      {/* Saved Scripts Section (if any exist) */}
      {savedScripts.length > 0 && (
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>{t.recentScriptsTitle}</span>
            </h2>
            <button
              onClick={() => onSelectTab('saved')}
              className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              {lang === 'hi' ? 'सभी देखें →' : 'View All →'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {savedScripts.slice(0, 3).map((script) => (
              <div
                key={script.id}
                onClick={() => onSelectScriptForView(script)}
                className="cursor-pointer p-4 rounded-xl bg-[#120a26] border border-purple-900/40 hover:border-purple-500/50 hover:bg-[#190e36] transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-xs text-purple-300/80">
                  <span className="capitalize">{script.niche}</span>
                  <span>{script.duration}</span>
                </div>
                <h4 className="text-sm font-semibold text-white line-clamp-1">
                  {script.topic}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {script.titles[0] || script.description}
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] text-purple-400">
                  <span>{script.scenes.length} Scenes</span>
                  <span className="flex items-center gap-1 hover:underline">
                    {lang === 'hi' ? 'देखें व कॉपी करें' : 'Open & Copy'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
