'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  DollarSign,
  Globe,
  Languages,
  Lock,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { buildBeverHeaders } from '@/lib/african-training-client';
import type {
  AfricanContributorProfile,
  AfricanTaskSubmission,
  AfricanTrainingTask,
  ContributorLedgerSummary,
} from '@/lib/african-training';

export default function ContributorDashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<AfricanTrainingTask[]>([]);
  const [submissions, setSubmissions] = useState<AfricanTaskSubmission[]>([]);
  const [profile, setProfile] = useState<AfricanContributorProfile | null>(null);
  const [ledger, setLedger] = useState<ContributorLedgerSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let active = true;
    const headers = buildBeverHeaders(user);

    async function loadDashboard() {
      try {
        const [tasksRes, subsRes, profRes, wdRes] = await Promise.all([
          fetch('/api/african-training/tasks', { headers }),
          fetch('/api/african-training/submissions', { headers }),
          fetch('/api/african-training/profile', { headers }),
          fetch('/api/african-training/withdrawals', { headers }),
        ]);
        const [tasksData, subsData, profData, wdData] = await Promise.all([
          tasksRes.json(),
          subsRes.json(),
          profRes.json(),
          wdRes.json(),
        ]);
        if (!active) return;
        setTasks(tasksData.tasks || []);
        setSubmissions(subsData.submissions || []);
        setProfile(profData.profile || null);
        setLedger(wdData.ledger || null);
      } catch {
        // Keep clean fallback UI if request fails
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDashboard();
    return () => {
      active = false;
    };
  }, [user]);

  const completedTaskIds = new Set(submissions.map((s) => s.taskId));
  const completedCount = tasks.filter((t) => completedTaskIds.has(t.id)).length;
  const progressPct = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Contributor Welcome Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
              <span className="font-mono text-zinc-900 font-medium">
                African AI Training Workstation
              </span>
              <span className="text-zinc-300">·</span>
              <span className="font-mono text-zinc-500">
                {profile?.country || 'Africa'}
              </span>
              <span className="text-zinc-300">·</span>
              <span className="font-mono text-zinc-400">
                ID: {user?.applicantId || 'BEV-98124'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight font-display">
              Welcome back, {profile?.name || user?.name || 'Contributor'}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-2xl">
              Train AI. Represent Africa. Earn for your intelligence. Choose tasks across African languages, voice collection, annotation, and cultural evaluation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contributor/profile"
              className="px-4 py-2.5 bg-white hover:bg-zinc-50 text-zinc-900 border border-black/[0.1] font-medium text-xs rounded-xl transition-colors"
            >
              African Identity &amp; Languages
            </Link>
            <Link
              href="/contributor/tasks"
              className="px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <span>Browse {tasks.length} Tasks</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
            <span>Available AI Tasks</span>
            <Globe className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-semibold font-mono text-zinc-950 tabular-nums">
            {loading ? '—' : `${tasks.length} Open`}
          </div>
          <span className="text-xs text-zinc-500 mt-1 block">
            Across 8 African AI training categories
          </span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
            <span>Withdrawable Balance</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-semibold font-mono text-emerald-700 tabular-nums">
            ${(ledger?.withdrawableBalanceUsd ?? 0).toFixed(2)}
          </div>
          <span className="text-xs text-zinc-500 mt-1 flex items-center gap-1 font-mono tabular-nums">
            <Lock className="w-3 h-3 text-zinc-400" />
            ${(ledger?.pendingEarningsUsd ?? 0).toFixed(2)} pending approval
          </span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
            <span>Quality Score Rating</span>
            <Award className="w-4 h-4 text-zinc-700" />
          </div>
          <div className="text-2xl font-semibold font-mono text-zinc-950 tabular-nums">
            {(ledger?.averageQualityScore ?? profile?.qualityScore ?? 100).toFixed(1)}%
          </div>
          <span className="text-xs text-emerald-700 mt-1 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{ledger?.approvedCount ?? 0} approved submissions</span>
          </span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
            <span>Task Completion Progress</span>
            <Clock className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-semibold font-mono text-zinc-950 tabular-nums">
            {progressPct}%
          </div>
          <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-zinc-950 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Available African AI Tasks + Language & Skill Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
            <div>
              <span className="text-[11px] font-mono text-zinc-400 font-medium uppercase tracking-wider">
                Priority African AI Queue
              </span>
              <h2 className="text-lg font-semibold text-zinc-950 font-display">
                Recommended Training Tasks
              </h2>
            </div>
            <Link
              href="/contributor/tasks"
              className="text-xs font-medium text-zinc-950 hover:underline flex items-center gap-1"
            >
              <span>All Tasks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {tasks.slice(0, 4).map((task) => {
              const userSub = submissions.find((s) => s.taskId === task.id);
              return (
                <div
                  key={task.id}
                  className="p-4 rounded-xl bg-[#FBFBFA] border border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-zinc-500">
                      <span className="text-zinc-900 font-semibold">{task.category}</span>
                      <span>·</span>
                      <span>{task.language}</span>
                      <span>·</span>
                      <span>{task.difficulty}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-zinc-950">{task.title}</h3>
                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-600 tabular-nums">
                      <span className="text-emerald-700 font-semibold">
                        ${task.rewardUsd.toFixed(2)} reward
                      </span>
                      <span>·</span>
                      <span>~{task.estimatedMinutes} mins</span>
                      {userSub && (
                        <>
                          <span>·</span>
                          <span className="uppercase text-[10px] font-semibold text-zinc-800">
                            Status: {userSub.status}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/contributor/tasks/${task.id}`}
                    className="px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium transition-colors shrink-0 text-center"
                  >
                    Open Task
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: African Identity, Languages & Preferences */}
        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
              <h3 className="text-sm font-semibold text-zinc-950 flex items-center gap-2 font-display">
                <Languages className="w-4 h-4 text-zinc-700" />
                <span>Language &amp; Skill Preferences</span>
              </h3>
              <Link
                href="/contributor/profile"
                className="text-xs font-medium text-zinc-600 hover:text-zinc-950 underline"
              >
                Edit
              </Link>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500">Country:</span>
                <span className="font-medium text-zinc-950">
                  {profile?.country || 'Not configured'}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1.5">Languages Spoken:</span>
                <div className="space-y-1.5">
                  {(profile?.languagesSpoken || []).map((l) => (
                    <div
                      key={l.language}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-zinc-50 border border-black/[0.05]"
                    >
                      <span className="font-medium text-zinc-900">{l.language}</span>
                      <span className="font-mono text-[11px] text-zinc-500">{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-zinc-500 block mb-1">Accents &amp; Dialects:</span>
                <p className="text-zinc-800 font-medium">
                  {(profile?.accentsDialects || []).join(' · ') || 'None specified'}
                </p>
              </div>

              <div>
                <span className="text-zinc-500 block mb-1">Preferred Categories:</span>
                <p className="text-zinc-700 leading-relaxed">
                  {(profile?.preferredCategories || []).join(' · ') || 'All Categories'}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.06] space-y-2">
            <Link
              href="/contributor/earnings"
              className="w-full py-2.5 px-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-black/[0.06] text-zinc-900 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Earnings &amp; Payment History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contributor/payouts"
              className="w-full py-2.5 px-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Request Approved Withdrawal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
