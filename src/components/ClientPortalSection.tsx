import React, { useState } from 'react';
import {
  IconLock,
  IconArrowRight,
  IconAlertTriangle,
  IconTruck,
  IconLayers,
  IconRadio,
  IconRoute,
  IconTerminal,
  IconLogOut,
  IconShieldCheck,
  IconZap,
  IconCopy,
  IconCheck
} from './Icons.tsx';
import { MumbaiCorridorMap } from './MumbaiCorridorMap.tsx';
import { IndiaFloodMap } from './IndiaFloodMap.tsx';

interface ClientPortalSectionProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  emailInput: string;
  setEmailInput: (email: string) => void;
  authError: string;
  setAuthError: (err: string) => void;
}

export function ClientPortalSection({
  isAuthenticated,
  setIsAuthenticated,
  emailInput,
  setEmailInput,
  authError,
  setAuthError
}: ClientPortalSectionProps) {
  const [copiedKey, setCopiedKey] = useState(false);
  const [keyRevealed, setKeyRevealed] = useState(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState('overview');
  const [mapViewMode, setMapViewMode] = useState<'india' | 'mumbai'>('india');

  const apiKeyString = "fg_live_mumbai_99a82b71xc8841a0e9921b7";

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedEmail = emailInput.trim().toLowerCase();

    if (trimmedEmail === 'fleet@swiggy.in' || trimmedEmail === 'operations@zepto.com') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError("Access Denied: Invalid corporate API account. Try demo email: fleet@swiggy.in");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmailInput('');
    setAuthError('');
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKeyString);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const clientName = emailInput.toLowerCase().includes('zepto')
    ? "Client: Zepto Instant Logistics (Central Mumbai)"
    : "Client: Swiggy Logistics Hub (West Mumbai)";

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-md mx-auto bg-[#F0EAE0] rounded-2xl border border-[#D4CBB9] p-8 shadow-elevated space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#E2ECEB] border border-[#BBD5D2] flex items-center justify-center text-[#0F766E] mx-auto">
              <IconLock className="w-6 h-6 text-[#0F766E]" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
              Client API Portal Access
            </h2>
            <p className="text-sm text-[#384860] leading-relaxed">
              Enter your registered corporate fleet email to view active API consumption.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Corporate Fleet Email
              </label>
              <input
                type="email"
                required
                placeholder="e.g. fleet@swiggy.in"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  if (authError) setAuthError('');
                }}
                className="w-full px-4 py-3 rounded-xl border border-[#C7BEAD] bg-[#DDD5C5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] text-sm text-[#0F172A] transition-all font-medium"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-[#F5E6E6] border border-[#E5C2C2] text-xs text-[#991B1B] flex items-start space-x-2">
                <IconAlertTriangle className="w-4 h-4 text-[#991B1B] shrink-0 mt-0.5" />
                <span className="leading-relaxed font-semibold">{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#0F766E] hover:bg-[#115E59] transition-all shadow-card active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Access Dashboard</span>
              <IconArrowRight className="w-4 h-4 text-teal-100" />
            </button>
          </form>

          <div className="pt-4 border-t border-[#D4CBB9] space-y-2 text-center">
            <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
              Quick Demo Authorized Credentials:
            </span>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmailInput('fleet@swiggy.in');
                  setAuthError('');
                }}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold bg-[#DDD5C5] hover:bg-white text-[#0F172A] border border-[#C7BEAD] transition-colors cursor-pointer"
              >
                fleet@swiggy.in
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmailInput('operations@zepto.com');
                  setAuthError('');
                }}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold bg-[#DDD5C5] hover:bg-white text-[#0F172A] border border-[#C7BEAD] transition-colors cursor-pointer"
              >
                operations@zepto.com
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* DEEP MIDNIGHT NAVY DASHBOARD SIDEBAR */}
        <aside className="lg:col-span-4 xl:col-span-3 bg-[#0C162E] rounded-2xl border border-[#203566] p-5 shadow-card space-y-6 text-white sticky top-20">
          <div className="space-y-2 pb-4 border-b border-[#203566]">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#15264E] border border-[#203566] flex items-center justify-center text-[#4E9B93]">
                <IconTruck className="w-4 h-4 text-[#4E9B93]" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white tracking-tight leading-none">
                  Fleet Console
                </h3>
                <span className="text-[10px] font-mono text-[#68B0A8] font-bold">
                  MUMBAI PILOT HUB
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              High-velocity dynamic routing &amp; live flood telemetry gateway.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-3 block mb-1">
              Fleet Views
            </span>
            <button
              onClick={() => setActiveSidebarTab('overview')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeSidebarTab === 'overview'
                  ? 'bg-[#15264E] text-[#7DC5BD] border border-[#2D8A82]/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#15264E]/50'
              }`}
            >
              <IconLayers className="w-4 h-4 text-[#4E9B93]" />
              <span>Overview &amp; Metrics</span>
            </button>

            <button
              onClick={() => setActiveSidebarTab('hotspots')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeSidebarTab === 'hotspots'
                  ? 'bg-[#15264E] text-[#7DC5BD] border border-[#2D8A82]/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#15264E]/50'
              }`}
            >
              <IconRadio className="w-4 h-4 text-[#4E9B93]" />
              <span>Live Telemetry Grid</span>
              <span className="ml-auto px-1.5 py-0.5 rounded text-[10px] bg-[#14332B] text-[#7DC5BD] font-mono border border-[#245447]">
                5 Active
              </span>
            </button>

            <button
              onClick={() => setActiveSidebarTab('routing')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeSidebarTab === 'routing'
                  ? 'bg-[#15264E] text-[#7DC5BD] border border-[#2D8A82]/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#15264E]/50'
              }`}
            >
              <IconRoute className="w-4 h-4 text-[#4E9B93]" />
              <span>Routing Decisions</span>
            </button>

            <button
              onClick={() => setActiveSidebarTab('api-keys')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeSidebarTab === 'api-keys'
                  ? 'bg-[#15264E] text-[#7DC5BD] border border-[#2D8A82]/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#15264E]/50'
              }`}
            >
              <IconTerminal className="w-4 h-4 text-[#4E9B93]" />
              <span>API Keys &amp; Webhooks</span>
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-[#101D3D] border border-[#203566] space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono">BMC War-Room:</span>
              <span className="flex items-center space-x-1.5 text-[#6BB39B] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#0F766E]"></span>
                <span>SYNCED</span>
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Stream Refresh:</span>
              <span className="text-slate-200 font-bold">3.00s</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Uptime SLA:</span>
              <span className="text-[#68B0A8] font-bold">99.98%</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#203566] space-y-3">
            <div className="text-[11px] text-slate-300 font-mono truncate">
              <span className="text-slate-500 block text-[10px] uppercase font-sans font-bold">Signed In As:</span>
              {emailInput}
            </div>
            <button
              onClick={handleLogout}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-slate-300 bg-[#15264E] hover:bg-[#3B1717] hover:text-[#E07A7A] border border-[#203566] hover:border-[#6B2A2A] transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <IconLogOut className="w-3.5 h-3.5" />
              <span>Logout Account</span>
            </button>
          </div>
        </aside>

        {/* MAIN DASHBOARD CONTENT AREA */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-8">
          {/* Top Welcome Banner */}
          <div className="bg-[#F0EAE0] rounded-2xl border border-[#D4CBB9] p-6 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2.5">
                <span className="w-3 h-3 rounded-full bg-[#0F766E]"></span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
                  {clientName}
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-[#384860]">
                Enterprise IoT Data Feed &bull; Mumbai Monsoon Pilot Phase 1 &bull; Account: {emailInput}
              </p>
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#DDD5C5] border border-[#C7BEAD] text-xs text-[#0F172A] font-bold">
              <IconShieldCheck className="w-4 h-4 text-[#0F766E]" />
              <span>SLA Protected Plan</span>
            </div>
          </div>

          {/* Metrics Overview Grid */}
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-[#F0EAE0] rounded-2xl border border-[#D4CBB9] p-6 shadow-card flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                  Current Plan
                </span>
                <div className="text-2xl font-extrabold text-[#0F172A] mt-2">
                  Enterprise Fleet
                </div>
                <div className="text-sm font-bold text-[#0F766E] mt-0.5">
                  ₹35,000 / month
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-[#D4CBB9] flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Billing Status:</span>
                <span className="px-2.5 py-0.5 rounded-full font-bold bg-[#E2ECEB] text-[#0F766E] border border-[#BBD5D2]">
                  Active
                </span>
              </div>
            </div>

            <div className="bg-[#F0EAE0] rounded-2xl border border-[#D4CBB9] p-6 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                    Current Month Usage
                  </span>
                  <span className="text-xs font-bold font-mono text-[#0F766E]">71.6%</span>
                </div>
                <div className="text-2xl font-extrabold text-[#0F172A] mt-2 font-mono">
                  214,850 <span className="text-base text-slate-400 font-normal">/ 300,000</span>
                </div>
                <div className="text-xs text-[#64748B] mt-0.5">
                  API Calls Used this billing cycle
                </div>
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="w-full h-2.5 rounded-full bg-[#DDD5C5] overflow-hidden border border-[#C7BEAD]">
                  <div className="h-full bg-[#0F766E] rounded-full" style={{ width: '71.6%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-[#64748B]">
                  <span>85,150 remaining</span>
                  <span>Cap: 300,000</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F0EAE0] rounded-2xl border border-[#D4CBB9] p-6 shadow-card flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                  Unit API Cost
                </span>
                <div className="text-2xl font-extrabold text-[#0F172A] mt-2 font-mono">
                  ₹0.11 <span className="text-sm font-normal text-[#64748B]">/ call</span>
                </div>
                <div className="text-xs text-[#64748B] mt-0.5">
                  Base allocation tier rate
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-[#D4CBB9] flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Overage Rate:</span>
                <span className="font-mono font-bold text-[#0F172A]">₹0.15 / additional call</span>
              </div>
            </div>
          </div>

          {/* Active API Key Box */}
          <div className="bg-[#F0EAE0] rounded-2xl border border-[#D4CBB9] p-6 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <IconZap className="w-4 h-4 text-[#0F766E]" />
                <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  Active Production API Key
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#0F766E] bg-[#E2ECEB] px-2.5 py-0.5 rounded border border-[#BBD5D2] font-semibold">
                Environment: Mumbai Live Telemetry
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex-1 bg-[#0C162E] rounded-xl px-4 py-3 font-mono text-xs sm:text-sm text-[#7DC5BD] border border-[#203566] flex items-center justify-between overflow-x-auto">
                <span>{keyRevealed ? apiKeyString : "fg_live_mumbai_99a82b71xc••••••••••••••••"}</span>
                <button
                  onClick={() => setKeyRevealed(!keyRevealed)}
                  className="text-xs text-slate-400 hover:text-white ml-3 underline shrink-0 font-sans cursor-pointer"
                >
                  {keyRevealed ? 'Hide' : 'Reveal'}
                </button>
              </div>

              <button
                onClick={copyApiKey}
                className="shrink-0 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0F766E] hover:bg-[#115E59] transition-all flex items-center justify-center space-x-2 shadow-sm active:scale-95 cursor-pointer"
              >
                <IconCopy className="w-4 h-4 text-teal-100" />
                <span>{copiedKey ? 'Key Copied!' : 'Copy Key'}</span>
              </button>
            </div>
          </div>

          {/* LIVE MAP SECTOR SWITCHER */}
          <div className="flex items-center justify-between bg-[#F0EAE0] p-2 rounded-2xl border border-[#D4CBB9] shadow-subtle">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] px-3">
              Fleet Telemetry Map View:
            </span>
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setMapViewMode('india')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  mapViewMode === 'india'
                    ? 'bg-[#0C162E] text-[#7DC5BD] border border-[#2D8A82]/50 shadow-sm'
                    : 'bg-[#DDD5C5] text-[#0F172A] border border-[#C7BEAD] hover:bg-white'
                }`}
              >
                <span>🇮🇳 Whole India Flood Map (Zoomable)</span>
              </button>
              <button
                onClick={() => setMapViewMode('mumbai')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  mapViewMode === 'mumbai'
                    ? 'bg-[#0C162E] text-[#7DC5BD] border border-[#2D8A82]/50 shadow-sm'
                    : 'bg-[#DDD5C5] text-[#0F172A] border border-[#C7BEAD] hover:bg-white'
                }`}
              >
                <span>Mumbai Corridor Pilot (5 Poles)</span>
              </button>
            </div>
          </div>

          {/* DYNAMIC TELEMETRY MAP */}
          {mapViewMode === 'india' ? <IndiaFloodMap /> : <MumbaiCorridorMap />}

          {/* Past 3-Month API Billing Table */}
          <div className="bg-[#F0EAE0] rounded-2xl border border-[#D4CBB9] shadow-card overflow-hidden">
            <div className="p-5 border-b border-[#D4CBB9] flex items-center justify-between bg-[#F0EAE0]">
              <h3 className="font-extrabold text-base text-[#0F172A]">
                Past 3-Month API Billing &amp; Usage Breakdown
              </h3>
              <span className="text-xs font-mono text-[#64748B] font-semibold">Currency: INR (₹)</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#DDD5C5] border-b border-[#D4CBB9] text-[#0F172A] font-bold text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6">Month</th>
                    <th className="py-3.5 px-6">API Calls Made</th>
                    <th className="py-3.5 px-6">Hydro-Lock Stalls Prevented</th>
                    <th className="py-3.5 px-6 text-right">Total Cost Charged</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D4CBB9] text-[#0F172A]">
                  <tr className="hover:bg-[#DDD5C5]/60 transition-colors">
                    <td className="py-4 px-6 font-bold">July 2026</td>
                    <td className="py-4 px-6 font-mono text-[#384860]">298,400 calls</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center space-x-1.5 text-[#0F766E] font-bold font-mono">
                        <IconCheck className="w-3.5 h-3.5 text-[#0F766E]" />
                        <span>412 stalls</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono font-extrabold text-right">₹35,000</td>
                  </tr>

                  <tr className="hover:bg-[#DDD5C5]/60 transition-colors bg-[#E2ECEB]/50">
                    <td className="py-4 px-6 font-bold">August 2026</td>
                    <td className="py-4 px-6 font-mono text-[#384860]">345,120 calls</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center space-x-1.5 text-[#0F766E] font-bold font-mono">
                        <IconCheck className="w-3.5 h-3.5 text-[#0F766E]" />
                        <span>528 stalls</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono font-extrabold text-right text-[#0F172A]">
                      ₹41,768 <span className="text-xs font-normal text-[#64748B] block">(Base + ₹6,768 Overage)</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-[#DDD5C5]/60 transition-colors">
                    <td className="py-4 px-6 font-bold">
                      September 2026 <span className="text-[11px] text-[#0F766E] font-bold bg-[#E2ECEB] px-2 py-0.5 rounded border border-[#BBD5D2] ml-1">MTD</span>
                    </td>
                    <td className="py-4 px-6 font-mono text-[#384860]">214,850 calls</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center space-x-1.5 text-[#0F766E] font-bold font-mono">
                        <IconCheck className="w-3.5 h-3.5 text-[#0F766E]" />
                        <span>310 stalls</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono font-extrabold text-right">₹35,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-[#DDD5C5]/60 border-t border-[#D4CBB9] flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B] font-mono">
              <span className="font-semibold text-[#0F172A]">Estimated Logistics Repair Savings: ₹5,98,40,000 (1,250 Hydro-Locks Averted)</span>
              <span className="text-[#0F766E] font-bold">ROI: 48.6x subscription investment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
