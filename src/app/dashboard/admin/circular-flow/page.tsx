'use client';

import React from 'react';
import { Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CircularFlow } from '@/components/circular/CircularFlow';
import { MumbaiMap } from '@/components/maps/MumbaiMap';

export default function AdminCircularFlowPage() {
  return (
    <div className="space-y-8">
      <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <h2 className="text-2xl font-extrabold tracking-tight">Live Circular Economy Pipeline</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Real-time tracking of organic nutrient transformation: from urban scrap collection nodes to rural farm applications in Maharashtra.
          </p>
        </div>
        <Badge variant="amber" className="text-xs uppercase tracking-wider">Connected Live System</Badge>
      </div>

      <CircularFlow />

      <div className="pt-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Mumbai Metropolitan Infrastructure Footprint</h3>
        <MumbaiMap />
      </div>
    </div>
  );
}
