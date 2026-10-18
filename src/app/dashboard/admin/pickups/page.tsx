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

export default function AdminPickupsPage() {
  const pickups = AgroLoopStore.getPickups();

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Logistics Pickups Master Control</h2>
          <p className="text-xs text-slate-300 mt-1">Real-time status of all household and restaurant organic waste pickups across Mumbai.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-y">
              <tr>
                <th className="p-3.5 font-bold">Pickup ID</th>
                <th className="p-3.5 font-bold">Customer Name</th>
                <th className="p-3.5 font-bold">Type</th>
                <th className="p-3.5 font-bold">Scheduled Date</th>
                <th className="p-3.5 font-bold">Est. Weight</th>
                <th className="p-3.5 font-bold">Actual Weight</th>
                <th className="p-3.5 font-bold">Collector</th>
                <th className="p-3.5 font-bold">Status</th>
                <th className="p-3.5 font-bold">Detail View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {pickups.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-mono text-emerald-700 font-bold">#{p.id.slice(-6)}</td>
                  <td className="p-3.5 font-semibold">{p.customer_name}</td>
                  <td className="p-3.5"><Badge variant={p.customer_type === 'restaurant' ? 'amber' : 'default'}>{p.customer_type}</Badge></td>
                  <td className="p-3.5">{formatDate(p.scheduled_date)}</td>
                  <td className="p-3.5">{p.estimated_weight_kg} kg</td>
                  <td className="p-3.5 font-bold text-emerald-700">{p.actual_weight_kg ? `${p.actual_weight_kg} kg` : '—'}</td>
                  <td className="p-3.5">{p.collector_name || 'Suresh Gaikwad'}</td>
                  <td className="p-3.5"><Badge variant={p.status === 'completed' ? 'success' : 'warning'}>{p.status}</Badge></td>
                  <td className="p-3.5">
                    <Link href={ROUTES.ADMIN.PICKUP_DETAIL(p.id)}>
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
