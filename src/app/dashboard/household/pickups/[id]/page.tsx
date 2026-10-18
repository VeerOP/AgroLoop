'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Truck, CheckCircle2, MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';
import { formatDate } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

export default function HouseholdPickupDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const pickup = AgroLoopStore.getPickupById(id);

  if (!pickup) {
    return (
      <div className="p-8 text-center space-y-4">
        <h3 className="text-lg font-bold">Pickup Request Not Found</h3>
        <Link href={ROUTES.HOUSEHOLD.PICKUPS}><Button variant="primary">Return to Pickups List</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <Link href={ROUTES.HOUSEHOLD.PICKUPS} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" /> Back to Pickups List
      </Link>

      <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="amber" className="text-[10px]">Pickup Record #{pickup.id.slice(-6)}</Badge>
          <Badge variant={pickup.status === 'completed' ? 'success' : 'warning'}>{pickup.status}</Badge>
        </div>
        <h2 className="text-2xl font-black">Scheduled for {formatDate(pickup.scheduled_date)}</h2>
        <p className="text-xs text-slate-300">Time Slot: {pickup.time_window}</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Customer</span>
              <span className="font-semibold text-sm">{pickup.customer_name}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Address</span>
              <span className="font-semibold">{pickup.customer_address}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Estimated Weight</span>
              <span className="font-semibold">{pickup.estimated_weight_kg} kg</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Actual Weight Collected</span>
              <span className="font-bold text-emerald-700 text-sm">{pickup.actual_weight_kg ? `${pickup.actual_weight_kg} kg` : 'Pending'}</span>
            </div>
          </div>
          {pickup.notes && (
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border">
              <span className="font-bold text-slate-500 block mb-1">Collector Notes:</span>
              <span>{pickup.notes}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
