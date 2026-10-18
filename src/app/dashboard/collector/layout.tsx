'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { RoleHeader } from '@/components/layout/RoleHeader';

export default function CollectorDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-earth-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Sidebar role="collector" userName="Suresh Gaikwad" />
      <div className="flex-1 flex flex-col min-w-0">
        <RoleHeader role="collector" title="Mobile Waste Logistics Loader" subtitle="Dadar Depot • EV Loader MH-01-EV-4829" />
        <main className="flex-1 p-4 md:p-6 max-w-4xl w-full mx-auto space-y-5">
          {children}
        </main>
      </div>
    </div>
  );
}
