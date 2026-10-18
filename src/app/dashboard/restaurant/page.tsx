'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Utensils,
  Award,
  FileCheck,
  Download,
  Calendar,
  Building2,
  CheckCircle2,
  AlertCircle,
  Plus,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';
import { formatWeight, formatDate } from '@/lib/utils';
import { calculateWasteImpact } from '@/lib/impact/calculator';
import { ROUTES } from '@/lib/routes';

export default function RestaurantDashboard() {
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const user = AgroLoopStore.getCurrentUser('restaurant');
  const pickups = AgroLoopStore.getPickups().filter((p) => p.customer_type === 'restaurant');

  const completedPickups = pickups.filter((p) => p.status === 'completed');
  const monthlyDivertedKg = completedPickups.reduce((sum, p) => sum + (p.actual_weight_kg || p.estimated_weight_kg || 0), 0) + 1230;
  const { co2eKg } = calculateWasteImpact(monthlyDivertedKg);

  return (
    <div className="space-y-8">
      {/* Top Header Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl border border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="success" className="text-[10px] uppercase">Compliance Certified</Badge>
            <span className="text-xs text-slate-300">Spice Garden Bistro • Bandra West</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Zero Food Waste Commercial Dashboard</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Diverted <strong className="text-emerald-400 font-bold">{formatWeight(monthlyDivertedKg)}</strong> of kitchen prep scraps in February 2025.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => setShowCertificateModal(true)} variant="primary" size="md">
            <Download className="w-4 h-4" /> Download ESG Certificate
          </Button>
          <Link href={ROUTES.RESTAURANT.COMPLIANCE}>
            <Button variant="outline" size="md" className="border-slate-700 text-white hover:bg-slate-800">
              View BMC Compliance
            </Button>
          </Link>
        </div>
      </div>

      {/* Commercial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <CardContent className="p-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Today&apos;s Collection</span>
            <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">52.4 kg</div>
            <p className="text-xs text-slate-500">Collected at 08:12 AM by Suresh</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Monthly Waste Diverted</span>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100">{formatWeight(monthlyDivertedKg)}</div>
            <p className="text-xs text-slate-500">100% diverted from land disposal</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Municipal Compliance</span>
            <div className="text-lg font-bold text-emerald-600 flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Fully Compliant
            </div>
            <p className="text-xs text-slate-500">BMC Bulk Waste Generator Norms</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Commercial Plan</span>
            <div className="text-xl font-bold text-slate-900 dark:text-slate-100">Daily Pro (₹1,499/mo)</div>
            <p className="text-xs text-emerald-600 font-semibold">Active • Next bill: 1 Mar 2025</p>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Log & Pickups Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Daily Commercial Scraps Pickup Log</CardTitle>
          <Link href={ROUTES.RESTAURANT.PICKUPS}>
            <Button variant="ghost" size="sm">View Full History</Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-y border-slate-100 dark:border-slate-800">
              <tr>
                <th className="p-3.5 font-bold">Collection Date</th>
                <th className="p-3.5 font-bold">Recorded Weight</th>
                <th className="p-3.5 font-bold">Contamination Check</th>
                <th className="p-3.5 font-bold">Assigned Loader</th>
                <th className="p-3.5 font-bold">Status</th>
                <th className="p-3.5 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {pickups.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                  <td className="p-3.5 font-semibold">{formatDate(p.scheduled_date)}</td>
                  <td className="p-3.5 font-bold text-emerald-700 dark:text-emerald-400">
                    {p.actual_weight_kg ? `${p.actual_weight_kg} kg` : `${p.estimated_weight_kg} kg est.`}
                  </td>
                  <td className="p-3.5">
                    <Badge variant="success">0% Plastic Contamination</Badge>
                  </td>
                  <td className="p-3.5">{p.collector_name || 'Suresh Gaikwad'}</td>
                  <td className="p-3.5">
                    <Badge variant="success">{p.status}</Badge>
                  </td>
                  <td className="p-3.5">
                    <Link href={ROUTES.RESTAURANT.PICKUP_DETAIL(p.id)}>
                      <Button size="sm" variant="outline">View</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* ESG Diversion Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border-4 border-emerald-700 rounded-3xl p-8 w-full max-w-xl shadow-2xl space-y-6 text-center">
            <div className="flex justify-between items-center border-b pb-4">
              <Badge variant="amber" className="text-xs uppercase tracking-widest">
                DEMO CERTIFICATE — AgroLoop Prototype
              </Badge>
              <button onClick={() => setShowCertificateModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <div className="space-y-4">
              <Award className="w-16 h-16 text-emerald-600 mx-auto" />
              <h3 className="text-2xl font-black text-emerald-950 dark:text-emerald-100 tracking-tight">
                CERTIFICATE OF WASTE DIVERSION
              </h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">This is to certify that</p>
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">SPICE GARDEN BISTRO (FC ROAD, PUNE)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Has successfully diverted <strong className="text-emerald-700 font-bold">{formatWeight(monthlyDivertedKg)}</strong> of organic commercial kitchen waste from municipal landfills, preventing <strong className="text-emerald-700 font-bold">{co2eKg} kg CO₂e</strong> greenhouse gas emissions during February 2025.
              </p>
            </div>

            <div className="pt-4 border-t flex justify-between items-center text-xs text-slate-400">
              <div>Issue Date: 23 Feb 2026</div>
              <div>Authorized by AgroLoop Operations</div>
            </div>

            <Button onClick={() => setShowCertificateModal(false)} variant="primary" className="w-full">
              Print / Save Certificate PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
