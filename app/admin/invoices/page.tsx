'use client';

import React from 'react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

export default function AdminInvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
              Accounts Receivable
            </span>
            <span className="text-xs text-zinc-400">·</span>
            <span className="text-xs text-zinc-500 font-mono">Sample Receivables Ledger</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            Enterprise Client Billing &amp; Invoices
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Audit all enterprise receivables, Net-30 statements, and corporate wire reconciliation records.
          </p>
        </div>
      </div>

      <FeatureStatusBanner
        featureName="Automated Net-30 Accounts Receivable Sync"
        description="Live Stripe Invoice webhooks and wire reconciliation matching are currently in development. Rows shown below are illustrative examples."
      />

      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-black/[0.06] text-zinc-500 font-mono text-[11px]">
                <th className="pb-3 font-medium">Invoice #</th>
                <th className="pb-3 font-medium">Enterprise Client</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.05] font-sans">
              <tr className="hover:bg-zinc-50/70">
                <td className="py-3.5 font-mono text-cyan-700 font-semibold">INV-BEV-2026-04</td>
                <td className="py-3.5 text-zinc-950 font-medium">Synthetix AI Corp</td>
                <td className="py-3.5 font-mono font-semibold text-zinc-950">$48,600.00</td>
                <td className="py-3.5">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-semibold">
                    PAID (SAMPLE)
                  </span>
                </td>
                <td className="py-3.5 font-mono text-zinc-500">May 15, 2026</td>
              </tr>
              <tr className="hover:bg-zinc-50/70">
                <td className="py-3.5 font-mono text-cyan-700 font-semibold">INV-BEV-2026-05</td>
                <td className="py-3.5 text-zinc-950 font-medium">Apex Cognition Labs</td>
                <td className="py-3.5 font-mono font-semibold text-zinc-950">$32,100.00</td>
                <td className="py-3.5">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-semibold">
                    PAID (SAMPLE)
                  </span>
                </td>
                <td className="py-3.5 font-mono text-zinc-500">May 20, 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
