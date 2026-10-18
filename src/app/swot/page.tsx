'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShieldCheck, AlertTriangle, TrendingUp, ShieldAlert } from 'lucide-react';

export default function SWOTPage() {
  return (
    <div className="min-h-screen flex flex-col bg-earth-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="amber" className="text-xs uppercase tracking-widest">Strategic Analysis</Badge>
          <h1 className="text-3xl font-extrabold tracking-tight">Interactive AgroLoop SWOT Matrix</h1>
          <p className="text-xs sm:text-sm text-slate-500">Evaluating internal capabilities and external market dynamics for Mumbai circular waste operations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <Card className="border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/30">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                <ShieldCheck className="w-5 h-5 text-emerald-600" /> STRENGTHS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border">• End-to-End Supply Chain Control (Collection → Processing → Direct Farmer Sales)</div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border">• Extremely Low Raw Material Cost (Municipal & Household Food Waste)</div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border">• Tech-Enabled Operations (App routing, batch tracking & AI agronomist advisory)</div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border">• Strong Alignment with Swachh Bharat & National Organic Farming Policies</div>
            </CardContent>
          </Card>

          {/* Weaknesses */}
          <Card className="border-rose-500/40 bg-rose-50/50 dark:bg-rose-950/30">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-rose-800 dark:text-rose-300">
                <AlertTriangle className="w-5 h-5 text-rose-600" /> WEAKNESSES
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border">• Labor-intensive pre-segregation & contamination checking</div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border">• 30-45 day vermicomposting maturation cycle delay</div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border">• High reliance on household behavior change for source segregation</div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border">• Liquid bio-fertiliser leakproof packaging & shelf-life logistics</div>
            </CardContent>
          </Card>

          {/* Opportunities */}
          <Card className="border-amber-500/40 bg-amber-50/50 dark:bg-amber-950/30">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-amber-800 dark:text-amber-300">
                <TrendingUp className="w-5 h-5 text-amber-600" /> OPPORTUNITIES
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border">• Rapidly growing organic agriculture input demand in Konkan & Western Maharashtra</div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border">• Monetization via voluntary carbon credits (methane avoidance)</div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border">• Integration with Mumbai Climate Action Plan & BMC bulk generator initiatives</div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border">• Geographic expansion into MMR & Tier-2 cities (Thane, Navi Mumbai, Nashik)</div>
            </CardContent>
          </Card>

          {/* Threats */}
          <Card className="border-purple-500/40 bg-purple-50/50 dark:bg-purple-950/30">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-purple-800 dark:text-purple-300">
                <ShieldAlert className="w-5 h-5 text-purple-600" /> THREATS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border">• Municipal processing monopolies & tender bottlenecks</div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border">• Poor source segregation leading to high batch rejection rates</div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border">• Initial farmer mistrust towards urban-waste-derived compost</div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border">• Fluctuations in chemical fertilizer subsidies altering price competitiveness</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
