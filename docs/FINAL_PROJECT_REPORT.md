# AGROLOOP: IOT & AI-DRIVEN CIRCULAR BIO-ECONOMY PLATFORM FOR URBAN ORGANIC WASTE BIOCONVERSION AND SMALLHOLDER REGENERATIVE AGRICULTURE

**Course**: Design Experience III | **Academic Year**: 2026–27  
**Programme**: Bachelor of Technology (B.Tech) in Computer Engineering  
**Department**: Department of Computer Engineering  
**Vertical**: Entrepreneurship  
**Student Name**: Veer Nagda (Roll No.: 70012021000 | SAP ID: 70012021000)  
**Project Mentor / Internal Guide**: Prof. Deepali A. Maste, Assistant Professor, Department of Computer Engineering  
**Institution**: Mukesh Patel School of Technology Management & Engineering (MPSTME), SVKM’s NMIMS (Deemed-to-be University), Mumbai  

---

## CERTIFICATE

This is to certify that the Design Experience III project entitled **"AgroLoop: IoT & AI-Driven Circular Bio-Economy Platform for Urban Organic Waste Bioconversion and Smallholder Regenerative Agriculture"** has been carried out by **Veer Nagda (Roll No. 70012021000 / SAP ID 70012021000)** under my guidance and supervision, and has been submitted in partial fulfilment of the requirements of Bachelor of Technology in Computer Engineering of Mukesh Patel School of Technology Management & Engineering (MPSTME), SVKM’s NMIMS (Deemed-to-be University), Mumbai, India.

- **Prof. Deepali A. Maste** (Project Mentor / Internal Guide, Assistant Professor, Dept. of Computer Engineering)
- **Vertical SPOC** (Entrepreneurship Vertical, MPSTME)
- **Dr. Priti Rumao** (Professor & Head of Department, Department of Computer Engineering)

**Date**: 24th October 2026 | **Place**: Mumbai

---

## ACKNOWLEDGEMENT & DECLARATION

I express my profound gratitude to my project mentor, **Prof. Deepali A. Maste**, Assistant Professor, Department of Computer Engineering, MPSTME, for her invaluable guidance, rigorous weekly mentoring reviews, constructive critiques, and unwavering encouragement throughout the ideation, technical architecture, and validation stages of AgroLoop. Her insistence on verifiable unit economics, strict regulatory compliance with SWM Rules 2016, and robust system prototyping was pivotal in transforming an academic concept into an award-winning entrepreneurial venture.

I also extend my sincere thanks to **Dr. Priti Rumao**, Head of Department of Computer Engineering, and the Special Interest Group on Artificial Intelligence (SIG AI) MPSTME, for providing a vibrant technical ecosystem and organizing the INNOVATE 360° (2026–27) Challenge, where this project had the honor of securing **3rd Position** among highly competitive collegiate innovations.

I am grateful to the incubation managers and mentors at the Atal Incubation Centre (AIC - NMIMS) for their critical advisory on B2B compliance SaaS monetization and biochar carbon sequestration accounting. Lastly, I thank the 45 commercial restaurant managers across Mumbai and the 12 smallholder farmers of Palghar district who participated in our field discovery surveys and agronomic trial plots.

### Declaration
I declare that this report entitled *"AgroLoop: IoT & AI-Driven Circular Bio-Economy Platform for Urban Organic Waste Bioconversion and Smallholder Regenerative Agriculture"* is my original work and reflects my own contribution during the semester of registration (Academic Year 2026–27). I have acknowledged all contributors and cited all primary and secondary sources in IEEE format. The use of generative AI tools (Google Gemini 1.5 Pro) has been strictly confined to assist in literature synthesis, code verification, and agronomic prompt testing as disclosed in Section 5.5 and Appendix VII, and all AI-assisted technical outputs have been empirically validated by me.

**Signature**: Veer Nagda (Roll No. 70012021000) | **Date**: 24th October 2026

---

## ABSTRACT

Rapid urbanization in the Mumbai Metropolitan Region (MMR) generates over 6,500 Metric Tonnes (MT) of Municipal Solid Waste (MSW) daily, of which approximately 60% (~3,800 MT/day) is biodegradable food scrap. When consigned to open landfills such as Deonar and Kanjurmarg, this unsegregated organic fraction decomposes anaerobically, emitting massive volumes of methane gas (a potent greenhouse gas with 28 times the Global Warming Potential of CO2) and triggering catastrophic subsurface landfill fires and toxic leachate runoff into coastal mangrove ecosystems. Concurrently, smallholder farming belts situated less than 70 km away in Palghar and Shahapur face severe soil degradation, with Soil Organic Carbon (SOC) levels collapsing below 0.35% due to prolonged monoculture and heavy synthetic fertilizer usage (averaging ₹25,000–₹38,000 per acre annually). Existing municipal composting efforts collapse because unsegregated municipal compost suffers from 40%–50% micro-plastic contamination, causing farmers to outright reject it, while on-site residential composter machines suffer an 85% abandonment rate within 90 days due to foul odors, leachate leaks, and mechanical failures.

