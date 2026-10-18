'use client';

import React from 'react';
import { MumbaiMap } from '@/components/maps/MumbaiMap';
import { Badge } from '@/components/ui/badge';
import { Truck } from 'lucide-react';

export default function CollectorRoutesPage() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-5 rounded-3xl space-y-2 border border-slate-800">
        <div className="flex items-center justify-between">
          <Badge variant="amber" className="text-[10px]">GPS Logistics Navigator</Badge>
          <span className="text-xs text-slate-300">Dadar Central Route Depot</span>
        </div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Truck className="w-5 h-5 text-emerald-400" /> Today&apos;s Collection Route Nodes
        </h2>
      </div>

      <MumbaiMap />
    </div>
  );
}
