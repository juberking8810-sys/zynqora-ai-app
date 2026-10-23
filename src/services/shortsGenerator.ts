import {
  ShortsScript,
  ScriptScene,
  NicheId,
  ToneId,
  DurationId,
  ScriptLanguage,
} from '../types';

export interface GenerationParams {
  topic: string;
  niche: NicheId;
  tone: ToneId;
  duration: DurationId;
  scriptLang: ScriptLanguage;
}

// Clean and validate topic
export const cleanTopic = (topic: string): string => {
  const trimmed = topic.trim();
  return trimmed.length > 0 ? trimmed : 'Trending Shorts Topic';
};

// Generate Topic-Relevant Keywords
export const generateKeywordsOnly = (
  topic: string,
  niche: NicheId,
  lang: ScriptLanguage
): string[] => {
  const safe = cleanTopic(topic);
  
  // Extract words from topic for targeted keywords
  const rawWords = safe
    .replace(/[^\w\s\u0900-\u097F]/gi, '')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const topicKeywords = rawWords.map((w) => w.toLowerCase());

  const nicheMap: Record<NicheId, { en: string[]; hi: string[]; hinglish: string[] }> = {
    tech: {
      en: ['tech hacks', 'smartphone tricks', 'ai revolution', 'hidden settings', 'gadget review', 'future tech'],
      hi: ['टेक ट्रिक्स', 'गुप्त सेटिंग्स', 'स्मार्टफोन फीचर्स', 'नई तकनीक', 'गैजेट ज्ञान'],
      hinglish: ['secret tech hacks', 'phone hidden settings', 'best tech tricks', 'tech exposed', 'gadgets review'],
    },
    facts: {
      en: ['unsolved mystery', 'mind blowing facts', 'did you know', 'dark secrets', 'historical facts', 'science truth'],
      hi: ['रोचक तथ्य', 'अनसुलझा रहस्य', 'हैरान करने वाले सच', 'दुनिया के रहस्य', 'अनोखा ज्ञान'],
      hinglish: ['unsolved mystery', 'shocking facts in hindi', 'kya aap jante the', 'dark reality', 'real facts'],
    },
    finance: {
      en: ['money mindset', 'wealth building', 'investing hacks', 'financial freedom', 'passive income', 'budget tips'],
      hi: ['पैसे कमाने का तरीका', 'इन्वेस्टमेंट ज्ञान', 'अमीर बनने का नियम', 'फाइनेंशियल फ्रीडम', 'बचत के उपाय'],
      hinglish: ['paisa kaise kamaye', 'investing for beginners', 'money management tips', 'wealth building hacks'],
    },
    fitness: {
      en: ['gym motivation', 'workout secrets', 'fat loss hacks', 'muscle building', 'daily discipline', 'fitness routine'],
      hi: ['फिटनेस मोटिवेशन', 'कसरत के नियम', 'वजन घटाने का तरीका', 'डिसिप्लिन', 'स्वस्थ जीवन'],
      hinglish: ['gym motivation hindi', 'fat loss tips', 'workout routine', 'bodybuilding mistakes', 'daily habits'],
    },
    story: {
      en: ['scary story', 'real incident', 'thriller plot', 'suspense shorts', 'true crime', 'plot twist'],
      hi: ['सच्ची घटना', 'डरावनी कहानी', 'रहस्यमयी किस्सा', 'रोंगटे खड़े कर देने वाला सच', 'थ्रिलर स्टोरी'],
      hinglish: ['real horror story', 'suspense thriller shorts', 'sachhi ghatna', 'creepy real incidents', 'storytime'],
    },
    comedy: {
      en: ['relatable comedy', 'daily humor', 'funny reel', 'meme culture', 'hilarious sketch', 'desi memes'],
      hi: ['मजेदार कॉमेडी', 'देसी मीम्स', 'हंसने वाली बातें', 'कॉमेडी शॉर्ट्स', 'हंसी का धमाका'],
      hinglish: ['funny relatable reels', 'desi comedy shorts', 'meme review', 'roast shorts', 'funny moments'],
    },
    lifehacks: {
      en: ['productivity hacks', 'daily shortcuts', 'life advice', 'smart work', 'time saving tricks', 'diy solution'],
      hi: ['जीवन के सरल उपाय', 'स्मार्ट ट्रिक्स', 'समय बचाने वाले हैक्स', 'कामयाबी के टिप्स', 'लाइफ हैक्स'],
      hinglish: ['smart daily hacks', 'time saving tricks', 'productivity tips', 'life changing advice', 'diy hacks'],
    },
    gaming: {
      en: ['gaming highlights', 'pro gameplay', 'epic gamer moment', 'game glitches', 'secret easter egg', 'speedrun'],
      hi: ['गेमिंग शॉर्ट्स', 'प्रो गेमप्ले', 'शानदार किल्स', 'गेम सीक्रेट्स', 'एपिक मोमेंट्स'],
      hinglish: ['pro gamer moments', 'gameplay highlights', 'gaming tips and tricks', 'epic clutch', 'funny gaming'],
    },
  };

  const domainKeywords = nicheMap[niche]?.[lang] || nicheMap[niche]?.en || [];
  const baseSeo = lang === 'hi' 
    ? ['यूट्यूब शॉर्ट्स 2026', 'ट्रेंडिंग वीडियो', 'वायरल क्लिप'] 
    : ['youtube shorts 2026', 'viral shorts', 'trending algorithm', 'yt shorts'];

  const combined = [safe, ...topicKeywords, ...domainKeywords, ...baseSeo];
  return Array.from(new Set(combined)).slice(0, 10);
};

