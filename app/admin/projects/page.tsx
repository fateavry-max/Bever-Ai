'use client';

import React from 'react';
import Link from 'next/link';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

export default function AdminProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
              Platform Campaigns
            </span>
            <span className="text-xs text-zinc-400">·</span>
            <span className="text-xs text-zinc-500 font-mono">Sample Pipeline Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            Global Project Allocations &amp; Queues
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Supervise cross-client project queues, throughput rates, annotator distribution, and active deliverables.
          </p>
        </div>
      </div>

      <FeatureStatusBanner
        featureName="Cross-Tenant Pipeline Orchestration"
        description="Live cross-client campaign throttling and automated worker pool balancing are currently in development. Pipelines below are sample records."
      />

      <div className="space-y-4">
        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-mono text-xs font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/70">
                PRJ-NEO-REASON
              </span>
              <span className="text-xs text-zinc-500 font-mono">Client: Synthetix AI Corp</span>
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                Sample
              </span>
            </div>
            <h3 className="text-base font-semibold text-zinc-950">Multi-Step Math &amp; Algorithmic Chain-of-Thought</h3>
            <p className="text-xs text-zinc-500 font-mono mt-1">
              Throughput: 18,400 / 25,000 (73%) · 142 Evaluators · Consensus: 99.4%
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/admin/tasks"
              className="px-3.5 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium transition-colors"
            >
              Manage Tasks
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-mono text-xs font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                PRJ-SAFETY-ALIGN
              </span>
              <span className="text-xs text-zinc-500 font-mono">Client: NeuraScale Frontier Models</span>
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                Sample
              </span>
            </div>
            <h3 className="text-base font-semibold text-zinc-950">Harmful Instruction Prompt Injections &amp; Jailbreak Eval</h3>
            <p className="text-xs text-zinc-500 font-mono mt-1">
              Throughput: 9,200 / 10,000 (92%) · 68 Evaluators · Consensus: 98.9%
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/admin/tasks"
              className="px-3.5 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium transition-colors"
            >
              Manage Tasks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
