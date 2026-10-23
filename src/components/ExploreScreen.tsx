import React, { useState } from 'react';
import { Compass, Sparkles, Flame, Clock, Play, Search, Filter } from 'lucide-react';
import { AppLanguage, ToolCategoryId } from '../types';
import {
  KnightCatThumbnail,
  NightDriveThumbnail,
  TalkingSnakeThumbnail,
  LionThumbnail,
} from './Thumbnails';
import { VideoPreviewModal, RecommendedCard } from './VideoPreviewModal';

interface ExploreScreenProps {
  lang: AppLanguage;
  onSelectTool: (toolId: ToolCategoryId) => void;
  onShowToast: (msg: string) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  lang,
  onSelectTool,
  onShowToast,
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [previewCard, setPreviewCard] = useState<RecommendedCard | null>(null);

  const exploreCards: RecommendedCard[] = [
    {
      id: 'knight-cat',
      title: 'Knight Cat',
      category: 'Fantasy',
      duration: '8s',
      thumbnailSvg: <KnightCatThumbnail />,
      prompt: 'Heroic cat knight in silver armor with glowing purple broadsword in misty forest',
      aspectRatio: '16:9',
      model: 'Cinema V3',
      views: '142.8k',
    },
    {
      id: 'night-drive',
      title: 'Night Drive',
      category: 'Cinematic',
      duration: '10s',
      thumbnailSvg: <NightDriveThumbnail />,
      prompt: 'Cyberpunk hypercar accelerating on wet neon highway in rain with glowing violet rear trail',
      aspectRatio: '16:9',
      model: 'UltraMotion',
      views: '289.4k',
    },
    {
      id: 'talking-snake',
      title: 'Talking Snake',
      category: 'Character',
      duration: '6s',
      thumbnailSvg: <TalkingSnakeThumbnail />,
      prompt: 'Iridescent emerald serpent talking with expressive synchronized mouth & glowing eyes',
      aspectRatio: '16:9',
      model: 'VoiceSync 2',
      views: '98.2k',
    },
    {
      id: 'lion',
      title: 'Lion',
      category: 'Wildlife',
      duration: '9s',
      thumbnailSvg: <LionThumbnail />,
      prompt: 'Golden regal lion roaring on savanna cliff outcrop during dramatic crimson violet sunset',
      aspectRatio: '16:9',
      model: 'Wildlife 4K',
      views: '320.1k',
    },
  ];

  const filteredCards = exploreCards.filter((c) => {
    const matchesFilter = activeFilter === 'all' || c.category.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = c.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.prompt.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = [
    { id: 'all', label: lang === 'hi' ? 'सभी' : 'All' },
    { id: 'cinematic', label: lang === 'hi' ? 'सिनेमैटिक' : 'Cinematic' },
    { id: 'fantasy', label: lang === 'hi' ? 'फैंटेसी' : 'Fantasy' },
    { id: 'character', label: lang === 'hi' ? 'कैरेक्टर' : 'Character' },
    { id: 'wildlife', label: lang === 'hi' ? 'वाइल्डलाइफ' : 'Wildlife' },
  ];

  return (
    <div className="w-full pb-24 md:pb-12 space-y-6 max-w-4xl mx-auto">
      {previewCard && (
        <VideoPreviewModal
          card={previewCard}
          onClose={() => setPreviewCard(null)}
          lang={lang}
          onRemix={(prompt) => {
            setPreviewCard(null);
            onSelectTool('text_to_video');
            onShowToast(lang === 'hi' ? 'प्रॉम्प्ट लोड हो गया!' : 'Prompt loaded for generation!');
          }}
          onShowToast={onShowToast}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Compass className="w-6 h-6 text-purple-400" />
            <span>{lang === 'hi' ? 'एक्सप्लोर और ट्रेंडिंग क्रिएशन्स' : 'Explore Community Creations'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-300/80">
            {lang === 'hi' ? 'ट्रेंडिंग AI वीडियो, प्रॉम्प्ट्स और रीमिक्स आइडियाज' : 'Discover trending AI video prompts and remix them in 1-click'}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={lang === 'hi' ? 'प्रॉम्प्ट्स या टाइटल खोजें...' : 'Search prompts or titles...'}
            className="w-full bg-[#120a26] border border-purple-500/30 text-xs text-white rounded-xl pl-9 pr-3 py-2 outline-none focus:border-purple-400"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === cat.id
                ? 'bg-[#7c3aed] text-white shadow-md shadow-purple-900/50'
                : 'bg-[#150d30] border border-purple-900/40 text-purple-300 hover:bg-[#1f1345]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            onClick={() => setPreviewCard(card)}
            className="group rounded-2xl bg-[#120d26] border border-purple-900/50 hover:border-purple-500/60 overflow-hidden shadow-md cursor-pointer flex flex-col"
          >
            <div className="relative aspect-video bg-black overflow-hidden">
              <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                {card.thumbnailSvg}
              </div>
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 text-[10px] font-bold text-white">
                {card.duration}
              </div>
            </div>
            <div className="p-3 bg-[#120d26]">
              <span className="text-[10px] font-semibold text-purple-400">{card.category}</span>
              <h3 className="text-sm font-bold text-white group-hover:text-purple-300 line-clamp-1">
                {card.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
