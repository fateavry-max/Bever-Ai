'use client';

import React from 'react';
import Link from 'next/link';
import {
  Globe,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { PublicLayout } from '@/components/layouts/PublicLayout';

const VALUES = [
  {
    icon: Lightbulb,
    title: 'Truth in Model Alignment',
    description:
      'We believe artificial intelligence alignment begins with rigorous, empirical human critique. Our contributors are trained to identify hallucinations, challenge assumptions, and uphold ground truth.',
  },
  {
    icon: Globe,
    title: 'Global Meritocratic Intelligence',
    description:
      'Human insight is distributed equally around the world. We connect talented minds across 85+ countries directly with frontier AI labs, regardless of geography or traditional pedigree.',
  },
  {
    icon: HeartHandshake,
    title: 'Intellectual Respect for Evaluators',
    description:
      'We treat AI trainers as valued cognitive partners. That means transparent hourly benchmarks, prompt automated weekly payouts, and respectful qualification processes.',
  },
  {
    icon: ShieldCheck,
    title: 'Scientific Quality & Peer Consensus',
    description:
      'We discard superficial clickwork in favor of multi-pass double-blind reviews, statistical inter-annotator agreement metrics, and rubric-driven calibration.',
  },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      <div className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-500 uppercase tracking-widest mb-3">
              <span>Mission & Principles</span>
              <span className="text-zinc-300">/</span>
              <span>Platform Heritage</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#09090B] tracking-tight mb-6">
              Advancing AI Through <span className="italic font-serif">Human Intelligence</span>
            </h1>
            <p className="text-base text-zinc-600 leading-relaxed">
              Bever was founded on a simple conviction: artificial intelligence will only be as truthful, nuanced, and capable as the human minds that evaluate and guide it.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="p-8 rounded-2xl bg-white border border-black/[0.06] shadow-xs hover:border-black/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-black/[0.04] text-zinc-800 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#09090B] mb-2">{val.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>

          {/* Call to action */}
          <div className="p-10 rounded-3xl bg-zinc-50 border border-black/[0.06] text-center max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#09090B] mb-3">
              Be Part of the Global Alignment Network
            </h2>
            <p className="text-sm text-zinc-500 max-w-xl mx-auto mb-8">
              Whether you are a software architect, theoretical mathematician, linguist, or enterprise AI lab, Bever has a place for your expertise.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register"
                className="px-6 py-2.5 bg-[#09090B] hover:bg-zinc-800 text-white font-medium text-xs rounded-full shadow-xs transition-all"
              >
                Join as Contributor
              </Link>
              <Link
                href="/business"
                className="px-6 py-2.5 bg-white hover:bg-zinc-50 text-zinc-800 border border-black/[0.08] font-medium text-xs rounded-full shadow-xs transition-all"
              >
                Enterprise Solutions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
