import React from 'react';
import { IconCheck, IconShieldCheck, IconZap } from './Icons.tsx';

interface PricingSectionProps {
  setActiveTab: (tab: string) => void;
}

export function PricingSection({ setActiveTab }: PricingSectionProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] bg-[#DDD5C5] px-3.5 py-1 rounded-full border border-[#C7BEAD]">
          Commercial Fleet Licensing
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
          Transparent B2B Monthly Subscription Plans
        </h1>
        <p className="text-base sm:text-lg text-[#384860] leading-relaxed">
          No setup fees. Scale your API calls based on monsoon activity.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        {/* Card 1: B2B Starter Fleet — ₹15,000 / month */}
        <div className="bg-[#F0EAE0] rounded-2xl border border-[#D4CBB9] p-7 sm:p-8 shadow-card transition-all flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#384860] bg-[#DDD5C5] px-2.5 py-1 rounded border border-[#C7BEAD]">
                Small Dispatch
              </span>
              <h3 className="text-xl font-bold text-[#0F172A] mt-2">
                B2B Starter Fleet
              </h3>
              <p className="text-xs text-[#64748B] mt-1">
                For local delivery hubs &amp; small dispatch centers.
              </p>
            </div>

            <div className="py-4 border-y border-[#D4CBB9] my-4">
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-extrabold text-[#0F172A]">₹15,000</span>
                <span className="text-xs text-[#64748B] font-medium">/ month</span>
              </div>
              <div className="text-xs text-[#64748B] mt-1">Billed monthly &bull; Cancel anytime</div>
            </div>

            <ul className="space-y-3 text-sm text-[#384860]">
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span className="font-semibold text-[#0F172A]">Includes 100,000 API Calls / month.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span>Effective Cost: <strong className="text-[#0F172A]">₹0.15 per API Call</strong>.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span>Overage Fee: <strong className="text-[#0F172A]">₹0.20 per additional call</strong>.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span>1-Minute Telemetry Refresh Rate.</span>
              </li>
              <li className="flex items-start space-x-2.5 text-slate-400">
                <span className="w-4 h-4 text-center shrink-0 mt-0.5">&bull;</span>
                <span>REST Endpoints &amp; Web Dashboard</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4">
            <button
              onClick={() => setActiveTab('usage-portal')}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-[#0F172A] bg-[#DDD5C5] border border-[#C7BEAD] hover:bg-white transition-all text-center shadow-subtle cursor-pointer"
            >
              Select Starter Fleet
            </button>
          </div>
        </div>

        {/* Card 2: B2B Enterprise Fleet (Recommended) — ₹35,000 / month */}
        <div className="bg-[#F0EAE0] rounded-2xl border-2 border-[#0F766E] p-7 sm:p-8 shadow-elevated relative flex flex-col justify-between transform lg:-translate-y-2">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0F766E] text-white font-bold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
            Recommended for City Fleets
          </div>

          <div>
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] bg-[#E2ECEB] px-2.5 py-1 rounded border border-[#BBD5D2]">
                High-Velocity Delivery
              </span>
              <h3 className="text-xl font-bold text-[#0F172A] mt-2">
                B2B Enterprise Fleet
              </h3>
              <p className="text-xs text-[#64748B] mt-1">
                For city-wide logistics fleets (Swiggy, Zepto, BlueDart).
              </p>
            </div>

            <div className="py-4 border-y border-[#BBD5D2] my-4 bg-[#E2ECEB]/60 -mx-7 px-7">
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-extrabold text-[#0F172A]">₹35,000</span>
                <span className="text-xs text-[#64748B] font-medium">/ month</span>
              </div>
              <div className="text-xs text-[#0F766E] font-semibold mt-1">Most popular &bull; Dedicated SLA</div>
            </div>

            <ul className="space-y-3.5 text-sm text-[#384860]">
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span className="font-semibold text-[#0F172A]">Includes 300,000 API Calls / month.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span>Effective Cost: <strong className="text-[#0F172A] font-bold">₹0.11 per API Call</strong>.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span>Overage Fee: <strong className="text-[#0F172A]">₹0.15 per additional call</strong>.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span className="font-semibold text-[#0F766E]">
                  3-Second Real-Time Sensor Webhooks + 99.9% Uptime SLA.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span>Dynamic Flyover Reroute Geometry GeoJSON</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4">
            <button
              onClick={() => setActiveTab('usage-portal')}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#0F766E] hover:bg-[#115E59] transition-all shadow-card text-center active:scale-95 cursor-pointer"
            >
              Start Enterprise Fleet Plan
            </button>
          </div>
        </div>

        {/* Card 3: Enterprise Unlimited — ₹75,000 / month */}
        <div className="bg-[#F0EAE0] rounded-2xl border border-[#D4CBB9] p-7 sm:p-8 shadow-card transition-all flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#384860] bg-[#DDD5C5] px-2.5 py-1 rounded border border-[#C7BEAD]">
                Municipal &amp; Mega-Logistics
              </span>
              <h3 className="text-xl font-bold text-[#0F172A] mt-2">
                Enterprise Unlimited
              </h3>
              <p className="text-xs text-[#64748B] mt-1">
                Complete Mumbai &amp; MMR telemetry for high-volume enterprise operations.
              </p>
            </div>

            <div className="py-4 border-y border-[#D4CBB9] my-4">
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-extrabold text-[#0F172A]">₹75,000</span>
                <span className="text-xs text-[#64748B] font-medium">/ month</span>
              </div>
              <div className="text-xs text-[#64748B] mt-1">All-inclusive &bull; Custom integration</div>
            </div>

            <ul className="space-y-3 text-sm text-[#384860]">
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span className="font-semibold text-[#0F172A]">
                  Unlimited API calls across all Mumbai &amp; MMR zones.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span className="font-semibold text-[#0F172A]">
                  Dedicated API latency infrastructure (&lt;10ms).
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span className="font-semibold text-[#0F766E]">
                  24/7 Priority Emergency Monsoon Support.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span>Custom Sensor Installation on Demand</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span>Direct BMC Disaster War-Room Coordination</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4">
            <button
              onClick={() => setActiveTab('usage-portal')}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-[#0F172A] bg-[#DDD5C5] border border-[#C7BEAD] hover:bg-white transition-all text-center shadow-subtle cursor-pointer"
            >
              Contact Enterprise Sales
            </button>
          </div>
        </div>
      </div>

      {/* Guarantee Pill */}
      <div className="bg-[#DDD5C5] border border-[#C7BEAD] rounded-2xl p-6 text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-4 text-xs text-[#384860]">
        <div className="flex items-center space-x-2">
          <IconShieldCheck className="w-5 h-5 text-[#0F766E]" />
          <span className="font-semibold text-[#0F172A]">No Long-Term Contracts: Pause between monsoons (Oct - May)</span>
        </div>
        <div className="flex items-center space-x-2">
          <IconZap className="w-5 h-5 text-[#0F766E]" />
          <span className="font-semibold text-[#0F172A]">Instant Provisioning: Generate API keys in 60 seconds</span>
        </div>
      </div>
    </div>
  );
}
