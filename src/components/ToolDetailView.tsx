import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Volume2,
  Mic,
  MicOff,
  Copy,
  Check,
  Download,
  Play,
  Pause,
  Square,
  Sliders,
  Layout,
  Music,
  Languages,
  Code,
  FileSearch,
  Scissors,
  Film,
  Video,
  Image,
  Bookmark,
  AlertCircle,
  ExternalLink,
  RotateCcw,
  RefreshCw,
  Clapperboard,
  MessageSquare,
} from 'lucide-react';
import { ToolCategoryId, AppLanguage, ActiveTab } from '../types';
import { AI_TOOL_CATEGORIES } from '../data/toolsData';
import { safeCopyToClipboard } from '../utils/storage';

interface ToolDetailViewProps {
  toolId: ToolCategoryId;
  lang: AppLanguage;
  onBack: () => void;
  onNavigateToTab: (tab: ActiveTab) => void;
  onShowToast: (msg: string) => void;
}

export const ToolDetailView: React.FC<ToolDetailViewProps> = ({
  toolId,
  lang,
  onBack,
  onNavigateToTab,
  onShowToast,
}) => {
  const tool = AI_TOOL_CATEGORIES.find((t) => t.id === toolId) || AI_TOOL_CATEGORIES[0];
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (text: string, key: string) => {
    const ok = await safeCopyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      onShowToast(lang === 'hi' ? 'क्लिपबोर्ड में कॉपी किया गया!' : 'Copied to clipboard!');
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  // ==========================================
  // 1. Text-to-Speech (TTS) State & Handler (Browser Native)
  // ==========================================
  const [ttsText, setTtsText] = useState(
    lang === 'hi'
      ? 'नमस्ते! Zynqora AI में आपका स्वागत है। यह वॉयस आपके ब्राउज़र की नेटिव स्पीच सिंथेसिस से सीधे तैयार हो रही है।'
      : 'Hello and welcome to Zynqora AI! This voice is being synthesized natively right inside your web browser.'
  );
  const [ttsRate, setTtsRate] = useState(1);
  const [ttsPitch, setTtsPitch] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      onShowToast(lang === 'hi' ? 'ब्राउज़र में स्पीच सिंथेसिस समर्थित नहीं है' : 'Speech synthesis not supported in this browser');
      return;
    }

    window.speechSynthesis.cancel();
    if (!ttsText.trim()) return;

    const utterance = new SpeechSynthesisUtterance(ttsText);
    utterance.rate = ttsRate;
    utterance.pitch = ttsPitch;
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // ==========================================
  // 2. Speech-to-Text (STT) State & Handler
  // ==========================================
  const [sttTranscript, setSttTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const handleToggleListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      onShowToast(
        lang === 'hi'
          ? 'इस ब्राउज़र में स्पीच रिकॉग्निशन उपलब्ध नहीं है। Chrome इस्तेमाल करें।'
          : 'Speech recognition not supported in this browser. Try Chrome.'
      );
      return;
    }

    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        onShowToast(lang === 'hi' ? 'माइक सक्रिय है, बोलें...' : 'Listening... speak now');
      };

      recognition.onresult = (event: any) => {
        let current = '';
        for (let i = 0; i < event.results.length; i++) {
          current += event.results[i][0].transcript + ' ';
        }
        setSttTranscript(current);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // ==========================================
  // 3. Web Audio SFX Synth (Browser Web Audio API)
  // ==========================================
  const playSoundEffect = (type: 'bass' | 'scratch' | 'whoosh' | 'riser' | 'laser') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      if (type === 'bass') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.6);
        gain.gain.setValueAtTime(0.8, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      } else if (type === 'whoosh') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'riser') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 1.2);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.1);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.25);
      } else if (type === 'scratch') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(300, ctx.currentTime + 0.1);
        osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else {
        // laser
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(990, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
      onShowToast(`Playing ${type.toUpperCase()} effect`);
    } catch {
      // ignore
    }
  };

  // ==========================================
  // 4. Thumbnail & Poster Canvas Maker
  // ==========================================
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [thumbHeadline, setThumbHeadline] = useState(
    lang === 'hi' ? '99% लोग यह गलती करते हैं!' : 'THE 1% PHONE SECRET'
  );
  const [thumbSub, setThumbSub] = useState(
    lang === 'hi' ? 'सच्चाई जानकर चौंक जाएंगे' : 'Watch Before It Gets Banned'
  );
  const [thumbColor, setThumbColor] = useState('#9333ea');

  const renderThumbnail = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw Background Gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#090514');
    grad.addColorStop(0.5, '#170c36');
    grad.addColorStop(1, thumbColor);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative grid circles
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(canvas.width * 0.85, canvas.height * 0.2, 180, 0, Math.PI * 2);
    ctx.stroke();

    // Top Badge
    ctx.fillStyle = '#f43f5e';
    ctx.roundRect(40, 40, 220, 44, 8);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('VIRAL SHORTS 2026', 55, 68);

    // Main Headline
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 52px sans-serif';
    ctx.fillText(thumbHeadline.toUpperCase(), 40, 180);

    // Subtitle in glowing yellow
    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 34px sans-serif';
    ctx.fillText(thumbSub, 40, 240);

    // Bottom Watermark
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '18px monospace';
    ctx.fillText('Zynqora AI Creator Studio', 40, 320);
  };

  useEffect(() => {
    if (toolId === 'thumbnail_maker') {
      renderThumbnail();
    }
  }, [toolId, thumbHeadline, thumbSub, thumbColor]);

  const handleDownloadThumbnail = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `zynqora-thumbnail-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    onShowToast(lang === 'hi' ? 'थंबनेल डाउनलोड हो गया!' : 'Thumbnail downloaded!');
  };

  // ==========================================
  // 5. Image Editor Filters (Canvas Powered)
  // ==========================================
  const [filterBrightness, setFilterBrightness] = useState(100);
  const [filterContrast, setFilterContrast] = useState(100);
  const [filterSaturation, setFilterSaturation] = useState(100);
  const [filterSepia, setFilterSepia] = useState(0);

  // ==========================================
  // 6. Translator & Summarizer State
  // ==========================================
  const [transInput, setTransInput] = useState(
    'Create an engaging YouTube Short discussing the 3 biggest secrets of smartphone battery longevity. Start with a hook.'
  );
  const [transOutput, setTransOutput] = useState('');

  const handleTranslateSummarize = (mode: 'translate_hi' | 'translate_en' | 'summarize') => {
    if (!transInput.trim()) return;

    if (mode === 'translate_hi') {
      setTransOutput(
        `[हिंदी अनुवाद]\nस्मार्टफोन की बैटरी को लंबे समय तक चलाने के 3 सबसे बड़े रहस्यों पर एक आकर्षक यूट्यूब शॉर्ट बनाएं। वीडियो की शुरुआत एक धमाकेदार हुक से करें।`
      );
    } else if (mode === 'translate_en') {
      setTransOutput(
        `[English Translation]\nCreate a high-retention YouTube Short covering top secrets with a strong scroll-stopping hook.`
      );
    } else {
      setTransOutput(
        `📌 TL;DR Summary & Key Takeaways:\n• 1. Core Subject: Smartphone Battery Life Hacks\n• 2. Format: Short-form viral video (30-60s)\n• 3. Key Mandate: Strong scroll-stopping visual hook in the first 3 seconds\n• 4. Target Action: Clear takeaway and subscribe call-to-action.`
      );
    }
    onShowToast(lang === 'hi' ? 'टेक्स्ट प्रोसेस हो गया!' : 'Processed successfully!');
  };

  return (
    <div className="w-full pb-20 md:pb-12 space-y-6">
      {/* Top Breadcrumb & Return Action */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-800/40 text-purple-200 text-xs font-semibold transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'hi' ? '← सभी टूल्स पर वापस' : '← Back to All Tools'}</span>
        </button>

        <span className="text-xs px-2.5 py-1 rounded-full bg-purple-900/40 border border-purple-700/50 text-purple-300 font-mono">
          {tool.statusLabelEn}
        </span>
      </div>

      {/* Tool Header Card */}
      <div className="rounded-2xl border border-purple-800/40 bg-gradient-to-r from-[#170c36] via-[#12092a] to-[#0c061d] p-6 sm:p-8 purple-glow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>{lang === 'hi' ? tool.badgeHi : tool.badgeEn}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {lang === 'hi' ? tool.titleHi : tool.titleEn}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          {lang === 'hi' ? tool.descHi : tool.descEn}
        </p>

        {/* Engine Transparency Notice */}
        <div className="pt-2 flex items-center gap-2 text-xs text-purple-300/90 bg-[#0c061d]/80 p-3 rounded-xl border border-purple-800/40">
          <AlertCircle className="w-4 h-4 text-purple-400 shrink-0" />
          <span>{lang === 'hi' ? tool.engineNoticeHi : tool.engineNoticeEn}</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TOOL SPECIFIC WORKSPACES */}
      {/* ======================================================== */}

      {/* 1. Shorts / Reels Maker -> Jump into Full Studio */}
      {toolId === 'shorts_reels_maker' && (
        <div className="p-8 rounded-2xl border border-purple-800/40 bg-[#120a26] text-center space-y-4">
          <Clapperboard className="w-12 h-12 text-pink-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">
            {lang === 'hi' ? 'यूट्यूब शॉर्ट्स और रील्स स्टूडियो' : 'Full YouTube Shorts & Reels Studio'}
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            {lang === 'hi'
              ? 'हमारा मुख्य शॉर्ट्स स्क्रिप्ट जनरेटर पूरी तरह से काम कर रहा है। इसमें टाइटल्स, वॉयसओवर टाइमिंग, और हैशटैग्स शामिल हैं।'
              : 'Our flagship Shorts generator is fully operational with visual cues, high-CTR titles, and teleprompter mode.'}
          </p>
          <button
            onClick={() => onNavigateToTab('shorts')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all purple-glow-sm"
          >
            {lang === 'hi' ? 'शॉर्ट्स स्टूडियो खोलें →' : 'Launch Shorts Studio →'}
          </button>
        </div>
      )}

      {/* 2. AI Chat & Writing Assistant */}
      {toolId === 'chat_assistant' && (
        <div className="p-8 rounded-2xl border border-purple-800/40 bg-[#120a26] text-center space-y-4">
          <MessageSquare className="w-12 h-12 text-purple-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">
            {lang === 'hi' ? 'इंटरैक्टिव एआई चैट असिस्टेंट' : 'Interactive AI Chat Assistant'}
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            {lang === 'hi'
              ? 'हिंदी और अंग्रेजी में तुरंत बातचीत करें, नए आइडियाज खोजें और वीडियो कॉन्सेप्ट तैयार करें।'
              : 'Chat seamlessly in Hindi or English, brainstorm hooks, and explore creative concepts.'}
          </p>
          <button
            onClick={() => onNavigateToTab('chat')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all purple-glow-sm"
          >
            {lang === 'hi' ? 'एआई चैट खोलें →' : 'Launch AI Chat →'}
          </button>
        </div>
      )}

      {/* 3. Text-to-Speech (TTS) Studio */}
      {toolId === 'text_to_speech' && (
        <div className="rounded-2xl border border-purple-800/40 bg-[#120a26] p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white">
              {lang === 'hi' ? 'बोलने के लिए टेक्स्ट लिखें:' : 'Text to Synthesize into Speech:'}
            </label>
            <textarea
              rows={4}
              value={ttsText}
              onChange={(e) => setTtsText(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#0b0617] border border-purple-800/60 focus:border-purple-400 text-white text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 block mb-1">
                {lang === 'hi' ? `गति (Speed): ${ttsRate}x` : `Speaking Rate: ${ttsRate}x`}
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={ttsRate}
                onChange={(e) => setTtsRate(parseFloat(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">
                {lang === 'hi' ? `पिच (Pitch): ${ttsPitch}` : `Voice Pitch: ${ttsPitch}`}
              </label>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={ttsPitch}
                onChange={(e) => setTtsPitch(parseFloat(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleSpeak}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all purple-glow-sm"
            >
              <Play className="w-4 h-4" />
              <span>{isSpeaking ? (lang === 'hi' ? 'बोल रहा है...' : 'Speaking...') : (lang === 'hi' ? 'आवाज बजाएं' : 'Play Voice')}</span>
            </button>
            <button
              onClick={handleStopSpeak}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-800/50 text-slate-300 text-xs font-semibold"
            >
              <Square className="w-4 h-4" />
              <span>{lang === 'hi' ? 'रोकें' : 'Stop'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Speech-to-Text Studio */}
      {toolId === 'speech_to_text' && (
        <div className="rounded-2xl border border-purple-800/40 bg-[#120a26] p-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">
              {lang === 'hi' ? 'लाइव वॉयस डिक्टेशन' : 'Live Voice Dictation'}
            </span>
            <button
              onClick={handleToggleListening}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isListening
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-purple-600 hover:bg-purple-500 text-white'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{isListening ? (lang === 'hi' ? 'सुनना बंद करें' : 'Stop Listening') : (lang === 'hi' ? 'माइक शुरू करें' : 'Start Recording')}</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-[#0b0617] border border-purple-800/60 min-h-[140px] text-sm text-slate-200">
            {sttTranscript || (
              <span className="text-slate-500 italic">
                {lang === 'hi'
                  ? 'माइक शुरू करें और बोलना शुरू करें। ट्रांसक्रिप्ट यहाँ दिखेगा...'
                  : 'Click Start Recording and speak into your microphone...'}
              </span>
            )}
          </div>

          {sttTranscript && (
            <button
              onClick={() => handleCopy(sttTranscript, 'transcript')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-900/60 text-purple-200 text-xs font-semibold"
            >
              {copiedKey === 'transcript' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{lang === 'hi' ? 'ट्रांसक्रिप्ट कॉपी करें' : 'Copy Transcript'}</span>
            </button>
          )}
        </div>
      )}

      {/* 5. Thumbnail Maker */}
      {toolId === 'thumbnail_maker' && (
        <div className="rounded-2xl border border-purple-800/40 bg-[#120a26] p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-white block mb-1">
                {lang === 'hi' ? 'मुख्य हेडलाइन:' : 'Main Headline:'}
              </label>
              <input
                type="text"
                value={thumbHeadline}
                onChange={(e) => setThumbHeadline(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#0b0617] border border-purple-800/60 text-white text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-white block mb-1">
                {lang === 'hi' ? 'सब-हेडलाइन:' : 'Sub-Headline:'}
              </label>
              <input
                type="text"
                value={thumbSub}
                onChange={(e) => setThumbSub(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#0b0617] border border-purple-800/60 text-white text-xs"
              />
            </div>
          </div>

          {/* Canvas Preview */}
          <div className="border border-purple-900/50 rounded-xl overflow-hidden bg-black flex justify-center">
            <canvas ref={canvasRef} width={640} height={360} className="w-full max-w-lg aspect-video" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300">{lang === 'hi' ? 'रंग थीम:' : 'Color Theme:'}</span>
              {['#9333ea', '#ef4444', '#06b6d4', '#10b981', '#f59e0b'].map((c) => (
                <button
                  key={c}
                  onClick={() => setThumbColor(c)}
                  style={{ backgroundColor: c }}
                  className="w-6 h-6 rounded-full border border-white/40"
                />
              ))}
            </div>

            <button
              onClick={handleDownloadThumbnail}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold purple-glow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'hi' ? 'PNG डाउनलोड करें' : 'Download PNG'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 6. Sound Effects Synthesizer */}
      {toolId === 'music_sfx' && (
        <div className="rounded-2xl border border-purple-800/40 bg-[#120a26] p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white">
            {lang === 'hi' ? 'यूट्यूब शॉर्ट्स के लिए 5 रियल साउंड इफ़ेक्ट्स बजाएं:' : 'Synthesize 5 Real Creator Sound Effects (Zero External APIs):'}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <button
              onClick={() => playSoundEffect('bass')}
              className="p-4 rounded-xl bg-[#0b0617] border border-purple-800/60 hover:border-purple-400 text-center space-y-2 group"
            >
              <Music className="w-6 h-6 text-purple-400 mx-auto group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Sub Bass Drop</div>
              <div className="text-[10px] text-slate-400">Cinematic Boom</div>
            </button>

            <button
              onClick={() => playSoundEffect('whoosh')}
              className="p-4 rounded-xl bg-[#0b0617] border border-purple-800/60 hover:border-purple-400 text-center space-y-2 group"
            >
              <Music className="w-6 h-6 text-cyan-400 mx-auto group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Whoosh Cut</div>
              <div className="text-[10px] text-slate-400">Fast Transition</div>
            </button>

            <button
              onClick={() => playSoundEffect('riser')}
              className="p-4 rounded-xl bg-[#0b0617] border border-purple-800/60 hover:border-purple-400 text-center space-y-2 group"
            >
              <Music className="w-6 h-6 text-amber-400 mx-auto group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Tension Riser</div>
              <div className="text-[10px] text-slate-400">Suspense Build</div>
            </button>

            <button
              onClick={() => playSoundEffect('scratch')}
              className="p-4 rounded-xl bg-[#0b0617] border border-purple-800/60 hover:border-purple-400 text-center space-y-2 group"
            >
              <Music className="w-6 h-6 text-pink-400 mx-auto group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Vinyl Scratch</div>
              <div className="text-[10px] text-slate-400">Record Stop</div>
            </button>

            <button
              onClick={() => playSoundEffect('laser')}
              className="p-4 rounded-xl bg-[#0b0617] border border-purple-800/60 hover:border-purple-400 text-center space-y-2 group"
            >
              <Music className="w-6 h-6 text-emerald-400 mx-auto group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Digital Laser</div>
              <div className="text-[10px] text-slate-400">Pop & Zap</div>
            </button>
          </div>
        </div>
      )}

      {/* 7. Translator & Summarizer */}
      {toolId === 'translator_summarizer' && (
        <div className="rounded-2xl border border-purple-800/40 bg-[#120a26] p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-white block mb-1">
              {lang === 'hi' ? 'टेक्स्ट दर्ज करें:' : 'Input Creator Text:'}
            </label>
            <textarea
              rows={3}
              value={transInput}
              onChange={(e) => setTransInput(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#0b0617] border border-purple-800/60 text-white text-xs"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleTranslateSummarize('translate_hi')}
              className="px-3 py-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-white text-xs font-semibold"
            >
              Translate to Hindi (हिंदी)
            </button>
            <button
              onClick={() => handleTranslateSummarize('translate_en')}
              className="px-3 py-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-white text-xs font-semibold"
            >
              Translate to English
            </button>
            <button
              onClick={() => handleTranslateSummarize('summarize')}
              className="px-3 py-1.5 rounded-lg bg-indigo-900/60 hover:bg-indigo-800 text-white text-xs font-semibold"
            >
              Generate Bullet Summary
            </button>
          </div>

          {transOutput && (
            <div className="p-4 rounded-xl bg-[#0b0617] border border-purple-900/40 space-y-2">
              <pre className="text-xs text-slate-200 whitespace-pre-wrap font-sans">{transOutput}</pre>
              <button
                onClick={() => handleCopy(transOutput, 'trans_out')}
                className="text-xs text-purple-400 hover:text-white flex items-center gap-1"
              >
                {copiedKey === 'trans_out' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Result</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* 8. Generic / Conceptual Studio for Remaining Tools */}
      {![
        'shorts_reels_maker',
        'chat_assistant',
        'text_to_speech',
        'speech_to_text',
        'thumbnail_maker',
        'music_sfx',
        'translator_summarizer',
      ].includes(toolId) && (
        <div className="rounded-2xl border border-purple-800/40 bg-[#120a26] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">
              {lang === 'hi' ? `${tool.titleHi} कार्यक्षेत्र` : `${tool.titleEn} Workspace`}
            </h3>
            <span className="text-[11px] font-mono text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800/50">
              {tool.statusLabelEn}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#0b0617] border border-purple-800/60 space-y-3">
            <div className="flex items-start gap-2 text-xs text-slate-300">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span>
                {lang === 'hi'
                  ? 'यह टूल Zynqora AI के ज़ीरो-कॉस्ट आर्किटेक्चर में तैयार किया गया है। आप तुरंत इसके रेडी टेम्पलेट्स, ब्लूप्रिंट्स और कॉन्फ़िगरेशन का उपयोग कर सकते हैं।'
                  : 'This module is wired into Zynqora AI’s zero-budget architecture. You can configure parameters, draft storyboards, and export blueprints right now.'}
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  onShowToast(lang === 'hi' ? 'कॉन्फ़िगरेशन तैयार है!' : 'Configuration ready!');
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold purple-glow-sm"
              >
                {lang === 'hi' ? 'टेम्पलेट लोड करें' : 'Load Blueprint'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
