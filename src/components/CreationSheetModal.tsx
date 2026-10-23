import React from 'react';
import {
  X,
  Video,
  Clapperboard,
  Sparkles,
  Image,
  Mic,
  FileText,
  MessageSquare,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { AppLanguage, ToolCategoryId, ActiveTab } from '../types';

interface CreationSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: AppLanguage;
  onSelectTool: (toolId: ToolCategoryId) => void;
  onSelectTab: (tab: ActiveTab) => void;
}

export const CreationSheetModal: React.FC<CreationSheetModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSelectTool,
  onSelectTab,
}) => {
  if (!isOpen) return null;

  const creationOptions = [
    {
      id: 'text_to_video' as ToolCategoryId,
      title: lang === 'hi' ? 'टेक्स्ट-टू-वीडियो (AI Video)' : 'Text-to-Video',
      desc: lang === 'hi' ? 'किसी भी प्रॉम्प्ट से सिनेमैटिक वीडियो बनाएं' : 'Generate cinematic video scenes from text prompts',
      icon: <Video className="w-5 h-5 text-purple-400" />,
      badge: lang === 'hi' ? 'सिनेमैटिक V3' : 'Cinema V3',
      action: () => {
        onClose();
        onSelectTool('text_to_video');
      },
    },
    {
      id: 'shorts_reels_maker' as ToolCategoryId,
      title: lang === 'hi' ? 'YouTube Shorts व Reels' : 'Shorts & Reels Studio',
      desc: lang === 'hi' ? '5 वायरल स्टाइल, टाइमस्टैम्प व टेलीप्रॉम्प्टर' : 'Complete 15s-60s script, hook & caption maker',
      icon: <Clapperboard className="w-5 h-5 text-pink-400" />,
      badge: lang === 'hi' ? 'वायरल इंजन' : 'Viral Engine',
      action: () => {
        onClose();
        onSelectTab('shorts');
      },
    },
    {
      id: 'image_to_video' as ToolCategoryId,
      title: lang === 'hi' ? 'इमेज-टू-वीडियो' : 'Image-to-Video Animation',
      desc: lang === 'hi' ? 'अपनी तस्वीरों में गति और कैमरा मूवमेंट जोड़ें' : 'Bring still images to life with motion & camera zoom',
      icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
      badge: lang === 'hi' ? 'मोशन AI' : 'Motion AI',
      action: () => {
        onClose();
        onSelectTool('image_to_video');
      },
    },
    {
      id: 'text_to_image' as ToolCategoryId,
      title: lang === 'hi' ? 'टेक्स्ट-टू-इमेज' : 'Text-to-Image Studio',
      desc: lang === 'hi' ? '4K वॉलपेपर्स, थंबनेल्स व पोस्टर बनाएं' : 'High quality visual art, 3D renders & posters',
      icon: <Image className="w-5 h-5 text-cyan-400" />,
      badge: lang === 'hi' ? '4K रेंडर' : '4K Render',
      action: () => {
        onClose();
        onSelectTool('text_to_image');
      },
    },
    {
      id: 'text_to_speech' as ToolCategoryId,
      title: lang === 'hi' ? 'AI वॉयस व टेक्स्ट-टू-स्पीच' : 'AI Voice & Text-to-Speech',
      desc: lang === 'hi' ? 'नेचुरल आवाज़ में वॉइसओवर बनाएं' : 'Natural browser speech synthesis with audio controls',
      icon: <Mic className="w-5 h-5 text-emerald-400" />,
      badge: lang === 'hi' ? 'HD वॉयस' : 'HD Voice',
      action: () => {
        onClose();
        onSelectTool('text_to_speech');
      },
    },
    {
      id: 'chat_assistant' as ToolCategoryId,
      title: lang === 'hi' ? 'AI चैट व राइटिंग असिस्टेंट' : 'AI Chat & Brainstorming',
      desc: lang === 'hi' ? 'आइडियाज, टाइटल्स व स्क्रिप्ट्स पर बात करें' : 'Bilingual assistant for brainstorming hooks & scripts',
      icon: <MessageSquare className="w-5 h-5 text-violet-400" />,
      badge: lang === 'hi' ? 'हिंदी + इंग्लिश' : 'Bilingual',
      action: () => {
        onClose();
        onSelectTab('chat');
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-[#110a26] border border-purple-500/40 p-5 sm:p-6 shadow-2xl shadow-purple-950/90 max-h-[85vh] overflow-y-auto">
        {/* Top Handle / Close */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-700/80 text-white flex items-center justify-center shadow-md">
              <Zap className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                {lang === 'hi' ? 'नया AI कंटेंट बनाएं' : 'Create with Zynqora AI'}
              </h2>
              <p className="text-[11px] text-purple-300">
                {lang === 'hi' ? 'कोई भी फॉर्मैट चुनें और तुरंत शुरू करें' : 'Select a creative format to start crafting'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white bg-purple-950/60 border border-purple-800/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="space-y-2.5">
          {creationOptions.map((opt) => (
            <div
              key={opt.id}
              onClick={opt.action}
              className="p-3.5 rounded-2xl bg-[#170e33] hover:bg-[#22144d] border border-purple-900/40 hover:border-purple-500/60 transition-all cursor-pointer flex items-center justify-between gap-3 group active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  {opt.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                      {opt.title}
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-500/30">
                      {opt.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{opt.desc}</p>
                </div>
              </div>

              <div className="w-7 h-7 rounded-full bg-purple-900/40 text-purple-400 group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center transition-all flex-shrink-0">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