// Generate Topic-Relevant Dynamic Hashtags
export const generateHashtagsOnly = (
  topic: string,
  niche: NicheId
): string[] => {
  const safe = cleanTopic(topic);
  const common = ['#shorts', '#youtubeshorts', '#viral', '#trending', '#explore'];

  // Generate dynamic hashtags directly from topic words
  const topicWords = safe
    .replace(/[^\w\s]/gi, '')
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .map((w) => `#${w.toLowerCase()}`);

  const nicheMap: Record<NicheId, string[]> = {
    tech: ['#techshorts', '#gadgets', '#futuretech', '#technology', '#aitools', '#tipsandtricks'],
    facts: ['#mystery', '#facts', '#mindblowingfacts', '#didyouknow', '#sciencefacts', '#shockingfacts'],
    finance: ['#moneytips', '#investing', '#finance', '#wealth', '#crypto', '#stockmarket'],
    fitness: ['#fitnessmotivation', '#gymlife', '#workout', '#healthylifestyle', '#bodybuilding', '#mindset'],
    story: ['#storytime', '#scarystories', '#suspense', '#thriller', '#truestory', '#creepy'],
    comedy: ['#funny', '#comedy', '#relatable', '#memes', '#humor', '#funnyshorts'],
    lifehacks: ['#lifehacks', '#productivity', '#dailyhacks', '#smarttricks', '#diy', '#useful'],
    gaming: ['#gaming', '#gamer', '#gamingshorts', '#gameplay', '#esports', '#clutch'],
  };

  const nicheSpecific = nicheMap[niche] || nicheMap.tech;
  return Array.from(new Set([...common, ...topicWords.slice(0, 3), ...nicheSpecific])).slice(0, 12);
};

