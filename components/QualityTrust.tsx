'use client';

import React from 'react';
import {
  GraduationCap,
  BookCheck,
  SearchCheck,
  Scale,
  ShieldCheck,
  FileSpreadsheet,
} from 'lucide-react';

export function QualityTrust() {
  const pillars = [
    {
      icon: GraduationCap,
      title: 'Contributor Qualification',
      description:
        'Every applicant completes domain-specific benchmark tests and reasoning assessments prior to accessing client project queues.',
    },
    {
      icon: BookCheck,
      title: 'Project-Specific Guidelines',
      description:
        'Detailed edge-case syllabi and explicit negative constraints are supplied with every project to ensure consistent scoring.',
    },
    {
      icon: SearchCheck,
      title: 'Double-Blind Review Processes',
      description:
        'Contributions are calibrated through multi-rater consensus, automated consistency spot-checks, and senior reviewer audits.',
    },
    {
      icon: Scale,
      title: 'Continuous Quality Assurance',
      description:
        'Active accuracy metrics and peer alignment ratings track contributor performance over time to maintain elite standards.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Account Management',
      description:
        'Multi-factor identity authentication, project data access controls, and strict confidentiality protections on all evaluation flows.',
    },
    {
      icon: FileSpreadsheet,
      title: 'Transparent Project Standards',
      description:
        'Clear criteria and reviewer justifications allow contributors to understand every rating and continuously elevate their skills.',
    },
  ];

  return (
    <section className="py-20 md:py-28 relative bg-slate-50/60 dark:bg-slate-950/60 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-3">
            <span>Rigorous Methodology</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span>Trust & Integrity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 text-balance">
            Quality Begins With Human Expertise.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Frontier AI requires precision. Our multi-tiered evaluation pipeline ensures data integrity, unbiased feedback, and high reproducibility.
          </p>
        </div>

        {/* 6 Quality Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
