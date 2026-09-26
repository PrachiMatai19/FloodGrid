import React, { useState } from 'react';

export function MumbaiCorridorMap() {
  const [selectedNode, setSelectedNode] = useState('andheri');

  const nodes = [
    {
      id: 'andheri',
      name: 'Andheri Subway',
      code: 'FG-MUM-AND-04',
      x: 185,
      y: 140,
      depth: 220,
      risk: 'moderate',
      riskLabel: 'Moderate Risk (150-300mm)',
      color: '#2C5282',
      pulseColor: '#477A8F',
      pumps: 'Active (2 pumps)',
      clearance: '2W Blocked, 4W Caution'
    },
    {
      id: 'milan',
      name: 'Milan Subway',
      code: 'FG-MUM-MIL-02',
      x: 215,
      y: 195,
      depth: 110,
      risk: 'low',
      riskLabel: 'Shallow / Low Risk (<150mm)',
      color: '#477A8F',
      pulseColor: '#6A9CB3',
      pumps: 'Standby',
      clearance: 'Clear / All Vehicles'
    },
    {
      id: 'kurla',
      name: 'Kurla West (LBS Marg)',
      code: 'FG-MUM-KURLA-07',
      x: 320,
      y: 210,
      depth: 340,
      risk: 'critical',
      riskLabel: 'Critical Hazard (>300mm)',
      color: '#1A2D42',
      pulseColor: '#2C5282',
      pumps: 'Over capacity',
      clearance: 'Total Ingress Blocked'
    },
    {
      id: 'hindmata',
      name: 'Hindmata Flyover Underpass',
      code: 'FG-MUM-HIND-01',
      x: 275,
      y: 300,
      depth: 285,
      risk: 'moderate',
      riskLabel: 'Moderate Risk (150-300mm)',
      color: '#2C5282',
      pulseColor: '#477A8F',
      pumps: 'Active (3 pumps)',
      clearance: 'Flyover Reroute Triggered'
    },
    {
      id: 'dadar',
      name: 'Dadar TT Circle',
      code: 'FG-MUM-DAD-03',
      x: 260,
      y: 335,
      depth: 85,
      risk: 'low',
      riskLabel: 'Shallow / Low Risk (<150mm)',
      color: '#477A8F',
      pulseColor: '#6A9CB3',
      pumps: 'Normal Drain',
      clearance: 'Clear / All Vehicles'
    }
  ];

  const activeNodeData = nodes.find(n => n.id === selectedNode) || nodes[0];

  return (
    <div className="bg-[#F0EAE0] rounded-2xl border border-[#D4CBB9] shadow-card overflow-hidden">
      {/* Top Bar Title */}
      <div className="bg-[#F0EAE0] border-b border-[#D4CBB9] p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <span className="relative flex h-3 w-3">
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0F766E]"></span>
          </span>
          <h3 className="font-extrabold text-base sm:text-lg text-[#0F172A] tracking-tight">
            Live Telemetry Feed — Mumbai Corridor
          </h3>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="text-[#64748B]">Live Webhook Frequency: <strong className="text-[#0F766E]">3 Seconds</strong></span>
          <span className="text-[#C7BEAD]">|</span>
          <span className="px-2.5 py-1 rounded bg-[#DDD5C5] text-[#0F172A] font-bold border border-[#C7BEAD]">
            5 SENSOR NODES ONLINE
          </span>
        </div>
      </div>

      {/* Interactive Map Canvas + Floating Active Node Card */}
      <div className="grid lg:grid-cols-12 gap-0 relative bg-[#0C162E]">
        {/* SVG Visual Component */}
        <div className="lg:col-span-8 p-4 sm:p-6 flex items-center justify-center relative min-h-[440px]">
          <svg
            className="w-full h-[400px] sm:h-[440px] drop-shadow-sm select-none"
            viewBox="0 0 540 440"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="seaGridMuted" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#17284F" strokeWidth="0.6" strokeOpacity="0.7" />
              </pattern>
            </defs>

            <rect width="540" height="440" fill="#0C162E" />
            <rect width="540" height="440" fill="url(#seaGridMuted)" />

            <text x="60" y="320" fill="#3E5482" fontSize="11" fontWeight="700" letterSpacing="2" fontFamily="sans-serif">
              ARABIAN SEA
            </text>
            <text x="410" y="100" fill="#3E5482" fontSize="10" fontWeight="700" letterSpacing="1" fontFamily="sans-serif">
              THANE CREEK
            </text>
            <text x="410" y="340" fill="#3E5482" fontSize="10" fontWeight="700" letterSpacing="1" fontFamily="sans-serif">
              MUMBAI HARBOUR
            </text>

            {/* Mumbai Peninsula Landmass Vector Outline */}
            <path
              d="M 120 40 
                 C 160 40, 220 50, 360 40
                 C 400 40, 420 80, 410 130
                 C 400 170, 370 200, 380 230
                 C 390 270, 370 310, 330 350
                 C 300 380, 280 420, 260 420
                 C 240 420, 230 380, 240 350
                 C 245 320, 220 300, 210 270
                 C 200 240, 160 230, 150 200
                 C 140 170, 160 140, 140 100
                 C 130 80, 110 60, 120 40 Z"
              fill="#132244"
              stroke="#223868"
              strokeWidth="2.5"
            />

            {/* Sanjay Gandhi National Park */}
            <path
              d="M 230 50 C 270 50, 340 55, 330 110 C 310 130, 260 120, 230 100 Z"
              fill="#0E2318"
              stroke="#1F4D33"
              strokeWidth="1.5"
            />
            <text x="280" y="85" textAnchor="middle" fill="#2E7D52" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
              SGNP PARK
            </text>

            {/* Arterial Road Corridors */}
            <path
              d="M 170 60 L 195 130 L 225 190 L 245 250 L 265 330 L 255 400"
              stroke="#283C66"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M 330 60 L 320 140 L 315 200 L 290 270 L 270 330"
              stroke="#283C66"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M 200 220 C 180 240, 185 270, 215 285"
              stroke="#2D8A82"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
            <path
              d="M 270 120 Q 300 170 320 210 Q 280 230 210 225"
              stroke="#2C5282"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* SENSOR NODES */}
            {nodes.map((node) => {
              const isSelected = node.id === selectedNode;

              return (
                <g
                  key={node.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedNode(node.id)}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="14"
                    fill={node.color}
                    className="radar-pulse-anim"
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="22"
                    fill={node.color}
                    className="radar-pulse-anim-delayed"
                  />

                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? "9.5" : "7"}
                    fill={node.color}
                    stroke="#F0EAE0"
                    strokeWidth="2.5"
                    className="transition-all duration-200 group-hover:scale-125"
                  />

                  <circle cx={node.x} cy={node.y} r="2.5" fill="#FFFFFF" />

                  <g transform={`translate(${node.x + 12}, ${node.y - 12})`}>
                    <rect
                      x="0"
                      y="0"
                      width="90"
                      height="24"
                      rx="4"
                      fill="#0C162E"
                      stroke={isSelected ? "#2D8A82" : "#203566"}
                      strokeWidth={isSelected ? "1.5" : "1"}
                      className="shadow-sm"
                    />
                    <text x="7" y="12" fill="#F0EAE0" fontSize="9" fontWeight="700" fontFamily="sans-serif">
                      {node.name.split(' ')[0]}
                    </text>
                    <text x="7" y="21" fill={node.color} fontSize="8" fontWeight="bold" fontFamily="monospace">
                      {node.depth} mm
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-[#0C162E]/95 backdrop-blur-sm p-3.5 rounded-xl border border-[#203566] text-[11px] space-y-1.5 shadow-card">
            <div className="font-bold text-slate-300 text-[10px] uppercase tracking-wider mb-1">
              Waterlogging Risk Gradients
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-[#477A8F]"></span>
              <span className="text-slate-300">Slate Cyan: Shallow / Low Risk (&lt;150mm)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-[#2C5282]"></span>
              <span className="text-slate-300">Prussian Blue: Moderate Risk (150-300mm)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-[#1A2D42] border border-slate-500"></span>
              <span className="text-white font-bold">Marine Navy: High Flood Risk (&gt;300mm)</span>
            </div>
          </div>
        </div>

        {/* Right Panel: Active Sensor Telemetry Card */}
        <div className="lg:col-span-4 bg-[#F0EAE0] border-t lg:border-t-0 lg:border-l border-[#D4CBB9] p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#0F766E] bg-[#E2ECEB] px-2.5 py-1 rounded border border-[#BBD5D2]">
                {activeNodeData.code}
              </span>
              <span className="flex items-center space-x-1.5 text-xs text-[#64748B] font-mono">
                <span className="w-2 h-2 rounded-full bg-[#0F766E]"></span>
                <span>3s Pulse Active</span>
              </span>
            </div>

            <div>
              <h4 className="text-xl font-extrabold text-[#0F172A]">
                {activeNodeData.name}
              </h4>
              <p className="text-xs text-[#64748B] mt-0.5">
                Civic Pole Ultrasonic Telemetry Station
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#DDD5C5] border border-[#C7BEAD] space-y-2">
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Current Measured Water Depth
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold font-mono" style={{ color: activeNodeData.color }}>
                  {activeNodeData.depth}
                </span>
                <span className="text-sm font-bold text-[#0F172A]">millimeters</span>
              </div>
              <div className="text-xs font-bold" style={{ color: activeNodeData.color }}>
                &bull; {activeNodeData.riskLabel}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-[#D4CBB9]">
                <span className="text-[#64748B]">Fleet Passage:</span>
                <span className="font-bold text-[#0F172A]">{activeNodeData.clearance}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#D4CBB9]">
                <span className="text-[#64748B]">Civic Pumps:</span>
                <span className="font-bold text-[#0F172A]">{activeNodeData.pumps}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#D4CBB9]">
                <span className="text-[#64748B]">API Recommendation:</span>
                <span className="font-mono font-bold text-[#0F766E]">
                  {activeNodeData.depth >= 150 ? 'TRIGGER_REROUTE' : 'MAINTAIN_ROUTE'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
              Inspect Sensor Node
            </div>
            <div className="flex flex-wrap gap-1.5">
              {nodes.map(n => (
                <button
                  key={n.id}
                  onClick={() => setSelectedNode(n.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    n.id === selectedNode
                      ? 'bg-[#0C162E] text-white font-bold shadow-sm'
                      : 'bg-[#DDD5C5] text-[#0F172A] border border-[#C7BEAD] hover:bg-white'
                  }`}
                >
                  {n.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
