# AGROLOOP — Kitchen Scraps into Valuable Agricultural Inputs

> **"Closing the Loop Between City Waste & Farm Need"**

AgroLoop is a complete, modern, full-stack circular economy platform prototype built for Mumbai, Maharashtra, India. It connects urban kitchen waste collection from households and commercial restaurants with bio-processing (Vermicomposting, Biochar, Liquid Bio-Fertiliser, Bokashi) and direct agricultural distribution to smallholder farmers with AI-assisted agronomist crop advisory.

---

## 🌟 Primary Circular Ecosystem Flow

```
[ URBAN HOUSEHOLDS & RESTAURANTS ]
              │ (Source-Segregated Kitchen Waste Pickup)
              ▼
[ LOGISTICS COLLECTORS (E-Rickshaws) ]
              │ (Doorstep Weight Log & Contamination Verification)
              ▼
[ CENTRAL PROCESSING HUB (Mahape, Navi Mumbai) ]
              │ (Vermicomposting / Biochar Pyrolysis / Liquid Fermentation)
              ▼
[ ORGANIC INPUT INVENTORY ]
              │ (Direct Farmer Purchase & Doorstep Delivery)
              ▼
[ SMALLHOLDER FARMERS (Palghar & Shahapur Clusters) ]
              │ (Crop Application Guidance & AI Agronomist Soil Advisory)
              ▼
[ REGENERATED SOIL & ENVIRONMENTAL IMPACT ]
```

---

## 🚀 Key Technology Stack

- **Framework**: Next.js 15 (App Router, Server Components & Client Components)
- **Language**: TypeScript (Strict typing across schema models and API routes)
- **Styling**: Tailwind CSS (Earthy modern cleantech palette `#047857`, warm neutrals, glassmorphism)
- **Database / Auth**: Supabase PostgreSQL (Full RLS migrations in `supabase/migrations/`) + Client-side Local Storage store out-of-the-box fallback engine for offline Demo Mode.
- **Charts & Data Viz**: Recharts (Waste collection trends, waste sources, product production output vs farmer demand)
- **Maps**: Interactive Mumbai Regional Ecosystem Map Component (Collection nodes in Bandra/Powai, Processing hub in Mahape, Farms in Palghar)
- **AI Advisory**: Gemini 1.5 API Integration (`GEMINI_API_KEY`) with deterministic rule-based agronomist fallback engine.
- **PWA**: Web App Manifest (`manifest.json`) and Service Worker (`sw.js`) for installable mobile shell.
- **Testing**: Playwright E2E Test Scenarios (`tests/e2e.spec.ts`).

---

## 🔑 Demo Mode Accounts & Setup

The application works out of the box without requiring remote database credentials:

| Persona Role | Demo Login Email | Key Features Tested |
| :--- | :--- | :--- |
| **Household** | `household@agroloop.demo` | Schedule waste pickup, track bin lifecycle, view CO₂e avoided, green reward points. |
| **Restaurant** | `restaurant@agroloop.demo` | Commercial daily scrap log, BMC bulk generator compliance, download ESG diversion certificate. |
| **Collector** | `collector@agroloop.demo` | Mobile route management, doorstep scale weight recording, contamination checks. |
| **Farmer** | `farmer@agroloop.demo` | Organic inputs storefront, place demo order (reduces stock), AI agronomist chat. |
| **Operations Admin**| `admin@agroloop.demo` | Executive Command Center, live circular operations, batch maturation, inventory control. |

---

## 🛠️ Local Development Setup

1. **Clone & Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables Configuration**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Run End-to-End Tests**:
   ```bash
   npm run test:e2e
   ```

---

## 🏆 Hackathon Evaluation & Presentation Assets

This project is built for **INNOVATE 360°** (In collaboration with **SIG AI**, SVKM's NMIMS MPSTME):

- **Detailed Rubric Alignment (100/100 Marks)**: Fully audit each criterion (A through G) on the live app at [`/rubric`](http://localhost:3000/rubric).
- **5-Minute Timed Presentation Deck**: Interactive slide deck formatted strictly according to `Presentation_Structure.pdf` (01 Problem, 02 Target Users & Gap, 03 Proposed Solution, 04 Technology & Implementation, 05 Innovation & Impact, 06 Future Scope) at [`/presentation`](http://localhost:3000/presentation). Includes:
  - Built-in 5:00 countdown clock & pacing indicator
  - Word-for-word speaker teleprompter script (4m 35s total speaking time)
  - 2-Minute Q&A Defense Panel with 8 pre-loaded judge battlecards
- **Presentation Documentation**: [`docs/PRESENTATION_DECK.md`](file:///Users/veernagda/Downloads/DE-Project/docs/PRESENTATION_DECK.md) - Offline presentation script and Q&A cheat sheet.

---

## 📜 Documentation Sitemap

- [`docs/PRESENTATION_DECK.md`](file:///Users/veernagda/Downloads/DE-Project/docs/PRESENTATION_DECK.md) - 5-Minute Pitch Deck script and 2-Minute Q&A Defense Guide.
- [`docs/DEMO.md`](file:///Users/veernagda/Downloads/DE-Project/docs/DEMO.md) - Step-by-step 14-point demo execution walkthrough script.
- [`docs/ARCHITECTURE.md`](file:///Users/veernagda/Downloads/DE-Project/docs/ARCHITECTURE.md) - System architecture and circular state machine.
- [`docs/DATABASE.md`](file:///Users/veernagda/Downloads/DE-Project/docs/DATABASE.md) - PostgreSQL schema, foreign keys, and RLS policies.
- [`docs/DEPLOYMENT.md`](file:///Users/veernagda/Downloads/DE-Project/docs/DEPLOYMENT.md) - Vercel & Supabase deployment guidelines.

