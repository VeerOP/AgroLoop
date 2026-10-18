'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';
import { CartStore } from '@/lib/cart/store';
import { ROUTES } from '@/lib/routes';

export default function FarmerProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = AgroLoopStore.getProductById(id);
  const [qty, setQty] = useState(product?.minimum_order_quantity || 10);
  const [addedMsg, setAddedMsg] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="p-8 text-center space-y-4">
        <h3 className="text-lg font-bold">Product Not Found</h3>
        <Link href={ROUTES.FARMER.PRODUCTS}><Button variant="primary">Return to Storefront</Button></Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    CartStore.addItem(product, qty);
    setAddedMsg(`Added ${qty} ${product.unit} to cart!`);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <Link href={ROUTES.FARMER.PRODUCTS} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" /> Back to Organic Storefront
      </Link>

      {addedMsg && (
        <div className="p-4 bg-emerald-100 border border-emerald-400 text-emerald-900 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            <span>{addedMsg}</span>
          </div>
          <Link href={ROUTES.FARMER.CART}>
            <Button size="sm" variant="amber">Go to Cart</Button>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={product.image_url} alt={product.name} className="w-full h-80 object-cover rounded-3xl shadow-xl" />

        <div className="space-y-4">
          <Badge variant="success">{product.processing_method}</Badge>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">{product.name}</h1>
          <p className="text-xs text-slate-500 leading-relaxed">{product.description}</p>

          <div className="text-3xl font-black text-emerald-700">
            ₹{product.price} <span className="text-sm font-semibold text-slate-400">/{product.unit}</span>
            <span className="text-xs text-slate-400 line-through ml-2">₹{product.mrp}</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-1 text-xs">
            <strong className="font-bold text-slate-900 dark:text-slate-100">Application Guidance:</strong>
            <p className="text-slate-600 dark:text-slate-300">{product.application_guidance}</p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="number"
              min={product.minimum_order_quantity}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-24 p-2.5 rounded-xl border text-sm font-bold text-center"
            />
            <Button onClick={handleAddToCart} variant="primary" size="lg" className="flex-1">
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
