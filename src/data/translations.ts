import { AppLanguage, NicheId, ToneId, DurationId, ScriptLanguage } from '../types';

export const translations = {
  en: {
    appName: 'Zynqora AI',
    tagline: 'Next-Gen Creative AI Assistant',
    subtitle: 'Generate viral YouTube Shorts scripts and chat with intelligent AI in Hindi & English',
    navHome: 'Home',
    navChat: 'AI Chat',
    navShorts: 'Shorts Generator',
    navSaved: 'Saved Scripts',
    
    // Home Screen
    welcomeHeader: 'Unleash Your Creativity with Zynqora',
    welcomeSub: 'Empowering YouTube creators & digital thinkers with lightning-fast AI tools. No keys or signups required.',
    chatFeatureTitle: 'Zynqora AI Chat',
    chatFeatureDesc: 'Ask questions, brainstorm viral ideas, solve problems, or chat in Hindi and English with intelligent context.',
    chatFeatureAction: 'Start Chatting',
    shortsFeatureTitle: 'YouTube Shorts Script Generator',
    shortsFeatureDesc: 'Generate high-retention hooks, full video scripts, viral titles, descriptions, and hashtags in seconds.',
    shortsFeatureAction: 'Create Script Now',
    
    badgeFree: '100% Free Forever',
    badgeNoKey: 'No API Key Needed',
    badgeDualLang: 'Hindi + English',
    badgeFast: 'Instant Demo Engine',

    popularTopicsTitle: 'Popular Shorts Ideas',
    tryPromptTitle: 'Try Asking Zynqora',
    recentScriptsTitle: 'Your Saved Scripts',
    noSavedScripts: 'No saved scripts yet. Generate your first YouTube Short script!',
    
    // Shorts Generator
    generatorTitle: 'YouTube Shorts Studio',
    generatorSub: 'Craft viral, high-retention YouTube Shorts with timed visual cues, audio voiceover, titles, descriptions, and hashtags.',
    topicLabel: 'Enter Video Topic or Idea',
    topicPlaceholder: 'e.g. 5 Hidden smartphone features nobody knows, Mystery of Bermuda Triangle, How to invest $100...',
    quickExamples: 'Quick Ideas:',
    
    selectNiche: 'Niche / Category',
    selectTone: 'Tone & Style',
    selectDuration: 'Target Length',
    selectScriptLang: 'Script Language',
    
    generateAllBtn: '✨ Generate Complete Shorts Pack',
    generateScriptBtn: '📜 Script Only',
    generateTitlesBtn: '🏷️ Titles Only',
    generateDescBtn: '📝 Description Only',
    generateTagsBtn: ' #️⃣ Hashtags Only',
    
    generatingText: 'Zynqora AI is crafting your viral content...',
    
    // Output Tabs / Headers
    tabAll: 'Full Pack',
    tabScript: 'Script & Timing',
    tabTitles: 'Viral Titles',
    tabDescription: 'SEO Description',
    tabHashtags: 'Trending Hashtags',
    tabKeywords: 'SEO Keywords',
    
    demoBadge: 'Demo AI Generation',
    demoNotice: 'Demo Mode: Output simulated with high-retention creator formulas. No paid API keys required.',
    staleNotice: 'Topic has changed! Click Generate to update your results for the new topic.',
    emptyResultsState: 'Enter your video topic above and click any generation button to create viral Shorts content.',
    
    copyAllBtn: 'Copy Entire Bundle',
    copyScriptBtn: 'Copy Script',
    copyTitlesBtn: 'Copy All Titles',
    copyDescBtn: 'Copy Description',
    copyTagsBtn: 'Copy Hashtags',
    copyKeywordsBtn: 'Copy Keywords',
    saveScriptBtn: 'Save to Library',
    savedScriptBtn: 'Saved!',
    teleprompterBtn: 'Reader / Teleprompter Mode',
    closeTeleprompter: 'Close Reader',
    
    visualCue: 'Visual & Camera Cue',
    voiceover: 'Voiceover / Speech',
    onScreenText: 'Text Overlay & SFX',
    
    // AI Chat
    chatHeader: 'Zynqora AI Chat',
    chatStatus: 'Active & Ready · Instant Demo Mode',
    chatWelcomeMessage: "Hello! I am Zynqora AI, your creative assistant. I can help you write YouTube scripts, brainstorm content ideas, answer queries, or just chat in English or हिंदी. How can I assist you today?",
    chatPlaceholder: 'Ask anything or request a script idea (in English or हिंदी)...',
    clearChat: 'Clear Chat',
    newChat: 'New Chat',
    copyMessage: 'Copy',
    copiedText: 'Copied!',
    regenerate: 'Regenerate',
    
    // Quick Chat Prompts
    prompt1: 'Give me 5 viral YouTube Shorts ideas for a tech channel',
    prompt2: 'How to write a killer 3-second hook for Instagram Reels?',
    prompt3: 'Explain Quantum Computing in simple terms',
    prompt4: 'Suggest high-converting description templates for Shorts',

    // Toasts
    toastCopied: 'Copied to clipboard!',
    toastSaved: 'Saved to your library!',
    toastGenerated: 'Content generated successfully!',
    toastCleared: 'Chat history cleared.',
  },
  hi: {
    appName: 'Zynqora AI',
    tagline: 'आधुनिक क्रिएटिव एआई असिस्टेंट',
    subtitle: 'यूट्यूब शॉर्ट्स की वायरल स्क्रिप्ट बनाएं और हिंदी व अंग्रेजी में स्मार्ट एआई चैट करें',
    navHome: 'होम',
    navChat: 'एआई चैट',
    navShorts: 'शॉर्ट्स जनरेटर',
    navSaved: 'सेव की गई स्क्रिप्ट्स',
    
    // Home Screen
    welcomeHeader: 'Zynqora AI के साथ अपनी क्रिएटिविटी को अनलॉक करें',
    welcomeSub: 'यूट्यूब क्रिएटर्स के लिए सुपरफ़ास्ट और पॉवरफुल एआई टूल्स। किसी भी API Key या पेमेंट की ज़रूरत नहीं।',
    chatFeatureTitle: 'Zynqora एआई चैट',
    chatFeatureDesc: 'सवालों के जवाब पाएं, नए आइडियाज खोजें, और हिंदी व इंग्लिश में तुरंत बातचीत करें।',
    chatFeatureAction: 'चैट शुरू करें',
    shortsFeatureTitle: 'यूट्यूब शॉर्ट्स स्क्रिप्ट जनरेटर',
    shortsFeatureDesc: 'हाई-रिटेंशन हुक, टाइम-स्टैम्प्ड स्क्रिप्ट, कैची टाइटल, डिस्क्रिप्शन और वायरल हैशटैग्स तुरंत बनाएं।',
    shortsFeatureAction: 'शॉर्ट्स स्क्रिप्ट बनाएं',
    
    badgeFree: '100% मुफ़्त हमेशा',
    badgeNoKey: 'API Key की ज़रूरत नहीं',
    badgeDualLang: 'हिंदी + English सपोर्ट',
    badgeFast: 'सुपरफ़ास्ट डेमो इंजन',

    popularTopicsTitle: 'पॉपुलर शॉर्ट्स टॉपिक्स',
    tryPromptTitle: 'Zynqora से पूछें',
    recentScriptsTitle: 'आपकी सेव की गई स्क्रिप्ट्स',
    noSavedScripts: 'अभी तक कोई स्क्रिप्ट सेव नहीं है। अपनी पहली शॉर्ट्स स्क्रिप्ट बनाएं!',
    
    // Shorts Generator
    generatorTitle: 'यूट्यूब शॉर्ट्स स्टूडियो',
    generatorSub: 'कैमरा एंगल, वॉयसओवर, वायरल टाइटल्स, एसईओ डिस्क्रिप्शन और ट्रेंडिंग हैशटैग्स के साथ संपूर्ण शॉर्ट्स स्क्रिप्ट तैयार करें।',
    topicLabel: 'वीडियो का विषय या आइडिया लिखें',
    topicPlaceholder: 'उदा. स्मार्टफोन के 5 गुप्त फीचर्स, बरमूडा ट्रायंगल का रहस्य, ₹500 से निवेश कैसे शुरू करें...',
    quickExamples: 'त्वरित आइडियाज:',
    
    selectNiche: 'कैटेगरी / नीश',
    selectTone: 'टोन और अंदाज़',
    selectDuration: 'वीडियो की अवधि',
    selectScriptLang: 'स्क्रिप्ट की भाषा',
    
    generateAllBtn: '✨ संपूर्ण शॉर्ट्स पैक बनाएं',
    generateScriptBtn: '📜 सिर्फ स्क्रिप्ट बनाएं',
    generateTitlesBtn: '🏷️ सिर्फ टाइटल्स बनाएं',
    generateDescBtn: '📝 सिर्फ डिस्क्रिप्शन बनाएं',
    generateTagsBtn: ' #️⃣ सिर्फ हैशटैग्स बनाएं',
    
    generatingText: 'Zynqora AI आपकी वायरल स्क्रिप्ट तैयार कर रहा है...',
    
    // Output Tabs / Headers
    tabAll: 'संपूर्ण पैक',
    tabScript: 'स्क्रिप्ट व टाइमिंग',
    tabTitles: 'वायरल टाइटल्स',
    tabDescription: 'एसईओ डिस्क्रिप्शन',
    tabHashtags: 'ट्रेंडिंग हैशटैग्स',
    tabKeywords: 'एसईओ कीवर्ड्स',
    
    demoBadge: 'डेमो एआई जनरेशन',
    demoNotice: 'डेमो मोड: यह आउटपुट क्रिएटर फॉर्मूला आधारित डेमो एल्गोरिदम द्वारा तैयार किया गया है। किसी API Key की आवश्यकता नहीं है।',
    staleNotice: 'टॉपिक बदल दिया गया है! नए टॉपिक के लिए परिणाम अपडेट करने हेतु कोई भी जनरेट बटन दबाएं।',
    emptyResultsState: 'ऊपर वीडियो का टॉपिक दर्ज करें और शॉर्ट्स कंटेंट तैयार करने के लिए कोई भी बटन दबाएं।',
    
    copyAllBtn: 'पूरा बंडल कॉपी करें',
    copyScriptBtn: 'स्क्रिप्ट कॉपी करें',
    copyTitlesBtn: 'सभी टाइटल्स कॉपी करें',
    copyDescBtn: 'डिस्क्रिप्शन कॉपी करें',
    copyTagsBtn: 'हैशटैग्स कॉपी करें',
    copyKeywordsBtn: 'कीवर्ड्स कॉपी करें',
    saveScriptBtn: 'लाइब्रेरी में सेव करें',
    savedScriptBtn: 'सेव हो गया!',
    teleprompterBtn: 'रीडर / टेलीप्रॉम्प्टर मोड',
    closeTeleprompter: 'रीडर बंद करें',
    
    visualCue: 'विजुअल और कैमरा सीन',
    voiceover: 'वॉयसओवर / बोलने वाली लाइनें',
    onScreenText: 'स्क्रीन टेक्स्ट और साउंड इफ़ेक्ट्स',
    
    // AI Chat
    chatHeader: 'Zynqora एआई चैट',
    chatStatus: 'ऑनलाइन और तैयार · डेमो मोड',
    chatWelcomeMessage: "नमस्ते! मैं Zynqora AI हूँ, आपका व्यक्तिगत क्रिएटिव सहायक। मैं यूट्यूब स्क्रिप्ट लिखने, वायरल आइडिया खोजने, सवालों के जवाब देने और हिंदी या इंग्लिश में आपकी मदद करने के लिए तैयार हूँ। आज आप क्या बनाना चाहते हैं?",
    chatPlaceholder: 'कुछ भी पूछें या स्क्रिप्ट का आइडिया मांगें (हिंदी या English में)...',
    clearChat: 'चैट साफ़ करें',
    newChat: 'नई चैट',
    copyMessage: 'कॉपी',
    copiedText: 'कॉपी हो गया!',
    regenerate: 'दोबारा लिखें',
    
    // Quick Chat Prompts
    prompt1: 'यूट्यूब शॉर्ट्स के लिए 5 वायरल और ट्रेंडिंग आइडियाज बताओ',
    prompt2: 'वीडियो के शुरुआती 3 सेकंड में ऑडियंस को रोकने वाला हुक कैसे बनाएं?',
    prompt3: 'आर्टिफिशियल इंटेलिजेंस (AI) को सरल हिंदी में समझाओ',
    prompt4: 'शॉर्ट्स को वायरल करने के लिए बेस्ट डिस्क्रिप्शन और टैग्स का फॉर्मूला क्या है?',

    // Toasts
    toastCopied: 'क्लिपबोर्ड में कॉपी किया गया!',
    toastSaved: 'लाइब्रेरी में सेव कर लिया गया!',
    toastGenerated: 'कंटेंट सफलतापूर्वक तैयार हुआ!',
    toastCleared: 'चैट हिस्ट्री साफ़ कर दी गई।',
  }
};

