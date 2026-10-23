import React, { useState } from 'react';
import {
  Bookmark,
  Trash2,
  Copy,
  Check,
  Eye,
  Video,
  ArrowRight,
  ExternalLink,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ShortsScript, AppLanguage } from '../types';
import { translations } from '../data/translations';
import { safeCopyToClipboard } from '../utils/storage';

interface SavedScriptsScreenProps {
  scripts: ShortsScript[];
  onDeleteScript: (id: string) => void;
  onOpenTeleprompter: (script: ShortsScript) => void;
  onLoadIntoGenerator: (script: ShortsScript) => void;
  lang: AppLanguage;
  onShowToast: (msg: string) => void;
  onNavigateToGenerator: () => void;
}

export const SavedScriptsScreen: React.FC<SavedScriptsScreenProps> = ({
  scripts,
  onDeleteScript,
  onOpenTeleprompter,
  onLoadIntoGenerator,
  lang,
  onShowToast,
  onNavigateToGenerator,
}) => {
  const t = translations[lang];
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyBundle = async (script: ShortsScript) => {
    const titleText = (script.titles || []).join('\n• ');
    const tagsText = (script.hashtags || []).join(' ');
    const keywordsText = (script.keywords || []).join(', ');
    const scriptText = (script.scenes || [])
      .map(
        (s) =>
          `[${s.timestamp}] ${s.sectionName}\nVisual: ${s.visual}\nVoiceover: "${s.voiceover}"\nOverlay/SFX: ${s.onScreenText}`
      )
      .join('\n\n');

    const fullBundle = `=== ZYNQORA AI - SAVED SHORTS SCRIPT ===\nTOPIC: ${script.topic}\n\nTITLES:\n• ${titleText}\n\nSCRIPT:\n${scriptText}\n\nDESCRIPTION:\n${script.description}\n\nHASHTAGS:\n${tagsText}\n\nKEYWORDS:\n${keywordsText}\n`;

    const success = await safeCopyToClipboard(fullBundle);
    if (success) {
      setCopiedId(script.id);
      onShowToast(t.toastCopied);
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      onShowToast(t.toastCopied);
    }
  };

  return (
    <div className="w-full pb-20 md:pb-12 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#170c36] via-[#12092a] to-[#0c061d] border border-purple-800/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold">
            <Bookmark className="w-4 h-4" />
            <span>{t.navSaved}</span>
            <span>·</span>
            <span>{scripts.length} saved</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {lang === 'hi' ? 'आपकी सुरक्षित की गई स्क्रिप्ट्स' : 'Saved Scripts Library'}
          </h1>
          <p className="text-xs text-slate-300">
            {lang === 'hi'
              ? 'यहां आपकी बनाई गई सभी यूट्यूब शॉर्ट्स स्क्रिप्ट्स सुरक्षित हैं।'
              : 'All your generated YouTube Shorts scripts saved locally on this device.'}
          </p>
        </div>

        <button
          onClick={onNavigateToGenerator}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all purple-glow-sm self-start sm:self-center"
        >
          <Video className="w-4 h-4" />
          <span>{t.shortsFeatureAction}</span>
        </button>
      </div>

      {/* Empty State */}
      {scripts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-purple-800/40 bg-[#100824] space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-900/40 border border-purple-700/50 flex items-center justify-center mx-auto text-purple-300">
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">
              {t.noSavedScripts}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {lang === 'hi'
                ? 'शॉर्ट्स जनरेटर से कोई भी स्क्रिप्ट बनाएं और "लाइब्रेरी में सेव करें" बटन दबाएं।'
                : 'Create scripts in the Shorts Studio and click "Save to Library" to keep them here.'}
            </p>
          </div>
          <button
            onClick={onNavigateToGenerator}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all purple-glow-sm"
          >
            <span>{t.shortsFeatureAction}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scripts.map((script) => (
            <div
              key={script.id}
              className="rounded-2xl border border-purple-800/40 bg-[#120a26] p-5 space-y-4 hover:border-purple-600/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-purple-300/80">
                  <span className="capitalize font-medium">
                    {script.niche} · {script.duration} · {script.scriptLang}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {new Date(script.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white line-clamp-1">
                  {script.topic}
                </h3>

                <p className="text-xs text-slate-300 font-medium line-clamp-2 bg-[#0d071c] p-2.5 rounded-lg border border-purple-900/40">
                  "{script.titles[0] || script.scenes[0]?.voiceover}"
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(script.hashtags || []).slice(0, 4).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-900/50"
                    >
                      {tag}
                    </span>
                  ))}
                  {(script.hashtags || []).length > 4 && (
                    <span className="text-[11px] text-slate-500 self-center">
                      +{(script.hashtags || []).length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-purple-900/40 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyBundle(script)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-950/70 hover:bg-purple-900 text-purple-200 text-xs font-medium border border-purple-800/40 transition-colors"
                    title={t.copyAllBtn}
                  >
                    {copiedId === script.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedId === script.id ? t.copiedText : 'Copy All'}</span>
                  </button>

                  <button
                    onClick={() => onOpenTeleprompter(script)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-950/70 hover:bg-purple-900 text-purple-200 text-xs font-medium border border-purple-800/40 transition-colors"
                    title="Open Reader Mode"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Reader</span>
                  </button>

                  <button
                    onClick={() => onLoadIntoGenerator(script)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-950/70 hover:bg-purple-900 text-purple-200 text-xs font-medium border border-purple-800/40 transition-colors"
                    title="Edit in Studio"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Studio</span>
                  </button>
                </div>

                <button
                  onClick={() => onDeleteScript(script.id)}
                  className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 border border-red-900/40 transition-colors"
                  title="Delete"
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