// Generate Tone-Aware, Topic-Driven Catchy Titles
export const generateTitlesOnly = (
  topic: string,
  niche: NicheId,
  tone: ToneId,
  lang: ScriptLanguage
): string[] => {
  const safe = cleanTopic(topic);

  if (lang === 'hi') {
    switch (tone) {
      case 'dramatic':
        return [
          `⚠️ वो खौफनाक सच जो ${safe} के बारे में छुपाया गया था!`,
          `क्या वाकई ऐसा हुआ था? ${safe} का रोंगटे खड़े कर देने वाला रहस्य 😱`,
          `यह सच जानकर किसी के भी होश उड़ जाएंगे: ${safe} की अनसुनी दास्तान!`,
          `गलती से भी इसे नजरअंदाज मत करना! ${safe} का डार्क रियलिटी ⚡`,
          `आखिर क्यों सब डरते हैं? ${safe} के पीछे का असली खेल! #shorts`,
        ];
      case 'energetic':
        return [
          `🔥 10X तेजी से समझो: ${safe} का सुपरफास्ट गेम!`,
          `सिर्फ 30 सेकंड में ${safe} को पूरी तरह मास्टर करो! 🚀`,
          `रुक जाओ! यह 1 ट्रिक ${safe} को हमेशा के लिए बदल देगी! 💥`,
          `तहलका मचाने वाला फॉर्मूला: ${safe} का असली पावर!`,
          `बूम! ${safe} की वो ट्रिक जो कोई प्रो भी नहीं बताएगा! #shorts`,
        ];
      case 'informative':
        return [
          `सरल शब्दों में समझें: ${safe} कैसे काम करता है? 💡`,
          `${safe} के 3 सबसे महत्वपूर्ण नियम जो हर किसी को जानने चाहिए!`,
          `स्टेप-बाय-स्टेप गाइड: ${safe} का बिल्कुल सही तरीका!`,
          `क्या आप जानते हैं? ${safe} के पीछे का पूरा वैज्ञानिक लॉजिक 🧠`,
          `${safe} को समझें सिर्फ 1 मिनट में! आसान और सटीक जानकारी #shorts`,
        ];
      case 'humorous':
        return [
          `😂 जब लोग पहली बार ${safe} करने की कोशिश करते हैं!`,
          `मेरी मम्मी को जब पता चला ${safe} के बारे में... रोना आ गया! 💀`,
          `99% लोग ${safe} में यह बेवकूफी जरूर करते हैं (हंसते-हंसते लोटपोट)`,
          `अपेक्षा vs वास्तविकता: ${safe} का असली तमाशा! 🤣`,
          `भाई मत करो ऐसा! ${safe} का सबसे फनी मोमेंट #shorts`,
        ];
      case 'viral':
      default:
        return [
          `😱 99% लोग ${safe} के बारे में यह भयानक गलती करते हैं!`,
          `यह सीक्रेट जानकर आप चौंक जाएंगे: ${safe} का असली सच 🔥`,
          `क्या आप जानते थे? ${safe} के पीछे का चौंकाने वाला रहस्य 🤯`,
          `तुरंत रोकें यह करना! ${safe} के 3 गुप्त तरीके जो कोई नहीं बताता!`,
          `सिर्फ 20 सेकंड में समझें: ${safe} का असली खेल! #shorts`,
        ];
    }
  }

  if (lang === 'hinglish') {
    switch (tone) {
      case 'dramatic':
        return [
          `⚠️ The Dark Mystery of ${safe} That Nobody Talked About! 😱`,
          `Yeh Sach Jaan Kar Hosh Ud Jayenge: ${safe} Reality Exposed!`,
          `Is Galti Ko Kabhi Mat Dohrana: ${safe} Ka Suspense ⚡`,
          `Kya Sach Me Aisa Hua Tha? The Secret of ${safe} 🤯`,
          `Stop Doing This! ${safe} Ka Khaufnak Sach #Shorts`,
        ];
      case 'energetic':
        return [
          `🔥 10X Fast Master Karo: ${safe} Ka Ultimate Formula!`,
          `Sirf 30 Seconds Me ${safe} Ko Crack Karo! 💥`,
          `Yeh 1 Pro Hack ${safe} Ko Hamesha Ke Liye Badal Dega! 🚀`,
          `Boom! ${safe} Ka Power Hack Jo 99% Log Miss Karte Hain!`,
          `Speed Breakdown: ${safe} In Under 30s! #Shorts`,
        ];
      case 'informative':
        return [
          `Simple Explanation: ${safe} Kaise Kaam Karta Hai? 💡`,
          `Top 3 Rules of ${safe} That Everyone Must Know!`,
          `Step-by-Step Guide: ${safe} Ka Sahi Tarika 🧠`,
          `Kya Aapko Pata Tha? The Science Behind ${safe}!`,
          `Master ${safe} In 30 Seconds (Pure Value) #Shorts`,
        ];
      case 'humorous':
        return [
          `😂 When You Try ${safe} For The Very First Time!`,
          `Expectation vs Reality: ${safe} Ka Asli Tamasha 💀`,
          `99% Log ${safe} Me Yeh Funny Galti Karte Hain! 🤣`,
          `Bhai Yeh Kya Kar Diya? ${safe} Gone Wrong!`,
          `Relatable Moment: ${safe} Ki Sachhai #Shorts`,
        ];
      case 'viral':
      default:
        return [
          `Yeh 1 Mistake Kabhi Mat Karna! ${safe} Reality Exposed 🔥`,
          `99% Log Nahi Jaante: ${safe} Ka Asli Secret 🤯`,
          `Sirf 30 Seconds Me Sikho: ${safe} Ka Pro Trick!`,
          `Kya Aapko Pata Tha? ${safe} Ke Piche Ki Sacchai 😱`,
          `Stop Doing This! ${safe} Will Blow Your Mind #Shorts`,
        ];
    }
  }

  // English
  switch (tone) {
    case 'dramatic':
      return [
        `⚠️ The Terrifying Truth About ${safe} Nobody Warned You About!`,
        `What Really Happened With ${safe}? The Unsolved Story 😱`,
        `Do NOT Ignore This Warning: The Dark Reality of ${safe} ⚡`,
        `The Hidden Files on ${safe} Will Keep You Awake At Night...`,
        `Why Insiders Are Terrified of ${safe} (Watch Till End) #shorts`,
      ];
    case 'energetic':
      return [
        `🔥 10X Your Results With ${safe} In Under 30 Seconds!`,
        `Stop Wasting Time! The Ultimate ${safe} Blueprint 🚀`,
        `This Insane ${safe} Hack Changed Everything (Do This Now) 💥`,
        `Zero to Pro: Master ${safe} Before Everyone Else Catches On!`,
        `Boom! The One ${safe} Secret Top 1% Creators Gatekeep #shorts`,
      ];
    case 'informative':
      return [
        `How ${safe} Actually Works Explained In 30 Seconds 💡`,
        `The 3 Golden Rules of ${safe} You Need To Know In 2026`,
        `Step-by-Step Breakdown: The Correct Way To Approach ${safe} 🧠`,
        `Did You Know This About ${safe}? The Science Explained`,
        `Everything You Need To Know About ${safe} (Simple & Fast) #shorts`,
      ];
    case 'humorous':
      return [
        `😂 Expectation vs Reality: Trying ${safe} For The First Time`,
        `99% of People Fail At ${safe} And It’s Painfully Relatable 💀`,
        `Me Pretending I Understand ${safe} (Do NOT Do This) 🤣`,
        `The Funniest Lie Everyone Believes About ${safe}`,
        `Why Doing ${safe} Is An Absolute Disaster (Until Now) #shorts`,
      ];
    case 'viral':
    default:
      return [
        `The Dark Truth About ${safe} Nobody Is Telling You 😱`,
        `Stop Doing This Immediately! 3 Hacks For ${safe} 🔥`,
        `99% of People Don't Know This Secret About ${safe} 🤯`,
        `I Tested ${safe} So You Don't Have To (Shocking Result)`,
        `Why Everyone Is Wrong About ${safe} (Watch Till End) ⚡`,
      ];
  }
};

