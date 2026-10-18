'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';

export default function RestaurantInvoicesPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-2 shadow-xl">
        <h2 className="text-2xl font-extrabold">Commercial Invoices & Billing</h2>
        <p className="text-xs text-slate-300">GST invoices for monthly waste collection services.</p>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-y">
              <tr>
                <th className="p-3.5 font-bold">Invoice #</th>
                <th className="p-3.5 font-bold">Billing Period</th>
                <th className="p-3.5 font-bold">Amount</th>
                <th className="p-3.5 font-bold">Status</th>
                <th className="p-3.5 font-bold">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="hover:bg-slate-50/50">
                <td className="p-3.5 font-mono font-bold">INV-2025-01</td>
                <td className="p-3.5">January 2025</td>
                <td className="p-3.5 font-bold">₹1,499</td>
                <td className="p-3.5"><Badge variant="success">Paid</Badge></td>
                <td className="p-3.5"><Button size="sm" variant="outline"><Download className="w-3.5 h-3.5" /> PDF</Button></td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
