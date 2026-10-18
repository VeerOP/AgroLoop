'use client';

import React from 'react';
import { Package, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function HouseholdSubscriptionPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-2 shadow-xl">
        <Badge variant="success" className="text-[10px] uppercase">Active Subscription</Badge>
        <h2 className="text-2xl font-extrabold">Weekly Green Household Plan</h2>
        <p className="text-xs text-slate-300">₹199 / month • Auto-renews on 1 March 2025</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4 text-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Plan Inclusions & Benefits</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Weekly doorstep kitchen scrap collection</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free AgroLoop airtight green bin provided</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> 10 Green Points earned per kg diverted</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Monthly household carbon footprint report</li>
          </ul>
          <div className="pt-4 border-t flex justify-end gap-2">
            <Button variant="outline" size="sm">Pause Subscription</Button>
            <Button variant="primary" size="sm">Manage Plan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
