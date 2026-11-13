'use client';

import React, { useState } from 'react';
import {
  Scale,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

interface Ticket {
  id: string;
  category: 'Dispute Feedback' | 'Payment Issue' | 'Task Glitch' | 'General';
  subject: string;
  status: 'open' | 'investigating' | 'resolved';
  updatedAt: string;
}

const sampleTickets: Ticket[] = [
  {
    id: 'DISP-4102',
    category: 'Dispute Feedback',
    subject: 'Contested justification minimum length flag on SUB-8812-D',
    status: 'investigating',
    updatedAt: '3 hours ago',
  },
  {
    id: 'TICK-3914',
    category: 'Payment Issue',
    subject: 'Confirmation of Chase ACH routing format update',
    status: 'resolved',
    updatedAt: 'May 10, 2026',
  },
];

export default function ContributorSupportPage() {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Dispute Feedback');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSubject('');
      setDescription('');
      setNotice('Ticket draft recorded locally. Live submission to the Bever Quality Review Council is currently in development.');
      setTimeout(() => setNotice(null), 5000);
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-black/[0.06]">
        <div className="flex items-center gap-2 mb-1 text-xs">
          <span className="font-mono text-zinc-500 font-medium">Fair Resolution Council</span>
          <span className="text-zinc-300">·</span>
          <span className="text-zinc-700 font-mono">Response SLA: &lt; 24h</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight font-display">
          Contributor Help & Dispute Desk
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Bever guarantees objective, multi-auditor reviews for any contested task feedback, score deductions, or payment discrepancies.
        </p>
      </div>

      <FeatureStatusBanner
        featureName="Dispute & Support Ticketing Backend"
        description="Live ticket routing to the Bever Quality Review Council and dispute arbitration webhooks are currently in development."
      />

      {notice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ticket Form */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-black/[0.06]">
            <Scale className="w-4 h-4 text-zinc-700" />
            <h2 className="text-sm font-semibold text-zinc-950 font-display">
              Open a Dispute or Inquiry
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-600 font-medium mb-1">Issue Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 focus:outline-hidden focus:border-zinc-950"
              >
                <option>Dispute Feedback (Consensus Re-review)</option>
                <option>Payment Issue (Payout ACH)</option>
                <option>Task Glitch (UI or Model Hang)</option>
                <option>General Support Question</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-600 font-medium mb-1">Subject / Task ID</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. SUB-8812-D Justification Re-evaluation"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:border-zinc-950"
              />
            </div>

            <div>
              <label className="block text-zinc-600 font-medium mb-1">Detailed Explanation</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the rationale for the dispute, citing rubric guidelines or screenshot evidence..."
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:border-zinc-950"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitted ? 'Saving Draft...' : 'Submit Dispute'}</span>
            </button>
          </form>
        </div>

        {/* Existing Disputes */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-3">
            <h3 className="text-xs font-semibold text-zinc-950 uppercase font-mono pb-2 border-b border-black/[0.06]">
              Sample Disputes & Inquiries
            </h3>

            <div className="space-y-2.5">
              {sampleTickets.map((t) => (
                <div key={t.id} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-zinc-700 font-medium">{t.id}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        t.status === 'resolved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {t.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="font-medium text-zinc-900 text-[11px] line-clamp-2">{t.subject}</p>
                  <span className="text-[10px] text-zinc-400 block mt-1">{t.updatedAt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
