import { AppLanguage } from '../types';

interface DemoQueryPattern {
  keywords: string[];
  responseEn: string;
  responseHi: string;
}

const KNOWLEDGE_BASE: DemoQueryPattern[] = [
  {
    keywords: ['idea', 'topic', 'suggest', 'shorts', 'youtube', 'viral', 'niche', 'आइडिया', 'टॉपिक', 'यूट्यूब'],
    responseEn: `Here are 5 High-Retention YouTube Shorts ideas designed for 2026:

1. **"The 1% Phone Setting":**
   • *Hook:* "If you own an iPhone or Android, check this setting before someone hacks you!"
   • *Angle:* Reveal a little-known privacy or battery optimization toggle.
   • *Target Retention:* 85%+

2. **"The Illusion of Choice (Psychology Trick)":**
   • *Hook:* "Supermarkets use this secret psychological trick to make you spend 30% more."
   • *Angle:* The Decoy Effect explained in 35 seconds with shelf examples.

3. **"Artificial Intelligence in 2026":**
   • *Hook:* "You won't believe what AI can do in under 5 seconds right now."
   • *Angle:* Quick montage of instant image/video/code generation.

4. **"3 Money Mistakes Everyone Makes in Their 20s":**
   • *Hook:* "If you keep all your money in a savings account, you are literally losing cash every second."
   • *Angle:* Inflation vs index funds in simple visuals.

5. **"The Paradox of Time Travel":**
   • *Hook:* "If you went back in time and stopped your grandparents, would you disappear?"
   • *Angle:* The Grandfather Paradox with an audio cliffhanger.

💡 *Pro-Tip:* Switch to the **Shorts Generator** tab in Zynqora to turn any of these ideas into a complete script with visual cues, titles, and hashtags!`,

    responseHi: `यूट्यूब शॉर्ट्स के लिए 5 सुपर-वायरल और हाई-रिटेंशन आइडियाज:

1. **"स्मार्टफोन की सीक्रेट सेटिंग":**
   • *हुक:* "अगर आपके पास स्मार्टफोन है, तो अभी इस सेटिंग को चेक करो वरना बड़ा नुकसान हो सकता है!"
   • *एंगल:* प्राइवेसी या बैटरी बचाने वाला गुप्त फीचर 30 सेकंड में दिखाएं।

2. **"सुपरमार्केट का माइंड गेम (साइकोलॉजी ट्रिक)":**
   • *हुक:* "दुकानदार आपको 30% ज्यादा सामान खरीदने पर मजबूर करने के लिए यह चालाकी करते हैं!"
   • *एंगल:* डेकोय इफ़ेक्ट (Decoy Effect) को सरल उदाहरण से समझाएं।

3. **"₹500 से वेल्थ क्रिएशन का सच":**
   • *हुक:* "अगर आप सारा पैसा सिर्फ बैंक सेविंग्स में रख रहे हैं, तो आप असल में हर दिन गरीब हो रहे हैं!"
   • *एंगल:* इंफ्लेशन और कंपाउंडिंग का जादू 40 सेकंड में।

4. **"स्पेस का सबसे डरावना रहस्य":**
   • *हुक:* "अंतरिक्ष में एक ऐसा ब्लैक होल है जो हमारी पृथ्वी को निगल सकता है!"
   • *एंगल:* सस्पेंस म्यूजिक और 3D विजुअल्स के साथ रोमांचक कहानी।

5. **"स्टूडेंट्स के लिए 3 सीक्रेट AI टूल्स":**
   • *हुक:* "अगर आप यह 2 टूल्स इस्तेमाल नहीं कर रहे, तो आप 5 घंटे का काम 5 मिनट में करने से चूक रहे हैं!"

💡 *सलाह:* ऊपर **शॉर्ट्स जनरेटर** टैब पर जाएं और इनमें से किसी भी टॉपिक की संपूर्ण हिंदी स्क्रिप्ट और वायरल टाइटल्स तुरंत प्राप्त करें!`
  },
  {
    keywords: ['hook', '3 second', 'stop scroll', 'retention', 'हुक', 'स्क्रॉल', 'रोकने'],
    responseEn: `### The "Scroll-Stopper" Hook Blueprint (First 3 Seconds)

On YouTube Shorts, **70% of viewers swipe away within the first 2.5 seconds** unless you trigger an involuntary dopamine pause. Here is the 3-step formula:

1. **Visual Shock (Frame 0–1):**
   • Never start with "Hey guys, welcome back..."
   • Start with motion: Camera punch-in, hand gesture, or an unexpected prop in front of the lens.

2. **The Curiosity Gap (Seconds 1–3):**
   • Use tension words: *"Nobody talks about this..."*, *"Stop doing this immediately"*, *"I spent 7 days doing X so you don't have to."*
   • Create cognitive dissonance: Say something that contradicts common belief.

3. **Audio Glitch / Bass Drop:**
   • Pair the opening line with a deep cinematic thud or needle scratch. Sound accounts for 50% of the hook!

⚡ Try generating a script in the **Shorts Generator** tab to see timed hook scenes in action.`,

    responseHi: `### स्क्रॉल रोकने वाले '3-सेकंड हुक' का अचूक फॉर्मूला

यूट्यूब शॉर्ट्स में **70% दर्शक शुरुआती 2.5 सेकंड में स्वाइप कर देते हैं**। उन्हें बांधने के लिए यह 3 नियम अपनाएं:

1. **विजुअल सरप्राइज (0 से 1 सेकंड):**
   • कभी भी "हेलो दोस्तों, स्वागत है..." से शुरुआत न करें!
   • स्क्रीन पर तुरंत मोशन, ज़ूम-इन या कोई अजीब वस्तु दिखाएं।

2. **जिज्ञासा पैदा करना (1 से 3 सेकंड):**
   • ऐसी लाइन बोलें जो आम सोच के विपरीत हो: *"अगर आप यह गलती कर रहे हैं, तो तुरंत रुक जाइए!"*, *"99% लोग इसका गलत मतलब निकालते हैं!"*
   • मन में एक सवाल छोड़ दें जिसका जवाब सिर्फ वीडियो के अंत में मिले।

3. **साउंड इफ़ेक्ट का इस्तेमाल:**
   • पहली लाइन के साथ डीप बास ड्रॉप (Bass Drop) या ग्लिच साउंड जोड़ें। 

⚡ Zynqora के **शॉर्ट्स जनरेटर** में जाकर किसी भी विषय का धमाकेदार हुक अभी तैयार करें!`
  },
  {
    keywords: ['quantum', 'computing', 'quantum computing', 'क्वांटम', 'कंप्यूटिंग'],
    responseEn: `### Quantum Computing Explained in 60 Seconds

Imagine an ordinary light switch: it can either be **OFF (0)** or **ON (1)**. That is how traditional computers process data using regular "bits".

Now imagine a **spinning coin**:
• While it is spinning on the table, is it heads or tails? It is actually a blur of **both at the same time**!
• That is called **Superposition**, and that is how a **Qubit** (quantum bit) works.

Because qubits can be in multiple states simultaneously, a quantum computer can explore millions of possibilities at once instead of testing them one by one.

**Why does this matter?**
• Problems that would take today's supercomputers **10,000 years** to solve (like discovering new medicines or unbreakable encryption) can be solved by a quantum computer in **minutes**!`,

    responseHi: `### क्वांटम कंप्यूटिंग को समझें 60 सेकंड में

कल्पना करें कि आपके घर का लाइट स्विच है: वह या तो **बंद (0)** हो सकता है या **चालू (1)**। हमारे सामान्य कंप्यूटर इसी तरह 'Bits' पर काम करते हैं।

अब एक **घूमते हुए सिक्के (Spinning Coin)** की कल्पना करें:
• जब सिक्का टेबल पर तेजी से घूम रहा होता है, तो क्या वह हेड्स है या टेल्स? वह एक ही समय में **दोनों की स्थिति में** होता है!
• इसे विज्ञान में **सुपरपोजिशन (Superposition)** कहा जाता है, और क्वांटम कंप्यूटर का 'क्यूबिट' (Qubit) इसी सिद्धांत पर काम करता है।

**यह इतना शक्तिशाली क्यों है?**
• आज के सबसे तेज सुपरकंप्यूटर को जिस जटिल गणना (जैसे नई दवाओं की खोज या मौसम का सटीक अनुमान) को हल करने में **10,000 साल** लगेंगे, उसे क्वांटम कंप्यूटर कुछ ही **मिनटों** में हल कर सकता है!`
  },
  {
    keywords: ['algorithm', 'time', 'upload', 'seo', 'views', 'viral', 'एल्गोरिदम', 'समय', 'अपलोड', 'व्यूज'],
    responseEn: `### YouTube Shorts Algorithm Mastery: 4 Key Metrics

1. **Viewed vs. Swiped Away Ratio (Target: >75%)**:
   • If out of 100 people who see your Short, 75 choose to watch instead of swipe, YouTube will instantly push it to thousands more.

2. **Average Percentage Viewed (Target: >100%)**:
   • The secret is the **Audio Loop**. Make the final sentence seamlessly connect into the very first line of the video so viewers watch it twice without noticing!

3. **Best Upload Times**:
   • Weekdays: 12:00 PM - 2:00 PM and 6:00 PM - 9:00 PM (Local creator audience time)
   • Weekends: 9:00 AM - 11:00 AM

4. **Consistency**:
   • Posting 1 to 2 high-retention Shorts daily yields exponentially faster growth than posting 5 low-effort clips.`,

    responseHi: `### यूट्यूब शॉर्ट्स एल्गोरिदम और वायरल होने के 4 नियम

1. **व्यूड बनाम स्वाइप रेश्यो (Target: >75%)**:
   • अगर 100 लोगों के सामने आपका शॉर्ट आया और 75+ लोगों ने उसे देखा (स्वाइप नहीं किया), तो एल्गोरिदम वीडियो को लाखों लोगों तक पहुंचाएगा।

2. **ऑडियंस रिटेंशन (Target: >100%)**:
   • इसके लिए **सीमलेस ऑडियो लूप (Audio Loop)** अपनाएं। वीडियो की आखिरी लाइन को पहली लाइन से ऐसे जोड़ें कि दर्शक को पता ही न चले कि वीडियो दोबारा शुरू हो गया!

3. **अपलोड करने का सबसे अच्छा समय**:
   • दोपहर 12:00 बजे से 2:00 बजे के बीच (लंच ब्रेक टाइम)
   • शाम 6:00 बजे से रात 9:00 बजे के बीच (पीक मोबाइल ट्रैफिक)

4. **SEO टाइटल और हैशटैग्स**:
   • हमेशा 3 प्रासंगिक हैशटैग्स (#shorts, नीश टैग) और एक जिज्ञासा भरा टाइटल रखें। Zynqora का **शॉर्ट्स जनरेटर** इसमें आपकी पूरी मदद करता है!`
  }
];

