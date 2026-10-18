'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { RoleHeader } from '@/components/layout/RoleHeader';

export default function HouseholdDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-earth-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Sidebar role="household" userName="Priya Sharma" />
      <div className="flex-1 flex flex-col min-w-0">
        <RoleHeader role="household" title="Household Sustainability Portal" subtitle="Bandra West, Mumbai • Green Plan" />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