// Generate Topic-Driven SEO Description
export const generateDescriptionOnly = (
  topic: string,
  niche: NicheId,
  lang: ScriptLanguage
): string => {
  const safe = cleanTopic(topic);
  const tags = generateHashtagsOnly(safe, niche).slice(0, 6).join(' ');

  if (lang === 'hi') {
    return `🔥 ${safe} के बारे में वो सच जो 99% लोग नहीं जानते! इस वीडियो में हमने स्टेप-बाय-स्टेप समझाया है कि कैसे आप इसका पूरा फायदा उठा सकते हैं और सामान्य गलतियों से बच सकते हैं।

⏱️ वीडियो टाइमलाइन:
0:00 - सबसे बड़ा हुक (The Shocking Hook)
0:08 - मुख्य समस्या और हकीकत
0:20 - वो सीक्रेट ट्रिक जो सब कुछ बदल देगी
0:28 - कॉल-टू-एक्शन और अगला कदम

👉 अगर यह वीडियो मददगार लगा हो तो LIKE करें और ऐसे ही कमाल के वीडियो के लिए चैनल को अभी SUBSCRIBE करें!
💬 कमेंट में बताएं कि क्या आप ${safe} के बारे में यह पहले से जानते थे?

${tags}`;
  }

  if (lang === 'hinglish') {
    return `🔥 ${safe} ke baare me wo secret facts jo 99% log miss kar dete hain! Is quick breakdown me maine step-by-step bataya hai ki kaise aap isse master kar sakte ho.

⏱️ Quick Timestamps:
0:00 - The Stop-Scroll Hook
0:08 - The Real Problem Revealed
0:20 - The Game-Changing Trick
0:28 - CTA & Final Takeaway

👉 Agar video useful laga toh LIKE zaroor karein aur aise hi daily hacks ke liye SUBSCRIBE karein!
💬 Comments me batayein aapka favorite part kaun sa tha?

${tags}`;
  }

  return `🔥 Uncovering the hidden truth about "${safe}" that will completely change how you approach this! Watch till the very end for the game-changing revelation.

⏱️ Timestamps:
0:00 - The Stop-Scroll Hook
0:08 - The Misconception Exposed
0:20 - The Secret Trick Revealed
0:28 - Final Action Step & Loop

👉 If you found value in this breakdown, SMASH the LIKE button and SUBSCRIBE for daily high-retention shorts!
💬 Drop your thoughts down in the comments below!

${tags}`;
};

// Generate Topic-Driven Timed Script Scenes
export const generateScriptScenesOnly = (
  topic: string,
  niche: NicheId,
  tone: ToneId,
  duration: DurationId,
  lang: ScriptLanguage
): ScriptScene[] => {
  const safe = cleanTopic(topic);

  if (duration === '15s') {
    return build15sScript(safe, niche, tone, lang);
  } else if (duration === '60s') {
    return build60sScript(safe, niche, tone, lang);
  }
  // Default: 30s
  return build30sScript(safe, niche, tone, lang);
};

