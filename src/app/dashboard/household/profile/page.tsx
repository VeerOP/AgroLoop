'use client';

import React from 'react';
import { User, MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AgroLoopStore } from '@/lib/db/store';

export default function HouseholdProfilePage() {
  const user = AgroLoopStore.getCurrentUser('household');

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-1 shadow-xl">
        <h2 className="text-2xl font-extrabold">{user.full_name}</h2>
        <p className="text-xs text-slate-300">Urban Household Partner • {user.city}</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4 text-xs">
          <div className="space-y-3">
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Full Name</span>
              <span className="font-semibold text-sm">{user.full_name}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Email Address</span>
              <span className="font-semibold">{user.email}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Phone Number</span>
              <span className="font-semibold">{user.phone}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Pickup Address</span>
              <span className="font-semibold">{user.address}</span>
            </div>
          </div>
          <div className="pt-4 border-t flex justify-end">
            <Button variant="primary" size="sm" onClick={() => alert('Profile updated in demo mode!')}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
