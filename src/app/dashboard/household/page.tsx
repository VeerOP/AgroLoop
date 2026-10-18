'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Leaf,
  Award,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';
import { formatWeight, formatDate } from '@/lib/utils';
import { calculateWasteImpact } from '@/lib/impact/calculator';
import { ROUTES } from '@/lib/routes';

export default function HouseholdDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [estKg, setEstKg] = useState('4.2');
  const [schedDate, setSchedDate] = useState('2025-02-24');
  const [timeWindow, setTimeWindow] = useState('08:30 - 10:00 AM');

  const user = AgroLoopStore.getCurrentUser('household');
  const pickups = AgroLoopStore.getPickups().filter((p) => p.customer_id === user.id || p.customer_type === 'household');
  const rewardPoints = AgroLoopStore.getRewardPoints(user.id);

  const completedPickups = pickups.filter((p) => p.status === 'completed');
  const totalDivertedKg = completedPickups.reduce((sum, p) => sum + (p.actual_weight_kg || p.estimated_weight_kg || 0), 0);
  const { co2eKg } = calculateWasteImpact(totalDivertedKg);

  const nextPickup = pickups.find((p) => p.status === 'scheduled' || p.status === 'assigned' || p.status === 'on_the_way');

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    AgroLoopStore.schedulePickup({
      customer_id: user.id,
      customer_name: user.full_name,
      customer_address: user.address,
      customer_type: 'household',
      scheduled_date: schedDate,
      time_window: timeWindow,
      estimated_weight_kg: parseFloat(estKg) || 4.0,
      notes: 'Scheduled via Household Portal',
    });

    setShowScheduleModal(false);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="amber" className="text-[10px] uppercase">Active Household Plan</Badge>
            <span className="text-xs text-emerald-300">B-402, Sea Green, Bandra West</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Good morning, Priya 👋</h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
            You have diverted <strong className="text-amber-300 font-bold">{formatWeight(totalDivertedKg)}</strong> of kitchen waste from Mumbai landfills so far!
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => setShowScheduleModal(true)} variant="amber" size="md">
            <Plus className="w-4 h-4" /> Schedule Waste Pickup
          </Button>
          <Link href={ROUTES.HOUSEHOLD.IMPACT}>
            <Button variant="outline" size="md" className="border-emerald-700 text-white hover:bg-emerald-800">
              View Impact Details
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="hover:border-emerald-500/50">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Next Scheduled Pickup</span>
              <Calendar className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {nextPickup ? formatDate(nextPickup.scheduled_date) : 'No Pickup Booked'}
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
              {nextPickup ? `${nextPickup.time_window} • ${nextPickup.estimated_weight_kg} kg est.` : 'Schedule your weekly bin'}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-emerald-500/50">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Waste Diverted</span>
              <Leaf className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100">{formatWeight(totalDivertedKg)}</div>
            <p className="text-xs text-slate-500 font-medium">From Mumbai landfills</p>
          </CardContent>
        </Card>

        <Card className="hover:border-emerald-500/50">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">CO₂e Emissions Avoided</span>
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-amber-600">{co2eKg} kg</div>
            <p className="text-xs text-slate-500 font-medium">Methane decomposition offset</p>
          </CardContent>
        </Card>

        <Card className="hover:border-emerald-500/50">
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Green Reward Points</span>
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-purple-700 dark:text-purple-400">{rewardPoints} pts</div>
            <p className="text-xs text-purple-600 dark:text-purple-300 font-semibold">Redeemable for vermicompost</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Stage Tracker */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" /> Active Pickup Lifecycle Stage
            </CardTitle>
            <Badge variant="success">Live System State</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            {[
              { stage: '1. Scheduled', done: true, desc: 'Slot booked' },
              { stage: '2. Collector Assigned', done: true, desc: 'Suresh (MH-01-EV-4829)' },
              { stage: '3. On the Way', done: nextPickup?.status === 'on_the_way' || nextPickup?.status === 'completed', desc: 'En route' },
              { stage: '4. Collected', done: nextPickup?.status === 'completed', desc: 'Weight recorded' },
              { stage: '5. Bio-Processed', done: nextPickup?.status === 'completed', desc: 'Vermi-batch VB-042' },
            ].map((step, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border text-left space-y-1 ${
                  step.done
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{step.stage}</span>
                  {step.done && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </div>
                <p className="text-[11px] text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Collection Log */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Recent Household Collection Log</CardTitle>
          <Link href={ROUTES.HOUSEHOLD.PICKUPS}>
            <Button variant="ghost" size="sm">View All Pickups <ArrowRight className="w-3.5 h-3.5" /></Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-y border-slate-100 dark:border-slate-800">
              <tr>
                <th className="p-3.5 font-bold">Scheduled Date</th>
                <th className="p-3.5 font-bold">Time Window</th>
                <th className="p-3.5 font-bold">Est. Weight</th>
                <th className="p-3.5 font-bold">Actual Diverted</th>
                <th className="p-3.5 font-bold">Collector</th>
                <th className="p-3.5 font-bold">Status</th>
                <th className="p-3.5 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {pickups.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                  <td className="p-3.5 font-semibold">{formatDate(p.scheduled_date)}</td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-400">{p.time_window}</td>
                  <td className="p-3.5 font-medium">{p.estimated_weight_kg} kg</td>
                  <td className="p-3.5 font-bold text-emerald-700 dark:text-emerald-400">
                    {p.actual_weight_kg ? `${p.actual_weight_kg} kg` : '—'}
                  </td>
                  <td className="p-3.5">{p.collector_name || 'Assigned Loader'}</td>
                  <td className="p-3.5">
                    <Badge variant={p.status === 'completed' ? 'success' : 'warning'}>{p.status}</Badge>
                  </td>
                  <td className="p-3.5">
                    <Link href={ROUTES.HOUSEHOLD.PICKUP_DETAIL(p.id)}>
                      <Button size="sm" variant="outline">View</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Schedule Household Waste Pickup</h3>

            <form onSubmit={handleScheduleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Pickup Date</label>
                <input
                  type="date"
                  value={schedDate}
                  onChange={(e) => setSchedDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Preferred Time Window</label>
                <select
                  value={timeWindow}
                  onChange={(e) => setTimeWindow(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="08:30 - 10:00 AM">08:30 - 10:00 AM (Morning)</option>
                  <option value="11:00 - 12:30 PM">11:00 - 12:30 PM (Mid-day)</option>
                  <option value="04:00 - 05:30 PM">04:00 - 05:30 PM (Evening)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Estimated Organic Waste (kg)</label>
                <input
                  type="number"
                  step="0.5"
                  value={estKg}
                  onChange={(e) => setEstKg(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setShowScheduleModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Confirm Pickup Booking
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
