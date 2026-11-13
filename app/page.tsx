'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  Globe,
} from 'lucide-react';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { OpportunitiesSection } from '@/components/OpportunitiesSection';

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Clean Minimalist Monochrome Backdrop */}
      <div className="relative overflow-hidden bg-white">
        {/* ========================================================================= */}
        {/* 01. HERO SECTION — Asymmetrical 12-Column Rail System                     */}
        {/* ========================================================================= */}
        <section className="pt-20 sm:pt-28 pb-20 lg:pb-28 relative z-10">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
              {/* RAIL A — Primary Left Rail (Columns 1–7) */}
              <div className="lg:col-span-7 space-y-6">
                <span className="label-technical text-zinc-500 block">
                  AFRICAN &amp; GLOBAL AI WORKFORCE
                </span>

                <h1 className="headline-display text-4xl sm:text-6xl lg:text-[64px] text-zinc-950 max-w-xl">
                  Human intelligence.<br />
                  Better AI.
                </h1>

                <p className="text-lg sm:text-xl text-zinc-900 font-medium max-w-lg leading-snug">
                  Train AI. Represent Africa. Earn for your intelligence.
                </p>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <Link
                    href="/register"
                    className="px-6 py-3 text-xs sm:text-sm font-medium text-white bg-zinc-950 hover:bg-zinc-800 rounded-full transition-all shadow-xs flex items-center gap-2 group"
                  >
                    <span>Join Bever</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/contributors"
                    className="px-6 py-3 text-xs sm:text-sm font-medium text-zinc-900 bg-white border border-black/[0.1] hover:bg-zinc-50 rounded-full transition-all flex items-center gap-2"
                  >
                    <span>Explore African AI Training</span>
                  </Link>
                </div>
              </div>

              {/* RAIL B — Secondary Offset Rail (Columns 8–12) */}
              <div className="lg:col-span-5 lg:pt-8 space-y-8">
                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                  Bever connects talented contributors across Africa and the world with leading organizations building artificial intelligence systems that accurately understand Yoruba, Igbo, Hausa, Swahili, Zulu, Twi, Amharic, accents, environments, and everyday lived experiences.
                </p>

                {/* Proof strip */}
                <div className="pt-6 border-t border-black/[0.06] grid grid-cols-3 gap-4">
                  <div>
                    <span className="font-mono text-xl sm:text-2xl font-bold text-zinc-950 tabular-nums block">8</span>
                    <span className="text-[11px] text-zinc-500 leading-tight block mt-0.5">African AI Tracks</span>
                  </div>
                  <div>
                    <span className="font-mono text-xl sm:text-2xl font-bold text-zinc-950 tabular-nums block">18+</span>
                    <span className="text-[11px] text-zinc-500 leading-tight block mt-0.5">African Languages</span>
                  </div>
                  <div>
                    <span className="font-mono text-xl sm:text-2xl font-bold text-zinc-950 tabular-nums block">99.1%</span>
                    <span className="text-[11px] text-zinc-500 leading-tight block mt-0.5">Consensus SLA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 02. AFRICAN AI TRAINING MARKETPLACE                                       */}
        {/* ========================================================================= */}
        <section className="py-16 lg:py-24 border-t border-black/[0.06] bg-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <span className="label-technical text-zinc-500 block mb-2">
                  AFRICAN AI TRAINING
                </span>
                <h2 className="headline-section text-3xl sm:text-4xl text-zinc-950">
                  Authentic African languages, voices, and cultural intelligence.
                </h2>
              </div>
              <Link
                href="/contributors"
                className="text-xs font-medium text-zinc-950 hover:underline inline-flex items-center gap-1.5 shrink-0"
              >
                <span>View all 8 training categories</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { num: '01', name: 'African Languages', detail: 'Yoruba, Igbo, Hausa, Swahili, Zulu, Twi, Amharic & regional dialects.' },
                { num: '02', name: 'Voice & Speech Collection', detail: 'Natural spoken prompts, conversations & diverse African accents.' },
                { num: '03', name: 'Audio Transcription', detail: 'African-language speech & Nigerian Pidgin audio converted verbatim.' },
                { num: '04', name: 'Image Annotation', detail: 'Labeling African foods, clothing, environments & everyday objects.' },
                { num: '05', name: 'Video Annotation', detail: 'Identifying actions, gestures & activities across African footage.' },
                { num: '06', name: 'AI Response Evaluation', detail: 'Grading answers for factual accuracy and local cultural relevance.' },
                { num: '07', name: 'Translation & Localization', detail: 'Bidirectional African languages and English nuance translation.' },
                { num: '08', name: 'Data Collection', detail: 'Gathering and structuring authentic African contextual datasets.' },
              ].map((cat) => (
                <div
                  key={cat.num}
                  className="p-5 rounded-xl bg-[#FBFBFA] border border-black/[0.06] flex flex-col justify-between gap-3"
                >
                  <div>
                    <span className="font-mono text-[11px] text-zinc-400 block mb-2">{cat.num}</span>
                    <h3 className="text-sm font-semibold text-zinc-950 mb-1.5">{cat.name}</h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">{cat.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 03. HOW BEVER WORKS — "One platform. Three connected ecosystems."         */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 border-t border-black/[0.06] bg-[#FBFBFA]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-16">
              <span className="label-technical text-zinc-500 block mb-2">
                PLATFORM ARCHITECTURE
              </span>
              <h2 className="headline-section text-3xl sm:text-4xl lg:text-5xl text-zinc-950">
                One platform. Three connected ecosystems.
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 mt-3 leading-relaxed">
                Bever integrates high-caliber global contributors with frontier AI model labs through calibrated quality infrastructure.
              </p>
            </div>

            {/* Asymmetrical 3-Module Card Arrangement */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Module 1: Global Contributors (Cols 1–4) */}
              <div className="lg:col-span-4 auralis-card p-8 bg-white flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-zinc-400 block mb-3">01 / WORKFORCE</span>
                  <h3 className="text-xl font-semibold text-zinc-950 tracking-[-0.02em] mb-2">
                    Global Contributors
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                    Software engineers, mathematicians, linguists, and researchers pre-screened through proctored diagnostic benchmarks. Contributors solve high-context problems on flexible schedules with transparent, verified rates.
                  </p>
                </div>
                <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs text-zinc-500">
                  <span>85+ Nationalities</span>
                  <Link href="/contributors" className="text-zinc-950 font-medium hover:underline flex items-center gap-1">
                    <span>Learn more</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Module 2: AI Training Infrastructure (Cols 5–8) */}
              <div className="lg:col-span-4 auralis-card p-8 bg-white flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-zinc-400 block mb-3">02 / CALIBRATION</span>
                  <h3 className="text-xl font-semibold text-zinc-950 tracking-[-0.02em] mb-2">
                    Training Infrastructure
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                    Double-blind peer evaluation, automated gold-standard test injections, and rigorous rubric definitions. Ensures high inter-annotator consensus and zero synthetic circularity.
                  </p>
                </div>
                <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs text-zinc-500">
                  <span>99.1% Agreement Rate</span>
                  <Link href="/how-it-works" className="text-zinc-950 font-medium hover:underline flex items-center gap-1">
                    <span>View lifecycle</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Module 3: Enterprise Clients (Cols 9–12) */}
              <div className="lg:col-span-4 auralis-card p-8 bg-white flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-zinc-400 block mb-3">03 / ENTERPRISE</span>
                  <h3 className="text-xl font-semibold text-zinc-950 tracking-[-0.02em] mb-2">
                    Enterprise AI Teams
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                    Direct delivery of verified DPO, PPO, and SFT datasets via automated API pipelines. Strict SOC 2 Type II data residency, zero-retention policies, and contractual SLAs.
                  </p>
                </div>
                <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs text-zinc-500">
                  <span>API & Hub Delivery</span>
                  <Link href="/business" className="text-zinc-950 font-medium hover:underline flex items-center gap-1">
                    <span>Explore solutions</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 04. SERVICES SECTION — "Human expertise powering intelligent systems."    */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 border-t border-black/[0.06] bg-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-16">
              <span className="label-technical text-zinc-500 block mb-2">
                CORE CAPABILITIES
              </span>
              <h2 className="headline-section text-3xl sm:text-4xl lg:text-5xl text-zinc-950">
                Human expertise powering intelligent systems.
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 mt-3 leading-relaxed">
                Specialized annotation, preference modeling, and adversarial evaluation tracks tailored for frontier foundation models.
              </p>
            </div>

            {/* Feature Tiles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl auralis-card-flat space-y-3">
                <span className="label-technical text-zinc-400 block">01</span>
                <h3 className="text-base font-semibold text-zinc-950">AI Model Evaluation</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Rigorous pairwise ranking and multi-attribute grading measuring helpfulness, factual precision, and logical coherence.
                </p>
              </div>

              <div className="p-6 rounded-xl auralis-card-flat space-y-3">
                <span className="label-technical text-zinc-400 block">02</span>
                <h3 className="text-base font-semibold text-zinc-950">Human Feedback & RLHF</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Dense preference datasets formatted for Direct Preference Optimization (DPO) and reinforcement learning reward modeling.
                </p>
              </div>

              <div className="p-6 rounded-xl auralis-card-flat space-y-3">
                <span className="label-technical text-zinc-400 block">03</span>
                <h3 className="text-base font-semibold text-zinc-950">Expert Code & Proofs</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Algorithmic complexity review, edge-case vulnerability testing, and formal mathematical proof validation by credentialed specialists.
                </p>
              </div>

              <div className="p-6 rounded-xl auralis-card-flat space-y-3">
                <span className="label-technical text-zinc-400 block">04</span>
                <h3 className="text-base font-semibold text-zinc-950">Data Annotation & Taxonomy</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Hierarchical entity tagging, coreference resolution, and custom ontology building with schema verification.
                </p>
              </div>

              <div className="p-6 rounded-xl auralis-card-flat space-y-3">
                <span className="label-technical text-zinc-400 block">05</span>
                <h3 className="text-base font-semibold text-zinc-950">Multilingual Localization</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  High-context dialect calibration, cultural idiom preservation, and Keigo nuance evaluation across 40+ language pairs.
                </p>
              </div>

              <div className="p-6 rounded-xl auralis-card-flat space-y-3">
                <span className="label-technical text-zinc-400 block">06</span>
                <h3 className="text-base font-semibold text-zinc-950">Safety & Red-Teaming</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Multi-turn jailbreak attempts, social engineering boundary testing, and adversarial prompt injections under controlled rubrics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 05. OPPORTUNITIES DIRECTORY PREVIEW                                       */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 border-t border-black/[0.06] bg-[#F7F8FA]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <OpportunitiesSection />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 06. BUSINESS SECTION — "Scale your AI operations with human expertise."  */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 border-t border-black/[0.06] bg-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="label-technical text-zinc-500 block">
                  FOR FOUNDATION MODEL LABS
                </span>
                <h2 className="headline-section text-3xl sm:text-4xl lg:text-5xl text-zinc-950">
                  Scale your AI operations with human expertise.
                </h2>
                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                  Enterprise AI teams rely on Bever to provision custom annotation pools, enforce strict inter-annotator consensus SLAs, and deliver export-ready preference datasets on predictable timelines.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-zinc-700">
                    <CheckCircle2 className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" />
                    <span>Contractual turnaround SLAs (&lt; 4 hours from ingestion to export)</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-zinc-700">
                    <CheckCircle2 className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" />
                    <span>Double-blind consensus audits with 10% gold test injection rates</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-zinc-700">
                    <CheckCircle2 className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" />
                    <span>Direct API, HuggingFace Hub, and Amazon S3 automated delivery</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <Link
                    href="/business"
                    className="px-6 py-3 text-xs sm:text-sm font-medium text-white bg-zinc-950 hover:bg-zinc-800 rounded-full transition-all shadow-xs"
                  >
                    Explore Enterprise Solutions
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 text-xs sm:text-sm font-medium text-zinc-900 bg-white border border-black/[0.08] hover:bg-zinc-50 rounded-full transition-all"
                  >
                    Schedule Consultation
                  </Link>
                </div>
              </div>

              {/* Enterprise Project Preview Module */}
              <div className="lg:col-span-6 auralis-dark-panel p-8 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                  <div>
                    <span className="label-technical text-zinc-400 block mb-0.5">
                      ENTERPRISE PIPELINE
                    </span>
                    <h3 className="text-base font-semibold text-white">
                      Frontier Reasoning & Algorithmic DPO
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded">
                    ACTIVE SLA
                  </span>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-zinc-500">Ingested Volume:</span>
                    <span className="text-white font-bold">25,000 Prompts</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-zinc-500">Allocated Evaluator Pool:</span>
                    <span className="text-white font-bold">142 Tier-1 Specialists</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-zinc-500">Inter-Annotator Agreement:</span>
                    <span className="text-emerald-400 font-bold">99.4% (Cohen&apos;s Kappa 0.94)</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-zinc-500">Turnaround Elapsed:</span>
                    <span className="text-cyan-400 font-bold">3.2 Hours (&lt; 4.0h SLA)</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-zinc-500">Deliverable Format:</span>
                    <span className="text-white font-bold">JSONL (DPO Vectors) + SHA-256</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 07. TRUST & GOVERNANCE SECTION                                            */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 border-t border-black/[0.06] bg-[#FBFBFA]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-16">
              <span className="label-technical text-zinc-500 block mb-2">
                SECURITY & GOVERNANCE
              </span>
              <h2 className="headline-section text-3xl sm:text-4xl lg:text-5xl text-zinc-950">
                Institutional-grade rigor for AI data.
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 mt-3 leading-relaxed">
                We safeguard sensitive IP, enforce strict contributor confidentiality, and operate audited data segregation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="auralis-card p-6 bg-white space-y-3">
                <ShieldCheck className="w-5 h-5 text-zinc-950" />
                <h3 className="text-sm font-semibold text-zinc-950">Identity & KYC Verification</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Persona biometric verification, passport validation, and tax compliance (W-9 / W-8BEN) for every contributor.
                </p>
              </div>

              <div className="auralis-card p-6 bg-white space-y-3">
                <CheckCircle2 className="w-5 h-5 text-zinc-950" />
                <h3 className="text-sm font-semibold text-zinc-950">Double-Blind Peer Audits</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Evaluators grade blind model outputs without knowing origin lab or peer ratings to eliminate confirmation bias.
                </p>
              </div>

              <div className="auralis-card p-6 bg-white space-y-3">
                <Layers className="w-5 h-5 text-zinc-950" />
                <h3 className="text-sm font-semibold text-zinc-950">Zero-Retention Data Isolation</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Customer datasets are segregated in isolated tenant namespaces and purged automatically post-export.
                </p>
              </div>

              <div className="auralis-card p-6 bg-white space-y-3">
                <Globe className="w-5 h-5 text-zinc-950" />
                <h3 className="text-sm font-semibold text-zinc-950">Legally Binding NDAs</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Strict mutual confidentiality agreements protecting proprietary pre-release weights and unreleased prompts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 08. FINAL CTA — Centered Exception Rail                                   */}
        {/* ========================================================================= */}
        <section className="py-24 lg:py-32 border-t border-black/[0.06] bg-white text-center relative overflow-hidden">
          <div className="auralis-atmospheric-glow orb-cyan w-[450px] h-[350px] bottom-[-50px] left-[30%] opacity-25" />

          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <span className="label-technical text-zinc-500 block">
              GET STARTED WITH BEVER
            </span>
            <h2 className="headline-section text-4xl sm:text-5xl text-zinc-950">
              Build better AI with Bever.
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Join thousands of skilled contributors shaping frontier models, or deploy human intelligence into your enterprise training pipeline today.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/register"
                className="px-6 py-3 text-xs sm:text-sm font-medium text-white bg-zinc-950 hover:bg-zinc-800 rounded-full transition-all shadow-xs flex items-center gap-2 group"
              >
                <span>Join Bever</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 text-xs sm:text-sm font-medium text-zinc-900 bg-white border border-black/[0.08] hover:bg-zinc-50 rounded-full transition-all"
              >
                <span>Talk to our team</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
