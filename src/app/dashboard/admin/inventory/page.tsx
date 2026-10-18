'use client';

import React from 'react';
import { Package } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';

export default function AdminInventoryPage() {
  const products = AgroLoopStore.getProducts();

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-800">
        <h2 className="text-2xl font-extrabold tracking-tight">Agricultural Input Inventory Manager</h2>
        <p className="text-xs text-slate-300 mt-1">Real-time finished product stock levels, reserved quantities, and order movements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((p) => (
          <Card key={p.id}>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="success" className="text-[10px]">{p.processing_method}</Badge>
                <span className="text-xs font-semibold text-slate-400">Min Order: {p.minimum_order_quantity} {p.unit}</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{p.name}</h4>
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                {p.stock_quantity} {p.unit}
              </div>
              <div className="text-xs text-slate-500 font-medium">Price: ₹{p.price}/{p.unit} (MRP ₹{p.mrp})</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
