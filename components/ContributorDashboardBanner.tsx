'use client';

import React from 'react';
import { ShieldCheck, Award, Zap, ArrowRight, UserCheck } from 'lucide-react';

import Link from 'next/link';

interface ContributorDashboardBannerProps {
  userEmail: string | null;
  applicantId?: string | null;
  onJumpToTasks?: () => void;
  onLogout: () => void;
}

export function ContributorDashboardBanner({
  userEmail,
  applicantId,
  onJumpToTasks,
  onLogout,
}: ContributorDashboardBannerProps) {
  if (!userEmail) return null;

  return (
    <aside
      aria-label="Contributor session status"
      className="bg-indigo-950 text-white border-b border-indigo-900/80 px-4 py-2.5 text-xs relative z-40"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-indigo-200">Logged in as:</span>
            <span className="font-semibold text-white truncate max-w-[200px]">{userEmail}</span>
            <span className="text-indigo-400 hidden md:inline">·</span>
            {applicantId && (
              <span className="text-[11px] font-mono text-indigo-300 hidden sm:inline">
                ({applicantId})
              </span>
            )}
            <span className="hidden md:inline-flex items-center gap-1 text-emerald-300 font-mono text-[11px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
              <ShieldCheck className="w-3 h-3" />
              Verified Contributor Tier 1
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-indigo-300 hidden lg:inline">
            Inter-rater agreement: <strong className="text-white font-mono">98.4%</strong>
          </span>
          <Link
            href="/profile"
            className="px-2.5 py-1 bg-indigo-900/80 hover:bg-indigo-800 text-indigo-100 font-medium rounded-lg transition-colors border border-indigo-700/60 flex items-center gap-1.5"
          >
            <UserCheck className="w-3 h-3 text-emerald-400" />
            <span>Profile & Payouts</span>
          </Link>
          {onJumpToTasks ? (
            <button
              onClick={onJumpToTasks}
              className="px-3 py-1 bg-white text-indigo-950 font-semibold rounded-lg hover:bg-indigo-50 transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
            >
              <span>Open Available Tasks</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <Link
              href="/opportunities"
              className="px-3 py-1 bg-white text-indigo-950 font-semibold rounded-lg hover:bg-indigo-50 transition-colors flex items-center gap-1 shadow-2xs"
            >
              <span>Open Available Tasks</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
          <button
            onClick={onLogout}
            className="text-indigo-300 hover:text-white transition-colors underline cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>
    </aside>
  );
}
