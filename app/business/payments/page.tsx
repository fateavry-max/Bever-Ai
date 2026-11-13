'use client';

import React, { useState } from 'react';
import {
  Building,
  CheckCircle2,
} from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

export default function BusinessPaymentsPage() {
  const [wireInstructions, setWireInstructions] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-5 border-b border-black/[0.06]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
            Payment Infrastructure
          </span>
          <span className="text-xs text-zinc-400">·</span>
          <span className="text-xs text-zinc-500 font-mono">Net-30 Enterprise Credit</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
          Payment Methods &amp; Enterprise Terms
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Manage corporate credit facilities, primary ACH debits, and verified banking routing.
        </p>
      </div>

      <FeatureStatusBanner
        featureName="Enterprise ACH Debit & Stripe Treasury Integration"
        description="Live bank account linking, automated ACH settlement, and wire reference issuance are currently in development. Account details below are illustrative samples."
      />

      {/* Active Primary Method */}
      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200/70 text-cyan-700 flex items-center justify-center shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold text-zinc-950">Commercial Checking •••• 4192 (Sample)</h3>
                <span className="text-[10px] font-mono bg-zinc-100 text-zinc-700 border border-black/[0.06] px-2 py-0.5 rounded font-medium">
                  DEFAULT
                </span>
              </div>
              <p className="text-xs text-zinc-500">Corporate ACH Debit · Net-30 Terms</p>
            </div>
          </div>

          <span className="text-xs font-mono text-amber-800 flex items-center gap-1 font-medium shrink-0">
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
            Sample Account
          </span>
        </div>
      </div>

      {/* Corporate Wire Instructions */}
      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
          <h2 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider font-mono">
            Wire &amp; SWIFT Reference Template
          </h2>
          <button
            type="button"
            onClick={() => setWireInstructions(!wireInstructions)}
            className="text-xs text-cyan-700 hover:underline cursor-pointer font-medium"
          >
            {wireInstructions ? 'Collapse' : 'View Template'}
          </button>
        </div>

        {wireInstructions && (
          <div className="p-4 rounded-xl bg-zinc-50 border border-black/[0.06] space-y-2 text-xs font-mono text-zinc-700">
            <div className="flex justify-between">
              <span className="text-zinc-500">Beneficiary:</span>
              <span className="text-zinc-950">BEVER AI Technologies Inc.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Status:</span>
              <span className="text-amber-700">Live routing numbers issued upon enterprise MSA execution</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
