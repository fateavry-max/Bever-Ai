'use client';

import React from 'react';
import { Quote } from 'lucide-react';
import { FeatureStatusBanner } from './FeatureStatusBanner';

export function Testimonials() {
  const sampleContributors = [
    {
      quote:
        'Evaluating model reasoning in distributed systems has been intellectually rewarding. The rubrics are rigorous, and it is fascinating to pinpoint subtle race conditions that automated linters completely miss.',
      name: 'Julian V.',
      title: 'Systems & Backend Evaluator',
      location: 'Berlin, Germany',
      initials: 'JV',
      category: 'Software Engineering',
      hoursActive: '18 hrs/week',
    },
    {
      quote:
        'Bever allows me to apply my graduate studies in Japanese honorifics to conversational AI. Reviewing nuances that distinguish natural Keigo from clumsy machine translation is work that genuinely matters.',
      name: 'Kenji T.',
      title: 'Computational Linguist & Localization Specialist',
      location: 'Tokyo, Japan',
      initials: 'KT',
      category: 'Language & Translation',
      hoursActive: '12 hrs/week',
    },
    {
      quote:
        'As a researcher, I appreciate the depth of the biomedical assessment tasks. Flagging inaccuracies in pharmacological pathways ensures training datasets don’t propagate risky hallucinations.',
      name: 'Dr. Sarah M.',
      title: 'Postdoctoral Fellow in Molecular Biology',
      location: 'Oxford, United Kingdom',
      initials: 'SM',
      category: 'Science & Medicine',
      hoursActive: '8 hrs/week',
    },
    {
      quote:
        'The flexibility lets me write and edit during quiet hours. Tracking task progress and seeing consistent payment schedules makes Bever feel like a truly professional platform.',
      name: 'Maya O.',
      title: 'Editorial & Narrative Stylist',
      location: 'Toronto, Canada',
      initials: 'MO',
      category: 'Writing & Editing',
      hoursActive: '20 hrs/week',
    },
  ];

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-3">
            <span>Contributor Perspectives</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span>Global Voices</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 text-balance">
            Voices from Our Global Network.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            See how contributors around the world integrate high-impact AI evaluation into their academic and professional routines.
          </p>
        </div>

        {/* In-development notice */}
        <div className="mb-8">
          <FeatureStatusBanner
            featureName="Verified Contributor Reviews"
            statusLabel="Not Ready Yet · Sample Track Scenarios"
            description="Live contributor review feeds are currently in development. The cards below illustrate planned platform roles and track profiles."
          />
        </div>

        {/* Testimonials 4-Card Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleContributors.map((c, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative"
            >
              <Quote className="w-8 h-8 text-indigo-500/20 absolute top-6 right-6" />
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic mb-6 relative z-10">
                &ldquo;{c.quote}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-bold text-xs font-mono">
                    {c.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {c.name}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                      {c.title} · {c.location}
                    </p>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 block">
                    {c.category}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {c.hoursActive}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