export const nicheLabels: Record<NicheId, { en: string; hi: string }> = {
  tech: { en: 'Tech & Gadgets', hi: 'टेक्नोलॉजी और गैजेट्स' },
  facts: { en: 'Facts & Mystery', hi: 'रहस्य और रोचक तथ्य' },
  finance: { en: 'Money & Investing', hi: 'पैसे और इन्वेस्टमेंट' },
  fitness: { en: 'Motivation & Fitness', hi: 'मोटिवेशन और फिटनेस' },
  story: { en: 'Storytelling & Suspense', hi: 'कहानी और सस्पेंस' },
  comedy: { en: 'Comedy & Relatable', hi: 'कॉमेडी और मीम्स' },
  lifehacks: { en: 'Life Hacks & Tips', hi: 'लाइफ हैक्स और ट्रिक्स' },
  gaming: { en: 'Gaming & Esports', hi: 'गेमिंग और ई-स्पोर्ट्स' },
};

export const toneLabels: Record<ToneId, { en: string; hi: string }> = {
  viral: { en: 'Viral Hook & Curiosity', hi: 'वायरल हुक और सस्पेंस' },
  dramatic: { en: 'Dramatic & Intense', hi: 'ड्रामाटिक और रोमांचक' },
  energetic: { en: 'Energetic & Fast Paced', hi: 'हाई एनर्जी और तेज गति' },
  informative: { en: 'Clear & Educational', hi: 'सरल और ज्ञानवर्धक' },
  humorous: { en: 'Funny & Entertaining', hi: 'मज़ेदार और मनोरंजक' },
};

export const durationLabels: Record<DurationId, { en: string; hi: string }> = {
  '15s': { en: '15s (Micro Hook)', hi: '15 सेकंड (क्विक हुक)' },
  '30s': { en: '30s (Standard Viral)', hi: '30 सेकंड (स्टैंडर्ड शॉर्ट)' },
  '60s': { en: '60s (Full Story)', hi: '60 सेकंड (पूरी स्टोरी)' },
};

export const scriptLangLabels: Record<ScriptLanguage, { label: string; sub: string }> = {
  en: { label: 'English', sub: 'Global Reach' },
  hi: { label: 'हिंदी (Hindi)', sub: 'देवनागरी लिपि' },
  hinglish: { label: 'Hinglish', sub: 'Hindi in Roman letters' },
};
