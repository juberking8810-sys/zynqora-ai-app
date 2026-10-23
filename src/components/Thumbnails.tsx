import React from 'react';

// 1. Knight Cat: Armored fantasy cat warrior with glowing purple crystal broadsword in mystical fog
export const KnightCatThumbnail: React.FC = () => (
  <svg viewBox="0 0 320 180" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="kcBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a0c33" />
        <stop offset="50%" stopColor="#0c071d" />
        <stop offset="100%" stopColor="#05030a" />
      </linearGradient>
      <radialGradient id="kcMoon" cx="65%" cy="30%" r="50%">
        <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0.9" />
        <stop offset="40%" stopColor="#9333ea" stopOpacity="0.4" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="swordGlow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="40%" stopColor="#c084fc" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
    <rect width="320" height="180" fill="url(#kcBg)" />
    <circle cx="210" cy="55" r="70" fill="url(#kcMoon)" />
    {/* Mystical forest silhouetted trees */}
    <path d="M10 180 L35 70 L60 180 Z M65 180 L90 85 L115 180 Z M220 180 L250 65 L280 180 Z M270 180 L295 90 L320 180 Z" fill="#090514" opacity="0.8" />
    {/* Mist particles */}
    <ellipse cx="160" cy="155" rx="140" ry="25" fill="#7c3aed" opacity="0.25" />
    {/* Knight Cat Silhouette with Armor & Cloak */}
    <g transform="translate(130, 50)">
      {/* Cape */}
      <path d="M-15 45 C-30 65 -25 95 -10 110 L15 110 C30 95 25 65 10 45 Z" fill="#4c1d95" />
      {/* Armor Body */}
      <path d="M-12 40 L12 40 L16 85 L-16 85 Z" fill="#64748b" stroke="#a855f7" strokeWidth="1.5" />
      {/* Cat Head Helmet */}
      <path d="M-18 20 L-22 2 L-10 12 L10 12 L22 2 L18 20 C22 35 -22 35 -18 20 Z" fill="#475569" stroke="#cbd5e1" strokeWidth="1.5" />
      {/* Cat Ears */}
      <polygon points="-22,2 -10,12 -16,14" fill="#a855f7" />
      <polygon points="22,2 10,12 16,14" fill="#a855f7" />
      {/* Glowing Cat Eyes */}
      <ellipse cx="-7" cy="22" rx="3" ry="4" fill="#38bdf8" />
      <ellipse cx="7" cy="22" rx="3" ry="4" fill="#38bdf8" />
      <circle cx="-7" cy="22" r="1.5" fill="#ffffff" />
      <circle cx="7" cy="22" r="1.5" fill="#ffffff" />
      {/* Glowing Purple Sword */}
      <g transform="translate(28, 20) rotate(-15)">
        <rect x="-2" y="0" width="4" height="70" fill="url(#swordGlow)" rx="1.5" />
        <rect x="-8" y="55" width="16" height="3" fill="#cbd5e1" />
        <circle cx="0" cy="72" r="3" fill="#a855f7" />
      </g>
    </g>
    {/* Floating magical sparks */}
    <circle cx="120" cy="95" r="1.5" fill="#e9d5ff" opacity="0.8" />
    <circle cx="180" cy="80" r="2" fill="#c084fc" opacity="0.9" />
    <circle cx="195" cy="115" r="1.5" fill="#38bdf8" opacity="0.7" />
  </svg>
);

