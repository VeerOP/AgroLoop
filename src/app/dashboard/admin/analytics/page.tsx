'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WasteCollectionChart, ProductOutputBarChart } from '@/components/charts/ImpactCharts';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex items-center justify-between">
        <div>
          <Badge variant="amber" className="text-[10px] uppercase">Analytics & Intelligence</Badge>
          <h2 className="text-2xl font-extrabold mt-1">Mumbai Operations Performance Analytics</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Waste Collection Analytics (kg)</CardTitle></CardHeader>
          <CardContent><WasteCollectionChart /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Product Production Output vs Demand</CardTitle></CardHeader>
          <CardContent><ProductOutputBarChart /></CardContent>
        </Card>
      </div>
    </div>
  );
}
