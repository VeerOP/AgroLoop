'use client';

import React, { useState } from 'react';
import {
  Users,
  Building2,
  Trophy,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  Send,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function SocietyFlatsPage() {
  const [searchWing, setSearchWing] = useState('all');
  const [noticeText, setNoticeText] = useState('');
  const [noticeSent, setNoticeSent] = useState(false);

  const wingsSummary = [
    { wing: 'Wing A (Azure)', flats: 90, segregationScore: 98, purityRank: '#1 (Gold)', floorChampion: 'Flat 402 (Sharma)' },
    { wing: 'Wing B (Breeze)', flats: 85, segregationScore: 95, purityRank: '#2 (Silver)', floorChampion: 'Flat 201 (Deshpande)' },
    { wing: 'Wing C (Coral)', flats: 90, segregationScore: 92, purityRank: '#3 (Bronze)', floorChampion: 'Flat 604 (Mehta)' },
    { wing: 'Wing D (Dolphin)', flats: 85, segregationScore: 89, purityRank: '#4 (Needs Focus)', floorChampion: 'Flat 103 (Fernandes)' },
  ];

  const flatAudits = [
    { flat: 'A-101', wing: 'Wing A', resident: 'A. K. Singhania', status: 'compliant', purity: 98, lastAudit: '22 Feb 2025' },
    { flat: 'A-102', wing: 'Wing A', resident: 'V. Ramanathan', status: 'compliant', purity: 99, lastAudit: '22 Feb 2025' },
    { flat: 'A-201', wing: 'Wing A', resident: 'Deepak Varma', status: 'compliant', purity: 96, lastAudit: '22 Feb 2025' },
    { flat: 'A-402', wing: 'Wing A', resident: 'Priya Sharma', status: 'compliant', purity: 100, lastAudit: '22 Feb 2025' },
    { flat: 'B-201', wing: 'Wing B', resident: 'Ananya Deshpande', status: 'compliant', purity: 97, lastAudit: '22 Feb 2025' },
    { flat: 'B-305', wing: 'Wing B', resident: 'Karan Shah', status: 'warning', purity: 84, lastAudit: '21 Feb 2025', notes: 'Plastic wrapper in green bin' },
    { flat: 'C-604', wing: 'Wing C', resident: 'S. Mehta', status: 'compliant', purity: 95, lastAudit: '22 Feb 2025' },
    { flat: 'D-204', wing: 'Wing D', resident: 'R. Kulkarni', status: 'warning', purity: 82, lastAudit: '21 Feb 2025', notes: 'Unsegregated tea bags' },
    { flat: 'D-502', wing: 'Wing D', resident: 'N. Fernandes', status: 'compliant', purity: 94, lastAudit: '22 Feb 2025' },
  ];

  const handleSendNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeText) return;
    setNoticeSent(true);
    setTimeout(() => {
      setNoticeText('');
      setNoticeSent(false);
    }, 3000);
  };

  const filteredAudits = searchWing === 'all' ? flatAudits : flatAudits.filter((f) => f.wing.includes(searchWing));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Wing & Flat Segregation Leaderboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Internal CHS compliance monitoring across 350 residential flats in Sea Breeze CHS
          </p>
        </div>
      </div>

      {/* Wing Leaderboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {wingsSummary.map((w, idx) => (
          <Card key={idx} className="relative overflow-hidden hover:border-emerald-500 transition-all">
            <div
              className={`h-1.5 w-full ${
                w.segregationScore >= 95 ? 'bg-emerald-600' : w.segregationScore >= 90 ? 'bg-teal-500' : 'bg-amber-500'
              }`}
            />
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-base text-slate-900 dark:text-slate-100">{w.wing}</span>
                <Trophy className={`w-4 h-4 ${idx === 0 ? 'text-amber-500' : 'text-slate-400'}`} />
              </div>

              <div>
                <div className="text-3xl font-black text-slate-900 dark:text-slate-100">{w.segregationScore}%</div>
                <span className="text-xs text-slate-500">{w.purityRank}</span>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] space-y-1">
                <div className="text-slate-500">Total Units: <strong className="text-slate-800 dark:text-slate-200">{w.flats} Flats</strong></div>
                <div className="text-slate-500">Top Floor Unit: <strong className="text-emerald-600">{w.floorChampion}</strong></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Flat Audits & Society Notice Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flat Audit Log Table */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" /> Spot Audit Sampling Records
              </CardTitle>
              <p className="text-xs text-slate-500">Housekeeping floor monitor spot-check entries</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={searchWing}
                onChange={(e) => setSearchWing(e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <option value="all">All Wings</option>
                <option value="Wing A">Wing A</option>
                <option value="Wing B">Wing B</option>
                <option value="Wing C">Wing C</option>
                <option value="Wing D">Wing D</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 bg-earth-50/50 dark:bg-slate-800/30">
                    <th className="py-2.5 px-3">Flat & Wing</th>
                    <th className="py-2.5 px-3">Resident</th>
                    <th className="py-2.5 px-3">Purity Score</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Audit Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredAudits.map((f, i) => (
                    <tr key={i} className="hover:bg-earth-50/40 dark:hover:bg-slate-800/20">
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900 dark:text-slate-100">{f.flat}</span>
                        <span className="text-[10px] text-slate-400 block">{f.wing}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{f.resident}</td>
                      <td className="py-3 px-3">
                        <span className="font-extrabold text-emerald-700 dark:text-emerald-400">{f.purity}%</span>
                      </td>
                      <td className="py-3 px-3">
                        {f.status === 'compliant' ? (
                          <Badge variant="success" className="text-[10px]">Purity Pass</Badge>
                        ) : (
                          <Badge variant="amber" className="text-[10px]">Warning</Badge>
                        )}
                      </td>
                      <td className="py-3 px-3 text-slate-500">{f.notes || 'Clean green bin segregation'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Broadcast Society WhatsApp / App Notice */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-600" /> Broadcast CHS Segregation Notice
            </CardTitle>
            <p className="text-xs text-slate-500">Send WhatsApp reminder to society WhatsApp group & resident app</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {noticeSent ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-100">Notice Broadcasted!</h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  Delivered to 350 Sea Breeze CHS flat owners via Society WhatsApp circular.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendNotice} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Select Target Wing
                  </label>
                  <select className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <option>All Wings (350 Flats)</option>
                    <option>Wing D Only (Focus Wing)</option>
                    <option>Floor 3 & 5 Monitors</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Notice / Advisory Message
                  </label>
                  <textarea
                    rows={4}
                    value={noticeText}
                    onChange={(e) => setNoticeText(e.target.value)}
                    placeholder="e.g. Dear Sea Breeze Residents, Please ensure all coconut shells and non-biodegradable milk pouches are separated from green wet bins..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    required
                  />
                </div>

                <Button type="submit" className="w-full py-2.5">
                  <Send className="w-4 h-4 mr-1.5" /> Send Resident Broadcast
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
