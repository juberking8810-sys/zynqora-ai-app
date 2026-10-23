import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  User,
  Copy,
  Check,
  RotateCcw,
  Trash2,
  CornerDownLeft,
  Bot,
} from 'lucide-react';
import { ChatMessage, AppLanguage } from '../types';
import { translations } from '../data/translations';
import { getAiChatResponse } from '../services/chatEngine';
import { safeStorage, safeCopyToClipboard } from '../utils/storage';

interface ChatScreenProps {
  lang: AppLanguage;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
  onShowToast: (message: string) => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  lang,
  initialPrompt,
  onClearInitialPrompt,
  onShowToast,
}) => {
  const t = translations[lang];

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Check safeStorage
    const saved = safeStorage.getItem('zynqora_chat_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [
      {
        id: 'msg_welcome',
        role: 'assistant',
        content: t.chatWelcomeMessage,
        timestamp: Date.now(),
        language: lang,
      },
    ];
  });

  const [inputValue, setInputValue] = useState(initialPrompt || '');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    try {
      safeStorage.setItem('zynqora_chat_history', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages, isTyping]);

  // Handle incoming initialPrompt
  useEffect(() => {
    if (initialPrompt) {
      setInputValue(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt, onClearInitialPrompt]);

  const handleCopy = async (text: string, id: string) => {
    const success = await safeCopyToClipboard(text);
    if (success) {
      setCopiedId(id);
      onShowToast(t.toastCopied);
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      onShowToast(t.toastCopied);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMessage: ChatMessage = {
      id: 'msg_user_' + Date.now(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
      language: lang,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Get simulated intelligent response
    const rawResponse = await getAiChatResponse(text, lang);

    // Stream the response with word-by-word typing effect
    const words = rawResponse.split(' ');
    const botMsgId = 'msg_bot_' + Date.now();

    const placeholderBotMessage: ChatMessage = {
      id: botMsgId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      language: lang,
    };

    setMessages((prev) => [...prev, placeholderBotMessage]);

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex++;
      const currentContent = words.slice(0, currentIndex).join(' ');
      setMessages((prev) =>
        prev.map((m) => (m.id === botMsgId ? { ...m, content: currentContent } : m))
      );

      if (currentIndex >= words.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 28);
  };

  const handleClearChat = () => {
    const resetWelcome: ChatMessage = {
      id: 'msg_welcome_' + Date.now(),
      role: 'assistant',
      content: t.chatWelcomeMessage,
      timestamp: Date.now(),
      language: lang,
    };
    setMessages([resetWelcome]);
    try {
      safeStorage.removeItem('zynqora_chat_history');
    } catch {
      // ignore
    }
    onShowToast(t.toastCleared);
  };

  const quickPrompts = [
    t.prompt1,
    t.prompt2,
    t.prompt3,
    t.prompt4,
  ];

  return (
    <div className="w-full h-[calc(100vh-8.5rem)] md:h-[calc(100vh-6.5rem)] flex flex-col rounded-2xl border border-purple-800/40 bg-[#100924] overflow-hidden purple-glow-sm">
      {/* Chat Top Bar */}
      <div className="border-b border-purple-900/40 bg-[#140b2e] px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
            <Bot className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>{t.chatHeader}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/80 text-purple-300 border border-purple-700/50">
                Demo
              </span>
            </h2>
            <p className="text-xs text-purple-300/70">{t.chatStatus}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/70 border border-purple-800/50 text-slate-300 hover:text-white text-xs font-medium transition-colors min-h-[38px]"
            title={t.clearChat}
          >
            <Trash2 className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">{t.clearChat}</span>
          </button>
        </div>
      </div>

      {/* Messages Thread Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {messages.map((message) => {
          const isUser = message.role === 'user';

          return (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                isUser ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-purple-600 text-white'
                    : 'bg-[#1e1140] border border-purple-500/40 text-purple-300'
                }`}
              >
                {isUser ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Sparkles className="w-4 h-4 text-purple-400" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`group relative max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3.5 text-sm leading-relaxed shadow-sm ${
                  isUser
                    ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white rounded-tr-none'
                    : 'bg-[#180f33] border border-purple-900/50 text-slate-100 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans break-words">
                  {message.content}
                </div>

                {/* Actions Bar for assistant messages */}
                {!isUser && message.content && (
                  <div className="pt-2 mt-2 border-t border-purple-900/40 flex items-center justify-between text-xs text-purple-300/80">
                    <span className="text-[11px] font-mono text-purple-400/60">
                      Zynqora AI
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(message.content, message.id)}
                        className="flex items-center gap-1 hover:text-white transition-colors p-1"
                        title={t.copyMessage}
                      >
                        {copiedId === message.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>
                          {copiedId === message.id ? t.copiedText : t.copyMessage}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-purple-400 font-medium pl-11">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce delay-100" />
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce delay-200" />
            <span className="ml-1 text-slate-400">
              {lang === 'hi' ? 'Zynqora लिख रहा है...' : 'Zynqora is thinking...'}
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Starter Prompts Strip */}
      <div className="px-4 py-2 border-t border-purple-900/40 bg-[#120a26]/70 flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] font-semibold text-purple-300 whitespace-nowrap shrink-0">
          {lang === 'hi' ? 'सुझाव:' : 'Ideas:'}
        </span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="text-xs px-2.5 py-1 rounded-full bg-purple-950/60 hover:bg-purple-900/70 border border-purple-800/40 text-slate-300 hover:text-white transition-all whitespace-nowrap shrink-0 active:scale-95"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box Bar */}
      <div className="p-3 sm:p-4 bg-[#140b2e] border-t border-purple-900/40 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-end gap-2 max-w-4xl mx-auto"
        >
          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={t.chatPlaceholder}
              className="w-full resize-none max-h-32 px-4 py-3 rounded-xl bg-[#0b0617] border border-purple-800/60 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 text-white placeholder-slate-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="h-11 w-11 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white flex items-center justify-center purple-glow-sm transition-all active:scale-95 shrink-0"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
