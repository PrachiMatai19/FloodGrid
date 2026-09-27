import React from 'react';

interface FloodGridBrandLogoProps {
  className?: string;
  variant?: 'full' | 'mark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBeigeBg?: boolean;
}

/**
 * Pixel-accurate vector representation of the official FloodGrid brand logo:
 * - Top half: Ultra-bold compressed midnight navy typography ("FLOODGRID" in #0A192F)
 * - Center dividing line: Flowing dual-bordered white and vibrant cyan water wave ribbon (#00A3E0)
 * - Bottom half: Submerged oceanic teal reflection (#2E8EA9) with organic liquid wave ripples
 * - Background: Seamless beige (#E6DFD3) matching the application canvas
 */
export function FloodGridBrandLogo({
  className = '',
  variant = 'full',
  size = 'md',
  showBeigeBg = false,
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

  const waveD =
    "M 8 72 C 30 67, 50 76, 75 71 C 100 66, 120 76, 145 71 C 170 66, 190 76, 215 71 C 240 66, 260 76, 285 71 C 310 66, 330 76, 355 71 C 380 66, 400 75, 420 71 C 432 68, 440 73, 446 70";

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 452 144"
        className={`${heightClass} w-auto max-w-full drop-shadow-sm`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Optional beige background pattern if rendered standalone */}
          {showBeigeBg && (
            <rect width="452" height="144" rx="16" fill="#E6DFD3" />
          )}

          {/* Top Half Clip: Everything strictly above the undulating waterline */}
          <clipPath id="fg-logo-top-clip">
            <path
              d={`M 0 0 L 452 0 L 452 70 C 440 73, 432 68, 420 71 C 400 75, 380 66, 355 71 C 330 76, 310 66, 285 71 C 260 76, 240 66, 215 71 C 190 76, 170 66, 145 71 C 120 76, 100 66, 75 71 C 50 76, 30 67, 8 72 L 0 72 Z`}
            />
          </clipPath>

          {/* Bottom Half Clip: Everything strictly below the undulating waterline */}
          <clipPath id="fg-logo-bottom-clip">
            <path
              d={`M 0 72 L 8 72 C 30 67, 50 76, 75 71 C 100 66, 120 76, 145 71 C 170 66, 190 76, 215 71 C 240 66, 260 76, 285 71 C 310 66, 330 76, 355 71 C 380 66, 400 75, 420 71 C 432 68, 440 73, 446 70 L 452 70 L 452 144 L 0 144 Z`}
            />
          </clipPath>

          {/* Organic liquid displacement map reproducing the undulating water ripples of the logo */}
          <filter id="fg-water-ripple-filter" x="-10%" y="-10%" width="120%" height="130%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.09"
              numOctaves="2"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="6.8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Vibrant cyan water stream gradient */}
          <linearGradient id="fg-water-ribbon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="25%" stopColor="#00A3E0" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="75%" stopColor="#00A3E0" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Submerged teal reflection gradient */}
          <linearGradient id="fg-submerged-teal-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3697B2" />
            <stop offset="50%" stopColor="#2E8EA9" />
            <stop offset="100%" stopColor="#257A92" />
          </linearGradient>
        </defs>

        {showBeigeBg && <rect width="452" height="144" rx="16" fill="#E6DFD3" />}

        {/* 1. TOP HALF: Heavy Midnight Navy Solid Letters (#0A192F) */}
        <g clipPath="url(#fg-logo-top-clip)">
          <text
            x="226"
            y="97"
            textAnchor="middle"
            fill="#0A192F"
            fontFamily="'Impact', 'Arial Black', -apple-system, sans-serif"
            fontWeight="900"
            fontSize="93"
            letterSpacing="-2px"
            style={{ textTransform: 'uppercase' }}
          >
            FLOODGRID
          </text>
        </g>

        {/* 2. BOTTOM HALF: Submerged Oceanic Teal Letters (#2E8EA9) with Fluid Wave Ripples */}
        <g clipPath="url(#fg-logo-bottom-clip)" filter="url(#fg-water-ripple-filter)">
          <text
            x="226"
            y="97"
            textAnchor="middle"
            fill="url(#fg-submerged-teal-grad)"
            fontFamily="'Impact', 'Arial Black', -apple-system, sans-serif"
            fontWeight="900"
            fontSize="93"
            letterSpacing="-2px"
            style={{ textTransform: 'uppercase' }}
          >
            FLOODGRID
          </text>
        </g>

        {/* 3. CENTER WATER LEVEL WAVE RIBBON */}
        {/* Layer A: Clean White Outer Border Framing the Wave */}
        <path
          d={waveD}
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Layer B: Vibrant Cyan Liquid Wave Center */}
        <path
          d={waveD}
          stroke="url(#fg-water-ribbon-grad)"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Layer C: Sunlit Foam Highlight on the Upper Wave Ridge */}
        <path
          d={waveD}
          stroke="#F0F9FF"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}

/**
 * Compact Icon / Mark Badge version for square and mobile badge avatars
 * Updated with matching warm beige background (#E6DFD3) and authentic wave styling
 */
export function FloodGridIconMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="fg-mark-top-clip">
          <path d="M 0 0 L 64 0 L 64 32 Q 48 29 32 34 Q 16 29 0 33 Z" />
        </clipPath>
        <clipPath id="fg-mark-bottom-clip">
          <path d="M 0 33 Q 16 29 32 34 Q 48 29 64 32 L 64 64 L 0 64 Z" />
        </clipPath>
      </defs>

      {/* Rounded Beige Badge Container matching the app canvas */}
      <rect width="64" height="64" rx="14" fill="#E6DFD3" stroke="#D4CBB9" strokeWidth="2" />

      {/* Top Half of "FG" in Midnight Navy */}
      <g clipPath="url(#fg-mark-top-clip)">
        <text
          x="32"
          y="43"
          textAnchor="middle"
          fill="#0A192F"
          fontFamily="'Impact', 'Arial Black', sans-serif"
          fontWeight="900"
          fontSize="38"
          letterSpacing="-1.5px"
        >
          FG
        </text>
      </g>

      {/* Bottom Submerged Reflection in Oceanic Teal */}
      <g clipPath="url(#fg-mark-bottom-clip)">
        <text
          x="32"
          y="43"
          textAnchor="middle"
          fill="#2E8EA9"
          fontFamily="'Impact', 'Arial Black', sans-serif"
          fontWeight="900"
          fontSize="38"
          letterSpacing="-1.5px"
        >
          FG
        </text>
      </g>

      {/* White Border for Center Wave */}
      <path
        d="M 2 32.5 Q 16 29.5 32 34 Q 48 29.5 62 32"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Cyan Center Wave */}
      <path
        d="M 2 32.5 Q 16 29.5 32 34 Q 48 29.5 62 32"
        stroke="#00A3E0"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
