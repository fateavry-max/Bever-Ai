'use client';

import React from 'react';
import Link from 'next/link';
import {
  Brain,
  Code,
  Languages,
  Database,
  FileCheck2,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { PublicLayout } from '@/components/layouts/PublicLayout';

const SERVICES = [
  {
    icon: Brain,
    title: 'Reinforcement Learning from Human Feedback (RLHF)',
    desc: 'Dense preference rankings, multi-turn reasoning critique, and boundary calibration. We train annotators on nuanced rubrics to capture model hallucinations that automated systems miss.',
    features: ['Pairwise & K-wise ranking datasets', 'Rubric dimension scoring (truthfulness, style, depth)', 'Chain-of-thought verification'],
  },
  {
    icon: Code,
    title: 'Code Generation & Execution Auditing',
    desc: 'Senior software developers evaluate algorithmic correctness, time complexity, security vulnerabilities, and idiomatic practices across 20+ programming languages.',
    features: ['Unit test generation & failure case analysis', 'Memory safety and vulnerability red-teaming', 'PEP8 / Idiomatic architecture grading'],
  },
  {
    icon: Languages,
    title: 'Multilingual Localization & Dialect Calibration',
    desc: 'Certified computational linguists across 40+ language pairs audit conversational tone, politeness levels (Keigo, Vous/Tu), and idiomatic fidelity.',
    features: ['Low-resource language pair support', 'High-context translation error analysis', 'Cultural nuance & colloquialism verification'],
  },
  {
    icon: ShieldAlert,
    title: 'Safety Red-Teaming & Adversarial Probing',
    desc: 'Adversarial testing designed to challenge model safety boundaries, jailbreaks, prompt injection resilience, and policy compliance.',
    features: ['Adversarial prompt crafting', 'CBRN & harm boundary stress testing', 'Mitigation efficacy benchmark reports'],
  },
  {
    icon: Database,
    title: 'High-Density Ground Truth Collection',
    desc: 'Custom dialogue generation, domain-specific Q&A curation, and tabular extraction across medicine, law, finance, and engineering.',
    features: ['Subject-matter expert authored dialogues', 'Multi-source factual citation backing', 'Direct JSONL, Parquet, and HF export'],
  },
  {
    icon: FileCheck2,
    title: 'Multi-Tier Quality Assurance (QA as a Service)',
    desc: 'Double-blind review pipelines, statistical agreement analysis (Cohen’s Kappa & Krippendorff’s Alpha), and continuous annotator calibration.',
    features: ['Statistical consensus verification', 'Automated gold-standard injection', 'Real-time throughput and accuracy dashboards'],
  },
];

export default function ServicesPage() {
  return (
    <PublicLayout>
      <div className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-500 uppercase tracking-widest mb-3">
              <span>Capabilities & Offerings</span>
              <span className="text-zinc-300">/</span>
              <span>Enterprise AI Services</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#09090B] tracking-tight mb-4">
              AI Training & Human Evaluation Services
            </h1>
            <p className="text-base text-zinc-600 leading-relaxed">
              Precision human intelligence infrastructure tailored for foundation model research labs and enterprise AI product teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="p-8 rounded-2xl bg-white border border-black/[0.06] shadow-xs hover:border-black/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-black/[0.04] text-zinc-800 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#09090B] mb-2">{s.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-6">{s.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-black/[0.04] space-y-2">
                    {s.features.map((f) => (
                      <div key={f} className="flex items-center gap-1.5 text-xs text-zinc-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-10 rounded-3xl bg-zinc-50 border border-black/[0.06] text-center max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#09090B] mb-3">Custom Enterprise Engagements</h2>
            <p className="text-sm text-zinc-500 max-w-xl mx-auto mb-8">
              Need custom annotator training, dedicated Slack channels, or on-premise deployment? Our enterprise solutions engineers can structure a customized pilot.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#09090B] hover:bg-zinc-800 text-white font-medium text-xs rounded-full shadow-xs transition-all"
            >
              <span>Schedule Technical Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
