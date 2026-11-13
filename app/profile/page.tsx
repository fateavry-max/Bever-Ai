'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  UserCheck,
  Lock,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Calendar,
  DollarSign,
  Clock,
  Award,
  Layers,
  FileCheck,
  ChevronRight,
  Download,
  AlertCircle,
  ExternalLink,
  ArrowUpRight,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getProfileForUser, calculateEarningsSummary, EarningsRecord } from '@/lib/profile';

export default function ProfilePage() {
  const { isLoggedIn, userEmail, applicantId, isInitialized, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'project' | 'assessments' | 'earnings'>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // If authenticated, generate or hydrate the contributor profile
  const profile = getProfileForUser(userEmail || 'alex.dev@bever.ai', applicantId);
  const earningsSummary = calculateEarningsSummary(profile.earningsHistory);

  const handleExportStatement = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportNotice('Contributor statement for Q4 2026 generated and sent to ' + (userEmail || 'registered email') + '.');
      setTimeout(() => setExportNotice(null), 5000);
    }, 800);
  };

  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      {!isInitialized ? (
        <div className="max-w-xl mx-auto my-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center shadow-xs">
          <div className="w-8 h-8 border-3 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Verifying contributor session...</p>
        </div>
      ) : !isLoggedIn ? (
          /* ========================================================================= */
          /* UNRESTRICTED / RESTRICTED STATE (Route Guard)                            */
          /* ========================================================================= */
          <div className="max-w-xl mx-auto my-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-10 shadow-sm text-center">
            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600 dark:text-indigo-400">
              <Lock className="w-7 h-7" />
            </div>

            <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-2">
              Protected Contributor Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              Authentication Required
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Access to your active AI training queues, calibration assessment scores, and verified weekly disbursement records is restricted to registered Bever contributors.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="w-full py-3 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm rounded-xl transition-all shadow-xs hover:bg-slate-800 dark:hover:bg-slate-100 flex items-center justify-center gap-2"
              >
                <span>Log In with Existing Credentials</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/apply"
                className="w-full py-2.5 px-4 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Don&apos;t have an account yet? Apply to join Bever
              </Link>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* AUTHENTICATED PROFILE & DASHBOARD                                        */
          /* ========================================================================= */
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Contributor Profile Header */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-tr from-indigo-600 to-indigo-800 text-white flex items-center justify-center text-xl font-bold shadow-xs shrink-0">
                    {profile.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {profile.name}
                      </h1>
                      <span className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/60">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Identity Verified
                      </span>
                      <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                        ID: {profile.applicantId}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
                      <span>{profile.email}</span>
                      <span>•</span>
                      <span>{profile.country}</span>
                      <span>•</span>
                      <span>Primary: {profile.primaryLanguage}</span>
                      <span>•</span>
                      <span>Member since {profile.joinedDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleExportStatement}
                    disabled={isExporting}
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isExporting ? 'Generating...' : 'Export Payout Statement'}</span>
                  </button>

                  <Link
                    href="/opportunities"
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Browse All Projects</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={logout}
                    className="px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>

              {exportNotice && (
                <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{exportNotice}</span>
                </div>
              )}

              {/* Navigation Tabs for Profile view */}
              <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 text-xs font-medium">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Overview & All Sections
                </button>
                <button
                  onClick={() => setActiveTab('project')}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'project'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Current Project Status
                </button>
                <button
                  onClick={() => setActiveTab('assessments')}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'assessments'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Completed Assessments ({profile.completedAssessments.length})
                </button>
                <button
                  onClick={() => setActiveTab('earnings')}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'earnings'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Earnings & Payout History
                </button>
              </div>
            </div>

            {/* Quick KPI Overview Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
                  <span>Current Project Queue</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-xl font-bold text-slate-900 dark:text-white truncate">
                  {profile.projectStatus.projectTitle}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-between">
                  <span>{profile.projectStatus.role}</span>
                  <span className="font-mono font-medium text-emerald-600 dark:text-emerald-400">{profile.projectStatus.benchmarkRate}</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
                  <span>Next Scheduled Payout</span>
                  <Calendar className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                  ${earningsSummary.pendingPayoutAmount.toFixed(2)}
                </div>
                <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                  Disbursing Tuesday, Nov 11 via ACH
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
                  <span>Lifetime Disbursed</span>
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                  ${earningsSummary.totalLifetimeEarnings.toFixed(2)}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Across {earningsSummary.totalApprovedHours} approved hours
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
                  <span>Quality Agreement</span>
                  <Award className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                  {profile.projectStatus.interAnnotatorAgreement}
                </div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Exceeds project SLA (95.0%)</span>
                </div>
              </div>
            </div>

            {/* SECTION 1: CURRENT PROJECT STATUS */}
            {(activeTab === 'all' || activeTab === 'project') && (
              <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                      Active Assignment
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Current Project Status
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {profile.projectStatus.status}
                    </span>
                    <span className="text-xs font-mono bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
                      {profile.projectStatus.tier}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left: Project detail */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200/80 dark:border-slate-700/60">
                      <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
                        {profile.projectStatus.category}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {profile.projectStatus.projectTitle}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                        You are actively assigned to evaluate multi-turn LLM reasoning, code correctness, and compliance with strict rubric definitions under double-blind peer verification.
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/60 dark:border-slate-800">
                          <span className="text-slate-500 block text-[11px]">Assigned Role</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">{profile.projectStatus.role}</span>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/60 dark:border-slate-800">
                          <span className="text-slate-500 block text-[11px]">Benchmark Rate</span>
                          <span className="font-semibold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5 block">{profile.projectStatus.benchmarkRate}</span>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/60 dark:border-slate-800">
                          <span className="text-slate-500 block text-[11px]">Tasks In Queue</span>
                          <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{profile.projectStatus.tasksAvailableInQueue} tasks ready</span>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/60 dark:border-slate-800">
                          <span className="text-slate-500 block text-[11px]">Completed (Week)</span>
                          <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{profile.projectStatus.tasksCompletedThisWeek} tasks logged</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={`/opportunities/${profile.projectStatus.projectId}`}
                        className="px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs rounded-xl shadow-xs hover:bg-slate-800 dark:hover:bg-slate-100 flex items-center gap-1.5 transition-all"
                      >
                        <span>Open Project Task Queue</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href="/contributor/tasks"
                        className="px-4 py-2.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold text-xs rounded-xl border border-indigo-200 dark:border-indigo-800/80 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 flex items-center gap-1.5 transition-colors"
                      >
                        <span>Go to Contributor Workstation</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right: Quality SLA & Standards */}
                  <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200/80 dark:border-slate-700/60 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span>Contributor Quality Calibrations</span>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-slate-600 dark:text-slate-400">Inter-Annotator Agreement</span>
                            <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">{profile.projectStatus.interAnnotatorAgreement}</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '98.4%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-slate-600 dark:text-slate-400">Golden-Set Benchmark Accuracy</span>
                            <span className="font-mono font-semibold text-indigo-600 dark:text-indigo-400">99.1%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: '99.1%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-slate-600 dark:text-slate-400">Audit Turnaround SLA</span>
                            <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">&lt; 4.2 hours</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-500 rounded-full" style={{ width: '94%' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-700/80 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Next regular qualification review: in 18 days</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* SECTION 2: COMPLETED ASSESSMENTS */}
            {(activeTab === 'all' || activeTab === 'assessments') && (
              <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                      Skill Qualifications & Credentials
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Completed Assessments
                    </h2>
                  </div>
                  <Link
                    href="/opportunities"
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
                  >
                    <span>Browse other qualifications</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {profile.completedAssessments.map((assessment) => (
                    <div
                      key={assessment.id}
                      className="p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors bg-slate-50/50 dark:bg-slate-900/50"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                              {assessment.category}
                            </span>
                            <span className="text-slate-300 dark:text-slate-700">•</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Passed on {assessment.completedAt}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            {assessment.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
                              {assessment.score}%
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                              Pass threshold: {assessment.passThreshold}%
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800 shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {assessment.status}
                          </span>
                        </div>
                      </div>

                      {/* Rubric Breakdown */}
                      <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800/80">
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-slate-600 dark:text-slate-400">Factual Accuracy</span>
                            <span className="font-mono font-medium text-slate-900 dark:text-white">{assessment.rubricBreakdown.accuracy}%</span>
                          </div>
                          <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${assessment.rubricBreakdown.accuracy}%` }} />
                          </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800/80">
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-slate-600 dark:text-slate-400">Helpfulness & Reasoning</span>
                            <span className="font-mono font-medium text-slate-900 dark:text-white">{assessment.rubricBreakdown.helpfulness}%</span>
                          </div>
                          <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${assessment.rubricBreakdown.helpfulness}%` }} />
                          </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800/80">
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-slate-600 dark:text-slate-400">Policy & Safety Compliance</span>
                            <span className="font-mono font-medium text-slate-900 dark:text-white">{assessment.rubricBreakdown.safetyCompliance}%</span>
                          </div>
                          <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${assessment.rubricBreakdown.safetyCompliance}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SECTION 3: EARNINGS & PAYOUT HISTORY */}
            {(activeTab === 'all' || activeTab === 'earnings') && (
              <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                      Direct Deposit & Verified Work Logs
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Earnings & Payout History
                    </h2>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Disbursement cycle: <span className="font-semibold text-slate-800 dark:text-slate-200">Weekly (Every Tuesday)</span>
                  </div>
                </div>

                {/* Earnings Table */}
                <div className="overflow-x-auto -mx-6 sm:mx-0">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                        <th className="py-3 px-4">Pay Period</th>
                        <th className="py-3 px-4">Project / Task Pool</th>
                        <th className="py-3 px-4 text-right">Approved Hours</th>
                        <th className="py-3 px-4 text-right">Hourly Rate</th>
                        <th className="py-3 px-4 text-right">Total Amount</th>
                        <th className="py-3 px-4">Payout Date</th>
                        <th className="py-3 px-4">Method</th>
                        <th className="py-3 px-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
                      {profile.earningsHistory.map((item: EarningsRecord) => (
                        <tr
                          key={item.id}
                          className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="py-3.5 px-4 font-mono font-medium text-slate-900 dark:text-white whitespace-nowrap">
                            {item.period}
                            <span className="block text-[10px] text-slate-400 font-mono font-normal">
                              {item.id}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 max-w-[220px]">
                            <div className="font-medium text-slate-800 dark:text-slate-200 truncate">
                              {item.projectTitle}
                            </div>
                            <div className="text-[11px] text-indigo-600 dark:text-indigo-400 truncate">
                              {item.category}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono text-slate-700 dark:text-slate-300 whitespace-nowrap">
                            {item.approvedHours.toFixed(1)} hrs
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono text-slate-700 dark:text-slate-300 whitespace-nowrap">
                            ${item.ratePerHour.toFixed(2)}/hr
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap">
                            ${item.totalAmount.toFixed(2)}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                            {item.payoutDate}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 text-[11px] whitespace-nowrap">
                            {item.paymentMethod}
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            {item.status === 'Disbursed' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                <CheckCircle2 className="w-3 h-3" />
                                Disbursed
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                                <Clock className="w-3 h-3" />
                                Processing
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400">
                  <AlertCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="text-slate-800 dark:text-slate-200">Compensation Ledger Notice:</strong> All amounts and payment schedules reflect task logs verified by project reviewers. Bever processes disbursements weekly on Tuesdays via automated clearing house (ACH) or cross-border wire transfers. Tasks completed after Sunday 23:59 UTC roll over into the following disbursement cycle.
                  </div>
                </div>
              </section>
            )}
          </div>
        )}
    </div>
  );
}
