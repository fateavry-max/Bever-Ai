'use client';

import React, { useState } from 'react';
import { Download, CheckCircle2 } from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

export default function BusinessReportsPage() {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
              Quality Assurance Intelligence
            </span>
            <span className="text-xs text-zinc-400">·</span>
            <span className="text-xs text-zinc-500 font-mono">Sample Benchmark Report</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            SLA Compliance &amp; Annotator Reliability Reports
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Statistical consensus measures, gold standard injection verification, and Cohen&apos;s Kappa score distributions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setNotice('Statistical PDF & CSV QA report generation is currently in development.');
            setTimeout(() => setNotice(null), 4000);
          }}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Full QA Report</span>
        </button>
      </div>

      <FeatureStatusBanner
        featureName="Automated Inter-Rater QA Telemetry & PDF Exports"
        description="Live campaign Cohen's Kappa computation and downloadable audit reports are currently in development. Metrics shown below are illustrative target benchmarks."
      />

      {notice && (
        <div className="p-3.5 rounded-xl bg-zinc-950 text-white text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-[11px] font-mono text-zinc-500 block mb-1">Global Agreement (Cohen&apos;s Kappa)</span>
          <p className="text-3xl font-semibold text-zinc-950 tracking-tight">
            0.94 <span className="text-xs font-normal text-zinc-500 font-mono">(Target Benchmark)</span>
          </p>
          <span className="text-[10px] text-cyan-700 font-mono mt-2 block">Threshold SLA: &gt; 0.85</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-[11px] font-mono text-zinc-500 block mb-1">Gold Standard Accuracy</span>
          <p className="text-3xl font-semibold text-emerald-700 tracking-tight">99.8%</p>
          <span className="text-[10px] text-zinc-500 font-mono mt-2 block">Sample verification benchmark</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-[11px] font-mono text-zinc-500 block mb-1">Contested Rate</span>
          <p className="text-3xl font-semibold text-zinc-950 tracking-tight">0.08%</p>
          <span className="text-[10px] text-zinc-500 font-mono mt-2 block">Resolved via Senior Council</span>
        </div>
      </div>

      {/* Quality Matrix */}
      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
        <h2 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider font-mono pb-2 border-b border-black/[0.06]">
          Inter-Rater Consensus by Domain (Target Benchmarks)
        </h2>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-700">Algorithmic Code Correctness &amp; AST Proofs</span>
              <span className="text-cyan-700 font-semibold">99.4% Agreement</span>
            </div>
            <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden border border-black/[0.05]">
              <div className="h-full bg-cyan-600 w-[99.4%]" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-700">Safety &amp; Adversarial Jailbreak Boundaries</span>
              <span className="text-cyan-700 font-semibold">98.9% Agreement</span>
            </div>
            <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden border border-black/[0.05]">
              <div className="h-full bg-cyan-600 w-[98.9%]" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-700">Formal Mathematical Reasoning &amp; Derivations</span>
              <span className="text-violet-700 font-semibold">99.7% Agreement</span>
            </div>
            <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden border border-black/[0.05]">
              <div className="h-full bg-linear-to-r from-cyan-500 to-violet-600 w-[99.7%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
