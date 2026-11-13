'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  BookOpen,
  CheckCheck,
  Eye,
  Lock,
  Scale,
  ArrowRight,
  AlertTriangle,
  FileSearch,
} from 'lucide-react';

const QUALITY_PILLARS = [
  {
    icon: Award,
    title: 'Contributor Qualification Rigor',
    tagline: 'Domain-specific testing before queue access',
    description:
      'Every contributor must complete an un-timed calibration assessment containing verified golden tasks. Our algorithms evaluate reasoning depth, constraint adherence, and analytical precision before granting live project permissions.',
  },
  {
    icon: BookOpen,
    title: 'Project-Specific Rubric Guidelines',
    tagline: 'Standardized evaluation frameworks',
    description:
      'Tasks are anchored in unambiguous evaluation rubrics co-designed with research scientists. Evaluators grade along discrete dimensions (factual truth, logic soundness, helpfulness, and safety) rather than subjective impressions.',
  },
  {
    icon: Eye,
    title: 'Double-Blind Review Processes',
    tagline: 'Eliminating evaluator bias',
    description:
      'Evaluators do not know which model produced Response A vs Response B, nor do they see other contributors’ initial ratings until both have submitted. This prevents anchoring bias and conformity cascades.',
  },
  {
    icon: CheckCheck,
    title: 'Continuous Quality Audits',
    tagline: 'Ongoing calibration tracking',
    description:
      'A percentage of tasks served in active queues are pre-calibrated golden benchmarks with known ground truth. System algorithms detect performance drift early, triggering refresher tutorials before errors propagate.',
  },
  {
    icon: Lock,
    title: 'Secure Account Management',
    tagline: 'Identity verification & data integrity',
    description:
      'Multi-factor authentication, device authorization checks, and automated behavioral telemetry guard against bots, multi-accounting, and synthetic generation shortcuts.',
  },
  {
    icon: Scale,
    title: 'Transparent Project Standards',
    tagline: 'Objective scoring with appeal mechanisms',
    description:
      'Contributors can inspect reviewer feedback, dispute anomalous rejections through a senior auditor panel, and maintain a verifiable quality score history.',
  },
];

export default function QualityTrustPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200">Trust & Quality</span>
        </div>

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Platform Integrity & Methodology</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-4">
            Quality Begins With Human Expertise.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Machine learning models amplify the data they are trained on.
            Discover how Bever enforces scientific rigor, double-blind protocols, and multi-tier auditing to deliver world-class supervisory signal.
          </p>
        </div>

        {/* The 6 Quality Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {QUALITY_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-3">
                    {pillar.tagline}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inter-Annotator Agreement Consensus Deep Dive */}
        <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-br from-slate-900 to-indigo-950 text-white shadow-xl mb-20">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 block mb-2">
              Consensus Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
              How Bever Solves Inter-Annotator Variance
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Human judgment naturally exhibits subjectivity. Bever uses algorithmic agreement models to separate genuine preference divergence from erroneous evaluations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white/10 border border-white/15">
              <span className="font-mono text-2xl font-bold text-indigo-300 block mb-1">
                K &gt; 0.82
              </span>
              <h4 className="text-xs font-bold mb-1">High Inter-Annotator Agreement</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                We calibrate rubrics until Cohen’s Kappa consistently exceeds industry benchmarks for reliable supervised learning.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/15">
              <span className="font-mono text-2xl font-bold text-indigo-300 block mb-1">
                3-Way
              </span>
              <h4 className="text-xs font-bold mb-1">Dynamic Adjudication</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                When two independent contributors disagree on a high-stakes task, the submission is automatically escalated to a senior subject-matter referee.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/15">
              <span className="font-mono text-2xl font-bold text-indigo-300 block mb-1">
                0%
              </span>
              <h4 className="text-xs font-bold mb-1">Synthetically Injected Noise</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Automated style & length normalization prevents models from gaming human evaluators through superficial formatting tricks.
              </p>
            </div>
          </div>
        </div>

        {/* Responsible Standard Statement */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-3 max-w-3xl mx-auto mb-16">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-700 dark:text-slate-300 block mb-1">Compliance & Integrity Commitment</strong>
            Bever does not claim compliance certifications, governmental clearances, or institutional partnerships that have not been formally finalized. All quality and review systems described represent our actual software architecture and operational practices.
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold hover:bg-indigo-600 transition-colors shadow-sm"
          >
            <span>Explore Opportunities with Bever</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
