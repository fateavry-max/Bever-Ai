'use client';

import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

export type LegalDocType = 'privacy' | 'terms' | 'cookies' | null;

interface LegalModalProps {
  type: LegalDocType;
  onClose: () => void;
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close legal modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Bever Platform Governance</span>
        </div>

        {type === 'privacy' && (
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Privacy Policy
            </h3>
            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                <strong>Effective Date:</strong> January 2026. Bever (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy and ensuring transparency in how personal information is handled.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                1. Information We Collect
              </h4>
              <p>
                When you create a profile or apply for tasks, we collect identity verification details, email, country of residence, academic credentials, and task evaluation submissions.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                2. Use of Evaluation Submissions
              </h4>
              <p>
                Contributions provided during task evaluations (comparisons, rubrics, reasoning write-ups) are processed to calibrate AI models and compute inter-rater agreement. Personal identifying details are scrubbed prior to model training exports.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                3. Data Security & Storage
              </h4>
              <p>
                We implement industry-standard encryption in transit and at rest. Access to contributor information is strictly restricted to authorized operational personnel.
              </p>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Terms of Service
            </h3>
            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                <strong>Welcome to Bever.</strong> By accessing or using our platform as a contributor or enterprise client, you agree to comply with and be bound by these Terms of Service.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                1. Independent Contributor Status
              </h4>
              <p>
                Contributors engage with Bever as independent service providers. Participation is voluntary, flexible, and project-based. Bever does not guarantee continuous task availability or predetermined minimum earnings.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                2. Quality Standards & Qualification
              </h4>
              <p>
                Eligibility for specific tasks requires passing benchmark qualification assessments. Continued participation in task queues is contingent on meeting project accuracy thresholds.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                3. Confidentiality & Non-Disclosure
              </h4>
              <p>
                All prompts, candidate model responses, guidelines, and proprietary instructions are confidential. Disclosing or redistributing project materials outside of the platform is strictly prohibited.
              </p>
            </div>
          </div>
        )}

        {type === 'cookies' && (
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Cookie Preferences
            </h3>
            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                Bever uses essential cookies to ensure system security, maintain user sessions, and remember your visual theme preference (Light/Dark mode).
              </p>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Essential Cookies</strong>
                    <span className="text-[11px] text-slate-400">Required for authentication and session integrity.</span>
                  </div>
                  <span className="text-emerald-600 font-semibold font-mono text-xs">Active</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Theme & Local Preferences</strong>
                    <span className="text-[11px] text-slate-400">Stores dark/light mode toggle in local storage.</span>
                  </div>
                  <span className="text-emerald-600 font-semibold font-mono text-xs">Active</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