// 15-second ultra hook
const build15sScript = (
  topic: string,
  niche: NicheId,
  tone: ToneId,
  lang: ScriptLanguage
): ScriptScene[] => {
  if (lang === 'hi') {
    return [
      {
        timestamp: '00:00 - 00:04',
        sectionName: '1. द स्क्रॉल-स्टॉपर हुक (0-4s)',
        visual: `कैमरा तेजी से चेहरे की ओर ज़ूम-इन। स्क्रीन पर '${topic}' का बोल्ड लाल वार्निंग टेक्स्ट फ़्लैश होना।`,
        voiceover: `अगर आप ${topic} के बारे में यह नहीं जानते, तो आप अपना बहुत बड़ा नुकसान कर रहे हैं!`,
        onScreenText: `🚨 रुक जाओ! ${topic} की गलती ❌`,
        soundEffect: 'SFX: ज़ोरदार बास ड्रॉप + विनाइल स्क्रैच',
      },
      {
        timestamp: '00:04 - 00:11',
        sectionName: '2. मुख्य सीक्रेट (4-11s)',
        visual: `फ़ास्ट मोशन कट। स्क्रीन पर ${topic} का असली सॉल्यूशन और हाइलाइटेड स्टेप्स दिखना।`,
        voiceover: `असल में, 99% लोग इसे गलत तरीके से करते हैं। सही तरीका सिर्फ एक सिंपल स्टेप है जिसे कोई नोटिस नहीं करता।`,
        onScreenText: `💡 ${topic} का असली सीक्रेट!`,
        soundEffect: 'SFX: डिजिटल हूश + कैमरा क्लिक',
      },
      {
        timestamp: '00:11 - 00:15',
        sectionName: '3. सीमलेस लूप और सीटीए (11-15s)',
        visual: `होस्ट का हाथ सब्सक्राइब बटन की ओर इशारा करता है और वीडियो पहले वाक्य पर स्मूथली लूप हो जाता है।`,
        voiceover: `अपने एक दोस्त को शेयर करो जिसे ${topic} समझना है, और अभी सब्सक्राइब करो!`,
        onScreenText: '🔥 शेयर करें & Subscribe!',
        soundEffect: 'SFX: घंटी की आवाज़ (Bell Ding)',
      },
    ];
  }

  if (lang === 'hinglish') {
    return [
      {
        timestamp: '00:00 - 00:04',
        sectionName: '1. The Stop-Scroll Hook (0-4s)',
        visual: `Aggressive camera punch-in to eyes. Flashing red warning banner with '${topic}'.`,
        voiceover: `Agar aap ${topic} ke bare me yeh nahi jaante, toh aap sabse badi mistake kar rahe ho!`,
        onScreenText: `🚨 STOP! ${topic} Mistake ❌`,
        soundEffect: 'SFX: Heavy bass drop & glitch hit',
      },
      {
        timestamp: '00:04 - 00:11',
        sectionName: '2. The Core Reveal (4-11s)',
        visual: `Rapid split-screen B-roll showing the old way vs the secret method for ${topic}.`,
        voiceover: `Truth yeh hai ki 99% log is secret ko miss kar dete hain. Aur solution sirf 1 click ka hai!`,
        onScreenText: `💡 The ${topic} Secret Revealed`,
        soundEffect: 'SFX: Whoosh transition + cash register or pop',
      },
      {
        timestamp: '00:11 - 00:15',
        sectionName: '3. Seamless Loop & CTA (11-15s)',
        visual: `Creator points directly down to subscribe button, smoothly looping back to line 1.`,
        voiceover: `Doston ko zaroor share karo taaki unka time bache, and subscribe for more tricks!`,
        onScreenText: '🔥 Share with 1 Friend & Subscribe!',
        soundEffect: 'SFX: Ding chime sound',
      },
    ];
  }

  // English 15s
  return [
    {
      timestamp: '00:00 - 00:04',
      sectionName: '1. The Stop-Scroll Hook (0-4s)',
      visual: `Sudden camera punch-in. Shocked reaction with bold flashing red banner: '${topic}'.`,
      voiceover: `If you do NOT know this about ${topic}, you are literally wasting your time!`,
      onScreenText: `🚨 STOP SCROLLING! ${topic} Warning ❌`,
      soundEffect: 'SFX: Deep cinematic boom + vinyl scratch',
    },
    {
      timestamp: '00:04 - 00:11',
      sectionName: '2. The Rapid Breakdown (4-11s)',
      visual: `Split screen demonstration showing the painful mistake vs the effortless shortcut for ${topic}.`,
      voiceover: `Here is the truth: 99% of people fail because they ignore this exact single setting.`,
      onScreenText: `💡 The Exact ${topic} Blueprint`,
      soundEffect: 'SFX: Whip whoosh + digital snap',
    },
    {
      timestamp: '00:11 - 00:15',
      sectionName: '3. CTA & Loop Trap (11-15s)',
      visual: `Host snaps fingers, gestures down to subscribe as audio transitions back to start sentence.`,
      voiceover: `Send this to a friend who needs to hear this about ${topic}, and subscribe right now!`,
      onScreenText: '⚡ Subscribe for daily secrets!',
      soundEffect: 'SFX: High bell chime',
    },
  ];
};

