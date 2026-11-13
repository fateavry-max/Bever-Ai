'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Search,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { buildBeverHeaders } from '@/lib/african-training-client';
import type { AfricanTaskSubmission } from '@/lib/african-training';

export default function ContributorSubmissionsPage() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<AfricanTaskSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!user) return;
    let active = true;
    async function loadSubmissions() {
      try {
        const res = await fetch('/api/african-training/submissions', {
          headers: buildBeverHeaders(user),
        });
        const data = await res.json();
        if (active) setSubmissions(data.submissions || []);
      } catch {
        // Handled cleanly
      } finally {
        if (active) setLoading(false);
      }
    }
    loadSubmissions();
    return () => {
      active = false;
    };
  }, [user]);

  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      const matchesFilter = filter === 'all' || s.status === filter;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.taskTitle.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.language.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [submissions, filter, search]);

  const approvedTotal = submissions
    .filter((s) => s.status === 'approved')
    .reduce((acc, s) => acc + s.rewardUsd, 0);
  const pendingTotal = submissions
    .filter((s) => s.status === 'pending')
    .reduce((acc, s) => acc + s.rewardUsd, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
            African AI Training Ledger
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight font-display">
            Submissions &amp; Approval Status
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Track pending verification, approved rewards, quality scores, and administrator feedback on your completed tasks.
          </p>
        </div>

        <Link
          href="/contributor/tasks"
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 shadow-xs transition-all"
        >
          <span>Start Another Task</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-xs text-zinc-500 block mb-1">Total Submissions</span>
          <p className="text-2xl font-semibold font-mono text-zinc-950 tabular-nums">
            {submissions.length}
          </p>
          <span className="text-[11px] text-zinc-400 font-mono mt-1 block">Recorded on server</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-xs text-zinc-500 block mb-1">Approved Earnings</span>
          <p className="text-2xl font-semibold font-mono text-emerald-700 tabular-nums">
            ${approvedTotal.toFixed(2)}
          </p>
          <span className="text-[11px] text-zinc-500 font-mono mt-1 block">Eligible for withdrawal</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-xs text-zinc-500 block mb-1">Pending Review Value</span>
          <p className="text-2xl font-semibold font-mono text-zinc-950 tabular-nums">
            ${pendingTotal.toFixed(2)}
          </p>
          <span className="text-[11px] text-zinc-400 font-mono mt-1 block">Locked until approved</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-xs text-zinc-500 block mb-1">Rejected Submissions</span>
          <p className="text-2xl font-semibold font-mono text-zinc-950 tabular-nums">
            {submissions.filter((s) => s.status === 'rejected').length}
          </p>
          <span className="text-[11px] text-zinc-400 font-mono mt-1 block">Excluded from payout</span>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="p-4 rounded-xl bg-white border border-black/[0.06] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {(['all', 'approved', 'pending', 'rejected'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors cursor-pointer shrink-0 ${
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
            placeholder="Search ID, category, language..."
            className="w-full md:w-64 bg-zinc-50 border border-zinc-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:border-zinc-950"
          />
        </div>
      </div>

      {/* Submission Cards */}
      {loading ? (
        <div className="p-8 rounded-xl bg-white border border-black/[0.06] text-xs font-mono text-zinc-500">
          Loading submissions...
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-10 rounded-2xl bg-white border border-black/[0.06] text-center space-y-3">
          <p className="text-sm font-semibold text-zinc-950">No submissions found</p>
          <p className="text-xs text-zinc-500">
            Complete an African AI Training task to see its approval status and reward tracking here.
          </p>
          <Link
            href="/contributor/tasks"
            className="inline-flex px-4 py-2 rounded-xl bg-zinc-950 text-white text-xs font-medium"
          >
            Browse Tasks
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((sub) => (
            <div
              key={sub.id}
              className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-xs space-y-3"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono font-semibold text-zinc-900">{sub.id}</span>
                  <span className="text-zinc-300">·</span>
                  <span className="font-semibold text-zinc-950">{sub.taskTitle}</span>
                  <span className="text-zinc-300">·</span>
                  <span className="font-mono text-zinc-500">{sub.category}</span>
                  <span className="text-zinc-300">·</span>
                  <span className="font-mono text-zinc-500">{sub.language}</span>
                </div>

                <div className="flex items-center gap-3 text-xs shrink-0">
                  {sub.status === 'approved' && (
                    <span className="inline-flex items-center gap-1 font-mono text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approved
                    </span>
                  )}
                  {sub.status === 'pending' && (
                    <span className="inline-flex items-center gap-1 font-mono text-amber-700 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      Pending Review
                    </span>
                  )}
                  {sub.status === 'rejected' && (
                    <span className="inline-flex items-center gap-1 font-mono text-rose-700 font-semibold">
                      <XCircle className="w-3.5 h-3.5" />
                      Rejected
                    </span>
                  )}
                  <span className="font-mono font-semibold text-zinc-950 tabular-nums">
                    ${sub.rewardUsd.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#FBFBFA] border border-black/[0.05] text-xs text-zinc-800">
                <span className="font-mono text-[10px] text-zinc-400 uppercase block mb-0.5">
                  Submitted Answer
                </span>
                <p>{sub.responsePayload.primaryAnswer}</p>
              </div>

              {sub.reviewNotes && (
                <div className="p-3 rounded-lg bg-zinc-50 border border-black/[0.06] text-xs text-zinc-700 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-zinc-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-400 font-mono text-[10px] block mb-0.5">
                      Admin Review Note
                    </span>
                    <span>{sub.reviewNotes}</span>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400 pt-2 border-t border-zinc-100 font-mono">
                <span>Submitted: {new Date(sub.submittedAt).toLocaleString()}</span>
                <span>
                  Quality Score:{' '}
                  {sub.qualityScore !== null ? `${sub.qualityScore}%` : 'Awaiting audit'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
