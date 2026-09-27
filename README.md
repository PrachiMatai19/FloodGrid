# FloodGrid

> **B2B IoT Flood Intelligence & Real-Time Dynamic Routing API for Commercial Logistics Fleets**

FloodGrid is an enterprise Data-as-a-Service (DaaS) platform engineered to protect delivery and logistics fleets from monsoon waterlogging, vehicle hydro-lock, and delivery SLA disruptions across Mumbai and national floodplains in India. Millimeter-precise ultrasonic IoT sensors deployed across critical urban chokepoints continuously feed hyper-local telemetry into dispatch engines via low-latency REST APIs and Webhooks.

---

## Key Highlights

- **Millimeter-Accurate Telemetry**: Dual-frequency ultrasonic water-depth measurements (±1.5 mm precision) streamed every 3 seconds via 4G-LTE / NB-IoT backhaul.
- **Dynamic AI Fleet Rerouting**: Autonomous reroute triggers (`TRIGGER_REROUTE`, `SLOW_PASSAGE`, `MAINTAIN_ROUTE`) that divert vehicles before entering submerged saucers or underpasses (e.g. automatically rerouting traffic from the submerged Andheri Subway to the elevated Gokhale Bridge Flyover).
- **Interactive Telemetry Map**:
  - Street-level zoomable map powered by OpenStreetMap (zero proprietary API keys required).
  - Highlighting for critical Mumbai flood hotspots (Andheri Subway, Gokhale Bridge, Milan Subway, Kurla West / LBS Marg, Hindmata, Dadar TT).
  - Tactically muted national overview covering flood belts across Assam (Brahmaputra), Bihar (Kosi-Ganga), Delhi (Yamuna), Chennai, Bengaluru, and Kerala.
  - Interactive Monsoon Precipitation simulation slider (-60 mm dry spell to +140 mm cloudburst).
- **Live Fleet Dispatch & Advisory Console**: Real-time ticker tracking active diversions, municipal pumping operations (BMC Ward K/West), avoided hydro-locks, and capital savings.
- **Interactive API Playground**: Real-time REST API testing console with live JSON payloads, cURL / Node.js / Python snippets, and instant parameter modulation.
- **B2B Client Portal**: Enterprise billing and consumption metrics, API key generation, rate limits, webhook subscriptions, and vehicle health telemetry.

---

## System Architecture

```text
┌─────────────────────────────────┐
│     Streetlight IoT Sensors     │  Ultrasonic distance sensing
│  (Solar + LiFePO4 + 4G/NB-IoT)  │  Sub-second water-level sampling
└────────────────┬────────────────┘
                 │ Telemetry Payload (JSON over MQTT/HTTPS)
                 ▼
┌─────────────────────────────────┐
│     FloodGrid Ingestion Hub     │  Noise filtration & outlier removal
│      (11ms Edge Processing)     │  Submergence threshold evaluation
└────────────────┬────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
┌───────────────┐ ┌────────────────┐
│ REST & Events │ │ Reroute Engine │  Calculates detour delays & safety
│   Endpoints   │ │ (AI Telemetry) │  Selects alternate elevated bridges
└───────┬───────┘ └───────┬────────┘
        │                 │
        ▼                 ▼
┌─────────────────────────────────┐
│ Enterprise Fleet Routing Ingest │  Direct integration with Swiggy,
│  (Zomato, Zepto, Porter, Delhi) │  Zepto, Porter, Blinkit & 3PLs
└─────────────────────────────────┘
```

---

## Application Structure

```text
├── index.html                   # HTML entry point with metadata & SEO tags
├── metadata.json                # Project capabilities & permissions manifest
├── package.json                 # Dependencies & build scripts
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript compiler configuration
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # Primary view state router & navigation shell
│   ├── index.css                # Global Tailwind CSS + Leaflet custom styling
│   ├── components/
│   │   ├── Navbar.tsx           # Header navigation with live Mumbai pilot counter
│   │   ├── LandingPage.tsx      # Platform overview, value proposition & technical spec
│   │   ├── IndiaFloodMap.tsx    # Zoomable Leaflet map with Andheri spotlight & telemetry
│   │   ├── MumbaiCorridorMap.tsx# 5-pole corridor visualization with live sensor feeds
│   │   ├── LiveApiDemoSection.tsx# Interactive API request/response simulator & sandbox
│   │   ├── ClientPortalSection.tsx# Enterprise dashboard, usage quotas, API key manager
│   │   ├── PricingSection.tsx   # Tiered B2B API pricing & billing models
│   │   ├── FloodGridBrandLogo.tsx# Vector SVG brand logo with water reflection effect
│   │   ├── Icons.tsx            # Handcrafted UI and system status icons
│   │   └── Footer.tsx           # Platform links, SLA status, and copyright
│   └── data/
│       ├── indiaSensors.ts      # 22+ realistic IoT sensor nodes & inundation zones
│       └── mockSensors.ts       # Mumbai pilot corridor pole datasets
```

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with an enterprise industrial palette (Deep Midnight Navy `#0C162E`, Sandstone Beige `#E6DFD3`, Sea-foam Teal `#0F766E`, Hazard Crimson `#991B1B`)
- **Mapping Engine**: [Leaflet](https://leafletjs.com/) with custom-filtered tactical OpenStreetMap vector tiles (100% free, no external API keys required)
- **Icons & Animation**: Custom vector SVG components + CSS radar animations

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/floodgrid.git
   cd floodgrid
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (if needed):
   ```bash
   cp .env.example .env
   ```

### Running Locally

Start the Vite development server:
```bash
npm run dev
```

The application will launch on `http://localhost:3000`.

### Building for Production

Compile TypeScript and build the optimized production bundle:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

Run code quality / TypeScript type checks:
```bash
npm run lint
```

---

## API Specification Preview

### 1. Inquire Sensor Telemetry
```http
GET /api/v1/sensors/MUM_ANDHERI_04/telemetry
Authorization: Bearer fg_live_fleet_swiggy_production_key
```

**Response (`200 OK`)**:
```json
{
  "sensor_id": "MUM_ANDHERI_04",
  "location": "Andheri Subway (S.V. Road Underpass)",
  "coordinates": { "lat": 19.1197, "lng": 72.8468 },
  "water_depth_mm": 220,
  "hazard_status": "MODERATE_RISK",
  "clearance": "2W Blocked, 4W Extreme Caution",
  "fleet_action": "TRIGGER_REROUTE",
  "recommended_bypass": "Gokhale Bridge Flyover Bypass (ALT_FLYOVER_NAV_02)",
  "est_detour_delay_minutes": 3.5,
  "pumping_status": "Active (2 high-flow pumps running)",
  "last_updated": "2026-09-27T07:10:00Z"
}
```

### 2. Corridor Routing Decision Hook
```http
POST /api/v1/routing/evaluate-corridor
Content-Type: application/json
Authorization: Bearer fg_live_fleet_swiggy_production_key

{
  "vehicle_type": "TWO_WHEELER",
  "origin": { "lat": 19.1150, "lng": 72.8400 },
  "destination": { "lat": 19.1250, "lng": 72.8550 },
  "planned_corridor": "ANDHERI_SUBWAY_DIRECT"
}
```

---

## License

This project is licensed under the Apache-2.0 License.
