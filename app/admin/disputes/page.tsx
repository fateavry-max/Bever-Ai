'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

interface DisputeItem {
  id: string;
  contributorId: string;
  contributorName: string;
  taskId: string;
  reason: string;
  filedAt: string;
  status: 'pending' | 'resolved';
}

const sampleDisputes: DisputeItem[] = [
  {
    id: 'DISP-4102',
    contributorId: 'BEV-98124',
    contributorName: 'Alex Rivera',
    taskId: 'SUB-8812-D',
    reason: 'Reviewer penalized justification brevity; evaluator provided dense algorithmic proof notation adhering to rubric.',
    filedAt: 'Sample Case',
    status: 'pending',
  },
  {
    id: 'DISP-4098',
    contributorId: 'BEV-97810',
    contributorName: 'Marcus Brody',
    taskId: 'SUB-8790-A',
    reason: 'Browser session disconnected mid-task during LaTeX rendering, requesting completion credit.',
    filedAt: 'Sample Case',
    status: 'pending',
  },
];

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState(sampleDisputes);
  const [notice, setNotice] = useState<string | null>(null);

  const handleResolve = (id: string, action: 'uphold' | 'reverse') => {
    setDisputes((prev) => prev.filter((d) => d.id !== id));
    setNotice(
      `Dispute ${id} marked locally as ${action === 'reverse' ? 'reversed in favor of contributor' : 'upheld'}. Live ledger arbitration is in development.`
    );
    setTimeout(() => setNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
              Arbitration Desk
            </span>
            <span className="text-xs text-zinc-400">·</span>
            <span className="text-xs text-zinc-500 font-mono">{disputes.length} Sample Disputes</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            Contributor Dispute Resolution Council
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Ensure fairness by independently reviewing contested task penalties, rubric disputes, and payment holds.
          </p>
        </div>
      </div>

      <FeatureStatusBanner
        featureName="Automated Dispute Arbitration & Credit Reversal"
        description="Ledger credit reversals and reviewer rubric recalibration hooks are currently in development. Actions below update local preview state only."
      />

      {notice && (
        <div className="p-3.5 rounded-xl bg-zinc-950 text-white text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      <div className="space-y-4">
        {disputes.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white border border-black/[0.06] text-xs text-zinc-500 font-mono">
            All sample disputes cleared from preview queue.
          </div>
        ) : (
          disputes.map((disp) => (
            <div
              key={disp.id}
              className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200">
                    {disp.id}
                  </span>
                  <span className="text-xs font-semibold text-zinc-950">
                    {disp.contributorName} ({disp.contributorId})
                  </span>
                  <span className="text-xs font-mono text-zinc-500">· Task: {disp.taskId}</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">{disp.filedAt}</span>
              </div>

              <p className="text-xs text-zinc-700 leading-relaxed bg-zinc-50 p-3 rounded-xl border border-black/[0.06]">
                {disp.reason}
              </p>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-black/[0.06]">
                <button
                  type="button"
                  onClick={() => handleResolve(disp.id, 'uphold')}
                  className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-50 text-zinc-700 border border-black/[0.09] text-xs font-medium cursor-pointer"
                >
                  Uphold Reviewer Penalty
                </button>
                <button
                  type="button"
                  onClick={() => handleResolve(disp.id, 'reverse')}
                  className="px-4 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs cursor-pointer"
                >
                  Reverse Penalty &amp; Credit Payout
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
