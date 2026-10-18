'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const WASTE_COLLECTION_DATA = [
  { month: 'Oct 24', household: 1200, restaurant: 3400, total: 4600 },
  { month: 'Nov 24', household: 1800, restaurant: 4200, total: 6000 },
  { month: 'Dec 24', household: 2400, restaurant: 5100, total: 7500 },
  { month: 'Jan 25', household: 3100, restaurant: 6800, total: 9900 },
  { month: 'Feb 25', household: 4200, restaurant: 8400, total: 12600 },
];

const WASTE_SOURCE_PIE = [
  { name: 'Commercial Restaurants', value: 58, color: '#047857' },
  { name: 'Urban Households', value: 27, color: '#10b981' },
  { name: 'Hostels & Canteens', value: 15, color: '#d97706' },
];

const PRODUCT_OUTPUT_DATA = [
  { product: 'Vermicompost', produced: 6400, sold: 5800 },
  { product: 'Biochar', produced: 2200, sold: 1950 },
  { product: 'Bio-Fertiliser', produced: 1800, sold: 1600 },
  { product: 'Bokashi Mix', produced: 950, sold: 810 },
];

export function WasteCollectionChart() {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={WASTE_COLLECTION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#047857" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#047857" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorHousehold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} tickFormatter={(val) => `${val / 1000}k kg`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }}
            formatter={(value: any) => [`${value} kg`, 'Waste Diverted']}
          />
          <Area type="monotone" dataKey="total" stroke="#047857" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" name="Total Waste (kg)" />
          <Area type="monotone" dataKey="household" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorHousehold)" name="Household (kg)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function WasteSourcePieChart() {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={WASTE_SOURCE_PIE}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
          >
            {WASTE_SOURCE_PIE.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }}
            formatter={(val: any) => [`${val}%`, 'Share']}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ProductOutputBarChart() {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={PRODUCT_OUTPUT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="product" stroke="#64748b" fontSize={11} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip
            contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }}
          />
          <Bar dataKey="produced" name="Batch Output (kg)" fill="#047857" radius={[6, 6, 0, 0]} />
          <Bar dataKey="sold" name="Farmer Demand (kg)" fill="#d97706" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
