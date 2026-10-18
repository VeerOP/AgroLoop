'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-earth-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto p-6 md:p-10 space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="amber" className="text-xs uppercase tracking-widest">Connect</Badge>
          <h1 className="text-3xl font-extrabold tracking-tight">Contact AgroLoop Operations</h1>
          <p className="text-sm text-slate-500">Reach our Mumbai central processing hub or schedule a partner consultation.</p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span className="font-bold block">Central Hub</span>
              <span className="text-slate-500">MIDC Industrial Area, Mahape, Navi Mumbai 400705</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
              <Phone className="w-5 h-5 text-emerald-600" />
              <span className="font-bold block">Helpline</span>
              <span className="text-slate-500">+91 98220 11234</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
              <Mail className="w-5 h-5 text-emerald-600" />
              <span className="font-bold block">Email</span>
              <span className="text-slate-500">admin@agroloop.demo</span>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Message submitted in demo mode!'); }} className="space-y-4 pt-4 border-t">
            <div>
              <label className="block text-xs font-semibold mb-1">Your Name</label>
              <input type="text" className="w-full p-2.5 rounded-xl border bg-transparent text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Email / Phone</label>
              <input type="text" className="w-full p-2.5 rounded-xl border bg-transparent text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Message</label>
              <textarea className="w-full p-2.5 rounded-xl border bg-transparent text-xs" rows={3} required />
            </div>
            <Button type="submit" variant="primary" className="w-full">Send Inquiry</Button>
          </form>
        </Card>
      </main>
    </div>
  );
}
