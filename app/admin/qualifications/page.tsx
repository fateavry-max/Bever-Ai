'use client';

import React from 'react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

export default function AdminQualificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
              Credentialing Framework
            </span>
            <span className="text-xs text-zinc-400">·</span>
            <span className="text-xs text-zinc-500 font-mono">Qualification Specifications</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            Qualifications &amp; Verified Badges
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Establish credentialing tiers, academic registry clearinghouse parameters, and automated rate multipliers.
          </p>
        </div>
      </div>

      <FeatureStatusBanner
        featureName="Academic Clearinghouse & Credential Badge Issuance"
        description="Automated university transcript verification and dynamic rate multiplier provisioning are currently in development."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-semibold text-cyan-700">CRD-TIER1-ELITE</span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              Spec Active
            </span>
          </div>
          <h3 className="text-base font-semibold text-zinc-950 mb-1">Tier 1 Verified Evaluator</h3>
          <p className="text-xs text-zinc-500 mb-3">
            Requires accredited MS/PhD or 5+ years industry engineering experience. Unlocks $55–$75/hr specialized queues.
          </p>
          <div className="text-xs font-mono text-zinc-500 pt-2 border-t border-black/[0.06] flex justify-between">
            <span>Target Tier Capacity: Specialized</span>
            <span className="text-cyan-700">Rate Boost: +35%</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-semibold text-violet-700">CRD-NDA-CORE</span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              Spec Active
            </span>
          </div>
          <h3 className="text-base font-semibold text-zinc-950 mb-1">Mutual Model Safety NDA</h3>
          <p className="text-xs text-zinc-500 mb-3">
            Mandatory signed legal agreement covering proprietary unreleased foundational model weights.
          </p>
          <div className="text-xs font-mono text-zinc-500 pt-2 border-t border-black/[0.06] flex justify-between">
            <span>Scope: Global Contributors</span>
            <span className="text-emerald-700">100% Required</span>
          </div>
        </div>
      </div>
    </div>
  );
}
