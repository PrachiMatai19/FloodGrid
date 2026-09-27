import React, { useState } from 'react';
import { IconCheck, IconShieldCheck, IconZap, IconArrowRight, IconXCircle } from './Icons.tsx';

interface PricingSectionProps {
  setActiveTab: (tab: string) => void;
}

interface SelectedPlan {
  id: string;
  name: string;
  category: string;
  price: string;
  calls: string;
  effectiveCost: string;
  overage: string;
  sla: string;
  description: string;
}

export function PricingSection({ setActiveTab }: PricingSectionProps) {
  const [activeModalPlan, setActiveModalPlan] = useState<SelectedPlan | null>(null);

  const handleSelectPlan = (plan: SelectedPlan) => {
    setActiveModalPlan(plan);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] bg-[#DDD5C5] px-3.5 py-1 rounded-full border border-[#C7BEAD]">
          Commercial Fleet Licensing
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
          Simple Monthly Plans, Priced for How You Actually Use It
        </h1>
        <p className="text-base sm:text-lg text-[#384860] leading-relaxed">
          No setup fees. No seasonal lock-in. Your usage naturally scales with monsoon demand.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        {/* Card 1: B2B Starter Fleet — ₹8,000 / month */}
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
                <span className="text-3xl font-extrabold text-[#0F172A]">₹8,000</span>
                <span className="text-xs text-[#64748B] font-medium">/ month</span>
              </div>
              <div className="text-xs text-[#64748B] mt-1">Billed monthly &bull; Cancel anytime</div>
            </div>

            <ul className="space-y-3 text-sm text-[#384860]">
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span className="font-semibold text-[#0F172A]">Includes 50,000 API Calls/month</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span>Effective Cost: <strong className="text-[#0F172A]">₹0.16 per API Call</strong></span>
              </li>
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span>Overage Fee: <strong className="text-[#0F172A]">₹0.20 per additional call</strong></span>
              </li>
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span>1-Minute Telemetry Refresh Rate</span>
              </li>
              <li className="flex items-start space-x-2.5 text-slate-500">
                <span className="w-4 h-4 text-center shrink-0 mt-0.5 font-bold">&bull;</span>
                <span>REST Endpoints &amp; Web Dashboard</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4">
            <button
              onClick={() => handleSelectPlan({
                id: 'starter',
                name: 'B2B Starter Fleet',
                category: 'Small Dispatch',
                price: '₹8,000 / month',
                calls: '50,000 API Calls/month',
                effectiveCost: '₹0.16 per API Call',
                overage: '₹0.20 per additional call',
                sla: '1-Minute Refresh Rate &bull; Standard SLA',
                description: 'Designed for local quick-commerce hubs, grocery dark stores, and small municipal dispatch units.'
              })}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-[#0F172A] bg-[#DDD5C5] border border-[#C7BEAD] hover:bg-white transition-all text-center shadow-subtle cursor-pointer"
            >
              Select Starter Fleet
            </button>
          </div>
        </div>

        {/* Card 2: B2B Enterprise Fleet — ₹28,000 / month */}
        <div className="bg-[#F0EAE0] rounded-2xl border-2 border-[#0F766E] p-7 sm:p-8 shadow-elevated flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] bg-[#E2ECEB] px-2.5 py-1 rounded border border-[#BBD5D2]">
                High-Velocity Delivery
              </span>
              <h3 className="text-xl font-bold text-[#0F172A] mt-2">
                B2B Enterprise Fleet
              </h3>
              <p className="text-xs text-[#64748B] mt-1">
                For city-wide logistics fleets.
              </p>
            </div>

            <div className="py-4 border-y border-[#BBD5D2] my-4 bg-[#E2ECEB]/60 -mx-7 px-7">
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-extrabold text-[#0F172A]">₹28,000</span>
                <span className="text-xs text-[#64748B] font-medium">/ month</span>
              </div>
              <div className="text-xs text-[#0F766E] font-semibold mt-1">Most popular &bull; Dedicated SLA</div>
            </div>

            <ul className="space-y-3.5 text-sm text-[#384860]">
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span className="font-semibold text-[#0F172A]">Includes 2,00,000 API Calls/month</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span>Effective Cost: <strong className="text-[#0F172A] font-bold">₹0.14 per API Call</strong></span>
              </li>
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span>Overage Fee: <strong className="text-[#0F172A]">₹0.15 per additional call</strong></span>
              </li>
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span className="font-semibold text-[#0F766E]">
                  3-Second Real-Time Sensor Webhooks + 99.9% Uptime SLA
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
              onClick={() => handleSelectPlan({
                id: 'enterprise',
                name: 'B2B Enterprise Fleet',
                category: 'High-Velocity Delivery',
                price: '₹28,000 / month',
                calls: '2,00,000 API Calls/month',
                effectiveCost: '₹0.14 per API Call',
                overage: '₹0.15 per additional call',
                sla: '3-Second Real-Time Webhooks &bull; 99.9% Uptime SLA',
                description: 'Tailored for major city-wide courier, food-delivery, and quick-commerce operations across Mumbai corridors.'
              })}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#0F766E] hover:bg-[#115E59] transition-all shadow-card text-center active:scale-95 cursor-pointer"
            >
              Start Enterprise Fleet Plan
            </button>
          </div>
        </div>

        {/* Card 3: Enterprise Unlimited — ₹60,000 / month */}
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
                Complete Mumbai &amp; MMR telemetry for high-volume enterprise &amp; government operations.
              </p>
            </div>

            <div className="py-4 border-y border-[#D4CBB9] my-4">
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-extrabold text-[#0F172A]">₹60,000</span>
                <span className="text-xs text-[#64748B] font-medium">/ month</span>
              </div>
              <div className="text-xs text-[#64748B] mt-1">
                All-inclusive &bull; Custom integration
              </div>
              <div className="text-xs font-semibold text-[#0F766E] mt-0.5 italic">
                Save 15% with an annual commitment
              </div>
            </div>

            <ul className="space-y-3 text-sm text-[#384860]">
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span className="font-semibold text-[#0F172A]">
                  Unlimited API calls across all Mumbai &amp; MMR zones
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span className="font-semibold text-[#0F172A]">
                  Dedicated API latency infrastructure (&lt;10ms)
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <IconCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span className="font-semibold text-[#0F766E]">
                  24/7 Priority Emergency Monsoon Support
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
              onClick={() => handleSelectPlan({
                id: 'unlimited',
                name: 'Enterprise Unlimited',
                category: 'Municipal & Mega-Logistics',
                price: '₹60,000 / month',
                calls: 'Unlimited API Calls across MMR',
                effectiveCost: 'Zero Overage (All-inclusive)',
                overage: 'None (Unmetered Access)',
                sla: 'Dedicated Ultra-Low Latency (<10ms) &bull; War-Room Desk',
                description: 'Full municipal telemetry coverage for government authorities, transit boards, and massive logistics networks.'
              })}
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
          <span className="font-semibold text-[#0F172A]">No Long-Term Contracts: Cancel anytime with zero lock-in</span>
        </div>
        <div className="flex items-center space-x-2">
          <IconZap className="w-5 h-5 text-[#0F766E]" />
          <span className="font-semibold text-[#0F172A]">Instant Provisioning: Generate API keys in 60 seconds</span>
        </div>
      </div>

      {/* PLAN DETAILS & ACTIVATION MODAL */}
      {activeModalPlan && (
        <div className="fixed inset-0 z-50 bg-[#0C162E]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F0EAE0] rounded-2xl border border-[#D4CBB9] max-w-lg w-full p-6 sm:p-7 shadow-elevated space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] bg-[#E2ECEB] px-2.5 py-0.5 rounded border border-[#BBD5D2]">
                  {activeModalPlan.category}
                </span>
                <h3 className="text-2xl font-extrabold text-[#0F172A] mt-1.5">
                  {activeModalPlan.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalPlan(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-[#0F172A] transition-colors cursor-pointer"
              >
                <IconXCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#DDD5C5] border border-[#C7BEAD] space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-[#64748B] font-semibold">Subscription Rate:</span>
                <span className="text-xl font-extrabold text-[#0F172A]">{activeModalPlan.price}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Included Quota:</span>
                <span className="font-mono font-bold text-[#0F172A]">{activeModalPlan.calls}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Effective Call Rate:</span>
                <span className="font-mono font-semibold text-[#0F766E]">{activeModalPlan.effectiveCost}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Overage Billing:</span>
                <span className="font-mono text-[#0F172A]">{activeModalPlan.overage}</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-[#C7BEAD]">
                <span className="text-[#64748B]">Service Level:</span>
                <span className="text-xs font-medium text-[#0F172A]">{activeModalPlan.sla}</span>
              </div>
            </div>

            <p className="text-xs text-[#384860] leading-relaxed">
              {activeModalPlan.description}
            </p>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => {
                  setActiveModalPlan(null);
                  setActiveTab('usage-portal');
                }}
                className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#0F766E] hover:bg-[#115E59] transition-all shadow-card flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Proceed to Fleet Portal / Demo Console</span>
                <IconArrowRight className="w-4 h-4 text-teal-100" />
              </button>

              <button
                onClick={() => {
                  setActiveModalPlan(null);
                  setActiveTab('api-demo');
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#0F172A] bg-[#DDD5C5] hover:bg-white border border-[#C7BEAD] transition-colors cursor-pointer"
              >
                Test Live API Evaluation Engine First
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
