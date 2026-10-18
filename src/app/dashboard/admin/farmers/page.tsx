'use client';

import React from 'react';
import Link from 'next/link';
import { Sprout } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AdminFarmersPage() {
  const farmers = [
    { id: 'user-farmer-01', name: 'Ramkisan Patil', cluster: 'Palghar Village', size: '1.8 Acres', crops: 'Onion + Tomato', status: 'Active Buyer' },
    { id: 'user-farmer-02', name: 'Sanjay Deshmukh', cluster: 'Shahapur Belt', size: '3.5 Acres', crops: 'Sugarcane + Vegetables', status: 'Active Buyer' },
    { id: 'user-farmer-03', name: 'Anand Shinde', cluster: 'Vasai Region', size: '2.2 Acres', crops: 'Potato + Tomato', status: 'FPO Lead' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Farmer Partner Network Directory</h2>
          <p className="text-xs text-slate-300 mt-1">18 Registered cluster farmers across Palghar, Shahapur & Vasai agricultural belts.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-y">
              <tr>
                <th className="p-3.5 font-bold">Farmer Name</th>
                <th className="p-3.5 font-bold">Agricultural Cluster</th>
                <th className="p-3.5 font-bold">Farm Size</th>
                <th className="p-3.5 font-bold">Active Crops</th>
                <th className="p-3.5 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {farmers.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-semibold text-slate-900 dark:text-slate-100">{f.name}</td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-300">{f.cluster}</td>
                  <td className="p-3.5 font-bold">{f.size}</td>
                  <td className="p-3.5">{f.crops}</td>
                  <td className="p-3.5"><Badge variant="success">{f.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
