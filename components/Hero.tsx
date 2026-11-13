'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  Code2,
  Cpu,
  Globe2,
  Layers,
  Terminal,
  Activity,
  Star,
} from 'lucide-react';

import Link from 'next/link';

interface HeroProps {
  onExploreOpportunities?: () => void;
  onLearnHowItWorks?: () => void;
}

export function Hero({ onExploreOpportunities, onLearnHowItWorks }: HeroProps) {
  const [selectedResponse, setSelectedResponse] = useState<'B' | 'A'>('B');
  const [activeCriterion, setActiveCriterion] = useState<string>('accuracy');

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial gradients for crystal glass ambiance */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/4 w-[400px] h-[350px] bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Live Global Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-xs font-medium text-slate-700 dark:text-slate-300 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Global AI Training Platform</span>
              <span className="text-slate-400">·</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Now Onboarding</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6 text-balance">
              Help Shape the Future of AI.
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-8 max-w-xl">
              Put your knowledge and skills to work. Join a global community of contributors helping train, evaluate and improve the world’s artificial intelligence systems.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              {onExploreOpportunities ? (
                <button
                  onClick={onExploreOpportunities}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group whitespace-nowrap cursor-pointer"
                >
                  <span>Explore Opportunities</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              ) : (
                <Link
                  href="/opportunities"
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group whitespace-nowrap"
                >
                  <span>Explore Opportunities</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}

              {onLearnHowItWorks ? (
                <button
                  onClick={onLearnHowItWorks}
                  className="px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-all shadow-xs backdrop-blur-md flex items-center justify-center whitespace-nowrap cursor-pointer"
                >
                  <span>Learn How It Works</span>
                </button>
              ) : (
                <Link
                  href="/how-it-works"
                  className="px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-all shadow-xs backdrop-blur-md flex items-center justify-center whitespace-nowrap"
                >
                  <span>Learn How It Works</span>
                </Link>
              )}
            </div>

            {/* Trust and Scale Metrics Strip */}
            <div className="pt-6 border-t border-slate-200/70 dark:border-slate-800/80 w-full grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white font-mono tracking-tight tabular-nums">
                  85+
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Countries active</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white font-mono tracking-tight tabular-nums">
                  40+
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Language pairs</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white font-mono tracking-tight tabular-nums">
                  100%
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Human verified</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual — Interactive AI Evaluation Ecosystem Preview */}
          <div className="lg:col-span-6 relative">
            {/* Ambient glass glow frame */}
            <div className="relative rounded-2xl p-1 bg-linear-to-b from-indigo-500/20 via-slate-200/40 to-slate-200/20 dark:from-indigo-500/30 dark:via-slate-800/40 dark:to-slate-800/10 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[15px] bg-white/95 dark:bg-slate-900/90 backdrop-blur-2xl p-5 border border-slate-100 dark:border-slate-800/90">
                {/* Header bar of the evaluation task */}
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Task #8429: Python Concurrency RLHF
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    Double-Blind Review
                  </span>
                </div>

                {/* Task Prompt Box */}
                <div className="mb-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 block mb-1">
                    System Evaluation Prompt:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 font-mono text-[11px] leading-relaxed">
                    &quot;Generate a thread-safe caching decorator with TTL expiration in Python 3.11+, avoiding global GIL bottlenecks.&quot;
                  </p>
                </div>

                {/* Model Responses Side-by-Side Selector */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {/* Response A Card */}
                  <div
                    onClick={() => setSelectedResponse('A')}
                    className={`cursor-pointer p-3 rounded-xl border text-xs transition-all ${
                      selectedResponse === 'A'
                        ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/30 ring-1 ring-indigo-500/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Model Response A</span>
                      {selectedResponse === 'A' && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </div>
                    <pre className="font-mono text-[10px] text-slate-600 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-950 p-2 rounded overflow-hidden">
                      <code>{`import threading, time\n# Simple dictionary cache\n_cache = {}\n_lock = threading.Lock()`}</code>
                    </pre>
                    <p className="text-[10px] text-rose-500 mt-2 font-medium">
                      Omitted key expiration sweep
                    </p>
                  </div>

                  {/* Response B Card (Selected Benchmark) */}
                  <div
                    onClick={() => setSelectedResponse('B')}
                    className={`cursor-pointer p-3 rounded-xl border text-xs transition-all ${
                      selectedResponse === 'B'
                        ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 ring-1 ring-indigo-500/40 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-900 dark:text-white">Model Response B</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                          Consensus
                        </span>
                      </div>
                      {selectedResponse === 'B' && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </div>
                    <pre className="font-mono text-[10px] text-slate-700 dark:text-slate-300 bg-slate-100/70 dark:bg-slate-950 p-2 rounded overflow-hidden">
                      <code>{`from threading import RLock\n# Reentrant locking with monotonic time\nself._lock = RLock()`}</code>
                    </pre>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                      Complete TTL eviction & types
                    </p>
                  </div>
                </div>

                {/* Rubric Rating Slider Preview */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/80 mb-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      Evaluator Rubric Criteria:
                    </span>
                    <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                      9.4 / 10 Calibration
                    </span>
                  </div>
                  <div className="flex gap-1.5 mb-2">
                    {['Accuracy', 'Helpfulness', 'Code Safety', 'Style'].map((crit) => (
                      <button
                        key={crit}
                        onClick={() => setActiveCriterion(crit.toLowerCase())}
                        className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors ${
                          activeCriterion === crit.toLowerCase()
                            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        {crit}
                      </button>
                    ))}
                  </div>
                  {/* Progress visualization */}
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full w-[94%]" />
                  </div>
                </div>

                {/* Evaluator Footer Preview */}
                <div className="flex items-center justify-between text-xs pt-2 text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 text-white font-bold text-[10px] flex items-center justify-center">
                      ER
                    </div>
                    <span>Reviewed by Dr. Elena R. · Senior CS Evaluator</span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>
              </div>

              {/* Floating Crystal Glass Mini Badges */}
              <div className="absolute -bottom-5 -left-4 hidden sm:flex items-center gap-3 p-3 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/80 shadow-lg text-xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Continuous Auditing</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Inter-annotator agreement: 96.8%
                  </p>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2 p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/80 shadow-lg text-xs">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">Top-Tier AI Lab Benchmark</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
