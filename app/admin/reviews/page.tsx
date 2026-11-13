'use client';

import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  XCircle,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { buildBeverHeaders } from '@/lib/african-training-client';
import type { AfricanTaskSubmission } from '@/lib/african-training';

export default function AdminReviewsPage() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<AfricanTaskSubmission[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'flagged' | 'approved' | 'rejected'>(
    'all'
  );
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);
  const [notesById, setNotesById] = useState<Record<string, string>>({});
  const [scoreById, setScoreById] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!user) return;
    let active = true;
    async function load() {
      try {
        const res = await fetch('/api/african-training/submissions', {
          headers: buildBeverHeaders(user),
        });
        const data = await res.json();
        if (active) setSubmissions(data.submissions || []);
      } catch {
        // Ignored
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [user]);

  const handleDecision = async (
    sub: AfricanTaskSubmission,
    decision: 'approved' | 'rejected'
  ) => {
    if (!user) return;
    const reviewNotes =
      notesById[sub.id]?.trim() ||
      (decision === 'approved'
        ? 'Verified cultural accuracy and rubric compliance.'
        : 'Submission requires higher linguistic precision or failed anti-fraud threshold.');
    const qualityScore =
      scoreById[sub.id] !== undefined
        ? scoreById[sub.id]
        : decision === 'approved'
        ? 96
        : 45;

    try {
      const res = await fetch(`/api/african-training/submissions/${sub.id}`, {
        method: 'PATCH',
        headers: buildBeverHeaders(user),
        body: JSON.stringify({
          status: decision,
          qualityScore,
          reviewNotes,
        }),
      });
      const data = await res.json();
      if (res.ok && data.submission) {
        setSubmissions((prev) =>
          prev.map((item) => (item.id === sub.id ? data.submission : item))
        );
        setNotice(
          decision === 'approved'
            ? `Approved ${sub.id}: $${sub.rewardUsd.toFixed(2)} credited to ${sub.contributorName}'s withdrawable balance.`
            : `Rejected ${sub.id}: reward withheld.`
        );
      }
    } catch {
      // Ignored
    }
  };

  const filtered = submissions.filter((s) => {
    if (filter === 'all') return true;
    if (filter === 'flagged') return s.fraudFlags.length > 0;
    return s.status === filter;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="pb-5 border-b border-black/[0.06]">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-semibold block mb-1">
          Quality Governance &amp; Anti-Fraud Monitor
        </span>
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
          Submission Review &amp; Fraud Monitoring
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Review African AI submissions, inspect automated anti-fraud heuristics, and approve or reject tasks to unlock contributor earnings.
        </p>
      </div>

      {notice && (
        <div className="p-3.5 rounded-xl bg-zinc-950 text-white text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {(['all', 'pending', 'flagged', 'approved', 'rejected'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium capitalize cursor-pointer transition-colors ${
              filter === tab
                ? 'bg-zinc-950 text-white'
                : 'bg-white border border-black/[0.08] text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-xs font-mono text-zinc-500">Loading submission queue...</p>
      ) : filtered.length === 0 ? (
        <div className="p-10 rounded-2xl bg-white border border-black/[0.06] text-center text-xs text-zinc-500">
          No submissions match this filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((sub) => (
            <div
              key={sub.id}
              className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono font-semibold text-zinc-950">{sub.id}</span>
                    <span className="text-zinc-300">·</span>
                    <span className="font-semibold text-zinc-900">{sub.contributorName}</span>
                    <span className="font-mono text-zinc-500">({sub.contributorEmail})</span>
                    <span className="text-zinc-300">·</span>
                    <span className="font-mono text-zinc-600">{sub.category}</span>
                  </div>
                  <h2 className="text-sm font-semibold text-zinc-950">{sub.taskTitle}</h2>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono shrink-0">
                  <span className="text-zinc-500">Time: {sub.completionSeconds}s</span>
                  <span className="font-semibold text-zinc-950 tabular-nums">
                    ${sub.rewardUsd.toFixed(2)}
                  </span>
                  <span
                    className={`uppercase font-semibold ${
                      sub.status === 'approved'
                        ? 'text-emerald-700'
                        : sub.status === 'rejected'
                        ? 'text-rose-700'
                        : 'text-amber-700'
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>
              </div>

              {sub.fraudFlags.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2 font-mono">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Anti-Fraud Signals: {sub.fraudFlags.join(', ')}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#FBFBFA] border border-black/[0.05]">
                  <span className="font-mono text-[10px] text-zinc-400 uppercase block mb-1">
                    Contributor Response
                  </span>
                  <p className="text-zinc-900 leading-relaxed">
                    {sub.responsePayload.primaryAnswer}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FBFBFA] border border-black/[0.05]">
                  <span className="font-mono text-[10px] text-zinc-400 uppercase block mb-1">
                    Quality Justification &amp; Consent ({sub.consentScope})
                  </span>
                  <p className="text-zinc-700 leading-relaxed">
                    {sub.responsePayload.rubricNotes}
                  </p>
                </div>
              </div>

              {/* Admin Audit Controls */}
              <div className="pt-3 border-t border-black/[0.06] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    value={notesById[sub.id] ?? sub.reviewNotes ?? ''}
                    onChange={(e) =>
                      setNotesById((prev) => ({ ...prev, [sub.id]: e.target.value }))
                    }
                    placeholder="Admin feedback / audit note..."
                    aria-label={`Review note for ${sub.id}`}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-950"
                  />
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <label htmlFor={`score-${sub.id}`} className="text-zinc-500">
                      Score:
                    </label>
                    <input
                      id={`score-${sub.id}`}
                      type="number"
                      min={0}
                      max={100}
                      value={scoreById[sub.id] ?? sub.qualityScore ?? 96}
                      onChange={(e) =>
                        setScoreById((prev) => ({
                          ...prev,
                          [sub.id]: Number(e.target.value),
                        }))
                      }
                      className="w-16 px-2 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-950"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleDecision(sub, 'approved')}
                    className="px-3.5 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve (${sub.rewardUsd.toFixed(2)})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDecision(sub, 'rejected')}
                    className="px-3.5 py-1.5 rounded-lg bg-white border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
