'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SEED_PRODUCTS } from '@/lib/seed-data';

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-earth-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="amber" className="text-xs uppercase tracking-widest">Bio-Inputs Catalogue</Badge>
          <h1 className="text-3xl font-extrabold tracking-tight">AgroLoop Agricultural Products</h1>
          <p className="text-xs sm:text-sm text-slate-500">Processed from segregated organic kitchen scraps in Mahape, Navi Mumbai.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SEED_PRODUCTS.map((p) => (
            <Card key={p.id} className="hover:border-emerald-500/50 flex flex-col justify-between">
              <CardContent className="p-5 space-y-3">
                <img src={p.image_url} alt={p.name} className="w-full h-44 object-cover rounded-xl" />
                <Badge variant="success" className="text-[10px]">{p.processing_method}</Badge>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">{p.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{p.description}</p>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">Application Method:</span>
                  <p className="text-slate-600 dark:text-slate-300">{p.application_guidance}</p>
                </div>
                <div className="pt-2 flex items-baseline justify-between">
                  <span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">₹{p.price}/{p.unit}</span>
                  <Link href="/login">
                    <Button size="sm">Order Demo</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
