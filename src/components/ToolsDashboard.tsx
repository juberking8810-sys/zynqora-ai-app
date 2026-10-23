import React, { useState, useMemo } from 'react';
import {
  Search,
  Clapperboard,
  MessageSquare,
  Volume2,
  Mic,
  FileText,
  Sliders,
  Layout,
  Music,
  Languages,
  Sparkles,
  Code,
  FileSearch,
  Scissors,
  Film,
  Video,
  Image,
  Bookmark,
  ArrowRight,
  Filter,
  CheckCircle2,
  Clock,
  Zap,
} from 'lucide-react';
import { AppLanguage, ToolCategoryId, ToolCategory } from '../types';
import { AI_TOOL_CATEGORIES } from '../data/toolsData';

interface ToolsDashboardProps {
  lang: AppLanguage;
  onSelectTool: (toolId: ToolCategoryId) => void;
}

export const ToolsDashboard: React.FC<ToolsDashboardProps> = ({
  lang,
  onSelectTool,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState<'all' | 'video' | 'image' | 'audio' | 'writing' | 'utility'>('all');

  // Map icon names to Lucide icons
  const getIcon = (name: string) => {
    switch (name) {
      case 'Clapperboard':
        return <Clapperboard className="w-5 h-5 text-pink-400" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-purple-400" />;
      case 'Volume2':
        return <Volume2 className="w-5 h-5 text-indigo-400" />;
      case 'Mic':
        return <Mic className="w-5 h-5 text-emerald-400" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-amber-400" />;
      case 'Sliders':
        return <Sliders className="w-5 h-5 text-violet-400" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-fuchsia-400" />;
      case 'Music':
        return <Music className="w-5 h-5 text-cyan-400" />;
      case 'Languages':
        return <Languages className="w-5 h-5 text-sky-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-yellow-400" />;
      case 'Code':
        return <Code className="w-5 h-5 text-emerald-400" />;
      case 'FileSearch':
        return <FileSearch className="w-5 h-5 text-orange-400" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5 text-rose-400" />;
      case 'Film':
        return <Film className="w-5 h-5 text-purple-400" />;
      case 'Video':
        return <Video className="w-5 h-5 text-blue-400" />;
      case 'Image':
        return <Image className="w-5 h-5 text-teal-400" />;
      case 'Bookmark':
        return <Bookmark className="w-5 h-5 text-purple-400" />;
      default:
        return <Zap className="w-5 h-5 text-purple-400" />;
    }
  };

  const groupLabels: Record<string, { en: string; hi: string }> = {
    all: { en: 'All 17 Tools', hi: 'सभी 17 टूल्स' },
    video: { en: 'Video & Animation', hi: 'वीडियो व एनीमेशन' },
    image: { en: 'Image & Design', hi: 'इमेज व डिजाइन' },
    audio: { en: 'Voice & Audio', hi: 'वॉयस व ऑडियो' },
    writing: { en: 'Writing & Scripts', hi: 'राइटिंग व स्क्रिप्ट्स' },
    utility: { en: 'Utilities & Code', hi: 'यूटिलिटी व कोड' },
  };

  // Filter tools based on search and active group
  const filteredTools = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return AI_TOOL_CATEGORIES.filter((tool) => {
      const matchesGroup = activeGroup === 'all' || tool.group === activeGroup;
      if (!matchesGroup) return false;

      if (!query) return true;

      const titleMatch =
        tool.titleEn.toLowerCase().includes(query) ||
        tool.titleHi.toLowerCase().includes(query);
      const descMatch =
        tool.descEn.toLowerCase().includes(query) ||
        tool.descHi.toLowerCase().includes(query);
      const badgeMatch =
        tool.badgeEn.toLowerCase().includes(query) ||
        tool.badgeHi.toLowerCase().includes(query);

      return titleMatch || descMatch || badgeMatch;
    });
  }, [searchQuery, activeGroup]);

  return (
    <section className="space-y-6 pt-4">
      {/* Dashboard Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-purple-900/40">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-300 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>{lang === 'hi' ? 'एआई क्रिएशन हब' : 'AI Creation Hub'}</span>
            <span className="text-purple-600">·</span>
            <span className="text-slate-400 font-mono">17 Categories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {lang === 'hi' ? 'ऑल-इन-वन एआई स्टूडियो' : 'All-in-One AI Studio Dashboard'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {lang === 'hi'
              ? 'वीडियो, इमेज, वॉयस, म्यूजिक और राइटिंग टूल्स — 100% मुफ़्त ब्राउज़र पावर्ड'
              : 'Video, image, voice, audio, and writing tools — 100% free with zero paid API lock-in'}
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === 'hi'
                ? 'टूल खोजें (वीडियो, इमेज, ऑडियो...)'
                : 'Search 17 tools (video, voice, code...)'
            }
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#0e0720] border border-purple-800/60 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 text-white placeholder-slate-500 text-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-purple-950/80"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs by Group */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {(['all', 'video', 'image', 'audio', 'writing', 'utility'] as const).map((grp) => (
          <button
            key={grp}
            onClick={() => setActiveGroup(grp)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all min-h-[36px] flex items-center gap-1.5 ${
              activeGroup === grp
                ? 'bg-purple-600 text-white purple-glow-sm shadow-purple-950/50'
                : 'bg-[#120a26] text-slate-400 hover:text-slate-200 border border-purple-900/40 hover:border-purple-700/50'
            }`}
          >
            <span>{groupLabels[grp][lang]}</span>
            {grp !== 'all' && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-950/80 text-purple-300">
                {AI_TOOL_CATEGORIES.filter((t) => t.group === grp).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Interactive Tool Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            className="group relative cursor-pointer rounded-2xl border border-purple-800/40 bg-gradient-to-br from-[#140c2e] via-[#100824] to-[#0c061a] p-5 hover:border-purple-500/70 hover:shadow-xl hover:shadow-purple-950/60 transition-all duration-200 flex flex-col justify-between active:scale-[0.99]"
          >
            <div className="space-y-3">
              {/* Card Header: Icon + Badge */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-900/50 border border-purple-600/30 flex items-center justify-center purple-glow-sm group-hover:scale-105 transition-transform">
                  {getIcon(tool.iconName)}
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800/60 font-mono">
                    {lang === 'hi' ? tool.badgeHi : tool.badgeEn}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
                  <span>{lang === 'hi' ? tool.titleHi : tool.titleEn}</span>
                </h3>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {lang === 'hi' ? tool.descHi : tool.descEn}
                </p>
              </div>

              {/* Engine Transparency Notice */}
              <div className="pt-2">
                <div className="text-[11px] text-purple-300/80 bg-[#0a0517] p-2 rounded-lg border border-purple-900/40 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="line-clamp-2">
                    {lang === 'hi' ? tool.engineNoticeHi : tool.engineNoticeEn}
                  </span>
                </div>
              </div>
            </div>

            {/* Launch Button */}
            <div className="pt-4 mt-3 border-t border-purple-900/30 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-400">
                {lang === 'hi' ? tool.statusLabelHi : tool.statusLabelEn}
              </span>

              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-bold text-purple-400 group-hover:text-white group-hover:translate-x-0.5 transition-all"
              >
                <span>{lang === 'hi' ? 'ओपन करें' : 'Open Studio'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty Search State */}
      {filteredTools.length === 0 && (
        <div className="p-10 text-center rounded-2xl border border-dashed border-purple-800/40 bg-[#100824] space-y-2">
          <p className="text-sm font-semibold text-white">
            {lang === 'hi' ? 'कोई टूल नहीं मिला' : 'No tools found matching your query'}
          </p>
          <p className="text-xs text-slate-400">
            {lang === 'hi' ? 'सर्च शब्द बदलें या सभी टूल्स देखें' : 'Try searching for "video", "voice", "script", or "image"'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveGroup('all');
            }}
            className="mt-2 px-3 py-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-xs font-semibold"
          >
            {lang === 'hi' ? 'सर्च रीसेट करें' : 'Reset Search'}
          </button>
        </div>
      )}
    </section>
  );
};
