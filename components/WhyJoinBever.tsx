'use client';

import React from 'react';
import {
  Globe2,
  Compass,
  Calendar,
  GraduationCap,
  Briefcase,
  Receipt,
  Cpu,
  Shield,
  ArrowRight,
} from 'lucide-react';

interface WhyJoinBeverProps {
  onJoinClick: () => void;
}

export function WhyJoinBever({ onJoinClick }: WhyJoinBeverProps) {
  const benefits = [
    {
      icon: Globe2,
      title: 'Global AI Training Opportunities',
      description:
        'Connect with cutting-edge projects from leading AI research labs and global enterprises from wherever you are in the world.',
    },
    {
      icon: Compass,
      title: 'Multidisciplinary Knowledge Domains',
      description:
        'Engage across writing, software engineering, law, science, translation, and advanced mathematics to keep your work varied.',
    },
    {
      icon: Calendar,
      title: 'Flexible Project Participation',
      description:
        'Choose when and how much you work according to project availability. Balance your contributions around your studies or career.',
    },
    {
      icon: GraduationCap,
      title: 'Develop Frontier AI Evaluation Skills',
      description:
        'Gain specialized expertise in RLHF, instruction tuning, model alignment, and prompt evaluation methodologies.',
    },
    {
      icon: Briefcase,
      title: 'Build Verifiable Professional Experience',
      description:
        'Deepen your critical reasoning and analytical portfolio as an accredited human-in-the-loop AI contributor.',
    },
    {
      icon: Receipt,
      title: 'Transparent Task and Payment Tracking',
      description:
        'Real-time contributor dashboard showing every submitted task, reviewer feedback, and scheduled payout balance.',
    },
    {
      icon: Cpu,
      title: 'Direct Contribution to Emerging AI',
      description:
        'Your nuanced feedback directly informs the weights, safety guardrails, and reasoning capabilities of tomorrow’s AI systems.',
    },
  ];

  return (
    <section className="py-20 md:py-28 relative bg-slate-50/50 dark:bg-slate-950/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Value summary */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-3">
              <span>Platform Advantages</span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span>Contributor Centric</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 text-balance">
              Built for Thinkers, Specialists, and Makers.
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Bever offers a professional, transparent platform where intellectual rigor is valued. We provide the tools, rubrics, and feedback loops you need to thrive.
            </p>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-8 text-xs text-slate-500 dark:text-slate-400 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                <Shield className="w-4 h-4 text-indigo-600" />
                <span>Responsible Platform Principles</span>
              </div>
              <p>
                We believe in transparency. Task availability varies by project demand, language pair, and client needs. Qualification is required, and we do not guarantee fixed earnings or automatic project acceptance.
              </p>
            </div>

            <button
              onClick={onJoinClick}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xs"
            >
              <span>Join the Bever Community</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: 7 Benefits Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow ${
                    idx === benefits.length - 1 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
