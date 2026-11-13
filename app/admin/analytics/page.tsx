'use client';

import React from 'react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
              Telemetry Analytics
            </span>
            <span className="text-xs text-zinc-400">·</span>
            <span className="text-xs text-zinc-500 font-mono">Sample Telemetry Targets</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            Platform Throughput &amp; Model Analytics
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Cross-cluster throughput velocity, model preference convergence metrics, and task latency percentiles.
          </p>
        </div>
      </div>

      <FeatureStatusBanner
        featureName="Real-Time Telemetry Warehouse & Latency Pipelines"
        description="ClickHouse / BigQuery real-time throughput aggregation and interactive convergence charts are currently in development."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-[11px] font-mono text-zinc-500 block mb-1">p95 Evaluator Latency (Target)</span>
          <p className="text-3xl font-semibold text-zinc-950 tracking-tight">
            18.4 <span className="text-sm font-normal text-zinc-500 font-mono">mins</span>
          </p>
          <span className="text-[10px] text-cyan-700 font-mono mt-2 block">Within 30m allocated cap</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-[11px] font-mono text-zinc-500 block mb-1">Peak Concurrency (Sample)</span>
          <p className="text-3xl font-semibold text-zinc-950 tracking-tight">2,140</p>
          <span className="text-[10px] text-zinc-500 font-mono mt-2 block">Simultaneous task sessions</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-[11px] font-mono text-zinc-500 block mb-1">Inter-Annotator Kappa (Target)</span>
          <p className="text-3xl font-semibold text-emerald-700 tracking-tight">0.941</p>
          <span className="text-[10px] text-emerald-700 font-mono mt-2 block">Platform-wide reliability target</span>
        </div>
      </div>
    </div>
  );
}
