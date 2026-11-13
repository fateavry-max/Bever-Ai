'use client';

import React, { useState } from 'react';
import {
  DownloadCloud,
  ExternalLink,
  CheckCircle2,
  Package,
} from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

interface Deliverable {
  id: string;
  batchName: string;
  projectId: string;
  rowCount: string;
  format: 'JSONL (DPO)' | 'Parquet' | 'SFT Pairs';
  sha256: string;
  completionDate: string;
  sizeMb: string;
}

const sampleDeliverables: Deliverable[] = [
  {
    id: 'DELIV-849-01',
    batchName: 'Batch #812 — Mathematical Reasoning Preference Vectors',
    projectId: 'PRJ-NEO-REASON',
    rowCount: '4,200 rows',
    format: 'JSONL (DPO)',
    sha256: '9f81a7b...4c21',
    completionDate: 'Sample Batch',
    sizeMb: '48.2 MB',
  },
  {
    id: 'DELIV-849-02',
    batchName: 'Batch #811 — Mathematical Reasoning Proof Evaluations',
    projectId: 'PRJ-NEO-REASON',
    rowCount: '5,000 rows',
    format: 'JSONL (DPO)',
    sha256: '3e12c89...0b12',
    completionDate: 'Sample Batch',
    sizeMb: '56.4 MB',
  },
  {
    id: 'DELIV-849-03',
    batchName: 'Batch #792 — Adversarial Prompt Injections Red-Team',
    projectId: 'PRJ-SAFETY-ALIGN',
    rowCount: '9,200 rows',
    format: 'Parquet',
    sha256: '1a90d45...8f77',
    completionDate: 'Sample Batch',
    sizeMb: '92.1 MB',
  },
];

export default function BusinessDeliverablesPage() {
  const [notice, setNotice] = useState<string | null>(null);

  const handleAction = (message: string) => {
    setNotice(message);
    setTimeout(() => setNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
              Gold Deliverables
            </span>
            <span className="text-xs text-zinc-400">·</span>
            <span className="text-xs text-zinc-500 font-mono">18,400 Sample Schema Rows</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            Annotated Deliverables &amp; Export Batches
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Download certified DPO pairwise preference datasets and SFT trajectories with SHA-256 integrity hashes.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            handleAction('HuggingFace Hub & S3 signed webhook sync is in development and not connected to live storage yet.')
          }
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-50 text-zinc-700 border border-black/[0.09] text-xs font-medium flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-zinc-500" />
          <span>Sync HuggingFace Hub</span>
        </button>
      </div>

      <FeatureStatusBanner
        featureName="Signed Dataset Delivery & S3 / HuggingFace Exports"
        description="Automated Parquet/JSONL batch packaging, SHA-256 manifest signing, and direct bucket webhooks are currently in development. Rows shown below represent sample schema previews."
      />

      {notice && (
        <div className="p-3.5 rounded-xl bg-zinc-950 text-white text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      <div className="space-y-3">
        {sampleDeliverables.map((deliv) => (
          <div
            key={deliv.id}
            className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-semibold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded border border-cyan-200/70 inline-flex items-center gap-1">
                  <Package className="w-3 h-3" />
                  {deliv.id}
                </span>
                <span className="text-sm font-semibold text-zinc-950">{deliv.batchName}</span>
                <span className="text-[10px] font-mono text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded border border-black/[0.06]">
                  {deliv.format}
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-mono">
                {deliv.rowCount} · {deliv.sizeMb} · SHA-256: {deliv.sha256} · {deliv.completionDate}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() =>
                  handleAction(
                    `Signed export download for ${deliv.id} is not ready yet. Cloud storage bucket integration is in development.`
                  )
                }
                className="px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <DownloadCloud className="w-4 h-4" />
                <span>Download Export</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
