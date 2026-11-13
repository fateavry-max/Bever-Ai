'use client';

import React, { useState } from 'react';
import { Download, CheckCircle2 } from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  ipAddress: string;
  result: 'SUCCESS' | 'FLAGGED';
}

const sampleLogs: AuditLog[] = [
  {
    id: 'LOG-4921',
    timestamp: '2026-05-12 14:12:02 UTC',
    actor: 'elena.vance@bever.ai',
    action: 'DISBURSEMENT_BATCH_AUTHORIZED (Cycle #19)',
    ipAddress: '198.51.100.41',
    result: 'SUCCESS',
  },
  {
    id: 'LOG-4920',
    timestamp: '2026-05-12 13:45:18 UTC',
    actor: 'system.daemon',
    action: 'STALE_TASK_SWEEP (14 tasks recycled)',
    ipAddress: '10.0.4.12',
    result: 'SUCCESS',
  },
  {
    id: 'LOG-4919',
    timestamp: '2026-05-12 11:20:00 UTC',
    actor: 'marcus.sterling@bever.ai',
    action: 'CLIENT_ORG_PROVISIONED (Apex Cognition Labs)',
    ipAddress: '203.0.113.8',
    result: 'SUCCESS',
  },
];

export default function AdminAuditLogsPage() {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
              Compliance Ledger
            </span>
            <span className="text-xs text-zinc-400">·</span>
            <span className="text-xs text-zinc-500 font-mono">SOC 2 Type II Stream Schema</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            Security Audit Logs &amp; Access Trail
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Tamper-evident logs of administrative actions, treasury authorizations, and permission modifications.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setNotice('Signed JSONL audit archive export is currently in development.');
            setTimeout(() => setNotice(null), 4000);
          }}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-50 text-zinc-700 border border-black/[0.09] text-xs font-medium flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Download className="w-4 h-4 text-zinc-500" />
          <span>Export Audit Log</span>
        </button>
      </div>

      <FeatureStatusBanner
        featureName="Immutable Append-Only Audit Stream"
        description="Live cryptographic event signing and SIEM log streaming are currently in development. Entries below illustrate log structure."
      />

      {notice && (
        <div className="p-3.5 rounded-xl bg-zinc-950 text-white text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-black/[0.06] text-zinc-500 font-mono text-[11px]">
                <th className="pb-3 font-medium">Log ID</th>
                <th className="pb-3 font-medium">Timestamp</th>
                <th className="pb-3 font-medium">Actor</th>
                <th className="pb-3 font-medium">Action &amp; Target</th>
                <th className="pb-3 font-medium">IP Address</th>
                <th className="pb-3 font-medium text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.05] font-mono">
              {sampleLogs.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-50/70">
                  <td className="py-3.5 text-cyan-700 font-semibold">{log.id}</td>
                  <td className="py-3.5 text-zinc-500">{log.timestamp}</td>
                  <td className="py-3.5 text-zinc-950">{log.actor}</td>
                  <td className="py-3.5 text-zinc-700">{log.action}</td>
                  <td className="py-3.5 text-zinc-500">{log.ipAddress}</td>
                  <td className="py-3.5 text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                      {log.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
