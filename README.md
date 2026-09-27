# FloodGrid

> **B2B IoT Flood Intelligence & Real-Time Dynamic Routing DaaS Engine for Commercial Fleets**

FloodGrid is an enterprise Data-as-a-Service (DaaS) platform designed to protect commercial logistics fleets, delivery hubs, and transit operations from urban waterlogging, vehicle hydro-locks, and severe monsoon disruptions across Mumbai and national flood corridors. Millimeter-accurate ultrasonic IoT sensors mounted on civic lighting infrastructure stream real-time water depth telemetry into logistics routing engines via ultra-low-latency REST APIs and 3-second Webhooks.

---

## 🌟 Key Platform Features

- **Millimeter-Precise Ground Telemetry:** Dual-frequency ultrasonic water-depth measurements (±1.5 mm precision) streamed every 3 seconds with sub-12ms API response latency.
- **Dynamic AI Fleet Rerouting:** Automated vehicle clearance threshold evaluation (150 mm for two-wheelers, 250 mm for light commercial vehicles/vans) injecting dynamic flyover bypass geometry (GeoJSON) directly into driver navigation feeds.
- **Interactive Nationwide Flood Map:** Scalable Leaflet/GIS map covering high-risk meteorological zones across India (Mumbai, Assam/Brahmaputra, Bihar/Kosi-Ganga, Delhi/Yamuna, Chennai, Bengaluru, and Kerala).
- **Developer API Playground:** Interactive simulation sandbox enabling logistics engineers to adjust simulated flood depths (0 to 500 mm), inspect live JSON request/response payloads, and evaluate routing decisions.
- **Commercial B2B Fleet Licensing:** Transparent monthly subscription plans tailored for real-world monsoon scaling with zero seasonal lock-in.
- **Enterprise Client Portal:** Dedicated corporate operations console with monthly API consumption tracking, live telemetry grid, automated diversion logs, and production API key/webhook management.

---

## 💳 Commercial Fleet Licensing (Pricing Model)

Simple monthly plans priced for real-world usage, naturally scaling with monsoon demand without seasonal lock-in:

| Plan | Base Price | Included Quota | Effective Cost | Overage Rate | Refresh Rate & SLA |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **B2B Starter Fleet** *(Small Dispatch)* | **₹8,000** / month | 50,000 calls/mo | ₹0.16 / call | ₹0.20 / call | 1-minute refresh &bull; Standard SLA |
| **B2B Enterprise Fleet** *(High-Velocity Delivery)* | **₹28,000** / month | 2,00,000 calls/mo | ₹0.14 / call | ₹0.15 / call | 3-second webhooks &bull; 99.9% Uptime SLA |
| **Enterprise Unlimited** *(Municipal & Mega-Logistics)* | **₹60,000** / month *(Save 15% annually)* | Unlimited calls | All-inclusive | Zero overage | Dedicated infrastructure (<10ms) &bull; 24/7 BMC war-room desk |

---

## 🏗️ System Architecture

```text
┌─────────────────────────────────┐
│     Streetlight IoT Sensors     │  Ultrasonic distance sensing
│  (Solar + LiFePO4 + 4G/NB-IoT)  │  3-second water-level sampling (±1.5mm)
└────────────────┬────────────────┘
                 │ Telemetry Stream (JSON over MQTT/HTTPS)
                 ▼
┌─────────────────────────────────┐
│     FloodGrid Ingestion Hub     │  Noise filtration & baseline correction
│      (<12ms Edge Processing)    │  Real-time depth classification
└────────────────┬────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
┌───────────────┐ ┌────────────────┐
│ REST & Events │ │ Reroute Engine │  Evaluates 2W (150mm) & 4W (250mm) limits
│   Endpoints   │ │ (AI Telemetry) │  Generates dynamic GeoJSON detour paths
└───────┬───────┘ └───────┬────────┘
        │                 │
        ▼                 ▼
┌─────────────────────────────────┐
│ Enterprise Fleet Routing Ingest │  Direct injection into dispatch systems
│  (B2B Logistics & 3PL Fleets)   │  (Swiggy, Zepto, BlueDart, Delhivery)
└─────────────────────────────────┘
```

