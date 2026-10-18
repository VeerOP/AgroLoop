'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { CircularFlow } from '@/components/circular/CircularFlow';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-earth-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="amber" className="text-xs uppercase tracking-widest">Architectural Flow</Badge>
          <h1 className="text-3xl font-extrabold tracking-tight">How AgroLoop Works</h1>
          <p className="text-xs sm:text-sm text-slate-500">The 4-stage circular supply chain converting urban food scraps into fertile soil inputs.</p>
        </div>

        <CircularFlow />
      </main>
    </div>
  );
}
