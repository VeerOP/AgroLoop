'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, Search, Sprout, CheckCircle, ShieldAlert } from 'lucide-react';
import { AgroLoopStore } from '@/lib/db/store';
import { UserRole } from '@/types';
import { Badge } from '@/components/ui/badge';
import { CommandPalette } from '@/components/ui/command-palette';

interface RoleHeaderProps {
  role: UserRole;
  title: string;
  subtitle?: string;
}

export function RoleHeader({ role, title, subtitle }: RoleHeaderProps) {
  const user = AgroLoopStore.getCurrentUser(role);
  const notifications = AgroLoopStore.getNotifications(user.id);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <>
      <header className="bg-white dark:bg-slate-900 border-b border-emerald-950/10 dark:border-emerald-500/10 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">{title}</h1>
            <Badge variant="default" className="text-[10px] uppercase">{user.city}</Badge>
          </div>
          {subtitle && <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {/* Cmd+K Search Button */}
          <button
            onClick={() => {
              const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
              window.dispatchEvent(event);
            }}
            className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 px-3 py-1.5 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search AgroLoop...</span>
            <kbd className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-1.5 py-0.5 text-[10px] font-mono shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 relative transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifs && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">Notifications</h4>
                  <Badge variant="outline" className="text-[10px]">{notifications.length} Total</Badge>
                </div>
                <div className="max-h-64 overflow-y-auto space-y-2 py-2">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-4">No notifications yet.</p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{n.title}</span>
                          <span className="text-[10px] text-slate-400">Just now</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-snug">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar Pill */}
          <Link href={`/dashboard/${role}/profile`} className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <img
              src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
              alt={user.full_name}
              className="w-8 h-8 rounded-full object-cover border border-emerald-500"
            />
            <div className="hidden lg:block text-left">
              <div className="font-semibold text-xs text-slate-900 dark:text-slate-100 truncate max-w-[120px]">
                {user.full_name}
              </div>
              <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium capitalize">
                {role}
              </div>
            </div>
          </Link>
        </div>
      </header>

      {/* Global Command Palette */}
      <CommandPalette />
    </>
  );
}
