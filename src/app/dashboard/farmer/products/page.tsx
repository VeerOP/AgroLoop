'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';
import { CartStore } from '@/lib/cart/store';
import { Product } from '@/types';
import { ROUTES } from '@/lib/routes';

export default function FarmerProductsStorefrontPage() {
  const [addedMsg, setAddedMsg] = useState<string | null>(null);
  const products = AgroLoopStore.getProducts();

  const handleAddToCart = (product: Product) => {
    CartStore.addItem(product, product.minimum_order_quantity || 10);
    setAddedMsg(`Added ${product.minimum_order_quantity || 10} ${product.unit} of ${product.name} to cart!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">AgroLoop Organic Inputs Storefront</h2>
          <p className="text-xs text-slate-300 mt-1">Direct doorstep delivery to Palghar & Shahapur agricultural clusters.</p>
        </div>
        <Link href={ROUTES.FARMER.CART}>
          <Button variant="amber">
            <ShoppingCart className="w-4 h-4" /> View Cart ({CartStore.getItems().length})
          </Button>
        </Link>
      </div>

      {addedMsg && (
        <div className="p-4 bg-emerald-100 border border-emerald-400 text-emerald-900 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            <span>{addedMsg}</span>
          </div>
          <button onClick={() => setAddedMsg(null)} className="text-emerald-700 font-bold">✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <Card key={p.id} className="hover:border-emerald-500/50 flex flex-col justify-between">
            <CardContent className="p-5 space-y-3">
              <Link href={ROUTES.FARMER.PRODUCT_DETAIL(p.id)}>
                <img src={p.image_url} alt={p.name} className="w-full h-40 object-cover rounded-xl hover:scale-105 transition-transform" />
              </Link>
              <Badge variant="success" className="text-[10px]">{p.processing_method}</Badge>
              <Link href={ROUTES.FARMER.PRODUCT_DETAIL(p.id)}>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-emerald-600 line-clamp-1">{p.name}</h4>
              </Link>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{p.description}</p>
              <div className="pt-2 flex items-baseline justify-between">
                <span className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400">₹{p.price}/{p.unit}</span>
                <Button size="sm" onClick={() => handleAddToCart(p)} variant="primary">Add to Cart</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
