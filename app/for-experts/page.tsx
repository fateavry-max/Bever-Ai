'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  GraduationCap,
  Code,
  Sigma,
  FlaskConical,
  Languages,
  PenTool,
  Scale,
  Brain,
  ArrowRight,
  CheckCircle2,
  Clock,
  Globe2,
} from 'lucide-react';
import { ApplicationModal } from '@/components/ApplicationModal';

const EXPERT_TRACKS = [
  {
    icon: Code,
    title: 'Software Engineers & Architects',
    tagline: 'Python, C++, Rust, Distributed Systems, Cloud Architecture',
    benchmark: '$45 – $85 / hr',
    description:
      'Evaluate deep code logic, adversarial test suite construction, concurrency bugs, optimization trade-offs, and security vulnerabilities produced by frontier coding models.',
    projects: ['Python Backend Benchmarking', 'Rust Memory Safety Auditing', 'Async Systems Evaluation'],
  },
  {
    icon: Sigma,
    title: 'Mathematicians & Statisticians',
    tagline: 'Abstract Algebra, Topology, Calculus, Stochastic Processes',
    benchmark: '$50 – $95 / hr',
    description:
      'Audit multi-step formal proofs, identify hallucinated lemmas, verify LaTeX formulations, and assess mathematical reasoning fidelity.',
    projects: ['Olympiad Math Proof Verification', 'Statistical Reasoning Calibration'],
  },
  {
    icon: FlaskConical,
    title: 'Scientists & Researchers',
    tagline: 'Biochemistry, Organic Chemistry, Physics, Neuroscience, Medicine',
    benchmark: '$55 – $110 / hr',
    description:
      'Review complex scientific claims, verify citation validity, validate biochemical reaction mechanisms, and ensure factual integrity for scientific research assistants.',
    projects: ['Frontier Science & Chemistry Verification', 'Biomedical Literature QA'],
  },
  {
    icon: Languages,
    title: 'Linguists & Translators',
    tagline: '40+ Languages, Dialect Adaptation, Cultural Nuance, Pragmatics',
    benchmark: '$30 – $55 / hr',
    description:
      'Assess low-resource language translations, evaluate idiom preservation, score pragmatic naturalness, and localize AI assistants for regional cultural norms.',
    projects: ['Multilingual Reasoning & Localization', 'Cross-Lingual Semantic QA'],
  },
  {
    icon: PenTool,
    title: 'Writers, Editors & Humanities',
    tagline: 'Technical Writing, Literary Style, Tone Calibration, Fact Checking',
    benchmark: '$28 – $48 / hr',
    description:
      'Refine model tone, test stylistic versatility, evaluate long-form coherence, and eliminate generic or repetitive AI prose patterns.',
    projects: ['Creative Prose & Stylistic Editing', 'Executive Briefing Benchmarking'],
  },
  {
    icon: Scale,
    title: 'Legal, Ethics & Policy Specialists',
    tagline: 'Jurisprudence, Regulatory Compliance, Red Teaming, IP Law',
    benchmark: '$60 – $120 / hr',
    description:
      'Stress-test models against complex legal scenarios, perform red-teaming against sensitive queries, and ensure adherence to international privacy standards.',
    projects: ['Frontier Model Red Teaming', 'Regulatory Compliance Auditing'],
  },
];

export default function ForExpertsPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200">For Experts</span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-medium mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Frontier Human Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-4">
            Your Expertise Has a Place Here.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            The next generation of AI systems requires deep, domain-specific human reasoning.
            Put your graduate studies, professional experience, and technical acumen to work training frontier models on your schedule.
          </p>
        </div>

        {/* Value Proposition Grid for Experts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <Clock className="w-6 h-6 text-indigo-500 mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Complete Schedule Autonomy
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Log in whenever you have availability. Whether you want to contribute 5 hours on weekends or 30 hours per week between research duties, you choose your cadence.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <Award className="w-6 h-6 text-indigo-500 mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Competitive Benchmark Rates
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Specialized domain experts command high benchmark hourly compensation (ranging from $40 up to $120/hr) reflecting the depth and precision of your academic and industry knowledge.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <Brain className="w-6 h-6 text-indigo-500 mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Frontier Research Impact
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Your feedback directly shapes how leading AI laboratories train reasoning models, eliminate scientific hallucinations, and teach models to tackle complex real-world logic.
            </p>
          </div>
        </div>

        {/* Specialized Domain Tracks */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                Active Expert Disciplines
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Explore specialized tracks seeking qualified contributors and subject-matter leaders.
              </p>
            </div>
            <Link
              href="/opportunities"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View all open project tracks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERT_TRACKS.map((track) => {
              const Icon = track.icon;
              return (
                <div
                  key={track.title}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-xs hover:border-indigo-400/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                        {track.benchmark}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                      {track.title}
                    </h3>
                    <p className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 mb-3">
                      {track.tagline}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {track.description}
                    </p>

                    <div className="space-y-1.5 mb-6">
                      <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                        Representative Projects
                      </span>
                      {track.projects.map((proj, pIdx) => (
                        <div key={pIdx} className="text-[11px] text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                          <span>{proj}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedRole(track.title);
                      setIsApplyModalOpen(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply for {track.title.split(' ')[0]} Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Contributor Community Strip */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center max-w-4xl mx-auto">
          <Globe2 className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Join Specialists in Over 85 Countries
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto mb-6">
            Bever accepts qualified subject-matter experts across North America, Europe, Latin America, Africa, Asia, and Australasia. All work is 100% remote.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/apply"
              className="px-6 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold hover:bg-indigo-600 transition-colors shadow-sm"
            >
              Start Expert Onboarding
            </Link>
          </div>
        </div>
      </div>

      {/* Application Wizard Modal */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        initialRole={selectedRole || undefined}
      />
    </div>
  );
}
