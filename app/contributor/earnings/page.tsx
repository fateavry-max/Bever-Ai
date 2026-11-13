'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, CreditCard, Lock, XCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { buildBeverHeaders } from '@/lib/african-training-client';
import type {
  AfricanTaskSubmission,
  ContributorLedgerSummary,
  WithdrawalRequest,
} from '@/lib/african-training';

export default function ContributorEarningsPage() {
  const { user } = useAuth();
  const [ledger, setLedger] = useState<ContributorLedgerSummary | null>(null);
  const [submissions, setSubmissions] = useState<AfricanTaskSubmission[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let active = true;
    const headers = buildBeverHeaders(user);

    async function loadLedger() {
      try {
        const [wdRes, subRes] = await Promise.all([
          fetch('/api/african-training/withdrawals', { headers }),
          fetch('/api/african-training/submissions', { headers }),
        ]);
        const [wdData, subData] = await Promise.all([wdRes.json(), subRes.json()]);
        if (!active) return;
        setLedger(wdData.ledger || null);
        setWithdrawals(wdData.withdrawals || []);
        setSubmissions(subData.submissions || []);
      } catch {
        // Handled cleanly
      } finally {
        if (active) setLoading(false);
      }
    }

    loadLedger();
    return () => {
      active = false;
    };
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
            African AI Compensation Ledger
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight font-display">
            Earnings &amp; Payment History
          </h1>
          <p className="text-xs text-zinc-500 mt-1 max-w-2xl">
            Only approved task submissions enter your withdrawable balance. Pending or rejected tasks are tracked separately and remain locked until verified.
          </p>
        </div>

        <Link
          href="/contributor/payouts"
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 shadow-xs transition-all"
        >
          <CreditCard className="w-4 h-4" />
          <span>Withdraw Approved Earnings</span>
        </Link>
      </div>

      {/* Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-xs text-zinc-500 block mb-1">Withdrawable Balance</span>
          <p className="text-3xl font-semibold font-mono text-emerald-700 tabular-nums">
            ${(ledger?.withdrawableBalanceUsd ?? 0).toFixed(2)}
          </p>
          <span className="text-xs text-zinc-500 mt-2 block">
            Approved &amp; ready for payout
          </span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-xs text-zinc-500 block mb-1">Pending Review (Locked)</span>
          <p className="text-3xl font-semibold font-mono text-zinc-950 tabular-nums">
            ${(ledger?.pendingEarningsUsd ?? 0).toFixed(2)}
          </p>
          <span className="text-xs text-amber-700 mt-2 flex items-center gap-1 font-medium">
            <Lock className="w-3 h-3" />
            <span>Cannot be withdrawn yet</span>
          </span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-xs text-zinc-500 block mb-1">Lifetime Approved Earnings</span>
          <p className="text-3xl font-semibold font-mono text-zinc-950 tabular-nums">
            ${(ledger?.approvedEarningsUsd ?? 0).toFixed(2)}
          </p>
          <span className="text-xs text-zinc-500 mt-2 block font-mono tabular-nums">
            {ledger?.approvedCount ?? 0} approved tasks
          </span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-xs text-zinc-500 block mb-1">Average Quality Score</span>
          <p className="text-3xl font-semibold font-mono text-zinc-950 tabular-nums">
            {(ledger?.averageQualityScore ?? 100).toFixed(1)}%
          </p>
          <span className="text-xs text-zinc-500 mt-2 block font-mono tabular-nums">
            Disbursed: ${(ledger?.totalWithdrawnUsd ?? 0).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Task Earnings Breakdown Table */}
      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
          <h2 className="text-base font-semibold text-zinc-950 font-display">
            Task-by-Task Reward Verification
          </h2>
          <Link
            href="/contributor/tasks"
            className="text-xs font-medium text-zinc-900 hover:underline flex items-center gap-1"
          >
            <span>Earn more in queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <p className="text-xs font-mono text-zinc-500">Loading ledger...</p>
        ) : submissions.length === 0 ? (
          <p className="text-xs text-zinc-500 py-4">
            No completed tasks yet. Submit your first African AI Training task to start earning.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-100 text-zinc-400 font-mono text-[11px]">
                  <th className="pb-3 font-medium">Submission</th>
                  <th className="pb-3 font-medium">Category &amp; Language</th>
                  <th className="pb-3 font-medium">Quality</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Reward (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-zinc-50">
                    <td className="py-3.5">
                      <span className="font-mono text-[11px] text-zinc-500 block">{sub.id}</span>
                      <span className="font-medium text-zinc-950">{sub.taskTitle}</span>
                    </td>
                    <td className="py-3.5 text-zinc-600">
                      <span>{sub.category}</span>
                      <span className="block font-mono text-[11px] text-zinc-400">
                        {sub.language}
                      </span>
                    </td>
                    <td className="py-3.5 font-mono tabular-nums text-zinc-700">
                      {sub.qualityScore !== null ? `${sub.qualityScore}%` : '—'}
                    </td>
                    <td className="py-3.5 font-mono text-[11px]">
                      {sub.status === 'approved' && (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Approved (Withdrawable)
                        </span>
                      )}
                      {sub.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 text-amber-700 font-semibold">
                          <Clock className="w-3.5 h-3.5" />
                          Pending Review
                        </span>
                      )}
                      {sub.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1 text-rose-700 font-semibold">
                          <XCircle className="w-3.5 h-3.5" />
                          Rejected ($0)
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 text-right font-mono font-semibold tabular-nums text-zinc-950">
                      ${sub.rewardUsd.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Withdrawal Payment History */}
      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
        <h2 className="text-base font-semibold text-zinc-950 font-display pb-3 border-b border-black/[0.06]">
          Payout &amp; Withdrawal History
        </h2>
        {withdrawals.length === 0 ? (
          <p className="text-xs text-zinc-500">
            No withdrawal requests submitted yet. Once you have at least $5.00 in approved earnings, request a payout from the Withdrawals page.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-100 text-zinc-400 font-mono text-[11px]">
                  <th className="pb-3 font-medium">Payout ID</th>
                  <th className="pb-3 font-medium">Rail &amp; Destination</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {withdrawals.map((wd) => (
                  <tr key={wd.id}>
                    <td className="py-3 font-mono font-semibold text-zinc-900">{wd.id}</td>
                    <td className="py-3 text-zinc-700">
                      <span>{wd.payoutMethod}</span>
                      <span className="block font-mono text-[11px] text-zinc-400">
                        {wd.destinationAccount}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-[11px] uppercase font-semibold text-zinc-800">
                      {wd.status}
                    </td>
                    <td className="py-3 text-right font-mono font-semibold tabular-nums text-zinc-950">
                      ${wd.amountUsd.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
