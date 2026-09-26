import React, { useState, useMemo } from 'react';
import { HOTSPOTS } from '../data/hotspots.ts';
import { DemoMapVisualizer } from './DemoMapVisualizer.tsx';
import { IconCpu, IconPlay, IconCopy } from './Icons.tsx';

interface LiveApiDemoSectionProps {
  demoLocation: string;
  setDemoLocation: (loc: string) => void;
  demoWaterDepth: number;
  setDemoWaterDepth: (depth: number) => void;
}

export function LiveApiDemoSection({
  demoLocation,
  setDemoLocation,
  demoWaterDepth,
  setDemoWaterDepth
}: LiveApiDemoSectionProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [simulatedLatency, setSimulatedLatency] = useState(11);

  const activeHotspot = HOTSPOTS[demoLocation] || HOTSPOTS.andheri;

  const payloadData = useMemo(() => {
    const isSafe = demoWaterDepth < 150;
    const isCritical = demoWaterDepth >= 300;

    return {
      status: 200,
      timestamp: "2026-09-27T12:00:00Z",
      hotspot_id: activeHotspot.hotspot_id,
      sensor_telemetry: {
        water_depth_mm: Number(demoWaterDepth),
        hazard_status: isSafe ? "SAFE" : (isCritical ? "CRITICAL_FLOOD" : "MODERATE_FLOOD"),
        trend: isSafe ? (demoWaterDepth === 0 ? "DRY" : "STABLE") : (demoWaterDepth > 350 ? "PEAK_FLOOD" : "RISING")
      },
      routing_decision: {
        allow_passage_2wheeler: isSafe,
        allow_passage_4wheeler: demoWaterDepth < 250,
        action: isSafe ? "MAINTAIN_ROUTE" : "TRIGGER_REROUTE",
        alternate_path_id: isSafe ? null : (activeHotspot.id === 'milan' ? "ALT_MILAN_FLY_01" : (activeHotspot.id === 'kurla' ? "ALT_BKC_CONN_04" : "ALT_FLYOVER_NAV_02")),
        estimated_delay_minutes: isSafe ? 0.0 : activeHotspot.delayMin
      },
      api_latency_ms: simulatedLatency
    };
  }, [demoWaterDepth, activeHotspot, simulatedLatency]);

  const handleExecuteRequest = () => {
    setIsExecuting(true);
    const nextLatency = Math.floor(Math.random() * 5) + 9;
    setSimulatedLatency(nextLatency);

    setTimeout(() => {
      setIsExecuting(false);
    }, 180);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(payloadData, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const isAlertState = demoWaterDepth >= 150;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#DDD5C5] border border-[#C7BEAD] text-xs font-semibold text-[#0F172A]">
          <IconCpu className="w-3.5 h-3.5 text-[#0F766E]" />
          <span>Real-Time Logistics Simulation</span>
          <span className="text-slate-400">&bull;</span>
          <span className="font-mono text-[#0F766E] font-bold">REST POST /v1/routing/evaluate</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          Developer API Playground
        </h1>
        <p className="text-base text-[#384860] max-w-3xl leading-relaxed">
          Test real-time flood telemetry ingestion and route recalculation payloads across Mumbai's most vulnerable railway underpasses.
        </p>
      </div>

      {/* Interactive Simulation Panel */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Controls */}
        <div className="lg:col-span-5 bg-[#F0EAE0] rounded-2xl border border-[#D4CBB9] p-6 shadow-card space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
              Select Vulnerable Corridor / Hotspot:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(HOTSPOTS).map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setDemoLocation(spot.id)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                    demoLocation === spot.id
                      ? 'bg-[#0C162E] text-[#7DC5BD] border border-[#2D8A82]/60 shadow-sm'
                      : 'bg-[#DDD5C5] text-[#0F172A] border border-[#C7BEAD] hover:bg-white'
                  }`}
                >
                  <span className="leading-tight">{spot.name}</span>
                  <span className="text-[10px] font-mono opacity-70">{spot.hotspot_id.split('_')[1]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Hotspot Corridor Profile Card */}
          <div className="p-4 rounded-xl bg-[#DDD5C5] border border-[#C7BEAD] space-y-2 text-xs">
            <div className="flex items-center justify-between font-mono">
              <span className="text-[#64748B]">Node Identifier:</span>
              <span className="font-bold text-[#0F172A]">{activeHotspot.hotspot_id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#64748B]">Corridor Basin:</span>
              <span className="font-semibold text-[#0F172A]">{activeHotspot.basinElevation}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#64748B]">Active Reroute Plan:</span>
              <span className="font-semibold text-[#0F766E]">{activeHotspot.altRoute.split('(')[0]}</span>
            </div>
          </div>

          {/* Water Depth Interactive Slider (0 to 500 mm) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Simulate Ultrasonic Water Depth:
              </label>
              <span className={`text-sm font-extrabold font-mono px-2.5 py-0.5 rounded-full border ${isAlertState ? 'bg-[#F5E6E6] text-[#991B1B] border-[#E5C2C2]' : 'bg-[#E2ECEB] text-[#0F766E] border-[#BBD5D2]'}`}>
                {demoWaterDepth} mm
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="500"
              step="5"
              value={demoWaterDepth}
              onChange={(e) => setDemoWaterDepth(Number(e.target.value))}
              className={`w-full cursor-pointer ${isAlertState ? 'slider-hazard' : ''}`}
            />

            <div className="flex justify-between text-[11px] font-mono text-[#64748B]">
              <span>0 mm (Dry Road)</span>
              <span className="font-bold text-[#B45309]">150mm (2W Limit)</span>
              <span className="font-bold text-[#991B1B]">300mm+ (Submerged)</span>
            </div>
          </div>

          {/* Quick Slider Preset Buttons */}
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={() => setDemoWaterDepth(40)}
              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#DDD5C5] hover:bg-white text-[#0F172A] border border-[#C7BEAD] transition-colors cursor-pointer"
            >
              40mm (Clear)
            </button>
            <button
              type="button"
              onClick={() => setDemoWaterDepth(160)}
              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#DDD5C5] hover:bg-white text-[#0F172A] border border-[#C7BEAD] transition-colors cursor-pointer"
            >
              160mm (2W Halt)
            </button>
            <button
              type="button"
              onClick={() => setDemoWaterDepth(340)}
              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#DDD5C5] hover:bg-white text-[#0F172A] border border-[#C7BEAD] transition-colors cursor-pointer"
            >
              340mm (Total Reroute)
            </button>
          </div>

          {/* Execute / Evaluate Payload Button */}
          <div className="pt-3">
            <button
              onClick={handleExecuteRequest}
              disabled={isExecuting}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#0F766E] hover:bg-[#115E59] transition-all shadow-card active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
            >
              {isExecuting ? (
                <>
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                  <span>Calculating Route Matrix...</span>
                </>
              ) : (
                <>
                  <IconPlay className="w-4 h-4 text-teal-100" />
                  <span>Execute POST /v1/routing/evaluate</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Static SVG Map Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          <DemoMapVisualizer
            demoLocation={demoLocation}
            demoWaterDepth={demoWaterDepth}
          />
        </div>
      </div>

      {/* Real-Time JSON Response Inspection Terminal */}
      <div className="bg-[#0C162E] rounded-2xl border border-[#203566] overflow-hidden shadow-elevated">
        <div className="bg-[#101D3D] px-5 py-3 border-b border-[#203566] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#A84A4A]"></span>
              <span className="w-3 h-3 rounded-full bg-[#B38640]"></span>
              <span className="w-3 h-3 rounded-full bg-[#4D8C6E]"></span>
            </div>
            <span className="font-mono text-xs font-bold text-slate-300">
              Response Payload &bull; HTTP 200 OK
            </span>
            <span className="text-slate-600">|</span>
            <span className="font-mono text-xs text-[#68B0A8]">
              {simulatedLatency}ms Edge Latency
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold text-slate-200 bg-[#15264E] hover:bg-[#203566] border border-[#203566] transition-colors cursor-pointer"
            >
              <IconCopy className="w-3.5 h-3.5 text-[#4E9B93]" />
              <span>{copiedPayload ? "Copied!" : "Copy JSON"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
          <pre>
            <code>
              {"{\n"}
              {'  '}<span className="text-slate-400">"status"</span>: <span className="text-[#68B0A8]">200</span>,{"\n"}
              {'  '}<span className="text-slate-400">"timestamp"</span>: <span className="text-[#6BB39B]">"{payloadData.timestamp}"</span>,{"\n"}
              {'  '}<span className="text-slate-400">"hotspot_id"</span>: <span className="text-[#6BB39B]">"{payloadData.hotspot_id}"</span>,{"\n"}
              {'  '}<span className="text-slate-400">"sensor_telemetry"</span>: {"{\n"}
              {'    '}<span className="text-slate-400">"water_depth_mm"</span>: <span className={isAlertState ? "text-[#E07A7A] font-bold text-base" : "text-[#D4A373] font-bold"}>{payloadData.sensor_telemetry.water_depth_mm}</span>,{"\n"}
              {'    '}<span className="text-slate-400">"hazard_status"</span>: <span className={isAlertState ? "text-[#E07A7A] font-bold bg-[#3B1717] px-1 py-0.5 rounded border border-[#6B2A2A]" : "text-[#6BB39B] font-bold"}>"{payloadData.sensor_telemetry.hazard_status}"</span>,{"\n"}
              {'    '}<span className="text-slate-400">"trend"</span>: <span className="text-[#6BB39B]">"{payloadData.sensor_telemetry.trend}"</span>{"\n"}
              {'  '}{"},\n"}
              {'  '}<span className="text-slate-400">"routing_decision"</span>: {"{\n"}
              {'    '}<span className="text-slate-400">"allow_passage_2wheeler"</span>: <span className={payloadData.routing_decision.allow_passage_2wheeler ? "text-[#6BB39B]" : "text-[#E07A7A] font-bold"}>{String(payloadData.routing_decision.allow_passage_2wheeler)}</span>,{"\n"}
              {'    '}<span className="text-slate-400">"allow_passage_4wheeler"</span>: <span className={payloadData.routing_decision.allow_passage_4wheeler ? "text-[#6BB39B]" : "text-[#E07A7A] font-bold"}>{String(payloadData.routing_decision.allow_passage_4wheeler)}</span>,{"\n"}
              {'    '}<span className="text-slate-400">"action"</span>: <span className={isAlertState ? "text-[#E07A7A] font-bold bg-[#3B1717] px-1 py-0.5 rounded border border-[#6B2A2A]" : "text-[#6BB39B] font-bold"}>"{payloadData.routing_decision.action}"</span>,{"\n"}
              {'    '}<span className="text-slate-400">"alternate_path_id"</span>: {payloadData.routing_decision.alternate_path_id ? <span className="text-[#D4A373]">"{payloadData.routing_decision.alternate_path_id}"</span> : <span className="text-slate-500">null</span>},{"\n"}
              {'    '}<span className="text-slate-400">"estimated_delay_minutes"</span>: <span className="text-[#D4A373]">{payloadData.routing_decision.estimated_delay_minutes.toFixed(1)}</span>{"\n"}
              {'  '}{"},\n"}
              {'  '}<span className="text-slate-400">"api_latency_ms"</span>: <span className="text-[#68B0A8] font-bold">{payloadData.api_latency_ms}</span>{"\n"}
              {"}"}
            </code>
          </pre>
        </div>

        <div className="bg-[#101D3D]/80 px-5 py-2.5 border-t border-[#203566] text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#0F766E]"></span>
            <span>Payload Size: 418 bytes</span>
            <span className="text-slate-600">&bull;</span>
            <span>Schema: v1.4.2-b2b</span>
          </div>
          <div className="text-slate-400">
            Integration SDKs available for <span className="text-[#68B0A8]">Node.js</span>, <span className="text-[#68B0A8]">Python</span>, and <span className="text-[#68B0A8]">Go</span>
          </div>
        </div>
      </div>
    </div>
  );
}
