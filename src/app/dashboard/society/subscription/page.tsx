'use client';

import React from 'react';
import {
  CreditCard,
  CheckCircle2,
  Calendar,
  Building2,
  FileText,
  Clock,
  ShieldCheck,
  Download,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function SocietySubscriptionPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            CHS Waste Management Contract & SLA
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Bulk generator annual service agreement, monthly billing & logistics SLA for Sea Breeze CHS
          </p>
        </div>
        <Badge variant="success" className="px-3 py-1 text-xs font-bold self-start">
          Active SLA Contract
        </Badge>
      </div>

      {/* Active Plan Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <Badge variant="success" className="text-[10px] uppercase font-bold">
              Bulk Generator Tier
            </Badge>
            <h3 className="text-2xl font-black">CHS Mega Society Plan (300–500 Flats)</h3>
            <p className="text-xs text-slate-400">
              Contract Ref: AGR/MUM/CHS/2024/042 • Renewed 01 Jan 2025
            </p>
          </div>
          <div className="text-left md:text-right">
            <span className="text-3xl font-black text-emerald-400">₹4,999</span>
            <span className="text-xs text-slate-400"> / month (all inclusive)</span>
            <p className="text-[11px] text-slate-400 mt-0.5">Approx ₹14.28 per flat / month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="text-slate-400">Pickup Frequency:</span>
            <strong className="text-white block text-sm">Daily Morning (365 Days)</strong>
            <span className="text-emerald-400 text-[11px]">06:00 – 07:30 AM Slot</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="text-slate-400">Bin Stations Provided:</span>
            <strong className="text-white block text-sm">4x 240L Heavy-Duty Bins</strong>
            <span className="text-slate-400 text-[11px]">Replaced bi-annually</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="text-slate-400">Statutory Certification:</span>
            <strong className="text-white block text-sm">BMC SWM 2016 Certified</strong>
            <span className="text-emerald-400 text-[11px]">Monthly Ward filing included</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="text-slate-400">Next Billing Cycle:</span>
            <strong className="text-white block text-sm">01 March 2025</strong>
            <span className="text-slate-400 text-[11px]">Auto-debit via CHS Bank A/c</span>
          </div>
        </div>
      </div>

      {/* SLA Clauses & Invoices Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Service Level Agreement (SLA) Guarantees
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-slate-100">Guaranteed 08:00 AM Clearance:</strong>
                <p className="text-slate-500">All central waste bins cleared prior to 08:00 AM daily to maintain compound hygiene.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-slate-100">Zero Landfill Guarantee:</strong>
                <p className="text-slate-500">100% of organic waste transported directly to Mahape Bio-Hub for composting.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-slate-100">Free Resident Training & Awareness:</strong>
                <p className="text-slate-500">Quarterly housekeeping staff workshop on kitchen segregation practices.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" /> Recent Invoices & Receipts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-xs">
              {[
                { inv: 'INV-2025-02', month: 'February 2025', amount: '₹4,999', status: 'Paid' },
                { inv: 'INV-2025-01', month: 'January 2025', amount: '₹4,999', status: 'Paid' },
                { inv: 'INV-2024-12', month: 'December 2024', amount: '₹4,999', status: 'Paid' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">{item.month}</span>
                    <span className="text-[10px] text-slate-400">{item.inv}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-slate-900 dark:text-slate-100">{item.amount}</span>
                    <Badge variant="success" className="text-[10px]">{item.status}</Badge>
                    <Button
                      onClick={() => alert(`Invoice ${item.inv} PDF downloaded.`)}
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
