'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SEED_PROFILES } from '@/lib/seed-data';

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-800">
        <h2 className="text-2xl font-extrabold tracking-tight">System User Directory & Access Control</h2>
        <p className="text-xs text-slate-300 mt-1">Role-based accounts across Admin, Household, Restaurant, Farmer & Collector personas.</p>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-y">
              <tr>
                <th className="p-3.5 font-bold">User Name</th>
                <th className="p-3.5 font-bold">Role</th>
                <th className="p-3.5 font-bold">Email</th>
                <th className="p-3.5 font-bold">Phone</th>
                <th className="p-3.5 font-bold">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {SEED_PROFILES.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-semibold text-slate-900 dark:text-slate-100">{u.full_name}</td>
                  <td className="p-3.5"><Badge variant="default">{u.role}</Badge></td>
                  <td className="p-3.5 font-mono">{u.email}</td>
                  <td className="p-3.5">{u.phone}</td>
                  <td className="p-3.5">{u.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
