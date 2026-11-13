'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft, Lock } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200">Privacy Policy</span>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Privacy Policy
              </h1>
              <span className="text-xs text-slate-400">Effective Date: November 2026</span>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-6 text-slate-600 dark:text-slate-300">
            <section>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">1. Overview & Scope</h2>
              <p>
                Bever AI Technologies Inc. (&ldquo;Bever&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates the global AI training and evaluation platform connecting contributors with model advancement projects. This Privacy Policy governs the collection, processing, and protection of information provided by contributors, visitors, and enterprise clients.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">2. Information We Collect</h2>
              <p>
                We collect personal information necessary to manage contributor accounts, administer qualification assessments, verify identities, calculate compensation, and deliver enterprise evaluations:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-500 dark:text-slate-400">
                <li><strong>Identity Information:</strong> Full legal name, date of birth, contact email, country of residence, and identity verification documents.</li>
                <li><strong>Professional Information:</strong> Educational credentials, domain expertise, portfolio links, language proficiencies, and resumes.</li>
                <li><strong>Task Contributions:</strong> Human evaluation justifications, ranking signals, code reviews, annotation labels, and task completion latency.</li>
                <li><strong>Payment Information:</strong> Bank deposit details (ACH/Wire) or third-party payment account identifiers (e.g. PayPal).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">3. Double-Blind Anonymization</h2>
              <p>
                When task contributions are delivered to enterprise AI labs, personal contributor identities are redacted and replaced with cryptographic identifiers. Enterprise model trainers never receive direct personal contact information of individual annotators.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">4. Data Security Standards</h2>
              <p>
                All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. We enforce least-privilege role-based access control (RBAC), multi-factor authentication, and routine penetration testing.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">5. International Transfers & Rights</h2>
              <p>
                Bever complies with applicable data protection legislation including the EU General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). You have the right to request access to, correction of, or deletion of your personal data at any time.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
