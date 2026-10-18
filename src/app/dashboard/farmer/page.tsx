'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sprout,
  ShoppingBag,
  Bot,
  Package,
  Plus,
  ArrowRight,
  CheckCircle2,
  ShoppingCart,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';
import { CartStore } from '@/lib/cart/store';
import { formatINR, formatDate } from '@/lib/utils';
import { Product } from '@/types';
import { ROUTES } from '@/lib/routes';

export default function FarmerDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [addedMsg, setAddedMsg] = useState<string | null>(null);

  const farmer = AgroLoopStore.getCurrentUser('farmer');
  const products = AgroLoopStore.getProducts();
  const orders = AgroLoopStore.getOrders().filter((o) => o.farmer_id === farmer.id);

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const estimatedSavings = Math.round(totalSpent * 1.45 + 18200);

  const handleAddToCart = (product: Product) => {
    CartStore.addItem(product, product.minimum_order_quantity || 10);
    setAddedMsg(`Added ${product.minimum_order_quantity || 10} ${product.unit} of ${product.name} to cart!`);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="amber" className="text-[10px] uppercase">Verified Farmer</Badge>
            <span className="text-xs text-emerald-300">Palghar Cluster • 1.8 Acres (Onion + Tomato)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Good morning, Ramkisan 👋</h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
            By switching to AgroLoop organic inputs, your estimated chemical fertilizer expenditure savings stand at <strong className="text-amber-300 font-bold">{formatINR(estimatedSavings)}</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href={ROUTES.FARMER.CART}>
            <Button variant="amber" size="md">
              <ShoppingCart className="w-4 h-4" /> View Cart ({CartStore.getItems().length})
            </Button>
          </Link>
          <Link href={ROUTES.FARMER.ADVISOR}>
            <Button variant="outline" size="md" className="border-emerald-700 text-white hover:bg-emerald-800">
              <Bot className="w-4 h-4" /> Ask AI Agronomist
            </Button>
          </Link>
        </div>
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <CardContent className="p-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Farm Footprint</span>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100">1.8 Acres</div>
            <p className="text-xs text-slate-500">Soil: Black Cotton Soil</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Input Savings YTD</span>
            <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">{formatINR(estimatedSavings)}</div>
            <p className="text-xs text-emerald-600 font-semibold">Reduced chemical NPK expense</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Recommended Input</span>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">Vermicompost + Biochar</div>
            <p className="text-xs text-amber-600 font-medium">Ideal for Tomato flowering stage</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">AI Agronomist Status</span>
            <div className="text-lg font-bold text-emerald-600 flex items-center gap-1.5">
              <Bot className="w-5 h-5 text-emerald-600" /> Ready 24/7
            </div>
            <p className="text-xs text-slate-500">Gemini & Rules Engine Active</p>
          </CardContent>
        </Card>
      </div>

      {/* Product Catalog Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">AgroLoop Organic Inputs Storefront</h3>
          <Badge variant="default" className="text-xs">Doorstep Palghar Delivery</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <Card key={product.id} className="hover:border-emerald-500/50 flex flex-col justify-between">
              <CardContent className="p-5 space-y-3">
                <Link href={ROUTES.FARMER.PRODUCT_DETAIL(product.id)}>
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                </Link>
                <div className="flex items-center justify-between">
                  <Badge variant="success" className="text-[10px]">{product.processing_method}</Badge>
                  <span className="text-xs font-semibold text-slate-400">Stock: {product.stock_quantity} {product.unit}</span>
                </div>
                <Link href={ROUTES.FARMER.PRODUCT_DETAIL(product.id)}>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-1 hover:text-emerald-600">{product.name}</h4>
                </Link>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{product.description}</p>
                <div className="pt-2 flex items-baseline justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400">₹{product.price}</span>
                    <span className="text-xs text-slate-400 line-through ml-1.5">₹{product.mrp}</span>
                    <span className="text-[10px] text-slate-500">/{product.unit}</span>
                  </div>
                  <Button size="sm" onClick={() => handleAddToCart(product)} variant="primary">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
