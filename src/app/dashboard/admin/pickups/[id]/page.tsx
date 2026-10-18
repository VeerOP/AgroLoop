'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';
import { formatDate } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

export default function AdminPickupDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const pickup = AgroLoopStore.getPickupById(id);

  if (!pickup) {
    return (
      <div className="p-8 text-center space-y-4">
        <h3 className="text-lg font-bold">Pickup Request Not Found</h3>
        <Link href={ROUTES.ADMIN.PICKUPS}><Button variant="primary">Return to Pickups Master</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <Link href={ROUTES.ADMIN.PICKUPS} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" /> Back to Pickups Master
      </Link>

      <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="amber" className="text-[10px]">Pickup Record #{pickup.id.slice(-6)}</Badge>
          <Badge variant={pickup.status === 'completed' ? 'success' : 'warning'}>{pickup.status}</Badge>
        </div>
        <h2 className="text-xl font-bold">{pickup.customer_name}</h2>
        <p className="text-xs text-slate-300">{pickup.customer_address}</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Customer Type</span>
              <Badge variant={pickup.customer_type === 'restaurant' ? 'amber' : 'default'}>{pickup.customer_type}</Badge>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Scheduled Date & Time</span>
              <span className="font-semibold">{formatDate(pickup.scheduled_date)} ({pickup.time_window})</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Estimated Weight</span>
              <span className="font-semibold">{pickup.estimated_weight_kg} kg</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Actual Recorded Weight</span>
              <span className="font-bold text-emerald-700 text-sm">{pickup.actual_weight_kg ? `${pickup.actual_weight_kg} kg` : 'Pending'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
