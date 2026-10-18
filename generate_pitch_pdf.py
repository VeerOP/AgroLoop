import os
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

def generate_pitch_pdf():
    # 16:9 landscape aspect ratio (11 x 6.1875 inches or letter landscape 11 x 8.5)
    page_width, page_height = 13.333 * 72, 7.5 * 72
    pdf_filename = "AgroLoop_Design_Experience_Pitch.pdf"
    
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=(page_width, page_height),
        leftMargin=40,
        rightMargin=40,
        topMargin=35,
        bottomMargin=35
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styles
    c_primary = colors.HexColor("#047857")
    c_dark = colors.HexColor("#062C22")
    c_accent = colors.HexColor("#10B981")
    c_gold = colors.HexColor("#D97706")
    c_text = colors.HexColor("#0F172A")
    c_muted = colors.HexColor("#64748B")
    
    title_style = ParagraphStyle(
        'PitchTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=c_text
    )
    
    tag_style = ParagraphStyle(
        'PitchTag',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=c_primary
    )
    
    card_title_style = ParagraphStyle(
        'CardTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor("#064E3B")
    )
    
    card_sub_style = ParagraphStyle(
        'CardSub',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=c_gold
    )
    
    card_body_style = ParagraphStyle(
        'CardBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=c_text
    )

    story = []

    # Slide 1: Cover
    story.append(Spacer(1, 30))
    story.append(Paragraph("<font color='#047857'><b>SVKM'S NMIMS MPSTME • DEPARTMENT OF COMPUTER ENGINEERING • DESIGN EXPERIENCE III (AY 2026–27)</b></font>", tag_style))
    story.append(Spacer(1, 15))
    story.append(Paragraph("<font size=42 color='#062C22'><b>AGROLOOP</b></font>", title_style))
    story.append(Spacer(1, 5))
    story.append(Paragraph("<font size=18 color='#047857'><b>Closing the Loop Between Urban Food Waste & Regenerative Soils</b></font>", title_style))
    story.append(Spacer(1, 8))
    story.append(Paragraph("<font size=12 color='#475569'>A Closed-Loop Circular Bio-Economy Platform for Mumbai MMR & Peri-Urban Agro-Belts</font>", card_body_style))
    story.append(Spacer(1, 25))

    s1_cards = [
        [
            Paragraph("<b>6,500 MT / Day</b><br/><font color='#047857'><b>Mumbai Waste Crisis</b></font><br/><br/>3,800 MT wet food scraps dumped daily at Deonar and Kanjurmarg landfills causing toxic methane fires & leachate.", card_body_style),
            Paragraph("<b>&lt; 0.4% SOC</b><br/><font color='#D97706'><b>Soil Carbon Depletion</b></font><br/><br/>Palghar & Shahapur farm soils stripped of biological carbon; smallholders burdened with ₹32k/acre chemical input costs.", card_body_style),
            Paragraph("<b>56.5% Gross Margin</b><br/><font color='#047857'><b>Circular Economics</b></font><br/><br/>₹6.30/kg collection & processing cost vs ₹14.50/kg blended sales realization; profitable by Month 14 of operations.", card_body_style)
        ]
    ]
    t1 = Table(s1_cards, colWidths=[280, 280, 280])
    t1.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F0FDF4")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#A7F3D0")),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 14),
        ('BOTTOMPADDING', (0,0), (-1,-1), 14),
        ('LEFTPADDING', (0,0), (-1,-1), 14),
        ('RIGHTPADDING', (0,0), (-1,-1), 14),
    ]))
    story.append(t1)
    story.append(Spacer(1, 35))
    story.append(Paragraph("<b>Student:</b> Veer Nagda (SAP ID: 70012021000) &nbsp;|&nbsp; <b>Faculty Mentor:</b> Prof. Deepali A. Maste &nbsp;|&nbsp; <b>Vertical:</b> Entrepreneurship &nbsp;|&nbsp; <font color='#D97706'><b>INNOVATE 360° 3rd Position Winner</b></font>", card_body_style))
    story.append(PageBreak())

    # Slide 2: Problem
    story.append(Paragraph("01 • PROBLEM STATEMENT", tag_style))
    story.append(Paragraph("The Broken Linear Economy: Urban Waste Overflow vs. Rural Soil Starvation", title_style))
    story.append(Spacer(1, 15))

    s2_data = [
        [
            Paragraph("<b>Urban Food Waste Crisis</b><br/><font color='#D97706'><b>6,500 MT Daily Generation</b></font><br/><br/>• Mumbai generates 6,500–7,200 MT MSW daily; 3,800 MT is wet organic scraps.<br/>• Deonar (120 ha) & Kanjurmarg landfills face catastrophic methane buildup.<br/>• Rotting scraps cause spontaneous toxic fires & carcinogen emissions.<br/>• BMC actively levying SWM 2016 penalties (₹5k–₹25k) on non-compliant bulk generators.", card_body_style),
            Paragraph("<b>Rural Soil Carbon Collapse</b><br/><font color='#D97706'><b>&lt; 0.35% Soil Organic Carbon</b></font><br/><br/>• Palghar & Western Maharashtra soils depleted of organic carbon (&lt;0.4% vs 1.0% ideal).<br/>• Severe soil compaction, poor water retention & secondary salinization.<br/>• Smallholders spend ₹25k–₹38k/acre on synthetic fertilizers.<br/>• Diminishing crop yields drive smallholder debt & rural distress.", card_body_style),
            Paragraph("<b>The Missing Systemic Bridge</b><br/><font color='#D97706'><b>Failed Municipal Status Quo</b></font><br/><br/>• Zero verified logistics connecting city organic waste with rural farms.<br/>• Central municipal compost has 40–50% plastic contamination; farmers reject it.<br/>• On-site apartment composter machines have an 85% abandonment rate.<br/>• Complete lack of data-driven agronomic soil advisory tailored to local crops.", card_body_style)
        ]
    ]
    t2 = Table(s2_data, colWidths=[280, 280, 280])
    t2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FFFFFF")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t2)
    story.append(PageBreak())

    # Slide 3: Target Users & Gap
    story.append(Paragraph("02 • TARGET USERS & EXISTING GAP", tag_style))
    story.append(Paragraph("Who Experiences the Problem & Why Do Current Solutions Fail?", title_style))
    story.append(Spacer(1, 15))

    s3_data = [
        [
            Paragraph("<b>Bulk Waste Generators (BWGs)</b><br/><font color='#047857'><b>1,200+ Commercial Kitchens</b></font><br/><br/>• Hotels, cloud kitchens & corporate canteens in Bandra/BKC/Andheri.<br/>• Pain: Strict BMC SWM 2016 mandates; threat of health license cancellation.<br/>• Need: Reliable daily off-site pickup & audit-ready compliance proof.", card_body_style),
            Paragraph("<b>Gated Residential Societies</b><br/><font color='#047857'><b>400+ Large CHS (&gt;200 Flats)</b></font><br/><br/>• High-density complexes in Powai, Thane & Goregaon.<br/>• Pain: On-site composters fail due to stench, flies, and resident revolt.<br/>• Need: Clean odor-free collection with monthly ESG diversion certificates.", card_body_style),
            Paragraph("<b>Smallholder Farmers</b><br/><font color='#047857'><b>14,000+ Peri-Urban Growers</b></font><br/><br/>• Vegetable, fruit & paddy farmers in Palghar & Shahapur clusters.<br/>• Pain: Crushing chemical fertilizer expenditure and degraded hard soil.<br/>• Need: Low-cost, pure organic bio-inputs with certified NPK and AI guidance.", card_body_style)
        ]
    ]
    t3 = Table(s3_data, colWidths=[280, 280, 280])
    t3.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FFFFFF")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t3)
    story.append(Spacer(1, 15))
    gap_box = [
        [Paragraph("<b>THE CRITICAL INDUSTRY GAP: WHY STATUS QUO COLLAPSES</b><br/>"
                   "1. <b>Contamination:</b> Municipal composting yields 40%+ plastics; AgroLoop uses BLE IoT doorstep QC (&lt;5% rejection).<br/>"
                   "2. <b>Odor Failure:</b> Aerobic units rot; AgroLoop uses Bokashi EM1 anaerobic fermentation dropping pH to 4.0 in 48h.<br/>"
                   "3. <b>Zero Guidance:</b> AgroLoop integrates Gemini 1.5 Pro AI with ICAR deterministic guardrails for precision crop dosage.", card_body_style)]
    ]
    tg = Table(gap_box, colWidths=[840])
    tg.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F0FDF4")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#047857")),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(tg)
    story.append(PageBreak())

    # Slide 4: Proposed Solution
    story.append(Paragraph("03 • PROPOSED SOLUTION", tag_style))
    story.append(Paragraph("AgroLoop: The Closed-Loop Hyper-Local Circular Bio-Economy Platform", title_style))
    story.append(Spacer(1, 15))

    s4_data = [
        [
            Paragraph("<b>01. COLLECT</b><br/><font color='#047857'><b>Smart EV Logistics</b></font><br/><br/>• Daily scheduled pickups via 3-wheeler EV loaders.<br/>• Bluetooth digital load cell doorstep weight capture.<br/>• Instant optical purity grading (&lt;5% tolerance threshold).<br/>• Gamified green points for clean households.", card_body_style),
            Paragraph("<b>02. PROCESS</b><br/><font color='#047857'><b>Mahape Bio-Refinery</b></font><br/><br/>• Bokashi EM1 anaerobic fermentation (odor lock at pH 4.0).<br/>• Eisenia fetida vermicomposting (45-day cycle).<br/>• 550°C Biochar pyrolysis retort (100+ yr carbon sink).<br/>• Concentrated liquid bio-fertilizer extraction.", card_body_style),
            Paragraph("<b>03. DISTRIBUTE</b><br/><font color='#047857'><b>Direct Farm Market</b></font><br/><br/>• Direct-to-farm marketplace bypassing middlemen.<br/>• Palghar & Shahapur FPO bulk delivery clusters.<br/>• 35% lower cost than synthetic DAP/NPK fertilizers.<br/>• Standardized 25kg/50kg FCO 1985 certified sacks.", card_body_style),
            Paragraph("<b>04. ADVISE</b><br/><font color='#047857'><b>Gemini AI Advisor</b></font><br/><br/>• Google Gemini 1.5 Pro multimodal reasoning engine.<br/>• Deterministic ICAR agronomic safety rule engine.<br/>• Vernacular conversational advisory (Marathi/Hindi).<br/>• Custom soil pH balancing & crop stage dosage.", card_body_style)
        ]
    ]
    t4 = Table(s4_data, colWidths=[205, 205, 205, 205])
    t4.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FFFFFF")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t4)
    story.append(PageBreak())

    # Slide 5: Technology & Implementation
    story.append(Paragraph("04 • TECHNOLOGY & IMPLEMENTATION", tag_style))
    story.append(Paragraph("Production Full-Stack Architecture, Guarded AI & IoT Telematics", title_style))
    story.append(Spacer(1, 15))

    s5_data = [
        [
            Paragraph("<b>Full-Stack Architecture</b><br/><font color='#047857'><b>Next.js 15 + TypeScript</b></font><br/><br/>• Next.js 15 App Router core with 60 generated pages.<br/>• Supabase PostgreSQL backend with strict Row Level Security (RLS).<br/>• Offline local storage fallback engine ensuring 100% reliable viva demo.<br/>• Tailwind CSS cleantech design system & Recharts dynamic visualizations.<br/>• Installable Progressive Web App (PWA) with service worker caching.", card_body_style),
            Paragraph("<b>Guarded AI Agronomist</b><br/><font color='#D97706'><b>Gemini 1.5 + ICAR Guardrails</b></font><br/><br/>• Google Gemini 1.5 Pro integration for vernacular dialogues.<br/>• Deterministic agronomic rule engine pre- and post-processor.<br/>• Enforces ICAR package of practices dosage safety ceilings.<br/>• Eliminates AI hallucinations (guarantees zero crop chemical toxicity).<br/>• Converts farmer soil test deficits into exact vermi & biochar schedules.", card_body_style),
            Paragraph("<b>IoT Scale & Telematics</b><br/><font color='#047857'><b>BLE IoT + MapLibre GL</b></font><br/><br/>• Bluetooth Low Energy (BLE) load cell integration for doorstep weigh-in.<br/>• MapLibre GL interactive geospatial tracking of Mumbai, Mahape & Palghar.<br/>• Automated contamination slider penalizing dirty bins (&gt;5% inorganic).<br/>• Batch maturation state machine tracking fermentation days to harvest.<br/>• Automated generation of MCGM-compliant digital SWM certificates.", card_body_style)
        ]
    ]
    t5 = Table(s5_data, colWidths=[280, 280, 280])
    t5.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FFFFFF")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t5)
    story.append(PageBreak())

    # Slide 6: Innovation, Impact & Economics
    story.append(Paragraph("05 • INNOVATION & MEASURABLE IMPACT", tag_style))
    story.append(Paragraph("Robust Unit Economics, Carbon Sequestration & Farmer Prosperity", title_style))
    story.append(Spacer(1, 15))

    s6_data = [
        [
            Paragraph("<b>Unit Economics: 56.5% Margin</b><br/><font color='#047857'><b>Dual-Revenue Engine</b></font><br/><br/>• EV Doorstep Collection Cost: ₹2.80 / kg<br/>• Bio-Processing & Curing Cost: ₹3.50 / kg<br/>• Total Unit Operating Cost: ₹6.30 / kg<br/>• Blended Selling Price: ₹14.50 / kg<br/>• <b>Gross Margin: 56.5%</b> (Profitable by Month 14)<br/>• Dual cashflow: B2B subscriptions + bio-product sales.", card_body_style),
            Paragraph("<b>Environmental Impact</b><br/><font color='#047857'><b>1,875 MT CO₂e Avoided / Hub</b></font><br/><br/>• 1,500 MT waste diverted from Deonar landfill annually.<br/>• Eliminates 1,875 MT CO₂e methane gas emissions.<br/>• 550°C Biochar locks recalcitrant carbon for 100+ years.<br/>• Verifiable voluntary carbon credits (VERs @ ₹850/MT CO₂e).<br/>• Zero toxic leachate drainage into Thane Creek.", card_body_style),
            Paragraph("<b>Farmer & Social Value</b><br/><font color='#047857'><b>35% Farm Cost Reduction</b></font><br/><br/>• Replaces costly DAP & Urea (saves ₹14,000/acre/year).<br/>• Enhances soil water retention capacity by 28%.<br/>• Proven 18% average crop yield increase across trials.<br/>• Direct vernacular AI crop health advisory on WhatsApp.<br/>• 25 dignified formal green logistics jobs per hub.", card_body_style)
        ]
    ]
    t6 = Table(s6_data, colWidths=[280, 280, 280])
    t6.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FFFFFF")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t6)
    story.append(PageBreak())

    # Slide 7: Business Model Canvas
    story.append(Paragraph("BUSINESS MODEL CANVAS", tag_style))
    story.append(Paragraph("The Nine Building Blocks & Validated Willingness-to-Pay", title_style))
    story.append(Spacer(1, 15))

    s7_data = [
        [
            Paragraph("<b>Key Partners</b><br/>• MCGM & TMC Ward Offices<br/>• Gated Societies (Powai, Andheri)<br/>• Palghar Farmer Producer Orgs<br/>• EV Fleet Providers & KVK Palghar", card_body_style),
            Paragraph("<b>Key Activities</b><br/>• Scheduled EV scrap harvesting<br/>• Doorstep optical purity grading<br/>• 4-Stream biological bioconversion<br/>• Gemini AI agronomist advisory", card_body_style),
            Paragraph("<b>Value Propositions</b><br/>• <b>B2B:</b> 100% SWM compliance, zero stench, digital ESG certificates.<br/>• <b>Farmers:</b> 35% cheaper inputs, +28% moisture hold, +18% yield.", card_body_style)
        ],
        [
            Paragraph("<b>Customer Relationships</b><br/>• B2B Dedicated Account Managers<br/>• Society Green Soil Points Wallet<br/>• Vernacular WhatsApp crop alerts", card_body_style),
            Paragraph("<b>Channels</b><br/>• Next.js 15 PWA Platform<br/>• 3-Wheeler EV Fleet Touchpoints<br/>• FPO Village Hubs & Retail Sacks", card_body_style),
            Paragraph("<b>Customer Segments</b><br/>• 1,200+ Commercial Kitchens<br/>• 400+ Gated Societies (&gt;200 flats)<br/>• 14,000+ Peri-Urban Smallholders", card_body_style)
        ],
        [
            Paragraph("<b>Cost Structure</b><br/>• EV Collection: ₹2.80/kg &nbsp;|&nbsp; Bio-Processing: ₹3.50/kg<br/>• FPO Cluster Transport: ₹1.20/kg &nbsp;|&nbsp; Tech & AI API: ₹0.30/kg", card_body_style),
            Paragraph("<b>Revenue Streams</b><br/>• B2B Subscriptions: ₹2.5k–₹5k/mo per kitchen<br/>• Bio-Inputs (Blended ₹14.50/kg) &nbsp;|&nbsp; Carbon Credits (₹850/tCO₂e)", card_body_style),
            Paragraph("<b>Financial Health</b><br/>• Gross Margin: 56.5% &nbsp;|&nbsp; Breakeven: Month 14<br/>• Yr 1: ₹1.02 Cr &nbsp;|&nbsp; Yr 2: ₹2.68 Cr &nbsp;|&nbsp; Yr 3: ₹6.85 Cr", card_body_style)
        ]
    ]
    t7 = Table(s7_data, colWidths=[280, 280, 280])
    t7.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FFFFFF")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t7)
    story.append(PageBreak())

    # Slide 8: Incubation Alignment & Innovate 360 Award
    story.append(Paragraph("INCUBATION & EXTERNAL VALIDATION", tag_style))
    story.append(Paragraph("INNOVATE 360° 3rd Position Award & Institutional Incubation Alignment", title_style))
    story.append(Spacer(1, 15))

    s8_data = [
        [
            Paragraph("<b>🏆 INNOVATE 360° (2026–27) AWARD OF ACHIEVEMENT</b><br/><font color='#D97706'><b>Secured 3rd Position Across MPSTME & SIG AI Pitch Challenge</b></font><br/><br/>"
                      "• <b>Organized by:</b> Dept. of Computer Engineering & SIG AI MPSTME (4th Sept 2026).<br/>"
                      "• <b>Signatories:</b> Dr. Priti Rumao (HoD, Computer Engineering) & Prof. in-Charge.<br/>"
                      "• <b>Jury Score:</b> <b>93.0 / 100</b> across 6 venture evaluation dimensions.<br/>"
                      "• <b>Jury Commendation:</b> <i>'Outstanding unit economics (56% margin), production Next.js 15 demo, and safe deterministic ICAR agronomy guardrails.'</i><br/>"
                      "• Verified Certificate preserved as primary evidence for Review III.", card_body_style),
            Paragraph("<b>TBI & INCUBATION PIPELINE</b><br/><font color='#047857'><b>Pre-Incubation, Grants & Field Trials</b></font><br/><br/>"
                      "• <b>AIC-NMIMS Pre-Incubation:</b> Formal application filed for Cohort 8.<br/>"
                      "• <b>KVK Palghar Partnership:</b> On-ground farmer field trials & NPK testing.<br/>"
                      "• <b>Startup India Seed Fund Scheme (SISFS):</b> ₹20 Lakhs grant pipeline.<br/>"
                      "• <b>RKVY-RAFTAAR (Agri-Ministry):</b> ₹25 Lakhs grant for Mahape pyrolysis kiln.<br/>"
                      "• <b>IP & Trade Secrets:</b> Proprietary ICAR inference algorithm protected.<br/>"
                      "• <b>Field Validation:</b> 12 smallholder trial plots verified in Manor/Palghar.", card_body_style)
        ]
    ]
    t8 = Table(s8_data, colWidths=[415, 415])
    t8.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), colors.HexColor("#FEF3C7")),
        ('BACKGROUND', (1,0), (1,0), colors.HexColor("#FFFFFF")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 14),
        ('BOTTOMPADDING', (0,0), (-1,-1), 14),
        ('LEFTPADDING', (0,0), (-1,-1), 14),
        ('RIGHTPADDING', (0,0), (-1,-1), 14),
    ]))
    story.append(t8)
    story.append(PageBreak())

    # Slide 9: Future Scope
    story.append(Paragraph("06 • FUTURE SCOPE & COMMERCIALIZATION", tag_style))
    story.append(Paragraph("A Scalable 3-Phase Roadmap to Regional Multi-Hub Expansion", title_style))
    story.append(Spacer(1, 15))

    s9_data = [
        [
            Paragraph("<b>Phase 1 (Months 1–12)</b><br/><font color='#D97706'><b>Mahape Pilot Hub (MMR)</b></font><br/><br/>• Commission 5,000 sq ft Mahape hub.<br/>• Deploy 4 EV loaders covering Bandra & Powai.<br/>• Onboard 60 kitchens & 20 gated societies.<br/>• Serve 650 smallholders in Palghar/Shahapur.<br/>• Divert 900 MT waste / yr; ₹1.02 Cr revenue.", card_body_style),
            Paragraph("<b>Phase 2 (Months 13–24)</b><br/><font color='#D97706'><b>Commercial Breakeven (2 Hubs)</b></font><br/><br/>• Expand across Thane & Navi Mumbai belt.<br/>• Corporate canteens (Reliance, Tata, Mindspace).<br/>• Operational breakeven at Month 14.<br/>• Deliver positive EBITDA (+₹73 Lakhs) in Yr 2.<br/>• Scale to 2,160 MT diversion & 1,800 farmers.", card_body_style),
            Paragraph("<b>Phase 3 (Months 25–36)</b><br/><font color='#D97706'><b>Regional Scale (₹6.85 Cr ARR)</b></font><br/><br/>• Containerized modular hubs in Nashik & Pune.<br/>• Tokenized voluntary carbon credit sales.<br/>• Scale to 5 regional hubs (5,400 MT/year).<br/>• Achieve ₹6.85 Cr revenue & +₹2.25 Cr EBITDA.<br/>• Replicate model to Smart Cities across India.", card_body_style)
        ]
    ]
    t9 = Table(s9_data, colWidths=[280, 280, 280])
    t9.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FFFFFF")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 14),
        ('BOTTOMPADDING', (0,0), (-1,-1), 14),
        ('LEFTPADDING', (0,0), (-1,-1), 14),
        ('RIGHTPADDING', (0,0), (-1,-1), 14),
    ]))
    story.append(t9)
    story.append(PageBreak())

    # Slide 10: Q&A Defense Panel
    story.append(Paragraph("RAPID Q&A DEFENSE PANEL", tag_style))
    story.append(Paragraph("Pre-Loaded Answers to the Top 8 Evaluator & Judge Challenges", title_style))
    story.append(Spacer(1, 15))

    s10_data = [
        [
            Paragraph("<b>1. Contamination Control:</b> Doorstep visual grading rejects bins with &gt;5% inorganics. Households penalized green points. Trommel sieves at hub.", card_body_style),
            Paragraph("<b>2. Logistics Viability:</b> ₹2.80/kg via 3-wheeler EVs (charging @ ₹0.40/km vs ₹3.80/km diesel). Route density keeps shifts &lt;12 km.", card_body_style),
            Paragraph("<b>3. Farmer Adoption:</b> Farmers spend ₹28–₹35/kg for chemicals. AgroLoop vermi @ ₹10 & biochar @ ₹24 cuts input costs by 35% with +28% water retention.", card_body_style),
            Paragraph("<b>4. Odor & Leachate:</b> Bokashi EM1 anaerobic fermentation drops pH to 4.0 within 48h, completely halting foul ammonia and putrefactive odors.", card_body_style)
        ],
        [
            Paragraph("<b>5. AI Advisory Safety:</b> Deterministic agronomy rule engine clamps Gemini outputs to ICAR package of practices, preventing toxic over-fertilization.", card_body_style),
            Paragraph("<b>6. Breakeven Timeline:</b> Operational breakeven reached at Month 14. Year 2 delivers +₹73 Lakhs EBITDA supported by upfront B2B subscription retainers.", card_body_style),
            Paragraph("<b>7. SWM 2016 Alignment:</b> 100% compliant with SWM Rules 2016 Rule 4. Issues audited digital diversion certificates required by BMC health inspectors.", card_body_style),
            Paragraph("<b>8. Carbon Sequestration:</b> 550°C Biochar creates recalcitrant carbon sink (&gt;100 yr half-life), generating verified carbon credits valued at ₹850/MT CO₂e.", card_body_style)
        ]
    ]
    t10 = Table(s10_data, colWidths=[205, 205, 205, 205])
    t10.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FFFFFF")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t10)

    doc.build(story)
    print("Saved AgroLoop_Design_Experience_Pitch.pdf successfully!")

if __name__ == "__main__":
    generate_pitch_pdf()
