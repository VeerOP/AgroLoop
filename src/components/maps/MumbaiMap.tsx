'use client';

import React, { useState } from 'react';
import { MapPin, Home, Utensils, Truck, Factory, Sprout, Navigation, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface MapMarker {
  id: string;
  name: string;
  type: 'household' | 'restaurant' | 'collector' | 'processing' | 'farmer';
  address: string;
  lat: number;
  lng: number;
  details: string;
}

const MUMBAI_DEMO_LOCATIONS: MapMarker[] = [
  {
    id: 'hub-01',
    name: 'AgroLoop Central Processing Hub',
    type: 'processing',
    address: 'MIDC Industrial Area, Mahape, Navi Mumbai',
    lat: 19.1075,
    lng: 73.0163,
    details: 'Active Vermicomposting & Biochar Pyrolysis Units (Capacity: 50 MT/month)',
  },
  {
    id: 'hh-01',
    name: 'Priya Sharma (Household)',
    type: 'household',
    address: 'B-402, Sea Green Apartments, Bandra West',
    lat: 19.0596,
    lng: 72.8295,
    details: 'Weekly Green Subscription • Scheduled Today (4.2 kg waste)',
  },
  {
    id: 'hh-02',
    name: 'Ananya & Rohan Joshi',
    type: 'household',
    address: 'Green Acres, Hiranandani Gardens, Powai',
    lat: 19.1197,
    lng: 72.9051,
    details: 'Bi-Weekly Subscriber • Diverted 140 kg YTD',
  },
  {
    id: 'rest-01',
    name: 'Spice Garden Bistro',
    type: 'restaurant',
    address: 'Linking Road, Bandra West',
    lat: 19.0607,
    lng: 72.8362,
    details: 'Daily Commercial Collection • 52.4 kg organic scraps collected today',
  },
  {
    id: 'coll-01',
    name: 'Suresh Gaikwad (E-Rickshaw Loader)',
    type: 'collector',
    address: 'Dadar Central Route Depot',
    lat: 19.0178,
    lng: 72.8478,
    details: 'EV Loader MH-01-EV-4829 • 12/15 Pickups Completed Today',
  },
  {
    id: 'farm-01',
    name: 'Ramkisan Patil Farm',
    type: 'farmer',
    address: 'Manor-Palghar Belt, Palghar District',
    lat: 19.6967,
    lng: 72.7699,
    details: '1.8 Acres (Onion & Tomato) • Ordered 100 kg Vermicompost + 8L Bio-Fertiliser',
  },
  {
    id: 'farm-02',
    name: 'Sahyadri Organic Cluster FPO',
    type: 'farmer',
    address: 'Shahapur & Vasai Agricultural Belt',
    lat: 19.4500,
    lng: 73.1500,
    details: 'FPO Partner (45 farmers) • Biochar matrix trial block',
  },
];

export function MumbaiMap() {
  const [activeFilter, setActiveFilter] = useState<'all' | MapMarker['type']>('all');
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(MUMBAI_DEMO_LOCATIONS[0]);

  const filtered = MUMBAI_DEMO_LOCATIONS.filter((m) => activeFilter === 'all' || m.type === activeFilter);

  const getMarkerIcon = (type: MapMarker['type']) => {
    switch (type) {
      case 'processing':
        return <Factory className="w-4 h-4 text-purple-600" />;
      case 'household':
        return <Home className="w-4 h-4 text-emerald-600" />;
      case 'restaurant':
        return <Utensils className="w-4 h-4 text-amber-600" />;
      case 'collector':
        return <Truck className="w-4 h-4 text-blue-600" />;
      case 'farmer':
        return <Sprout className="w-4 h-4 text-green-700" />;
    }
  };

  const getMarkerColor = (type: MapMarker['type']) => {
    switch (type) {
      case 'processing':
        return 'bg-purple-100 border-purple-500 text-purple-800';
      case 'household':
        return 'bg-emerald-100 border-emerald-500 text-emerald-800';
      case 'restaurant':
        return 'bg-amber-100 border-amber-500 text-amber-800';
      case 'collector':
        return 'bg-blue-100 border-blue-500 text-blue-800';
      case 'farmer':
        return 'bg-green-100 border-green-600 text-green-900';
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
      {/* Map Controls */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-emerald-400" />
          <h4 className="font-semibold text-slate-100 text-sm">Mumbai Metropolitan Circular Ecosystem Map</h4>
          <Badge variant="success" className="text-[10px]">Live Simulation</Badge>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-lg transition-colors font-medium ${
              activeFilter === 'all' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Locations ({MUMBAI_DEMO_LOCATIONS.length})
          </button>
          <button
            onClick={() => setActiveFilter('processing')}
            className={`px-3 py-1 rounded-lg transition-colors font-medium flex items-center gap-1 ${
              activeFilter === 'processing' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Processing Hub
          </button>
          <button
            onClick={() => setActiveFilter('household')}
            className={`px-3 py-1 rounded-lg transition-colors font-medium flex items-center gap-1 ${
              activeFilter === 'household' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Households
          </button>
          <button
            onClick={() => setActiveFilter('restaurant')}
            className={`px-3 py-1 rounded-lg transition-colors font-medium flex items-center gap-1 ${
              activeFilter === 'restaurant' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Restaurants
          </button>
          <button
            onClick={() => setActiveFilter('collector')}
            className={`px-3 py-1 rounded-lg transition-colors font-medium flex items-center gap-1 ${
              activeFilter === 'collector' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Collectors
          </button>
          <button
            onClick={() => setActiveFilter('farmer')}
            className={`px-3 py-1 rounded-lg transition-colors font-medium flex items-center gap-1 ${
              activeFilter === 'farmer' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Farmers
          </button>
        </div>
      </div>

      {/* Interactive Map Visualizer */}
      <div className="relative min-h-[380px] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] bg-slate-950 p-6 flex flex-col justify-between overflow-hidden">
        {/* Decorative Grid SVG background styling Mumbai Coastline & Thane Creek */}
        <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
          <svg className="w-full h-full stroke-emerald-500/30" viewBox="0 0 800 500">
            {/* Simulated Thane Creek & Coastline */}
            <path d="M 120 50 Q 160 200 220 300 T 350 480" fill="none" strokeWidth="8" stroke="#0284c7" />
            <path d="M 280 150 Q 320 280 420 400" fill="none" strokeWidth="6" stroke="#0369a1" />
            <circle cx="400" cy="250" r="180" fill="none" strokeWidth="1" strokeDasharray="4,4" />
          </svg>
        </div>

        {/* Nodes Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedMarker(item)}
              className={`p-3.5 rounded-xl text-left border transition-all duration-200 flex items-start justify-between gap-3 ${
                selectedMarker?.id === item.id
                  ? 'bg-slate-800/90 border-emerald-500 shadow-lg scale-[1.02]'
                  : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg border ${getMarkerColor(item.type)} shrink-0`}>
                  {getMarkerIcon(item.type)}
                </div>
                <div>
                  <h5 className="font-semibold text-slate-100 text-sm leading-snug">{item.name}</h5>
                  <p className="text-xs text-slate-400 mt-0.5">{item.address}</p>
                </div>
              </div>
              <MapPin className={`w-4 h-4 shrink-0 ${selectedMarker?.id === item.id ? 'text-emerald-400' : 'text-slate-600'}`} />
            </button>
          ))}
        </div>

        {/* Selected Marker Detail Card */}
        {selectedMarker && (
          <div className="relative z-10 mt-4 p-4 rounded-xl bg-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${getMarkerColor(selectedMarker.type)}`}>
                {getMarkerIcon(selectedMarker.type)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-400 text-sm">{selectedMarker.name}</span>
                  <Badge variant="outline" className="text-[10px] uppercase">{selectedMarker.type}</Badge>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">{selectedMarker.details}</p>
              </div>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 self-end sm:self-center">
              <Info className="w-4 h-4 text-emerald-400" />
              <span>GPS: {selectedMarker.lat.toFixed(4)} N, {selectedMarker.lng.toFixed(4)} E</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Alias for backwards compatibility
export const PuneMap = MumbaiMap;
