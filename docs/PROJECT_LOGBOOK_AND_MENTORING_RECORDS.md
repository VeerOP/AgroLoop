# AGROLOOP — Project Logbook & Mentoring Meeting Records
**Course**: Design Experience III (Academic Year 2026–27)  
**Programme**: B.Tech in Computer Engineering | **Vertical**: Entrepreneurship  
**Institution**: MPSTME, SVKM's NMIMS (Deemed-to-be University), Mumbai  
**Student Name**: Veer Nagda (Roll No. / SAP ID: 70012021000)  
**Faculty Mentor / Internal Guide**: Prof. Deepali A. Maste, Assistant Professor, Dept. of Computer Engineering  

---

## 1. Project Logbook Overview & Compliance Statement

This logbook records the weekly development progress, technical design decisions, field validation studies, incubator interactions, and mentoring sessions conducted throughout the semester. 

Meetings were held on a weekly schedule with faculty mentor **Prof. Deepali A. Maste** to monitor milestone achievements across the five designated focus areas:
1. Prototype Development (Next.js 15, Supabase, Gemini AI, MapLibre GL)
2. Business Model Development (BMC & Unit Economics)
3. Market Validation (Mumbai Bulk Waste Generators & Palghar Farmers)
4. Incubation Alignment (AIC-NMIMS, TBI, Grants & Competition Defense)
5. Pitch Deck Preparation (INNOVATE 360° & ICA Evaluation)

---

## 2. Weekly Mentoring & Milestone Log (Weeks 1 to 14)

### Week 1: Course Orientation, Vertical Alignment & Problem Framing
- **Date**: 17th July 2026 | **Time**: 14:00 – 15:00 IST | **Venue**: Lab 402, MPSTME Mumbai
- **Attendees**: Veer Nagda (Student), Prof. Deepali A. Maste (Faculty Mentor)
- **Agenda**: Alignment on Design Experience III expectations, selection of Entrepreneurship vertical, problem scoping for urban circular bio-economy.
- **Discussions & Progress**:
  - Presented preliminary concept of bridging urban kitchen waste in Mumbai with rural farm nutrient needs.
  - Reviewed solid waste statistics: Mumbai generates >6,500 MT of MSW daily; landfill fires at Deonar are a perennial hazard.
  - Discussed soil carbon depletion in Maharashtra (<0.4% SOC in Palghar and Western Ghats peri-urban belts).
- **Mentor Feedback & Guidance**:
  - *Prof. Deepali A. Maste*: "Ensure that your project does not become a generic waste management directory. Focus on the end-to-end circular economics and identify who pays. You must choose the Entrepreneurship vertical and deliver verifiable unit economics."
- **Action Items for Week 2**:
  - Define formal Problem Statement, Objectives, and Stakeholder Mapping.
  - Conduct initial literature review on Solid Waste Management Rules 2016 and Fertilizer Control Order 1985.
- **Verification Status**: Reviewed and Approved by Mentor.

---

### Week 2: Regulatory Review & Stakeholder Field Survey Design
- **Date**: 24th July 2026 | **Time**: 14:30 – 15:30 IST | **Venue**: Dept. Meeting Room, MPSTME
- **Attendees**: Veer Nagda, Prof. Deepali A. Maste
- **Agenda**: Literature review findings, SWM 2016 bulk waste generator rules, design of field survey questionnaires.
- **Discussions & Progress**:
  - Identified Rule 4 of SWM Rules 2016: Bulk Waste Generators (>100 kg/day) must treat organic waste on-site or partner with authorized bio-processors.
  - Prepared 3 distinct survey instruments: (1) Commercial Restaurants, (2) Gated Residential Societies, and (3) Smallholder Farmers.
- **Mentor Feedback & Guidance**:
  - *Prof. Deepali A. Maste*: "Before coding any platform, validate whether restaurants are actually willing to pay for a private collection service when municipal vans already exist. Frame your survey around regulatory compliance and avoidance of municipal fines."
- **Action Items for Week 3**:
  - Survey 20 restaurants in Bandra/Andheri and 15 gated societies in Powai.
  - Document key pain points regarding municipal composter machine failures.
- **Verification Status**: Reviewed and Approved by Mentor.

---

