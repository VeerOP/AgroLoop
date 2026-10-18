'use client';

import React, { useState } from 'react';
import { Truck, Sprout, ShoppingBag, Bot, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface CircularStage {
  id: 'collect' | 'process' | 'distribute' | 'advise';
  stepNumber: string;
  title: string;
  subtitle: string;
  metric: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  details: string[];
}

const STAGES: CircularStage[] = [
  {
    id: 'collect',
    stepNumber: '01',
    title: 'COLLECT',
    subtitle: 'Segregated Kitchen Waste',
    metric: '1,284 kg collected today',
    icon: <Truck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    color: 'emerald',
    description: 'Scheduled daily & weekly pickups from Mumbai households, hotels, and institutional canteens using electric loader vehicles.',
    details: [
      'Source-segregated organic kitchen prep & food waste',
      'Quality contamination check at doorstep by loaders',
      'Real-time weight recording via collector mobile application',
    ],
  },
  {
    id: 'process',
    stepNumber: '02',
    title: 'PROCESS',
    subtitle: 'Bio-Conversion Operations',
    metric: '4 Active Processing Batches',
    icon: <Sprout className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    color: 'purple',
    description: 'Waste is converted into 4 high-value inputs: Vermicompost, Biochar Soil Matrix, Fermented Plant Juice, and Bokashi.',
    details: [
      'Thermophilic pre-composting & vermi-digestion (Eisenia fetida)',
      'Oxygen-limited retort pyrolysis for biochar carbon matrix',
      'Quality verification and nutrient lab batch testing',
    ],
  },
  {
    id: 'distribute',
    stepNumber: '03',
    title: 'DISTRIBUTE',
    subtitle: 'Direct Farmer Supply Chain',
    metric: '2,860 kg stock available',
    icon: <ShoppingBag className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
    color: 'amber',
    description: 'High-grade organic inputs distributed directly to smallholder farmers in Palghar, Shahapur, and Vasai at fair demo prices.',
    details: [
      'Direct order placement via Farmer Digital Storefront',
      'Doorstep delivery to farm gates or local FPO hubs',
      'Replaces expensive synthetic chemical fertilizers',
    ],
  },
  {
    id: 'advise',
    stepNumber: '04',
    title: 'ADVISE',
    subtitle: 'AI Agronomist Guidance',
    metric: '98.4% Advisory Satisfaction',
    icon: <Bot className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
    color: 'sky',
    description: 'AgroLoop AI Agronomist provides crop-specific soil dosage, foliar spray timing, and natural pest mitigation plans.',
    details: [
      'Powered by Gemini AI with deterministic rules fallback',
      'Customized by crop (Tomato, Onion, Garlic) & soil type',
      'Calculates farmer cost savings and yield improvements',
    ],
  },
];

export function CircularFlow() {
  const [selectedStage, setSelectedStage] = useState<CircularStage>(STAGES[0]);

  return (
    <div className="space-y-8">
      {/* 4-Step Interactive Circular Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAGES.map((stage) => {
          const isSelected = selectedStage.id === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => setSelectedStage(stage)}
              className={`p-6 rounded-2xl text-left transition-all duration-300 relative border overflow-hidden ${
                isSelected
                  ? 'bg-emerald-900/90 text-white border-emerald-500 shadow-xl scale-[1.02]'
                  : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-emerald-950/10 hover:border-emerald-500/30 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-black tracking-widest px-2.5 py-1 rounded-lg ${
                  isSelected ? 'bg-emerald-800 text-emerald-200' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                }`}>
                  STEP {stage.stepNumber}
                </span>
                <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-emerald-800' : 'bg-slate-100 dark:bg-slate-800'}`}>
                  {stage.icon}
                </div>
              </div>

              <h4 className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
                {stage.title}
              </h4>
              <p className={`text-xs font-medium mt-0.5 ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                {stage.subtitle}
              </p>

              <div className="mt-4 pt-3 border-t border-current/10 flex items-center justify-between">
                <span className={`text-xs font-semibold ${isSelected ? 'text-emerald-300' : 'text-emerald-700 dark:text-emerald-400'}`}>
                  {stage.metric}
                </span>
                <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-slate-400'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Card */}
      <Card className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white border-emerald-800/40 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <Badge variant="amber" className="text-xs uppercase tracking-wider">
                Active Stage: {selectedStage.stepNumber} {selectedStage.title}
              </Badge>
              <span className="text-xs text-emerald-300 font-semibold">{selectedStage.metric}</span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-white">{selectedStage.subtitle}</h3>
            <p className="text-sm text-emerald-100/90 leading-relaxed">{selectedStage.description}</p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {selectedStage.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/30">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-emerald-100 font-medium">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full lg:w-auto shrink-0">
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-700/50 text-center">
              <div className="text-xs text-emerald-300 uppercase tracking-wider">Flow Direction</div>
              <div className="text-sm font-bold text-white mt-1 flex items-center justify-center gap-2">
                <span>City Scraps</span> <ArrowRight className="w-4 h-4 text-emerald-400" /> <span>Fertile Farm</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
