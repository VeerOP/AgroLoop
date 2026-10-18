'use client';

import React from 'react';
import Link from 'next/link';
import { Truck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';
import { formatDate } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

export default function CollectorHistoryPage() {
  const pickups = AgroLoopStore.getPickups().filter((p) => p.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-5 rounded-3xl space-y-2 border border-slate-800">
        <h2 className="text-xl font-bold">Collector Completed History Logs</h2>
        <p className="text-xs text-slate-300">Recorded weights and contamination inspection results.</p>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-y">
              <tr>
                <th className="p-3.5 font-bold">Pickup ID</th>
                <th className="p-3.5 font-bold">Customer Name</th>
                <th className="p-3.5 font-bold">Collection Date</th>
                <th className="p-3.5 font-bold">Weight Collected</th>
                <th className="p-3.5 font-bold">Contamination</th>
                <th className="p-3.5 font-bold">Detail View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {pickups.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-mono text-emerald-700 font-bold">#{p.id.slice(-6)}</td>
                  <td className="p-3.5 font-semibold">{p.customer_name}</td>
                  <td className="p-3.5">{formatDate(p.scheduled_date)}</td>
                  <td className="p-3.5 font-bold text-emerald-700">{p.actual_weight_kg} kg</td>
                  <td className="p-3.5"><Badge variant="success">Passed (0%)</Badge></td>
                  <td className="p-3.5">
                    <Link href={ROUTES.COLLECTOR.PICKUP_DETAIL(p.id)}>
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
