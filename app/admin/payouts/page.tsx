'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, FileCheck2, XCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { buildBeverHeaders } from '@/lib/african-training-client';
import type { ContributorLedgerSummary, WithdrawalRequest } from '@/lib/african-training';

export default function AdminPayoutsPage() {
  const { user } = useAuth();
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [platformTotals, setPlatformTotals] = useState<ContributorLedgerSummary | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let active = true;
    async function load() {
      try {
        const res = await fetch('/api/african-training/withdrawals?scope=all', {
          headers: buildBeverHeaders(user),
        });
        const data = await res.json();
        if (!active) return;
        setWithdrawals(data.withdrawals || []);
        setPlatformTotals(data.platformTotals || null);
      } catch {
        // Ignored
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [user]);

  const handlePayoutDecision = async (id: string, status: 'paid' | 'rejected') => {
    if (!user) return;
    try {
      const res = await fetch('/api/african-training/withdrawals', {
        method: 'PATCH',
        headers: buildBeverHeaders(user),
        body: JSON.stringify({
          id,
          status,
          adminNote:
            status === 'paid'
              ? 'Approved and disbursed via Bever African Treasury.'
              : 'Rejected: destination verification incomplete.',
        }),
      });
      const data = await res.json();
      if (res.ok && data.withdrawal) {
        setWithdrawals((prev) =>
          prev.map((w) => (w.id === id ? data.withdrawal : w))
        );
        setNotice(`Withdrawal ${id} updated to ${status.toUpperCase()}.`);
      }
    } catch {
      // Ignored
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="pb-5 border-b border-black/[0.06]">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-semibold block mb-1">
          Treasury &amp; Withdrawals
        </span>
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
          Payments &amp; Withdrawal Management
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Process contributor withdrawal requests verified strictly against approved task balances.
        </p>
      </div>

      {notice && (
        <div className="p-3.5 rounded-xl bg-zinc-950 text-white text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Platform Payout Totals */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-[11px] font-mono text-zinc-500 block mb-1">Total Approved Task Value</span>
          <p className="text-2xl font-semibold font-mono text-zinc-950 tabular-nums">
            ${(platformTotals?.approvedEarningsUsd ?? 0).toFixed(2)}
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-[11px] font-mono text-zinc-500 block mb-1">Pending Withdrawal Requests</span>
          <p className="text-2xl font-semibold font-mono text-amber-700 tabular-nums">
            ${(platformTotals?.pendingWithdrawalsUsd ?? 0).toFixed(2)}
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-[11px] font-mono text-zinc-500 block mb-1">Total Disbursed (Paid)</span>
          <p className="text-2xl font-semibold font-mono text-emerald-700 tabular-nums">
            ${(platformTotals?.totalWithdrawnUsd ?? 0).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
          <h2 className="text-base font-semibold text-zinc-950 font-display flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-zinc-700" />
            <span>Withdrawal Queue ({withdrawals.length})</span>
          </h2>
        </div>

        {withdrawals.length === 0 ? (
          <p className="text-xs text-zinc-500">No withdrawal requests recorded.</p>
        ) : (
          <div className="space-y-3">
            {withdrawals.map((wd) => (
              <div
                key={wd.id}
                className="p-4 rounded-xl bg-[#FBFBFA] border border-black/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 font-mono">
                    <span className="font-semibold text-zinc-950">{wd.id}</span>
                    <span className="text-zinc-300">·</span>
                    <span className="text-zinc-800">{wd.contributorName}</span>
                    <span className="text-zinc-500">({wd.contributorEmail})</span>
                  </div>
                  <p className="text-zinc-700">
                    {wd.payoutMethod} · <span className="font-mono">{wd.destinationAccount}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0 font-mono">
                  <span className="text-sm font-semibold text-zinc-950 tabular-nums">
                    ${wd.amountUsd.toFixed(2)}
                  </span>
                  <span
                    className={`uppercase font-semibold ${
                      wd.status === 'paid'
                        ? 'text-emerald-700'
                        : wd.status === 'rejected'
                        ? 'text-rose-700'
                        : 'text-amber-700'
                    }`}
                  >
                    {wd.status}
                  </span>

                  {wd.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handlePayoutDecision(wd.id, 'paid')}
                        className="px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white font-sans font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve &amp; Pay</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePayoutDecision(wd.id, 'rejected')}
                        className="px-3 py-1.5 rounded-lg bg-white border border-rose-200 hover:bg-rose-50 text-rose-700 font-sans font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
