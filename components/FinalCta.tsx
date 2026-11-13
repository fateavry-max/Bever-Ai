'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FinalCtaProps {
  onJoinClick?: () => void;
  onExploreClick?: () => void;
}

export function FinalCta({ onJoinClick, onExploreClick }: FinalCtaProps) {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background radial accent */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="rounded-3xl p-10 sm:p-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join the Global Contributor Network</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 text-balance">
            Your Skills Can Help Shape Tomorrow’s AI.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Become part of a global community advancing artificial intelligence through human intelligence. Flexible projects, transparent benchmarks, and intellectually demanding work.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {onJoinClick ? (
              <button
                onClick={onJoinClick}
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group whitespace-nowrap cursor-pointer"
              >
                <span>Join Bever</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            ) : (
              <Link
                href="/apply"
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group whitespace-nowrap"
              >
                <span>Join Bever</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}

            {onExploreClick ? (
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all shadow-2xs whitespace-nowrap cursor-pointer"
              >
                <span>Explore Opportunities</span>
              </button>
            ) : (
              <Link
                href="/opportunities"
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all shadow-2xs whitespace-nowrap"
              >
                <span>Explore Opportunities</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
