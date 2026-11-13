'use client';

import React from 'react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

export default function AdminFinancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
              Treasury Controller
            </span>
            <span className="text-xs text-zinc-400">·</span>
            <span className="text-xs text-zinc-500 font-mono">Sample Treasury Metrics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            Platform Financial Ledger &amp; Treasury
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Monitor gross enterprise billings, evaluator disbursement escrows, and net platform margins.
          </p>
        </div>
      </div>

      <FeatureStatusBanner
        featureName="Live Treasury Escrow & General Ledger Feed"
        description="Real-time bank reconciliation and automated Stripe/ACH margin accounting are currently in development. Figures below are illustrative samples."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-[11px] font-mono text-zinc-500 block mb-1">Sample Gross Billings</span>
          <p className="text-3xl font-semibold text-zinc-950 tracking-tight">$648,200</p>
          <span className="text-[10px] text-cyan-700 font-mono mt-2 block">Target monthly benchmark</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-[11px] font-mono text-zinc-500 block mb-1">Sample Disbursements</span>
          <p className="text-3xl font-semibold text-cyan-700 tracking-tight">$400,600</p>
          <span className="text-[10px] text-zinc-500 font-mono mt-2 block">Direct hourly payouts</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-[11px] font-mono text-zinc-500 block mb-1">Sample Net Margin</span>
          <p className="text-3xl font-semibold text-emerald-700 tracking-tight">$247,600</p>
          <span className="text-[10px] text-emerald-700 font-mono mt-2 block">38.2% target operating margin</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-[11px] font-mono text-zinc-500 block mb-1">Sample Escrow Reserve</span>
          <p className="text-3xl font-semibold text-violet-700 tracking-tight">$1,850,000</p>
          <span className="text-[10px] text-zinc-500 font-mono mt-2 block">Treasury reserve target</span>
        </div>
      </div>
    </div>
  );
}
