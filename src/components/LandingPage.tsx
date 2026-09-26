import React from 'react';
import {
  IconZap,
  IconArrowRight,
  IconXCircle,
  IconCheckCircle2,
  IconRadio,
  IconCpu,
  IconRoute
} from './Icons.tsx';

interface LandingPageProps {
  setActiveTab: (tab: string) => void;
}

export function LandingPage({ setActiveTab }: LandingPageProps) {
  return (
    <div className="space-y-20 pb-20">
      {/* [A] HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Regional Announcement Pill */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#DDD5C5] border border-[#C7BEAD] text-xs font-semibold text-[#0F172A] shadow-subtle">
            <span className="flex h-2 w-2 rounded-full bg-[#0F766E]"></span>
            <span className="font-semibold text-[#0F172A]">Active Mumbai Monsoon Corridor Telemetry</span>
            <span className="text-slate-400">•</span>
            <span className="font-mono text-[11px] text-[#384860] font-medium">B2B REST &amp; Webhook Ingestion</span>
          </div>

          {/* EXACT Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15]">
            Predict Urban Floods. Protect Fleets. Keep Mumbai Moving.
          </h1>

          {/* EXACT Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-[#384860] max-w-3xl mx-auto leading-relaxed font-normal">
            FloodGrid is an IoT-powered Data-as-a-Service (DaaS) engine. We deploy millimeter-precise ultrasonic sensors on streetlight infrastructure to feed real-time waterlogging data directly into your logistics routing engine.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <button
              onClick={() => setActiveTab('india-map')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-7 py-3.5 rounded-xl text-base font-bold text-white bg-[#0F766E] hover:bg-[#115E59] transition-all shadow-card active:scale-95 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-300"></span>
              <span>Explore All-India Flood Map</span>
              <IconArrowRight className="w-4 h-4 text-teal-100" />
            </button>

            <button
              onClick={() => setActiveTab('api-demo')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl text-base font-bold text-[#0F172A] bg-[#F0EAE0] border border-[#C7BEAD] hover:border-[#9E917A] hover:bg-white transition-all shadow-subtle active:scale-95 cursor-pointer"
            >
              <IconZap className="w-4 h-4 text-[#0F766E]" />
              <span>Test Live API</span>
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl text-base font-semibold text-[#384860] hover:text-[#0F172A] transition-all cursor-pointer"
            >
              <span>Pricing</span>
            </button>
          </div>

          {/* Live Metric Badges (Warm Stone Surface Cards) */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 text-left max-w-4xl mx-auto">
            <div className="bg-[#F0EAE0] p-4 rounded-xl border border-[#D4CBB9] shadow-card">
              <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Telemetry Refresh</div>
              <div className="text-2xl font-extrabold text-[#0F172A] mt-1 font-mono">3.0s</div>
              <div className="text-[11px] text-[#0F766E] font-semibold mt-0.5">Real-Time Webhook</div>
            </div>
            <div className="bg-[#F0EAE0] p-4 rounded-xl border border-[#D4CBB9] shadow-card">
              <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Sensor Accuracy</div>
              <div className="text-2xl font-extrabold text-[#0F172A] mt-1 font-mono">&plusmn;1.5mm</div>
              <div className="text-[11px] text-[#0F766E] font-semibold mt-0.5">Ultrasonic Grade</div>
            </div>
            <div className="bg-[#F0EAE0] p-4 rounded-xl border border-[#D4CBB9] shadow-card">
              <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Predictive Horizon</div>
              <div className="text-2xl font-extrabold text-[#0F172A] mt-1 font-mono">30-45 min</div>
              <div className="text-[11px] text-[#0F766E] font-semibold mt-0.5">Pre-Submergence AI</div>
            </div>
            <div className="bg-[#F0EAE0] p-4 rounded-xl border border-[#D4CBB9] shadow-card">
              <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">API Latency</div>
              <div className="text-2xl font-extrabold text-[#0F172A] mt-1 font-mono">&lt; 12ms</div>
              <div className="text-[11px] text-[#0F766E] font-semibold mt-0.5">Edge Ingestion SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* [B] PROBLEM VS. FLOODGRID SOLUTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] bg-[#DDD5C5] px-3.5 py-1 rounded-full border border-[#C7BEAD]">
            Logistics Infrastructure Gap
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-3 tracking-tight">
            Why Standard GPS Maps Fail During Mumbai Monsoons
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Card 1: Old Way */}
          <div className="bg-[#F0EAE0] rounded-2xl border border-[#D4CBB9] p-6 sm:p-8 shadow-card transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#B91C1C]"></div>
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-[#F5E6E6] border border-[#E5C2C2] flex items-center justify-center text-[#991B1B]">
                  <IconXCircle className="w-6 h-6 text-[#991B1B]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                    The Old Way (Crowdsourced GPS Maps)
                  </h3>
                  <p className="text-xs text-[#991B1B] font-semibold">Reactive &amp; Lagging Crowd Signals</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-[#384860]">
                <li className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#EBD0D0] text-[#991B1B] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                  <span className="leading-relaxed">
                    Traditional navigation apps only detect traffic <span className="font-bold text-[#0F172A] italic">after</span> delivery vehicles are already stuck in 2 feet of water.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#EBD0D0] text-[#991B1B] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                  <span className="leading-relaxed">
                    Engine hydro-locks cause catastrophic fleet asset damage during Mumbai monsoons.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#EBD0D0] text-[#991B1B] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                  <span className="leading-relaxed">
                    Drivers lose 45+ minutes turning back from unexpected subway submergence.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-[#D4CBB9] flex items-center justify-between text-xs text-[#64748B] font-mono">
              <span>Average Fleet Loss: ₹48,000 / stall</span>
              <span className="text-[#991B1B] font-bold">Critical Asset Risk</span>
            </div>
          </div>

          {/* Card 2: FloodGrid Way */}
          <div className="bg-[#F0EAE0] rounded-2xl border-2 border-[#0F766E]/80 p-6 sm:p-8 shadow-card transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0F766E]"></div>
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-[#E2ECEB] border border-[#BBD5D2] flex items-center justify-center text-[#0F766E]">
                  <IconCheckCircle2 className="w-6 h-6 text-[#0F766E]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                    The FloodGrid API Way
                  </h3>
                  <p className="text-xs text-[#0F766E] font-semibold">Millimeter IoT Telemetry &amp; ML Forecasting</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-[#384860]">
                <li className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#D1E5E3] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <span className="leading-relaxed">
                    Hardware sensors monitor water levels at chronic hotspots (Andheri, Milan, Kurla) every 3 seconds.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#D1E5E3] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <span className="leading-relaxed">
                    Predictive ML models forecast road submergence 30-45 minutes before it hits critical threshold.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#D1E5E3] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <span className="leading-relaxed">
                    Dynamic API payload automatically recalculates delivery driver routes before they enter flood zones.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-[#D4CBB9] flex items-center justify-between text-xs text-[#64748B] font-mono">
              <span>Engine Stalls Prevented: 99.4%</span>
              <span className="text-[#0F766E] font-bold">Zero Hydro-Lock Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* [C] HOW IT WORKS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] bg-[#DDD5C5] px-3.5 py-1 rounded-full border border-[#C7BEAD]">
            End-To-End Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-3 tracking-tight">
            How It Works
          </h2>
          <p className="text-sm text-[#384860] mt-2">
            From municipal streetlight infrastructure directly to delivery driver navigation in under 12 milliseconds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="bg-[#F0EAE0] rounded-2xl border border-[#D4CBB9] p-6 shadow-card transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#DDD5C5] text-[#0F172A] border border-[#C7BEAD]">
                  STEP 01
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#E2ECEB] flex items-center justify-center text-[#0F766E]">
                  <IconRadio className="w-4 h-4 text-[#0F766E]" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                Ground Telemetry
              </h3>
              <p className="text-sm text-[#384860] leading-relaxed">
                Ultrasonic sensors mounted on civic lighting poles measure water depth in millimeters.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#D4CBB9] text-xs font-mono text-[#0F766E] font-semibold">
              Precision: &plusmn;1.5mm &bull; Frequency: 3s
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#F0EAE0] rounded-2xl border border-[#D4CBB9] p-6 shadow-card transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#DDD5C5] text-[#0F172A] border border-[#C7BEAD]">
                  STEP 02
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#E3EBF5] flex items-center justify-center text-[#2C5282]">
                  <IconCpu className="w-4 h-4 text-[#2C5282]" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                Predictive Routing Engine
              </h3>
              <p className="text-sm text-[#384860] leading-relaxed">
                AI models evaluate vehicle clearance thresholds (2-wheelers vs 4-wheelers).
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#D4CBB9] text-xs font-mono text-[#2C5282] font-semibold">
              Clearance: 150mm (2W) / 250mm (4W)
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#F0EAE0] rounded-2xl border border-[#D4CBB9] p-6 shadow-card transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#DDD5C5] text-[#0F172A] border border-[#C7BEAD]">
                  STEP 03
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#E2ECEB] flex items-center justify-center text-[#0F766E]">
                  <IconRoute className="w-4 h-4 text-[#0F766E]" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                Instant API Injection
              </h3>
              <p className="text-sm text-[#384860] leading-relaxed">
                REST API &amp; Webhooks push route geometry updates into your existing delivery app.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#D4CBB9] text-xs font-mono text-[#0F766E] font-semibold">
              Latency: 11ms &bull; Zero Re-Architecture
            </div>
          </div>
        </div>
      </section>

      {/* Quick CTA Banner to Live Playground */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#0C162E] border border-[#203566] rounded-3xl p-8 sm:p-12 text-white shadow-elevated flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[#68B0A8] font-mono text-xs uppercase tracking-wider font-semibold">
              Interactive Developer Playground
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Simulate Live Telemetry at Andheri, Milan &amp; Kurla
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Adjust simulated flood depths from 0 mm to 500 mm and inspect real-time JSON responses with dynamic routing decisions.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('api-demo')}
            className="shrink-0 px-6 py-3.5 rounded-xl font-bold text-[#0F172A] bg-[#F0EAE0] hover:bg-white transition-all shadow-card flex items-center space-x-2 cursor-pointer"
          >
            <span>Launch API Playground</span>
            <IconArrowRight className="w-4 h-4 text-[#0F172A]" />
          </button>
        </div>
      </section>
    </div>
  );
}
