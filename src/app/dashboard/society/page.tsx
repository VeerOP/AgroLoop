'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Users,
  Award,
  FileCheck,
  Download,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Truck,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Leaf,
  BarChart3,
  Check,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';
import { formatWeight, formatDate } from '@/lib/utils';
import { calculateWasteImpact } from '@/lib/impact/calculator';
import { ROUTES } from '@/lib/routes';

export default function SocietyDashboardPage() {
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const pickups = AgroLoopStore.getPickups().filter((p) => p.customer_type === 'society');

  const completedPickups = pickups.filter((p) => p.status === 'completed');
  const monthlyDivertedKg = 5640; // 185 kg/day * ~30 days
  const { co2eKg } = calculateWasteImpact(monthlyDivertedKg);
  const organicCompostKg = Math.round(monthlyDivertedKg * 0.45);
  const treesEquivalent = Math.round(co2eKg / 21.77);

  const wingsData = [
    { wing: 'Wing A (Azure)', flats: 90, segregationRate: 98, dailyAvgKg: 48.2, status: 'Top Performer' },
    { wing: 'Wing B (Breeze)', flats: 85, segregationRate: 95, dailyAvgKg: 46.0, status: 'Compliant' },
    { wing: 'Wing C (Coral)', flats: 90, segregationRate: 92, dailyAvgKg: 47.8, status: 'Compliant' },
    { wing: 'Wing D (Dolphin)', flats: 85, segregationRate: 89, dailyAvgKg: 45.5, status: 'Needs Improvement' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Society Hero Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl border border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="success" className="text-[10px] uppercase font-bold tracking-wider">
              BMC Certified Bulk Waste Generator
            </Badge>
            <span className="text-xs text-slate-300">Sea Breeze CHS • Reg # MUM/BND/2014-998</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Sea Breeze Cooperative Housing Society
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            350 Residential Units • 4 Wings • Monthly waste diverted:{' '}
            <strong className="text-emerald-400 font-bold">{formatWeight(monthlyDivertedKg)}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => setShowCertificateModal(true)} variant="primary" size="md">
            <Download className="w-4 h-4 mr-1.5" /> BMC ESG Certificate
          </Button>
          <Link href={ROUTES.SOCIETY.COMPLIANCE}>
            <Button variant="outline" size="md" className="border-slate-700 text-white hover:bg-slate-800">
              <ShieldCheck className="w-4 h-4 mr-1.5" /> View BMC Audit Log
            </Button>
          </Link>
        </div>
      </div>

      {/* Society Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Today&apos;s Bulk Scrap</span>
              <Building2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">192.5 kg</div>
            <p className="text-xs text-slate-500">Collected at 07:15 AM by Suresh (EV Van)</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Avg Segregation Purity</span>
              <Sparkles className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-black text-teal-700 dark:text-teal-400">94.0%</div>
            <p className="text-xs text-slate-500">Exceeds BMC 85% requirement</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Monthly Composted</span>
              <Leaf className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {formatWeight(organicCompostKg)}
            </div>
            <p className="text-xs text-slate-500">Supplied to Palghar vegetable farmers</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">CHS Green Points</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600">2,850 Pts</div>
            <p className="text-xs text-slate-500">Redeemable for Society Garden compost</p>
          </CardContent>
        </Card>
      </div>

      {/* Wing-wise Segregation Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" /> Wing Segregation & Daily Scrap Breakdown
              </CardTitle>
              <p className="text-xs text-slate-500 mt-1">Real-time purity metrics logged during morning bulk gate collection</p>
            </div>
            <Link href={ROUTES.SOCIETY.FLATS}>
              <Button variant="outline" size="sm">
                Flat Details
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {wingsData.map((w, idx) => (
                <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{w.wing}</span>
                      <Badge
                        variant={w.segregationRate >= 95 ? 'success' : w.segregationRate >= 90 ? 'info' : 'amber'}
                        className="text-[10px]"
                      >
                        {w.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500">{w.flats} Households • Daily Avg: {w.dailyAvgKg} kg wet waste</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">Purity Score</span>
                      <span className="font-extrabold text-sm text-emerald-700 dark:text-emerald-400">
                        {w.segregationRate}%
                      </span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-24 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          w.segregationRate >= 95 ? 'bg-emerald-600' : w.segregationRate >= 90 ? 'bg-teal-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${w.segregationRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Bulk Collection & Logistics Card */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600" /> Next Scheduled Bulk Pickup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  Tomorrow Morning
                </span>
                <Badge variant="success" className="text-[10px]">SCHEDULED</Badge>
              </div>
              <div className="text-xl font-black text-emerald-950 dark:text-emerald-100">
                06:00 - 07:30 AM
              </div>
              <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80">
                Location: Central Waste Bin Enclosure, Gate 2 (Near Substation)
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Designated Collector:</span>
                <strong className="text-slate-900 dark:text-slate-100">Suresh Gaikwad (Depot 3)</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Collection Vehicle:</span>
                <strong className="text-slate-900 dark:text-slate-100">AgroLoop EV Compactor #14</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Destination Hub:</span>
                <strong className="text-slate-900 dark:text-slate-100">Mahape Bio-Processing Hub</strong>
              </div>
            </div>

            <Link href={ROUTES.SOCIETY.PICKUPS} className="block pt-2">
              <Button variant="outline" className="w-full text-xs">
                View Full Society Pickup Log
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Processing Pipeline Teaser Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <Badge variant="success" className="text-[10px] uppercase font-bold">
            Circular Economy Transparency
          </Badge>
          <h3 className="text-xl font-black tracking-tight">
            See How Your Society&apos;s Waste Becomes Premium Farmer Compost
          </h3>
          <p className="text-xs text-slate-300">
            Follow the 6-stage biological journey from Sea Breeze CHS bins through thermophilic pre-composting,
            earthworm digestion, and biochar enrichment to Palghar smallholder farm fields.
          </p>
        </div>
        <Link href={ROUTES.PUBLIC.PROCESSING_JOURNEY}>
          <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold whitespace-nowrap">
            Explore Waste-to-Compost Journey →
          </Button>
        </Link>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 max-w-xl w-full rounded-3xl p-8 space-y-6 shadow-2xl border border-emerald-950/20 text-slate-900 dark:text-slate-100">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mx-auto text-emerald-700">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                BMC SWM Compliance Certificate
              </h3>
              <p className="text-xs text-slate-500">Official Municipal Bulk Waste Generator Verification</p>
            </div>

            <div className="border-2 border-dashed border-emerald-500/40 rounded-2xl p-6 bg-earth-50/50 dark:bg-slate-800/50 space-y-4 text-xs">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Housing Society:</span>
                <strong className="font-bold">Sea Breeze Cooperative Housing Society</strong>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Municipal Ward:</span>
                <strong className="font-bold">H/West Ward (Bandra West, Mumbai)</strong>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Verification Period:</span>
                <strong className="font-bold">January 2025 – Full Month</strong>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Total Organic Waste Diverted:</span>
                <strong className="font-extrabold text-emerald-700 dark:text-emerald-400">5,640 kg (5.64 MT)</strong>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Methane & CO₂e Avoided:</span>
                <strong className="font-bold text-emerald-700 dark:text-emerald-400">{co2eKg} kg CO₂e</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Authorized AgroLoop Inspector:</span>
                <strong className="font-bold">Vikramaditya Deshmukh (MIDC Hub)</strong>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  alert('ESG Certificate PDF downloaded successfully.');
                  setShowCertificateModal(false);
                }}
                className="flex-1 py-3"
              >
                <Download className="w-4 h-4 mr-1.5" /> Download Official PDF
              </Button>
              <Button onClick={() => setShowCertificateModal(false)} variant="outline" className="flex-1">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
