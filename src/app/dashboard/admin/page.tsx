'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Truck,
  Sprout,
  Package,
  Users,
  Layers,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';
import { formatWeight, formatCompactINR } from '@/lib/utils';
import { WasteCollectionChart, WasteSourcePieChart, ProductOutputBarChart } from '@/components/charts/ImpactCharts';
import { ROUTES } from '@/lib/routes';

export default function AdminCommandCenter() {
  const [timeFilter, setTimeFilter] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');

  const impact = AgroLoopStore.getCalculatedImpact();
  const pickups = AgroLoopStore.getPickups();
  const batches = AgroLoopStore.getBatches();
  const products = AgroLoopStore.getProducts();
  const orders = AgroLoopStore.getOrders();

  const totalStockKg = products.reduce((sum, p) => sum + p.stock_quantity, 0);
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 148000;

  return (
    <div className="space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="amber" className="text-[10px] uppercase">Central Operations</Badge>
            <span className="text-xs text-slate-300">Mahape Processing Facility</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight mt-1">Mumbai Operations Executive Summary</h2>
        </div>

        <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs font-semibold self-start sm:self-auto">
          {(['7D', '30D', '90D', '1Y'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeFilter(period)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                timeFilter === period ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time System Operational Alerts Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="text-amber-900 dark:text-amber-200 font-semibold">1 Batch (LF-031) awaiting quality inspection</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-xs flex items-center gap-2">
          <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-emerald-900 dark:text-emerald-200 font-semibold">Dadar EV loader route 80% complete</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/40 text-xs flex items-center gap-2">
          <Package className="w-4 h-4 text-sky-600 shrink-0" />
          <span className="text-sky-900 dark:text-sky-200 font-semibold">1,420 kg Vermicompost stock ready for dispatch</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="hover:border-emerald-500/50">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Waste Collected</span>
              <Truck className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {formatWeight(impact.totalWasteDivertedKg + 12600)}
            </div>
            <p className="text-xs text-emerald-600 font-semibold">+18.4% vs last month</p>
          </CardContent>
        </Card>

        <Card className="hover:border-emerald-500/50">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Products in Stock</span>
              <Package className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-amber-700 dark:text-amber-400">
              {formatWeight(totalStockKg)}
            </div>
            <p className="text-xs text-slate-500 font-medium">Across 4 core product types</p>
          </CardContent>
        </Card>

        <Card className="hover:border-emerald-500/50">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Farmers Served</span>
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-purple-700 dark:text-purple-400">18 Cluster Farmers</div>
            <p className="text-xs text-slate-500 font-medium">Palghar & Shahapur clusters</p>
          </CardContent>
        </Card>

        <Card className="hover:border-emerald-500/50">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Gross Revenue</span>
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
              {formatCompactINR(totalRevenue)}
            </div>
            <p className="text-xs text-slate-500 font-medium">B2B contracts + product sales</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Navigation Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <Link href={ROUTES.ADMIN.CIRCULAR_FLOW}>
          <Button variant="primary" size="md">
            <Layers className="w-4 h-4" /> Open Live Circular Flow View
          </Button>
        </Link>
        <Link href={ROUTES.ADMIN.PROCESSING}>
          <Button variant="outline" size="md">
            <Sprout className="w-4 h-4" /> Manage Batch Processing ({batches.length})
          </Button>
        </Link>
        <Link href={ROUTES.ADMIN.SETTINGS}>
          <Button variant="ghost" size="md">
            System Settings & Reset Demo Data
          </Button>
        </Link>
      </div>

      {/* Recharts Data Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Waste Diversion Trends (kg)</CardTitle>
              <Badge variant="outline">Monthly Cumulative</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <WasteCollectionChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Organic Waste Sources</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <WasteSourcePieChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Product Production vs Farmer Demand (kg)</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <ProductOutputBarChart />
        </CardContent>
      </Card>
    </div>
  );
}
