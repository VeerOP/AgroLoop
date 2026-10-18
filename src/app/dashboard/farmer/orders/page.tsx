'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';
import { formatDate, formatINR } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

export default function FarmerOrdersPage() {
  const farmer = AgroLoopStore.getCurrentUser('farmer');
  const orders = AgroLoopStore.getOrders().filter((o) => o.farmer_id === farmer.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">My Organic Input Orders History</h2>
          <p className="text-xs text-slate-300 mt-1">Track doorstep delivery status for ordered vermicompost & bio-fertilisers.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-y border-slate-100 dark:border-slate-800">
              <tr>
                <th className="p-3.5 font-bold">Order ID</th>
                <th className="p-3.5 font-bold">Order Date</th>
                <th className="p-3.5 font-bold">Delivery Address</th>
                <th className="p-3.5 font-bold">Total</th>
                <th className="p-3.5 font-bold">Status</th>
                <th className="p-3.5 font-bold">Detail View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                  <td className="p-3.5 font-mono text-emerald-700 font-bold">#{o.id.slice(-6)}</td>
                  <td className="p-3.5 font-semibold">{formatDate(o.created_at)}</td>
                  <td className="p-3.5 text-slate-500 max-w-xs truncate">{o.delivery_address}</td>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100">{formatINR(o.total)}</td>
                  <td className="p-3.5"><Badge variant={o.status === 'delivered' ? 'success' : 'amber'}>{o.status}</Badge></td>
                  <td className="p-3.5">
                    <Link href={ROUTES.FARMER.ORDER_DETAIL(o.id)}>
                      <Button size="sm" variant="outline">View Status</Button>
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
