import React from 'react';
import { IconLogo } from './Icons.tsx';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="bg-[#0C162E] border-t border-[#203566] text-slate-300 mt-20 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#203566]">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-[#15264E] border border-[#203566] flex items-center justify-center text-[#4E9B93]">
                <IconLogo className="w-4 h-4 text-[#4E9B93]" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                Flood<span className="text-[#4E9B93]">Grid</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              B2B IoT flood intelligence and dynamic routing engine protecting commercial fleets across Mumbai and MMR corridors.
            </p>
            <div className="flex items-center space-x-2 text-[11px] font-mono text-[#68B0A8] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#0F766E]"></span>
              <span>Operational Status: 99.98% SLA</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('landing')} className="hover:text-[#7DC5BD] transition-colors cursor-pointer">
                  Platform Overview
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('api-demo')} className="hover:text-[#7DC5BD] transition-colors cursor-pointer">
                  Live API Playground
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pricing')} className="hover:text-[#7DC5BD] transition-colors cursor-pointer">
                  B2B Monthly Pricing
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('usage-portal')} className="hover:text-[#7DC5BD] transition-colors cursor-pointer">
                  Client API Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Coverage Nodes */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Monitored Corridors
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Andheri Subway (S.V. Road)</li>
              <li>Milan Subway (Santacruz)</li>
              <li>Kurla West (LBS Marg)</li>
              <li>Hindmata Flyover Trench</li>
              <li>Dadar TT Circle Basin</li>
              <li>King's Circle / Matunga East</li>
            </ul>
          </div>

          {/* Municipal Coordination */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Monsoon Operations
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              Civic Lighting Infrastructure Sensor Network. Deployed in collaboration with Brihanmumbai Municipal Corporation (BMC).
            </p>
            <div className="font-mono text-[11px] text-[#68B0A8] font-bold">
              emergency-api@floodgrid.io
            </div>
          </div>
        </div>

        {/* Footer Directive */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; 2026 FloodGrid Technologies Inc. Mumbai Pilot Network. Built for Indian Urban Mobility.
          </div>
          <div className="flex items-center space-x-5 text-[11px]">
            <span className="hover:text-white cursor-pointer">Security Protocol</span>
            <span className="hover:text-white cursor-pointer">SLA Agreement</span>
            <span className="hover:text-white cursor-pointer">API Documentation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
