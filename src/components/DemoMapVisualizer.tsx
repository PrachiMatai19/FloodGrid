import React, { useMemo } from 'react';
import { HOTSPOTS } from '../data/hotspots.ts';

interface DemoMapVisualizerProps {
  demoLocation: string;
  demoWaterDepth: number;
}

export function DemoMapVisualizer({ demoLocation, demoWaterDepth }: DemoMapVisualizerProps) {
  const hotspot = HOTSPOTS[demoLocation] || HOTSPOTS.andheri;

  const riskCategory = useMemo(() => {
    if (demoWaterDepth < 150) {
      return {
        level: 'LOW_RISK',
        label: 'Shallow / Low Risk (<150mm)',
        colorHex: '#477A8F',
        bgHex: '#254E60',
        textColor: 'text-[#8DA9B6]',
        badgeBg: 'bg-[#152B38] border-[#2C5266] text-[#A8C4D0]',
        gradientId: 'radialMutedLight',
        auraOpacity: 0.5,
        isFlood: false
      };
    } else if (demoWaterDepth <= 300) {
      return {
        level: 'MODERATE_RISK',
        label: 'Moderate Risk (150mm - 300mm)',
        colorHex: '#2C5282',
        bgHex: '#1E3E66',
        textColor: 'text-[#8CB4D9]',
        badgeBg: 'bg-[#142640] border-[#224470] text-[#9EC4EC]',
        gradientId: 'radialMutedMid',
        auraOpacity: 0.65,
        isFlood: true
      };
    } else {
      return {
        level: 'CRITICAL_HAZARD',
        label: 'Critical Hazard (>300mm)',
        colorHex: '#1A2D42',
        bgHex: '#0E1A29',
        textColor: 'text-slate-300',
        badgeBg: 'bg-[#0E1A29] border-[#1E3858] text-slate-200',
        gradientId: 'radialMutedDark',
        auraOpacity: 0.8,
        isFlood: true
      };
    }
  }, [demoWaterDepth]);

  const isSubmerged = demoWaterDepth >= 150;

  return (
    <div className="relative w-full h-[420px] sm:h-[460px] bg-[#141E28] rounded-2xl border border-[#2C3E50] overflow-hidden shadow-card flex flex-col justify-between select-none">
      {/* Disclaimer Overlay Banner at the top of the map */}
      <div className="absolute top-0 inset-x-0 z-20 bg-[#1A2634]/95 backdrop-blur-sm border-b border-[#2C3E50] px-4 py-2 flex items-center justify-between text-xs text-[#D4A373] font-medium shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="text-[#D4A373] font-bold">⚠️</span>
          <span className="font-semibold text-slate-300">Demo Mode: Current map data is simulated for representation purposes only.</span>
        </div>
        <span className="hidden sm:inline font-mono text-[11px] text-[#D4A373] bg-[#241C12] border border-[#6B4F2A] px-2.5 py-0.5 rounded">
          STATIC DEMO VIEW
        </span>
      </div>

      {/* SVG Vector Map Canvas (DEEP MUTED NAVY BASE LAYER) */}
      <svg className="w-full h-full" viewBox="0 0 640 420" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="radialMutedLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#477A8F" stopOpacity="0.6" />
            <stop offset="65%" stopColor="#254E60" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#254E60" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="radialMutedMid" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2C5282" stopOpacity="0.7" />
            <stop offset="65%" stopColor="#1E3E66" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1E3E66" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="radialMutedDark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1A2D42" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#0E1A29" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#141E28" stopOpacity="0" />
          </radialGradient>

          <pattern id="mutedNavyGrid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#17284F" strokeWidth="0.8" strokeOpacity="0.8" />
          </pattern>
        </defs>

        {/* Base Deep Midnight Navy Grid */}
        <rect width="640" height="420" fill="#141E28" />
        <rect width="640" height="420" fill="url(#mutedNavyGrid)" />

        {/* Ambient Urban Geometry / City Blocks */}
        <rect x="40" y="70" width="130" height="80" rx="6" fill="#132244" stroke="#1D3262" strokeWidth="1" />
        <rect x="190" y="70" width="80" height="80" rx="6" fill="#132244" stroke="#1D3262" strokeWidth="1" />
        <rect x="40" y="270" width="100" height="110" rx="6" fill="#132244" stroke="#1D3262" strokeWidth="1" />
        <rect x="500" y="260" width="100" height="120" rx="6" fill="#132244" stroke="#1D3262" strokeWidth="1" />
        <rect x="500" y="70" width="100" height="100" rx="6" fill="#132244" stroke="#1D3262" strokeWidth="1" />

        {/* Western Railway Corridor Track */}
        <path d="M 320 40 L 320 380" stroke="#192A50" strokeWidth="14" strokeLinecap="round" />
        <path d="M 320 40 L 320 380" stroke="#4B6F9A" strokeWidth="2" strokeDasharray="6 6" strokeOpacity="0.5" />
        {[60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360].map(y => (
          <line key={y} x1="308" y1={y} x2="332" y2={y} stroke="#2B447A" strokeWidth="2.5" />
        ))}

        {/* Elevated Flyover Bypass Route */}
        <path
          d="M 50 180 C 180 180, 240 100, 320 100 C 400 100, 460 180, 590 180"
          stroke="#2D8A82"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={isSubmerged ? "none" : "6 6"}
          strokeOpacity={isSubmerged ? 0.9 : 0.4}
        />

        {/* Normal Underpass Road Route */}
        <path
          d="M 50 250 L 250 250 L 320 250 L 390 250 L 590 250"
          stroke={isSubmerged ? "#991B1B" : "#0F766E"}
          strokeWidth={isSubmerged ? "6.5" : "5.5"}
          strokeLinecap="round"
        />

        {/* Subway Depression Trench / Basin Graphic */}
        <path d="M 260 220 L 380 220 L 370 280 L 270 280 Z" fill="#0F1D3C" stroke="#1D3364" strokeWidth="1.5" />

        {/* WATER POOL OVERLAY IN UNDERPASS */}
        {demoWaterDepth > 0 && (
          <g>
            <path
              d="M 265 235 L 375 235 L 368 275 L 272 275 Z"
              fill={riskCategory.colorHex}
              fillOpacity={Math.min(0.85, 0.35 + (demoWaterDepth / 500) * 0.5)}
            />
            <line x1="265" y1="235" x2="375" y2="235" stroke={riskCategory.bgHex} strokeWidth="2.5" />
          </g>
        )}

        {/* HOTSPOT PIN WITH MUTED RADIAL GRADIENT OVERLAY */}
        <g transform="translate(320, 250)">
          <circle
            cx="0"
            cy="0"
            r={demoWaterDepth < 150 ? 50 : (demoWaterDepth <= 300 ? 70 : 85)}
            fill={`url(#${riskCategory.gradientId})`}
            opacity={riskCategory.auraOpacity}
          />
          <circle cx="0" cy="0" r="13" fill="#141E28" stroke="#4B6F9A" strokeWidth="2" />
          <circle cx="0" cy="0" r="7.5" fill={isSubmerged ? "#991B1B" : riskCategory.colorHex} />
          <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />

          {isSubmerged && (
            <g transform="translate(0, -30)">
              <rect x="-44" y="-12" width="88" height="18" rx="4" fill="#7F1D1D" stroke="#991B1B" strokeWidth="1.2" />
              <text x="0" y="1" textAnchor="middle" fill="#FCA5A5" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                SUBMERGED
              </text>
            </g>
          )}
        </g>

        {/* Civic Pole Telemetry Sensor Assembly Graphic */}
        <g transform="translate(320, 165)">
          <line x1="0" y1="0" x2="0" y2="60" stroke="#3E5780" strokeWidth="2.5" />
          <rect x="-13" y="-7" width="26" height="15" rx="3" fill="#1F2D3D" stroke="#2B447A" strokeWidth="1.2" />
          <path d="M -7 13 A 9 9 0 0 0 7 13" stroke="#3D7D76" strokeWidth="1.5" fill="none" />
          <path d="M -11 18 A 14 14 0 0 0 11 18" stroke="#3D7D76" strokeWidth="1.5" fill="none" opacity="0.5" />
          <text x="0" y="3" textAnchor="middle" fill="#68B0A8" fontSize="7" fontWeight="bold" fontFamily="monospace">
            IoT
          </text>
        </g>

        {/* Road Sign / Route Annotations */}
        <g transform="translate(60, 225)">
          <rect x="0" y="0" width="130" height="20" rx="4" fill="#1F2D3D" stroke="#2C3E50" strokeWidth="1" />
          <text x="8" y="14" fill="#CBD5E1" fontSize="10" fontWeight="600" fontFamily="sans-serif">
            {hotspot.normalRoute.substring(0, 18)}...
          </text>
        </g>

        <g transform="translate(425, 85)">
          <rect x="0" y="0" width="175" height="22" rx="4" fill="#1F2D3D" stroke={isSubmerged ? "#0F766E" : "#2C3E50"} strokeWidth="1.2" />
          <text x="8" y="15" fill={isSubmerged ? "#68B0A8" : "#94A3B8"} fontSize="10" fontWeight="700" fontFamily="sans-serif">
            {isSubmerged ? "★ ACTIVE REROUTE (FLYOVER)" : "Bypass Flyover (Standby)"}
          </text>
        </g>

        <text x="320" y="30" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="bold" letterSpacing="1" fontFamily="sans-serif">
          WESTERN RAILWAY MAIN CORRIDOR
        </text>

        <text x="70" y="275" fill="#64748B" fontSize="10" fontWeight="600" fontFamily="sans-serif">WEST ◄</text>
        <text x="540" y="275" fill="#64748B" fontSize="10" fontWeight="600" fontFamily="sans-serif">► EAST</text>
      </svg>

      {/* Bottom Map Status Bar */}
      <div className="bg-[#141E28]/95 border-t border-[#2C3E50] p-3 px-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-white">{hotspot.name}</span>
          <span className="text-[#384D63]">|</span>
          <span className="font-mono text-[#68B0A8] font-semibold">{hotspot.hotspot_id}</span>
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          <span className={`px-2.5 py-1 rounded-full font-bold border ${riskCategory.badgeBg}`}>
            {demoWaterDepth} mm &bull; {riskCategory.label}
          </span>
          <span className={`font-semibold px-2.5 py-1 rounded-full ${isSubmerged ? 'bg-[#3B1717] text-[#E07A7A] border border-[#6B2A2A]' : 'bg-[#14332B] text-[#7DC5BD] border border-[#245447]'}`}>
            {isSubmerged ? 'Underpass Submerged (Reroute Active)' : 'Underpass Passable (Safe)'}
          </span>
        </div>
      </div>
    </div>
  );
}
