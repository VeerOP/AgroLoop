'use client';

import React from 'react';
import {
  Leaf,
  CloudRain,
  Trees,
  Scale,
  Sparkles,
  TrendingUp,
  Download,
  Building2,
  Sprout,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { calculateWasteImpact } from '@/lib/impact/calculator';
import { formatWeight } from '@/lib/utils';

export default function SocietyImpactPage() {
  const totalLifetimeDivertedKg = 22560; // ~4 months of society operations
  const { co2eKg } = calculateWasteImpact(totalLifetimeDivertedKg);
  const treesEquivalent = Math.round(co2eKg / 21.77);
  const organicCompostKg = Math.round(totalLifetimeDivertedKg * 0.45);
  const landfillSpaceSavedLiters = Math.round(totalLifetimeDivertedKg * 1.8);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Sea Breeze CHS ESG & Sustainability Impact
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Cumulative environmental contribution from 350 residential units diverted from Mumbai landfills
          </p>
        </div>
        <Button
          onClick={() => alert('Society Annual ESG Report downloaded successfully.')}
          variant="primary"
          size="md"
        >
          <Download className="w-4 h-4 mr-1.5" /> Download Annual ESG Report
        </Button>
      </div>

      {/* Main Impact Hero Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                Lifetime Waste Diverted
              </span>
              <Scale className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-emerald-950 dark:text-emerald-100">
              {formatWeight(totalLifetimeDivertedKg)}
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
              Zero organic waste to Deonar / Kanjurmarg landfills
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Methane Avoidance
              </span>
              <CloudRain className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-black text-blue-900 dark:text-blue-200">{co2eKg} kg</div>
            <p className="text-xs text-slate-500">CO₂ equivalent emissions prevented</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Compost Produced
              </span>
              <Sprout className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-black text-green-900 dark:text-green-200">
              {formatWeight(organicCompostKg)}
            </div>
            <p className="text-xs text-slate-500">Enriched soil for Palghar vegetable farmers</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Tree Planting Equivalent
              </span>
              <Trees className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400">
              {treesEquivalent} Trees
            </div>
            <p className="text-xs text-slate-500">Annual carbon sequestration equivalent</p>
          </CardContent>
        </Card>
      </div>

      {/* Narrative Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600" /> Landfill Space Preservation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Mumbai generates over 6,500 tonnes of municipal solid waste every single day, with over 70%
              dumped into the overflowing Deonar and Kanjurmarg dumping grounds.
            </p>
            <div className="p-4 rounded-2xl bg-earth-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Volumetric Landfill Space Saved:</span>
                <strong className="text-emerald-700 dark:text-emerald-400">{landfillSpaceSavedLiters} Litres</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Leachate Water Contamination Avoided:</span>
                <strong className="text-emerald-700 dark:text-emerald-400">~11,280 Litres</strong>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" /> Circular Rural Farmer Connection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Every kilogram of kitchen scrap collected from Sea Breeze CHS is biologically converted at our
              MIDC Mahape Bio-Hub into high-grade organic vermicompost and biochar, helping rural farmers in
              Palghar District transition away from expensive chemical fertilizers.
            </p>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1 text-emerald-900 dark:text-emerald-200">
              <strong className="block font-bold">Partner Farm Beneficiaries:</strong>
              <span>Ramkisan Patil & 12 smallholders in Manor-Palghar cluster receiving regular soil conditioning.</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
