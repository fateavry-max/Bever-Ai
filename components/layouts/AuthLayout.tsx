'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';
import { BeverLogo } from '@/components/BeverLogo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#09090B] flex flex-col justify-between p-4 sm:p-6 font-sans relative overflow-hidden">
      {/* Top Header */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between py-4 relative z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <BeverLogo variant="compact" subtitle="/ Auth" />
        </Link>

        <Link
          href="/"
          className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Bever</span>
        </Link>
      </header>

      {/* Main Authentication Card */}
      <main className="max-w-md w-full mx-auto my-8 relative z-10">
        <div className="bg-white border border-black/[0.08] rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="flex justify-center mb-4">
            <BeverLogo variant="card" />
          </div>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 mb-1.5 font-display">{title}</h1>
            <p className="text-xs text-zinc-500 leading-relaxed">{subtitle}</p>
          </div>

          {children}
        </div>
      </main>

      {/* Footer Security Badges */}
      <footer className="max-w-7xl mx-auto w-full text-center py-4 text-[11px] text-zinc-400 relative z-10">
        <div className="flex items-center justify-center gap-1.5 mb-1 text-zinc-500">
          <Lock className="w-3 h-3 text-zinc-400" />
          <span>Encrypted TLS 1.3 · Bever Partitioned Auth Gateway</span>
        </div>
        <p>© 2026 BEVER AI Technologies Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
