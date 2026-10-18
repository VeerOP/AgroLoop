# AGROLOOP — MVP Prototype Specification & System Manual
**Vertical**: Entrepreneurship | **Deliverable**: MVP / Working Prototype Specification  
**Project**: AgroLoop (Circular Bio-Economy Platform)  
**Academic Year**: 2026–27 | **Course**: Design Experience III  
**Institution**: MPSTME, SVKM's NMIMS (Deemed-to-be University), Mumbai  
**Student**: Veer Nagda (B.Tech Computer Engineering)  
**Faculty Mentor**: Prof. Deepali A. Maste  

---

## 1. System Overview & Technical Stack

AgroLoop is a full-stack, production-engineered circular bio-economy platform architected to connect urban food scrap generators in Mumbai with smallholder farmers in peri-urban Maharashtra.

```
┌───────────────────────────────────────────────────────────────────────────────────────┐
│                               AGROLOOP SYSTEM ARCHITECTURE                            │
├───────────────────────────────────────────────────────────────────────────────────────┤
│                                     CLIENT LAYER                                      │
│  Next.js 15 App Router • React 19 • TypeScript • Tailwind CSS • Lucide Icons         │
│  Progressive Web App (PWA) • Service Worker Caching • MapLibre GL Regional Mapping    │
├───────────────────────────────────────────────────────────────────────────────────────┤
│                                  APPLICATION LAYER                                    │
│  Next.js Server Components & Route Handlers (`/api/ai/advisor`)                       │
│  Deterministic Agronomic Rule Engine (Enforces ICAR NPK & FCO 1985 dosage limits)     │
│  Dynamic Environmental Impact & Carbon Calculator (`src/lib/impact/calculator.ts`)   │
│  Client-Side Resilient Local Storage Engine (`src/lib/db/store.ts`) for offline viva  │
├───────────────────────────────────────────────────────────────────────────────────────┤
│                                      DATA LAYER                                       │
│  Supabase Cloud PostgreSQL Database • Strict Row Level Security (RLS) Policies        │
│  14 Relational Tables • Seed Data Engine (`src/lib/seed-data.ts`)                     │
├───────────────────────────────────────────────────────────────────────────────────────┤
│                                   EXTERNAL SERVICES                                   │
│  Google Gemini 1.5 Pro AI (`@google/generative-ai`) • OpenStreetMap / MapLibre Tiles  │
└───────────────────────────────────────────────────────────────────────────────────────┘
```

### Core Technology Stack:
- **Framework**: Next.js 15.1.7 (React 19 Server Components, Streaming SSR, and Static Site Generation).
- **Type Safety**: TypeScript 5.7.3 with strict linting and schema definitions (`src/types/index.ts`).
- **Styling**: Tailwind CSS 3.4.17 with custom earthy cleantech theme (`#047857` Emerald, `#065f46` Forest, `#ecfdf5` Mint).
- **Data Visualizations**: Recharts 2.15.1 (Area charts, Bar graphs, and Donut charts for waste collection, production output, and carbon diversion).
- **Geospatial Mapping**: MapLibre GL 5.1.0 (Interactive regional logistics map displaying pickup nodes in Bandra/Powai, Mahape processing hub, and Palghar farm delivery clusters).
- **AI Integration**: Google Gemini 1.5 Pro via `@google/generative-ai` with deterministic fallback rule engine.
- **Testing**: Playwright 1.50.1 end-to-end integration test suites (`tests/e2e.spec.ts`).

---

## 2. Five Persona Dashboards & Live Workflows

The MVP prototype provides 5 dedicated, authenticated persona experiences:

### Persona 1: Household Generator (`household@agroloop.demo`)
- **Key Features**:
  - Daily/weekly doorstep pickup scheduling.
  - Smart Bin status tracking (Green = Clean, Yellow = Contamination Warning, Red = Rejected).
  - Gamified "Green Soil Points" wallet earned for clean segregation (<5% contamination).
  - Environmental Impact Dashboard: Cumulative kitchen scraps diverted (kg) and Net $\text{CO}_2\text{e}$ emissions avoided.
  - Subscription management and doorstep collection calendar.

### Persona 2: Restaurant & Bulk Waste Generator (`restaurant@agroloop.demo`)
- **Key Features**:
  - Daily commercial scrap weight logging with kitchen station breakdown (Prep, Buffet, Plate waste).
  - **BMC SWM Rules 2016 Regulatory Compliance Dashboard**: Downloadable monthly Municipal Waste Diversion Certificate.
  - Automated B2B invoicing, monthly subscription tier management, and scheduled pickup slots.
  - ESG Carbon Offset Ledger for corporate sustainability reporting.

