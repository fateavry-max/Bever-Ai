'use client';

import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
} from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

export default function BusinessSupportPage() {
  const [subject, setSubject] = useState('');
  const [urgency, setUrgency] = useState('Standard');
  const [details, setDetails] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setSubject('');
    setDetails('');
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-5 border-b border-black/[0.06]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
            Dedicated Concierge
          </span>
          <span className="text-xs text-zinc-400">·</span>
          <span className="text-xs text-zinc-500 font-mono">Enterprise SLA Target: &lt; 30 Mins</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
          Enterprise Dedicated Support Desk
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Direct escalation channel to Bever ML solutions architects, account managers, and compliance officers.
        </p>
      </div>

      <FeatureStatusBanner
        featureName="Enterprise Incident Escalation Queue"
        description="Automated PagerDuty/Slack enterprise concierge routing is currently in development. Escalations submitted below are held locally until live ticket dispatch is connected."
      />

      {sent && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Incident logged locally for preview. Live priority routing to your solutions architect is still in development.</span>
        </div>
      )}

      {/* Account Manager Card */}
      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-cyan-700 uppercase font-semibold block mb-1">
            Sample Dedicated Enterprise Account Contact
          </span>
          <h2 className="text-base font-semibold text-zinc-950">Enterprise Solutions Engineering</h2>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">
            Desk Email: enterprise-solutions@bever.ai
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-zinc-100 border border-black/[0.06] text-zinc-700 font-mono text-xs font-medium">
          24/7 Priority Support Tier
        </span>
      </div>

      {/* Ticket Form */}
      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
        <h2 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider font-mono pb-2 border-b border-black/[0.06]">
          Open Priority Support Incident
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-700 font-medium mb-1">Incident Urgency</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full bg-white border border-black/[0.09] rounded-xl px-3 py-2 text-zinc-900 focus:outline-hidden focus:border-zinc-950 font-mono"
              >
                <option>Standard (Turnaround &lt; 4h)</option>
                <option>High Priority (Turnaround &lt; 1h)</option>
                <option>Critical / Pipeline Blocker (Turnaround &lt; 15m)</option>
              </select>
            </div>
            <div>
              <label className="block text-zinc-700 font-medium mb-1">Campaign ID or Topic</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. PRJ-NEO-REASON Custom Schema Adjustment"
                className="w-full bg-white border border-black/[0.09] rounded-xl px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:border-zinc-950"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-700 font-medium mb-1">Incident Description &amp; Context</label>
            <textarea
              required
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe your request, target timelines, or ingestion requirements..."
              className="w-full bg-white border border-black/[0.09] rounded-xl p-3 text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:border-zinc-950"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Priority Incident</span>
          </button>
        </form>
      </div>
    </div>
  );
}
