import React from 'react';

interface FloodGridBrandLogoProps {
  className?: string;
  variant?: 'full' | 'mark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * High-fidelity vector recreation of the official FloodGrid logo:
 * - Top half: Solid deep midnight navy bold block typography ("FLOODGRID")
 * - Center dividing line: Vibrant cyan/teal flowing water wave ribbon
 * - Bottom half: Submerged watery reflection with rippled liquid distortion effect
 */
export function FloodGridBrandLogo({
  className = '',
  variant = 'full',
  size = 'md'
}: FloodGridBrandLogoProps) {
  // Height presets
  const heightClass =
    size === 'sm'
      ? 'h-7'
      : size === 'md'
      ? 'h-9'
      : size === 'lg'
      ? 'h-12'
      : size === 'xl'
      ? 'h-16'
      : 'h-9';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 420 140"
        className={`${heightClass} w-auto max-w-full drop-shadow-sm`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Top Half Clip: Everything above the wavy waterline */}
          <clipPath id="floodgrid-top-clip">
            <path d="M 0 0 L 420 0 L 420 70 Q 380 66 340 73 Q 300 78 260 70 Q 220 64 180 73 Q 140 79 100 68 Q 60 62 20 72 L 0 72 Z" />
          </clipPath>

          {/* Bottom Half Clip: Everything below the wavy waterline */}
          <clipPath id="floodgrid-bottom-clip">
            <path d="M 0 72 Q 20 72 60 62 Q 100 68 140 79 Q 180 73 220 64 Q 260 70 300 78 Q 340 73 380 66 L 420 70 L 420 140 L 0 140 Z" />
          </clipPath>

          {/* Liquid ripple turbulence filter for the submerged reflection */}
          <filter id="floodgrid-water-ripple" x="-10%" y="0%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.12"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Water ribbon gradient */}
          <linearGradient id="floodgrid-wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="35%" stopColor="#38BDF8" />
            <stop offset="70%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* Submerged text gradient */}
          <linearGradient id="floodgrid-submerged-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2F8FA5" />
            <stop offset="50%" stopColor="#25758A" />
            <stop offset="100%" stopColor="#1B5D70" />
          </linearGradient>
        </defs>

        {/* 1. TOP HALF: Deep Midnight Navy Solid Typography */}
        <g clipPath="url(#floodgrid-top-clip)">
          <text
            x="210"
            y="94"
            textAnchor="middle"
            fill="#0A1629"
            fontFamily="'Impact', 'Arial Black', -apple-system, sans-serif"
            fontWeight="900"
            fontSize="88"
            letterSpacing="-1.5"
            style={{ textTransform: 'uppercase' }}
          >
            FLOODGRID
          </text>
        </g>

        {/* 2. BOTTOM HALF: Submerged Watery Reflection (Teal-Cyan with Wave Ripple Effect) */}
        <g clipPath="url(#floodgrid-bottom-clip)" filter="url(#floodgrid-water-ripple)">
          <text
            x="210"
            y="98"
            textAnchor="middle"
            fill="url(#floodgrid-submerged-grad)"
            fontFamily="'Impact', 'Arial Black', -apple-system, sans-serif"
            fontWeight="900"
            fontSize="88"
            letterSpacing="-1.5"
            opacity="0.94"
            style={{ textTransform: 'uppercase' }}
          >
            FLOODGRID
          </text>
        </g>

        {/* 3. CENTER WATER LEVEL WAVE RIBBON (Flowing Cyan Liquid Stream) */}
        {/* Under glow / shadow */}
        <path
          d="M -10 71 Q 30 63 70 70 Q 110 78 150 71 Q 190 62 230 71 Q 270 80 310 72 Q 350 64 390 71 Q 410 74 430 71"
          stroke="#0369A1"
          strokeWidth="6.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />

        {/* Primary flowing wave stroke */}
        <path
          d="M -10 70 Q 30 62 70 69 Q 110 77 150 70 Q 190 61 230 70 Q 270 79 310 71 Q 350 63 390 70 Q 410 73 430 70"
          stroke="url(#floodgrid-wave-grad)"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Top foam / crest highlight */}
        <path
          d="M -10 68.5 Q 30 60.5 70 67.5 Q 110 75.5 150 68.5 Q 190 59.5 230 68.5 Q 270 77.5 310 69.5 Q 350 61.5 390 68.5 Q 410 71.5 430 68.5"
          stroke="#BAE6FD"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

/**
 * Compact Icon / Mark Badge version of the logo for small square containers
 */
export function FloodGridIconMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="fg-mark-top">
          <path d="M 0 0 L 64 0 L 64 32 Q 48 30 32 34 Q 16 31 0 33 Z" />
        </clipPath>
        <clipPath id="fg-mark-bottom">
          <path d="M 0 33 Q 16 31 32 34 Q 48 30 64 32 L 64 64 L 0 64 Z" />
        </clipPath>
      </defs>

      {/* Rounded Badge Container */}
      <rect width="64" height="64" rx="14" fill="#0C162E" stroke="#203566" strokeWidth="2" />

      {/* Top Half of "FG" */}
      <g clipPath="url(#fg-mark-top)">
        <text
          x="32"
          y="42"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="'Impact', 'Arial Black', sans-serif"
          fontWeight="900"
          fontSize="36"
          letterSpacing="-1"
        >
          FG
        </text>
      </g>

      {/* Bottom Submerged Reflection */}
      <g clipPath="url(#fg-mark-bottom)">
        <text
          x="32"
          y="44"
          textAnchor="middle"
          fill="#38BDF8"
          fontFamily="'Impact', 'Arial Black', sans-serif"
          fontWeight="900"
          fontSize="36"
          letterSpacing="-1"
          opacity="0.9"
        >
          FG
        </text>
      </g>

      {/* Center Wave */}
      <path
        d="M 2 32.5 Q 16 30.5 32 33.5 Q 48 29.5 62 31.5"
        stroke="#38BDF8"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 2 31.5 Q 16 29.5 32 32.5 Q 48 28.5 62 30.5"
        stroke="#E0F2FE"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