// 30-second standard viral shorts
const build30sScript = (
  topic: string,
  niche: NicheId,
  tone: ToneId,
  lang: ScriptLanguage
): ScriptScene[] => {
  if (lang === 'hi') {
    return [
      {
        timestamp: '00:00 - 00:05',
        sectionName: '1. द स्क्रॉल-स्टॉपर हुक (0-5s)',
        visual: `कैमरा तेजी से ज़ूम-इन। होस्ट सीधे कैमरे में देखते हुए हैरान भाव से '${topic}' का रहस्य उठाता है।`,
        voiceover: `क्या आपको पता है कि ${topic} के बारे में दुनिया का सबसे बड़ा झूठ क्या है? और आप भी इसे सच मान रहे थे!`,
        onScreenText: `😱 ${topic} का सबसे बड़ा झूठ!`,
        soundEffect: 'SFX: विनाइल ब्रेक + हार्टबीट थम्प',
      },
      {
        timestamp: '00:05 - 00:13',
        sectionName: '2. क्यूरियोसिटी बिल्ड-अप (5-13s)',
        visual: `तेज गति वाले कट्स, स्क्रीन पर ग्राफिक्स जो ${topic} से जुड़ी सबसे आम गलतफहमी को दिखाते हैं।`,
        voiceover: `ज्यादातर लोग सोचते हैं कि इसके लिए बहुत मेहनत या पैसे चाहिए। लेकिन हकीकत में, सिस्टम आपको यह कभी नहीं बताना चाहता था।`,
        onScreenText: '❌ 99% लोग यहीं फंसते हैं',
        soundEffect: 'SFX: ड्रामैटिक राइज (Riser effect)',
      },
      {
        timestamp: '00:13 - 00:22',
        sectionName: '3. द माइंड-ब्लोइंग सीक्रेट (13-22s)',
        visual: `लाइव डेमो या स्क्रीन फुटेज। ${topic} के सबसे महत्वपूर्ण हिस्से को पीले सर्कल और एरो से हाइलाइट करना।`,
        voiceover: `ध्यान से देखो: बस आपको इस एक चीज़ को बदलना है। जैसे ही आप इसे फॉलो करते हैं, परिणाम देखकर होश उड़ जाएंगे!`,
        onScreenText: `🔥 ${topic} का 10X फॉर्मूला!`,
        soundEffect: 'SFX: सैटिसफाइंग "क्लिक" + ब्राइट शाइन साउंड',
      },
      {
        timestamp: '00:22 - 00:30',
        sectionName: '4. कॉल टू एक्शन और लूप (22-30s)',
        visual: `मुस्कुराते हुए क्लोज-अप शॉट। नीचे सब्सक्राइब और लाइक एनिमेशन।`,
        voiceover: `क्या आपको ${topic} के बारे में यह पहले से पता था? कमेंट में 'YES' या 'NO' लिखें और चैनल को अभी सब्सक्राइब करें!`,
        onScreenText: '👇 कमेंट में YES या NO लिखें!',
        soundEffect: 'SFX: पॉप साउंड + यूट्यूब बेल आइकन साउंड',
      },
    ];
  }

  if (lang === 'hinglish') {
    return [
      {
        timestamp: '00:00 - 00:05',
        sectionName: '1. The Scroll-Stopper Hook (0-5s)',
        visual: `Fast zoom on creator eyes. Confident, direct tone with an intriguing gesture about '${topic}'.`,
        voiceover: `Kya aapko pata hai ki ${topic} ke bare mein sabse bada jhooth kya hai? Aur aap bhi ispar vishwas kar rahe the!`,
        onScreenText: `😱 The Biggest ${topic} Myth Busted!`,
        soundEffect: 'SFX: Sudden record scratch & heartbeat thud',
      },
      {
        timestamp: '00:05 - 00:13',
        sectionName: '2. Curiosity Build-up (5-13s)',
        visual: `Fast cuts, bold graphics showing the typical mistake people make every single day with ${topic}.`,
        voiceover: `Sabhi sochte hain ki iske liye hours lagte hain ya bohot mushkil hai. But reality is totally opposite!`,
        onScreenText: '❌ Sabse Badi Common Mistake',
        soundEffect: 'SFX: Cinematic rising tension',
      },
      {
        timestamp: '00:13 - 00:22',
        sectionName: '3. The Game-Changing Reveal (13-22s)',
        visual: `Clear screen recording or prop demonstration showing the exact step-by-step fix for ${topic}.`,
        voiceover: `Step simple hai: Sirf is setting ko activate karo, aur results dekhte hi aapka mind blow ho jayega!`,
        onScreenText: `🔥 ${topic} Master Step!`,
        soundEffect: 'SFX: Magic sparkle / digital notification',
      },
      {
        timestamp: '00:22 - 00:30',
        sectionName: '4. CTA & Seamless Audio Loop (22-30s)',
        visual: `Friendly CTA gesture pointing down to comments and the subscribe button.`,
        voiceover: `Aapko yeh pehle pata tha? Comment me YES ya NO likho and follow for daily game-changing hacks!`,
        onScreenText: '👇 Comment YES or NO & Subscribe!',
        soundEffect: 'SFX: Bell notification ding',
      },
    ];
  }

  // English 30s
  return [
    {
      timestamp: '00:00 - 00:05',
      sectionName: '1. The Scroll-Stopper Hook (0-5s)',
      visual: `Aggressive punch zoom right to speaker face. Raised eyebrows, holding up graphics for '${topic}'.`,
      voiceover: `What if I told you that everything you believed about ${topic} is an absolute lie?`,
      onScreenText: `😱 You Have Been Lied To About ${topic}!`,
      soundEffect: 'SFX: Sub bass drop + ominous violin screech',
    },
    {
      timestamp: '00:05 - 00:13',
      sectionName: '2. The Curiosity Build (5-13s)',
      visual: `Rapid 0.8s micro-cuts of people struggling or doing ${topic} the outdated, painful way.`,
      voiceover: `Most people spend hours struggling with this, completely oblivious that top 1% insiders use a secret shortcut.`,
      onScreenText: '❌ What 99% of People Do Wrong',
      soundEffect: 'SFX: Fast ticking clock + riser',
    },
    {
      timestamp: '00:13 - 00:22',
      sectionName: '3. The Golden Insight (13-22s)',
      visual: `Full-screen cinematic demonstration. Green highlight boxes revealing the exact solution for ${topic}.`,
      voiceover: `Here is the trick: Instead of overcomplicating it, just apply this one rule and watch the magic happen.`,
      onScreenText: `✨ The Exact ${topic} Blueprint`,
      soundEffect: 'SFX: Cash register chime / energetic swoosh',
    },
    {
      timestamp: '00:22 - 00:30',
      sectionName: '4. CTA & Endless Loop (22-30s)',
      visual: `Host smiles, taps screen where subscribe button lives, words blend smoothly into opening sentence.`,
      voiceover: `Did this surprise you? Type YES or NO in the comments, and subscribe before this gets taken down!`,
      onScreenText: '👇 Drop YES or NO in comments!',
      soundEffect: 'SFX: Bell ding + sub punch',
    },
  ];
};