export const getAiChatResponse = async (
  userMessage: string,
  appLang: AppLanguage
): Promise<string> => {
  const query = userMessage.toLowerCase().trim();

  // Check matching patterns
  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some((k) => query.includes(k.toLowerCase()))) {
      return appLang === 'hi' ? item.responseHi : item.responseEn;
    }
  }

  // Check if query is in Hindi characters
  const isHindiText = /[\u0900-\u097F]/.test(userMessage);

  if (isHindiText || appLang === 'hi') {
    return `नमस्ते! आपका प्रश्न: "${userMessage}" बहुत ही रोचक है। 

Zynqora AI के अनुसार:
1. **मुख्य बिंदु:** किसी भी रचनात्मक कार्य या यूट्यूब कंटेंट में स्पष्टता और ऑडियंस की दिलचस्पी सबसे अहम होती है।
2. **रणनीति:** अपने विचार को छोटे-छोटे चरणों में विभाजित करें। अगर आप वीडियो बना रहे हैं, तो पहले 3 सेकंड में हुक और अंत में एक मजबूत कॉल-टू-एक्शन (CTA) रखें।
3. **अगला कदम:** आप हमारे **"शॉर्ट्स जनरेटर"** टूल का उपयोग करके इस विषय पर तुरंत वायरल स्क्रिप्ट, टाइटल्स और हैशटैग्स बना सकते हैं!

क्या आप चाहते हैं कि मैं इस विषय पर एक उदाहरण स्क्रिप्ट या कुछ और पॉइंट्स विस्तार से लिखूं? बेझिझक पूछें!`;
  }

  // Default English contextual response
  return `Thank you for your question: "${userMessage}"!

Here is the Zynqora AI creative breakdown:
1. **Core Concept:** To make this stand out, focus on high-impact clarity and emotional resonance with your audience.
2. **Actionable Strategy:** Break this down into 3 concise stages: the grab (hook), the substance (value delivery), and the payoff (clear takeaway or call-to-action).
3. **Creator Suggestion:** You can head over to our **Shorts Generator** tab to instantly generate ready-to-record scripts, high-CTR titles, and viral hashtags around this topic.

Would you like me to expand this into specific video hooks, an outline, or explore related ideas? Let me know!`;
};
