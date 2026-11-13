'use client';

import React from 'react';
import Link from 'next/link';
import {
  Code,
  Languages,
  BookOpen,
  DollarSign,
  Clock,
  Globe,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { PublicLayout } from '@/components/layouts/PublicLayout';

const TRACKS = [
  {
    title: 'Software Developers & Engineers',
    icon: Code,
    rate: '$38 – $65 / hr',
    desc: 'Evaluate model-generated code, debug algorithms, verify memory safety, and author automated test suites in Python, TypeScript, C++, and Rust.',
  },
  {
    title: 'Writers, Editors & Narrative Stylists',
    icon: BookOpen,
    rate: '$26 – $42 / hr',
    desc: 'Critique voice, tone calibration, factual consistency, and stylistic subtleties across long-form creative prose and analytical journalism.',
  },
  {
    title: 'Computational Linguists & Translators',
    icon: Languages,
    rate: '$32 – $50 / hr',
    desc: 'Audit translation pairs, colloquial nuances, Keigo / honorific grammar, and regional dialects across 40+ language systems.',
  },
  {
    title: 'Mathematicians & Proof Auditors',
    icon: Sparkles,
    rate: '$45 – $75 / hr',
    desc: 'Verify formal mathematical derivations, step-by-step calculus proofs, and discrete optimization problems in LaTeX.',
  },
];

export default function ContributorsMarketingPage() {
  return (
    <PublicLayout>
      <div className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-500 uppercase tracking-widest mb-3">
              <span>African AI Training</span>
              <span className="text-zinc-300">/</span>
              <span>8 Contribution Tracks</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#09090B] tracking-tight mb-4">
              Train AI. Represent Africa. Earn for your intelligence.
            </h1>
            <p className="text-base text-zinc-600 leading-relaxed">
              Contribute authentic African languages, accented speech, visual annotations, and cultural context evaluations while earning transparent rewards for approved submissions.
            </p>
          </div>

          {/* 8 African AI Training Tracks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {[
              {
                title: 'African Languages',
                langs: 'Yoruba · Igbo · Hausa · Swahili · Zulu · Twi · Amharic',
                desc: 'Improve orthography, tonal diacritics, grammar, and regional expressions.',
              },
              {
                title: 'Voice & Speech Collection',
                langs: 'Accented English · Code-Switching',
                desc: 'Record spoken sentences, natural dialogues, and diverse African accents.',
              },
              {
                title: 'Audio Transcription',
                langs: 'Nigerian Pidgin · Swahili · Local Speech',
                desc: 'Convert African-language audio clips and natural speech into verbatim text.',
              },
              {
                title: 'Image Annotation',
                langs: 'Cuisine · Clothing · Street Transit',
                desc: 'Label African foods, environments, textiles, transportation, and objects.',
              },
              {
                title: 'Video Annotation',
                langs: 'Everyday Activities · Craftsmanship',
                desc: 'Tag temporal actions, greetings, and activities in African video footage.',
              },
              {
                title: 'AI Response Evaluation',
                langs: 'Factuality · Cultural Accuracy',
                desc: 'Evaluate AI model responses for cultural nuance and local relevance.',
              },
              {
                title: 'Translation & Localization',
                langs: 'African Languages ↔ English',
                desc: 'Translate healthcare, fintech, and everyday content without literal stiffness.',
              },
              {
                title: 'Data Collection',
                langs: 'Proverbs · Idioms · Context',
                desc: 'Curate and organize authentic African contextual training datasets.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white border border-black/[0.06] flex flex-col justify-between gap-4"
              >
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 block mb-2">{item.langs}</span>
                  <h2 className="text-base font-semibold text-[#09090B] mb-1.5">{item.title}</h2>
                  <p className="text-xs text-zinc-600 leading-relaxed">{item.desc}</p>
                </div>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#09090B] hover:underline"
                >
                  <span>Start contributing</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                </Link>
              </div>
            ))}
          </div>

          {/* Tracks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {TRACKS.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.title}
                  className="p-8 rounded-2xl bg-white border border-black/[0.06] shadow-xs hover:border-black/20 transition-all"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-black/[0.04] text-zinc-800 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-medium text-zinc-700 bg-zinc-100 border border-black/[0.05] px-3 py-1 rounded-full tabular-nums">
                      Est. {t.rate}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#09090B] mb-2">{t.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-6">{t.desc}</p>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#09090B] hover:underline transition-colors"
                  >
                    <span>Apply for this track</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Perks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-2xl bg-[#FBFBFA] border border-black/[0.06]">
              <Clock className="w-5 h-5 text-zinc-700 mb-3" />
              <h4 className="text-sm font-semibold text-[#09090B] mb-1">Total Schedule Flexibility</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Log in and work whenever your schedule permits. No minimum hours or rigid shifts.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FBFBFA] border border-black/[0.06]">
              <DollarSign className="w-5 h-5 text-zinc-700 mb-3" />
              <h4 className="text-sm font-semibold text-[#09090B] mb-1">Weekly Direct Payouts</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Earnings are disbursed automatically every Tuesday via ACH direct deposit or international transfer.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FBFBFA] border border-black/[0.06]">
              <Globe className="w-5 h-5 text-zinc-700 mb-3" />
              <h4 className="text-sm font-semibold text-[#09090B] mb-1">Global Community</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Collaborate with peers across 85+ countries and gain accredited AI training experience.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/register"
              className="px-7 py-3 bg-[#09090B] hover:bg-zinc-800 text-white font-medium text-xs rounded-full shadow-xs inline-flex items-center gap-2 transition-all"
            >
              <span>Join the Bever Contributor Community</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
