'use client';

import React, { useState } from 'react';
import {
  Truck,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Scale,
  Sparkles,
  Building2,
  Download,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';
import { formatWeight, formatDate } from '@/lib/utils';

export default function SocietyPickupsPage() {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [requestDate, setRequestDate] = useState('2025-02-24');
  const [specialNote, setSpecialNote] = useState('Additional garden trimming waste (approx 40kg)');

  const societyPickups = AgroLoopStore.getPickups().filter((p) => p.customer_type === 'society');

  const handleRequestSpecialPickup = (e: React.FormEvent) => {
    e.preventDefault();
    AgroLoopStore.schedulePickup({
      customer_id: 'user-society-01',
      customer_name: 'Sea Breeze CHS (Ramesh Narang)',
      customer_address: 'Sea Breeze CHS, Chimbai Road, Bandra West',
      customer_type: 'society',
      scheduled_date: requestDate,
      time_window: '06:00 - 07:30 AM',
      estimated_weight_kg: 220,
      notes: specialNote,
    });
    alert('Special Society Bulk Waste Pickup Requested successfully!');
    setShowScheduleModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Daily Society Bulk Collection Manifest
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Automated daily 06:00 AM EV truck pickups & wing-wise weight receipts for Sea Breeze CHS
          </p>
        </div>
        <Button onClick={() => setShowScheduleModal(true)} variant="primary" size="md">
          <Plus className="w-4 h-4 mr-1.5" /> Book Special / Extra Bulk Pickup
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card>
          <CardContent className="p-5 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Contract Frequency</span>
            <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Daily Morning (7 Days/Wk)</div>
            <p className="text-xs text-emerald-600 font-semibold">Fixed Slot: 06:00 – 07:30 AM</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Assigned Logistics Crew</span>
            <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Suresh Gaikwad</div>
            <p className="text-xs text-slate-500">Dadar Depot 3 • EV Compactor #14</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Designated Bin Station</span>
            <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Gate 2 Central Enclosure</div>
            <p className="text-xs text-slate-500">4x 240L Color-Coded Green Bins</p>
          </CardContent>
        </Card>
      </div>

      {/* Pickup History Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-600" /> Collection Logs & Weight Slips
          </CardTitle>
          <Badge variant="outline" className="text-xs">{societyPickups.length} Records</Badge>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 bg-earth-50/50 dark:bg-slate-800/30">
                  <th className="py-3 px-3">Date & Slot</th>
                  <th className="py-3 px-3">Collector</th>
                  <th className="py-3 px-3">Gross Weight</th>
                  <th className="py-3 px-3">Purity / Quality</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Remarks / Wing Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {societyPickups.map((p) => (
                  <tr key={p.id} className="hover:bg-earth-50/40 dark:hover:bg-slate-800/20">
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{formatDate(p.scheduled_date)}</div>
                      <div className="text-[11px] text-slate-400">{p.time_window}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-medium text-slate-900 dark:text-slate-100">{p.collector_name || 'Suresh Gaikwad'}</div>
                      <div className="text-[10px] text-slate-400">AgroLoop EV Compactor #14</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {p.actual_weight_kg ? `${p.actual_weight_kg} kg` : `~${p.estimated_weight_kg} kg (est)`}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      {p.contamination_level === 'none' ? (
                        <Badge variant="success" className="text-[10px]">Zero Contamination</Badge>
                      ) : (
                        <Badge variant="info" className="text-[10px]">Verified Pure Wet Scrap</Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      <Badge variant={p.status === 'completed' ? 'success' : 'amber'} className="text-[10px]">
                        {p.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 max-w-xs truncate">
                      {p.notes || 'Routine daily bulk compactor pickup.'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Special Pickup Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-2xl p-6 space-y-4 shadow-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600" /> Book Extra Bulk Collection
              </h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRequestSpecialPickup} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Collection Date
                </label>
                <input
                  type="date"
                  value={requestDate}
                  onChange={(e) => setRequestDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Special Remarks / Extra Waste Type
                </label>
                <textarea
                  rows={3}
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  placeholder="e.g., Post-society festival wet waste or society garden tree prunings..."
                />
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-900 dark:text-emerald-200">
                Included as part of your CHS bulk subscription SLA. No additional vehicle surcharge applies.
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit" className="flex-1 py-2.5">
                  Confirm Schedule
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
