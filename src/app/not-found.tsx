'use client';

import React from 'react';
import Link from 'next/link';
import { Sprout, ArrowLeft, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-earth-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-6 bg-white dark:bg-slate-900 border border-emerald-950/10 dark:border-emerald-500/20 p-8 rounded-3xl shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-300 mx-auto">
          <Sprout className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-amber-600">404 — Route Not Found</span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            Looks like this loop took a wrong turn 🌱
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            The requested page or circular node could not be found. Let&apos;s get you back on track to your active dashboard.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/dashboard/household" className="w-full sm:w-auto">
            <Button variant="primary" className="w-full">
              <Home className="w-4 h-4" /> Back to Dashboard
            </Button>
          </Link>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4" /> Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
