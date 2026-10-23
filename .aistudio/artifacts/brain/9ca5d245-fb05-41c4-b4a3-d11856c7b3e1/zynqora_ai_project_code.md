# Zynqora AI · Complete Project & Android Studio Package

Welcome to the full project export for **Zynqora AI** — the all-in-one AI creation studio featuring 17 AI tools, AI Chat, Shorts Generator, dual **Hindi (हिंदी)** and **English** language support, and a complete **Native Android Project (`/android`)** configured with Capacitor for Google Play Store release.

---

## 📦 Download ZIP Package

The complete project has been bundled into a ready-to-run ZIP archive containing all project files, configuration, native Android Studio project, and components:

- **ZIP File Name:** `zynqora-ai-project.zip` (~647 KB)
- **Package ID:** `com.zynqora.ai`
- **Location in Artifacts:**
  - `zynqora-ai-project.zip` (Downloadable ZIP archive)
  - `zynqora_ai_code_export.html` (Interactive Web Viewer with 1-click **Download ZIP** button & code browser)

---

## 🗂️ Full Project File Tree

```
zynqora-ai/
├── capacitor.config.ts              # Capacitor 8 config (appId: com.zynqora.ai, webDir: dist)
├── .env.example                     # Environment template
├── .gitignore                       # Git ignore rules
├── index.html                       # HTML5 entry point with Outfit & Plus Jakarta Sans fonts
├── metadata.json                    # AI Studio applet metadata & capabilities
├── package.json                     # Dependencies (@capacitor/core, @capacitor/android, etc.)
├── server.ts                        # Production Express server with dynamic PORT
├── tsconfig.json                    # TypeScript compiler configuration
├── vite.config.ts                   # Vite 8 + Tailwind CSS 4 configuration
│
├── android/                         # COMPLETE NATIVE ANDROID PROJECT (Android Studio ready)
│   ├── build.gradle                 # Root project Gradle build script
│   ├── settings.gradle              # Gradle module settings
│   ├── variables.gradle             # Android SDK definitions (minSdk 24, targetSdk 36, compileSdk 36)
│   ├── gradlew                      # Linux / macOS Gradle wrapper script
│   ├── gradlew.bat                  # Windows Gradle wrapper batch script
│   ├── gradle/wrapper/              # Gradle wrapper runtime binaries
│   └── app/
│       ├── build.gradle             # App module build script (applicationId: com.zynqora.ai)
│       ├── proguard-rules.pro       # Release ProGuard rules
│       └── src/main/
│           ├── AndroidManifest.xml  # Configured with INTERNET, RECORD_AUDIO, MODIFY_AUDIO permissions
│           ├── java/com/zynqora/ai/
│           │   └── MainActivity.java# BridgeActivity entry point
│           ├── res/                 # App icons, colors.xml (Zynqora purple), styles, strings
│           └── assets/public/       # Pre-bundled, production-ready web assets (HTML/JS/CSS)
│
└── src/                             # Complete Web App Source Code
    ├── main.tsx                     # React 19 root with ErrorBoundary mounting
    ├── App.tsx                      # Root component, navigation state, language toggle
    ├── index.css                    # Tailwind CSS 4 setup, typography & purple glow theme
    ├── types.ts                     # TypeScript definitions for all 17 AI Studio tools
    ├── utils/
    │   └── storage.ts               # Resilient storage & safe clipboard helpers
    ├── data/
    │   └── translations.ts          # Complete English & Hindi (हिंदी) dictionary
    ├── services/
    │   ├── shortsGenerator.ts       # Topic-driven viral Shorts script generator
    │   └── chatEngine.ts            # Bilingual conversational AI assistant engine
    └── components/
        ├── Navbar.tsx               # Top navigation bar with branding & language switch
        ├── BottomNav.tsx            # Mobile-friendly bottom navigation bar
        ├── HomeScreen.tsx           # Home dashboard with quick launchers & statistics
        ├── ToolsDashboard.tsx       # 17 interactive AI tool category cards with search & filters
        ├── ChatScreen.tsx           # Interactive AI Chat with copy & quick prompt chips
        ├── ShortsGeneratorScreen.tsx# YouTube Shorts creator studio with 5 generation modes
        ├── SavedScriptsScreen.tsx   # Saved library with preview, copy, and teleprompter
        ├── TeleprompterModal.tsx    # Distraction-free teleprompter for recording
        ├── Toast.tsx                # Non-intrusive floating feedback notification
        ├── ErrorBoundary.tsx        # React error boundary for runtime protection
        └── tools/                   # Dedicated interfaces for all 17 AI Tools:
            ├── TextToVideoScreen.tsx
            ├── ImageToVideoScreen.tsx
            ├── TextToImageScreen.tsx
            ├── ImageEditorScreen.tsx
            ├── VoiceTtsScreen.tsx
            ├── SpeechToTextScreen.tsx
            ├── ShortsReelsMakerScreen.tsx
            ├── ScriptStoryGenScreen.tsx
            ├── ThumbnailLogoMakerScreen.tsx
            ├── BackgroundRemoverScreen.tsx
            ├── MusicSfxScreen.tsx
            ├── TemplatesScreen.tsx
            ├── TranslatorSummarizerScreen.tsx
            ├── PdfAssistantScreen.tsx
            ├── CodeAssistantScreen.tsx
            └── SavedProjectsScreen.tsx
```

---

## 📱 How to Open & Build for Android and Google Play Store

### 1. Open in Android Studio
1. Unzip `zynqora-ai-project.zip`.
2. Open **Android Studio**.
3. Click **Open** (or **File > Open**) and select the `android/` directory inside the extracted project.
4. Android Studio will automatically index the project and sync Gradle.

### 2. Run on an Emulator or Physical Device
- Connect an Android device with USB debugging enabled, or launch an Android Virtual Device (AVD).
- Click the green **Run 'app'** button (`Shift + F10`) to build and install.

### 3. Generate APK / AAB for Google Play Store
- **In Android Studio UI:**
  1. Go to **Build > Generate Signed Bundle / APK**.
  2. Select **Android App Bundle (.aab)** for Google Play Store submission (or **APK** for direct testing).
  3. Create or select your keystore, set key passwords, and select `release`.
  4. Android Studio will generate the signed `.aab` file ready to upload to the **Google Play Console**.
- **Via Command Line:**
  ```bash
  cd android
  ./gradlew assembleDebug      # Builds debug APK in app/build/outputs/apk/debug/
  ./gradlew bundleRelease      # Builds release AAB in app/build/outputs/bundle/release/
  ```

---

## 💻 How to Run the Web App Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Sync web updates into Android:**
   Whenever you make web changes, run:
   ```bash
   npm run build
   npx cap sync android
   ```
   This automatically updates the native Android assets in `android/app/src/main/assets/public`.

---

All project files and the native Android project are packaged and ready to download in the Artifacts tab.
