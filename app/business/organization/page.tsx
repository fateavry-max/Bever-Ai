'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

export default function BusinessOrganizationPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-5 border-b border-black/[0.06]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
            Enterprise Client Registry
          </span>
          <span className="text-xs text-zinc-400">·</span>
          <span className="text-xs text-zinc-500 font-mono">Org ID: ORG-SYNTH-849</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
          Organization Profile &amp; SLA Tier
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Manage corporate credentials, compliance agreements, data segregation parameters, and dedicated SLA contracts.
        </p>
      </div>

      <FeatureStatusBanner
        featureName="Enterprise Contract & Data Residency Portal"
        description="Live legal MSA sync and automated compliance attestation downloads are currently in development. Organization details below illustrate active configuration parameters."
      />

      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-200/80 flex items-center justify-center text-cyan-700 shrink-0">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold text-zinc-950">{user?.orgName || 'Enterprise Workspace'}</h2>
              <span className="text-[10px] font-mono bg-cyan-50 text-cyan-700 border border-cyan-200 px-2 py-0.5 rounded uppercase font-semibold">
                Enterprise Dedicated
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              Workspace Scope: Isolated Tenant · Region: US-West
            </p>
            <div className="flex items-center gap-3 text-xs text-zinc-500 mt-2 font-mono">
              <span className="text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                SOC 2 Type II Architecture Controls
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/business/team"
            className="px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs transition-colors flex items-center gap-1.5"
          >
            <Users className="w-4 h-4" />
            <span>Manage Team Seats</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
          <h3 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider font-mono pb-2 border-b border-black/[0.06]">
            SLA Contract Terms (Sample)
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center text-zinc-500">
              <span>Agreement Level:</span>
              <span className="font-mono text-cyan-700 font-semibold">Enterprise Tier 1 (99.9%)</span>
            </div>
            <div className="flex justify-between items-center text-zinc-500">
              <span>Inter-Annotator Agreement:</span>
              <span className="font-mono text-zinc-950 font-semibold">&gt; 98.0% Target</span>
            </div>
            <div className="flex justify-between items-center text-zinc-500">
              <span>Double-Blind Gold Standard:</span>
              <span className="font-mono text-emerald-700 font-semibold">10% Blind Injection</span>
            </div>
            <div className="flex justify-between items-center text-zinc-500">
              <span>Escalation Contact:</span>
              <span className="font-mono text-zinc-950 font-semibold">Solutions Engineering</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
          <h3 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider font-mono pb-2 border-b border-black/[0.06]">
            Data Sovereignty &amp; Encryption
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center text-zinc-500">
              <span>Data Retention Policy:</span>
              <span className="font-mono text-zinc-950 font-semibold">Zero-Retention Post Delivery</span>
            </div>
            <div className="flex justify-between items-center text-zinc-500">
              <span>Encryption in Transit / Rest:</span>
              <span className="font-mono text-cyan-700 font-semibold">TLS 1.3 / AES-256</span>
            </div>
            <div className="flex justify-between items-center text-zinc-500">
              <span>Data Residency:</span>
              <span className="font-mono text-zinc-950 font-semibold">US-West</span>
            </div>
            <div className="flex justify-between items-center text-zinc-500">
              <span>Worker Anonymization:</span>
              <span className="font-mono text-violet-700 font-semibold">Double-Blind Pseudonyms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
