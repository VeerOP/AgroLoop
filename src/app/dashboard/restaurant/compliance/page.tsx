'use client';

import React from 'react';
import { FileCheck, CheckCircle2, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function RestaurantCompliancePage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-2 shadow-xl">
        <Badge variant="success" className="text-[10px] uppercase">Municipal Compliance Active</Badge>
        <h2 className="text-2xl font-extrabold">BMC Bulk Waste Generator Compliance</h2>
        <p className="text-xs text-slate-300">Certified 100% organic waste diversion status under Brihanmumbai Municipal Corporation guidelines.</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h4 className="font-bold text-sm">Monthly ESG Diversion Certificate — Jan 2025</h4>
              <p className="text-slate-500">1,284 kg food waste diverted • 1.86 MT CO₂e avoided</p>
            </div>
            <Button size="sm" variant="primary">
              <Download className="w-3.5 h-3.5" /> Download PDF
            </Button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <h4 className="font-bold text-sm">BMC Compliance Certificate — Q4 2024</h4>
              <p className="text-slate-500">Annual Bulk Generator Compliance Seal</p>
            </div>
            <Button size="sm" variant="outline">
              <Download className="w-3.5 h-3.5" /> Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
