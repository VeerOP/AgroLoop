import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'AgroLoop — Kitchen Scraps into Valuable Agricultural Inputs',
  description: 'Closing the Loop Between City Waste & Farm Need in Mumbai, Maharashtra. Urban kitchen waste collection, bio-conversion into vermicompost & biochar, and AI agricultural advisory for farmers.',
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#047857',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-earth-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased min-h-screen flex flex-col selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
