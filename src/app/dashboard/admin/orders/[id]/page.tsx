'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';
import { formatDate, formatINR } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

export default function AdminOrderDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const order = AgroLoopStore.getOrderById(id);

  if (!order) {
    return (
      <div className="p-8 text-center space-y-4">
        <h3 className="text-lg font-bold">Order Not Found</h3>
        <Link href={ROUTES.ADMIN.ORDERS}><Button variant="primary">Return to Orders Master</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <Link href={ROUTES.ADMIN.ORDERS} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" /> Back to Orders Master
      </Link>

      <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="amber" className="text-[10px]">Order Master #{order.id.slice(-6)}</Badge>
          <Badge variant={order.status === 'delivered' ? 'success' : 'amber'}>{order.status}</Badge>
        </div>
        <h2 className="text-2xl font-black">Farmer: {order.farmer_name}</h2>
        <p className="text-xs text-slate-300">Delivery Address: {order.delivery_address}</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4 text-xs">
          <div className="flex justify-between border-b pb-3 font-bold text-slate-900 dark:text-slate-100">
            <span>Total Order Amount</span>
            <span className="text-emerald-700 font-extrabold">{formatINR(order.total)}</span>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold">Purchased Product Line Items</h4>
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
