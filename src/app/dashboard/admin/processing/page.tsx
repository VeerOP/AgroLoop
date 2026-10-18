'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sprout, Plus, CheckCircle2, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgroLoopStore } from '@/lib/db/store';
import { ProcessingBatch, ProcessingMethod, BatchStatus } from '@/types';
import { formatDate } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

export default function AdminProcessingPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [method, setMethod] = useState<ProcessingMethod>('Vermicomposting');
  const [inputKg, setInputKg] = useState('500');
  const [wasteType, setWasteType] = useState('Segregated Kitchen Prep Scraps');
  const [outputEstKg, setOutputEstKg] = useState('250');
  const [notes, setNotes] = useState('');

  const batches = AgroLoopStore.getBatches();

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const count = batches.length + 43;
    const code = `${method.substring(0, 2).toUpperCase()}-${count}`;

    AgroLoopStore.createBatch({
      batch_code: code,
      input_waste_kg: parseFloat(inputKg) || 500,
      waste_type: wasteType,
      processing_method: method,
      start_date: new Date().toISOString().split('T')[0],
      expected_completion_date: '2025-03-25',
      status: 'pre_processing',
      output_estimate_kg: parseFloat(outputEstKg) || 250,
      quality_status: 'pending',
      notes,
    });

    setShowCreateModal(false);
    setRefreshKey((prev) => prev + 1);
  };

  const handleAdvanceStage = (batch: ProcessingBatch, nextStatus: BatchStatus) => {
    const isCompleting = nextStatus === 'completed';
    AgroLoopStore.advanceBatchStage(batch.id, nextStatus, isCompleting ? 'passed' : undefined);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-400" />
            <h2 className="text-2xl font-extrabold tracking-tight">Bio-Processing Batch Controller</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Maturation timeline & quality control for Vermicompost, Biochar, Liquid Bio-Fertiliser & Bokashi.
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} variant="amber" size="md">
          <Plus className="w-4 h-4" /> Create New Batch
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {batches.map((batch) => {
          const stages: BatchStatus[] = ['pre_processing', 'bedding', 'active_processing', 'maturation', 'quality_check', 'completed'];
          const currentIdx = stages.indexOf(batch.status);
          const progressPct = Math.round(((currentIdx + 1) / stages.length) * 100);

          return (
            <Card key={batch.id} className="hover:border-emerald-500/50 flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-lg text-slate-900 dark:text-slate-100">Batch {batch.batch_code}</span>
                    <Badge variant="success" className="text-[10px]">{batch.processing_method}</Badge>
                  </div>
                  <Badge variant={batch.status === 'completed' ? 'success' : 'warning'}>
                    {batch.status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6 pt-0 space-y-4">
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold text-[10px] uppercase">Input Waste</span>
                    <span className="font-bold">{batch.input_waste_kg} kg</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold text-[10px] uppercase">Est. Output</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">{batch.output_estimate_kg} kg</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold text-[10px] uppercase">Quality</span>
                    <span className="font-bold capitalize">{batch.quality_status}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-500">
                    <span>Batch Maturation</span>
                    <span>{progressPct}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
                  </div>
                </div>

                <p className="text-xs text-slate-500 italic">&ldquo;{batch.notes}&rdquo;</p>

                <div className="pt-2 border-t flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Started: {formatDate(batch.start_date)}</span>
                  {batch.status !== 'completed' && currentIdx < stages.length - 1 && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleAdvanceStage(batch, stages[currentIdx + 1])}
                    >
                      Advance to {stages[currentIdx + 1].replace('_', ' ')} <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  )}
                  {batch.status === 'completed' && (
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Complete & Injected to Stock
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Create Bio-Processing Batch</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Processing Method</label>
                <select
                  value={method}
                  onChange={(e: any) => setMethod(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Vermicomposting">Vermicomposting</option>
                  <option value="Biochar Pyrolysis">Biochar Pyrolysis</option>
                  <option value="Liquid Bio-Fertiliser">Liquid Bio-Fertiliser</option>
                  <option value="Bokashi Fermentation">Bokashi Fermentation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Input Waste (kg)</label>
                <input
                  type="number"
                  value={inputKg}
                  onChange={(e) => setInputKg(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Output Product Estimate (kg)</label>
                <input
                  type="number"
                  value={outputEstKg}
                  onChange={(e) => setOutputEstKg(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Start Processing Batch
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
