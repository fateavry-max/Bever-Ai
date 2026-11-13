'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  ArrowRight,
  ShieldCheck,
  FileText,
  CreditCard,
  Award,
  ChevronRight,
} from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  actionLabel: string;
  actionHref: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Identity Verification & Tax Compliance',
    description: 'Complete biometric matching, passport/ID submission, and digital W-9/W-8BEN certification via Persona.',
    status: 'completed',
    actionLabel: 'View Verified ID',
    actionHref: '/contributor/qualifications',
  },
  {
    id: 2,
    title: 'Confidentiality & Non-Disclosure Agreement',
    description: 'Sign the Bever Model Safety NDA prohibiting extraction, reproduction, or retention of prompt datasets.',
    status: 'completed',
    actionLabel: 'Executed Jan 14',
    actionHref: '/contributor/qualifications',
  },
  {
    id: 3,
    title: 'Bever RLHF Calibration Assessment',
    description: 'Take the 20-minute pairwise preference assessment to prove familiarity with hallucination detection.',
    status: 'completed',
    actionLabel: 'Score: 96% (Passed)',
    actionHref: '/contributor/assessments',
  },
  {
    id: 4,
    title: 'Payout Method & Banking Configuration',
    description: 'Connect your checking account or Stripe payout route for automated weekly Tuesday ACH transfers.',
    status: 'in_progress',
    actionLabel: 'Configure Payouts',
    actionHref: '/contributor/payouts',
  },
  {
    id: 5,
    title: 'Claim Your First Evaluation Task',
    description: 'Access the live queue, review side-by-side model outputs, and submit your first audited justification.',
    status: 'upcoming',
    actionLabel: 'Open Task Queue',
    actionHref: '/contributor/tasks',
  },
];

export default function ContributorOnboardingPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-cyan-500/15">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
            Activation Pipeline
          </span>
          <span className="text-xs text-slate-500">·</span>
          <span className="text-xs text-fuchsia-400 font-mono">Progress: 80%</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Contributor Onboarding & Readiness
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete the 5 compliance and skill calibration checkpoints to maintain full queue access and expedited payouts.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="p-5 rounded-2xl bg-[#080C16] border border-cyan-500/20 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-300 font-semibold">Onboarding Completion</span>
          <span className="font-mono text-cyan-300 font-bold">4 of 5 Steps Finished</span>
        </div>
        <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
          <div className="h-full bg-linear-to-r from-cyan-400 to-fuchsia-500 w-4/5" />
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {steps.map((step) => {
          const isCompleted = step.status === 'completed';
          const isInProgress = step.status === 'in_progress';

          return (
            <div
              key={step.id}
              className={`p-5 rounded-xl bg-[#080B14] border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isInProgress
                  ? 'border-cyan-400 bever-border-cyan-glow'
                  : isCompleted
                  ? 'border-slate-800/80 opacity-90'
                  : 'border-slate-800/40 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : isInProgress ? (
                    <div className="w-5 h-5 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    </div>
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono text-slate-500">Step 0{step.id}</span>
                    <h3 className="text-sm font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xl">{step.description}</p>
                </div>
              </div>

              <div className="shrink-0 sm:self-center">
                <Link
                  href={step.actionHref}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isInProgress
                      ? 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : isCompleted
                      ? 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
                      : 'bg-slate-900/40 text-slate-600 border border-slate-900 pointer-events-none'
                  }`}
                >
                  <span>{step.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
