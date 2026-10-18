'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sprout,
  ArrowRight,
  Sparkles,
  Building2,
  Home,
  Truck,
  RotateCw,
  Flame,
  Bug,
  ShieldCheck,
  CheckCircle2,
  Scale,
  Leaf,
  Layers,
  FlaskConical,
  PackageCheck,
  Wheat,
  Sliders,
  Award,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatWeight } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

export default function ProcessingJourneyPage() {
  const [activeStage, setActiveStage] = useState(1);
  const [inputWeightKg, setInputWeightKg] = useState(1000); // 1 Tonne default
  const [sourceType, setSourceType] = useState<'mixed' | 'society' | 'household'>('society');

  // Mathematical conversion rates
  // 1000 kg wet waste -> ~450 kg Vermicompost + ~80 kg Biochar + ~120 L Liquid Bio-Fertiliser + ~250 kg CO2e avoided
  const vermicompostKg = Math.round(inputWeightKg * 0.45);
  const biocharKg = Math.round(inputWeightKg * 0.08);
  const liquidFertiliserL = Math.round(inputWeightKg * 0.12);
  const co2eAvoidedKg = Math.round(inputWeightKg * 0.25);
  const farmlandAcres = Number((vermicompostKg / 500).toFixed(1)); // 500kg per acre dosage

  const STAGES = [
    {
      id: 1,
      title: 'Source Segregation & Doorstep Collection',
      shortTitle: '1. Collection',
      tag: 'Source Level',
      icon: Home,
      color: 'from-emerald-600 to-teal-600',
      duration: 'Daily Morning (06:00 – 09:00 AM)',
      location: 'Bandra West, Powai & Mumbai Residential CHS',
      summary:
        'Daily segregation of raw fruit peels, vegetable trims, coffee grounds, and kitchen scraps at the household and society compound level.',
      keyProcesses: [
        'Households & CHS segregation in dedicated 10L & 240L green bins',
        'Strict exclusion of single-use plastics, toxic chemicals, batteries, and e-waste',
        'Daily scheduled pickup via AgroLoop zero-emission electric compactor vans',
        'Digital barcoded weight logging at doorstep/compound gate for traceability',
      ],
      equipment: '240L HDPE Color-Coded Bins, AgroLoop 1.5-Tonne EV Compactors, IoT Digital Scales',
      parameters: {
        targetMoisture: '70% – 80%',
        purityTarget: '> 95% Organic',
        dailyIntake: '6.5 MT / day across Mumbai',
      },
    },
    {
      id: 2,
      title: 'Reception, Mechanical De-packaging & Trommel Sorting',
      shortTitle: '2. Sorting & Prep',
      tag: 'Bio-Hub Reception',
      icon: RotateCw,
      color: 'from-teal-600 to-cyan-600',
      duration: 'Within 3 hours of arrival',
      location: 'AgroLoop Central Processing Hub, MIDC Mahape',
      summary:
        'Rapid intake quality inspection, secondary sorting on low-speed conveyor belts, and mechanical size reduction to optimize surface area.',
      keyProcesses: [
        'Automated intake weighing on weighbridge and batch code generation (e.g., VB-042)',
        'Slow-speed mechanical shredder reduces organic matter to uniform 15–25mm particle size',
        'Rotary trommel screen (25mm mesh) separates stray labels, wrappers, and inert debris',
        'Carbon-to-Nitrogen balancing by blending dry agro-carbon residues & wood shavings',
      ],
      equipment: 'Dual-Shaft Organic Shredder, 25mm Rotary Trommel Screener, Magnetic Separator',
      parameters: {
        particleSize: '15 – 25 mm',
        initialCNRatio: '25:1 to 30:1',
        intakeTemperature: '24°C – 30°C',
      },
    },
    {
      id: 3,
      title: 'Aerobic Thermophilic Pre-Composting (Bio-Hygiene)',
      shortTitle: '3. Thermophilic Heating',
      tag: 'Sanitization Phase',
      icon: Flame,
      color: 'from-amber-600 to-orange-600',
      duration: '14 to 18 Days',
      location: 'Covered Forced-Aeration Compost Bays',
      summary:
        'Microbial proliferation naturally drives core heap temperatures to 55°C – 65°C, destroying all weed seeds, pathogens, and insect larvae.',
      keyProcesses: [
        'Positive aeration blower pipes pump oxygen through the biomass heap floor',
        'Thermophilic bacteria (Bacillus, Thermus) rapidly metabolize volatile organic acids',
        'Temperatures maintained above 55°C for at least 72 continuous hours for FCO hygiene compliance',
        'Eliminates Salmonella, Escherichia coli, and weed seeds without chemical additives',
      ],
      equipment: 'Forced Aeration Blowers, IoT Temperature/Moisture Telemetry Probes, Automated Bay Turners',
      parameters: {
        coreTemperature: '55°C – 65°C (Stabilized)',
        pileMoisture: '55% – 60%',
        pathogenKillRate: '99.99% (FCO Compliant)',
      },
    },
    {
      id: 4,
      title: 'Eisenia Fetida Vermi-Digestion & Biochar Pyrolysis',
      shortTitle: '4. Vermi-Digestion',
      tag: 'Biological Enhancement',
      icon: Bug,
      color: 'from-green-600 to-emerald-700',
      duration: '30 to 45 Days',
      location: 'Climate-Controlled Vermiculture Sheds & Retort Kilns',
      summary:
        'Pre-stabilized cool compost is fed to dense beds of Eisenia fetida (Red Wiggler) earthworms and blended with micro-porous pyrolyzed biochar.',
      keyProcesses: [
        'Earthworms digest organic matter, coating particles in nutrient-rich mucus and enzymatic castings',
        'Co-processing of woody biomass in oxygen-limited 550°C retort kiln produces high-surface-area biochar',
        'Biochar matrix is inoculated with beneficial Azotobacter & PSB microbial consortia',
        'Earthworm gizzard grinding creates ultra-fine, water-stable humic cast aggregates',
      ],
      equipment: 'Raised Vermi-Beds (60m length), Retort Pyrolysis Unit (550°C), Bio-Inoculant Sprayers',
      parameters: {
        wormDensity: '1,500 – 2,000 worms/m²',
        bedTemperature: '22°C – 28°C',
        biocharSurfaceArea: '> 350 m²/gram',
      },
    },
    {
      id: 5,
      title: 'Curing, 4mm Fine Trommel Sieving & FCO Lab Certification',
      shortTitle: '5. Curing & Quality Check',
      tag: 'Quality & Lab Testing',
      icon: FlaskConical,
      color: 'from-blue-600 to-indigo-600',
      duration: '10 to 14 Days',
      location: 'Indoor Curing Floor & AgroLoop Quality Lab',
      summary:
        'Mature compost undergoes curing to stabilize humic compounds, followed by vibrating fine sieving and laboratory validation under the Fertilizer Control Order (FCO 1985).',
      keyProcesses: [
        'Humification curing allows beneficial fungal mycelium (Trichoderma viride) to mature',
        'Vibrating fine trommel screen (4mm) removes coarse fibres, returning un-digested material to beds',
        'ICP-OES lab spectrophotometry checks heavy metals (Lead, Cadmium, Arsenic < permissible limits)',
        'Active microbial plate count confirms viable colony forming units (CFU > 10⁷ per gram)',
      ],
      equipment: '4mm Vibratory Trommel Siever, Laboratory Moisture Analyzer, UV-Vis Spectrophotometer',
      parameters: {
        organicCarbon: '> 16.0% (FCO Std: > 12%)',
        cnRatio: '14.2 : 1 (Ideal)',
        totalNPK: '> 2.8% (Dry Basis)',
      },
    },
    {
      id: 6,
      title: 'Packaging, Dispatch Logistics & Farm Soil Application',
      shortTitle: '6. Farmer Field Delivery',
      tag: 'Agricultural Value Creation',
      icon: Wheat,
      color: 'from-emerald-700 to-green-800',
      duration: 'Dispatched within 48 hours of bagging',
      location: 'Palghar, Shahapur, Dahanu & Raigad Farm Clusters',
      summary:
        'Final certified organic inputs are packed into moisture-sealed bags and delivered straight to rural smallholder farmers, reviving degraded soils.',
      keyProcesses: [
        'Automatic packing into 25kg & 50kg UV-resistant, breathable valve bags with batch QR codes',
        'Direct bulk transport via rural logistics network to Farmer Producer Organizations (FPOs)',
        'Farm-level application guidance delivered via AgroLoop AI mobile advisory',
        'Delivers 25–40% reduction in chemical urea/DAP fertilizer expenditure and 30% higher water retention',
      ],
      equipment: 'Semi-Automatic Bagging Machine, Thermal QR Coder, AgroLoop Last-Mile Farm Freight',
      parameters: {
        packagingSizes: '5kg, 25kg, 50kg & Bulk 1-Tonne Jumbo Bags',
        shelfLife: '12 Months (Active Microbes)',
        farmImpact: '25-35% Yield Increase in Tomato & Onion',
      },
    },
  ];

  const currentStage = STAGES[activeStage - 1];
  const CurrentIcon = currentStage.icon;

  return (
    <div className="min-h-screen flex flex-col bg-earth-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-10 space-y-12">
        {/* Top Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <Badge variant="success" className="px-3 py-1 text-xs uppercase tracking-widest font-bold">
            100% Circular Organic Bio-Transformation
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
            From Mumbai Kitchens to Maharashtra Farmland
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Discover the scientific, step-by-step biological journey that transforms urban household and society
            wet waste into certified, high-grade organic vermicompost, biochar, and bio-nutrients for rural farmers.
          </p>
        </div>

        {/* 6-Stage Interactive Stepper Header */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {STAGES.map((s) => {
              const Icon = s.icon;
              const isActive = activeStage === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStage(s.id)}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                    isActive
                      ? 'bg-emerald-900 text-white border-emerald-500 shadow-lg ring-2 ring-emerald-500/20'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-400 hover:shadow'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                        isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      STAGE {s.id}
                    </span>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-slate-400'}`} />
                  </div>
                  <span className="text-xs font-bold line-clamp-2">{s.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Deep-Dive Card */}
          <Card className="overflow-hidden border-2 border-emerald-500/30 shadow-2xl">
            <div className={`p-6 sm:p-8 bg-gradient-to-r ${currentStage.color} text-white space-y-4`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Badge variant="outline" className="text-xs border-white/40 text-white font-bold uppercase">
                  {currentStage.tag} • Stage {currentStage.id} of 6
                </Badge>
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <span className="font-semibold">Processing Timeline:</span> {currentStage.duration}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-inner">
                  <CurrentIcon className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{currentStage.title}</h2>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">Facility: {currentStage.location}</p>
                </div>
              </div>
            </div>

            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Stage Summary</h3>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {currentStage.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Key Scientific & Operational Steps
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {currentStage.keyProcesses.map((proc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                        <span>{proc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Standard Quality & Biological Parameters
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      {Object.entries(currentStage.parameters).map(([k, v], i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-earth-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1"
                        >
                          <span className="text-[10px] text-slate-400 capitalize block">
                            {k.replace(/([A-Z])/g, ' $1')}
                          </span>
                          <strong className="text-slate-900 dark:text-slate-100 font-bold block">{v}</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-900 dark:text-emerald-200">
                    <span className="font-bold block mb-0.5">Primary Equipment Employed:</span>
                    <span className="text-emerald-800 dark:text-emerald-300">{currentStage.equipment}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveStage((prev) => Math.max(1, prev - 1))}
                  disabled={activeStage === 1}
                >
                  ← Previous Stage
                </Button>
                <span className="text-xs text-slate-500 font-medium">Stage {activeStage} of 6</span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveStage((prev) => Math.min(6, prev + 1))}
                  disabled={activeStage === 6}
                >
                  Next Stage →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Waste-to-Compost Biomass Calculator */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl space-y-8">
          <div className="space-y-2 max-w-2xl">
            <Badge variant="amber" className="text-[10px] uppercase font-bold tracking-widest">
              Biomass Transformation Simulator
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Interactive Waste-to-Fertiliser Output Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Calculate the biological output and agricultural value generated from your household or housing society&apos;s
              wet waste input.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Input Slider Column */}
            <div className="space-y-6 bg-slate-800/70 p-6 rounded-2xl border border-slate-700/60">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Input Wet Waste Volume
                  </label>
                  <span className="text-xl font-black text-emerald-400 font-mono">
                    {inputWeightKg.toLocaleString()} kg
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="10000"
                  step="50"
                  value={inputWeightKg}
                  onChange={(e) => setInputWeightKg(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>50 kg (Small Society)</span>
                  <span>1,000 kg (1 Tonne)</span>
                  <span>10,000 kg (Cluster)</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Generator Source Type
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'household', label: 'Individual Homes', icon: Home },
                    { id: 'society', label: 'Housing CHS', icon: Building2 },
                    { id: 'mixed', label: 'Commercial B2B', icon: Truck },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSourceType(s.id as any)}
                      className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                        sourceType === s.id
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics Column */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                    Bio-Enriched Vermicompost
                  </span>
                  <Bug className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-white">{vermicompostKg.toLocaleString()} kg</div>
                <p className="text-[11px] text-slate-400">Digested by Eisenia fetida earthworms (100% organic)</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                    Pyrolyzed Biochar Matrix
                  </span>
                  <Flame className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-white">{biocharKg.toLocaleString()} kg</div>
                <p className="text-[11px] text-slate-400">550°C retort kiln carbon lock (locks soil moisture)</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-teal-400 font-semibold uppercase tracking-wider">
                    Liquid Bio-Fertiliser Spray
                  </span>
                  <FlaskConical className="w-4 h-4 text-teal-400" />
                </div>
                <div className="text-3xl font-black text-white">{liquidFertiliserL.toLocaleString()} Litres</div>
                <p className="text-[11px] text-slate-400">Fermented micro-nutrient foliar spray</p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-900/30 border border-emerald-700/50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                    Farmland Soil Enriched
                  </span>
                  <Wheat className="w-4 h-4 text-emerald-300" />
                </div>
                <div className="text-3xl font-black text-emerald-300">{farmlandAcres} Acres</div>
                <p className="text-[11px] text-slate-400">
                  Avoids <strong className="text-white">{co2eAvoidedKg} kg</strong> methane CO₂e from landfills
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FCO 1985 Scientific Standard Benchmarks Table */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" /> Statutory FCO 1985 Scientific Quality Standards
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Comparison between AgroLoop Bio-Enriched Compost and standard government Fertilizer Control Order (FCO) benchmarks.
            </p>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 bg-earth-50 dark:bg-slate-800/50">
                      <th className="py-3 px-4">Parameter / Metric</th>
                      <th className="py-3 px-4">FCO 1985 Statutory Standard</th>
                      <th className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-bold">
                        AgroLoop Certified Output
                      </th>
                      <th className="py-3 px-4">Agricultural Benefit to Farmers</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {[
                      {
                        param: 'Total Organic Carbon (C)',
                        fco: 'Minimum 12.0%',
                        agroloop: '18.4% (Superior)',
                        benefit: 'Restores degraded soil humus and boosts microbial aeration',
                      },
                      {
                        param: 'Carbon : Nitrogen (C:N) Ratio',
                        fco: '< 20 : 1',
                        agroloop: '14.2 : 1 (Optimal)',
                        benefit: 'Prevents nitrogen immobilization; instant crop uptake',
                      },
                      {
                        param: 'Total NPK Content (N + P₂O₅ + K₂O)',
                        fco: 'Minimum 1.5%',
                        agroloop: '3.1% (Enriched)',
                        benefit: 'Cuts synthetic urea & DAP chemical dependency by 35%',
                      },
                      {
                        param: 'Moisture Content by Weight',
                        fco: '15.0% – 25.0%',
                        agroloop: '18.5% (Balanced)',
                        benefit: 'Preserves living Azotobacter bacteria without clumping',
                      },
                      {
                        param: 'pH Value (1:5 dilution)',
                        fco: '6.5 – 7.5',
                        agroloop: '7.1 (Neutral)',
                        benefit: 'Buffers soil acidity in high-chemical farm plots',
                      },
                      {
                        param: 'Heavy Metals (Lead, Cd, As)',
                        fco: '< Permissible statutory limits',
                        agroloop: 'Non-Detectable (< 0.001 ppm)',
                        benefit: 'Safe for organic export vegetable certification',
                      },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-earth-50/50 dark:hover:bg-slate-800/30">
                        <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">{row.param}</td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{row.fco}</td>
                        <td className="py-3 px-4 font-extrabold text-emerald-700 dark:text-emerald-400">{row.agroloop}</td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{row.benefit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Bottom Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl font-black tracking-tight">Ready to Close the Loop in Mumbai?</h3>
            <p className="text-xs sm:text-sm text-slate-200">
              Join hundreds of Mumbai societies diverting daily waste, or buy certified compost delivered directly to your farm.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href={ROUTES.PUBLIC.PRODUCTS}>
              <Button size="lg" className="bg-white text-emerald-950 hover:bg-emerald-50 font-bold">
                <Sprout className="w-4 h-4 mr-1.5 text-emerald-700" /> Order Compost for Farm
              </Button>
            </Link>
            <Link href={ROUTES.AUTH.LOGIN}>
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                <Building2 className="w-4 h-4 mr-1.5" /> Society Bulk Demo Login
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
