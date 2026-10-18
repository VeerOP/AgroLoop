'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Building2,
  Utensils,
  Sprout,
  Truck,
  Shield,
  Calendar,
  Award,
  FileCheck,
  Package,
  ShoppingBag,
  Bot,
  Activity,
  Layers,
  Settings,
  Users,
  PieChart,
  LogOut,
  HelpCircle,
} from 'lucide-react';
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  role: UserRole;
  userName: string;
}

export function Sidebar({ role, userName }: SidebarProps) {
  const pathname = usePathname();

  const getNavItems = () => {
    switch (role) {
      case 'household':
        return [
          { href: '/dashboard/household', label: 'Overview', icon: Home },
          { href: '/dashboard/household/pickups', label: 'Schedule Pickups', icon: Calendar },
          { href: '/dashboard/household/subscription', label: 'My Plan', icon: Package },
          { href: '/dashboard/household/impact', label: 'Impact & CO₂e', icon: Activity },
          { href: '/dashboard/household/rewards', label: 'Green Rewards', icon: Award },
          { href: '/dashboard/household/profile', label: 'Profile', icon: Settings },
        ];
      case 'society':
        return [
          { href: '/dashboard/society', label: 'Society Overview', icon: Building2 },
          { href: '/dashboard/society/pickups', label: 'Bulk Pickups Log', icon: Calendar },
          { href: '/dashboard/society/compliance', label: 'BMC Compliance & Audit', icon: FileCheck },
          { href: '/dashboard/society/impact', label: 'Society ESG Impact', icon: Activity },
          { href: '/dashboard/society/flats', label: 'Wings & Flat Segregation', icon: Users },
          { href: '/dashboard/society/subscription', label: 'CHS Bulk Plan', icon: Package },
          { href: '/dashboard/society/profile', label: 'Society Profile', icon: Settings },
        ];
      case 'restaurant':
        return [
          { href: '/dashboard/restaurant', label: 'Overview', icon: Utensils },
          { href: '/dashboard/restaurant/pickups', label: 'Pickups Log', icon: Calendar },
          { href: '/dashboard/restaurant/subscription', label: 'B2B Subscription', icon: Package },
          { href: '/dashboard/restaurant/compliance', label: 'Compliance & Certs', icon: FileCheck },
          { href: '/dashboard/restaurant/impact', label: 'ESG Impact Report', icon: Activity },
          { href: '/dashboard/restaurant/profile', label: 'Business Profile', icon: Settings },
        ];
      case 'farmer':
        return [
          { href: '/dashboard/farmer', label: 'Overview', icon: Sprout },
          { href: '/dashboard/farmer/products', label: 'Organic Products', icon: Package },
          { href: '/dashboard/farmer/orders', label: 'My Orders', icon: ShoppingBag },
          { href: '/dashboard/farmer/advisor', label: 'AI Agronomist', icon: Bot },
          { href: '/dashboard/farmer/farm', label: 'My Farm & Soil', icon: Home },
          { href: '/dashboard/farmer/impact', label: 'Soil Impact', icon: Activity },
        ];
      case 'collector':
        return [
          { href: '/dashboard/collector', label: "Today's Route", icon: Truck },
          { href: '/dashboard/collector/pickups', label: 'Pickups List', icon: Calendar },
          { href: '/dashboard/collector/history', label: 'Collection History', icon: Activity },
        ];
      case 'admin':
      case 'processing_operator':
      default:
        return [
          { href: '/dashboard/admin', label: 'Command Center', icon: Shield },
          { href: '/dashboard/admin/circular-flow', label: 'Live Circular Ops', icon: Layers },
          { href: '/dashboard/admin/pickups', label: 'Pickups Logistics', icon: Truck },
          { href: '/dashboard/admin/processing', label: 'Batch Processing', icon: Sprout },
          { href: '/dashboard/admin/inventory', label: 'Inventory Stock', icon: Package },
          { href: '/dashboard/admin/orders', label: 'Farmer Orders', icon: ShoppingBag },
          { href: '/dashboard/admin/analytics', label: 'Analytics & Financials', icon: PieChart },
          { href: '/dashboard/admin/users', label: 'User Directory', icon: Users },
          { href: '/dashboard/admin/settings', label: 'System Settings', icon: Settings },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-slate-950 text-white flex flex-col justify-between border-r border-slate-800 shrink-0 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
              <Sprout className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <span className="font-black text-lg tracking-tight text-white">AGROLOOP</span>
              <div className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">{role} mode</div>
            </div>
          </Link>
        </div>

        {/* User Card */}
        <div className="p-4 mx-3 my-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between">
          <div className="overflow-hidden">
            <h5 className="font-semibold text-xs text-slate-200 truncate">{userName}</h5>
            <p className="text-[10px] text-slate-400 capitalize">{role.replace('_', ' ')} Account</p>
          </div>
          <Badge variant="amber" className="text-[9px] py-0 px-1 shrink-0">DEMO</Badge>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-2 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1">Main Menu</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150',
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-950'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                )}
              >
                <Icon className={cn('w-4 h-4', isActive ? 'text-white' : 'text-slate-400')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Switch Role */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href="/login"
          className="flex items-center gap-2 text-xs font-medium text-amber-400 hover:text-amber-300 p-2 rounded-lg hover:bg-slate-900 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Switch Demo Role</span>
        </Link>
        <Link
          href="/presentation"
          className="flex items-center gap-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 p-2 rounded-lg hover:bg-slate-900 transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Pitch Deck & Financials</span>
        </Link>
      </div>
    </aside>
  );
}
