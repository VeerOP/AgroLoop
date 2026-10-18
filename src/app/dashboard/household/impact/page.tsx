'use client';

import React from 'react';
import { Leaf, Sparkles, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AgroLoopStore } from '@/lib/db/store';
import { formatWeight } from '@/lib/utils';
import { calculateWasteImpact } from '@/lib/impact/calculator';

export default function HouseholdImpactPage() {
  const user = AgroLoopStore.getCurrentUser('household');
  const pickups = AgroLoopStore.getPickups().filter((p) => p.customer_id === user.id || p.customer_type === 'household');
  const completed = pickups.filter((p) => p.status === 'completed');
  const totalKg = completed.reduce((sum, p) => sum + (p.actual_weight_kg || p.estimated_weight_kg || 0), 0);
  const { co2eKg } = calculateWasteImpact(totalKg);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-2">
        <h2 className="text-2xl font-extrabold">Household Environmental Impact</h2>
        <p className="text-xs text-slate-300">Audited carbon footprint avoidance from your Bandra West residence.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card>
          <CardContent className="p-6 space-y-2">
            <span className="text-xs font-bold uppercase text-slate-500">Waste Diverted</span>
            <div className="text-2xl font-black text-emerald-700">{formatWeight(totalKg)}</div>
            <p className="text-xs text-slate-500">Diverted from Mumbai landfills</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-2">
            <span className="text-xs font-bold uppercase text-slate-500">CO₂e Avoided</span>
            <div className="text-2xl font-black text-amber-600">{co2eKg} kg</div>
            <p className="text-xs text-slate-500">Methane emissions prevented</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-2">
            <span className="text-xs font-bold uppercase text-slate-500">Equivalent Trees</span>
            <div className="text-2xl font-black text-purple-700">{Math.round(co2eKg / 21.77)} Trees</div>
            <p className="text-xs text-slate-500">Annual CO₂ absorption equivalent</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
