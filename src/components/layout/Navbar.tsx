'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sprout, Menu, X, ArrowRight, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center text-white transition-transform group-hover:scale-105">
            <Sprout className="w-5 h-5 text-emerald-100" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white leading-tight">
              AGROLOOP
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-none">
              Urban Waste to Soil Health
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/how-it-works" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
            How It Works
          </Link>
          <Link href="/processing-journey" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-semibold text-emerald-800 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Waste to Compost
          </Link>
          <Link href="/products" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
            Organic Inputs
          </Link>
          <Link href="/impact" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
            Impact
          </Link>
          <Link href="/about" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
            About
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/login">
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
              <UserCheck className="w-4 h-4 mr-1.5 text-slate-500" />
              Demo Roles
            </Button>
          </Link>
          <Link href="/dashboard/household">
            <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium shadow-sm">
              Launch App <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-5 space-y-3">
          <Link href="/how-it-works" className="block py-2 text-sm font-medium text-slate-800 dark:text-slate-200">
            How It Works
          </Link>
          <Link href="/processing-journey" className="block py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            🌱 Waste to Compost Journey
          </Link>
          <Link href="/products" className="block py-2 text-sm font-medium text-slate-800 dark:text-slate-200">
            Organic Inputs
          </Link>
          <Link href="/impact" className="block py-2 text-sm font-medium text-slate-800 dark:text-slate-200">
            Impact
          </Link>
          <Link href="/about" className="block py-2 text-sm font-medium text-slate-800 dark:text-slate-200">
            About
          </Link>
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/login">
              <Button variant="outline" className="w-full">
                Demo Roles
              </Button>
            </Link>
            <Link href="/dashboard/household">
              <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
