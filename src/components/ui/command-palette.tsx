'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Package, Truck, Users, Sprout, ClipboardList, Layers } from 'lucide-react';
import { AgroLoopStore } from '@/lib/db/store';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const pickups = AgroLoopStore.getPickups();
  const batches = AgroLoopStore.getBatches();
  const products = AgroLoopStore.getProducts();
  const orders = AgroLoopStore.getOrders();

  const filteredPickups = pickups.filter(
    (p) =>
      p.customer_name?.toLowerCase().includes(query.toLowerCase()) ||
      p.customer_address?.toLowerCase().includes(query.toLowerCase()) ||
      p.id.toLowerCase().includes(query.toLowerCase())
  );

  const filteredBatches = batches.filter(
    (b) =>
      b.batch_code.toLowerCase().includes(query.toLowerCase()) ||
      b.processing_method.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  const filteredOrders = orders.filter(
    (o) =>
      o.farmer_name?.toLowerCase().includes(query.toLowerCase()) ||
      o.id.toLowerCase().includes(query.toLowerCase())
  );

  const navigate = (url: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-slate-900 border border-emerald-950/10 dark:border-emerald-500/20 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search AgroLoop (Pickups, Batches, Farmers, Products, Orders)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-base font-medium"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4">
          {/* Quick Nav Section */}
          {!query && (
            <div className="p-2 space-y-1">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Quick Navigation</div>
              <button
                onClick={() => navigate('/dashboard/admin/circular-flow')}
                className="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-xl"
              >
                <Layers className="w-4 h-4 text-emerald-600 mr-2.5" /> Live Circular Operations
              </button>
              <button
                onClick={() => navigate('/dashboard/admin/processing')}
                className="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-xl"
              >
                <Sprout className="w-4 h-4 text-emerald-600 mr-2.5" /> Processing Batches
              </button>
              <button
                onClick={() => navigate('/dashboard/farmer/advisor')}
                className="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-xl"
              >
                <Users className="w-4 h-4 text-emerald-600 mr-2.5" /> AI Agronomist Advisor
              </button>
            </div>
          )}

          {/* Batches */}
          {filteredBatches.length > 0 && (
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Processing Batches</div>
              {filteredBatches.slice(0, 3).map((b) => (
                <button
                  key={b.id}
                  onClick={() => navigate('/dashboard/admin/processing')}
                  className="w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  <div className="flex items-center">
                    <Sprout className="w-4 h-4 text-emerald-600 mr-2.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Batch {b.batch_code}</span>
                      <span className="text-xs text-slate-500 ml-2">({b.processing_method})</span>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">{b.status}</span>
                </button>
              ))}
            </div>
          )}

          {/* Pickups */}
          {filteredPickups.length > 0 && (
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Pickups</div>
              {filteredPickups.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  onClick={() => navigate('/dashboard/admin/pickups')}
                  className="w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 text-emerald-600 mr-2.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{p.customer_name}</span>
                      <span className="text-xs text-slate-500 ml-2">({p.estimated_weight_kg} kg)</span>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">{p.status}</span>
                </button>
              ))}
            </div>
          )}

          {/* Products */}
          {filteredProducts.length > 0 && (
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Products</div>
              {filteredProducts.slice(0, 3).map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => navigate('/dashboard/farmer/products')}
                  className="w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  <div className="flex items-center">
                    <Package className="w-4 h-4 text-emerald-600 mr-2.5" />
                    <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{prod.name}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">₹{prod.price}/{prod.unit}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-slate-700 dark:text-slate-300 font-mono">ESC</kbd> to exit</span>
          <span>AgroLoop Mumbai Operations</span>
        </div>
      </div>
    </div>
  );
}
