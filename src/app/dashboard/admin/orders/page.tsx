'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';
import { formatINR } from '@/lib/utils';
import { OrderStatus } from '@/types';
import { ROUTES } from '@/lib/routes';

export default function AdminOrdersMasterPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const orders = AgroLoopStore.getOrders();

  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    AgroLoopStore.updateOrderStatus(orderId, status);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-800">
        <h2 className="text-2xl font-extrabold tracking-tight">Farmer Input Orders Fulfillment Master</h2>
        <p className="text-xs text-slate-300 mt-1">Manage order status transitions from placed to delivered across cluster farms.</p>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-y">
              <tr>
                <th className="p-3.5 font-bold">Order ID</th>
                <th className="p-3.5 font-bold">Farmer Name</th>
                <th className="p-3.5 font-bold">Delivery Address</th>
                <th className="p-3.5 font-bold">Total Amount</th>
                <th className="p-3.5 font-bold">Status</th>
                <th className="p-3.5 font-bold">Update Status</th>
                <th className="p-3.5 font-bold">Detail View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-mono text-emerald-700 font-bold">#{o.id.slice(-6)}</td>
                  <td className="p-3.5 font-semibold">{o.farmer_name || 'Ramkisan Patil'}</td>
                  <td className="p-3.5 text-slate-500 max-w-xs truncate">{o.delivery_address}</td>
                  <td className="p-3.5 font-black text-slate-900 dark:text-slate-100">{formatINR(o.total)}</td>
                  <td className="p-3.5"><Badge variant={o.status === 'delivered' ? 'success' : 'amber'}>{o.status}</Badge></td>
                  <td className="p-3.5">
                    <select
                      value={o.status}
                      onChange={(e: any) => handleUpdateStatus(o.id, e.target.value)}
                      className="p-1.5 rounded-lg border text-xs bg-transparent font-medium"
                    >
                      <option value="placed">placed</option>
                      <option value="confirmed">confirmed</option>
                      <option value="processing">processing</option>
                      <option value="packed">packed</option>
                      <option value="out_for_delivery">out_for_delivery</option>
                      <option value="delivered">delivered</option>
                    </select>
                  </td>
                  <td className="p-3.5">
                    <Link href={ROUTES.ADMIN.ORDER_DETAIL(o.id)}>
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
