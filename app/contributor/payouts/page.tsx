'use client';

import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, CreditCard, Lock, Send } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { buildBeverHeaders } from '@/lib/african-training-client';
import type {
  ContributorLedgerSummary,
  PayoutMethodType,
  WithdrawalRequest,
} from '@/lib/african-training';

const PAYOUT_RAILS: PayoutMethodType[] = [
  'Mobile Money (M-Pesa / MTN MoMo / Airtel)',
  'African Local Bank Transfer (NGN / KES / GHS / ZAR)',
  'International ACH / Wise',
];

export default function ContributorPayoutsPage() {
  const { user } = useAuth();
  const [ledger, setLedger] = useState<ContributorLedgerSummary | null>(null);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);

  const [amountInput, setAmountInput] = useState('10.00');
  const [payoutMethod, setPayoutMethod] = useState<PayoutMethodType>(PAYOUT_RAILS[0]);
  const [destinationAccount, setDestinationAccount] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let active = true;
    async function load() {
      try {
        const res = await fetch('/api/african-training/withdrawals', {
          headers: buildBeverHeaders(user),
        });
        const data = await res.json();
        if (!active) return;
        setLedger(data.ledger || null);
        setWithdrawals(data.withdrawals || []);
      } catch {
        // Ignored
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [user]);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/african-training/withdrawals', {
        method: 'POST',
        headers: buildBeverHeaders(user),
        body: JSON.stringify({
          amountUsd: Number(amountInput),
          payoutMethod,
          destinationAccount,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Unable to process withdrawal request.');
      } else {
        setLedger(data.ledger);
        setWithdrawals((prev) => [data.withdrawal, ...prev]);
        setSuccessMsg(
          `Withdrawal ${data.withdrawal.id} for $${data.withdrawal.amountUsd.toFixed(2)} queued for Treasury release.`
        );
        setDestinationAccount('');
      }
    } catch {
      setErrorMsg('Network error submitting withdrawal request.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <div className="pb-4 border-b border-black/[0.06]">
        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
          Approved Balance Treasury
        </span>
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight font-display">
          Withdrawals &amp; African Payout Rails
        </h1>
        <p className="text-xs text-zinc-500 mt-1 max-w-2xl">
          Request payouts strictly from your verified, approved task balance via Mobile Money, African local bank rails, or ACH / Wise. Unapproved pending earnings remain locked until admin review completes.
        </p>
      </div>

      {/* Balance Enforcement Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-xs text-zinc-500 block mb-1">Available to Withdraw</span>
          <p className="text-2xl font-semibold font-mono text-emerald-700 tabular-nums">
            ${(ledger?.withdrawableBalanceUsd ?? 0).toFixed(2)}
          </p>
          <span className="text-[11px] text-zinc-400 mt-1 block">Approved earnings minus payouts</span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-xs text-zinc-500 block mb-1">Locked Pending Earnings</span>
          <p className="text-2xl font-semibold font-mono text-zinc-950 tabular-nums">
            ${(ledger?.pendingEarningsUsd ?? 0).toFixed(2)}
          </p>
          <span className="text-[11px] text-amber-700 mt-1 flex items-center gap-1 font-medium">
            <Lock className="w-3 h-3" />
            Not withdrawable until approved
          </span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-xs">
          <span className="text-xs text-zinc-500 block mb-1">Pending Payout Requests</span>
          <p className="text-2xl font-semibold font-mono text-zinc-950 tabular-nums">
            ${(ledger?.pendingWithdrawalsUsd ?? 0).toFixed(2)}
          </p>
          <span className="text-[11px] text-zinc-400 mt-1 block">Awaiting Treasury release</span>
        </div>
      </div>

      {/* Request Withdrawal Form */}
      <form
        onSubmit={handleWithdraw}
        className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-5"
      >
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
          <h2 className="text-base font-semibold text-zinc-950 flex items-center gap-2 font-display">
            <CreditCard className="w-4 h-4 text-zinc-700" />
            <span>Request Payout</span>
          </h2>
          <span className="text-xs font-mono text-zinc-500">Minimum: $5.00 USD</span>
        </div>

        {errorMsg && (
          <div
            role="alert"
            className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="withdraw-amount" className="block text-xs font-medium text-zinc-700 mb-1.5">
              Amount to Withdraw (USD)
            </label>
            <input
              id="withdraw-amount"
              type="number"
              step="0.01"
              min="0.01"
              required
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-950 focus:bg-white focus:outline-hidden focus:border-zinc-950"
            />
          </div>

          <div>
            <label htmlFor="payout-rail" className="block text-xs font-medium text-zinc-700 mb-1.5">
              Payout Method
            </label>
            <select
              id="payout-rail"
              value={payoutMethod}
              onChange={(e) => setPayoutMethod(e.target.value as PayoutMethodType)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950 focus:bg-white focus:outline-hidden focus:border-zinc-950"
            >
              {PAYOUT_RAILS.map((rail) => (
                <option key={rail} value={rail}>
                  {rail}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="destination-account" className="block text-xs font-medium text-zinc-700 mb-1.5">
            Mobile Money Number or Bank / IBAN Account Reference
          </label>
          <input
            id="destination-account"
            type="text"
            required
            value={destinationAccount}
            onChange={(e) => setDestinationAccount(e.target.value)}
            placeholder="e.g. M-Pesa +254-712-345-678 or GTBank NGN 0123456789"
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950 focus:bg-white focus:outline-hidden focus:border-zinc-950"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] font-mono text-zinc-500">
            Zero-fee disbursements · Processed by Bever Admin Treasury
          </span>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? 'Validating...' : 'Submit Withdrawal Request'}</span>
          </button>
        </div>
      </form>

      {/* Withdrawal History */}
      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
        <h2 className="text-base font-semibold text-zinc-950 font-display pb-2 border-b border-black/[0.06]">
          My Withdrawal Requests
        </h2>
        {withdrawals.length === 0 ? (
          <p className="text-xs text-zinc-500">No withdrawal requests submitted yet.</p>
        ) : (
          <div className="space-y-2.5">
            {withdrawals.map((wd) => (
              <div
                key={wd.id}
                className="p-4 rounded-xl bg-[#FBFBFA] border border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <span className="font-mono font-semibold text-zinc-950">{wd.id}</span>
                  <span className="text-zinc-400 mx-2">·</span>
                  <span className="text-zinc-700">{wd.payoutMethod}</span>
                  <p className="font-mono text-[11px] text-zinc-500 mt-0.5">
                    {wd.destinationAccount}
                  </p>
                  {wd.adminNote && (
                    <p className="text-[11px] text-zinc-600 mt-1">Note: {wd.adminNote}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 shrink-0 font-mono">
                  <span
                    className={`uppercase font-semibold text-[11px] ${
                      wd.status === 'paid'
                        ? 'text-emerald-700'
                        : wd.status === 'rejected'
                        ? 'text-rose-700'
                        : 'text-amber-700'
                    }`}
                  >
                    {wd.status}
                  </span>
                  <span className="font-semibold text-zinc-950 text-sm tabular-nums">
                    ${wd.amountUsd.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
