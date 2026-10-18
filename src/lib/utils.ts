import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Indian Rupee Currency Formatter
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// Compact Indian Currency Formatter (e.g. ₹18L, ₹2.25Cr)
export function formatCompactINR(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} Lakhs`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)} k`;
  }
  return formatINR(amount);
}

// Weight Formatter (kg or tonnes)
export function formatWeight(kg: number): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(2)} Tonnes`;
  }
  return `${kg.toLocaleString('en-IN')} kg`;
}

// Date Formatter (DD MMM YYYY)
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

// Role Label Formatter
export function getRoleLabel(role: string): string {
  const map: Record<string, string> = {
    admin: 'AgroLoop Operations Admin',
    household: 'Urban Household Partner',
    restaurant: 'Commercial Restaurant Partner',
    farmer: 'Progressive Farmer',
    collector: 'Waste Logistics Collector',
    processing_operator: 'Bio-Processing Operator',
  };
  return map[role] || role;
}