// 2. Night Drive: Futuristic supercar speeding down neon rainy cyberpunk highway
export const NightDriveThumbnail: React.FC = () => (
  <svg viewBox="0 0 320 180" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ndSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#080314" />
        <stop offset="60%" stopColor="#1e0b36" />
        <stop offset="100%" stopColor="#0d0517" />
      </linearGradient>
      <linearGradient id="roadLine" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#c084fc" stopOpacity="0.9" />
      </linearGradient>
      <linearGradient id="neonLight" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="50%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    <rect width="320" height="180" fill="url(#ndSky)" />
    {/* Distant Cyberpunk Skyscrapers */}
    <rect x="20" y="45" width="25" height="70" fill="#0c071d" />
    <rect x="50" y="30" width="30" height="85" fill="#140a2a" />
    <rect x="85" y="55" width="20" height="60" fill="#0c071d" />
    <rect x="220" y="25" width="35" height="90" fill="#170c32" />
    <rect x="260" y="40" width="28" height="75" fill="#0e0720" />
    {/* Grid perspective road */}
    <polygon points="120,110 200,110 320,180 0,180" fill="#090514" />
    {/* Neon Speed Lines */}
    <line x1="160" y1="110" x2="160" y2="180" stroke="url(#roadLine)" strokeWidth="3" />
    <line x1="140" y1="115" x2="70" y2="180" stroke="#f43f5e" strokeWidth="2" opacity="0.6" />
    <line x1="180" y1="115" x2="250" y2="180" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />
    {/* Futuristic Supercar Rear View */}
    <g transform="translate(160, 142)">
      {/* Car chassis */}
      <path d="M-45 15 L-35 -5 L-20 -15 L20 -15 L35 -5 L45 15 Z" fill="#110d21" stroke="#3b1d6b" strokeWidth="1.5" />
      {/* Rear windshield */}
      <polygon points="-18,-13 18,-13 25,-4 -25,-4" fill="#06020d" />
      {/* Glowing Full-width Cyberpunk Tail Light */}
      <rect x="-42" y="6" width="84" height="4" rx="2" fill="url(#neonLight)" className="shadow-[0_0_15px_#f43f5e]" />
      {/* Twin Exhaust Blue Flame */}
      <ellipse cx="-20" cy="18" rx="6" ry="2" fill="#38bdf8" />
      <ellipse cx="20" cy="18" rx="6" ry="2" fill="#38bdf8" />
      {/* Wet Road Reflection */}
      <ellipse cx="0" cy="24" rx="40" ry="6" fill="#a855f7" opacity="0.4" />
    </g>
  </svg>
);

// 3. Talking Snake: Iridescent emerald serpent talking with expressive animated mouth & purple aura
export const TalkingSnakeThumbnail: React.FC = () => (
  <svg viewBox="0 0 320 180" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="tsBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0a051d" />
        <stop offset="50%" stopColor="#051a14" />
        <stop offset="100%" stopColor="#070412" />
      </linearGradient>
      <radialGradient id="tsAura" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="scales" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#059669" />
        <stop offset="40%" stopColor="#10b981" />
        <stop offset="80%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
    </defs>
    <rect width="320" height="180" fill="url(#tsBg)" />
    <circle cx="160" cy="90" r="90" fill="url(#tsAura)" />
    {/* Coiled Serpent Body */}
    <path
      d="M80 160 C90 120 120 130 140 150 C160 170 200 160 220 130 C240 100 230 65 195 50 C160 35 130 60 125 90 C120 115 140 130 160 120 C180 110 185 85 180 75"
      fill="none"
      stroke="url(#scales)"
      strokeWidth="24"
      strokeLinecap="round"
    />
    {/* Talking Serpent Head */}
    <g transform="translate(175, 65)">
      {/* Head Crest */}
      <ellipse cx="12" cy="0" rx="20" ry="14" fill="#059669" stroke="#34d399" strokeWidth="1.5" />
      {/* Expressive Talking Mouth (open jaw) */}
      <path d="M18 4 Q28 6 34 2" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
      <path d="M22 6 L30 12 L20 10 Z" fill="#fb7185" />
      {/* Forked Tongue emitting soundwaves */}
      <path d="M30 6 L42 5 L46 2 M42 5 L46 8" stroke="#f43f5e" strokeWidth="1.5" fill="none" />
      {/* Glowing Purple Crown Jewel / Eye */}
      <circle cx="16" cy="-4" r="4.5" fill="#c084fc" />
      <circle cx="16" cy="-4" r="2.5" fill="#ffffff" />
      {/* Soundwave particles */}
      <circle cx="48" cy="1" r="1.5" fill="#34d399" opacity="0.9" />
      <circle cx="56" cy="-3" r="2" fill="#a855f7" opacity="0.8" />
      <circle cx="64" cy="5" r="1.5" fill="#34d399" opacity="0.7" />
    </g>
  </svg>
);

// 4. Lion: Majestic golden lion roaring on savanna rock outcrop during crimson purple sunset
export const LionThumbnail: React.FC = () => (
  <svg viewBox="0 0 320 180" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lionSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4a044e" />
        <stop offset="35%" stopColor="#701a75" />
        <stop offset="70%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#1e1b4b" />
      </linearGradient>
      <radialGradient id="sunsetSun" cx="60%" cy="50%" r="40%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="35%" stopColor="#f59e0b" />
        <stop offset="85%" stopColor="#b45309" stopOpacity="0.2" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="maneGlow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
    </defs>
    <rect width="320" height="180" fill="url(#lionSky)" />
    <circle cx="190" cy="90" r="70" fill="url(#sunsetSun)" />
    {/* Savanna Acacia Tree Silhouette in distance */}
    <path d="M50 140 L52 110 Q50 95 35 90 Q65 85 75 95 L56 110 L60 140 Z" fill="#180b2a" opacity="0.7" />
    <ellipse cx="48" cy="85" rx="30" ry="8" fill="#180b2a" opacity="0.8" />
    {/* Rocky Outcrop Ridge */}
    <polygon points="0,180 80,130 180,120 250,140 320,180" fill="#0f071e" />
    {/* Roaring Lion Silhouette & Golden Mane */}
    <g transform="translate(130, 75)">
      {/* Lion Body and haunches */}
      <path d="M-30 45 Q-15 35 10 35 L40 50 L-30 50 Z" fill="#160829" />
      {/* Lion Head & Roar Mane */}
      <path
        d="M-5 15 C-25 -5 -15 -25 15 -25 C45 -25 55 5 35 30 C20 45 -5 40 -5 15 Z"
        fill="url(#maneGlow)"
        stroke="#fef08a"
        strokeWidth="1"
      />
      {/* Open Roaring Mouth */}
      <polygon points="35,0 52,2 45,18 32,8" fill="#450a0a" />
      <polygon points="36,1 42,2 38,5" fill="#ffffff" />
      <polygon points="38,15 44,12 40,9" fill="#ffffff" />
      {/* Lion Golden Eye */}
      <circle cx="28" cy="-5" r="2.5" fill="#fde047" />
    </g>
    {/* Floating sunset embers */}
    <circle cx="170" cy="65" r="1.5" fill="#fde047" opacity="0.8" />
    <circle cx="220" cy="75" r="2" fill="#fb923c" opacity="0.9" />
    <circle cx="140" cy="105" r="1.5" fill="#fde047" opacity="0.7" />
  </svg>
);
