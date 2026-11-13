'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  DownloadCloud,
  ChevronLeft,
  CheckCircle2,
} from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

export default function BusinessProjectDetailPage() {
  const params = useParams();
  const projectId = (params?.projectId as string) || 'PRJ-NEO-REASON';

  return (
    <div className="space-y-6">
      <div className="pb-5 border-b border-black/[0.06]">
        <Link
          href="/business/projects"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-950 font-mono mb-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-xs font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/70">
                {projectId}
              </span>
              <span className="text-xs text-emerald-700 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Sample Campaign View
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
              Multi-Step Math &amp; Algorithmic Chain-of-Thought
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              STEM &amp; Algorithmic pairwise evaluation assessing hallucination boundaries in complex formal deductions.
            </p>
          </div>

          <Link
            href="/business/deliverables"
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 transition-colors"
          >
            <DownloadCloud className="w-4 h-4" />
            <span>Export DPO Batch</span>
          </Link>
        </div>
      </div>

      <FeatureStatusBanner
        featureName="Per-Campaign Telemetry & Live Rubric Consensus"
        description="Per-campaign metrics and rubric consensus drilldowns are currently in development. Shown metrics are illustrative sample targets."
      />

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-[11px] font-mono text-zinc-500 block mb-1">Sample Throughput</span>
          <p className="text-2xl font-semibold text-zinc-950 tracking-tight">18,400 / 25,000</p>
          <span className="text-[10px] text-cyan-700 font-mono mt-1 block">73.6% complete</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-[11px] font-mono text-zinc-500 block mb-1">Inter-Annotator Agreement</span>
          <p className="text-2xl font-semibold text-emerald-700 tracking-tight">99.4%</p>
          <span className="text-[10px] text-zinc-500 font-mono mt-1 block">Cohen&apos;s Kappa: 0.94</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-[11px] font-mono text-zinc-500 block mb-1">Allocated Pool (Sample)</span>
          <p className="text-2xl font-semibold text-violet-700 tracking-tight">142</p>
          <span className="text-[10px] text-zinc-500 font-mono mt-1 block">Tier-1 MS/PhD Specialists</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-[11px] font-mono text-zinc-500 block mb-1">Gold Test Target</span>
          <p className="text-2xl font-semibold text-cyan-700 tracking-tight">99.8%</p>
          <span className="text-[10px] text-zinc-500 font-mono mt-1 block">Double-blind audit target</span>
        </div>
      </div>

      {/* Rubric Breakdown Matrix */}
      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
        <h2 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider font-mono pb-2 border-b border-black/[0.06]">
          Rubric Dimension Consensus (Sample)
        </h2>

        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-700">Algorithmic &amp; Math Step Correctness</span>
              <span className="text-cyan-700 font-semibold">99.6% Agreement</span>
            </div>
            <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden border border-black/[0.05]">
              <div className="h-full bg-cyan-600 w-[99.6%]" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-700">LaTeX Proof Formatting &amp; Typesetting</span>
              <span className="text-cyan-700 font-semibold">99.1% Agreement</span>
            </div>
            <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden border border-black/[0.05]">
              <div className="h-full bg-cyan-600 w-[99.1%]" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-700">Hallucination &amp; Fake Axiom Flagging</span>
              <span className="text-violet-700 font-semibold">99.5% Agreement</span>
            </div>
            <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden border border-black/[0.05]">
              <div className="h-full bg-violet-600 w-[99.5%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
