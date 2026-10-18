'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function PersonasPage() {
  const PERSONAS = [
    {
      name: 'Priya Sharma',
      age: 31,
      location: 'Bandra West, Mumbai',
      role: 'IT Project Manager (Urban Household)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
      goals: ['Eliminate wet waste odor at home', 'Contribute to climate mitigation', 'Earn sustainability rewards'],
      painPoints: ['Irregular municipal garbage trucks', 'No local composting space in apartment'],
      wtp: '₹199 / month subscription',
      channels: 'Mobile Web App, WhatsApp notifications',
      solution: 'Doorstep scheduled pickup, green reward points, and live impact tracking.',
    },
    {
      name: 'Ramkisan Patil',
      age: 48,
      location: 'Manor-Palghar Belt, Palghar District',
      role: 'Smallholder Farmer (1.8 Acres: Onion + Tomato)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      goals: ['Reduce synthetic NPK chemical costs', 'Improve soil water retention during dry months', 'Increase tomato yield'],
      painPoints: ['High chemical fertilizer prices', 'Lack of expert organic dosage guidance'],
      wtp: '₹10 – ₹25 per kg input delivered',
      channels: 'Voice/AI chat assistant, FPO meetings',
      solution: 'Affordable vermicompost + biochar doorstep delivery with 24/7 AI agronomist advisory.',
    },
    {
      name: 'Ramesh Narang',
      age: 56,
      location: 'Bandra West, Mumbai',
      role: 'Hon. Secretary, Sea Breeze CHS (350 Flats)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      goals: ['Meet BMC Bulk Waste Generator mandate (>100kg/day)', 'Avoid municipal dumping penalties', 'Audit wing-by-wing segregation'],
      painPoints: ['Complex in-situ composter breakdowns & odor complaints', 'Manual housemaid coordination across 4 wings'],
      wtp: '₹4,999 / month CHS society contract',
      channels: 'Secretary web dashboard, Society AGM reports',
      solution: 'Daily centralized bulk scrap logistics, wing segregation tracking, and official BMC SWM compliance certificates.',
    },
    {
      name: 'Mehul Tanna',
      age: 39,
      location: 'Linking Road, Bandra West, Mumbai',
      role: 'Owner, Spice Garden Bistro (Restaurant)',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80',
      goals: ['Comply with BMC bulk waste norms', 'Enhance brand eco-reputation', 'Streamline daily scrap disposal'],
      painPoints: ['Landfill fines for unsegregated waste', 'Lack of official ESG diversion proof'],
      wtp: '₹1,499 / month B2B contract',
      channels: 'Web portal, monthly PDF certificates',
      solution: 'Daily scheduled scrap logistics and monthly BMC-compliant ESG waste diversion certificates.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-earth-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="amber" className="text-xs uppercase tracking-widest">Target Personas</Badge>
          <h1 className="text-3xl font-extrabold tracking-tight">AgroLoop User Personas</h1>
          <p className="text-xs sm:text-sm text-slate-500">Representative user profiles driving product design and platform interactions across Mumbai & rural farm clusters.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERSONAS.map((p, idx) => (
            <Card key={idx} className="hover:border-emerald-500/50">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full object-cover border-2 border-emerald-600" />
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">{p.name}, {p.age}</h3>
                    <p className="text-xs text-slate-500">{p.location}</p>
                    <Badge variant="outline" className="text-[10px] mt-1">{p.role}</Badge>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <strong className="text-slate-700 dark:text-slate-300 block mb-0.5">Primary Goals:</strong>
                    <ul className="list-disc pl-4 text-slate-500 space-y-0.5">
                      {p.goals.map((g, i) => <li key={i}>{g}</li>)}
                    </ul>
                  </div>
                  <div>
                    <strong className="text-slate-700 dark:text-slate-300 block mb-0.5">Pain Points:</strong>
                    <ul className="list-disc pl-4 text-slate-500 space-y-0.5">
                      {p.painPoints.map((pp, i) => <li key={i}>{pp}</li>)}
                    </ul>
                  </div>
                  <div className="pt-2 border-t text-slate-600 dark:text-slate-400">
                    <strong className="text-emerald-700 dark:text-emerald-400">AgroLoop Solution:</strong> {p.solution}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
