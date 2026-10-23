import React, { useState, useEffect } from 'react';
import { ActiveTab, AppLanguage, ShortsScript, ToolCategoryId, UserProfile } from './types';
import { LoginScreen } from './components/LoginScreen';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { ToolboxScreen } from './components/ToolboxScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { AssetsScreen } from './components/AssetsScreen';
import { MySpaceScreen } from './components/MySpaceScreen';
import { ShortsGeneratorScreen } from './components/ShortsGeneratorScreen';
import { ChatScreen } from './components/ChatScreen';
import { SavedScriptsScreen } from './components/SavedScriptsScreen';
import { ToolDetailView } from './components/ToolDetailView';
import { TeleprompterModal } from './components/TeleprompterModal';
import { CreationSheetModal } from './components/CreationSheetModal';
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

  // 2. Authentication state (SCREEN 1 - LOGIN SCREEN vs SCREEN 2 - HOME SCREEN)
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = safeStorage.getItem('zynqora_auth');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return safeStorage.getItem('zynqora_auth') !== null;
  });

  const handleLoginSuccess = (userProfile: UserProfile) => {
    setUser(userProfile);
    setIsAuthenticated(true);
    safeStorage.setItem('zynqora_auth', JSON.stringify(userProfile));
    setCurrentTab('home');
  };

  const handleSignOut = () => {
    safeStorage.removeItem('zynqora_auth');
    setUser(null);
    setIsAuthenticated(false);
    showToast(lang === 'hi' ? 'सफलतापूर्वक लॉग आउट हुआ।' : 'Signed out successfully.');
  };

  // 3. Active Tab state: 'home' | 'explore' | 'create' | 'assets' | 'myspace' | 'toolbox' | 'shorts' | 'chat' | 'tool_detail'
  const [currentTab, setCurrentTab] = useState<ActiveTab>('home');

  // 4. Creation Sheet Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // 5. Saved Scripts state (persisted in safeStorage)
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

  // 6. Quick routing data from Home
  const [generatorTopic, setGeneratorTopic] = useState<string>('');
  const [chatPrompt, setChatPrompt] = useState<string>('');

  // 7. Tool Studio Selection state
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
      setCurrentTab('assets');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSelectedToolId(toolId);
    setCurrentTab('tool_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 8. Teleprompter Modal state
  const [teleprompterScript, setTeleprompterScript] = useState<ShortsScript | null>(null);

  // 9. Toast Notification state
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

  // If NOT authenticated, render SCREEN 1 - LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0f0a1f] text-slate-100 font-sans selection:bg-purple-600 selection:text-white">
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        <LoginScreen
          onLoginSuccess={handleLoginSuccess}
          lang={lang}
          onToggleLang={toggleLanguage}
          onShowToast={showToast}
        />
      </div>
    );
  }

  // If authenticated, render SCREEN 2 - HOME SCREEN & FULL STUDIO
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 flex flex-col font-sans selection:bg-[#7c3aed] selection:text-white">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Creation Sheet Modal */}
      <CreationSheetModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        lang={lang}
        onSelectTool={handleSelectTool}
        onSelectTab={(tab) => {
          setSelectedToolId(null);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Teleprompter Modal */}
      {teleprompterScript && (
        <TeleprompterModal
          script={teleprompterScript}
          onClose={() => setTeleprompterScript(null)}
          lang={lang}
          onShowToast={showToast}
        />
      )}

      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setSelectedToolId(null);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={lang}
        onToggleLang={toggleLanguage}
        savedCount={savedScripts.length}
        user={user}
        onOpenCreate={() => setIsCreateModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 w-full">
        {/* SCREEN 2: HOME SCREEN */}
        {currentTab === 'home' && (
          <HomeScreen
            onSelectTab={(tab) => {
              setSelectedToolId(null);
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            lang={lang}
            onSelectTool={handleSelectTool}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
            onShowToast={showToast}
          />
        )}

        {/* TOOLBOX SCREEN: All 17 Tools */}
        {currentTab === 'toolbox' && (
          <ToolboxScreen
            lang={lang}
            onBack={() => {
              setCurrentTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectTool={handleSelectTool}
          />
        )}

        {/* EXPLORE SCREEN */}
        {currentTab === 'explore' && (
          <ExploreScreen
            lang={lang}
            onSelectTool={handleSelectTool}
            onShowToast={showToast}
          />
        )}

        {/* ASSETS SCREEN */}
        {currentTab === 'assets' && (
          <AssetsScreen
            savedScripts={savedScripts}
            onDeleteScript={handleDeleteScript}
            onOpenTeleprompter={(script) => setTeleprompterScript(script)}
            onLoadIntoGenerator={(script) => {
              setGeneratorTopic(script.topic);
              setCurrentTab('shorts');
            }}
            lang={lang}
            onNavigateToGenerator={() => setCurrentTab('shorts')}
            onShowToast={showToast}
          />
        )}

        {/* MY SPACE SCREEN */}
        {currentTab === 'myspace' && (
          <MySpaceScreen
            user={user}
            lang={lang}
            onToggleLang={toggleLanguage}
            onSignOut={handleSignOut}
            onSelectTab={(tab) => {
              setSelectedToolId(null);
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* INDIVIDUAL TOOL VIEW */}
        {currentTab === 'tool_detail' && selectedToolId && (
          <ToolDetailView
            toolId={selectedToolId}
            lang={lang}
            onBack={() => {
              setCurrentTab('toolbox');
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

        {/* SHORTS STUDIO */}
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

        {/* AI CHAT */}
        {currentTab === 'chat' && (
          <ChatScreen
            lang={lang}
            initialPrompt={chatPrompt}
            onClearInitialPrompt={() => setChatPrompt('')}
            onShowToast={showToast}
          />
        )}

        {/* SAVED SCRIPTS */}
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

      {/* Mobile Bottom Navigation Bar with lifted + button */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setSelectedToolId(null);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={lang}
        savedCount={savedScripts.length}
        onOpenCreate={() => setIsCreateModalOpen(true)}
      />
    </div>
  );
}
