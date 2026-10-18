'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CartStore } from '@/lib/cart/store';
import { AgroLoopStore } from '@/lib/db/store';
import { formatINR } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

export default function FarmerCheckoutPage() {
  const router = useRouter();
  const [deliveryAddr, setDeliveryAddr] = useState('Gat No. 142, Manor-Palghar Road, Palghar District, Maharashtra');
  const [notes, setNotes] = useState('Deliver near tractor shed');

  const farmer = AgroLoopStore.getCurrentUser('farmer');
  const items = CartStore.getItems();
  const total = CartStore.getTotal();

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    try {
      const order = AgroLoopStore.placeFarmerOrder(
        farmer.id,
        items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
        deliveryAddr
      );
      CartStore.clearCart();
      router.push(ROUTES.FARMER.ORDERS);
    } catch (err: any) {
      alert(err.message || 'Order failed');
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-2 shadow-xl">
        <Badge variant="amber" className="text-[10px] uppercase">Simulated Demo Checkout</Badge>
        <h2 className="text-2xl font-extrabold">Confirm Agricultural Input Order</h2>
        <p className="text-xs text-slate-300">Deliver directly to Palghar Cluster farm gate.</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4 text-xs">
          <form onSubmit={handleConfirmOrder} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Delivery Address</label>
              <textarea
                value={deliveryAddr}
                onChange={(e) => setDeliveryAddr(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-transparent text-xs"
                rows={2}
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Delivery Instructions</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-transparent text-xs"
              />
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Order Items ({items.length})</h4>
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>{item.product.name} ({item.quantity} {item.product.unit})</span>
                  <span className="font-bold">{formatINR(item.product.price * item.quantity)}</span>
                </div>
              ))}
              <div className="pt-2 border-t flex justify-between font-black text-sm text-emerald-700">
                <span>Total Demo Amount</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Confirm & Place Order <CheckCircle2 className="w-4 h-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
