'use client';

import React from 'react';
import { Award, Gift, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';

export default function HouseholdRewardsPage() {
  const user = AgroLoopStore.getCurrentUser('household');
  const points = AgroLoopStore.getRewardPoints(user.id);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-gradient-to-r from-purple-900 to-slate-900 text-white p-6 rounded-3xl shadow-xl flex items-center justify-between">
        <div>
          <Badge variant="amber" className="text-[10px] uppercase">Green Rewards</Badge>
          <h2 className="text-2xl font-black mt-1">Sustainability Points</h2>
          <p className="text-xs text-purple-200">Earn 10 points for every 1 kg organic waste collected.</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-amber-300">{points} PTS</div>
          <span className="text-[10px] text-slate-300 font-semibold">Available Balance</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-5 space-y-3">
            <Gift className="w-8 h-8 text-emerald-600" />
            <h3 className="font-bold text-sm">5 kg Vermicompost Bag Voucher</h3>
            <p className="text-xs text-slate-500">Redeem 300 points for a free bag of AgroLoop Organic Vermicompost for your home garden.</p>
            <Button size="sm" variant="primary" disabled={points < 300}>
              {points >= 300 ? 'Redeem Voucher' : 'Need 300 Points'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-3">
            <Gift className="w-8 h-8 text-amber-600" />
            <h3 className="font-bold text-sm">₹100 Subscription Discount</h3>
            <p className="text-xs text-slate-500">Redeem 500 points for ₹100 off your next monthly household pickup plan.</p>
            <Button size="sm" variant="amber" disabled={points < 500}>
              {points >= 500 ? 'Redeem Voucher' : 'Need 500 Points'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
