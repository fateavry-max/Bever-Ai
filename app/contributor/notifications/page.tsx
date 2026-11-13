'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  DollarSign,
  Sparkles,
  Award,
  ChevronRight,
} from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

interface NotificationItem {
  id: string;
  type: 'queue' | 'review' | 'finance' | 'qualification';
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
  actionHref?: string;
  actionLabel?: string;
}

const sampleNotifications: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    type: 'queue',
    title: 'High-Value Task Batch Available',
    message: '24 new tasks have opened in "Multi-Step Math & Algorithmic Chain-of-Thought" paying $55/hr.',
    timeAgo: '12 minutes ago',
    read: false,
    actionHref: '/contributor/tasks',
    actionLabel: 'Claim Task',
  },
  {
    id: 'NOTIF-02',
    type: 'review',
    title: 'Consensus Review Passed (Score 99.2%)',
    message: 'Your submission for SUB-8921-A was approved by Senior Reviewer Dr. Chen with no edits needed.',
    timeAgo: '2 hours ago',
    read: false,
    actionHref: '/contributor/submissions',
    actionLabel: 'View Review',
  },
  {
    id: 'NOTIF-03',
    type: 'finance',
    title: 'Payout Disbursement Scheduled',
    message: '$522.50 has been queued for transfer to Chase Business Checking on Tuesday, May 19.',
    timeAgo: '1 day ago',
    read: true,
    actionHref: '/contributor/earnings',
    actionLabel: 'View Breakdown',
  },
  {
    id: 'NOTIF-04',
    type: 'qualification',
    title: 'New Diagnostic Test Unlocked',
    message: 'Based on your recent 98%+ agreement rate, you are now eligible for the Rust Concurrency benchmark.',
    timeAgo: '2 days ago',
    read: true,
    actionHref: '/contributor/assessments',
    actionLabel: 'Take Assessment',
  },
];

export default function ContributorNotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>(sampleNotifications);

  const markAllRead = () => {
    setItems(items.map((i) => ({ ...i, read: true })));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs">
            <span className="font-mono text-zinc-500 font-medium">Activity Dispatch</span>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-700 font-mono">
              {items.filter((i) => !i.read).length} Unread
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight font-display">
            Notifications & System Alerts
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Stay updated on new task surges, reviewer feedback, and scheduled payouts.
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium border border-zinc-200/80 transition-colors cursor-pointer"
        >
          Mark all as read
        </button>
      </div>

      <FeatureStatusBanner
        featureName="Real-Time Dispatch Notifications"
        description="Push and email alert streaming for task surges, review consensus, and payout notices is currently in development."
      />

      <div className="space-y-3">
        {items.map((notif) => (
          <div
            key={notif.id}
            className={`p-5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs ${
              !notif.read
                ? 'bg-white border-zinc-300'
                : 'bg-zinc-50/70 border-black/[0.05] opacity-85'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-zinc-100 border border-zinc-200/80 text-zinc-700 shrink-0 mt-0.5">
                {notif.type === 'queue' && <Sparkles className="w-4 h-4 text-zinc-950" />}
                {notif.type === 'review' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                {notif.type === 'finance' && <DollarSign className="w-4 h-4 text-zinc-700" />}
                {notif.type === 'qualification' && <Award className="w-4 h-4 text-zinc-950" />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-zinc-950">{notif.title}</h3>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" />
                  )}
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed max-w-xl">{notif.message}</p>
                <span className="text-[11px] font-mono text-zinc-400 mt-2 block">{notif.timeAgo}</span>
              </div>
            </div>

            {notif.actionHref && (
              <div className="shrink-0 sm:self-center">
                <Link
                  href={notif.actionHref}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200/80 text-zinc-900 border border-zinc-200/70 text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <span>{notif.actionLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
