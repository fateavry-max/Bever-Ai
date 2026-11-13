'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { PublicLayout } from '@/components/layouts/PublicLayout';

const OPEN_ROLES = [
  {
    title: 'Senior Alignment & Rubric Engineer',
    team: 'Platform Intelligence',
    location: 'Remote (Global)',
    type: 'Full-time',
    desc: 'Lead the design of formal evaluation taxonomies, hallucination mitigation rubrics, and automated inter-annotator agreement metrics.',
  },
  {
    title: 'Staff Full-Stack Distributed Systems Engineer',
    team: 'Infrastructure',
    location: 'Remote / London / San Francisco',
    type: 'Full-time',
    desc: 'Scale our double-blind task distribution pipeline, real-time WebSocket workstations, and low-latency annotation stores.',
  },
  {
    title: 'Head of Contributor Community & Quality Operations',
    team: 'Workforce Operations',
    location: 'Remote (Americas / EMEA)',
    type: 'Full-time',
    desc: 'Oversee global recruitment, onboarding, dispute resolution, and weekly disbursement operations across 85+ countries.',
  },
  {
    title: 'Lead Computational Linguist — Multilingual Models',
    team: 'AI Evaluation Lab',
    location: 'Remote (Global)',
    type: 'Full-time',
    desc: 'Design localized benchmark test batteries and guide dialect calibration for European and Asian foundation models.',
  },
];

export default function CareersPage() {
  return (
    <PublicLayout>
      <div className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-500 uppercase tracking-widest mb-3">
              <span>Core Operations</span>
              <span className="text-zinc-300">/</span>
              <span>Open Positions</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#09090B] tracking-tight mb-4">
              Shape the Future of AI with Bever
            </h1>
            <p className="text-base text-zinc-600 leading-relaxed">
              We are a team of distributed systems engineers, alignment researchers, linguists, and community operators building the global infrastructure for human supervisory intelligence.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto mb-20">
            {OPEN_ROLES.map((r) => (
              <div
                key={r.title}
                className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs hover:border-black/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
                    <span className="font-mono font-medium text-zinc-700 bg-zinc-100 px-2.5 py-0.5 rounded border border-black/[0.05]">
                      {r.team}
                    </span>
                    <span className="text-zinc-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      {r.location}
                    </span>
                    <span className="text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      {r.type}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[#09090B] mb-1">{r.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed max-w-xl">{r.desc}</p>
                </div>

                <Link
                  href="/contact?intent=career"
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-[#09090B] border border-black/[0.06] rounded-full text-xs font-medium shrink-0 self-start sm:self-auto flex items-center gap-1.5 transition-all"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-2xl bg-zinc-50 border border-black/[0.06] text-center max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-[#09090B] mb-2">Looking for Contributor Task Opportunities?</h3>
            <p className="text-xs text-zinc-500 mb-5 leading-relaxed">
              If you want to evaluate AI responses, annotate datasets, or work as an independent reviewer on flexible hours, register directly on our contributor portal.
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