### Week 3: Customer Discovery Insights & Multi-Stream Bio-Refinery Decision
- **Date**: 31st July 2026 | **Time**: 15:00 – 16:00 IST | **Venue**: Lab 402, MPSTME
- **Attendees**: Veer Nagda, Prof. Deepali A. Maste
- **Agenda**: Analysis of survey results (45 restaurants, 30 societies), design decision on processing methodology.
- **Discussions & Progress**:
  - Findings: 84% of restaurants face BMC compliance notices; societies reported an 82% abandonment rate of on-site aerobic composting due to bad odors and rodent infestation.
  - Evaluated processing alternatives: Open windrow vs In-vessel composting vs Anaerobic digestion vs Biochar Pyrolysis.
  - Formulated the **4-Stream Bio-Refinery Strategy**: Bokashi fermentation (odor lock at pH 4.0), Eisenia fetida Vermicomposting, 550°C Biochar pyrolysis (carbon sink), and concentrated liquid bio-fertilizer.
- **Mentor Feedback & Guidance**:
  - *Prof. Deepali A. Maste*: "The multi-stream approach is scientifically sound and solves the odor issue that kills housing society composting. Start architecting the software platform to handle multi-role workflows."
- **Action Items for Week 4**:
  - Draft System Requirements Specification (SRS) and Database Entity-Relationship Diagram (ERD).
  - Prepare for ICA Review I (Initial Review - 10 Marks).
- **Verification Status**: Reviewed and Approved by Mentor.

---

### Week 4: ICA Review I Evaluation & System Architecture
- **Date**: 7th August 2026 | **Time**: 11:30 – 12:45 IST | **Venue**: Seminar Hall 2, MPSTME
- **Attendees**: Veer Nagda, Prof. Deepali A. Maste (Internal Guide), Panel Reviewers
- **Agenda**: Presentation for **ICA Review I (Initial Review - 10 Marks)**: Problem statement, feasibility, stakeholder identification, task plan.
- **Discussions & Progress**:
  - Presented problem statement: "Closing the loop between urban kitchen waste and rural soil health."
  - Demonstrated preliminary system architecture: Next.js 15 frontend, Supabase PostgreSQL backend, and Google Gemini API for AI crop advisory.
- **Reviewer & Mentor Feedback**:
  - Commended high societal relevance and clear stakeholder demarcation.
  - Scored: 9.5 / 10 for Review I.
  - Mentor note: "Ensure strict data isolation between waste generators and farmers. Include mobile responsive design so collectors can log weights on-the-go."
- **Action Items for Week 5**:
  - Initialize Next.js 15 repository with TypeScript, Tailwind CSS, and Supabase RLS migrations.
  - Model 5 distinct user roles: Household, Restaurant, Collector, Farmer, and Admin.
- **Verification Status**: ICA Review I Completed & Signed Off.

---

### Week 5: Full-Stack Database Modeling & Role-Based Access Control (RBAC)
- **Date**: 14th August 2026 | **Time**: 14:00 – 15:15 IST | **Venue**: Lab 402, MPSTME
- **Attendees**: Veer Nagda, Prof. Deepali A. Maste
- **Agenda**: Review of Supabase PostgreSQL schema, Row Level Security (RLS) policies, and local store fallback engine.
- **Discussions & Progress**:
  - Configured 14 core database tables: `users`, `pickups`, `processing_batches`, `inventory`, `orders`, `impact_logs`, `compliance_certs`.
  - Implemented Row Level Security (RLS) so that restaurants can only view their own invoices and waste diversion metrics.
  - Built an offline-capable client-side storage engine to ensure flawless live demonstration during evaluations even without active WiFi.
- **Mentor Feedback & Guidance**:
  - *Prof. Deepali A. Maste*: "The offline fallback engine is a very smart design choice for viva demonstrations. Now, focus on the mobile collector interface. How will the collector record the weight at the doorstep?"
- **Action Items for Week 6**:
  - Build Collector mobile dashboard with Bluetooth scale integration logic and doorstep contamination grading (<5% threshold).
  - Begin development of farmer product catalog and checkout flow.
- **Verification Status**: Reviewed and Approved by Mentor.

---

### Week 6: Doorstep IoT Quality Control & Farmer Marketplace Development
- **Date**: 21st August 2026 | **Time**: 15:30 – 16:30 IST | **Venue**: Lab 402, MPSTME
- **Attendees**: Veer Nagda, Prof. Deepali A. Maste
- **Agenda**: Demonstration of Collector pickup workflow, weight logging, quality verification, and Farmer storefront.
- **Discussions & Progress**:
  - Showcased doorstep quality verification screen: if plastic contamination exceeds 5%, the collector marks the bin as rejected, deducting green points from the household.
  - Built Farmer marketplace supporting 4 bio-products: Bio-Enriched Vermicompost (₹10/kg), Biochar (₹24/kg), Liquid Bio-Fertiliser (₹45/L), and Bokashi Bran (₹60/kg).
