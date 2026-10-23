import React, { useState, useEffect } from 'react';
import {
  Video,
  Sparkles,
  FileText,
  Tag,
  Hash,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  Eye,
  RefreshCw,
  Clock,
  Mic,
  Clapperboard,
  Music,
  Share2,
  Key,
  Info,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';
import {
  ShortsScript,
  NicheId,
  ToneId,
  DurationId,
  ScriptLanguage,
  AppLanguage,
} from '../types';
import {
  translations,
  nicheLabels,
  toneLabels,
  durationLabels,
  scriptLangLabels,
} from '../data/translations';
import {
  generateShortsScript,
  generateTitlesOnly,
  generateDescriptionOnly,
  generateHashtagsOnly,
  generateKeywordsOnly,
  generateScriptScenesOnly,
  cleanTopic,
} from '../services/shortsGenerator';
import { safeCopyToClipboard } from '../utils/storage';

interface ShortsGeneratorScreenProps {
  lang: AppLanguage;
  initialTopic?: string;
  onSaveScript: (script: ShortsScript) => void;
  isScriptSaved: (id: string) => boolean;
  onOpenTeleprompter: (script: ShortsScript) => void;
  onShowToast: (message: string) => void;
}

export const ShortsGeneratorScreen: React.FC<ShortsGeneratorScreenProps> = ({
  lang,
  initialTopic = '',
  onSaveScript,
  isScriptSaved,
  onOpenTeleprompter,
  onShowToast,
}) => {
  const t = translations[lang];

  // Generator inputs
  const [topic, setTopic] = useState<string>(
    initialTopic || (lang === 'hi' ? 'स्मार्टफोन के 5 छुपे फीचर्स' : '5 Hidden Smartphone Features')
  );
  const [niche, setNiche] = useState<NicheId>('tech');
  const [tone, setTone] = useState<ToneId>('viral');
  const [duration, setDuration] = useState<DurationId>('30s');
  const [scriptLang, setScriptLang] = useState<ScriptLanguage>(
    lang === 'hi' ? 'hi' : 'en'
  );

  // Active Output Result (nullable so stale results can be reset)
  const [currentScript, setCurrentScript] = useState<ShortsScript | null>(() =>
    generateShortsScript({
      topic: initialTopic || (lang === 'hi' ? 'स्मार्टफोन के 5 छुपे फीचर्स' : '5 Hidden Smartphone Features'),
      niche: 'tech',
      tone: 'viral',
      duration: '30s',
      scriptLang: lang === 'hi' ? 'hi' : 'en',
    })
  );

  // Sync when initialTopic changes from parent (e.g. from Home screen or Saved scripts)
  useEffect(() => {
    if (initialTopic && initialTopic.trim()) {
      setTopic(initialTopic);
      // Immediately generate fresh results for the newly selected topic
      const fresh = generateShortsScript({
        topic: initialTopic,
        niche,
        tone,
        duration,
        scriptLang,
      });
      setCurrentScript(fresh);
    }
  }, [initialTopic]);

  // Loading state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingLabel, setGeneratingLabel] = useState<string>('');

  // Active view tab for output
  const [outputTab, setOutputTab] = useState<'all' | 'script' | 'titles' | 'desc' | 'tags' | 'keywords'>('all');

  // Copy feedback state tracking
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (text: string, key: string, label: string) => {
    const success = await safeCopyToClipboard(text);
    if (success) {
      setCopiedKey(key);
      onShowToast(`${label} ${t.copiedText}`);
      setTimeout(() => {
        setCopiedKey(null);
      }, 2000);
    } else {
      onShowToast(t.toastCopied);
    }
  };

  // Check if existing result is for a different topic (stale)
  const isStale = Boolean(
    currentScript &&
    topic.trim() &&
    currentScript.topic.trim().toLowerCase() !== topic.trim().toLowerCase()
  );

  // Reset stale results
  const handleResetResults = () => {
    setCurrentScript(null);
    onShowToast(lang === 'hi' ? 'परिणाम रीसेट कर दिए गए।' : 'Results reset.');
  };

  // 1. Generate Complete Shorts Pack
  const handleGenerateAll = () => {
    const activeTopic = cleanTopic(topic);
    setIsGenerating(true);
    setGeneratingLabel(t.generateAllBtn);

    setTimeout(() => {
      const result = generateShortsScript({
        topic: activeTopic,
        niche,
        tone,
        duration,
        scriptLang,
      });
      setCurrentScript(result);
      setIsGenerating(false);
      onShowToast(t.toastGenerated);
    }, 450);
  };

  // 2. Generate Script Only (syncs all other sections to current topic)
  const handleGenerateScriptOnly = () => {
    const activeTopic = cleanTopic(topic);
    setIsGenerating(true);
    setGeneratingLabel(t.generateScriptBtn);

    setTimeout(() => {
      const scenes = generateScriptScenesOnly(activeTopic, niche, tone, duration, scriptLang);
      const titles = currentScript && currentScript.topic === activeTopic
        ? currentScript.titles
        : generateTitlesOnly(activeTopic, niche, tone, scriptLang);
      const description = currentScript && currentScript.topic === activeTopic
        ? currentScript.description
        : generateDescriptionOnly(activeTopic, niche, scriptLang);
      const hashtags = currentScript && currentScript.topic === activeTopic
        ? currentScript.hashtags
        : generateHashtagsOnly(activeTopic, niche);
      const keywords = currentScript && currentScript.topic === activeTopic
        ? currentScript.keywords
        : generateKeywordsOnly(activeTopic, niche, scriptLang);

      setCurrentScript({
        id: 'script_' + Date.now(),
        topic: activeTopic,
        niche,
        tone,
        duration,
        scriptLang,
        titles,
        description,
        hashtags,
        keywords,
        scenes,
        isDemo: true,
        createdAt: Date.now(),
      });
      setOutputTab('script');
      setIsGenerating(false);
      onShowToast(lang === 'hi' ? 'स्क्रिप्ट तैयार हो गई!' : 'Script generated!');
    }, 400);
  };

  // 3. Generate Titles Only
  const handleGenerateTitlesOnly = () => {
    const activeTopic = cleanTopic(topic);
    setIsGenerating(true);
    setGeneratingLabel(t.generateTitlesBtn);

    setTimeout(() => {
      const titles = generateTitlesOnly(activeTopic, niche, tone, scriptLang);
      const scenes = currentScript && currentScript.topic === activeTopic
        ? currentScript.scenes
        : generateScriptScenesOnly(activeTopic, niche, tone, duration, scriptLang);
      const description = currentScript && currentScript.topic === activeTopic
        ? currentScript.description
        : generateDescriptionOnly(activeTopic, niche, scriptLang);
      const hashtags = currentScript && currentScript.topic === activeTopic
        ? currentScript.hashtags
        : generateHashtagsOnly(activeTopic, niche);
      const keywords = currentScript && currentScript.topic === activeTopic
        ? currentScript.keywords
        : generateKeywordsOnly(activeTopic, niche, scriptLang);

      setCurrentScript({
        id: 'script_' + Date.now(),
        topic: activeTopic,
        niche,
        tone,
        duration,
        scriptLang,
        titles,
        description,
        hashtags,
        keywords,
        scenes,
        isDemo: true,
        createdAt: Date.now(),
      });
      setOutputTab('titles');
      setIsGenerating(false);
      onShowToast(lang === 'hi' ? 'टाइटल्स तैयार हो गए!' : 'Viral titles generated!');
    }, 400);
  };

  // 4. Generate Description Only
  const handleGenerateDescOnly = () => {
    const activeTopic = cleanTopic(topic);
    setIsGenerating(true);
    setGeneratingLabel(t.generateDescBtn);

    setTimeout(() => {
      const description = generateDescriptionOnly(activeTopic, niche, scriptLang);
      const scenes = currentScript && currentScript.topic === activeTopic
        ? currentScript.scenes
        : generateScriptScenesOnly(activeTopic, niche, tone, duration, scriptLang);
      const titles = currentScript && currentScript.topic === activeTopic
        ? currentScript.titles
        : generateTitlesOnly(activeTopic, niche, tone, scriptLang);
      const hashtags = currentScript && currentScript.topic === activeTopic
        ? currentScript.hashtags
        : generateHashtagsOnly(activeTopic, niche);
      const keywords = currentScript && currentScript.topic === activeTopic
        ? currentScript.keywords
        : generateKeywordsOnly(activeTopic, niche, scriptLang);

      setCurrentScript({
        id: 'script_' + Date.now(),
        topic: activeTopic,
        niche,
        tone,
        duration,
        scriptLang,
        titles,
        description,
        hashtags,
        keywords,
        scenes,
        isDemo: true,
        createdAt: Date.now(),
      });
      setOutputTab('desc');
      setIsGenerating(false);
      onShowToast(lang === 'hi' ? 'डिस्क्रिप्शन तैयार हो गया!' : 'Description generated!');
    }, 400);
  };

  // 5. Generate Hashtags Only
  const handleGenerateTagsOnly = () => {
    const activeTopic = cleanTopic(topic);
    setIsGenerating(true);
    setGeneratingLabel(t.generateTagsBtn);

    setTimeout(() => {
      const hashtags = generateHashtagsOnly(activeTopic, niche);
      const scenes = currentScript && currentScript.topic === activeTopic
        ? currentScript.scenes
        : generateScriptScenesOnly(activeTopic, niche, tone, duration, scriptLang);
      const titles = currentScript && currentScript.topic === activeTopic
        ? currentScript.titles
        : generateTitlesOnly(activeTopic, niche, tone, scriptLang);
      const description = currentScript && currentScript.topic === activeTopic
        ? currentScript.description
        : generateDescriptionOnly(activeTopic, niche, scriptLang);
      const keywords = currentScript && currentScript.topic === activeTopic
        ? currentScript.keywords
        : generateKeywordsOnly(activeTopic, niche, scriptLang);

      setCurrentScript({
        id: 'script_' + Date.now(),
        topic: activeTopic,
        niche,
        tone,
        duration,
        scriptLang,
        titles,
        description,
        hashtags,
        keywords,
        scenes,
        isDemo: true,
        createdAt: Date.now(),
      });
      setOutputTab('tags');
      setIsGenerating(false);
      onShowToast(lang === 'hi' ? 'हैशटैग्स तैयार हो गए!' : 'Hashtags generated!');
    }, 350);
  };

  // 6. Generate Keywords Only
  const handleGenerateKeywordsOnly = () => {
    const activeTopic = cleanTopic(topic);
    setIsGenerating(true);
    setGeneratingLabel(t.tabKeywords);

    setTimeout(() => {
      const keywords = generateKeywordsOnly(activeTopic, niche, scriptLang);
      const scenes = currentScript && currentScript.topic === activeTopic
        ? currentScript.scenes
        : generateScriptScenesOnly(activeTopic, niche, tone, duration, scriptLang);
      const titles = currentScript && currentScript.topic === activeTopic
        ? currentScript.titles
        : generateTitlesOnly(activeTopic, niche, tone, scriptLang);
      const description = currentScript && currentScript.topic === activeTopic
        ? currentScript.description
        : generateDescriptionOnly(activeTopic, niche, scriptLang);
      const hashtags = currentScript && currentScript.topic === activeTopic
        ? currentScript.hashtags
        : generateHashtagsOnly(activeTopic, niche);

      setCurrentScript({
        id: 'script_' + Date.now(),
        topic: activeTopic,
        niche,
        tone,
        duration,
        scriptLang,
        titles,
        description,
        hashtags,
        keywords,
        scenes,
        isDemo: true,
        createdAt: Date.now(),
      });
      setOutputTab('keywords');
      setIsGenerating(false);
      onShowToast(lang === 'hi' ? 'कीवर्ड्स तैयार हो गए!' : 'Keywords generated!');
    }, 350);
  };

  // Format full bundle for 1-click YouTube paste
  const getFullBundleText = () => {
    if (!currentScript) return '';
    const titleText = currentScript.titles.join('\n• ');
    const tagsText = currentScript.hashtags.join(' ');
    const keywordsText = currentScript.keywords.join(', ');
    const scriptText = currentScript.scenes
      .map(
        (s) =>
          `[${s.timestamp}] ${s.sectionName}\nVisual: ${s.visual}\nVoiceover: "${s.voiceover}"\nOverlay/SFX: ${s.onScreenText} ${s.soundEffect ? `(${s.soundEffect})` : ''}`
      )
      .join('\n\n');

    return `=== ZYNQORA AI - YOUTUBE SHORTS CONTENT PACK (DEMO) ===\nTOPIC: ${currentScript.topic} (${currentScript.duration} · ${currentScript.niche} · ${currentScript.tone})\nLANGUAGE: ${currentScript.scriptLang}\n\n--- VIRAL TITLES ---\n• ${titleText}\n\n--- COMPLETE VIDEO SCRIPT ---\n${scriptText}\n\n--- SEO DESCRIPTION ---\n${currentScript.description}\n\n--- HASHTAGS ---\n${tagsText}\n\n--- SEO & SEARCH KEYWORDS ---\n${keywordsText}\n`;
  };

  const isSaved = currentScript ? isScriptSaved(currentScript.id) : false;

  return (
    <div className="w-full pb-20 md:pb-12 space-y-8">
      {/* Studio Header */}
      <div className="relative overflow-hidden rounded-2xl border border-purple-800/40 bg-gradient-to-r from-[#170c36] via-[#12092a] to-[#0c061d] p-6 sm:p-8 purple-glow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-300">
              <Clapperboard className="w-3.5 h-3.5 text-pink-400" />
              <span>{t.generatorTitle}</span>
              <span className="text-purple-500">·</span>
              <span className="px-2 py-0.5 rounded bg-purple-900/80 text-purple-200 border border-purple-700/50 text-[10px] uppercase font-bold tracking-wider">
                {t.demoBadge}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lang === 'hi' ? 'वायरल यूट्यूब शॉर्ट्स स्क्रिप्ट मेकर' : 'YouTube Shorts Script Generator'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.generatorSub}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {currentScript && (
              <button
                onClick={() => onOpenTeleprompter(currentScript)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800/70 border border-purple-500/40 text-purple-200 text-xs font-semibold transition-all purple-glow-sm min-h-[44px]"
              >
                <Eye className="w-4 h-4 text-purple-300" />
                <span>{t.teleprompterBtn}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Input Configuration Panel */}
      <div className="rounded-2xl border border-purple-800/40 bg-[#120a26] p-5 sm:p-6 space-y-5">
        {/* Topic Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-white">
              {t.topicLabel}
            </label>
            {currentScript && (
              <span className="text-xs text-purple-400/90 font-mono">
                Current Active: <span className="text-white font-semibold underline decoration-purple-500">"{currentScript.topic}"</span>
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t.topicPlaceholder}
              className="w-full px-4 py-3 rounded-xl bg-[#0b0617] border border-purple-800/60 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 text-white placeholder-slate-500 text-sm transition-all pr-24"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {topic && (
                <button
                  type="button"
                  onClick={() => setTopic('')}
                  className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded bg-purple-950/60 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Configuration Selectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {/* Niche */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              {t.selectNiche}
            </label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value as NicheId)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0c071d] border border-purple-800/50 text-white text-xs font-medium focus:outline-none focus:border-purple-400 cursor-pointer min-h-[42px]"
            >
              {(Object.keys(nicheLabels) as NicheId[]).map((n) => (
                <option key={n} value={n} className="bg-[#120a26] text-white">
                  {nicheLabels[n][lang]}
                </option>
              ))}
            </select>
          </div>

          {/* Tone */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              {t.selectTone}
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as ToneId)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0c071d] border border-purple-800/50 text-white text-xs font-medium focus:outline-none focus:border-purple-400 cursor-pointer min-h-[42px]"
            >
              {(Object.keys(toneLabels) as ToneId[]).map((item) => (
                <option key={item} value={item} className="bg-[#120a26] text-white">
                  {toneLabels[item][lang]}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              {t.selectDuration}
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value as DurationId)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0c071d] border border-purple-800/50 text-white text-xs font-medium focus:outline-none focus:border-purple-400 cursor-pointer min-h-[42px]"
            >
              {(Object.keys(durationLabels) as DurationId[]).map((d) => (
                <option key={d} value={d} className="bg-[#120a26] text-white">
                  {durationLabels[d][lang]}
                </option>
              ))}
            </select>
          </div>

          {/* Script Language */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              {t.selectScriptLang}
            </label>
            <select
              value={scriptLang}
              onChange={(e) => setScriptLang(e.target.value as ScriptLanguage)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0c071d] border border-purple-800/50 text-white text-xs font-medium focus:outline-none focus:border-purple-400 cursor-pointer min-h-[42px]"
            >
              {(Object.keys(scriptLangLabels) as ScriptLanguage[]).map((sl) => (
                <option key={sl} value={sl} className="bg-[#120a26] text-white">
                  {scriptLangLabels[sl].label} ({scriptLangLabels[sl].sub})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stale Warning Banner if Topic was modified */}
        {isStale && (
          <div className="p-3.5 rounded-xl bg-purple-950/70 border border-amber-500/40 text-amber-200 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t.staleNotice}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetResults}
                className="px-2.5 py-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-xs font-medium transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Old Results</span>
              </button>
              <button
                type="button"
                onClick={handleGenerateAll}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs transition-colors shrink-0 whitespace-nowrap shadow-sm"
              >
                Update Now ⚡
              </button>
            </div>
          </div>
        )}

        {/* 6 Specialized Action Buttons */}
        <div className="pt-2 border-t border-purple-900/40 space-y-3">
          {/* Primary Main Generator Button */}
          <button
            onClick={handleGenerateAll}
            disabled={isGenerating || !topic.trim()}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 purple-glow-md shadow-purple-950/50 active:scale-[0.99] transition-all disabled:opacity-50 min-h-[48px]"
          >
            {isGenerating && generatingLabel === t.generateAllBtn ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5 text-yellow-300" />
            )}
            <span>{t.generateAllBtn}</span>
          </button>

          {/* 5 Specialized Sub-Generation Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <button
              onClick={handleGenerateScriptOnly}
              disabled={isGenerating || !topic.trim()}
              className="px-3 py-2.5 rounded-xl bg-[#170e33] hover:bg-[#201445] border border-purple-800/50 text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 min-h-[44px] disabled:opacity-50"
            >
              <FileText className="w-4 h-4 text-purple-400" />
              <span>{t.generateScriptBtn}</span>
            </button>

            <button
              onClick={handleGenerateTitlesOnly}
              disabled={isGenerating || !topic.trim()}
              className="px-3 py-2.5 rounded-xl bg-[#170e33] hover:bg-[#201445] border border-purple-800/50 text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 min-h-[44px] disabled:opacity-50"
            >
              <Tag className="w-4 h-4 text-purple-400" />
              <span>{t.generateTitlesBtn}</span>
            </button>

            <button
              onClick={handleGenerateDescOnly}
              disabled={isGenerating || !topic.trim()}
              className="px-3 py-2.5 rounded-xl bg-[#170e33] hover:bg-[#201445] border border-purple-800/50 text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 min-h-[44px] disabled:opacity-50"
            >
              <Clapperboard className="w-4 h-4 text-purple-400" />
              <span>{t.generateDescBtn}</span>
            </button>

            <button
              onClick={handleGenerateTagsOnly}
              disabled={isGenerating || !topic.trim()}
              className="px-3 py-2.5 rounded-xl bg-[#170e33] hover:bg-[#201445] border border-purple-800/50 text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 min-h-[44px] disabled:opacity-50"
            >
              <Hash className="w-4 h-4 text-purple-400" />
              <span>{t.generateTagsBtn}</span>
            </button>

            <button
              onClick={handleGenerateKeywordsOnly}
              disabled={isGenerating || !topic.trim()}
              className="px-3 py-2.5 rounded-xl bg-[#170e33] hover:bg-[#201445] border border-purple-800/50 text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 min-h-[44px] disabled:opacity-50 col-span-2 sm:col-span-1"
            >
              <Key className="w-4 h-4 text-purple-400" />
              <span>{t.tabKeywords}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated Content Studio Output */}
      {currentScript ? (
        <div className="rounded-2xl border border-purple-800/40 bg-[#120a26] overflow-hidden space-y-0 shadow-lg shadow-purple-950/40">
          {/* Output Header Bar */}
          <div className="border-b border-purple-900/40 bg-[#160d2e] px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            {/* Segmented Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#0b0618] rounded-xl border border-purple-900/40 overflow-x-auto max-w-full">
              <button
                onClick={() => setOutputTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  outputTab === 'all'
                    ? 'bg-purple-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.tabAll}
              </button>
              <button
                onClick={() => setOutputTab('script')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  outputTab === 'script'
                    ? 'bg-purple-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.tabScript}
              </button>
              <button
                onClick={() => setOutputTab('titles')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  outputTab === 'titles'
                    ? 'bg-purple-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.tabTitles}
              </button>
              <button
                onClick={() => setOutputTab('desc')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  outputTab === 'desc'
                    ? 'bg-purple-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.tabDescription}
              </button>
              <button
                onClick={() => setOutputTab('tags')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  outputTab === 'tags'
                    ? 'bg-purple-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.tabHashtags}
              </button>
              <button
                onClick={() => setOutputTab('keywords')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  outputTab === 'keywords'
                    ? 'bg-purple-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.tabKeywords}
              </button>
            </div>

            {/* Quick Action Buttons for the active output */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(getFullBundleText(), 'bundle', t.copyAllBtn)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 border border-purple-500/40 text-purple-200 text-xs font-semibold transition-all min-h-[38px]"
              >
                {copiedKey === 'bundle' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-purple-300" />
                )}
                <span>{t.copyAllBtn}</span>
              </button>

              <button
                onClick={() => {
                  onSaveScript(currentScript);
                  onShowToast(t.toastSaved);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all min-h-[38px] ${
                  isSaved
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                    : 'bg-purple-950/50 border-purple-800/60 text-purple-300 hover:bg-purple-900/50'
                }`}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                    <span>{t.savedScriptBtn}</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-purple-400" />
                    <span>{t.saveScriptBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Active Generation Metadata & Demo Disclosure Banner */}
          <div className="px-5 sm:px-7 py-3 bg-[#0d071d] border-b border-purple-900/30 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap text-slate-300">
              <span className="font-semibold text-purple-300">Active Topic:</span>
              <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800/50 font-bold text-white">
                "{currentScript.topic}"
              </span>
              <span className="text-purple-600">·</span>
              <span className="text-slate-400 capitalize">{nicheLabels[currentScript.niche][lang]}</span>
              <span className="text-purple-600">·</span>
              <span className="text-slate-400">{toneLabels[currentScript.tone][lang]}</span>
              <span className="text-purple-600">·</span>
              <span className="text-purple-400 font-mono font-bold">{currentScript.duration}</span>
              <span className="text-purple-600">·</span>
              <span className="text-slate-400 uppercase font-mono">{currentScript.scriptLang}</span>
            </div>

            <div className="flex items-center gap-1.5 text-purple-400 text-[11px] font-medium bg-purple-950/60 px-2.5 py-1 rounded-md border border-purple-900/60">
              <Info className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>{t.demoBadge} (No API Key Required)</span>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-5 sm:p-7 space-y-8">
            {/* 1. VIRAL TITLES SECTION */}
            {(outputTab === 'all' || outputTab === 'titles') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-purple-400" />
                    <h3 className="text-base font-bold text-white">
                      {t.tabTitles}
                    </h3>
                    <span className="text-xs text-slate-400">({currentScript.titles.length})</span>
                    <span className="text-[10px] font-mono text-purple-400 px-1.5 py-0.5 rounded bg-purple-950">
                      Topic: {currentScript.topic}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      handleCopy(currentScript.titles.join('\n'), 'all_titles', t.copyTitlesBtn)
                    }
                    className="flex items-center gap-1 text-xs text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    {copiedKey === 'all_titles' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{t.copyTitlesBtn}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {currentScript.titles.map((titleText, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#0e0720] border border-purple-900/40 hover:border-purple-600/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-purple-950/80 text-purple-300 text-xs font-bold flex items-center justify-center shrink-0">
                          #{idx + 1}
                        </span>
                        <p className="text-sm text-slate-100 font-medium">{titleText}</p>
                      </div>
                      <button
                        onClick={() => handleCopy(titleText, `title_${idx}`, 'Title')}
                        title="Copy title"
                        className="p-2 rounded-lg bg-purple-950/60 hover:bg-purple-900 text-purple-300 hover:text-white transition-all shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center"
                      >
                        {copiedKey === `title_${idx}` ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. SCRIPT & TIMESTAMPS SECTION */}
            {(outputTab === 'all' || outputTab === 'script') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <h3 className="text-base font-bold text-white">
                      {t.tabScript}
                    </h3>
                    <span className="text-xs text-purple-400 font-mono">
                      [{currentScript.duration}]
                    </span>
                    <span className="text-[10px] font-mono text-purple-400 px-1.5 py-0.5 rounded bg-purple-950">
                      Topic: {currentScript.topic}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onOpenTeleprompter(currentScript)}
                      className="text-xs text-purple-300 hover:text-purple-100 underline decoration-purple-500 underline-offset-4 flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.teleprompterBtn}</span>
                    </button>
                    <button
                      onClick={() => {
                        const text = currentScript.scenes
                          .map(
                            (s) =>
                              `[${s.timestamp}] ${s.sectionName}\nVisual: ${s.visual}\nVoiceover: "${s.voiceover}"\nOverlay/SFX: ${s.onScreenText} ${s.soundEffect ? `(${s.soundEffect})` : ''}`
                          )
                          .join('\n\n');
                        handleCopy(text, 'full_script', t.copyScriptBtn);
                      }}
                      className="flex items-center gap-1 text-xs text-purple-300 hover:text-purple-200 transition-colors"
                    >
                      {copiedKey === 'full_script' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{t.copyScriptBtn}</span>
                    </button>
                  </div>
                </div>

                {/* Scenes Stack */}
                <div className="space-y-3.5">
                  {currentScript.scenes.map((scene, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-purple-900/40 bg-[#0e0720] p-4 sm:p-5 space-y-3"
                    >
                      {/* Scene Header */}
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-purple-950">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-semibold border border-purple-800/40">
                            {scene.timestamp}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {scene.sectionName}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            handleCopy(
                              `[${scene.timestamp}] Voiceover: "${scene.voiceover}"`,
                              `scene_${index}`,
                              'Scene'
                            )
                          }
                          className="text-slate-400 hover:text-purple-300 text-xs p-1"
                          title="Copy scene"
                        >
                          {copiedKey === `scene_${index}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Scene Visual & Voiceover Details */}
                      <div className="space-y-2.5 text-xs sm:text-sm">
                        {/* Visual Cue */}
                        <div className="flex items-start gap-2.5 text-slate-300">
                          <Clapperboard className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                          <div>
                            <span className="font-semibold text-purple-300/90 mr-1.5">
                              {t.visualCue}:
                            </span>
                            <span>{scene.visual}</span>
                          </div>
                        </div>

                        {/* Voiceover Script */}
                        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#140b2e] border border-purple-800/30 text-white">
                          <Mic className="w-4 h-4 text-pink-400 mt-0.5 shrink-0" />
                          <div>
                            <span className="font-semibold text-pink-300 mr-1.5">
                              {t.voiceover}:
                            </span>
                            <span className="text-sm font-medium italic">
                              "{scene.voiceover}"
                            </span>
                          </div>
                        </div>

                        {/* On-screen Text & Sound Effects */}
                        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 text-xs text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-indigo-400" />
                            <span>{scene.onScreenText}</span>
                          </div>
                          {scene.soundEffect && (
                            <div className="flex items-center gap-1 text-purple-400 font-mono text-[11px]">
                              <Music className="w-3 h-3" />
                              <span>{scene.soundEffect}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. SEO DESCRIPTION SECTION */}
            {(outputTab === 'all' || outputTab === 'desc') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <h3 className="text-base font-bold text-white">
                      {t.tabDescription}
                    </h3>
                    <span className="text-[10px] font-mono text-purple-400 px-1.5 py-0.5 rounded bg-purple-950">
                      Topic: {currentScript.topic}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      handleCopy(currentScript.description, 'desc', t.copyDescBtn)
                    }
                    className="flex items-center gap-1 text-xs text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    {copiedKey === 'desc' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{t.copyDescBtn}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#0e0720] border border-purple-900/40">
                  <pre className="text-xs sm:text-sm text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                    {currentScript.description}
                  </pre>
                </div>
              </div>
            )}

            {/* 4. VIRAL HASHTAGS SECTION */}
            {(outputTab === 'all' || outputTab === 'tags') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-purple-400" />
                    <h3 className="text-base font-bold text-white">
                      {t.tabHashtags}
                    </h3>
                    <span className="text-xs text-slate-400">({currentScript.hashtags.length})</span>
                  </div>
                  <button
                    onClick={() =>
                      handleCopy(currentScript.hashtags.join(' '), 'all_tags', t.copyTagsBtn)
                    }
                    className="flex items-center gap-1 text-xs text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    {copiedKey === 'all_tags' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{t.copyTagsBtn}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentScript.hashtags.map((tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCopy(tag, `tag_${idx}`, tag)}
                      className="px-3 py-1.5 rounded-lg bg-[#0e0720] hover:bg-purple-900/40 border border-purple-900/40 text-purple-300 hover:text-white text-xs font-mono transition-all flex items-center gap-1"
                    >
                      <span>{tag}</span>
                      {copiedKey === `tag_${idx}` && (
                        <Check className="w-3 h-3 text-emerald-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 5. SEO & SEARCH KEYWORDS SECTION */}
            {(outputTab === 'all' || outputTab === 'keywords') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-purple-400" />
                    <h3 className="text-base font-bold text-white">
                      {t.tabKeywords}
                    </h3>
                    <span className="text-xs text-slate-400">({currentScript.keywords.length})</span>
                    <span className="text-[10px] font-mono text-purple-400 px-1.5 py-0.5 rounded bg-purple-950">
                      Topic: {currentScript.topic}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      handleCopy(currentScript.keywords.join(', '), 'all_keywords', t.copyKeywordsBtn)
                    }
                    className="flex items-center gap-1 text-xs text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    {copiedKey === 'all_keywords' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{t.copyKeywordsBtn}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentScript.keywords.map((kw, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCopy(kw, `kw_${idx}`, kw)}
                      className="px-3 py-1.5 rounded-lg bg-[#0e0720] hover:bg-purple-900/40 border border-purple-800/40 text-slate-200 hover:text-white text-xs font-medium transition-all flex items-center gap-1.5"
                    >
                      <span>{kw}</span>
                      {copiedKey === `kw_${idx}` ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-purple-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Empty / Reset State */
        <div className="rounded-2xl border border-dashed border-purple-800/40 bg-[#120a26]/50 p-8 sm:p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-purple-950 border border-purple-700/50 flex items-center justify-center mx-auto text-purple-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">
              {topic.trim() ? `Ready to Generate: "${topic}"` : 'Enter a Topic'}
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {t.emptyResultsState}
            </p>
          </div>
          <button
            onClick={handleGenerateAll}
            disabled={!topic.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all purple-glow-sm disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>{t.generateAllBtn}</span>
          </button>
        </div>
      )}
    </div>
  );
};
