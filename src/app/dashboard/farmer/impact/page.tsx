'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AgroLoopStore } from '@/lib/db/store';
import { formatINR } from '@/lib/utils';

export default function FarmerImpactPage() {
  const farmer = AgroLoopStore.getCurrentUser('farmer');
  const orders = AgroLoopStore.getOrders().filter((o) => o.farmer_id === farmer.id);
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const estimatedSavings = Math.round(totalSpent * 1.45 + 18200);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-2">
        <h2 className="text-2xl font-extrabold">Soil Health & Input Expenditure Impact</h2>
        <p className="text-xs text-slate-300">Ramkisan Patil • Palghar Village Cluster</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Card>
          <CardContent className="p-6 space-y-2">
            <span className="text-xs font-bold uppercase text-slate-500">Chemical Input Cost Savings</span>
            <div className="text-2xl font-black text-emerald-700">{formatINR(estimatedSavings)}</div>
            <p className="text-xs text-slate-500">Savings compared to synthetic NPK fertilizers</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-2">
            <span className="text-xs font-bold uppercase text-slate-500">Soil Organic Carbon Added</span>
            <div className="text-2xl font-black text-amber-600">+0.42% SOC</div>
            <p className="text-xs text-slate-500">Black cotton soil organic carbon buildup</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