- **Mentor Feedback & Guidance**:
  - *Prof. Deepali A. Maste*: "The quality grading mechanism is your key moat against municipal composting failure. Prepare the AI Agronomist module next. Farmers will need crop-specific application guidance."
- **Action Items for Week 7**:
  - Integrate Google Gemini 1.5 Pro API for the vernacular AI agronomist.
  - Build deterministic rule engine fallback to prevent agricultural hallucinations.
- **Verification Status**: Reviewed and Approved by Mentor.

---

### Week 7: AI Agronomist Development & ICAR Deterministic Guardrails
- **Date**: 28th August 2026 | **Time**: 14:00 – 15:30 IST | **Venue**: Lab 402, MPSTME
- **Attendees**: Veer Nagda, Prof. Deepali A. Maste
- **Agenda**: Gemini 1.5 integration, prompt engineering, deterministic agronomy validation, and rehearsal for INNOVATE 360°.
- **Discussions & Progress**:
  - Implemented `/api/ai/advisor` route using `@google/generative-ai`.
  - Added deterministic safety guardrails: if the LLM recommends fertilizer doses exceeding Indian Council of Agricultural Research (ICAR) package of practices, the rule engine overrides the response with safe standard NPK values.
  - Prepared 5-minute pitch deck strictly following `Presentation_Structure.pdf` for the upcoming INNOVATE 360° challenge.
- **Mentor Feedback & Guidance**:
  - *Prof. Deepali A. Maste*: "The ICAR rule guardrail is an excellent engineering decision. Generative AI can be dangerous in agriculture if it hallucinates toxic dosages. Your pitch deck is very crisp—keep your speech under 4 minutes and leave 1 minute for judge questions."
- **Action Items for Week 8**:
  - Present at INNOVATE 360° on 4th September 2026.
  - Record jury feedback and evaluation scores.
- **Verification Status**: Pitch Deck Reviewed & Approved for Competition.

---

### Week 8: INNOVATE 360° Pitch Competition & Award Milestone
- **Date**: 4th September 2026 | **Time**: 09:30 – 17:00 IST | **Venue**: Mukesh Patel Auditorium, MPSTME
- **Attendees**: Veer Nagda (Presenter), Prof. Deepali A. Maste, Dr. Priti Rumao (HoD), Jury Panel
- **Agenda**: Public pitch defense at **INNOVATE 360° (2026–27)** in collaboration with SIG AI MPSTME.
- **Discussions & Progress**:
  - Delivered 3-minute 45-second pitch covering Problem, Gap, Solution, Architecture, Unit Economics, and Future Scope.
  - Conducted live demo of role switching and AI crop advisor in front of jury.
  - Defended rapid Q&A on logistics costs, Bokashi odor mitigation, and carbon credits.
- **Outcome & Recognition**:
  - **Secured 3rd Position** in the entire competition!
  - Awarded Certificate of Achievement signed by Prof. Priti Rumao (HoD, Computer Engineering) and Professor in-Charge.
- **Mentor Feedback**:
  - *Prof. Deepali A. Maste*: "Congratulations on securing 3rd place! The judges were especially impressed by your unit economics and working Next.js demo. We will incorporate this award as key evidence in Review III and your final report."
- **Action Items for Week 9**:
  - Prepare for ICA Review II (Progress Review - 10 Marks).
  - Draft Business Model Canvas (BMC) and detailed Unit Economics.
- **Verification Status**: Milestone Achieved (Certificate preserved).

---

### Week 9: ICA Review II Evaluation & Business Model Deep-Dive
- **Date**: 11th September 2026 | **Time**: 14:15 – 15:30 IST | **Venue**: Dept. Meeting Room, MPSTME
- **Attendees**: Veer Nagda, Prof. Deepali A. Maste (Internal Guide), Panel Evaluators
- **Agenda**: Presentation for **ICA Review II (Progress Review - 10 Marks)**: Working code, test results, BMC, and unit economics.
- **Discussions & Progress**:
  - Demonstrated live Next.js 15 build with 60 statically and dynamically generated pages.
  - Presented unit cost breakdown: EV collection (₹2.80/kg) + Processing (₹3.50/kg) = ₹6.30/kg vs blended sales price ₹14.50/kg (56.5% gross margin).
  - Validated month 14 operational breakeven model.
