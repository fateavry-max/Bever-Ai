'use client';

import React from 'react';
import Link from 'next/link';
import {
  UserPlus,
  Award,
  Layers,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { PublicLayout } from '@/components/layouts/PublicLayout';

const STEPS = [
  {
    step: '01',
    icon: UserPlus,
    title: 'Create Your Contributor Profile',
    desc: 'Register and set up your verified profile. Specify your academic background, technical proficiencies, spoken languages, and project track preferences.',
    details: ['Government ID verification check', 'Domain specialty selection', 'Tax & weekly payout configuration'],
  },
  {
    step: '02',
    icon: Award,
    title: 'Complete Domain Calibrations',
    desc: 'Demonstrate your capabilities through calibrated benchmark tasks. Tests evaluate reasoning accuracy, instruction adherence, and guideline comprehension.',
    details: ['Standardized 30–60 min assessments', 'Detailed rubric scoring feedback', 'Automatic tier placement on passing'],
  },
  {
    step: '03',
    icon: Layers,
    title: 'Execute Quality Training Tasks',
    desc: 'Access your assigned project queue. Complete pairwise response rankings, red-teaming, or code evaluations under double-blind peer verification.',
    details: ['Flexible remote task scheduling', 'Real-time agreement & consensus tracking', 'Direct weekly ACH/wire disbursements'],
  },
];

export default function HowItWorksPage() {
  return (
    <PublicLayout>
      <div className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-500 uppercase tracking-widest mb-3">
              <span>Architecture & Flow</span>
              <span className="text-zinc-300">/</span>
              <span>Contributor Lifecycle</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#09090B] tracking-tight mb-4">
              How Bever Works
            </h1>
            <p className="text-base text-zinc-600 leading-relaxed">
              A transparent, merit-driven evaluation pipeline connecting skilled specialists with enterprise model training teams.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-6 max-w-4xl mx-auto mb-20">
            {STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="p-8 rounded-2xl bg-white border border-black/[0.06] shadow-xs hover:border-black/20 transition-all flex flex-col md:flex-row gap-6 items-start"
                >
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-2xl font-mono font-semibold text-zinc-300">
                      {s.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-black/[0.04] text-zinc-800 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#09090B] mb-2">{s.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-4">{s.desc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {s.details.map((d) => (
                        <div key={d} className="flex items-center gap-1.5 text-xs text-zinc-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Box */}
          <div className="p-8 rounded-2xl bg-zinc-50 border border-black/[0.06] text-center max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-[#09090B] mb-2">Ready to Start?</h3>
            <p className="text-xs text-zinc-500 mb-5">
              Registration takes less than 3 minutes. Explore available qualification assessments today.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#09090B] hover:bg-zinc-800 text-white font-medium text-xs rounded-full shadow-xs transition-all"
            >
              <span>Join as Contributor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
