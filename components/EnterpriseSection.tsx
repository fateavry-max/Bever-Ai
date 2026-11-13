'use client';

import React from 'react';
import {
  Building2,
  Database,
  CheckCircle2,
  Tags,
  Users2,
  Globe,
  ShieldCheck,
  Briefcase,
  BarChart3,
  ArrowRight,
  Lock,
} from 'lucide-react';

interface EnterpriseSectionProps {
  onContactTeam: () => void;
}

export function EnterpriseSection({ onContactTeam }: EnterpriseSectionProps) {
  const enterpriseFeatures = [
    {
      icon: Database,
      title: 'Human Data Collection',
      description:
        'High-density prompt-response pairs, specialized domain dialogues, and multimodal ground-truth datasets.',
    },
    {
      icon: CheckCircle2,
      title: 'AI Response Evaluation (RLHF/RLAIF)',
      description:
        'Rigorous pairwise rankings, multi-dimensional rubric scoring, truthfulness grading, and safety auditing.',
    },
    {
      icon: Tags,
      title: 'Precision Data Annotation',
      description:
        'Taxonomic classification, hierarchical entity linking, bounding box annotations, and document parsing.',
    },
    {
      icon: Users2,
      title: 'Vetted Subject-Matter Experts',
      description:
        'Credentialed specialists in law, medicine, biochemistry, enterprise finance, math, and computer science.',
    },
    {
      icon: Globe,
      title: 'Multilingual Evaluation (40+ Pairs)',
      description:
        'Native speakers and certified computational linguists across Europe, Asia-Pacific, LATAM, and Africa.',
    },
    {
      icon: ShieldCheck,
      title: 'Multi-Tier Quality Assurance',
      description:
        'Double-blind reviewer consensus, statistical inter-annotator agreement metrics, and gold-standard benchmarks.',
    },
    {
      icon: Briefcase,
      title: 'Dedicated Project Management',
      description:
        'Full operational support, SLA management, custom rubric engineering, and rapid turnaround cycles.',
    },
    {
      icon: BarChart3,
      title: 'Workforce & Pipeline Analytics',
      description:
        'Real-time throughput telemetry, annotator accuracy dashboards, and dataset provenance exports.',
    },
  ];

  return (
    <section id="for-businesses" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enterprise Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-3">
            <span>Enterprise Solutions</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span>Frontier Model Training</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 text-balance">
            Human Intelligence for Better AI.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Build better AI systems with high-quality human feedback, expert evaluation and scalable global contributor operations.
          </p>
        </div>

        {/* 8 Enterprise Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {enterpriseFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Enterprise Security Banner & CTA Box */}
        <div className="rounded-3xl p-8 sm:p-10 bg-linear-to-r from-slate-900 to-indigo-950 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-4 backdrop-blur-md">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Enterprise Data Governance & Strict NDAs</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                Scale Your Training Operations with Bever.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Whether fine-tuning foundational reasoning models or launching domain-specific vertical agents, our calibrated contributor network delivers reliable, reproducible results.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <button
                onClick={onContactTeam}
                className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold text-slate-950 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group whitespace-nowrap"
              >
                <span>Contact Our Team</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
