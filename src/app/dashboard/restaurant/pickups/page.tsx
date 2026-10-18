'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';
import { formatDate } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

export default function RestaurantPickupsPage() {
  const pickups = AgroLoopStore.getPickups().filter((p) => p.customer_type === 'restaurant');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Commercial Food Waste Collection Log</h2>
          <p className="text-xs text-slate-300 mt-1">Daily recorded weights for Spice Garden Bistro (FC Road).</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-y border-slate-100 dark:border-slate-800">
              <tr>
                <th className="p-3.5 font-bold">Pickup ID</th>
                <th className="p-3.5 font-bold">Collection Date</th>
                <th className="p-3.5 font-bold">Recorded Weight</th>
                <th className="p-3.5 font-bold">Contamination Check</th>
                <th className="p-3.5 font-bold">Status</th>
                <th className="p-3.5 font-bold">Detail View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {pickups.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                  <td className="p-3.5 font-mono text-emerald-700 font-bold">#{p.id.slice(-6)}</td>
                  <td className="p-3.5 font-semibold">{formatDate(p.scheduled_date)}</td>
                  <td className="p-3.5 font-bold text-emerald-700">{p.actual_weight_kg ? `${p.actual_weight_kg} kg` : `${p.estimated_weight_kg} kg est.`}</td>
                  <td className="p-3.5"><Badge variant="success">Passed (0%)</Badge></td>
                  <td className="p-3.5"><Badge variant="success">{p.status}</Badge></td>
                  <td className="p-3.5">
                    <Link href={ROUTES.RESTAURANT.PICKUP_DETAIL(p.id)}>
                      <Button size="sm" variant="outline">View</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
