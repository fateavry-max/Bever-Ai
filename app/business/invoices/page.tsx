'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Download,
  CheckCircle2,
  CreditCard,
} from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

interface Invoice {
  id: string;
  period: string;
  totalAnnotations: string;
  amount: string;
  status: 'paid' | 'open';
  invoiceDate: string;
  dueDate: string;
}

const sampleInvoices: Invoice[] = [
  {
    id: 'INV-BEV-2026-04',
    period: 'April 2026 Enterprise Consumption',
    totalAnnotations: '32,400 Rows',
    amount: '$48,600.00',
    status: 'paid',
    invoiceDate: 'May 01, 2026',
    dueDate: 'May 15, 2026',
  },
  {
    id: 'INV-BEV-2026-03',
    period: 'March 2026 Enterprise Consumption',
    totalAnnotations: '28,100 Rows',
    amount: '$42,150.00',
    status: 'paid',
    invoiceDate: 'Apr 01, 2026',
    dueDate: 'Apr 15, 2026',
  },
  {
    id: 'INV-BEV-2026-02',
    period: 'February 2026 Enterprise Consumption',
    totalAnnotations: '19,500 Rows',
    amount: '$29,250.00',
    status: 'paid',
    invoiceDate: 'Mar 01, 2026',
    dueDate: 'Mar 15, 2026',
  },
];

export default function BusinessInvoicesPage() {
  const [notice, setNotice] = useState<string | null>(null);

  const handleDownloadPdf = (id: string) => {
    setNotice(`PDF receipt generation for ${id} is in development and not connected to live billing statements yet.`);
    setTimeout(() => setNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
              Billing Ledger
            </span>
            <span className="text-xs text-zinc-400">·</span>
            <span className="text-xs text-emerald-700 font-mono">Sample Ledger Preview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            Statements &amp; Monthly Invoices
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Download certified PDF corporate tax receipts and itemized unit billing logs.
          </p>
        </div>

        <Link
          href="/business/payments"
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 transition-colors"
        >
          <CreditCard className="w-4 h-4" />
          <span>Payment Methods</span>
        </Link>
      </div>

      <FeatureStatusBanner
        featureName="Enterprise Invoicing & Stripe Billing Ledger"
        description="Automated monthly statement issuance, PDF tax receipt rendering, and live metering exports are currently in development."
      />

      {notice && (
        <div className="p-3.5 rounded-xl bg-zinc-950 text-white text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
        <h2 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider font-mono pb-2 border-b border-black/[0.06]">
          Sample Historical Statements
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-black/[0.06] text-zinc-500 font-mono text-[11px]">
                <th className="pb-3 font-medium">Invoice Number</th>
                <th className="pb-3 font-medium">Billing Period</th>
                <th className="pb-3 font-medium">Volume</th>
                <th className="pb-3 font-medium">Total Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.05] font-sans">
              {sampleInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-zinc-50/70 transition-colors">
                  <td className="py-3.5 font-mono text-cyan-700 font-semibold">{inv.id}</td>
                  <td className="py-3.5 text-zinc-950 font-medium">{inv.period}</td>
                  <td className="py-3.5 font-mono text-zinc-500">{inv.totalAnnotations}</td>
                  <td className="py-3.5 font-mono font-semibold text-zinc-950 text-sm">{inv.amount}</td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      Paid
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => handleDownloadPdf(inv.id)}
                      className="px-2.5 py-1 text-xs text-zinc-600 hover:text-zinc-950 font-mono inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
