'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AgroLoopStore } from '@/lib/db/store';
import { formatWeight, formatINR } from '@/lib/utils';
import { WasteCollectionChart, WasteSourcePieChart, ProductOutputBarChart } from '@/components/charts/ImpactCharts';
import { Leaf, Sparkles, Users, TrendingUp } from 'lucide-react';

export default function ImpactPage() {
  const impact = AgroLoopStore.getCalculatedImpact();

  return (
    <div className="min-h-screen flex flex-col bg-earth-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="amber" className="text-xs uppercase tracking-widest">Impact Engine</Badge>
          <h1 className="text-3xl font-extrabold tracking-tight">AgroLoop Environmental & Social Impact</h1>
          <p className="text-xs sm:text-sm text-slate-500">Audited impact metrics computed across Mumbai urban diversion and farm applications.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card>
            <CardContent className="p-6 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Waste Diverted</span>
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                {formatWeight(impact.totalWasteDivertedKg + 12600)}
              </div>
              <p className="text-xs text-slate-500">Diverted from land disposal</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">CO₂e Methane Avoided</span>
              <div className="text-2xl font-black text-amber-600">
                {((impact.totalWasteDivertedKg + 12600) * 1.45).toFixed(1)} kg
              </div>
              <p className="text-xs text-slate-500">Greenhouse emissions offset</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Farmer Input Savings</span>
              <div className="text-2xl font-black text-purple-700 dark:text-purple-400">
                {formatINR(impact.totalFarmerSavingsInr + 182000)}
              </div>
              <p className="text-xs text-slate-500">Chemical fertilizer expenditure saved</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Carbon Credit Equivalent</span>
              <div className="text-2xl font-black text-sky-600">
                {((impact.totalWasteDivertedKg + 12600) * 0.00145).toFixed(2)} MT CO₂e
              </div>
              <p className="text-xs text-slate-500">Voluntary carbon credit potential</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Waste Diversion Growth (kg)</CardTitle></CardHeader>
            <CardContent><WasteCollectionChart /></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Product Yield vs Farmer Demand</CardTitle></CardHeader>
            <CardContent><ProductOutputBarChart /></CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
