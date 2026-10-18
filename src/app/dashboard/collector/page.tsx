'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Truck,
  MapPin,
  CheckCircle2,
  Scale,
  Navigation,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';
import { PickupRequest, ContaminationLevel } from '@/types';
import { ROUTES } from '@/lib/routes';

export default function CollectorDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [activePickupModal, setActivePickupModal] = useState<PickupRequest | null>(null);
  const [recordedKg, setRecordedKg] = useState('4.2');
  const [contamination, setContamination] = useState<ContaminationLevel>('none');
  const [notes, setNotes] = useState('');

  const pickups = AgroLoopStore.getPickups();
  const completedCount = pickups.filter((p) => p.status === 'completed').length;
  const remainingCount = pickups.filter((p) => p.status !== 'completed').length;
  const totalKgToday = pickups
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + (p.actual_weight_kg || p.estimated_weight_kg || 0), 0);

  const handleCompletePickup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePickupModal) return;

    AgroLoopStore.completeCollectorPickup(
      activePickupModal.id,
      parseFloat(recordedKg) || 4.2,
      contamination,
      notes
    );

    setActivePickupModal(null);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      {/* Route Overview Cards */}
      <div className="bg-slate-900 text-white p-5 rounded-3xl space-y-4 shadow-xl border border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-6 h-6 text-emerald-400" />
            <h2 className="font-bold text-lg">Today&apos;s Collection Route</h2>
          </div>
          <Badge variant="amber" className="text-[10px]">EV Loader MH-01-EV-4829</Badge>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
            <div className="text-2xl font-black text-emerald-400">{completedCount}</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Completed</div>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
            <div className="text-2xl font-black text-amber-400">{remainingCount}</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Remaining</div>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
            <div className="text-2xl font-black text-white">{totalKgToday.toFixed(1)} kg</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Scraps</div>
          </div>
        </div>
      </div>

      {/* Pickup List */}
      <div className="space-y-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-600" /> Active Pickups List ({pickups.length})
        </h3>

        {pickups.map((pickup) => (
          <Card key={pickup.id} className="hover:border-emerald-500/50">
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{pickup.customer_name}</span>
                  <Badge variant={pickup.customer_type === 'restaurant' ? 'amber' : 'default'} className="text-[10px]">
                    {pickup.customer_type}
                  </Badge>
                  <Badge variant={pickup.status === 'completed' ? 'success' : 'warning'} className="text-[10px]">
                    {pickup.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500">{pickup.customer_address}</p>
                <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-2">
                  <span>Slot: {pickup.time_window}</span>
                  <span>• Est: {pickup.estimated_weight_kg} kg</span>
                  {pickup.actual_weight_kg && <span className="font-bold text-emerald-800">Actual: {pickup.actual_weight_kg} kg</span>}
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                {pickup.status !== 'completed' ? (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => {
                      setActivePickupModal(pickup);
                      setRecordedKg(String(pickup.estimated_weight_kg));
                    }}
                  >
                    <Scale className="w-4 h-4" /> Record Weight
                  </Button>
                ) : (
                  <Link href={ROUTES.COLLECTOR.PICKUP_DETAIL(pickup.id)}>
                    <Button size="sm" variant="outline">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1" /> View Detail
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Record Weight Modal */}
      {activePickupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Record Pickup Weight</h3>
              <button onClick={() => setActivePickupModal(null)} className="text-slate-400 font-bold">✕</button>
            </div>

            <div className="text-xs space-y-1">
              <p className="font-bold text-slate-800 dark:text-slate-200">{activePickupModal.customer_name}</p>
              <p className="text-slate-500">{activePickupModal.customer_address}</p>
            </div>

            <form onSubmit={handleCompletePickup} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Actual Recorded Weight on Portable Scale (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={recordedKg}
                  onChange={(e) => setRecordedKg(e.target.value)}
                  className="w-full p-3 text-lg font-black text-emerald-700 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Contamination Inspection Level</label>
                <select
                  value={contamination}
                  onChange={(e: any) => setContamination(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="none">0% Contamination (Pure Organic)</option>
                  <option value="low">Low Contamination (&lt; 2% plastic)</option>
                  <option value="medium">Medium Contamination (&lt; 5% plastic)</option>
                  <option value="high">High Contamination (Rejected)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Collector Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Clean segregation, bin left near gate"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setActivePickupModal(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  <CheckCircle2 className="w-4 h-4" /> Save & Complete Pickup
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