### Persona 3: EV Logistics Fleet Collector (`collector@agroloop.demo`)
- **Key Features**:
  - Route navigation optimized for 3-wheeler EV cargo loaders across Mumbai western suburbs.
  - **Doorstep BLE Load Scale Integration**: Instant digital weight capture.
  - **Doorstep Contamination Verification**: One-touch visual grading slider (0% to 20%). If contamination >5%, collector logs inorganic contaminants (plastic cutlery, milk pouches, foil) and rejects bin with automated household notification.
  - Daily collection tally, battery range optimization, and Mahape hub deposit handover.

### Persona 4: Smallholder Farmer (`farmer@agroloop.demo`)
- **Key Features**:
  - Direct-to-farm certified bio-input marketplace:
    - *Bio-Enriched Vermicompost*: ₹10/kg (50 kg bags).
    - *550°C Biochar Carbon Matrix*: ₹24/kg (25 kg bags).
    - *Concentrated Liquid Bio-Fertiliser*: ₹45/L (5 L cans).
    - *Fermented Bokashi Bran*: ₹60/kg.
  - Real-time stock availability, cart checkout, and doorstep cluster delivery tracking.
  - **AI Agronomist Soil Advisory**: Vernacular chat assistant (Marathi/Hindi/English) providing crop-specific NPK dosages, soil pH balancing, and application schedules.
  - Farm soil health progression tracking (SOC % increase over seasons).

### Persona 5: Operations & Hub Admin (`admin@agroloop.demo`)
- **Key Features**:
  - Circular Command Center: Real-time city-to-farm material mass balance.
  - Processing batch lifecycle manager: Bokashi fermentation (Days 1–14), Vermicomposting maturation (Days 15–45), Biochar pyrolysis scheduling.
  - Inventory management, warehouse stock levels, and order fulfillment.
  - Total ecosystem environmental audit: Methane avoided, chemical fertilizer displaced, and voluntary carbon credit tally.

---

## 3. Circular State Machine & Data Model

The platform operates on a closed-loop finite state machine tracking waste from the urban kitchen to the regenerated rural field:

```
[ URBAN PICKUP ] ────────► [ LOGISTICS HAUL ] ────────► [ HUB RECEPTION ]
Status: SCHEDULED          Status: IN_TRANSIT           Status: RECEIVED
Contamination Check        Weight Logged (BLE)          Batch ID Assigned
       │
       ▼
[ BIO-PROCESSING ] ──────► [ MATURATION & QC ] ──────► [ FINISHED STOCK ]
Bokashi Anaerobic Ferm.    Lab NPK Analysis             Packaged into Sacks
Vermicompost Digestion     FCO 1985 Compliance Check    Ready for Farmer Purchase
Pyrolysis at 550°C
       │
       ▼
[ FARMER ORDER ] ────────► [ CLUSTER DELIVERY ] ──────► [ SOIL REGENERATION ]
Placed on Storefront       Dispatched to Palghar FPO    Applied to Okra / Brinjal
Payment Logged             Delivered to Farm Gate       Gemini AI Advisory Follow-Up
```

---

## 4. AI Agronomist Architecture & Safety Guardrails

To prevent dangerous or hallucinatory fertilizer recommendations, AgroLoop implements a dual-layer architectural pattern:

```
               USER QUERY (Crop, Acreage, Soil Type, Symptoms)
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ LAYER 1: DETERMINISTIC PRE-VALIDATOR & CONTEXT INJECTOR               │
│ • Validates crop type against Maharashtra agro-climatic database       │
│ • Extracts ICAR (Indian Council of Agricultural Research) safe NPK    │
│   thresholds (e.g., Okra: 100:50:50 kg N:P:K / ha)                    │
│ • Injects verified chemical-to-organic conversion ratios              │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ LAYER 2: GOOGLE GEMINI 1.5 PRO REASONING CORE                         │
│ • Synthesizes user query with injected ICAR parameters                │
│ • Formulates friendly, step-by-step application guidance in Marathi / │
│   Hindi / English with exact watering and soil mixing steps           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ LAYER 3: POST-GENERATION SANITIZATION & BOUNDS CHECK                  │
│ • Regex parse output for recommended kg / acre dosages                │
│ • If dosage > 120% of ICAR upper bound, clamp value and append safety │
│   advisory disclaimer                                                 │
│ • If API network fails, fallback instantly to deterministic engine    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
                         SAFE, VERIFIED ADVISORY
```

---

## 5. Verification & Test Suite Execution

The MVP has been thoroughly tested and verified through automated end-to-end suites:

- **E2E Testing Engine**: Playwright test runner (`tests/e2e.spec.ts`).
- **Production Build**: Verified with Next.js 15 (`npm run build`), generating **60 routes** with zero TypeScript errors and zero lint warnings.
- **Offline Resilience**: Built-in seed data loader (`src/lib/seed-data.ts`) pre-populates 12 pickups, 8 batches, 6 inventory items, and 15 orders in local storage, guaranteeing 100% reliable live demonstration during oral examination without internet dependency.
