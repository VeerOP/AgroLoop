'use client';

import React, { useState } from 'react';
import { Settings, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';

export default function AdminSettingsPage() {
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset demo data back to original seed values?')) {
      AgroLoopStore.resetDemoData();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 4000);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-2 border border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-400" />
            <h2 className="text-2xl font-extrabold tracking-tight">System Settings & Controls</h2>
          </div>
          <Badge variant="amber" className="text-[10px] uppercase">Demo Store Config</Badge>
        </div>
        <p className="text-xs text-slate-300">Manage impact parameters, environment toggles, and stateful demo data reset.</p>
      </div>

      {resetSuccess && (
        <div className="p-4 bg-emerald-100 border border-emerald-400 text-emerald-900 rounded-2xl flex items-center gap-2 font-semibold text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          <span>Demo store reset back to original seed records!</span>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-emerald-600" /> Stateful Demo Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-xs">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            AgroLoop maintains real-time state persistence across user actions (pickup scheduling, collector weight recording, batch maturation, and farmer order placement). Click below to restore original seed state.
          </p>

          <Button onClick={handleResetData} variant="danger" size="md">
            <RefreshCw className="w-4 h-4" /> Reset Demo Data to Default
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
