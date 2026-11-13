'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  CircleDollarSign,
  FolderTree,
  Sliders,
  Users,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { buildBeverHeaders } from '@/lib/african-training-client';
import type {
  AfricanContributorProfile,
  AfricanTaskSubmission,
  AfricanTrainingTask,
  WithdrawalRequest,
} from '@/lib/african-training';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<AfricanTrainingTask[]>([]);
  const [submissions, setSubmissions] = useState<AfricanTaskSubmission[]>([]);
  const [profiles, setProfiles] = useState<AfricanContributorProfile[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);

  useEffect(() => {
    if (!user) return;
    let active = true;
    const headers = buildBeverHeaders(user);

    async function loadOverview() {
      try {
        const [tRes, sRes, pRes, wRes] = await Promise.all([
          fetch('/api/african-training/tasks?all=1', { headers }),
          fetch('/api/african-training/submissions', { headers }),
          fetch('/api/african-training/profile?scope=all', { headers }),
          fetch('/api/african-training/withdrawals?scope=all', { headers }),
        ]);
        const [tData, sData, pData, wData] = await Promise.all([
          tRes.json(),
          sRes.json(),
          pRes.json(),
          wRes.json(),
        ]);
        if (!active) return;
        setTasks(tData.tasks || []);
        setSubmissions(sData.submissions || []);
        setProfiles(pData.profiles || []);
        setWithdrawals(wData.withdrawals || []);
      } catch {
        // Fallback UI handles zero state
      }
    }

    loadOverview();
    return () => {
      active = false;
    };
  }, [user]);

  const pendingSubmissions = submissions.filter((s) => s.status === 'pending');
  const flaggedSubmissions = submissions.filter((s) => s.fraudFlags.length > 0);
  const pendingWithdrawals = withdrawals.filter((w) => w.status === 'pending');
  const pendingPayoutSum = pendingWithdrawals.reduce((acc, w) => acc + w.amountUsd, 0);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-2 text-[11px] font-mono">
            <span className="uppercase tracking-widest text-zinc-950 font-semibold">
              Mission Control
            </span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-500">Super-Admin Clearance</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-700">African AI Operations</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#09090B]">
            Bever Platform Command Center
          </h1>
          <p className="text-sm text-zinc-500 mt-1 max-w-2xl">
            Create and publish African AI training tasks, audit contributor quality and anti-fraud signals, and manage approved payouts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/tasks"
            className="px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium transition-colors"
          >
            Create Training Task
          </Link>
        </div>
      </div>

      {/* Live African AI Training KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500">Published Training Tasks</span>
            <Sliders className="w-4 h-4 text-zinc-400" />
          </div>
          <p className="text-3xl font-semibold text-[#09090B] tracking-tight font-mono tabular-nums">
            {tasks.filter((t) => t.status === 'published').length}
          </p>
          <span className="text-xs font-mono text-zinc-500 mt-2 block">
            {tasks.length} total tasks in catalog
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500">Submissions Awaiting Review</span>
            <CheckCircle2 className="w-4 h-4 text-zinc-400" />
          </div>
          <p className="text-3xl font-semibold text-[#09090B] tracking-tight font-mono tabular-nums">
            {pendingSubmissions.length}
          </p>
          <span className="text-xs font-mono text-amber-700 mt-2 block">
            {flaggedSubmissions.length} with fraud / quality flags
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500">Registered Contributors</span>
            <Users className="w-4 h-4 text-zinc-400" />
          </div>
          <p className="text-3xl font-semibold text-[#09090B] tracking-tight font-mono tabular-nums">
            {profiles.length}
          </p>
          <span className="text-xs font-mono text-zinc-500 mt-2 block">
            Verified African language &amp; context profiles
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500">Pending Withdrawals</span>
            <CircleDollarSign className="w-4 h-4 text-zinc-400" />
          </div>
          <p className="text-3xl font-semibold text-[#09090B] tracking-tight font-mono tabular-nums">
            ${pendingPayoutSum.toFixed(2)}
          </p>
          <span className="text-xs font-mono text-zinc-500 mt-2 block">
            {pendingWithdrawals.length} requests queued
          </span>
        </div>
      </div>

      {/* Quick Action Operations Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#09090B]">Tasks &amp; Datasets</h2>
              <FolderTree className="w-4 h-4 text-zinc-500" />
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Publish new African AI tasks, upload dataset batches, and adjust per-task rewards.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-black/[0.04]">
            <Link
              href="/admin/tasks"
              className="inline-flex items-center gap-1.5 text-xs text-[#09090B] font-medium hover:underline"
            >
              <span>Manage Tasks</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#09090B]">Submission Reviews</h2>
              <AlertTriangle className="w-4 h-4 text-zinc-500" />
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Approve or reject contributor submissions, audit fraud flags, and release task rewards.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-black/[0.04]">
            <Link
              href="/admin/reviews"
              className="inline-flex items-center gap-1.5 text-xs text-[#09090B] font-medium hover:underline"
            >
              <span>Inspect Queue ({pendingSubmissions.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#09090B]">Contributor Performance</h2>
              <Users className="w-4 h-4 text-zinc-500" />
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Monitor contributor countries, languages, accents, quality scores, and account flags.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-black/[0.04]">
            <Link
              href="/admin/contributors"
              className="inline-flex items-center gap-1.5 text-xs text-[#09090B] font-medium hover:underline"
            >
              <span>View Directory</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#09090B]">Payments &amp; Withdrawals</h2>
              <CircleDollarSign className="w-4 h-4 text-zinc-500" />
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Settle approved Mobile Money, bank, and Wise withdrawal requests cleanly.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-black/[0.04]">
            <Link
              href="/admin/payouts"
              className="inline-flex items-center gap-1.5 text-xs text-[#09090B] font-medium hover:underline"
            >
              <span>Process Payouts</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
