'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

export default function AdminSupportPage() {
  const [resolved, setResolved] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
              Escalation Desk
            </span>
            <span className="text-xs text-zinc-400">·</span>
            <span className="text-xs text-zinc-500 font-mono">Sample Escalation Preview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            Support Escalation &amp; Incident Management
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Manage high-severity client tickets and SLA breaches requiring executive staff intervention.
          </p>
        </div>
      </div>

      <FeatureStatusBanner
        featureName="Staff Support Escalation & Incident Ticketing"
        description="Live Zendesk/Linear bidirectional escalation syncing is currently in development."
      />

      {resolved && (
        <div className="p-3.5 rounded-xl bg-zinc-950 text-white text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Ticket resolution workflow for ESC-912 is held in local preview (ticketing backend in development).</span>
        </div>
      )}

      <div className="space-y-3">
        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-mono text-xs font-semibold text-cyan-700">ESC-912</span>
              <span className="text-xs font-semibold text-zinc-950">Enterprise Org — Storage Webhook Sync Request</span>
              <span className="text-[10px] font-mono bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
                Sample Ticket
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-mono">Assigned Role: Enterprise Solutions Engineering</p>
          </div>

          <button
            type="button"
            onClick={() => setResolved(true)}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs cursor-pointer transition-colors"
          >
            {resolved ? 'Preview Opened' : 'Inspect Ticket'}
          </button>
        </div>
      </div>
    </div>
  );
}
