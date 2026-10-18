'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-earth-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-10 space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="amber" className="text-xs uppercase tracking-widest">Academic Entrepreneurship</Badge>
          <h1 className="text-3xl font-extrabold tracking-tight">About AgroLoop</h1>
          <p className="text-sm text-slate-500">Academic design experience prototype for circular bio-waste management in Mumbai, India.</p>
        </div>

        <Card className="p-8 space-y-4 leading-relaxed text-sm">
          <h3 className="font-bold text-lg text-emerald-950 dark:text-emerald-100">The Problem & Vision</h3>
          <p>
            Urban centers in India generate over 35,000 tonnes of organic kitchen waste daily. Unsegregated dumping in landfills causes severe anaerobic methane emissions, groundwater contamination, and odor pollution. Concurrently, smallholder farmers face severe soil organic carbon depletion and skyrocketing chemical fertilizer prices.
          </p>
          <p>
            AgroLoop bridges this urban-rural nutrient divide through a technology-enabled circular economy platform: collecting segregated kitchen waste, thermophilically bioprocessing it into high-value organic inputs, and providing AI-assisted agricultural advisory to farmers.
          </p>
        </Card>
      </main>
    </div>
  );
}