---

## 🛠️ Tech Stack

- **Frontend Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling:** [Vite 8](https://vite.dev/)
- **Styling & Design System:** [Tailwind CSS v4](https://tailwindcss.com/)
  - Industrial warmth theme (`#E6DFD3`, `#F0EAE0`, `#DDD5C5`)
  - Deep midnight navy dashboard accents (`#0C162E`, `#15264E`)
  - High-contrast telemetry emerald/teal (`#0F766E`, `#7DC5BD`)
- **GIS & Mapping:** [Leaflet](https://leafletjs.com/) + Custom vector projections for Indian urban basins and street-level corridor pole visualization
- **Icons & Branding:** Custom SVG icons + [Lucide React](https://lucide.dev/)
- **Runtime:** Node.js (ES Modules) with Express proxy capabilities

---

## 📁 Repository Structure

```text
├── index.html                   # HTML entry point with metadata & SEO tags
├── metadata.json                # Applet configuration & manifest
├── package.json                 # Dependencies & scripts
├── vite.config.ts               # Vite bundler configuration
├── tsconfig.json                # TypeScript compiler configuration
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # View state router & main navigation container
│   ├── index.css                # Tailwind CSS v4 directives & theme variables
│   ├── components/
│   │   ├── Navbar.tsx           # Header navigation with pilot status indicator
│   │   ├── LandingPage.tsx      # Platform overview, problem statement & value props
│   │   ├── IndiaFloodMap.tsx    # Nationwide zoomable interactive flood risk map
│   │   ├── MumbaiCorridorMap.tsx# 5-pole Mumbai sensor corridor network visualizer
│   │   ├── LiveApiDemoSection.tsx# Developer interactive API sandbox & depth sliders
│   │   ├── PricingSection.tsx   # Tiered B2B monthly subscription plans & modal
│   │   ├── ClientPortalSection.tsx# Operations console (Overview, Hotspots, Routing, API Keys)
│   │   ├── FloodGridBrandLogo.tsx# Official vector brand logo component
│   │   ├── Icons.tsx            # Handcrafted SVG icons & telemetry indicators
│   │   └── Footer.tsx           # Platform links, SLA status, and copyright
│   └── data/
│       ├── hotspots.ts          # Mumbai pilot sensor node specifications
│       └── indiaSensors.ts      # All-India sensor grid telemetry coordinates
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/floodgrid.git
   cd floodgrid
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be live at `http://localhost:3000`.

4. **Verify types and code formatting:**
   ```bash
   npm run lint
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📡 API Reference Preview

### 1. Inquire Sensor Telemetry
```http
POST /v1/routing/evaluate
Authorization: Bearer fg_live_mumbai_99a82b71xc8841a0e9921b7
Content-Type: application/json

{
  "corridor_id": "FG-MUM-MIL-02",
  "vehicle_type": "2wheeler"
}
```

**Response (`200 OK`)**:
```json
{
  "status": 200,
  "timestamp": "2026-09-27T12:00:00Z",
  "hotspot_id": "FG_HOTSPOT_MILAN_02",
  "sensor_telemetry": {
    "water_depth_mm": 220,
    "hazard_status": "MODERATE_FLOOD",
    "trend": "RISING"
  },
  "routing_decision": {
    "allow_passage_2wheeler": false,
    "allow_passage_4wheeler": true,
    "action": "TRIGGER_REROUTE",
    "alternate_path_id": "ALT_MILAN_FLY_01",
    "estimated_delay_minutes": 22.0
  },
  "api_latency_ms": 11
}
```

---

## 📄 License

Distributed under the Apache-2.0 License. See `LICENSE` for more information.
