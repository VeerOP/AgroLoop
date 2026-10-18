'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Truck, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';
import { formatDate, formatINR } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

export default function FarmerOrderDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const order = AgroLoopStore.getOrderById(id);

  if (!order) {
    return (
      <div className="p-8 text-center space-y-4">
        <h3 className="text-lg font-bold">Order Not Found</h3>
        <Link href={ROUTES.FARMER.ORDERS}><Button variant="primary">Return to Orders</Button></Link>
      </div>
    );
  }

  const steps = ['placed', 'confirmed', 'processing', 'packed', 'out_for_delivery', 'delivered'];
  const currentIdx = steps.indexOf(order.status);

  return (
    <div className="space-y-6 max-w-3xl">
      <Link href={ROUTES.FARMER.ORDERS} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" /> Back to My Orders
      </Link>

      <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="amber" className="text-[10px]">Order #{order.id.slice(-6)}</Badge>
          <Badge variant={order.status === 'delivered' ? 'success' : 'amber'}>{order.status}</Badge>
        </div>
        <h2 className="text-2xl font-black">Placed on {formatDate(order.created_at)}</h2>
        <p className="text-xs text-slate-300">Total Paid: {formatINR(order.total)}</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4 text-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Live Delivery Progress</h3>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2">
            {steps.map((step, idx) => (
              <div
                key={step}
                className={`p-2.5 rounded-xl border text-center font-semibold text-[11px] ${
                  idx <= currentIdx ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}
              >
                {step.replace('_', ' ')}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Order Items</h4>
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>{item.product_name} ({item.quantity} units)</span>
                <span className="font-bold">{formatINR(item.unit_price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
