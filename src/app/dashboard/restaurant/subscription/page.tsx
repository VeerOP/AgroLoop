'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

export default function RestaurantSubscriptionPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-2 shadow-xl">
        <Badge variant="success" className="text-[10px] uppercase">Active B2B Plan</Badge>
        <h2 className="text-2xl font-extrabold">Commercial Daily Pro Plan</h2>
        <p className="text-xs text-slate-300">₹1,499 / month • Next Billing: 1 March 2025</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4 text-xs">
          <h3 className="font-bold text-sm">Contract Benefits</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Daily commercial kitchen scrap pickup (up to 75 kg/day)</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Heavy-duty sealed bins with odor-trap technology</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Automated BMC compliance audit certification</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
