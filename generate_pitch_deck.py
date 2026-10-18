import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Color Palette: Deep Emerald, Clean Mint, Forest Green, Dark Charcoal, Warm White, Accent Gold
    C_BG_DARK = RGBColor(6, 44, 34)       # Deep Emerald Dark
    C_BG_LIGHT = RGBColor(248, 250, 249)  # Clean Off-White
    C_PRIMARY = RGBColor(4, 120, 87)      # Emerald 700
    C_PRIMARY_DARK = RGBColor(6, 78, 59)  # Emerald 900
    C_ACCENT = RGBColor(16, 185, 129)     # Emerald 500
    C_GOLD = RGBColor(217, 119, 6)        # Amber 600
    C_TEXT_DARK = RGBColor(15, 23, 42)    # Slate 900
    C_TEXT_MUTED = RGBColor(100, 116, 139)# Slate 500
    C_CARD_BG = RGBColor(255, 255, 255)   # Pure White
    C_CARD_BORDER = RGBColor(226, 232, 240)

    def add_bg(slide, dark=False):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = C_BG_DARK if dark else C_BG_LIGHT
        bg.line.fill.background()
        return bg

    def add_header(slide, section_tag, title_text, dark=False):
        tx_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(11.733), Inches(1.1))
        tf = tx_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        
        p0 = tf.paragraphs[0]
        p0.text = section_tag.upper()
        p0.font.size = Pt(11)
        p0.font.bold = True
        p0.font.color.rgb = C_ACCENT if dark else C_PRIMARY
        
        p1 = tf.add_paragraph()
        p1.text = title_text
        p1.font.size = Pt(26)
        p1.font.bold = True
        p1.font.color.rgb = RGBColor(255, 255, 255) if dark else C_TEXT_DARK
        p1.space_before = Pt(4)

    def add_card(slide, left, top, width, height, bg_color=C_CARD_BG, border_color=C_CARD_BORDER):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        card.line.color.rgb = border_color
        card.line.width = Pt(1)
        return card

    # =========================================================================
    # SLIDE 1: COVER SLIDE
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    add_bg(s1, dark=True)

    # University & Department pill
    pill = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.8), Inches(9.2), Inches(0.45))
    pill.fill.solid()
    pill.fill.fore_color.rgb = RGBColor(4, 70, 50)
    pill.line.fill.background()
    p_tf = pill.text_frame
    p_p = p_tf.paragraphs[0]
    p_p.text = "SVKM's NMIMS MPSTME • Department of Computer Engineering • Design Experience III"
    p_p.font.size = Pt(11)
    p_p.font.bold = True
    p_p.font.color.rgb = C_ACCENT
    p_p.alignment = PP_ALIGN.CENTER

    # Main Title
    t_box = s1.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(11.733), Inches(2.2))
    t_tf = t_box.text_frame
    t_tf.word_wrap = True
    t_p = t_tf.paragraphs[0]
    t_p.text = "AGROLOOP"
    t_p.font.size = Pt(54)
    t_p.font.bold = True
    t_p.font.color.rgb = RGBColor(255, 255, 255)

    sub_p = t_tf.add_paragraph()
    sub_p.text = "Closing the Loop Between Urban Food Waste & Regenerative Soils"
    sub_p.font.size = Pt(22)
    sub_p.font.color.rgb = C_ACCENT
    sub_p.space_before = Pt(8)

    desc_p = t_tf.add_paragraph()
    desc_p.text = "A Closed-Loop Circular Bio-Economy Platform for Mumbai MMR & Peri-Urban Agro-Belts"
    desc_p.font.size = Pt(14)
    desc_p.font.color.rgb = RGBColor(203, 213, 225)
    desc_p.space_before = Pt(6)

    # Three Stat Cards
    metrics = [
        ("6,500 MT / Day", "Mumbai Waste Generation", "3,800 MT wet food scraps dumped at Deonar/Kanjurmarg causing methane & fires"),
        ("< 0.4% SOC", "Maharashtra Soil Carbon", "Critical soil degradation in Palghar/Shahapur; ₹32k/acre chemical fertilizer burden"),
        ("56.5% Unit Margin", "Circular Bio-Economics", "₹6.30/kg collection & processing cost vs ₹14.50/kg blended sales realization")
    ]
    for i, (m_val, m_lbl, m_sub) in enumerate(metrics):
        cx = Inches(0.8 + i * 4.0)
        c = add_card(s1, cx, Inches(3.9), Inches(3.73), Inches(2.0), bg_color=RGBColor(12, 60, 48), border_color=RGBColor(20, 83, 67))
        c_tf = c.text_frame
        c_tf.word_wrap = True
        p1 = c_tf.paragraphs[0]
        p1.text = m_val
        p1.font.size = Pt(24)
        p1.font.bold = True
        p1.font.color.rgb = RGBColor(255, 255, 255)
        p2 = c_tf.add_paragraph()
        p2.text = m_lbl
        p2.font.size = Pt(12)
        p2.font.bold = True
        p2.font.color.rgb = C_ACCENT
        p2.space_before = Pt(4)
        p3 = c_tf.add_paragraph()
        p3.text = m_sub
        p3.font.size = Pt(10)
        p3.font.color.rgb = RGBColor(203, 213, 225)
        p3.space_before = Pt(4)

    # Footer banner
    f_box = s1.shapes.add_textbox(Inches(0.8), Inches(6.3), Inches(11.733), Inches(0.6))
    f_tf = f_box.text_frame
    f_p = f_tf.paragraphs[0]
    f_p.text = "Student: Veer Nagda (SAP ID: 70012021000)  |  Faculty Mentor: Prof. Deepali A. Maste  |  Vertical: Entrepreneurship  |  INNOVATE 360° 3rd Position"
    f_p.font.size = Pt(11)
    f_p.font.bold = True
    f_p.font.color.rgb = RGBColor(251, 191, 36)

    # =========================================================================
    # SLIDE 2: 01 PROBLEM WE ARE SOLVING
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    add_bg(s2)
    add_header(s2, "01 • Problem Statement", "The Broken Linear Economy: Urban Waste Overflow vs. Rural Soil Starvation")

    probs = [
        ("Urban Food Waste Crisis", "6,500 MT Daily Waste", [
            "Mumbai generates 6,500–7,200 MT MSW daily; 3,800 MT is wet organic scraps.",
            "Deonar (120 ha) and Kanjurmarg landfills face catastrophic methane buildup.",
            "Rotting scraps cause spontaneous toxic fires and leachates into Thane Creek.",
            "BMC aggressively enforcing SWM 2016 penalties (₹5,000–₹25,000/day)."
        ]),
        ("Rural Soil Carbon Collapse", "<0.35% Soil Organic Carbon", [
            "Palghar, Shahapur & Western Maharashtra soils depleted of biological carbon.",
            "Severe soil compaction, low water retention, and micro-nutrient collapse.",
            "Smallholders spend ₹25,000–₹38,000/acre annually on synthetic fertilizers.",
            "Diminishing crop yields leading to acute smallholder debt and distress."
        ]),
        ("The Missing Systemic Bridge", "Failed Municipal Status Quo", [
            "Zero verified logistics connecting city organic waste with rural farms.",
            "Central municipal compost has 40–50% plastic contamination; farmers reject it.",
            "On-site apartment composter machines have an 85% abandonment rate.",
            "Lack of data-driven agronomic dosage guidance tailored to local soil pH."
        ])
    ]
    for i, (title, sub, bullets) in enumerate(probs):
        cx = Inches(0.8 + i * 4.0)
        c = add_card(s2, cx, Inches(1.8), Inches(3.73), Inches(4.8))
        tf = c.text_frame
        tf.word_wrap = True
        p0 = tf.paragraphs[0]
        p0.text = title
        p0.font.size = Pt(16)
        p0.font.bold = True
        p0.font.color.rgb = C_PRIMARY_DARK
        p1 = tf.add_paragraph()
        p1.text = sub
        p1.font.size = Pt(13)
        p1.font.bold = True
        p1.font.color.rgb = C_GOLD
        p1.space_before = Pt(2)
        p1.space_after = Pt(10)
        for b in bullets:
            bp = tf.add_paragraph()
            bp.text = "• " + b
            bp.font.size = Pt(11)
            bp.font.color.rgb = C_TEXT_DARK
            bp.space_before = Pt(4)

    # =========================================================================
    # SLIDE 3: 02 TARGET USERS & EXISTING GAP
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    add_bg(s3)
    add_header(s3, "02 • Target Users & Gap Analysis", "Who Experiences the Problem & Why Do Current Solutions Fail?")

    users = [
        ("Bulk Waste Generators (BWGs)", "1,200+ Commercial Kitchens", [
            "Hotels, cloud kitchens & corporate canteens in Bandra/BKC/Andheri.",
            "Pain: Strict BMC SWM 2016 mandates, threat of license cancellation.",
            "Need: Reliable, audit-ready daily off-site pickup & compliance proof."
        ]),
        ("Gated Residential Societies", "400+ Large CHS (>200 Flats)", [
            "High-density residential complexes in Powai, Thane, and Goregaon.",
            "Pain: On-site composters fail due to stench, flies, and resident complaints.",
            "Need: Clean, odor-free collection with monthly ESG diversion certificates."
        ]),
        ("Smallholder Farmers", "14,000+ Peri-Urban Growers", [
            "Vegetable, fruit & paddy farmers in Palghar, Manor, and Shahapur clusters.",
            "Pain: Crushing chemical fertilizer expenditure and degraded hard soil.",
            "Need: Low-cost, pure organic bio-inputs with certified NPK and AI guidance."
        ])
    ]
    for i, (u_title, u_sub, u_bullets) in enumerate(users):
        cx = Inches(0.8 + i * 4.0)
        c = add_card(s3, cx, Inches(1.8), Inches(3.73), Inches(2.7))
        tf = c.text_frame
        tf.word_wrap = True
        p0 = tf.paragraphs[0]
        p0.text = u_title
        p0.font.size = Pt(15)
        p0.font.bold = True
        p0.font.color.rgb = C_PRIMARY_DARK
        p1 = tf.add_paragraph()
        p1.text = u_sub
        p1.font.size = Pt(12)
        p1.font.bold = True
        p1.font.color.rgb = C_PRIMARY
        p1.space_after = Pt(6)
        for b in u_bullets:
            bp = tf.add_paragraph()
            bp.text = "• " + b
            bp.font.size = Pt(10.5)
            bp.font.color.rgb = C_TEXT_DARK
            bp.space_before = Pt(3)

    # Bottom Gap Comparison Card
    g_card = add_card(s3, Inches(0.8), Inches(4.7), Inches(11.733), Inches(2.0), bg_color=RGBColor(240, 253, 244), border_color=C_PRIMARY)
    gtf = g_card.text_frame
    gtf.word_wrap = True
    gp0 = gtf.paragraphs[0]
    gp0.text = "THE CRITICAL INDUSTRY GAP: WHY EXISTING EFFORTS COLLAPSE"
    gp0.font.size = Pt(13)
    gp0.font.bold = True
    gp0.font.color.rgb = C_PRIMARY_DARK

    g_points = [
        "1. Contamination Failure: Municipal composting mixes wet and dry waste, yielding 40%+ micro-plastics that ruin farm fields.",
        "2. Odor & Abandonment: Aerobic society composters rot anaerobically, creating putrid odors that trigger 85% abandonment in 90 days.",
        "3. Lack of Farmer Advisory: Chemical fertilizers come with clear NPK dosages; organic compost has variable quality and zero crop guidance.",
        "AgroLoop Edge: Doorstep IoT purity grading (<5% threshold) + Bokashi EM1 anaerobic fermentation + Gemini AI precision agronomy."
    ]
    for gp in g_points:
        p = gtf.add_paragraph()
        p.text = gp
        p.font.size = Pt(10)
        p.font.color.rgb = C_TEXT_DARK
        p.space_before = Pt(2)

    # =========================================================================
    # SLIDE 4: 03 PROPOSED SOLUTION: 4-STAGE CIRCULAR LOOP
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    add_bg(s4)
    add_header(s4, "03 • Proposed Solution", "AgroLoop: The Closed-Loop Hyper-Local Circular Bio-Economy Platform")

    steps = [
        ("01. COLLECT", "Smart EV Logistics", [
            "Scheduled daily morning pickups.",
            "Custom 3-wheeler EV cargo loaders.",
            "Doorstep BLE scale weight logging.",
            "Instant purity grading (<5% tolerance)."
        ]),
        ("02. PROCESS", "Mahape Bio-Refinery", [
            "Bokashi EM1 fermentation (pH 4.0).",
            "Eisenia fetida vermicomposting.",
            "550°C Biochar pyrolysis retort.",
            "Concentrated liquid bio-fertilizer."
        ]),
        ("03. DISTRIBUTE", "Direct Farm Market", [
            "Zero middleman farmer marketplace.",
            "Palghar & Shahapur FPO clusters.",
            "35% cheaper than chemical inputs.",
            "Direct doorstep farm sack delivery."
        ]),
        ("04. ADVISE", "Gemini AI Agronomist", [
            "Google Gemini 1.5 Pro core.",
            "ICAR deterministic safety engine.",
            "Vernacular advice (Marathi / Hindi).",
            "Soil pH balancing & NPK dosage."
        ])
    ]
    for i, (stitle, ssub, sbullets) in enumerate(steps):
        cx = Inches(0.8 + i * 2.98)
        c = add_card(s4, cx, Inches(1.8), Inches(2.78), Inches(4.8))
        tf = c.text_frame
        tf.word_wrap = True
        p0 = tf.paragraphs[0]
        p0.text = stitle
        p0.font.size = Pt(16)
        p0.font.bold = True
        p0.font.color.rgb = C_PRIMARY_DARK
        p1 = tf.add_paragraph()
        p1.text = ssub
        p1.font.size = Pt(12)
        p1.font.bold = True
        p1.font.color.rgb = C_PRIMARY
        p1.space_before = Pt(2)
        p1.space_after = Pt(8)
        for b in sbullets:
            bp = tf.add_paragraph()
            bp.text = "• " + b
            bp.font.size = Pt(10.5)
            bp.font.color.rgb = C_TEXT_DARK
            bp.space_before = Pt(4)

    # =========================================================================
    # SLIDE 5: 04 TECHNOLOGY & IMPLEMENTATION
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    add_bg(s5)
    add_header(s5, "04 • Technology & Implementation", "Production Full-Stack Architecture, Guarded AI & IoT Telematics")

    tech_cards = [
        ("Full-Stack Architecture", "Next.js 15 + TypeScript", [
            "Production Next.js 15 App Router core with 60 generated pages.",
            "Supabase PostgreSQL with strict Row Level Security (RLS) data isolation.",
            "Zero-latency client storage fallback engine for 100% offline viva demo.",
            "Tailwind CSS custom cleantech design system & Recharts metrics.",
            "Installable PWA with service worker caching for field collectors."
        ]),
        ("Guarded AI Agronomist", "Gemini 1.5 + ICAR Guardrails", [
            "Google Gemini 1.5 Pro integration for natural vernacular conversations.",
            "Proprietary deterministic agronomic rule engine pre- and post-processor.",
            "Enforces Indian Council of Agricultural Research (ICAR) dosage limits.",
            "Eliminates AI hallucinations on crop fertilizer dosages (safe for crops).",
            "Translates soil test deficits into exact vermi & biochar kg/acre schedules."
        ]),
        ("IoT Scale & Geospatial Telematics", "BLE IoT + MapLibre GL", [
            "Bluetooth Low Energy (BLE) load cell scale integration for doorstep weigh-in.",
            "Interactive MapLibre GL routing engine for Mumbai, Mahape & Palghar.",
            "Automated contamination slider penalizing dirty bins (>5% inorganic).",
            "Batch maturation state machine tracking fermentation days to harvest.",
            "Automated generation of MCGM-compliant digital SWM certificates."
        ])
    ]
    for i, (title, sub, bullets) in enumerate(tech_cards):
        cx = Inches(0.8 + i * 4.0)
        c = add_card(s5, cx, Inches(1.8), Inches(3.73), Inches(4.8))
        tf = c.text_frame
        tf.word_wrap = True
        p0 = tf.paragraphs[0]
        p0.text = title
        p0.font.size = Pt(16)
        p0.font.bold = True
        p0.font.color.rgb = C_PRIMARY_DARK
        p1 = tf.add_paragraph()
        p1.text = sub
        p1.font.size = Pt(12)
        p1.font.bold = True
        p1.font.color.rgb = C_GOLD
        p1.space_before = Pt(2)
        p1.space_after = Pt(8)
        for b in bullets:
            bp = tf.add_paragraph()
            bp.text = "• " + b
            bp.font.size = Pt(10.5)
            bp.font.color.rgb = C_TEXT_DARK
            bp.space_before = Pt(4)

    # =========================================================================
    # SLIDE 6: 05 INNOVATION, IMPACT & UNIT ECONOMICS
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    add_bg(s6)
    add_header(s6, "05 • Innovation & Measurable Impact", "Robust Unit Economics, Carbon Sequestration & Farmer Prosperity")

    impacts = [
        ("Unit Economics", "56.5% Gross Margin", [
            "EV Doorstep Collection: ₹2.80 / kg",
            "Bio-Processing & Curing: ₹3.50 / kg",
            "Total Unit Operating Cost: ₹6.30 / kg",
            "Blended Sales Realization: ₹14.50 / kg",
            "Gross Margin: 56.5% (EBITDA +₹14L Yr 1)",
            "Dual revenue: B2B retainers + bio-inputs."
        ]),
        ("Environmental Impact", "1,875 MT CO₂e Avoided / Hub", [
            "1,500 MT waste diverted from Deonar / yr.",
            "Eliminates 1,875 MT CO₂e methane gas.",
            "550°C Biochar locks carbon for 100+ years.",
            "Verified voluntary carbon credit generation (VERs @ ₹850 / MT CO₂e).",
            "Zero toxic landfill leachate into Thane Creek."
        ]),
        ("Farmer & Social Value", "35% Farm Cost Reduction", [
            "Replaces costly DAP/Urea (saving ₹14k/acre).",
            "Increases soil water retention by 28%.",
            "Proven 18% average crop yield increase.",
            "Direct vernacular AI crop health advisory.",
            "Formal, dignified green logistics employment for local youth."
        ])
    ]
    for i, (title, sub, bullets) in enumerate(impacts):
        cx = Inches(0.8 + i * 4.0)
        c = add_card(s6, cx, Inches(1.8), Inches(3.73), Inches(4.8))
        tf = c.text_frame
        tf.word_wrap = True
        p0 = tf.paragraphs[0]
        p0.text = title
        p0.font.size = Pt(16)
        p0.font.bold = True
        p0.font.color.rgb = C_PRIMARY_DARK
        p1 = tf.add_paragraph()
        p1.text = sub
        p1.font.size = Pt(13)
        p1.font.bold = True
        p1.font.color.rgb = C_PRIMARY
        p1.space_before = Pt(2)
        p1.space_after = Pt(8)
        for b in bullets:
            bp = tf.add_paragraph()
            bp.text = "• " + b
            bp.font.size = Pt(10.5)
            bp.font.color.rgb = C_TEXT_DARK
            bp.space_before = Pt(4)

    # =========================================================================
    # SLIDE 7: BUSINESS MODEL CANVAS & VALIDATION
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    add_bg(s7)
    add_header(s7, "Business Model Canvas", "Dual-Sided Commercial Engine & Validated Willingness-to-Pay")

    bmc_boxes = [
        ("Key Partners", "MCGM / BMC, Gated Societies, Palghar FPOs, EV Providers, KVK Palghar"),
        ("Key Activities", "Route-optimized EV pickup, Doorstep QC, 4-stream conversion, AI advisory"),
        ("Value Proposition", "B2B: 100% SWM compliance & ESG report; Farmers: 35% cheaper inputs & +18% yield"),
        ("Customer Segments", "BWGs (Hotels/Restaurants), Large Societies (>200 flats), Smallholders (<3 acres)"),
        ("Cost Structure", "EV logistics (₹2.80/kg), Bio-processing (₹3.50/kg), FPO delivery (₹1.20/kg)"),
        ("Revenue Streams", "Monthly B2B SWM retainers (₹2.5k–5k), Bio-inputs (₹14.50/kg avg), Carbon Credits")
    ]
    for i, (title, content) in enumerate(bmc_boxes):
        row = i // 3
        col = i % 3
        cx = Inches(0.8 + col * 4.0)
        cy = Inches(1.8 + row * 2.5)
        c = add_card(s7, cx, cy, Inches(3.73), Inches(2.2))
        tf = c.text_frame
        tf.word_wrap = True
        p0 = tf.paragraphs[0]
        p0.text = title
        p0.font.size = Pt(14)
        p0.font.bold = True
        p0.font.color.rgb = C_PRIMARY_DARK
        p1 = tf.add_paragraph()
        p1.text = content
        p1.font.size = Pt(11)
        p1.font.color.rgb = C_TEXT_DARK
        p1.space_before = Pt(4)

    # =========================================================================
    # SLIDE 8: INCUBATION ALIGNMENT & INNOVATE 360° AWARD
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    add_bg(s8)
    add_header(s8, "Incubation & External Validation", "INNOVATE 360° 3rd Position Award & Institutional Incubation Alignment")

    # Left card: INNOVATE 360 details
    c_left = add_card(s8, Inches(0.8), Inches(1.8), Inches(5.7), Inches(4.8), bg_color=RGBColor(254, 243, 199), border_color=C_GOLD)
    ltf = c_left.text_frame
    ltf.word_wrap = True
    lp0 = ltf.paragraphs[0]
    lp0.text = "🏆 INNOVATE 360° (2026–27) AWARD OF ACHIEVEMENT"
    lp0.font.size = Pt(15)
    lp0.font.bold = True
    lp0.font.color.rgb = RGBColor(180, 83, 9)
    lp1 = ltf.add_paragraph()
    lp1.text = "Secured 3rd Position Across MPSTME & SIG AI Pitch Competition"
    lp1.font.size = Pt(12)
    lp1.font.bold = True
    lp1.font.color.rgb = C_TEXT_DARK
    lp1.space_after = Pt(8)

    achieve_bullets = [
        "Organized by: Dept. of Computer Engineering & SIG AI MPSTME (4th Sept 2026).",
        "Signatories: Dr. Priti Rumao (HOD, Computer Engineering) & Prof. in-Charge.",
        "Jury Score: 93.0 / 100 across 6 venture dimensions.",
        "Jury Praise: 'Outstanding unit economics (56% gross margin), live Next.js prototype, and safe deterministic ICAR agronomy guardrails.'",
        "Certificate officially preserved as verifiable evidence for Review III."
    ]
    for b in achieve_bullets:
        bp = ltf.add_paragraph()
        bp.text = "• " + b
        bp.font.size = Pt(11)
        bp.font.color.rgb = C_TEXT_DARK
        bp.space_before = Pt(4)

    # Right card: Incubation & Grant Pipeline
    c_right = add_card(s8, Inches(6.8), Inches(1.8), Inches(5.733), Inches(4.8))
    rtf = c_right.text_frame
    rtf.word_wrap = True
    rp0 = rtf.paragraphs[0]
    rp0.text = "TBI & INCUBATION PIPELINE"
    rp0.font.size = Pt(15)
    rp0.font.bold = True
    rp0.font.color.rgb = C_PRIMARY_DARK
    rp1 = rtf.add_paragraph()
    rp1.text = "Pre-Incubation & Grant Roadmap"
    rp1.font.size = Pt(12)
    rp1.font.bold = True
    rp1.font.color.rgb = C_PRIMARY
    rp1.space_after = Pt(8)

    tbi_bullets = [
        "AIC-NMIMS Pre-Incubation: Cohort 8 pre-incubation application filed.",
        "KVK Palghar Partnership: On-ground farmer field trials & NPK testing.",
        "Startup India Seed Fund Scheme (SISFS): ₹20 Lakhs grant pipeline for EV fleet.",
        "RKVY-RAFTAAR (Agri-Ministry): ₹25 Lakhs grant for Mahape pyrolysis kiln.",
        "IP Strategy: Proprietary ICAR inference algorithm protected as software IP.",
        "Field Readiness: 12 smallholder trial plots verified in Manor/Palghar."
    ]
    for b in tbi_bullets:
        bp = rtf.add_paragraph()
        bp.text = "• " + b
        bp.font.size = Pt(11)
        bp.font.color.rgb = C_TEXT_DARK
        bp.space_before = Pt(4)

    # =========================================================================
    # SLIDE 9: 06 FUTURE SCOPE & COMMERCIALIZATION ROADMAP
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    add_bg(s9)
    add_header(s9, "06 • Future Scope & Commercialization", "A Scalable 3-Phase Roadmap to Regional Multi-Hub Expansion")

    phases = [
        ("Phase 1 (Months 1–12)", "Mahape Pilot Hub (MMR)", [
            "Commission Mahape, Navi Mumbai 5,000 sq ft pilot hub.",
            "Deploy 4 EV cargo loaders covering Bandra & Powai.",
            "Onboard 60 commercial kitchens & 20 gated societies.",
            "Serve 650 smallholders in Palghar & Shahapur.",
            "Divert 900 MT waste / year; generate ₹1.02 Cr revenue."
        ]),
        ("Phase 2 (Months 13–24)", "Commercial Breakeven (2 Hubs)", [
            "Expand across Thane & Navi Mumbai industrial belt.",
            "Corporate canteens (Reliance, Tata, Mindspace).",
            "Reach operational breakeven at Month 14.",
            "Deliver positive EBITDA (+₹73 Lakhs) in Year 2.",
            "Scale to 2,160 MT diversion and 1,800 farmers."
        ]),
        ("Phase 3 (Months 25–36)", "Regional Scale (₹6.85 Cr ARR)", [
            "Deploy containerized modular bio-refinery hubs in Nashik & Pune.",
            "Launch tokenized voluntary carbon removal credits (CORCs).",
            "Scale to 5 regional hubs diverting 5,400 MT/year.",
            "Achieve ₹6.85 Crores annual revenue and +₹2.25 Cr EBITDA.",
            "Replicate model across Smart Cities across India."
        ])
    ]
    for i, (title, sub, bullets) in enumerate(phases):
        cx = Inches(0.8 + i * 4.0)
        c = add_card(s9, cx, Inches(1.8), Inches(3.73), Inches(4.8))
        tf = c.text_frame
        tf.word_wrap = True
        p0 = tf.paragraphs[0]
        p0.text = title
        p0.font.size = Pt(16)
        p0.font.bold = True
        p0.font.color.rgb = C_PRIMARY_DARK
        p1 = tf.add_paragraph()
        p1.text = sub
        p1.font.size = Pt(12)
        p1.font.bold = True
        p1.font.color.rgb = C_GOLD
        p1.space_before = Pt(2)
        p1.space_after = Pt(8)
        for b in bullets:
            bp = tf.add_paragraph()
            bp.text = "• " + b
            bp.font.size = Pt(10.5)
            bp.font.color.rgb = C_TEXT_DARK
            bp.space_before = Pt(4)

    # =========================================================================
    # SLIDE 10: 2-MINUTE RAPID Q&A DEFENSE PANEL
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    add_bg(s10)
    add_header(s10, "Rapid Q&A Defense Panel", "Pre-Loaded Answers to the Top 8 Evaluator & Judge Challenges")

    qas = [
        ("1. Contamination Control", "Doorstep visual grading rejects bins with >5% inorganic waste. Households penalized green points. Trommel sieves at hub."),
        ("2. Logistics Viability", "₹2.80/kg via 3-wheeler EVs (charging @ ₹0.40/km vs ₹3.80/km diesel). High route density keeps routes <12 km per shift."),
        ("3. Farmer Adoption Moat", "Farmers spend ₹28–₹35/kg for chemicals. AgroLoop vermi @ ₹10 & biochar @ ₹24 cuts input costs by 35% with +28% water retention."),
        ("4. Odor & Leachate Control", "Bokashi EM1 anaerobic fermentation drops pH to 4.0 within 48h, completely halting foul ammonia and putrefactive odors."),
        ("5. AI Advisory Safety", "Deterministic agronomy rule engine clamps Gemini outputs to ICAR package of practices, preventing toxic over-fertilization."),
        ("6. Breakeven Timeline", "Operational breakeven reached at Month 14. Year 2 delivers +₹73 Lakhs EBITDA supported by upfront B2B subscription retainers."),
        ("7. SWM 2016 Regulatory Alignment", "100% compliant with SWM Rules 2016 Rule 4. Issues audited digital diversion certificates required by BMC health inspectors."),
        ("8. Carbon Sequestration Value", "550°C Biochar creates recalcitrant carbon sink (>100 yr half-life), generating verified carbon credits valued at ₹850/MT CO₂e.")
    ]
    for i, (q, a) in enumerate(qas):
        row = i // 4
        col = i % 4
        cx = Inches(0.8 + col * 2.98)
        cy = Inches(1.8 + row * 2.5)
        c = add_card(s10, cx, cy, Inches(2.78), Inches(2.2))
        tf = c.text_frame
        tf.word_wrap = True
        p0 = tf.paragraphs[0]
        p0.text = q
        p0.font.size = Pt(12)
        p0.font.bold = True
        p0.font.color.rgb = C_PRIMARY_DARK
        p1 = tf.add_paragraph()
        p1.text = a
        p1.font.size = Pt(9.5)
        p1.font.color.rgb = C_TEXT_DARK
        p1.space_before = Pt(3)

    prs.save("AgroLoop_Design_Experience_Pitch.pptx")
    print("Saved AgroLoop_Design_Experience_Pitch.pptx successfully!")

if __name__ == "__main__":
    create_presentation()
