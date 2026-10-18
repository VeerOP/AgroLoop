'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function BusinessModelPage() {
  return (
    <div className="min-h-screen flex flex-col bg-earth-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="amber" className="text-xs uppercase tracking-widest">Business Canvas</Badge>
          <h1 className="text-3xl font-extrabold tracking-tight">AgroLoop Business Model Canvas</h1>
          <p className="text-xs sm:text-sm text-slate-500">Structured overview of key partners, activities, value propositions, and revenue streams.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Card className="p-4 space-y-2">
            <h4 className="font-bold text-xs uppercase text-emerald-700 dark:text-emerald-400">Key Partners</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
              <li>Brihanmumbai Municipal Corporation (BMC)</li>
              <li>Sahyadri Farmer Producer Co. (FPO)</li>
              <li>Commercial Restaurants Association</li>
              <li>EV Logistics Fleet Partners</li>
            </ul>
          </Card>

          <Card className="p-4 space-y-2">
            <h4 className="font-bold text-xs uppercase text-emerald-700 dark:text-emerald-400">Key Activities</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
              <li>Source-segregated food waste logistics</li>
              <li>Vermicomposting & biochar processing</li>
              <li>AI crop advisory & soil dosage mapping</li>
              <li>Direct farmer doorstep delivery</li>
            </ul>
          </Card>

          <Card className="p-4 space-y-2">
            <h4 className="font-bold text-xs uppercase text-emerald-700 dark:text-emerald-400">Value Propositions</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
              <li>Urban: Reliable zero-waste ESG disposal & rewards</li>
              <li>Farmers: High-grade organic inputs at ₹10/kg + 24/7 AI agronomist</li>
              <li>Environment: Methane mitigation & soil health</li>
            </ul>
          </Card>

          <Card className="p-4 space-y-2">
            <h4 className="font-bold text-xs uppercase text-emerald-700 dark:text-emerald-400">Customer Relationships</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
              <li>Automated app notifications & pickups</li>
              <li>Downloadable ESG diversion certificates</li>
              <li>FPO community field demonstrations</li>
            </ul>
          </Card>

          <Card className="p-4 space-y-2">
            <h4 className="font-bold text-xs uppercase text-emerald-700 dark:text-emerald-400">Customer Segments</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
              <li>Urban Households (Bandra, Powai, Malad)</li>
              <li>Restaurants & Hotel Canteens</li>
              <li>Smallholder Vegetable Farmers (Palghar, Shahapur)</li>
            </ul>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <Card className="p-6 space-y-3">
            <h4 className="font-bold text-sm uppercase text-rose-700 dark:text-rose-400">Cost Structure</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              EV loader logistics & fuel, composting bed maintenance, earthworm stock replenishment, biochar retort energy, packaging, staff salaries, app server infrastructure.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <h4 className="font-bold text-sm uppercase text-emerald-700 dark:text-emerald-400">Revenue Streams</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              B2C Household subscriptions (₹199/mo), B2B Restaurant contracts (₹1,499/mo), Direct product sales (₹10-45/kg), Potential voluntary carbon credits (₹850/MT CO₂e).
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
