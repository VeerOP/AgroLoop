'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Trash2, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CartStore } from '@/lib/cart/store';
import { formatINR } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

export default function FarmerCartPage() {
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);
  const items = CartStore.getItems();
  const subtotal = CartStore.getSubtotal();
  const deliveryFee = CartStore.getDeliveryFee();
  const total = CartStore.getTotal();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link href={ROUTES.FARMER.DASHBOARD} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-emerald-600" /> Shopping Cart ({items.length})
        </h2>
      </div>

      {items.length === 0 ? (
        <Card className="p-12 text-center space-y-4">
          <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700">Your cart is currently empty</h3>
          <Link href={ROUTES.FARMER.DASHBOARD}>
            <Button variant="primary">Browse Organic Storefront</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-4 divide-y">
              {items.map((item) => (
                <div key={item.product.id} className="py-4 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.product.image_url} alt={item.product.name} className="w-14 h-14 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{item.product.name}</h4>
                      <span className="text-emerald-700 font-semibold">₹{item.product.price}/{item.product.unit}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        onClick={() => { CartStore.updateQuantity(item.product.id, item.quantity - 5); setRefreshKey((p) => p + 1); }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 font-bold">{item.quantity}</span>
                      <button
                        onClick={() => { CartStore.updateQuantity(item.product.id, item.quantity + 5); setRefreshKey((p) => p + 1); }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                      >
                        +
                      </button>
                    </div>
                    <button onClick={() => { CartStore.removeItem(item.product.id); setRefreshKey((p) => p + 1); }} className="text-rose-600 p-1 hover:bg-rose-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardContent className="p-6 space-y-4 text-xs">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
                <div className="flex justify-between text-slate-500">
                  <span>Farm Delivery Fee</span>
                  <span>{deliveryFee === 0 ? 'FREE (Orders > ₹2,000)' : formatINR(deliveryFee)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-extrabold text-sm text-emerald-700">
                  <span>Total Amount</span><span>{formatINR(total)}</span>
                </div>
              </div>
              <Link href={ROUTES.FARMER.CHECKOUT} className="block">
                <Button variant="primary" size="lg" className="w-full">Proceed to Demo Checkout <ArrowRight className="w-4 h-4" /></Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
