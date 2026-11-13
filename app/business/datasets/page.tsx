'use client';

import React, { useState } from 'react';
import {
  UploadCloud,
  CheckCircle2,
} from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

interface Dataset {
  id: string;
  name: string;
  rowCount: string;
  format: 'JSONL' | 'Parquet' | 'CSV';
  schemaValidated: boolean;
  uploadedAt: string;
  linkedCampaign: string;
}

const sampleDatasets: Dataset[] = [
  {
    id: 'DS-REASON-RAW-01',
    name: 'Frontier Math Step Proof Ingestion Prompts',
    rowCount: '25,000 rows',
    format: 'JSONL',
    schemaValidated: true,
    uploadedAt: 'Apr 12, 2026',
    linkedCampaign: 'PRJ-NEO-REASON',
  },
  {
    id: 'DS-JAILBREAK-02',
    name: 'Adversarial Jailbreak Multi-Turn Prompts',
    rowCount: '10,000 rows',
    format: 'Parquet',
    schemaValidated: true,
    uploadedAt: 'Apr 20, 2026',
    linkedCampaign: 'PRJ-SAFETY-ALIGN',
  },
  {
    id: 'DS-AST-PY-03',
    name: 'LeetCode Hard AST Snippets & Tests',
    rowCount: '15,000 rows',
    format: 'JSONL',
    schemaValidated: true,
    uploadedAt: 'May 02, 2026',
    linkedCampaign: 'PRJ-SYNTH-CODE',
  },
];

export default function BusinessDatasetsPage() {
  const [uploadModal, setUploadModal] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
              Ground Truth Storage
            </span>
            <span className="text-xs text-zinc-400">·</span>
            <span className="text-xs text-zinc-500 font-mono">3 Sample Schemas</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            Raw Datasets &amp; Prompt Schemas
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Upload raw prompt distributions, validate JSON schemas, and link to active annotation pipelines.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setUploadModal(true)}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 transition-colors cursor-pointer"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Dataset File</span>
        </button>
      </div>

      <FeatureStatusBanner
        featureName="Dataset Ingestion Pipeline & Schema Validator"
        description="Multipart S3/GCS dataset uploads and automated JSON-Schema v2 verification are currently in development and not connected to cloud storage yet."
      />

      {notice && (
        <div className="p-3.5 rounded-xl bg-zinc-950 text-white text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      <div className="space-y-3">
        {sampleDatasets.map((ds) => (
          <div
            key={ds.id}
            className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/70">
                  {ds.id}
                </span>
                <span className="text-sm font-semibold text-zinc-950">{ds.name}</span>
              </div>
              <p className="text-xs text-zinc-500 font-mono">
                {ds.rowCount} · Format: {ds.format} · Uploaded: {ds.uploadedAt}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono shrink-0">
              <span className="text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Schema Validated
              </span>
              <span className="text-zinc-500">Linked: {ds.linkedCampaign}</span>
            </div>
          </div>
        ))}
      </div>

      {uploadModal && (
        <div className="fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-black/[0.08] rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-semibold text-zinc-950">Dataset Ingestion (In Development)</h3>
            <div className="border-2 border-dashed border-black/[0.12] rounded-xl p-8 text-center bg-zinc-50">
              <UploadCloud className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
              <p className="text-xs text-zinc-700 font-medium">Drag and drop JSONL or Parquet file</p>
              <span className="text-[11px] text-zinc-500 block mt-1">Cloud ingestion worker not connected yet</span>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setUploadModal(false)}
                className="px-4 py-2 text-xs text-zinc-600 hover:text-zinc-950 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setUploadModal(false);
                  setNotice('Dataset upload worker is currently in development and not accepting live files yet.');
                  setTimeout(() => setNotice(null), 4000);
                }}
                className="px-5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs cursor-pointer"
              >
                Check Ingestion Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
