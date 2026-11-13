'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileCheck2,
} from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

interface Credential {
  id: string;
  name: string;
  issuer: string;
  issuedAt: string;
  status: 'verified' | 'pending_review' | 'action_needed';
  summary: string;
}

const sampleCredentials: Credential[] = [
  {
    id: 'CRD-KYC-01',
    name: 'Government ID & Identity Verification (Persona)',
    issuer: 'Persona Verification Engine',
    issuedAt: 'Jan 14, 2026',
    status: 'verified',
    summary: 'Confirmed biometric match and passport validation for global tax compliance.',
  },
  {
    id: 'CRD-DEGREE-02',
    name: 'M.S. in Computer Science (MIT Alumni Registry)',
    issuer: 'Bever Academic Registrar Integration',
    issuedAt: 'Jan 16, 2026',
    status: 'verified',
    summary: 'Direct clearinghouse verification enabling Tier-1 Advanced Code Reasoning projects.',
  },
  {
    id: 'CRD-NDA-03',
    name: 'Proprietary Model Weights Confidentiality NDA',
    issuer: 'Bever Legal & Compliance',
    issuedAt: 'Jan 14, 2026',
    status: 'verified',
    summary: 'Signed legally binding double-blind mutual NDA covering pre-release LLM evaluation.',
  },
  {
    id: 'CRD-MED-04',
    name: 'USMLE Step 1 / Clinical Licensure Verification',
    issuer: 'National Board of Medical Examiners',
    issuedAt: 'Pending',
    status: 'pending_review',
    summary: 'Document submitted for clinical board check. Estimated verification: 2 business days.',
  },
];

export default function ContributorQualificationsPage() {
  const [submitNotice, setSubmitNotice] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs">
            <span className="font-mono text-zinc-500 font-medium">Verified Trust</span>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-700 font-mono">Tier 1 Contributor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight font-display">
            Credentials, Badges & Verification
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Bever maintains institutional-grade verification for academic credentials, legal NDAs, and identity.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSubmitNotice(true);
            setTimeout(() => setSubmitNotice(false), 3000);
          }}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer"
        >
          <FileCheck2 className="w-4 h-4" />
          <span>{submitNotice ? 'Credential Upload In Dev' : 'Submit Credential'}</span>
        </button>
      </div>

      <FeatureStatusBanner
        featureName="Credential & KYC Verification Pipeline"
        description="Persona biometric KYC checks, academic registry clearinghouse integrations, and NDA e-signing are currently in development."
      />

      {/* Tier Status Hero Card */}
      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-950 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-zinc-950 font-display">Tier 1 Elite Evaluator</span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded uppercase font-semibold">
                Active
              </span>
            </div>
            <p className="text-xs text-zinc-500 max-w-lg mt-1">
              Your profile is verified to access private enterprise model weights, prompt injection red-teaming, and high-payout reasoning tasks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-zinc-500 shrink-0">
          <div className="text-right">
            <span className="text-zinc-400 block text-[10px]">Hourly Cap</span>
            <span className="text-zinc-950 font-semibold text-sm tabular-nums">$65.00/hr</span>
          </div>
          <div className="text-right">
            <span className="text-zinc-400 block text-[10px]">Priority Dispatch</span>
            <span className="text-zinc-950 font-semibold text-sm">Ultra Fast</span>
          </div>
        </div>
      </div>

      {/* Credentials List */}
      <div className="space-y-3">
        {sampleCredentials.map((crd) => {
          const isVerified = crd.status === 'verified';
          return (
            <div
              key={crd.id}
              className="p-5 rounded-xl bg-white border border-black/[0.06] hover:border-zinc-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-zinc-400">{crd.id}</span>
                  <span className="text-xs text-zinc-500">Issuer: {crd.issuer}</span>
                </div>
                <h3 className="text-sm font-semibold text-zinc-950">{crd.name}</h3>
                <p className="text-xs text-zinc-500">{crd.summary}</p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                {isVerified ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified ({crd.issuedAt})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    Pending Clearance
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
