'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Building2,
  TrendingUp,
  MapPin,
  Sparkles,
  Bot,
  Truck,
  Layers,
  Flame,
  Scale,
  Coins,
  ChevronRight,
  Sliders,
  Check,
  Leaf,
  Factory,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CircularFlow } from '@/components/circular/CircularFlow';
import { MumbaiMap } from '@/components/maps/MumbaiMap';

export default function LandingPage() {
  // Interactive Financial Simulator State
  const [monthlyWasteMT, setMonthlyWasteMT] = useState<number>(30); // 30 MT default
  const collectionCostPerKg = 2.8;
  const processingCostPerKg = 3.5;
  const totalCostPerKg = collectionCostPerKg + processingCostPerKg; // 6.30
  const blendedSellingPrice = 14.5;
  const grossMarginPercent = Math.round(((blendedSellingPrice - totalCostPerKg) / blendedSellingPrice) * 100); // 56%

  const totalKg = monthlyWasteMT * 1000;
  const monthlyCostINR = totalKg * totalCostPerKg;
  const monthlyRevenueINR = totalKg * blendedSellingPrice;
  const monthlyGrossProfitINR = monthlyRevenueINR - monthlyCostINR;
  const co2eAvoidedMT = (totalKg * 1.25) / 1000;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-700 selection:text-white antialiased">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
              <span>Mumbai Circular Nutrient Infrastructure</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Turning urban food waste into regenerative soil health.
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
              AgroLoop bridges Mumbai’s city kitchens and peri-urban smallholder farms through verified, source-segregated bio-conversion and precision agronomic advisory.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/dashboard/household">
                <Button size="lg" className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-900 text-white font-medium px-6 shadow-sm">
                  Launch Platform Demo <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>

          {/* Minimal Clean Stats Bar */}
          <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">6,500 MT</div>
              <div className="text-xs text-slate-500 font-medium">Daily Mumbai Solid Waste</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">&gt;60%</div>
              <div className="text-xs text-slate-500 font-medium">Wet Organic Food Scraps</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-400 tracking-tight">56%</div>
              <div className="text-xs text-slate-500 font-medium">Blended Gross Margin</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">1,875 MT</div>
              <div className="text-xs text-slate-500 font-medium">Annual CO₂e Mitigated / Hub</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem: Two Connected Realities */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">The Context</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Two interconnected challenges, one closed loop.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
              Mumbai&apos;s urban center is overloaded with organic food waste, while rural agricultural soils in peri-urban belts are starving for organic matter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Urban Side */}
            <div className="p-8 rounded-2xl bg-[#FAF9F6] dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Urban Food Waste Burden</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Over 3,800 metric tonnes of organic scraps are dumped every day into overflowing yards like Deonar and Kanjurmarg. Mixed dumping generates methane and toxic leachate, while restaurants face heavy municipal penalties under BMC Solid Waste Management Rules for unsegregated disposal.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                BMC Solid Waste Management Rules Compliance Gap
              </div>
            </div>

            {/* Agricultural Side */}
            <div className="p-8 rounded-2xl bg-[#FAF9F6] dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Peri-Urban Soil Depletion</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                In vegetable clusters like Palghar and Shahapur, Soil Organic Carbon has dropped to under 0.4%, compared to the healthy baseline of 1.0%. Smallholders spend upwards of ₹35,000 per acre on chemical fertilizers that deteriorate microbial life and reduce drought resilience.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Rebuilding Soil Organic Carbon & Microbiota
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works: The 4-Stage Circular Pipeline */}
      <section id="how-it-works" className="py-20 bg-[#FAF9F6] dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">The Workflow</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              From city waste to farm harvest.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
              A transparent four-stage pipeline moving nutrients from household bins to farmer fields.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">STAGE 01</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Scheduled Collection</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Daily scheduled pickups from households and restaurants using electric 3-wheeler loaders with Bluetooth weight scales.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">STAGE 02</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Digital QC & Verification</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Loaders perform digital contamination inspection at the doorstep. Pure waste earns green rewards; contaminated loads are flagged.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">STAGE 03</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">4-Stream Bio-Conversion</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Mahape Hub processes feedstock into solid vermicompost, 550°C pyrolyzed biochar, liquid fertilizer, and bokashi fermentation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">STAGE 04</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Soil Advisory & Delivery</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct distribution to smallholder farmers paired with Google Gemini AI agronomist advisory for crop-specific application dosages.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <CircularFlow />
          </div>
        </div>
      </section>

      {/* Regional Ecosystem Footprint Map */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">Geospatial Footprint</span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                Mumbai Regional Operations Map
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Visualizing collection nodes (Bandra, Powai), central processing (Mahape), and farm clusters (Palghar & Shahapur).
              </p>
            </div>
            <Link href="/dashboard/collector/routes">
              <Button variant="outline" size="sm" className="border-slate-300 dark:border-slate-700">
                View Collector Route Telematics
              </Button>
            </Link>
          </div>

          <MumbaiMap />
        </div>
      </section>

      {/* 4 Primary Agricultural Bio-Inputs */}
      <section className="py-20 bg-[#FAF9F6] dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">Product Portfolio</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              High-grade inputs for regenerative agriculture.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
              Unlike generic compost, AgroLoop produces 4 targeted bio-products formulated for specific soil deficiencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Solid Compost</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Bio-Enriched Vermicompost</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Digested by Eisenia fetida earthworms and enriched with Azotobacter cultures to restore living biology.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
                <span className="text-lg font-bold text-slate-900 dark:text-white">₹10 <span className="text-xs text-slate-500 font-normal">/ kg</span></span>
                <span className="text-xs text-slate-500 font-medium">Nitrogen Boost</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Carbon Matrix</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Biochar Carbon Matrix</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  550°C pyrolyzed micro-porous carbon that retains soil moisture and locks carbon for 100+ years.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
                <span className="text-lg font-bold text-slate-900 dark:text-white">₹24 <span className="text-xs text-slate-500 font-normal">/ kg</span></span>
                <span className="text-xs text-slate-500 font-medium">Drought Resilience</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-sky-700 dark:text-sky-400 uppercase tracking-wider">Foliar Spray</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Liquid Bio-Fertiliser</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Anaerobically fermented nutrient extract rich in plant enzymes, amino acids, and micronutrients.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
                <span className="text-lg font-bold text-slate-900 dark:text-white">₹32 <span className="text-xs text-slate-500 font-normal">/ L</span></span>
                <span className="text-xs text-slate-500 font-medium">Fast Foliar Uptake</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-purple-700 dark:text-purple-400 uppercase tracking-wider">Fermentation Starter</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Bokashi Microbe Mix</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  EM1 inoculated bran for rapid, odorless anaerobic pre-digestion of cooked kitchen scraps.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
                <span className="text-lg font-bold text-slate-900 dark:text-white">₹45 <span className="text-xs text-slate-500 font-normal">/ kg</span></span>
                <span className="text-xs text-slate-500 font-medium">Odor-Free Digestion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Financial Simulator */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">Unit Economics</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Interactive Financial & Impact Model
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
              Adjust monthly waste volume to see operational costs, revenues, and environmental mitigation in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Slider Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#FAF9F6] dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                    Monthly Volume
                  </span>
                  <span className="font-mono font-bold text-lg text-slate-900 dark:text-white">
                    {monthlyWasteMT} MT / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={monthlyWasteMT}
                  onChange={(e) => setMonthlyWasteMT(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>5 MT (Small Pilot)</span>
                  <span>50 MT (Single Hub)</span>
                  <span>150 MT (Regional Cluster)</span>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-700 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>EV Collection Cost:</span>
                  <span className="font-mono font-medium">₹2.80 / kg</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Bio-Processing & Maturation:</span>
                  <span className="font-mono font-medium">₹3.50 / kg</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Total Unit Cost:</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">₹6.30 / kg</span>
                </div>
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold pt-1 border-t border-slate-200 dark:border-slate-700">
                  <span>Blended Sale Price:</span>
                  <span className="font-mono">₹14.50 / kg</span>
                </div>
              </div>
            </div>

            {/* Computed Output Metrics */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-2 shadow-xs">
                <div className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Gross Profit Margin</div>
                <div className="text-4xl font-black text-emerald-400">{grossMarginPercent}%</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Supported by high-realization Biochar (₹24/kg) and Liquid Extract (₹32/L).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 shadow-xs">
                <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Monthly Gross Profit</div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">
                  ₹{(monthlyGrossProfitINR / 100000).toFixed(2)} Lakhs
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Net contribution on {totalKg.toLocaleString()} kg monthly input.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 shadow-xs">
                <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Monthly Revenue</div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">
                  ₹{(monthlyRevenueINR / 100000).toFixed(2)} Lakhs
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Blended product sales + commercial restaurant tipping fees.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 shadow-xs">
                <div className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">CO₂e Methane Mitigated</div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">
                  {co2eAvoidedMT.toFixed(1)} MT / mo
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Direct landfill methane diversion verifiable under carbon standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholder Ecosystem */}
      <section className="py-20 bg-[#FAF9F6] dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">Stakeholder Value</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Built for all 4 primary participants.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
              Every participant in the AgroLoop ecosystem has dedicated mobile workflows and tangible economic incentives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <Building2 className="w-6 h-6 text-emerald-700" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Households</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Scheduled doorstep pickups, transparent bin weight tracking, and green reward points.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <Building2 className="w-6 h-6 text-slate-700 dark:text-slate-300" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Restaurants</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Daily bulk scrap collection, digital manifests, and verified SWM Rules 2016 compliance certificates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <Truck className="w-6 h-6 text-emerald-700" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Logistics Collectors</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Optimized EV loader routes, digital scales, doorstep quality verification, and dignified wages.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <Sprout className="w-6 h-6 text-amber-700" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Smallholder Farmers</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Certified organic inputs, doorstep delivery, and 24/7 AI agronomist crop dosage guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to test the live circular platform?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Switch between demo personas to test household pickup scheduling, restaurant ESG logs, EV collector routes, and farmer storefront ordering.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/login">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6">
                Explore Demo Roles
              </Button>
            </Link>
            <Link href="/dashboard/admin/circular-flow">
              <Button variant="outline" size="lg" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                Operations Command View
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Clean Minimal Footer */}
      <footer className="bg-white dark:bg-slate-950 text-slate-500 py-10 border-t border-slate-200 dark:border-slate-800 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-700 flex items-center justify-center text-white font-bold text-xs">A</div>
            <span className="font-bold text-slate-800 dark:text-slate-200">AGROLOOP</span>
            <span className="text-slate-400">• Circular Bio-Economy Platform</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/how-it-works" className="hover:text-slate-800 dark:hover:text-slate-200">How It Works</Link>
            <Link href="/products" className="hover:text-slate-800 dark:hover:text-slate-200">Products</Link>
            <Link href="/impact" className="hover:text-slate-800 dark:hover:text-slate-200">Impact</Link>
            <Link href="/about" className="hover:text-slate-800 dark:hover:text-slate-200">About</Link>
            <Link href="/login" className="font-semibold text-emerald-700 dark:text-emerald-400">Demo Login</Link>
          </div>

          <div>© 2026 AgroLoop. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
