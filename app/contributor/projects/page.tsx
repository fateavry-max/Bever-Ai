'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const PROJECTS = [
  {
    id: 'PRJ-PY-01',
    title: 'Python Backend & Algorithm Evaluation',
    category: 'Coding & Software Engineering',
    role: 'Senior RLHF Evaluator',
    benchmark: '$38 – $65 / hr',
    queueTasks: 24,
    status: 'Active Allocation',
    agreement: '98.4%',
  },
  {
    id: 'PRJ-MATH-03',
    title: 'Advanced Calculus & Discrete Mathematics Verifier',
    category: 'Mathematics',
    role: 'Specialist Proof Auditor',
    benchmark: '$45 – $75 / hr',
    queueTasks: 19,
    status: 'Qualified / Ready',
    agreement: '99.1%',
  },
  {
    id: 'PRJ-SEC-09',
    title: 'Adversarial Prompt & Jailbreak Safety Lab',
    category: 'Safety & Red-Teaming',
    role: 'Safety Auditor',
    benchmark: '$35 – $55 / hr',
    queueTasks: 8,
    status: 'Active Allocation',
    agreement: '97.8%',
  },
];

export default function ContributorProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-950 tracking-tight font-display">Assigned Projects & Queues</h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Projects where you have completed the prerequisite domain qualification assessment.
        </p>
      </div>

      <div className="space-y-4">
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            className="p-6 rounded-2xl bg-white border border-black/[0.06] hover:border-zinc-300 transition-all shadow-xs"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1 text-xs">
                  <span className="font-mono text-zinc-500 font-medium">
                    {p.id}
                  </span>
                  <span className="text-zinc-300">·</span>
                  <span className="text-zinc-500">{p.category}</span>
                </div>
                <h3 className="text-base font-semibold text-zinc-950 font-display">{p.title}</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Role: {p.role}</p>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <span className="text-[11px] text-zinc-400 block">Benchmark Rate</span>
                  <span className="font-mono font-semibold text-zinc-950 tabular-nums">{p.benchmark}</span>
                </div>
                <span className="text-xs font-medium text-emerald-700 flex items-center gap-1.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {p.status}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4 text-zinc-500">
                <span>Queue: <strong className="text-zinc-950 font-mono tabular-nums">{p.queueTasks} tasks</strong> available</span>
                <span className="text-zinc-300">·</span>
                <span>Inter-Annotator Agreement: <strong className="text-zinc-950 font-mono tabular-nums">{p.agreement}</strong></span>
              </div>

              <Link
                href="/contributor/tasks"
                className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Enter Project Queue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