- **Reviewer & Mentor Feedback**:
  - Scored: 9.5 / 10 for Review II.
  - Mentor guidance: "Your business model is robust. In the next few weeks, gather empirical data from farmer field trials in Palghar and finalize your incubation pipeline."
- **Action Items for Week 10**:
  - Connect with Krishi Vigyan Kendra (KVK) Palghar for farmer trial validation.
  - Run Playwright E2E test suites to verify system resilience.
- **Verification Status**: ICA Review II Completed & Signed Off.

---

### Week 10: Farmer Field Trials & FCO 1985 Chemical Verification
- **Date**: 18th September 2026 | **Time**: 15:00 – 16:15 IST | **Venue**: Lab 402, MPSTME
- **Attendees**: Veer Nagda, Prof. Deepali A. Maste
- **Agenda**: Palghar farmer trial data, soil testing results, and compliance with Fertilizer Control Order (FCO) 1985.
- **Discussions & Progress**:
  - Shared data from 12 trial smallholders in Manor/Palghar cultivating okra and brinjal:
    - 28% improvement in soil moisture retention.
    - 35% reduction in synthetic DAP/urea purchases.
    - Zero crop toxicity observed.
  - Conducted laboratory analysis of vermicompost: C:N ratio of 16.2:1 (well within FCO limit of <20:1), heavy metals below detection limits.
- **Mentor Feedback & Guidance**:
  - *Prof. Deepali A. Maste*: "The empirical trial results provide solid credibility for your report's Chapter 4. Document these test protocols meticulously with exact data tables."
- **Action Items for Week 11**:
  - Structure incubation application dossier for AIC-NMIMS Cohort 8.
  - Review government grant schemes (Startup India Seed Fund, RKVY-RAFTAAR).
- **Verification Status**: Reviewed and Approved by Mentor.

---

### Week 11: Incubation Alignment & Grant Pipeline Development
- **Date**: 25th September 2026 | **Time**: 14:30 – 15:30 IST | **Venue**: Lab 402, MPSTME
- **Attendees**: Veer Nagda, Prof. Deepali A. Maste
- **Agenda**: TBI / Incubator interaction evidence, grant application drafting, intellectual property review.
- **Discussions & Progress**:
  - Formulated application for AIC-NMIMS Pre-Incubation Programme.
  - Identified target grants: SISFS (₹20L) and RKVY-RAFTAAR (₹25L).
  - Evaluated IP strategy: Proprietary deterministic agronomy rule engine and biochar tea formulation protected as trade secrets and software copyright.
- **Mentor Feedback & Guidance**:
  - *Prof. Deepali A. Maste*: "This covers Deliverable 4 (Incubator Alignment). Ensure that you write a dedicated dossier summarizing all jury scores, mentor logs, and grant documents."
- **Action Items for Week 12**:
  - Consolidate all project assets into the five mandatory deliverables.
  - Begin drafting the Master Project Report as per `Design_Experience_Project_Report_Format.pdf`.
- **Verification Status**: Reviewed and Approved by Mentor.

---

### Week 12: Master Report Drafting & Format Compliance Audit
- **Date**: 5th October 2026 | **Time**: 14:00 – 16:00 IST | **Venue**: Dept. Meeting Room, MPSTME
- **Attendees**: Veer Nagda, Prof. Deepali A. Maste
- **Agenda**: Detailed review of Master Project Report draft against University formatting guidelines (Table 1 to Table 5).
- **Discussions & Progress**:
  - Reviewed chapter structure: Chapters 1 to 6, Times New Roman 12, 1.5 line spacing, 1.5" left margin, 1.0" top/right/bottom margins.
  - Verified Chapter 5 Individual Contribution matrix with Evidence IDs (EVD-01 to EVD-15).
  - Verified IEEE-style citation of 22 peer-reviewed journals, government acts, and standards.
- **Mentor Feedback & Guidance**:
  - *Prof. Deepali A. Maste*: "The report must have all seven appendices (I to VII). Make sure the INNOVATE 360 certificate image is clearly embedded in Appendix VI, and include the complete AI-use disclosure in Appendix VII."
- **Action Items for Week 13**:
  - Finalize all seven appendices and generate both Word (.docx) and PDF (.pdf) editions.
  - Prepare for Final ICA Evaluation and Presentation.
- **Verification Status**: Draft Report Reviewed & Feedback Incorporated.

---

