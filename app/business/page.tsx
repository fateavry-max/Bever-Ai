'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Users,
  BarChart3,
  Lock,
} from 'lucide-react';
import { PublicLayout } from '@/components/layouts/PublicLayout';

export default function BusinessMarketingPage() {
  return (
    <PublicLayout>
      <div className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-500 uppercase tracking-widest mb-3">
              <span>Enterprise Solutions</span>
              <span className="text-zinc-300">/</span>
              <span>Model Alignment Infrastructure</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#09090B] tracking-tight mb-4">
              Human Data Operations for <span className="italic font-serif">AI Teams</span>
            </h1>
            <p className="text-base text-zinc-600 leading-relaxed">
              Accelerate foundational alignment and domain-specific fine-tuning with verified contributor pipelines and enterprise SLAs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="p-8 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-black/[0.04] text-zinc-800 flex items-center justify-center mb-5">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#09090B] mb-2">Pre-Vetted Domain Experts</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Direct access to credentialed software engineers, clinical researchers, lawyers, and mathematicians pre-screened for reasoning precision.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-black/[0.04] text-zinc-800 flex items-center justify-center mb-5">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#09090B] mb-2">Statistical Consensus SLAs</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Guaranteed inter-annotator agreement thresholds (98%+ agreement) enforced via automated gold-standard questions and double-blind audits.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-black/[0.04] text-zinc-800 flex items-center justify-center mb-5">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#09090B] mb-2">SOC 2 Type II Security</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Encrypted data pipelines, strict contributor NDAs, on-demand data purging, and isolated customer tenant namespaces.
              </p>
            </div>
          </div>

          {/* Portal Gateway Card */}
          <div className="p-10 rounded-3xl bg-zinc-50 border border-black/[0.06] flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-[11px] font-mono font-medium text-zinc-500 uppercase tracking-wider block mb-1">
                Existing Enterprise Clients
              </span>
              <h2 className="text-2xl font-semibold text-[#09090B] mb-2">Access Your Business Portal</h2>
              <p className="text-sm text-zinc-500 max-w-lg leading-relaxed">
                Log into your organization workspace to monitor active annotation campaigns, review deliverables, manage API keys, and download invoices.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/login?type=business"
                className="px-6 py-2.5 bg-[#09090B] hover:bg-zinc-800 text-white font-medium text-xs rounded-full shadow-xs transition-all flex items-center gap-2"
              >
                <span>Log In to Business Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-white hover:bg-zinc-50 text-zinc-800 border border-black/[0.08] font-medium text-xs rounded-full shadow-xs transition-all"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
