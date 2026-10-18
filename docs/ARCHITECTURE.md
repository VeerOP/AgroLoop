# AGROLOOP — System Architecture & Circular State Machine
**Vertical**: Entrepreneurship | **Component**: Technical Architecture Specification  
**Project**: AgroLoop (Circular Bio-Economy Platform)  
**Author**: Veer Nagda (B.Tech Computer Engineering) | **Mentor**: Prof. Deepali A. Maste  

---

## 1. High-Level Circular System Architecture

AgroLoop synchronizes a multi-tiered physical logistics network with a resilient digital infrastructure.

```
┌───────────────────────────────────────────────────────────────────────────────────────┐
│                                    HIGH-LEVEL ARCHITECTURE                            │
├───────────────────────────────────────────────────────────────────────────────────────┤
│                                       USER INTERFACES                                 │
│  [Households]     [Restaurants / BWGs]     [EV Collectors]     [Farmers]     [Admins] │
│        │                   │                      │                │            │     │
│        ▼                   ▼                      ▼                ▼            ▼     │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐  │
│  │                            NEXT.JS 15 APP ROUTER CORE                           │  │
│  │   • React 19 Client & Server Components        • Tailwind Responsive UI          │  │
│  │   • PWA Offline Caching & Mobile Manifest      • Dynamic Environmental Metrics   │  │
│  │   • MapLibre GL Regional Telematics Map        • Role-Based Route Protection     │  │
│  └────────────────────────────────────────┬────────────────────────────────────────┘  │
│                                           │                                           │
│                 ┌─────────────────────────┴─────────────────────────┐                 │
│                 ▼                                                   ▼                 │
│  ┌───────────────────────────────┐                 ┌───────────────────────────────┐  │
│  │     DATA ACCESS LAYER         │                 │      AI AGRONOMIST ENGINE     │  │
│  │  • Supabase Cloud PostgreSQL  │                 │  • Google Gemini 1.5 Pro API  │  │
│  │  • Strict Row Level Security  │                 │  • Deterministic Pre-Check    │  │
│  │  • Offline Local Storage Store│                 │  • ICAR Safe Bounds Clamping  │  │
│  └───────────────────────────────┘                 └───────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Circular State Machine & Transition Rules

The core business logic manages physical inventory transitions through a 7-stage state machine:

```
┌─────────────┐   Doorstep Scan   ┌─────────────┐   Hub Deposit   ┌─────────────┐
│  SCHEDULED  ├──────────────────►│ IN_TRANSIT  ├────────────────►│  RECEIVED   │
└─────────────┘   (BLE Weight)    └─────────────┘   (Trommel QC)  └──────┬──────┘
                                                                         │
                                                                         ▼
┌─────────────┐   Dispatched      ┌─────────────┐   Lab Clearance ┌─────────────┐
│  DELIVERED  │◄──────────────────┤  INVENTORY  │◄────────────────┤ PROCESSING  │
│ (At Farm)   │   (FPO Truck)     │  (Packaged) │   (FCO 1985)    │ (Vermi/Char)│
└─────────────┘                   └─────────────┘                 └─────────────┘
```

1. **SCHEDULED**: Pickup requested by household or recurring daily B2B restaurant contract.
2. **IN_TRANSIT**: EV collector arrives, connects Bluetooth scale, records gross weight, performs visual contamination audit (<5% tolerance), and accepts load.
3. **RECEIVED**: EV unloads at Mahape bio-refinery hub. Incoming batch weighed on weighbridge and tagged with QR batch identifier.
4. **PROCESSING**: Material segregated into one of four conversion pipelines (Bokashi fermentation, Eisenia fetida vermicomposting, 550°C pyrolysis, or liquid extraction).
5. **INVENTORY**: Maturation complete. Batch passes in-house moisture, C:N ratio, and pH checks. Packaged into standardized 25 kg/50 kg bags or 5 L carboys. Stock incremented in Supabase.
6. **ORDERED / DISPATCHED**: Farmer places order via marketplace. Regional FPO logistics vehicle dispatches stock to Palghar/Shahapur village distribution center.
7. **DELIVERED**: Doorstep farm delivery confirmed via SMS OTP. Farmer receives AI soil advisory.
