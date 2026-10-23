import React, { useState } from 'react';
import {
  Trophy,
  Sparkles,
  Wrench,
  Play,
  Clock,
  ArrowRight,
  Flame,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { ActiveTab, AppLanguage, ToolCategoryId } from '../types';
import {
  KnightCatThumbnail,
  NightDriveThumbnail,
  TalkingSnakeThumbnail,
  LionThumbnail,
} from './Thumbnails';
import { VideoPreviewModal, RecommendedCard } from './VideoPreviewModal';

interface HomeScreenProps {
  onSelectTab: (tab: ActiveTab) => void;
  lang: AppLanguage;
  onSelectTool: (toolId: ToolCategoryId) => void;
  onOpenCreateModal: () => void;
  onShowToast: (msg: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectTab,
  lang,
  onSelectTool,
  onOpenCreateModal,
  onShowToast,
}) => {
  const [selectedPreviewCard, setSelectedPreviewCard] = useState<RecommendedCard | null>(null);

  // The 4 Cards in 2x2 Grid exactly as specified
  const recommendedCards: RecommendedCard[] = [
    {
      id: 'knight-cat',
      title: lang === 'hi' ? 'नाइट कैट (Knight Cat)' : 'Knight Cat',
      category: lang === 'hi' ? 'फैंटेसी' : 'Fantasy',
      duration: '8s',
      thumbnailSvg: <KnightCatThumbnail />,
      prompt:
        'Heroic feline knight clad in filigree silver and purple armor, wielding glowing amethyst broadsword amidst enchanted misty forest, cinematic 8k, Unreal Engine 5 volumetric fog',
      aspectRatio: '16:9',
      model: 'Zynqora Cinema Pro',
      views: '142.8k',
    },
    {
      id: 'night-drive',
      title: lang === 'hi' ? 'नाइट ड्राइव (Night Drive)' : 'Night Drive',
      category: lang === 'hi' ? 'सिनेमैटिक' : 'Cinematic',
      duration: '10s',
      thumbnailSvg: <NightDriveThumbnail />,
      prompt:
        'Cyberpunk hypercar accelerating through neon-drenched Tokyo highway in rain, hyper-detailed reflections in asphalt, glowing violet rear tail-strip, anamorphic camera glide',
      aspectRatio: '16:9',
      model: 'Zynqora UltraMotion',
      views: '289.4k',
    },
    {
      id: 'talking-snake',
      title: lang === 'hi' ? 'टॉकिंग स्नेक (Talking Snake)' : 'Talking Snake',
      category: lang === 'hi' ? 'कैरेक्टर' : 'Character',
      duration: '6s',
      thumbnailSvg: <TalkingSnakeThumbnail />,
      prompt:
        'Charismatic iridescent emerald serpent speaking with expressive synchronized lip motions, glowing amethyst eyes, hyper-detailed scales with shimmering purple rim light',
      aspectRatio: '16:9',
      model: 'Zynqora VoiceSync 2',
      views: '98.2k',
    },
    {
      id: 'lion',
      title: lang === 'hi' ? 'लायन (Lion)' : 'Lion',
      category: lang === 'hi' ? 'वाइल्डलाइफ' : 'Wildlife',
      duration: '9s',
      thumbnailSvg: <LionThumbnail />,
      prompt:
        'Regal golden male lion roaring majestically atop savanna rock outcrop during dramatic crimson and violet African sunset, wind billowing through mane, golden hour particles',
      aspectRatio: '16:9',
      model: 'Zynqora Wildlife 4K',
      views: '320.1k',
    },
  ];

  const handleRemix = (prompt: string) => {
    setSelectedPreviewCard(null);
    onSelectTool('text_to_video');
    onShowToast(lang === 'hi' ? 'प्रॉम्प्ट वीडियो टूल में लोड हो गया!' : 'Prompt loaded into Text-to-Video tool!');
  };

  return (
    <div className="w-full pb-24 md:pb-12 space-y-6 max-w-4xl mx-auto">
      {/* Video Preview Modal */}
      {selectedPreviewCard && (
        <VideoPreviewModal
          card={selectedPreviewCard}
          onClose={() => setSelectedPreviewCard(null)}
          lang={lang}
          onRemix={handleRemix}
          onShowToast={onShowToast}
        />
      )}

      {/* TOP: Banner "AI Challenge - Create & win 100k credits • Ends in 2d 14h" with purple background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#581c87] via-[#6b21a8] to-[#4c1d95] p-3.5 sm:p-4 border border-purple-400/40 shadow-lg shadow-purple-950/50 flex items-center justify-between gap-3 text-white">
        {/* Soft background shimmer */}
        <div className="pointer-events-none absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-fuchsia-400/20 blur-2xl" />

        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-purple-900/80 border border-purple-300/40 flex items-center justify-center flex-shrink-0 shadow-md">
            <Trophy className="w-5 h-5 text-amber-300 animate-bounce" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-white truncate">
                {lang === 'hi'
                  ? 'AI Challenge - Create & win 100k credits'
                  : 'AI Challenge - Create & win 100k credits'}
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-[11px] sm:text-xs text-purple-200/90 font-medium flex items-center gap-1.5">
              <span>•</span>
              <span className="font-semibold text-amber-200">
                {lang === 'hi' ? 'Ends in 2d 14h' : 'Ends in 2d 14h'}
              </span>
              <span className="text-purple-300 hidden sm:inline">
                {lang === 'hi' ? '(शीर्ष 10 रचनाकारों के लिए)' : '(Free for all creators)'}
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="flex-shrink-0 px-3.5 py-1.5 rounded-xl bg-white text-purple-950 hover:bg-purple-100 font-extrabold text-xs shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
        >
          {lang === 'hi' ? 'शामिल हों' : 'Join Now'}
        </button>
      </div>

      {/* MIDDLE: Two large buttons side by side - "Create" purple solid and "Toolbox" dark with border */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* 1. "Create" purple solid button */}
        <button
          onClick={onOpenCreateModal}
          className="w-full min-h-[58px] sm:min-h-[64px] rounded-2xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-extrabold text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-xl shadow-purple-900/50 hover:shadow-purple-700/60 active:scale-[0.98] transition-all cursor-pointer border border-purple-400/40"
        >
          <Sparkles className="w-5 h-5 text-purple-200" />
          <span>{lang === 'hi' ? 'Create' : 'Create'}</span>
        </button>

        {/* 2. "Toolbox" dark with border */}
        <button
          onClick={() => onSelectTab('toolbox')}
          className="w-full min-h-[58px] sm:min-h-[64px] rounded-2xl bg-[#141026] hover:bg-[#1f173b] text-slate-100 font-extrabold text-base sm:text-lg flex items-center justify-center gap-2.5 border-2 border-purple-500/40 hover:border-purple-400 shadow-lg shadow-black/40 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Wrench className="w-5 h-5 text-purple-400" />
          <span>{lang === 'hi' ? 'Toolbox' : 'Toolbox'}</span>
          <span className="text-[11px] font-semibold bg-purple-900/80 text-purple-200 px-2 py-0.5 rounded-full border border-purple-500/30 hidden sm:inline">
            17
          </span>
        </button>
      </div>

      {/* SECTION: "Recommended for You" with "See all >" on right */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {lang === 'hi' ? 'Recommended for You' : 'Recommended for You'}
            </h2>
          </div>

          <button
            onClick={() => onSelectTab('explore')}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>{lang === 'hi' ? 'See all' : 'See all'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* GRID 2x2: 4 cards - Knight Cat (Fantasy • 8s), Night Drive (Cinematic • 10s), Talking Snake (Character • 6s), Lion (Wildlife • 9s) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {recommendedCards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedPreviewCard(card)}
              className="group relative rounded-2xl bg-[#120d26] border border-purple-900/50 hover:border-purple-500/60 overflow-hidden shadow-md hover:shadow-xl hover:shadow-purple-950/60 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative w-full aspect-[16/10] bg-[#080414] overflow-hidden">
                <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                  {card.thumbnailSvg}
                </div>

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#120d26] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity" />

                {/* Duration Badge in Top Right */}
                <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white shadow-sm">
                  <Clock className="w-3 h-3 text-purple-400" />
                  <span>{card.duration}</span>
                </div>

                {/* Play Button Overlay on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg shadow-purple-950 backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-white" />
                  </div>
                </div>
              </div>

              {/* Card Meta details */}
              <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-1 bg-[#120d26]">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-400 mb-1">
                    <span>{card.category}</span>
                    <span>•</span>
                    <span className="text-slate-400">{card.duration}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors line-clamp-1">
                    {card.title}
                  </h3>
                </div>

                <div className="mt-2.5 pt-2 border-t border-purple-900/30 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span className="truncate">{card.model}</span>
                  <span className="flex items-center gap-1 text-purple-400/80 font-semibold flex-shrink-0">
                    <Flame className="w-3 h-3 text-amber-400" />
                    {card.views}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Launchers to previous features */}
      <div className="rounded-2xl bg-[#110b24] border border-purple-900/40 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>{lang === 'hi' ? 'YouTube Shorts और Reels मेकर' : 'YouTube Shorts & Viral Reels Studio'}</span>
          </h3>
          <p className="text-xs text-purple-300/80 mt-1">
            {lang === 'hi'
              ? '5 मोड्स, टाइमस्टैम्प्स, स्क्रिप्ट और टेलीप्रॉम्प्टर के साथ'
              : 'Hook-driven generation with teleprompter, captions, tags, and Hindi/English support'}
          </p>
        </div>

        <button
          onClick={() => onSelectTab('shorts')}
          className="px-4 py-2.5 rounded-xl bg-purple-900/70 hover:bg-purple-800 text-purple-200 border border-purple-500/30 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 whitespace-nowrap cursor-pointer"
        >
          <span>{lang === 'hi' ? 'स्टूडियो खोलें' : 'Open Shorts Studio'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