// 60-second deep storytelling viral short
const build60sScript = (
  topic: string,
  niche: NicheId,
  tone: ToneId,
  lang: ScriptLanguage
): ScriptScene[] => {
  if (lang === 'hi') {
    return [
      {
        timestamp: '00:00 - 00:08',
        sectionName: '1. पावरफुल विजुअल हुक (0-8s)',
        visual: `रोमांचक म्यूजिक, ब्लैक एंड व्हाइट से कलर में ट्रांजिशन। स्क्रीन पर '${topic}' का अनसुलझा रहस्य।`,
        voiceover: `अगर मैं आपसे कहूं कि ${topic} के बारे में इतिहास का एक ऐसा किस्सा छुपाया गया है, जिसे सुनकर आपके रोंगटे खड़े हो जाएंगे?`,
        onScreenText: `⚠️ चेतावनी: ${topic} का असली सच!`,
        soundEffect: 'SFX: सिनेमाई गूंज (Cinematic Braam)',
      },
      {
        timestamp: '00:08 - 00:22',
        sectionName: '2. पृष्ठभूमि और समस्या (8-22s)',
        visual: `डॉक्यूमेंट्री फुटेज या हाई-क्वालिटी बी-रोल। ${topic} के शुरुआती दिनों का माहौल तैयार करना।`,
        voiceover: `कहानी शुरू होती है जब पहली बार इस रहस्य की खोज की गई। वैज्ञानिक और विशेषज्ञ हैरान रह गए क्योंकि कोई भी लॉजिक काम नहीं कर रहा था।`,
        onScreenText: '📜 अनसुलझा रहस्य...',
        soundEffect: 'SFX: पुराना फिल्म प्रोजेक्टर साउंड + मिस्ट्री बैकग्राउंड म्यूजिक',
      },
      {
        timestamp: '00:22 - 00:38',
        sectionName: '3. सबसे बड़ा ट्विस्ट (22-38s)',
        visual: `तेज कट्स, ज़ूम-इन, अचानक स्क्रीन पर ${topic} का एक चौंकाने वाला सबूत या डॉक्युमेंट दिखना।`,
        voiceover: `लेकिन फिर अचानक एक ऐसी रिपोर्ट सामने आई जिसने सबको हिला कर रख दिया। यह कोई सामान्य घटना नहीं थी, बल्कि सब कुछ पहले से प्लान किया गया था!`,
        onScreenText: '💥 अचानक हुआ सबसे बड़ा खुलासा!',
        soundEffect: 'SFX: ग्लास टूटने की ध्वनि + सस्पेंस थ्रिलर बीट',
      },
      {
        timestamp: '00:38 - 00:50',
        sectionName: '4. सीख और वर्तमान प्रभाव (38-50s)',
        visual: `आज की दुनिया से तुलना। ${topic} के प्रभाव को आधुनिक ग्राफिक्स से समझाना।`,
        voiceover: `और सबसे चौंकाने वाली बात यह है कि आज भी ${topic} का असर हम सभी की ज़िंदगी पर किसी न किसी रूप में हो रहा है।`,
        onScreenText: '👀 क्या आप पर भी इसका असर है?',
        soundEffect: 'SFX: रिवर्स सिंबल राइजर',
      },
      {
        timestamp: '00:50 - 01:00',
        sectionName: '5. क्लोजिंग और एंगेजमेंट लूप (50-60s)',
        visual: `होस्ट दोबारा सामने आता है, दर्शकों से सवाल पूछता है और पार्ट 2 के लिए संकेत देता है।`,
        voiceover: `अगर आपको ${topic} का पार्ट 2 चाहिए तो कमेंट में 'PART 2' लिखें और चैनल को अभी सब्सक्राइब करें!`,
        onScreenText: '🔥 कमेंट में "PART 2" लिखें & Subscribe!',
        soundEffect: 'SFX: सब्सक्राइब बेल आइकन + आउट्रो बीट',
      },
    ];
  }

  if (lang === 'hinglish') {
    return [
      {
        timestamp: '00:00 - 00:08',
        sectionName: '1. Powerful Visual Hook (0-8s)',
        visual: `Dark suspense lighting, punch-in to host holding a mysterious prop related to '${topic}'.`,
        voiceover: `Agar main aapse kahu ki ${topic} ke peeche ek aisi secret story chupi hai jo koi bhi mainstream media nahi bata raha?`,
        onScreenText: `⚠️ WARNING: ${topic} Story Ahead!`,
        soundEffect: 'SFX: Deep cinematic bass hit',
      },
      {
        timestamp: '00:08 - 00:22',
        sectionName: '2. The Backstory Setup (8-22s)',
        visual: `Documentary style B-roll montage with vintage overlay highlighting ${topic}.`,
        voiceover: `Yeh story shuru hoti hai jab sabse pehle is phenomenon ko record kiya gaya. Experts confused the aur koi answer nahi tha!`,
        onScreenText: '📜 The Mystery Begins...',
        soundEffect: 'SFX: Ticking clock and suspense ambiance',
      },
      {
        timestamp: '00:22 - 00:38',
        sectionName: '3. The Unexpected Twist (22-38s)',
        visual: `Glitch effect, red color grade shift, showing the breakthrough evidence for ${topic}.`,
        voiceover: `Lekin tabhi ek aisi discovery hui jisne sab badal diya. Sabko laga tha ki yeh normal hai, but it was completely staged!`,
        onScreenText: '💥 The Shocking Twist Revealed',
        soundEffect: 'SFX: Dramatic glitch + thunder impact',
      },
      {
        timestamp: '00:38 - 00:50',
        sectionName: '4. The Modern Impact (38-50s)',
        visual: `Fast montage bringing ${topic} right back to our present day life.`,
        voiceover: `Aur sabse insane part yeh hai ki aaj bhi ${topic} hum sabko influence kar raha hai without us even realizing it!`,
        onScreenText: '🤯 Are You Being Influenced Right Now?',
        soundEffect: 'SFX: Digital scan / whisper',
      },
      {
        timestamp: '00:50 - 01:00',
        sectionName: '5. Engagement Trap & Outro (50-60s)',
        visual: `Host looks deadpan into camera, inviting debate.`,
        voiceover: `Aapka ${topic} par kya maanna hai? Comment me 'PART 2' likho and hit subscribe for the next chapter!`,
        onScreenText: '👇 Type PART 2 in comments & Subscribe!',
        soundEffect: 'SFX: Loud notification bell',
      },
    ];
  }

  // English 60s
  return [
    {
      timestamp: '00:00 - 00:08',
      sectionName: '1. The Cinematic Hook (0-8s)',
      visual: `Moody spotlight, host whispers intensely into the microphone with a sudden rapid zoom: '${topic}'.`,
      voiceover: `What if the most dangerous secret about ${topic} was hidden in plain sight, and you walk past it every single day?`,
      onScreenText: `⚠️ Do NOT ignore this warning about ${topic}!`,
      soundEffect: 'SFX: Deep subterranean boom + cinematic brass',
    },
    {
      timestamp: '00:08 - 00:22',
      sectionName: '2. The Origin Dilemma (8-22s)',
      visual: `Documentary archival footage with high-contrast text tags for ${topic}.`,
      voiceover: `Back when this first surfaced, top investigators were totally baffled. Every standard hypothesis failed completely.`,
      onScreenText: '📁 Case File Unlocked',
      soundEffect: 'SFX: Shuffling papers + eerie ambient drone',
    },
    {
      timestamp: '00:22 - 00:38',
      sectionName: '3. The Turning Point (22-38s)',
      visual: `Red siren flash, fast-paced kinetic typography pulsing to the tempo of the music.`,
      voiceover: `Until an anonymous insider leaked the exact data. It proved that this was not random chance—it was engineered from day one.`,
      onScreenText: `💥 The Truth About ${topic} Revealed`,
      soundEffect: 'SFX: Sudden gunshot snare + riser drop',
    },
    {
      timestamp: '00:38 - 00:50',
      sectionName: '4. The Payoff & Takeaway (38-50s)',
      visual: `Side-by-side comparison illustrating how ${topic} impacts the viewer right now.`,
      voiceover: `Which brings us to right now: If you master this one lesson about ${topic}, you will stay ten steps ahead of everyone else.`,
      onScreenText: '⚡ How To Protect Yourself Today',
      soundEffect: 'SFX: Sci-fi power-up sound',
    },
    {
      timestamp: '00:50 - 01:00',
      sectionName: '5. Call-to-Action & Loop (50-60s)',
      visual: `Host smiles confidently, points down, music resolves smoothly.`,
      voiceover: `Do you want Part 2 on ${topic}? Drop a comment with 'PART 2' and subscribe right now so you do not miss it!`,
      onScreenText: '👇 Comment "PART 2" & Subscribe!',
      soundEffect: 'SFX: Bell notification + riser stop',
    },
  ];
};

// Main generator export
export const generateShortsScript = (params: GenerationParams): ShortsScript => {
  const { topic, niche, tone, duration, scriptLang } = params;
  const safeTopic = cleanTopic(topic);

  const titles = generateTitlesOnly(safeTopic, niche, tone, scriptLang);
  const description = generateDescriptionOnly(safeTopic, niche, scriptLang);
  const hashtags = generateHashtagsOnly(safeTopic, niche);
  const keywords = generateKeywordsOnly(safeTopic, niche, scriptLang);
  const scenes = generateScriptScenesOnly(safeTopic, niche, tone, duration, scriptLang);

  return {
    id: 'script_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    topic: safeTopic,
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
  };
};
