'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdminCustomersPage() {
  const customers = [
    { id: 'user-hh-01', name: 'Priya Sharma', type: 'Household', location: 'Bandra West, Mumbai', plan: 'Weekly Green (₹199/mo)', waste: '18.5 kg' },
    { id: 'user-rest-01', name: 'Spice Garden Bistro (Mehul Tanna)', type: 'Restaurant', location: 'Linking Road, Bandra', plan: 'Daily Pro (₹1,499/mo)', waste: '1,284 kg' },
    { id: 'user-hh-02', name: 'Ananya & Rohan Joshi', type: 'Household', location: 'Powai, Mumbai', plan: 'Bi-Weekly (₹299/mo)', waste: '24.0 kg' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Urban Customer Directory</h2>
          <p className="text-xs text-slate-300 mt-1">30 Active household & commercial restaurant subscribers across Mumbai.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-y">
              <tr>
                <th className="p-3.5 font-bold">Customer Name</th>
                <th className="p-3.5 font-bold">Category</th>
                <th className="p-3.5 font-bold">Location</th>
                <th className="p-3.5 font-bold">Subscription Plan</th>
                <th className="p-3.5 font-bold">Waste Diverted YTD</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-semibold text-slate-900 dark:text-slate-100">{c.name}</td>
                  <td className="p-3.5"><Badge variant={c.type === 'Restaurant' ? 'amber' : 'default'}>{c.type}</Badge></td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-300">{c.location}</td>
                  <td className="p-3.5 font-medium">{c.plan}</td>
                  <td className="p-3.5 font-bold text-emerald-700">{c.waste}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
