import React from 'react';
import { IconLogo, IconLock, IconArrowRight } from './Icons.tsx';
import { FloodGridBrandLogo, FloodGridIconMark } from './FloodGridBrandLogo.tsx';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#0C162E]/95 backdrop-blur-md border-b border-[#203566] text-white shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Official FloodGrid Logo + Live Pulse Badge */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          <button
            onClick={() => setActiveTab('landing')}
            className="flex items-center space-x-3 group text-left focus:outline-none cursor-pointer"
          >
            {/* White pill background ensuring high-contrast pop of the official logo on dark header */}
            <div className="bg-white/95 hover:bg-white px-2.5 py-1 rounded-xl border border-white/20 shadow-sm transition-all group-hover:scale-105 flex items-center">
              <FloodGridBrandLogo size="sm" className="scale-95" />
            </div>

            <div className="hidden lg:flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#68B0A8] font-bold">
                IoT DaaS Engine
              </span>
              <span className="text-[9px] font-mono text-slate-400">
                v1.4.2-pilot
              </span>
            </div>
          </button>

          {/* Live Pulse Badge ("Mumbai Pilot Network") */}
          <div className="hidden sm:inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#15264E] border border-[#203566] text-xs text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F766E]"></span>
            </span>
            <span className="font-medium text-[11px] text-slate-200">Mumbai Pilot Network</span>
            <span className="inline-block w-1 h-1 rounded-full bg-[#2C4680]"></span>
            <span className="font-mono text-[10px] text-[#68B0A8] font-bold">124 POLES LIVE</span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'landing'
                ? 'text-[#7DC5BD] bg-[#15264E] border border-[#2D8A82]/50 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-[#15264E]/60'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('india-map')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'india-map'
                ? 'text-[#7DC5BD] bg-[#15264E] border border-[#2D8A82]/50 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-[#15264E]/60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#0F766E]"></span>
            <span>India Flood Map</span>
          </button>
          <button
            onClick={() => setActiveTab('api-demo')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'api-demo'
                ? 'text-[#7DC5BD] bg-[#15264E] border border-[#2D8A82]/50 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-[#15264E]/60'
            }`}
          >
            Live API Demo
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'pricing'
                ? 'text-[#7DC5BD] bg-[#15264E] border border-[#2D8A82]/50 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-[#15264E]/60'
            }`}
          >
            B2B Pricing
          </button>
          <button
            onClick={() => setActiveTab('usage-portal')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'usage-portal'
                ? 'text-[#7DC5BD] bg-[#15264E] border border-[#2D8A82]/50 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-[#15264E]/60'
            }`}
          >
            Client Portal
          </button>
        </nav>

        {/* Right Action: Button "Client Login" */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setActiveTab('usage-portal')}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-200 bg-[#15264E] border border-[#203566] hover:border-[#2D8A82]/50 hover:text-white transition-all shadow-subtle active:scale-95 cursor-pointer"
          >
            <IconLock className="w-3.5 h-3.5 text-[#4E9B93]" />
            <span>Client Login</span>
          </button>

          <button
            onClick={() => setActiveTab('api-demo')}
            className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold text-white bg-[#0F766E] hover:bg-[#115E59] transition-all shadow-subtle active:scale-95 cursor-pointer"
          >
            <span>Test Live API</span>
            <IconArrowRight className="w-3.5 h-3.5 text-teal-100" />
          </button>
        </div>
      </div>

      {/* Mobile Tab Strip */}
      <div className="md:hidden flex items-center justify-around border-t border-[#203566] bg-[#0C162E] px-2 py-2 text-xs">
        <button
          onClick={() => setActiveTab('landing')}
          className={`px-2 py-1 rounded-md font-medium transition-all ${activeTab === 'landing' ? 'text-[#7DC5BD] font-bold bg-[#15264E] border border-[#2D8A82]/50' : 'text-slate-400'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('india-map')}
          className={`px-2 py-1 rounded-md font-medium transition-all ${activeTab === 'india-map' ? 'text-[#7DC5BD] font-bold bg-[#15264E] border border-[#2D8A82]/50' : 'text-slate-400'}`}
        >
          India Map
        </button>
        <button
          onClick={() => setActiveTab('api-demo')}
          className={`px-2 py-1 rounded-md font-medium transition-all ${activeTab === 'api-demo' ? 'text-[#7DC5BD] font-bold bg-[#15264E] border border-[#2D8A82]/50' : 'text-slate-400'}`}
        >
          API Demo
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-2 py-1 rounded-md font-medium transition-all ${activeTab === 'pricing' ? 'text-[#7DC5BD] font-bold bg-[#15264E] border border-[#2D8A82]/50' : 'text-slate-400'}`}
        >
          Pricing
        </button>
        <button
          onClick={() => setActiveTab('usage-portal')}
          className={`px-2 py-1 rounded-md font-medium transition-all ${activeTab === 'usage-portal' ? 'text-[#7DC5BD] font-bold bg-[#15264E] border border-[#2D8A82]/50' : 'text-slate-400'}`}
        >
          Portal
        </button>
      </div>
    </header>
  );
}
