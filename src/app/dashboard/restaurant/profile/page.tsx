'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AgroLoopStore } from '@/lib/db/store';

export default function RestaurantProfilePage() {
  const user = AgroLoopStore.getCurrentUser('restaurant');

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-1 shadow-xl">
        <h2 className="text-2xl font-extrabold">Spice Garden Bistro</h2>
        <p className="text-xs text-slate-300">Commercial Partner • Linking Road, Bandra West, Mumbai</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Owner / Contact</span>
              <span className="font-semibold">{user.full_name}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Email Address</span>
              <span className="font-semibold">{user.email}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Phone</span>
              <span className="font-semibold">{user.phone}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Business Type</span>
              <span className="font-semibold">Commercial Restaurant (Fine Dining)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