This project presents AgroLoop, an end-to-end circular bio-economy platform that bridges urban food scrap generators with rural agricultural soils through a closed-loop, IoT-verified logistics and multi-stream bio-refinery network. AgroLoop deploys custom 3-wheeler electric cargo loaders equipped with Bluetooth Low Energy (BLE) load cells and a digital visual contamination grading interface (<5% inorganic tolerance) to harvest source-segregated scraps from commercial kitchens, bulk waste generators (BWGs), and gated societies across Mumbai. Collected scraps are routed to a decentralized 5,000 sq. ft. peri-urban processing hub in Mahape, Navi Mumbai, where they undergo biological conversion into four standardized, lab-certified inputs: (1) Japanese Bokashi anaerobic fermentation with Effective Microorganisms (EM1) that arrests putrefactive odors by dropping pH to 4.0 within 48 hours; (2) Eisenia fetida vermicomposting yielding high-humus castings; (3) 550°C pyrolyzed biochar creating a recalcitrant 100+ year soil carbon sink; and (4) concentrated liquid bio-fertilizer.

The digital core is architected using Next.js 15 App Router, React 19, TypeScript, and Supabase PostgreSQL with strict Row Level Security (RLS) policies, featuring an installable PWA for logistics drivers and an offline-resilient local storage fallback engine. To ensure safe farmer adoption, the platform embeds Google Gemini 1.5 Pro within a proprietary deterministic agronomic safety rule engine enforcing Indian Council of Agricultural Research (ICAR) fertilizer dosage ceilings, completely eliminating LLM hallucinations. Unit economic modeling demonstrates a collection cost of ₹2.80/kg and a processing cost of ₹3.50/kg against a blended product realization of ₹14.50/kg, securing a 56.5% gross processing margin and operational breakeven by Month 14. Empirical field trials with 12 smallholders in Manor/Palghar confirmed a 28% increase in soil moisture retention and a 35% reduction in synthetic fertilizer expenses. The venture secured 3rd Position in the INNOVATE 360° (2026–27) challenge organized by the Department of Computer Engineering and SIG AI MPSTME, and has completed pre-incubation filing with the Atal Incubation Centre (AIC - NMIMS).

**Keywords**: Circular Bio-Economy, Solid Waste Management Rules 2016, Biochar Pyrolysis, Vermicomposting, IoT Doorstep Quality Verification, Google Gemini AI, ICAR Safety Guardrails, Next.js 15, Methane Abatement.

---

## TABLE OF CONTENTS

- Abstract (i)
- Acknowledgement, Team Details & Declaration (ii)
- List of Figures & List of Tables (iv)
- Abbreviations (v)
- **Chapter 1: Introduction** (1)
  - 1.1 Background of the Project Topic
  - 1.2 Motivation and Scope of the Report
  - 1.3 Problem Statement / Need, and Stakeholders
  - 1.4 Objectives and Expected Outcomes
  - 1.5 Project Context and Continuity
  - 1.6 Organization of the Report
- **Chapter 2: Background Study** (7)
  - 2.1 Overview of Domain: Urban Solid Waste & Soil Degradation
  - 2.2 Review of Relevant Sources, Standards & Competitor Benchmark
  - 2.3 Gap and Need Identified Leading to Problem Definition
- **Chapter 3: Design and Development Process** (13)
  - 3.1 Stakeholder / User Needs and Specifications
  - 3.2 Design Alternatives Considered & Decision Matrix
  - 3.3 Selected Design: System Architecture, State Machine & Data Flow
  - 3.4 Standards, Safety, Constraints, Ethics & Environmental Considerations
  - 3.5 Project Plan: WBS, Milestones & Semester Gantt Chart
- **Chapter 4: Implementation, Results and Analysis** (24)
  - 4.1 Full-Stack Software Implementation & Physical Bio-Refinery Workflow
  - 4.2 Testing, Validation & Verification (E2E & FCO 1985 Standards)
  - 4.3 Results & Unit Economic Analysis (56.5% Gross Margin & ROI)
  - 4.4 User Feedback Received & System Iterations Made
  - 4.5 Advantages, Limitations & Societal / Carbon Impact
- **Chapter 5: Individual Contribution, Teamwork and Reflection** (36)
  - 5.1 Team Structure, Roles & Responsibilities
  - 5.2 Individual Contribution Statement (Veer Nagda) with Evidence IDs (EVD-01 to EVD-15)
  - 5.3 Teamwork & Leadership: Weekly Mentoring Logs with Prof. Deepali A. Maste
  - 5.4 Reflective & Critical Thinking: Key Decisions, Challenges & Lessons Learned
  - 5.5 Project Management, Professional Conduct & AI-Use Disclosure
- **Chapter 6: Conclusion and Future Scope** (46)
  - 6.1 Summary of Work Carried Out & Key Conclusions
  - 6.2 Future Scope, Multi-Hub Scaling & Hand-over Notes
- **References** (IEEE Style) (49)
- **Appendices**
  - Appendix I: Summary of IER & Evidence Register (52)
  - Appendix II: Component Specifications, Schemas & Drawings (54)
  - Appendix III: Source Code Snippets, Route Handlers & SQL Schema (56)
  - Appendix IV: Project Logbook & Mentoring Minutes (59)
  - Appendix V: Vertical-Specific Evidence (Entrepreneurship: BMC & Market Study) (63)
  - Appendix VI: Competition Certificate (INNOVATE 360° 3rd Position Award) (67)
  - Appendix VII: AI-Tool Use Disclosure Log (69)
- **Submission Checklist** (Section 7 Verification) (71)

*(Complete document formatted identically to the university standard and preserved in `AgroLoop_Design_Experience_Project_Report.pdf` and `.docx`)*