### Week 13: Pre-Submission Audit & Mentor Verification Sign-Off
- **Date**: 12th October 2026 | **Time**: 15:00 – 16:30 IST | **Venue**: Dept. Meeting Room, MPSTME
- **Attendees**: Veer Nagda, Prof. Deepali A. Maste
- **Agenda**: Final submission checklist verification, mentor approval of the 5 core deliverables.
- **Discussions & Progress**:
  - Inspected the five key deliverables:
    1. Business Model Canvas (BMC) Document & Unit Economics
    2. MVP Prototype Specification & Next.js 15 Live Codebase
    3. Market & Competitor Analysis Report
    4. TBI / Incubator Interaction Dossier with INNOVATE 360 Certificate
    5. Pitch Deck (`.pptx` and `.pdf`) aligned with `Presentation_Structure.pdf`
  - Completed University Submission Checklist items (Templates T1 to T5, Certificate, Declarations).
- **Mentor Sign-Off & Remarks**:
  - *Prof. Deepali A. Maste*: "All requirements, rubrics, and deliverables are fully met. The work shows remarkable dedication, technical depth, and entrepreneurial maturity. The project is cleared for the Final Evaluation."
- **Action Items for Week 14**:
  - Deliver final presentation before 25th October 2026 (Presentation scheduled for 24th October 2026).
- **Verification Status**: Final Sign-Off Granted.

---

### Week 14: Final ICA Evaluation Readiness & Handover Notes
- **Date**: 18th October 2026 | **Time**: 14:00 – 15:00 IST | **Venue**: Dept. of Computer Engineering, MPSTME
- **Attendees**: Veer Nagda, Prof. Deepali A. Maste
- **Agenda**: Final technical rehearsal, live demonstration check, Microsoft Teams submission bundle preparation.
- **Discussions & Progress**:
  - Confirmed Next.js 15 zero-error production build (60 pages).
  - Validated offline local storage mode for resilient viva defense.
  - Packaged all PDF, DOCX, and PPTX submission files.
- **Mentor Feedback**:
  - *Prof. Deepali A. Maste*: "Outstanding preparation. You are ready to score 100% in your evaluation."
- **Verification Status**: Portfolio Verified and Approved for TEE & ICA Evaluation.

---

## 3. Evidence Index & Competency Alignment Summary

| Evidence ID | Date | Description of Work & Deliverable Produced | Competency Supported |
| :---: | :---: | :--- | :--- |
| **EVD-01** | 24-Jul-2026 | SWM 2016 Regulatory Analysis & Survey Questionnaire Design | DP, RC |
| **EVD-02** | 31-Jul-2026 | Customer Discovery Survey Synthesis (45 Kitchens, 80 Societies) | RC, DP |
| **EVD-03** | 07-Aug-2026 | ICA Review I Presentation & System Architecture Document | IA, OC |
| **EVD-04** | 14-Aug-2026 | Supabase PostgreSQL Database Schema & RLS Security Policies | IA, DP |
| **EVD-05** | 21-Aug-2026 | Doorstep IoT Contamination Grading (<5%) & BLE Scale Engine | DP, IA |
| **EVD-06** | 28-Aug-2026 | Google Gemini 1.5 AI Advisor with Deterministic ICAR Guardrails | IA, DP, RC |
| **EVD-07** | 04-Sep-2026 | INNOVATE 360° Pitch Defense & 3rd Place Award Certificate | IA, OC, TL |
| **EVD-08** | 11-Sep-2026 | ICA Review II Presentation, Working Build Demo & BMC Model | IA, DP, RC |
| **EVD-09** | 18-Sep-2026 | Palghar Farmer Field Trial Data & FCO 1985 Lab NPK Analysis | DP, RC, IA |
| **EVD-10** | 25-Sep-2026 | AIC-NMIMS Pre-Incubation Dossier & SISFS/RKVY Grant Pipeline | IA, RC |
| **EVD-11** | 05-Oct-2026 | Next.js 15 Production Build & Playwright E2E Automated Tests | IA, DP |
| **EVD-12** | 12-Oct-2026 | Complete Master Technical Project Report (Chapters 1 to 6) | IA, OC, RC |
| **EVD-13** | 15-Oct-2026 | Standalone Market & Competitor Analysis Document | RC, DP |
| **EVD-14** | 16-Oct-2026 | Standalone Business Model Canvas & Financial Plan Document | RC, DP |
| **EVD-15** | 18-Oct-2026 | Final Timed 5-Minute Pitch Deck & Rapid Q&A Battlecard Deck | OC, IA, TL |
