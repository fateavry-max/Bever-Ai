'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200">Terms of Service</span>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Terms of Service
              </h1>
              <span className="text-xs text-slate-400">Effective Date: November 2026</span>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-6 text-slate-600 dark:text-slate-300">
            <section>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">1. Agreement to Terms</h2>
              <p>
                By registering for an account, accessing project queues, or submitting contributions through Bever, you agree to be bound by these Terms of Service. If you do not agree, do not use the platform.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">2. Independent Contractor Relationship</h2>
              <p>
                Contributors participate on Bever as independent contractors and not as employees, partners, agents, or joint venturers. Contributors retain complete autonomy over when, where, and how much time they choose to contribute, subject to specific project queue availability.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">3. Intellectual Property Assignment</h2>
              <p>
                All evaluation rationales, ranking decisions, annotations, corrections, and training data submitted by contributors are provided on a work-for-hire basis and assigned exclusively and irrevocably to Bever and its designated clients upon compensation payout.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">4. Anti-Synthetic Policy & Original Work</h2>
              <p>
                All contributor submissions must represent the genuine, original intellectual output of the individual. Using automated LLM generators, web-scraping scripts, or unauthorized delegation to complete human evaluation tasks is strictly prohibited and constitutes grounds for immediate account termination and forfeiture of unpaid earnings.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">5. Benchmark Compensation Disclosures</h2>
              <p>
                Rates displayed across the website represent benchmark target ranges based on active project specifications and contributor qualification tier. Bever does not guarantee fixed minimum earnings or continuous availability of project queues.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
