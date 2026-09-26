import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  IndiaSensorNode,
  INITIAL_INDIA_SENSORS,
  INDIA_FLOOD_ZONES,
  InundationZone
} from '../data/indiaSensors.ts';
import {
  IconRadio,
  IconAlertTriangle,
  IconShieldCheck,
  IconRoute,
  IconZap,
  IconCheck,
  IconCpu
} from './Icons.tsx';

interface IndiaFloodMapProps {
  onSelectNodeForAPI?: (node: IndiaSensorNode) => void;
}

export function IndiaFloodMap({ onSelectNodeForAPI }: IndiaFloodMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const polygonsLayerRef = useRef<L.LayerGroup | null>(null);
  const routesLayerRef = useRef<L.LayerGroup | null>(null);

  // Focus and Highlight State: default to TRUE as requested to highlight Andheri and grey others
  const [focusAndheri, setFocusAndheri] = useState<boolean>(true);
  const [mapTheme, setMapTheme] = useState<'dark' | 'grey' | 'street'>('dark');

  // Dynamic simulation states
  const [rainModifierMm, setRainModifierMm] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'ANDHERI' | 'CRITICAL' | 'MODERATE' | 'SAFE'>('ANDHERI');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('mum-andheri');
  const [showInundationPolygons, setShowInundationPolygons] = useState<boolean>(true);
  const [showRadiusHalos, setShowRadiusHalos] = useState<boolean>(true);

  // Compute dynamic sensor depths with rain modifier
  const dynamicSensors = useMemo(() => {
    return INITIAL_INDIA_SENSORS.map((sensor) => {
      const simulatedDepth = Math.max(0, sensor.baseDepth + rainModifierMm);
      let status: 'CRITICAL_FLOOD' | 'MODERATE_RISK' | 'SAFE' = 'SAFE';
      let action: 'TRIGGER_REROUTE' | 'SLOW_PASSAGE' | 'MAINTAIN_ROUTE' = 'MAINTAIN_ROUTE';

      if (simulatedDepth >= 300) {
        status = 'CRITICAL_FLOOD';
        action = 'TRIGGER_REROUTE';
      } else if (simulatedDepth >= 150) {
        status = 'MODERATE_RISK';
        action = 'TRIGGER_REROUTE';
      } else {
        status = 'SAFE';
        action = 'MAINTAIN_ROUTE';
      }

      return {
        ...sensor,
        waterDepth: simulatedDepth,
        hazardStatus: status,
        fleetAction: action
      };
    });
  }, [rainModifierMm]);

  // Filtered sensors
  const filteredSensors = useMemo(() => {
    return dynamicSensors.filter((s) => {
      if (selectedFilter === 'ANDHERI' && !s.isAndheriMentioned && !s.isSiteHotspot) return false;
      if (selectedFilter === 'CRITICAL' && s.hazardStatus !== 'CRITICAL_FLOOD') return false;
      if (selectedFilter === 'MODERATE' && s.hazardStatus !== 'MODERATE_RISK') return false;
      if (selectedFilter === 'SAFE' && s.hazardStatus !== 'SAFE') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          s.state.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [dynamicSensors, selectedFilter, searchQuery]);

  const activeNode = useMemo(() => {
    return dynamicSensors.find((s) => s.id === selectedNodeId) || dynamicSensors[0];
  }, [dynamicSensors, selectedNodeId]);

  // National & regional statistics
  const stats = useMemo(() => {
    const total = dynamicSensors.length;
    const andheriCount = dynamicSensors.filter((s) => s.isAndheriMentioned).length;
    const siteHotspots = dynamicSensors.filter((s) => s.isSiteHotspot).length;
    const critical = dynamicSensors.filter((s) => s.hazardStatus === 'CRITICAL_FLOOD').length;
    const moderate = dynamicSensors.filter((s) => s.hazardStatus === 'MODERATE_RISK').length;
    const safe = dynamicSensors.filter((s) => s.hazardStatus === 'SAFE').length;

    return { total, andheriCount, siteHotspots, critical, moderate, safe };
  }, [dynamicSensors]);

  // Initialize Leaflet Map with 100% Free OpenStreetMap Tiles (NO API KEY REQUIRED)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Default focus on Andheri Subway
    const map = L.map(mapContainerRef.current, {
      center: [19.1197, 72.8468],
      zoom: 13,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: false
    });

    // 100% Free OpenStreetMap tile server without any API key restrictions
    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      subdomains: ['a', 'b', 'c'],
      maxZoom: 19,
      className: mapTheme === 'dark' ? 'osm-dark-tiles' : (mapTheme === 'grey' ? 'osm-grey-tiles' : '')
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Attribution
    L.control
      .attribution({
        position: 'bottomright',
        prefix: '<span>FloodGrid IoT Network</span> &bull; &copy; OpenStreetMap contributors'
      })
      .addTo(map);

    // Zoom Control
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const polygonsLayer = L.layerGroup().addTo(map);
    const routesLayer = L.layerGroup().addTo(map);
    const markersLayer = L.layerGroup().addTo(map);

    polygonsLayerRef.current = polygonsLayer;
    routesLayerRef.current = routesLayer;
    markersLayerRef.current = markersLayer;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update map tile class when theme changes
  useEffect(() => {
    if (!tileLayerRef.current || !mapContainerRef.current) return;
    const container = mapContainerRef.current;
    container.classList.remove('osm-dark-tiles', 'osm-grey-tiles');

    if (mapTheme === 'dark') {
      container.classList.add('osm-dark-tiles');
    } else if (mapTheme === 'grey') {
      container.classList.add('osm-grey-tiles');
    }
  }, [mapTheme]);

  // Draw Andheri Subway & Gokhale Bridge Corridors on Map
  useEffect(() => {
    if (!mapInstanceRef.current || !routesLayerRef.current) return;
    const layer = routesLayerRef.current;
    layer.clearLayers();

    // 1. Andheri Subway S.V. Road Depression (Submerged road line)
    const subwayCoords: [number, number][] = [
      [19.1225, 72.8458],
      [19.1197, 72.8468], // Andheri subway depression under rail
      [19.1170, 72.8475]
    ];

    const subwayLine = L.polyline(subwayCoords, {
      color: '#DC2626',
      weight: 5,
      opacity: 0.85,
      dashArray: '8, 6'
    });
    subwayLine.bindTooltip(
      '<div style="font-weight:bold; color:#FCA5A5; font-size:11px;">⚠️ Andheri Subway Direct Route (SUBMERGED / CLOSED)</div>',
      { sticky: true }
    );
    layer.addLayer(subwayLine);

    // 2. Gokhale Bridge Flyover Bypass (Elevated safe reroute link)
    const gokhaleCoords: [number, number][] = [
      [19.1220, 72.8435],
      [19.1185, 72.8460],
      [19.1172, 72.8475], // Gokhale bridge
      [19.1178, 72.8510],
      [19.1195, 72.8535]
    ];

    const gokhaleLine = L.polyline(gokhaleCoords, {
      color: '#0F766E',
      weight: 5.5,
      opacity: 0.95
    });
    gokhaleLine.bindTooltip(
      '<div style="font-weight:bold; color:#7DC5BD; font-size:11px;">★ Gokhale Bridge Flyover Bypass (ACTIVE SAFE REROUTE)</div>',
      { sticky: true }
    );
    layer.addLayer(gokhaleLine);

    // Water pool overlay over Andheri subway
    const subwayPool = L.circle([19.1197, 72.8468], {
      radius: 140,
      color: '#991B1B',
      fillColor: '#7F1D1D',
      fillOpacity: 0.6,
      weight: 2
    });
    subwayPool.bindTooltip(
      '<div style="font-weight:bold; color:#FFFFFF; font-size:11px;">Andheri Subway Saucer Basin Waterlogging (220mm)</div>'
    );
    layer.addLayer(subwayPool);
  }, []);

  // Update Inundation Polygons Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !polygonsLayerRef.current) return;
    const layer = polygonsLayerRef.current;
    layer.clearLayers();

    if (!showInundationPolygons) return;

    INDIA_FLOOD_ZONES.forEach((zone: InundationZone) => {
      const isMumbaiZone = zone.id === 'zone-mumbai-coast';
      // If focusAndheri is true, other zones are greyed out, while Mumbai zone is highlighted!
      const isHighlighted = isMumbaiZone || !focusAndheri;

      const strokeColor = isHighlighted ? (zone.severity === 'CRITICAL_FLOOD' ? '#991B1B' : '#2C5282') : '#475569';
      const fillColor = isHighlighted ? (zone.severity === 'CRITICAL_FLOOD' ? '#7F1D1D' : '#1E3E66') : '#1E293B';

      const polygon = L.polygon(zone.polygonCoordinates, {
        color: strokeColor,
        weight: isHighlighted ? 2.5 : 1,
        dashArray: isHighlighted ? '6, 6' : '3, 3',
        fillColor: fillColor,
        fillOpacity: isHighlighted ? 0.35 : 0.08
      });

      polygon.bindTooltip(
        `<div style="font-family: Inter, sans-serif; font-size: 11px; padding: 2px;">
          <div style="font-weight: 800; color: ${isHighlighted ? '#FCA5A5' : '#94A3B8'};">${zone.name}</div>
          <div style="font-size: 10px; color: #CBD5E1;">River/Basin: ${zone.riverOrBasin}</div>
          <div style="font-size: 10px; font-weight: bold; color: ${isHighlighted ? '#EF4444' : '#64748B'};">
            ${zone.waterlevelAvgMm} mm (${isHighlighted ? 'Highlighted Zone' : 'Muted Area'})
          </div>
        </div>`,
        { sticky: true, className: 'custom-flood-tooltip' }
      );

      layer.addLayer(polygon);
    });
  }, [showInundationPolygons, focusAndheri]);

  // Update Sensor Markers Layer with Highlighting on Andheri and Grey on Others
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    const layer = markersLayerRef.current;
    layer.clearLayers();

    dynamicSensors.forEach((sensor) => {
      // In filter mode, skip non-matching
      if (selectedFilter === 'ANDHERI' && !sensor.isAndheriMentioned && !sensor.isSiteHotspot) return;
      if (selectedFilter === 'CRITICAL' && sensor.hazardStatus !== 'CRITICAL_FLOOD') return;
      if (selectedFilter === 'MODERATE' && sensor.hazardStatus !== 'MODERATE_RISK') return;
      if (selectedFilter === 'SAFE' && sensor.hazardStatus !== 'SAFE') return;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          sensor.name.toLowerCase().includes(q) ||
          sensor.city.toLowerCase().includes(q) ||
          sensor.state.toLowerCase().includes(q) ||
          sensor.code.toLowerCase().includes(q);
        if (!matches) return;
      }

      const isSelected = sensor.id === selectedNodeId;
      const isAndheri = sensor.isAndheriMentioned;
      const isSiteHotspot = sensor.isSiteHotspot;

      // Determine styling: If focusAndheri is ON, non-Andheri/non-site points are GREYED OUT
      const isMutedGrey = focusAndheri && !isAndheri && !isSiteHotspot;

      let primaryColor: string;
      let pulseColor: string;
      let badgeBorder: string;
      let badgeColor: string;

      if (isMutedGrey) {
        // Neutral grey styling for non-Andheri / other places
        primaryColor = '#475569';
        pulseColor = 'transparent';
        badgeBorder = '#334155';
        badgeColor = '#94A3B8';
      } else {
        // High-contrast highlighting for Andheri & Site Hotspots
        if (isAndheri) {
          primaryColor = sensor.hazardStatus === 'SAFE' ? '#0F766E' : '#DC2626';
          pulseColor = sensor.hazardStatus === 'SAFE' ? '#2DD4BF' : '#EF4444';
          badgeBorder = sensor.hazardStatus === 'SAFE' ? '#0F766E' : '#EF4444';
          badgeColor = sensor.hazardStatus === 'SAFE' ? '#6EE7B7' : '#FCA5A5';
        } else {
          // Other site hotspots (Milan, Kurla, Hindmata, Dadar)
          primaryColor = sensor.hazardStatus === 'CRITICAL_FLOOD' ? '#991B1B' : (sensor.hazardStatus === 'MODERATE_RISK' ? '#2C5282' : '#0F766E');
          pulseColor = sensor.hazardStatus === 'CRITICAL_FLOOD' ? '#EF4444' : (sensor.hazardStatus === 'MODERATE_RISK' ? '#477A8F' : '#2D8A82');
          badgeBorder = sensor.hazardStatus === 'CRITICAL_FLOOD' ? '#991B1B' : '#203566';
          badgeColor = sensor.hazardStatus === 'CRITICAL_FLOOD' ? '#FCA5A5' : '#7DC5BD';
        }
      }

      // Flood Aura Circle (only for highlighted spots or when halos enabled)
      if (showRadiusHalos && !isMutedGrey && (sensor.hazardStatus === 'CRITICAL_FLOOD' || sensor.hazardStatus === 'MODERATE_RISK')) {
        const circleRadius = isAndheri ? 3000 : (sensor.hazardStatus === 'CRITICAL_FLOOD' ? sensor.floodAuraRadiusMeters * 1.1 : sensor.floodAuraRadiusMeters * 0.7);
        const circle = L.circle([sensor.lat, sensor.lng], {
          radius: circleRadius,
          color: primaryColor,
          weight: isAndheri ? 2 : 1,
          opacity: isAndheri ? 0.8 : 0.4,
          fillColor: primaryColor,
          fillOpacity: isAndheri ? 0.25 : 0.12
        });
        layer.addLayer(circle);
      }

      // Marker HTML
      const isBigBadge = isAndheri || isSelected;
      const markerHtml = `
        <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
          ${
            !isMutedGrey && (sensor.hazardStatus === 'CRITICAL_FLOOD' || isAndheri)
              ? `<div style="position: absolute; width: 30px; height: 30px; border-radius: 50%; background: ${pulseColor}; opacity: 0.55; animation: radar-pulse 2.0s infinite;"></div>`
              : ''
          }
          <div style="
            width: ${isBigBadge ? '20px' : (isMutedGrey ? '11px' : '14px')};
            height: ${isBigBadge ? '20px' : (isMutedGrey ? '11px' : '14px')};
            border-radius: 50%;
            background: ${primaryColor};
            border: ${isBigBadge ? '3px solid #FFFFFF' : (isMutedGrey ? '1.5px solid #64748B' : '2px solid #F0EAE0')};
            box-shadow: 0 2px 8px rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
          ">
            <div style="width: 4px; height: 4px; border-radius: 50%; background: #FFFFFF;"></div>
          </div>
          <div style="
            position: absolute;
            bottom: -20px;
            white-space: nowrap;
            background: #0C162E;
            color: ${badgeColor};
            border: 1px solid ${isBigBadge ? '#FFFFFF' : badgeBorder};
            padding: 1px 5px;
            border-radius: 4px;
            font-size: ${isBigBadge ? '10px' : '9px'};
            font-family: 'JetBrains Mono', monospace;
            font-weight: bold;
            box-shadow: 0 2px 6px rgba(0,0,0,0.6);
            opacity: ${isMutedGrey ? 0.7 : 1};
          ">
            ${isAndheri ? '★ ANDHERI: ' : ''}${sensor.waterDepth}mm
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-sensor-div-icon',
        html: markerHtml,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      const marker = L.marker([sensor.lat, sensor.lng], { icon: customIcon });

      marker.on('click', () => {
        setSelectedNodeId(sensor.id);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([sensor.lat, sensor.lng], Math.max(13, mapInstanceRef.current.getZoom()), {
            duration: 0.8
          });
        }
      });

      marker.bindTooltip(
        `<div style="font-family: Inter, sans-serif; font-size: 11px; padding: 2px;">
          <div style="font-weight: 800; color: ${isAndheri ? '#FCA5A5' : (isMutedGrey ? '#94A3B8' : '#FFFFFF')};">
            ${isAndheri ? '★ SITE MONITORED: ' : ''}${sensor.name}
          </div>
          <div style="color: #CBD5E1; font-size: 10px;">${sensor.city}, ${sensor.state} &bull; ${sensor.code}</div>
          <div style="margin-top: 2px; font-weight: bold; color: ${isMutedGrey ? '#94A3B8' : (sensor.hazardStatus === 'CRITICAL_FLOOD' ? '#F87171' : (sensor.hazardStatus === 'MODERATE_RISK' ? '#60A5FA' : '#34D399'))};">
            Depth: ${sensor.waterDepth} mm &bull; ${isMutedGrey ? 'Muted Area' : sensor.hazardStatus}
          </div>
        </div>`,
        { offset: [0, -14], direction: 'top', className: 'custom-flood-tooltip' }
      );

      layer.addLayer(marker);
    });
  }, [dynamicSensors, selectedFilter, searchQuery, selectedNodeId, focusAndheri, showRadiusHalos]);

  // Jump Functions
  const handleJumpToAndheri = () => {
    setSelectedNodeId('mum-andheri');
    setFocusAndheri(true);
    setSelectedFilter('ANDHERI');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([19.1197, 72.8468], 14, { duration: 1.2 });
    }
  };

  const handleJumpToRegion = (coords: [number, number], zoom: number) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(coords, zoom, { duration: 1.2 });
    }
  };

  const handleResetToIndia = () => {
    setSelectedFilter('ALL');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyToBounds(
        [
          [6.5, 68.0],
          [36.0, 97.5]
        ],
        { padding: [20, 20], duration: 1.2 }
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Focus Selector */}
      <div className="bg-[#0C162E] rounded-2xl border border-[#203566] p-6 text-white shadow-elevated">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[#203566]">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#15264E] border border-[#203566] text-xs font-semibold text-[#7DC5BD]">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F766E]"></span>
              </span>
              <span>100% Free OpenStreetMap Engine &bull; Zero API Key Lock</span>
              <span className="text-slate-500">&bull;</span>
              <span className="font-mono text-emerald-400 font-bold">Andheri Flood Corridor Highlighted</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Dynamic Flood Map: Andheri Hotspot &amp; National Corridor
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Andheri Subway (<span className="text-[#FCA5A5] font-semibold font-mono">MUM_ANDHERI_04</span>) and Gokhale Bridge Bypass (<span className="text-[#7DC5BD] font-semibold font-mono">ALT_FLYOVER_NAV_02</span>) are vividly highlighted with live water depth, while surrounding non-hotspot areas are muted in tactical grey.
            </p>
          </div>

          {/* Quick Primary Actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleJumpToAndheri}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#DC2626] hover:bg-[#B91C1C] text-white border border-[#EF4444] transition-all shadow-card flex items-center space-x-2 cursor-pointer active:scale-95"
            >
              <span>📍 Focus: Andheri Subway</span>
            </button>

            <button
              onClick={handleResetToIndia}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold font-mono bg-[#15264E] hover:bg-[#203566] text-slate-200 border border-[#203566] transition-all shadow-subtle flex items-center space-x-1.5 cursor-pointer"
            >
              <span>🇮🇳 Whole India</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 pt-5">
          <div
            onClick={handleJumpToAndheri}
            className="bg-[#15264E] p-3.5 rounded-xl border-2 border-[#DC2626] cursor-pointer hover:bg-[#1A2E5E] transition-colors"
          >
            <div className="text-[11px] font-mono text-[#FCA5A5] uppercase font-bold">Andheri Subway Station</div>
            <div className="text-2xl font-extrabold font-mono text-white mt-1">220 mm</div>
            <div className="text-[10px] text-[#FCA5A5] font-semibold mt-0.5">⚠️ Subway Submerged &bull; Reroute Active</div>
          </div>

          <div className="bg-[#101D3D] p-3.5 rounded-xl border border-[#203566]">
            <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Gokhale Bridge Flyover</div>
            <div className="text-2xl font-extrabold font-mono text-[#34D399] mt-1">15 mm</div>
            <div className="text-[10px] text-[#6EE7B7] font-semibold mt-0.5">✓ Official Bypass &bull; Clear Passage</div>
          </div>

          <div className="bg-[#101D3D] p-3.5 rounded-xl border border-[#203566]">
            <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Site Mumbai Hotspots</div>
            <div className="text-2xl font-extrabold font-mono text-[#93C5FD] mt-1">5 Subways</div>
            <div className="text-[10px] text-[#BFDBFE] font-semibold mt-0.5">Andheri, Milan, Kurla, Hindmata, Dadar</div>
          </div>

          <div className="bg-[#101D3D] p-3.5 rounded-xl border border-[#203566]">
            <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">National Telemetry Grid</div>
            <div className="text-2xl font-extrabold font-mono text-slate-200 mt-1">{stats.total} Stations</div>
            <div className="text-[10px] text-slate-400 font-semibold mt-0.5">Across 7 Indian River Basins</div>
          </div>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="bg-[#F0EAE0] rounded-2xl border border-[#D4CBB9] p-4 sm:p-5 shadow-card space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search station (e.g. Andheri, Gokhale Bridge, Milan, Kurla, Kaziranga)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-[#C7BEAD] bg-[#DDD5C5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/40 text-xs sm:text-sm font-medium text-[#0F172A]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                ✕
              </button>
            )}
          </div>

          {/* Highlight & Filter Toggle Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 lg:pb-0">
            <button
              onClick={() => {
                setSelectedFilter('ANDHERI');
                setFocusAndheri(true);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1.5 ${
                selectedFilter === 'ANDHERI'
                  ? 'bg-[#DC2626] text-white border border-[#B91C1C] shadow-sm'
                  : 'bg-[#DDD5C5] text-[#0F172A] border border-[#C7BEAD] hover:bg-white'
              }`}
            >
              <span>★ Andheri &amp; Site Hotspots</span>
            </button>
            <button
              onClick={() => {
                setSelectedFilter('ALL');
                setFocusAndheri(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === 'ALL'
                  ? 'bg-[#0C162E] text-[#7DC5BD] border border-[#2D8A82]/50 shadow-sm'
                  : 'bg-[#DDD5C5] text-[#0F172A] border border-[#C7BEAD] hover:bg-white'
              }`}
            >
              All India ({dynamicSensors.length})
            </button>
            <button
              onClick={() => setSelectedFilter('CRITICAL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === 'CRITICAL'
                  ? 'bg-[#991B1B] text-white border border-[#B91C1C] shadow-sm'
                  : 'bg-[#DDD5C5] text-[#991B1B] border border-[#C7BEAD] hover:bg-white'
              }`}
            >
              Critical Floods ({stats.critical})
            </button>
            <button
              onClick={() => setSelectedFilter('MODERATE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === 'MODERATE'
                  ? 'bg-[#2C5282] text-white border border-[#1E3E66] shadow-sm'
                  : 'bg-[#DDD5C5] text-[#2C5282] border border-[#C7BEAD] hover:bg-white'
              }`}
            >
              Moderate ({stats.moderate})
            </button>
          </div>
        </div>

        {/* Second Row: Andheri Highlight Controls + Map Theme Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#D4CBB9] text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-bold text-[#0F172A] uppercase tracking-wider text-[11px] mr-1">
              Quick Corridor Focus:
            </span>
            <button
              onClick={handleJumpToAndheri}
              className="px-2.5 py-1 rounded-md font-mono font-bold bg-[#DC2626] text-white border border-[#B91C1C] cursor-pointer"
            >
              ★ Andheri Subway
            </button>
            <button
              onClick={() => {
                setSelectedNodeId('mum-andheri-gokhale');
                if (mapInstanceRef.current) mapInstanceRef.current.flyTo([19.1172, 72.8475], 15);
              }}
              className="px-2.5 py-1 rounded-md font-mono font-bold bg-[#0F766E] text-white border border-[#115E59] cursor-pointer"
            >
              ★ Gokhale Bridge
            </button>
            <button
              onClick={() => {
                setSelectedNodeId('mum-milan');
                if (mapInstanceRef.current) mapInstanceRef.current.flyTo([19.0838, 72.8395], 14);
              }}
              className="px-2.5 py-1 rounded-md font-mono font-bold bg-[#DDD5C5] hover:bg-white text-[#0F172A] border border-[#C7BEAD] cursor-pointer"
            >
              Milan Subway
            </button>
            <button
              onClick={() => {
                setSelectedNodeId('mum-kurla');
                if (mapInstanceRef.current) mapInstanceRef.current.flyTo([19.0726, 72.8798], 14);
              }}
              className="px-2.5 py-1 rounded-md font-mono font-bold bg-[#DDD5C5] hover:bg-white text-[#0F172A] border border-[#C7BEAD] cursor-pointer"
            >
              Kurla West
            </button>
            <button
              onClick={() => {
                setSelectedNodeId('mum-hindmata');
                if (mapInstanceRef.current) mapInstanceRef.current.flyTo([19.0118, 72.8427], 14);
              }}
              className="px-2.5 py-1 rounded-md font-mono font-bold bg-[#DDD5C5] hover:bg-white text-[#0F172A] border border-[#C7BEAD] cursor-pointer"
            >
              Hindmata
            </button>
            <button
              onClick={() => handleJumpToRegion([26.57, 93.17], 8)}
              className="px-2.5 py-1 rounded-md font-mono font-bold bg-[#DDD5C5] hover:bg-white text-[#0F172A] border border-[#C7BEAD] cursor-pointer"
            >
              Assam
            </button>
          </div>

          {/* Map theme switcher */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="font-bold text-[#64748B]">Map Style:</span>
            <div className="inline-flex rounded-lg border border-[#C7BEAD] bg-[#DDD5C5] p-0.5">
              <button
                onClick={() => setMapTheme('dark')}
                className={`px-2.5 py-1 rounded-md font-semibold text-xs transition-colors cursor-pointer ${
                  mapTheme === 'dark' ? 'bg-[#0C162E] text-white shadow-sm' : 'text-[#0F172A]'
                }`}
              >
                Dark Grey Tactical
              </button>
              <button
                onClick={() => setMapTheme('street')}
                className={`px-2.5 py-1 rounded-md font-semibold text-xs transition-colors cursor-pointer ${
                  mapTheme === 'street' ? 'bg-white text-[#0F172A] shadow-sm' : 'text-[#64748B]'
                }`}
              >
                Street Map
              </button>
            </div>

            <label className="flex items-center space-x-1.5 ml-2 cursor-pointer">
              <input
                type="checkbox"
                checked={focusAndheri}
                onChange={(e) => setFocusAndheri(e.target.checked)}
                className="rounded accent-[#0F766E] w-3.5 h-3.5"
              />
              <span className="text-[#0F172A] font-semibold">Grey Out Non-Site Places</span>
            </label>
          </div>
        </div>

        {/* Dynamic Monsoon Slider */}
        <div className="pt-2 border-t border-[#D4CBB9] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Simulate Precipitation at Andheri:
            </span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#E2ECEB] text-[#0F766E] border border-[#BBD5D2]">
              {rainModifierMm >= 0 ? `+${rainModifierMm} mm Monsoon Surge` : `${rainModifierMm} mm Dry Spell`}
            </span>
          </div>

          <div className="flex-1 sm:max-w-xs flex items-center space-x-3">
            <input
              type="range"
              min="-60"
              max="140"
              step="10"
              value={rainModifierMm}
              onChange={(e) => setRainModifierMm(Number(e.target.value))}
              className="w-full cursor-pointer"
            />
            <button
              onClick={() => setRainModifierMm(0)}
              className="text-[11px] font-mono text-slate-500 hover:text-slate-800 underline shrink-0 cursor-pointer"
            >
              Reset (0)
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Layout: Dynamic Zoomable Leaflet Map + Active Telemetry Inspector Side Card */}
      <div className="grid lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT COLUMN: Map Container + Live Fleet Advisory Feed (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* MAP CANVAS */}
          <div className="relative bg-[#0C162E] rounded-2xl border border-[#203566] overflow-hidden shadow-elevated h-[460px] sm:h-[500px]">
            {/* Map canvas */}
            <div ref={mapContainerRef} className="w-full h-full z-10" />

            {/* Floating Andheri Notice Banner overlay */}
            <div className="absolute top-3 left-3 z-20 bg-[#0C162E]/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#203566] shadow-card text-[11px] text-slate-300 pointer-events-none">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-pulse"></span>
                <span className="font-bold text-white">Andheri Subway Highlighted</span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-slate-300">Other places greyed out &bull; Scroll to zoom street level</span>
              </div>
            </div>

            {/* Floating Route Legend Overlay */}
            <div className="absolute bottom-6 left-3 z-20 bg-[#0C162E]/95 backdrop-blur-md p-3.5 rounded-xl border border-[#203566] text-[11px] shadow-card space-y-1.5">
              <div className="font-bold text-white text-[10px] uppercase tracking-wider mb-1">
                Corridor Navigation Legend
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-1.5 bg-[#DC2626] rounded"></span>
                <span className="text-white font-bold">Andheri Subway Direct Lane (Submerged &gt;150mm)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-1.5 bg-[#0F766E] rounded"></span>
                <span className="text-[#6EE7B7] font-bold">Gokhale Bridge Flyover (Safe Active Bypass)</span>
              </div>
              <div className="flex items-center space-x-2 pt-1 border-t border-[#203566]">
                <span className="w-3 h-3 rounded-full bg-[#475569]"></span>
                <span className="text-slate-400">Grey Nodes: Muted Non-Andheri Regions</span>
              </div>
            </div>
          </div>

          {/* LIVE DISPATCH & HYDRO-LOCK ADVISORY CONSOLE (Fills the space under the map) */}
          <div className="bg-[#0C162E] rounded-2xl border border-[#203566] p-4 text-white shadow-card space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#203566] pb-2.5">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#15264E] border border-[#203566] flex items-center justify-center text-[#4E9B93]">
                  <IconRoute className="w-4 h-4 text-[#4E9B93]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white tracking-tight leading-none">
                    Live Dispatch Advisories &bull; Andheri &amp; Mumbai Corridors
                  </h4>
                  <span className="text-[10px] font-mono text-[#68B0A8]">
                    Real-Time Autonomous Fleet Guidance &bull; 3s Telemetry
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded bg-[#14332B] text-[#7DC5BD] border border-[#245447] font-bold">
                  ● 318 ACTIVE REROUTES
                </span>
                <span className="px-2 py-0.5 rounded bg-[#101D3D] text-slate-300 border border-[#203566]">
                  BMC SYNC: 100%
                </span>
              </div>
            </div>

            {/* Advisory event ticker */}
            <div className="grid sm:grid-cols-2 gap-2.5 text-xs">
              {/* Event 1: Andheri Subway Alert */}
              <div className="p-2.5 rounded-xl bg-[#15264E]/80 border border-[#DC2626]/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#FCA5A5] flex items-center space-x-1.5 font-mono text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse"></span>
                    <span>MUM_ANDHERI_04</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">12s ago</span>
                </div>
                <div className="font-semibold text-slate-100 text-[11px] leading-tight">
                  Water pooling at 220mm. Ingress barrier triggered for 2-wheelers.
                </div>
                <div className="text-[10px] text-[#7DC5BD] font-mono">
                  → Traffic rerouted via Gokhale Flyover (+3.5 min ETA)
                </div>
              </div>

              {/* Event 2: Gokhale Flyover Bypass */}
              <div className="p-2.5 rounded-xl bg-[#15264E]/80 border border-[#0F766E]/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#6EE7B7] flex items-center space-x-1.5 font-mono text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-[#0F766E]"></span>
                    <span>ALT_FLYOVER_NAV_02</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">28s ago</span>
                </div>
                <div className="font-semibold text-slate-100 text-[11px] leading-tight">
                  Gokhale Elevated Link 100% dry (15mm). Optimal transit speed 42 km/h.
                </div>
                <div className="text-[10px] text-[#6EE7B7] font-mono">
                  ✓ High-velocity corridor verified for cargo &amp; bikes
                </div>
              </div>

              {/* Event 3: Kurla & Mithi River Alert */}
              <div className="p-2.5 rounded-xl bg-[#15264E]/80 border border-[#203566] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#93C5FD] flex items-center space-x-1.5 font-mono text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-[#2C5282]"></span>
                    <span>MUM_KURLA_07</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">1m ago</span>
                </div>
                <div className="font-semibold text-slate-200 text-[11px] leading-tight">
                  Mithi River basin backflow. 340mm submergence at LBS Marg underpass.
                </div>
                <div className="text-[10px] text-amber-300 font-mono">
                  → Dispatched deliveries re-vectored to BKC Connector
                </div>
              </div>

              {/* Event 4: BMC Pumping Operations */}
              <div className="p-2.5 rounded-xl bg-[#15264E]/80 border border-[#203566] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 flex items-center space-x-1.5 font-mono text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>BMC_WARD_KW_PUMPS</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">2m ago</span>
                </div>
                <div className="font-semibold text-slate-200 text-[11px] leading-tight">
                  Stormwater pumps #1 &amp; #2 operating at 95% capacity in Andheri basin.
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Estimated basin recess time: 45 minutes post-rain
                </div>
              </div>
            </div>

            {/* Bottom mini metric bar */}
            <div className="pt-2 border-t border-[#203566] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
              <div className="flex items-center space-x-4">
                <span>Prevented Hydro-Locks: <strong className="text-emerald-400">1,250 Fleet Units</strong></span>
                <span className="hidden sm:inline">&bull;</span>
                <span className="hidden sm:inline">Fleet Savings: <strong className="text-white">₹5.98 Cr</strong></span>
              </div>
              <div className="text-[#68B0A8] font-bold">
                API SLA: 11ms Latency &bull; 99.98% Uptime
              </div>
            </div>
          </div>
        </div>

        {/* ACTIVE TELEMETRY INSPECTOR CARD (4 Cols) */}
        <div className="lg:col-span-4 bg-[#F0EAE0] rounded-2xl border border-[#D4CBB9] p-6 shadow-card space-y-5">
          <div className="flex items-center justify-between border-b border-[#D4CBB9] pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F766E]"></span>
              <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                {activeNode.isAndheriMentioned ? 'Featured Andheri Station' : 'Active Telemetry Station'}
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#0F766E] bg-[#E2ECEB] px-2.5 py-0.5 rounded border border-[#BBD5D2] font-semibold">
              {activeNode.lastPing}
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#DC2626]">{activeNode.code}</span>
              {activeNode.isAndheriMentioned && (
                <span className="text-[10px] font-bold uppercase bg-[#F5E6E6] text-[#991B1B] px-2 py-0.5 rounded border border-[#E5C2C2]">
                  Site Featured Hotspot
                </span>
              )}
            </div>
            <h3 className="text-xl font-extrabold text-[#0F172A] mt-1 leading-tight">
              {activeNode.name}
            </h3>
            <p className="text-xs text-[#384860] mt-0.5">
              {activeNode.city}, {activeNode.state}
            </p>
          </div>

          {/* Large Depth Gauge Meter */}
          <div className="p-4 rounded-xl bg-[#DDD5C5] border border-[#C7BEAD] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#64748B] uppercase tracking-wider">
              <span>Ultrasonic Measured Water Depth</span>
              <span className="font-mono text-slate-600">±1.5mm Acc</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span
                className={`text-4xl font-extrabold font-mono ${
                  activeNode.hazardStatus === 'CRITICAL_FLOOD'
                    ? 'text-[#991B1B]'
                    : activeNode.hazardStatus === 'MODERATE_RISK'
                    ? 'text-[#B45309]'
                    : 'text-[#0F766E]'
                }`}
              >
                {activeNode.waterDepth}
              </span>
              <span className="text-sm font-bold text-[#0F172A]">millimeters</span>
            </div>

            {/* Depth bar indicator */}
            <div className="w-full h-2 rounded-full bg-[#C7BEAD] overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  activeNode.hazardStatus === 'CRITICAL_FLOOD'
                    ? 'bg-[#991B1B]'
                    : activeNode.hazardStatus === 'MODERATE_RISK'
                    ? 'bg-[#B45309]'
                    : 'bg-[#0F766E]'
                }`}
                style={{ width: `${Math.min(100, (activeNode.waterDepth / 500) * 100)}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold">
              <span
                className={
                  activeNode.hazardStatus === 'CRITICAL_FLOOD'
                    ? 'text-[#991B1B]'
                    : activeNode.hazardStatus === 'MODERATE_RISK'
                    ? 'text-[#B45309]'
                    : 'text-[#0F766E]'
                }
              >
                &bull; {activeNode.hazardStatus.replace('_', ' ')}
              </span>
              <span className="font-mono text-slate-600">Trend: {activeNode.trend}</span>
            </div>
          </div>

          {/* Fleet Routing Action & Clearance Card */}
          <div className="space-y-3 text-xs">
            <div className={`p-3.5 rounded-xl border space-y-1.5 ${
              activeNode.fleetAction === 'TRIGGER_REROUTE'
                ? 'bg-[#F5E6E6] border-[#E5C2C2]'
                : 'bg-[#E2ECEB]/60 border-[#BBD5D2]'
            }`}>
              <div className="flex items-center space-x-1.5 font-bold text-[#0F766E]">
                <IconRoute className="w-4 h-4 text-[#0F766E]" />
                <span>DYNAMIC ROUTING DECISION</span>
              </div>
              <div className={`font-mono font-extrabold text-sm ${
                activeNode.fleetAction === 'TRIGGER_REROUTE' ? 'text-[#991B1B]' : 'text-[#0F172A]'
              }`}>
                {activeNode.fleetAction}
              </div>
              <div className="text-[#384860] leading-snug">
                Recommended Bypass: <strong className="text-[#0F172A]">{activeNode.bypassRoute}</strong>
              </div>
              {activeNode.estDelayMin > 0 && (
                <div className="text-[11px] text-[#B45309] font-mono font-semibold">
                  Estimated Detour Delay: +{activeNode.estDelayMin.toFixed(1)} mins (Averts Hydro-Lock)
                </div>
              )}
            </div>

            <div className="space-y-2 pt-1 border-t border-[#D4CBB9]">
              <div className="flex items-center justify-between py-1 border-b border-[#D4CBB9]">
                <span className="text-[#64748B]">Clearance Status:</span>
                <span className="font-bold text-[#0F172A] text-right max-w-[180px]">{activeNode.clearance}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#D4CBB9]">
                <span className="text-[#64748B]">Drainage / Pumps:</span>
                <span className="font-bold text-[#0F172A] text-right max-w-[180px]">{activeNode.pumps}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#D4CBB9]">
                <span className="text-[#64748B]">GPS Coordinates:</span>
                <span className="font-mono font-semibold text-[#0F172A]">
                  {activeNode.lat.toFixed(4)}°N, {activeNode.lng.toFixed(4)}°E
                </span>
              </div>
            </div>
          </div>

          {/* Andheri Hotspots List */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider block">
              Site Monitored Stations ({dynamicSensors.filter(s => s.isSiteHotspot).length}):
            </span>
            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
              {dynamicSensors.map((node) => {
                const isSelected = node.id === selectedNodeId;
                const isAndheri = node.isAndheriMentioned;
                const isHotspot = node.isSiteHotspot;

                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      setSelectedNodeId(node.id);
                      if (mapInstanceRef.current) {
                        mapInstanceRef.current.flyTo([node.lat, node.lng], isAndheri ? 14 : 10, { duration: 1 });
                      }
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#0C162E] text-white font-bold shadow-sm'
                        : isAndheri
                        ? 'bg-[#F5E6E6] text-[#991B1B] hover:bg-white border border-[#E5C2C2]'
                        : isHotspot
                        ? 'bg-[#DDD5C5] text-[#0F172A] hover:bg-white border border-[#C7BEAD]'
                        : 'bg-[#DDD5C5]/60 text-slate-500 hover:bg-white border border-[#C7BEAD]/60'
                    }`}
                  >
                    <div className="truncate mr-2">
                      <span className="font-semibold block truncate">
                        {isAndheri ? '★ ' : ''}{node.name}
                      </span>
                      <span className="text-[10px] opacity-75">{node.city}, {node.state}</span>
                    </div>
                    <span
                      className={`font-mono font-bold text-[11px] px-1.5 py-0.5 rounded ${
                        node.hazardStatus === 'CRITICAL_FLOOD'
                          ? 'bg-[#991B1B] text-white'
                          : node.hazardStatus === 'MODERATE_RISK'
                          ? 'bg-[#B45309] text-white'
                          : 'bg-[#0F766E] text-white'
                      }`}
                    >
                      {node.waterDepth}mm
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
