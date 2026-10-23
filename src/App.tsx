import React, { useState, useEffect } from 'react';
import { ActiveTab, AppLanguage, ShortsScript, ToolCategoryId } from './types';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { ShortsGeneratorScreen } from './components/ShortsGeneratorScreen';
import { ChatScreen } from './components/ChatScreen';
import { SavedScriptsScreen } from './components/SavedScriptsScreen';
import { TeleprompterModal } from './components/TeleprompterModal';
import { ToolDetailView } from './components/ToolDetailView';
import { Toast } from './components/Toast';
import { safeStorage } from './utils/storage';

export default function App() {
  // 1. Language state: English ('en') or Hindi ('hi')
  const [lang, setLang] = useState<AppLanguage>(() => {
    const saved = safeStorage.getItem('zynqora_lang');
    return saved === 'hi' ? 'hi' : 'en';
  });

  const toggleLanguage = () => {
    setLang((prev) => {
      const next = prev === 'en' ? 'hi' : 'en';
      safeStorage.setItem('zynqora_lang', next);
      return next;
    });
  };

  // 2. Active Tab state: 'home' | 'chat' | 'shorts' | 'saved'
  const [currentTab, setCurrentTab] = useState<ActiveTab>('home');

  // 3. Saved Scripts state (persisted in safeStorage)
  const [savedScripts, setSavedScripts] = useState<ShortsScript[]>(() => {
    const local = safeStorage.getItem('zynqora_saved_scripts');
    if (local) {
      try {
        return JSON.parse(local);
      } catch {
        // ignore
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      safeStorage.setItem('zynqora_saved_scripts', JSON.stringify(savedScripts));
    } catch {
      // ignore
    }
  }, [savedScripts]);

  const handleSaveScript = (script: ShortsScript) => {
    setSavedScripts((prev) => {
      const exists = prev.find((s) => s.id === script.id);
      if (exists) {
        return prev.map((s) => (s.id === script.id ? script : s));
      }
      return [script, ...prev];
    });
  };

  const handleDeleteScript = (id: string) => {
    setSavedScripts((prev) => prev.filter((s) => s.id !== id));
    showToast(lang === 'hi' ? 'स्क्रिप्ट हटा दी गई।' : 'Script deleted.');
  };

  const isScriptSaved = (id: string) => savedScripts.some((s) => s.id === id);

  // 4. Quick routing data from Home
  const [generatorTopic, setGeneratorTopic] = useState<string>('');
  const [chatPrompt, setChatPrompt] = useState<string>('');

  const handleQuickStartTopic = (topic: string) => {
    setGeneratorTopic(topic);
    setCurrentTab('shorts');
  };

  const handleQuickChatPrompt = (prompt: string) => {
    setChatPrompt(prompt);
    setCurrentTab('chat');
  };

  const handleSelectScriptForView = (script: ShortsScript) => {
    setGeneratorTopic(script.topic);
    setCurrentTab('shorts');
  };

  // 5. Tool Studio Selection state
  const [selectedToolId, setSelectedToolId] = useState<ToolCategoryId | null>(null);

  const handleSelectTool = (toolId: ToolCategoryId) => {
    if (toolId === 'shorts_reels_maker') {
      setCurrentTab('shorts');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (toolId === 'chat_assistant') {
      setCurrentTab('chat');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (toolId === 'saved_projects') {
      setCurrentTab('saved');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSelectedToolId(toolId);
    setCurrentTab('tool_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 6. Teleprompter Modal state
  const [teleprompterScript, setTeleprompterScript] = useState<ShortsScript | null>(null);

  // 7. Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <div className="min-h-screen bg-[#090514] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Teleprompter Modal */}
      {teleprompterScript && (
        <TeleprompterModal
          script={teleprompterScript}
          onClose={() => setTeleprompterScript(null)}
          lang={lang}
          onShowToast={showToast}
        />
      )}

      {/* Main Top Navbar */}
      <Navbar
        currentTab={currentTab === 'tool_detail' ? 'home' : currentTab}
        onSelectTab={(tab) => {
          setSelectedToolId(null);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={lang}
        onToggleLang={toggleLanguage}
        savedCount={savedScripts.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 w-full">
        {currentTab === 'home' && (
          <HomeScreen
            onSelectTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            lang={lang}
            savedScripts={savedScripts}
            onSelectScriptForView={handleSelectScriptForView}
            onQuickStartTopic={handleQuickStartTopic}
            onQuickChatPrompt={handleQuickChatPrompt}
            onSelectTool={handleSelectTool}
          />
        )}

        {currentTab === 'tool_detail' && selectedToolId && (
          <ToolDetailView
            toolId={selectedToolId}
            lang={lang}
            onBack={() => {
              setCurrentTab('home');
              setSelectedToolId(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToTab={(tab) => {
              setSelectedToolId(null);
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'shorts' && (
          <ShortsGeneratorScreen
            lang={lang}
            initialTopic={generatorTopic}
            onSaveScript={handleSaveScript}
            isScriptSaved={isScriptSaved}
            onOpenTeleprompter={(script) => setTeleprompterScript(script)}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'chat' && (
          <ChatScreen
            lang={lang}
            initialPrompt={chatPrompt}
            onClearInitialPrompt={() => setChatPrompt('')}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'saved' && (
          <SavedScriptsScreen
            scripts={savedScripts}
            onDeleteScript={handleDeleteScript}
            onOpenTeleprompter={(script) => setTeleprompterScript(script)}
            onLoadIntoGenerator={(script) => {
              setGeneratorTopic(script.topic);
              setCurrentTab('shorts');
            }}
            lang={lang}
            onShowToast={showToast}
            onNavigateToGenerator={() => setCurrentTab('shorts')}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        currentTab={currentTab === 'tool_detail' ? 'home' : currentTab}
        onSelectTab={(tab) => {
          setSelectedToolId(null);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={lang}
        savedCount={savedScripts.length}
      />
    </div>
  );
}
