export type AppLanguage = 'en' | 'hi';

export type ScriptLanguage = 'en' | 'hi' | 'hinglish';

export type NicheId =
  | 'tech'
  | 'facts'
  | 'finance'
  | 'fitness'
  | 'story'
  | 'comedy'
  | 'lifehacks'
  | 'gaming';

export type ToneId =
  | 'viral'
  | 'dramatic'
  | 'energetic'
  | 'informative'
  | 'humorous';

export type DurationId = '15s' | '30s' | '60s';

export interface ScriptScene {
  timestamp: string;
  sectionName: string;
  visual: string;
  voiceover: string;
  onScreenText: string;
  soundEffect?: string;
}

export interface ShortsScript {
  id: string;
  topic: string;
  niche: NicheId;
  tone: ToneId;
  duration: DurationId;
  scriptLang: ScriptLanguage;
  titles: string[];
  description: string;
  hashtags: string[];
  keywords: string[];
  scenes: ScriptScene[];
  isDemo?: boolean;
  createdAt: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  language?: AppLanguage;
}

export type ToolCategoryId =
  | 'chat_assistant'
  | 'text_to_video'
  | 'image_to_video'
  | 'text_to_image'
  | 'image_editor'
  | 'text_to_speech'
  | 'speech_to_text'
  | 'shorts_reels_maker'
  | 'script_generator'
  | 'thumbnail_maker'
  | 'background_remover'
  | 'music_sfx'
  | 'ai_templates'
  | 'translator_summarizer'
  | 'pdf_assistant'
  | 'code_assistant'
  | 'saved_projects';

export interface ToolCategory {
  id: ToolCategoryId;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  group: 'all' | 'video' | 'image' | 'audio' | 'writing' | 'utility';
  badgeEn: string;
  badgeHi: string;
  iconName: string;
  status: 'active' | 'in_preview' | 'requires_api';
  statusLabelEn: string;
  statusLabelHi: string;
  engineNoticeEn: string;
  engineNoticeHi: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  credits: number;
  provider: 'google' | 'email' | 'guest';
}

export type ActiveTab =
  | 'home'
  | 'explore'
  | 'create'
  | 'assets'
  | 'myspace'
  | 'toolbox'
  | 'chat'
  | 'shorts'
  | 'saved'
  | 'tool_detail';

