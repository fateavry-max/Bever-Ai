'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  Search,
  ArrowUpRight,
} from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

interface Project {
  id: string;
  name: string;
  category: string;
  totalVolume: number;
  completedVolume: number;
  agreementRate: string;
  annotatorPool: number;
  status: 'active' | 'in_calibration' | 'completed';
  createdAt: string;
}

const sampleProjects: Project[] = [
  {
    id: 'PRJ-NEO-REASON',
    name: 'Multi-Step Math & Algorithmic Chain-of-Thought',
    category: 'STEM & Reasoning',
    totalVolume: 25000,
    completedVolume: 18400,
    agreementRate: '99.4%',
    annotatorPool: 142,
    status: 'active',
    createdAt: 'Apr 12, 2026',
  },
  {
    id: 'PRJ-SAFETY-ALIGN',
    name: 'Harmful Instruction Prompt Injections & Jailbreak Eval',
    category: 'Safety & Red-Teaming',
    totalVolume: 10000,
    completedVolume: 9200,
    agreementRate: '98.9%',
    annotatorPool: 68,
    status: 'active',
    createdAt: 'Apr 20, 2026',
  },
  {
    id: 'PRJ-SYNTH-CODE',
    name: 'Python AST Code Optimization & Edge-Case Rubric',
    category: 'Software Engineering',
    totalVolume: 15000,
    completedVolume: 6100,
    agreementRate: '98.7%',
    annotatorPool: 84,
    status: 'active',
    createdAt: 'May 02, 2026',
  },
  {
    id: 'PRJ-LEGAL-EXTRACT',
    name: 'Bilingual Contract Ambiguity Resolution (FR/EN)',
    category: 'Linguistics & Law',
    totalVolume: 5000,
    completedVolume: 5000,
    agreementRate: '99.6%',
    annotatorPool: 18,
    status: 'completed',
    createdAt: 'Mar 15, 2026',
  },
];

export default function BusinessProjectsPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [search, setSearch] = useState('');

  const filtered = sampleProjects.filter((p) => {
    const matchesFilter = filter === 'all' || p.status === filter;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
              Campaign Manager
            </span>
            <span className="text-xs text-zinc-400">·</span>
            <span className="text-xs text-zinc-500 font-mono">4 Sample Campaigns</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            Active Data Campaigns &amp; Projects
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Track annotator allocation, completion velocity, inter-rater reliability, and deliverables per campaign.
          </p>
        </div>

        <Link
          href="/business/projects/new"
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Project</span>
        </Link>
      </div>

      <FeatureStatusBanner
        featureName="Live Enterprise Campaign Sync"
        description="Real-time production campaign orchestration and throughput metering are currently in development. Representative sample campaigns are shown below."
      />

      {/* Filter and Search */}
      <div className="p-4 rounded-xl bg-white border border-black/[0.06] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          {(['all', 'active', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors cursor-pointer ${
                filter === tab
                  ? 'bg-zinc-950 text-white font-semibold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search campaigns by name or ID..."
            className="w-full md:w-64 bg-zinc-50 border border-black/[0.09] rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:border-zinc-950"
          />
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filtered.map((proj) => {
          const percent = Math.round((proj.completedVolume / proj.totalVolume) * 100);
          const isActive = proj.status === 'active';

          return (
            <div
              key={proj.id}
              className="p-6 rounded-2xl bg-white border border-black/[0.06] hover:border-black/[0.12] shadow-xs transition-all space-y-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded border border-cyan-200/70">
                      {proj.id}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">{proj.category}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase border ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-zinc-100 text-zinc-600 border-black/[0.06]'
                      }`}
                    >
                      {proj.status}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-zinc-950">{proj.name}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/business/projects/${proj.id}`}
                    className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200/80 text-zinc-950 text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span>Inspect Analytics</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Progress and metrics */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">
                    Sample Throughput: {proj.completedVolume.toLocaleString()} / {proj.totalVolume.toLocaleString()} ({percent}%)
                  </span>
                  <span className="text-cyan-700 font-medium">Target SLA Agreement: {proj.agreementRate}</span>
                </div>
                <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden border border-black/[0.05]">
                  <div
                    className="h-full bg-linear-to-r from-cyan-500 to-violet-600"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-500 pt-2 border-t border-black/[0.05] font-mono">
                <span>Sample Annotator Pool: {proj.annotatorPool} Specialists</span>
                <span>Initiated: {proj.createdAt}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
