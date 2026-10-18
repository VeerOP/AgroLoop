'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sprout } from 'lucide-react';

export default function FarmerFarmProfilePage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-2 shadow-xl">
        <Badge variant="amber" className="text-[10px] uppercase font-bold">Palghar Cluster Farm</Badge>
        <h2 className="text-2xl font-extrabold">Ramkisan Patil Soil & Crop Profile</h2>
        <p className="text-xs text-slate-300">Gat No. 142, Manor-Palghar Road, Palghar District, Maharashtra</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Farm Size</span>
              <span className="font-semibold text-sm">1.8 Acres</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Soil Classification</span>
              <span className="font-semibold text-sm">Black Cotton Soil (Regur)</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Active Crops</span>
              <span className="font-semibold">Onion (Kharif) + Tomato (Rabi)</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">FPO Affiliation</span>
              <span className="font-semibold">Sahyadri Farmers Producer Co.</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
