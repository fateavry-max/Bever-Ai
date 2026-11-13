'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  PlusCircle,
  ChevronLeft,
  CheckCircle2,
} from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

export default function BusinessNewProjectPage() {
  const router = useRouter();
  const [taskType, setTaskType] = useState('rlhf_pairwise');
  const [tier, setTier] = useState('tier1');
  const [volume, setVolume] = useState('10000');
  const [projectName, setProjectName] = useState('');
  const [launched, setLaunched] = useState(false);

  const handleLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    setLaunched(true);
    setTimeout(() => {
      router.push('/business/projects');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-5 border-b border-black/[0.06]">
        <Link
          href="/business/projects"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-950 font-mono mb-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
            Campaign Provisioning
          </span>
          <span className="text-xs text-zinc-400">·</span>
          <span className="text-xs text-zinc-500 font-mono">Queue Allocation Builder</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
          Launch New AI Training Campaign
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Configure prompt schemas, human contributor vetting tiers, inter-annotator agreement thresholds, and delivery export pipelines.
        </p>
      </div>

      <FeatureStatusBanner
        featureName="Automated Queue Allocation Engine"
        description="Automated campaign provisioning to live contributor task pools is currently in development. Submitting this form previews configuration validation only."
      />

      {launched && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Campaign configuration validated. Redirecting to Projects directory...</span>
        </div>
      )}

      <form onSubmit={handleLaunch} className="space-y-6">
        {/* Step 1: Project Metadata */}
        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
          <h2 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider font-mono pb-2 border-b border-black/[0.06]">
            1. Campaign Metadata
          </h2>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-zinc-700 font-medium mb-1">Campaign Title</label>
              <input
                type="text"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Reasoning Step Verification for Frontier Math 4B"
                className="w-full bg-white border border-black/[0.09] rounded-xl px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:border-zinc-950"
              />
            </div>
            <div>
              <label className="block text-zinc-700 font-medium mb-1">Modality &amp; Task Topology</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setTaskType('rlhf_pairwise')}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    taskType === 'rlhf_pairwise'
                      ? 'bg-cyan-50/70 border-cyan-500 text-zinc-950'
                      : 'bg-zinc-50 border-black/[0.06] text-zinc-600'
                  }`}
                >
                  <span className="font-semibold text-xs block mb-1">Pairwise RLHF</span>
                  <span className="text-[11px] leading-tight block">Model A vs B preference with step justification</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTaskType('red_teaming')}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    taskType === 'red_teaming'
                      ? 'bg-cyan-50/70 border-cyan-500 text-zinc-950'
                      : 'bg-zinc-50 border-black/[0.06] text-zinc-600'
                  }`}
                >
                  <span className="font-semibold text-xs block mb-1">Safety Red-Teaming</span>
                  <span className="text-[11px] leading-tight block">Adversarial attacks, jailbreaks, and policy evasion</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTaskType('sft_authoring')}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    taskType === 'sft_authoring'
                      ? 'bg-cyan-50/70 border-cyan-500 text-zinc-950'
                      : 'bg-zinc-50 border-black/[0.06] text-zinc-600'
                  }`}
                >
                  <span className="font-semibold text-xs block mb-1">Gold Response Authoring</span>
                  <span className="text-[11px] leading-tight block">Expert gold human-authored target SFT responses</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Quality & Contributor Tier */}
        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
          <h2 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider font-mono pb-2 border-b border-black/[0.06]">
            2. Contributor Qualification Tier
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <button
              type="button"
              onClick={() => setTier('tier1')}
              className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                tier === 'tier1'
                  ? 'bg-cyan-50/70 border-cyan-500 text-zinc-950'
                  : 'bg-zinc-50 border-black/[0.06] text-zinc-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-zinc-950">Tier 1: Verified Domain PhD / MS</span>
                <span className="font-mono text-[10px] bg-cyan-50 px-2 py-0.5 rounded text-cyan-700 border border-cyan-200">
                  99%+ Agreement
                </span>
              </div>
              <p className="text-[11px] text-zinc-600">
                Screened computer scientists, lawyers, mathematicians, and research doctors.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setTier('tier2')}
              className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                tier === 'tier2'
                  ? 'bg-cyan-50/70 border-cyan-500 text-zinc-950'
                  : 'bg-zinc-50 border-black/[0.06] text-zinc-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-zinc-950">Tier 2: Professional Evaluators</span>
                <span className="font-mono text-[10px] bg-zinc-100 px-2 py-0.5 rounded text-zinc-600 border border-black/[0.06]">
                  98%+ Agreement
                </span>
              </div>
              <p className="text-[11px] text-zinc-600">
                General language alignment, instruction following, and factual consistency checks.
              </p>
            </button>
          </div>
        </div>

        {/* Step 3: Volume & Submit */}
        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
          <h2 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider font-mono pb-2 border-b border-black/[0.06]">
            3. Volume &amp; Delivery Target
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-zinc-700 font-medium mb-1">Desired Prompt Volume</label>
              <select
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full bg-white border border-black/[0.09] rounded-xl px-3 py-2 text-zinc-900 focus:outline-hidden focus:border-zinc-950 font-mono"
              >
                <option value="5000">5,000 Prompts (Turnaround ~48h)</option>
                <option value="10000">10,000 Prompts (Turnaround ~72h)</option>
                <option value="25000">25,000 Prompts (Turnaround ~5 days)</option>
                <option value="100000">100,000 Prompts (Enterprise Sprint)</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-700 font-medium mb-1">Gold Standard Audit Rate</label>
              <div className="p-2.5 rounded-xl bg-zinc-50 border border-black/[0.06] text-xs font-mono text-zinc-800 flex items-center justify-between">
                <span>10% Double-Blind Injections</span>
                <span className="text-emerald-700 text-[10px]">Zero False Consensus</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <div className="text-xs font-mono text-zinc-500">
              Queue Allocation Mode: <span className="text-zinc-950 font-semibold">Preview Validation</span>
            </div>

            <button
              type="submit"
              disabled={launched}
              className="px-6 py-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{launched ? 'Validating Schema...' : 'Save Campaign Draft'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
