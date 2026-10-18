'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  FileCheck,
  Download,
  Building2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Award,
  FileText,
  Clock,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

export default function SocietyCompliancePage() {
  const [downloadingCert, setDownloadingCert] = useState<string | null>(null);

  const certificates = [
    {
      id: 'cert-swm-2025-01',
      title: 'BMC Bulk Waste Generator Compliance Certificate',
      period: 'January 2025',
      ward: 'H/West Ward (Bandra West)',
      wasteDiverted: '5,640 kg',
      co2eAvoided: '1,410 kg CO₂e',
      issuedDate: '01 Feb 2025',
      status: 'active',
      certCode: 'BMC/SWM/H-W/2025/0891',
    },
    {
      id: 'cert-swm-2024-12',
      title: 'BMC Bulk Waste Generator Compliance Certificate',
      period: 'December 2024',
      ward: 'H/West Ward (Bandra West)',
      wasteDiverted: '5,420 kg',
      co2eAvoided: '1,355 kg CO₂e',
      issuedDate: '02 Jan 2025',
      status: 'active',
      certCode: 'BMC/SWM/H-W/2024/0742',
    },
    {
      id: 'cert-swm-2024-11',
      title: 'BMC Bulk Waste Generator Compliance Certificate',
      period: 'November 2024',
      ward: 'H/West Ward (Bandra West)',
      wasteDiverted: '5,180 kg',
      co2eAvoided: '1,295 kg CO₂e',
      issuedDate: '01 Dec 2024',
      status: 'active',
      certCode: 'BMC/SWM/H-W/2024/0615',
    },
  ];

  const handleDownload = (certId: string) => {
    setDownloadingCert(certId);
    setTimeout(() => {
      setDownloadingCert(null);
      alert(`Certificate ${certId} downloaded. Ready for submission to BMC H/West Ward Office.`);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            BMC Solid Waste Management Compliance
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Official statutory compliance under SWM Rules 2016 for Bulk Waste Generators (&gt;100 kg/day)
          </p>
        </div>
        <Badge variant="success" className="px-3 py-1.5 text-xs font-bold flex items-center gap-1.5 self-start">
          <ShieldCheck className="w-4 h-4" /> 100% Statutory Compliant
        </Badge>
      </div>

      {/* BMC SWM Rules Summary Card */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
              MUNICIPAL MANDATE OVERVIEW
            </span>
            <h3 className="text-lg font-bold">Brihanmumbai Municipal Corporation (BMC) H/West Ward</h3>
          </div>
          <Badge variant="outline" className="text-xs border-emerald-500 text-emerald-400">
            Ward Officer Verified
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <strong className="text-slate-200 block">SWM Rule 2016 Status:</strong>
            <p className="text-slate-400">
              Bulk generators (&gt;100 kg/day) are prohibited from handing unsegregated wet waste to municipal dump trucks.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <strong className="text-slate-200 block">AgroLoop Off-Site Solution:</strong>
            <p className="text-slate-400">
              100% wet waste collected via dedicated daily EV compactor and processed at Mahape Bio-Hub.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <strong className="text-slate-200 block">Penalty Protection:</strong>
            <p className="text-slate-400">
              Zero municipal fines levied. Full audit logs synced monthly with BMC Solid Waste Management Department.
            </p>
          </div>
        </div>
      </div>

      {/* Downloadable Monthly Certificates */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-emerald-600" /> Issued Monthly Compliance Certificates
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificates.map((c) => (
            <Card key={c.id} className="hover:border-emerald-500 transition-all flex flex-col justify-between">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <Badge variant="success" className="text-[10px]">VERIFIED</Badge>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{c.period} Certificate</h4>
                  <span className="text-[11px] text-slate-400 font-mono block mt-0.5">{c.certCode}</span>
                </div>

                <div className="text-xs space-y-1.5 py-2 border-y border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between">
                    <span>Waste Diverted:</span>
                    <strong className="text-slate-900 dark:text-slate-100">{c.wasteDiverted}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>CO₂e Avoided:</span>
                    <strong className="text-emerald-600">{c.co2eAvoided}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Issued Date:</span>
                    <span>{c.issuedDate}</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleDownload(c.id)}
                  variant="outline"
                  className="w-full text-xs"
                  disabled={downloadingCert === c.id}
                >
                  <Download className="w-4 h-4 mr-1.5" />
                  {downloadingCert === c.id ? 'Generating...' : 'Download PDF Certificate'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
