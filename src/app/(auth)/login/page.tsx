'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sprout, ArrowRight, Shield, Home, Utensils, Truck, Check, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>('household');
  const [email, setEmail] = useState('household@agroloop.demo');
  const [password, setPassword] = useState('demo123');

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(`${role}@agroloop.demo`);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to the appropriate dashboard
    switch (selectedRole) {
      case 'household':
        router.push('/dashboard/household');
        break;
      case 'society':
        router.push('/dashboard/society');
        break;
      case 'restaurant':
        router.push('/dashboard/restaurant');
        break;
      case 'farmer':
        router.push('/dashboard/farmer');
        break;
      case 'collector':
        router.push('/dashboard/collector');
        break;
      case 'admin':
      case 'processing_operator':
        router.push('/dashboard/admin');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-md">
            <Sprout className="w-6 h-6 text-emerald-300" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-emerald-950 dark:text-emerald-50">AGROLOOP</span>
        </Link>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Select Demo Account Role</h2>
        <p className="text-xs text-slate-500">Instant access with pre-configured Mumbai demo profiles</p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-2xl px-4">
        <Card className="p-2 sm:p-6 shadow-xl border-emerald-950/10">
          <CardContent className="space-y-6 pt-4">
            {/* Quick Demo Role Selector Pills */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">1. Select Persona Role</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { role: 'household', label: 'Household (Priya)', icon: Home, color: 'text-emerald-600' },
                  { role: 'society', label: 'Society / CHS (Ramesh)', icon: Building2, color: 'text-teal-600' },
                  { role: 'restaurant', label: 'Restaurant (Mehul)', icon: Utensils, color: 'text-amber-600' },
                  { role: 'farmer', label: 'Farmer (Ramkisan)', icon: Sprout, color: 'text-green-700' },
                  { role: 'collector', label: 'Collector (Suresh)', icon: Truck, color: 'text-blue-600' },
                  { role: 'admin', label: 'Ops Admin (Vikram)', icon: Shield, color: 'text-purple-600' },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedRole === item.role;
                  return (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => handleRoleSelect(item.role as UserRole)}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-emerald-900 text-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : item.color}`} />
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-300" />}
                      </div>
                      <span className="text-xs font-bold mt-2">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulated Credentials Form */}
            <form onSubmit={handleLogin} className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <Button type="submit" className="w-full py-3" size="lg">
                Enter {selectedRole.toUpperCase()} Dashboard <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Badge variant="amber" className="text-[9px]">DEMO MODE</Badge>
                <span>No password required for evaluation</span>
              </div>
              <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
                Clicking enter loads pre-seeded Mumbai data for waste pickups, batch processing, and agricultural orders.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
