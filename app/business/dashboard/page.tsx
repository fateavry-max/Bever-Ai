'use client';

import React from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  DownloadCloud,
  PlusCircle,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function BusinessDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Enterprise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs">
            <span className="font-mono text-zinc-500 font-medium">Enterprise Console</span>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-700 font-medium font-mono">SLA Guarantee: 99.9%</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight font-display">
            Organization Workspace: {user?.orgName || 'Synthetix AI Corp'}
          </h1>
          <p className="text-xs text-zinc-500 mt-1 max-w-xl">
            Monitor real-time human RLHF throughput, inter-annotator consensus curves, and dataset deliverable batches.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/business/projects/new"
            className="px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Launch New Campaign</span>
          </Link>
        </div>
      </div>

      {/* Enterprise KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-500">Total Annotations</span>
            <span className="text-[11px] font-mono text-zinc-400">30 Days</span>
          </div>
          <p className="text-3xl font-semibold font-mono text-zinc-950 tabular-nums">48,290</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-700 font-medium font-mono">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>+14.2% vs last month</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-500">Active Contributors</span>
            <span className="text-[11px] font-mono text-zinc-400">Tier 1</span>
          </div>
          <p className="text-3xl font-semibold font-mono text-zinc-950 tabular-nums">312</p>
          <span className="text-xs text-zinc-400 mt-2 block">Vetted CS & Math specialists</span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-500">Consensus Agreement</span>
            <span className="text-[11px] font-mono text-emerald-700 font-medium">Gold Standard</span>
          </div>
          <p className="text-3xl font-semibold font-mono text-emerald-700 tabular-nums">99.1%</p>
          <span className="text-xs text-zinc-400 mt-2 block">Exceeds 98.0% SLA minimum</span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-500">Average Turnaround</span>
            <span className="text-[11px] font-mono text-zinc-400">Real-Time</span>
          </div>
          <p className="text-3xl font-semibold font-mono text-zinc-950 tabular-nums">3.4 <span className="text-sm font-normal text-zinc-400">hrs</span></p>
          <span className="text-xs text-zinc-400 mt-2 block">From prompt dispatch to export</span>
        </div>
      </div>

      {/* Active Enterprise Projects Table */}
      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
          <div className="flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-zinc-950" />
            <h2 className="text-sm font-semibold text-zinc-950 font-display">
              Live Annotation Campaigns
            </h2>
          </div>
          <Link
            href="/business/projects"
            className="text-xs text-zinc-600 hover:text-zinc-950 font-medium flex items-center gap-1 transition-colors"
          >
            <span>View All (4)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-500 font-medium">
                  PRJ-NEO-REASON
                </span>
                <span className="text-zinc-300">·</span>
                <span className="text-xs font-semibold text-zinc-950">Multi-Step Algorithmic Reasoning & Proofs</span>
              </div>
              <p className="text-xs text-zinc-500">
                Pairwise ranking of mathematical explanations and formal code proofs with LaTeX justification.
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs font-mono shrink-0">
              <div>
                <span className="text-zinc-400 block text-[11px]">Progress</span>
                <span className="text-zinc-950 font-semibold tabular-nums">18,400 / 25,000 (73%)</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[11px]">Agreement</span>
                <span className="text-emerald-700 font-semibold tabular-nums">99.4%</span>
              </div>
              <Link
                href="/business/projects/PRJ-NEO-REASON"
                className="px-3.5 py-1.5 rounded-lg bg-white border border-zinc-200/80 hover:bg-zinc-100 text-zinc-900 text-xs font-medium transition-colors"
              >
                Inspect
              </Link>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-500 font-medium">
                  PRJ-SAFETY-ALIGN
                </span>
                <span className="text-zinc-300">·</span>
                <span className="text-xs font-semibold text-zinc-950">Adversarial Jailbreak & Safety Red-Teaming</span>
              </div>
              <p className="text-xs text-zinc-500">
                Multi-turn boundary testing, prompt injection resistance, and ethical constraint evaluation.
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs font-mono shrink-0">
              <div>
                <span className="text-zinc-400 block text-[11px]">Progress</span>
                <span className="text-zinc-950 font-semibold tabular-nums">9,200 / 10,000 (92%)</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[11px]">Agreement</span>
                <span className="text-emerald-700 font-semibold tabular-nums">98.9%</span>
              </div>
              <Link
                href="/business/projects/PRJ-SAFETY-ALIGN"
                className="px-3.5 py-1.5 rounded-lg bg-white border border-zinc-200/80 hover:bg-zinc-100 text-zinc-900 text-xs font-medium transition-colors"
              >
                Inspect
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Deliverable Batch Ready Card */}
      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-950">
            <DownloadCloud className="w-5 h-5 text-zinc-800" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-950 font-display">Fresh Deliverable Batch Ready for Export</h3>
            <p className="text-xs text-zinc-500">
              Batch #812 containing 4,200 validated pairwise preference rows (JSONL / Parquet) formatted for DPO/PPO training.
            </p>
          </div>
        </div>

        <Link
          href="/business/deliverables"
          className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs rounded-xl shadow-xs transition-colors shrink-0"
        >
          Export Datasets
        </Link>
      </div>
    </div>
  );
}
