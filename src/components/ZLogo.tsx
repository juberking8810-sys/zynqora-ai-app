import React from 'react';

interface ZLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ZLogo: React.FC<ZLogoProps> = ({ size = 'md', className = '' }) => {
  // Dimension definitions
  const sizeMap = {
    sm: { box: 'w-8 h-8', z: 18, glow: 'shadow-[0_0_15px_rgba(168,85,247,0.4)]' },
    md: { box: 'w-10 h-10', z: 22, glow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]' },
    lg: { box: 'w-20 h-20', z: 46, glow: 'shadow-[0_0_35px_rgba(168,85,247,0.65)]' },
    xl: { box: 'w-28 h-28', z: 64, glow: 'shadow-[0_0_50px_rgba(168,85,247,0.8)]' },
  };

  const { box, z, glow } = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Outer ambient blur aura */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-tr from-purple-700 via-fuchsia-500 to-indigo-500 opacity-70 blur-xl animate-pulse pointer-events-none`}
        style={{ transform: 'scale(1.15)' }}
      />

      {/* Main circular capsule */}
      <div
        className={`relative ${box} rounded-full bg-gradient-to-b from-[#2b1055] via-[#160a30] to-[#0d071a] border-2 border-purple-400/50 flex items-center justify-center ${glow} transition-transform hover:scale-105 overflow-hidden`}
      >
        {/* Subtle inner radial light shine */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(216,180,254,0.35),transparent_65%)] pointer-events-none" />

        {/* Premium Geometric Z Mark */}
        <svg
          width={z}
          height={z}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-[0_2px_8px_rgba(168,85,247,0.9)]"
        >
          <defs>
            <linearGradient id="zGradPrimary" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#E9D5FF" />
              <stop offset="70%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="zGlowAccent" x1="100" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="50%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
            <filter id="neonBloom" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background glowing facet */}
          <path
            d="M20 22 L80 22 L34 78 L80 78 L76 86 L18 86 L64 30 L20 30 Z"
            fill="url(#zGlowAccent)"
            opacity="0.5"
            transform="translate(2, 2)"
          />

          {/* Main razor-sharp Z */}
          <path
            d="M18 20 L82 20 L36 78 L82 78 L78 86 L18 86 L64 28 L18 28 Z"
            fill="url(#zGradPrimary)"
            filter="url(#neonBloom)"
          />

          {/* Top highlight bar */}
          <path
            d="M22 21 L80 21 L74 27 L28 27 Z"
            fill="#FFFFFF"
            opacity="0.85"
          />

          {/* Central spark accent */}
          <circle cx="50" cy="50" r="3" fill="#FFFFFF" className="animate-ping opacity-75" />
          <circle cx="50" cy="50" r="2" fill="#FFFFFF" />
        </svg>
      </div>
    </div>
  );
};
