'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Clock,
  Shield,
  CheckCircle2,
  AlertCircle,
  Award,
  Calendar,
  Briefcase,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Share2,
} from 'lucide-react';
import { getOpportunityById, OPPORTUNITIES_DATA } from '@/lib/opportunities';
import { ApplicationModal } from '@/components/ApplicationModal';

export default function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const opp = getOpportunityById(resolvedParams.id);

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!opp) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Project Not Found</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          The opportunity track you are looking for may have concluded or has been updated.
        </p>
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Opportunities Directory</span>
        </Link>
      </div>
    );
  }

  const relatedOpportunities = OPPORTUNITIES_DATA.filter(
    (item) => item.category === opp.category && item.id !== opp.id
  ).slice(0, 2);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Opportunities</span>
          </Link>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Project'}</span>
          </button>
        </div>

        {/* Project Header Hero Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-sm mb-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-4 text-xs font-medium text-indigo-600 dark:text-indigo-400">
            <span>{opp.category}</span>
            <span>·</span>
            <span>{opp.difficulty} Level</span>
            <span>·</span>
            <span>{opp.language}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4 leading-tight">
            {opp.title}
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mb-8">
            {opp.shortDescription}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 mb-8">
            <div>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold mb-1">
                Benchmark Rate
              </span>
              <span className="text-lg font-mono font-bold text-slate-900 dark:text-white">
                {opp.estimatedRate}
              </span>
            </div>
            <div>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold mb-1">
                Weekly Commitment
              </span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {opp.weeklyHours}
              </span>
            </div>
            <div>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold mb-1">
                Assessment
              </span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {opp.assessmentEstimate}
              </span>
            </div>
            <div>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold mb-1">
                Eligibility
              </span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {opp.eligibility}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="px-6 py-3 text-sm font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-xl hover:bg-indigo-600 dark:hover:bg-indigo-100 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apply to this Opportunity</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/how-it-works"
              className="px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-center transition-colors"
            >
              How Qualification Works
            </Link>
          </div>
        </div>

        {/* Detailed Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main 2-column Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Full Project Description */}
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-xs">
              <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <span>Project Scope & Overview</span>
              </h2>
              <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
                <p>{opp.fullDescription}</p>
                <p>
                  As an AI trainer on Bever, you are tasked with creating gold-standard supervisory signal for LLMs. Every contribution is reviewed using a double-blind peer verification workflow to ensure fairness, objectivity, and scientific rigor.
                </p>
              </div>
            </div>

            {/* Core Deliverables */}
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-xs">
              <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Core Deliverables & Expectations</span>
              </h2>
              <ul className="space-y-3">
                {opp.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Skills & Knowledge */}
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-xs">
              <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Evaluated Competencies</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {opp.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Qualification Assessment Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-xs">
              <h3 className="text-sm font-bold text-slate-950 dark:text-white mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-500" />
                <span>Assessment Process</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                To work on this project, you must complete an un-timed domain assessment consisting of 3 calibrated test tasks. You receive immediate rubric feedback and qualification results.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5 font-medium text-slate-700 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>Pass Threshold:</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">85% Rubric Match</span>
                </div>
                <div className="flex justify-between">
                  <span>Est. Completion:</span>
                  <span className="font-mono">{opp.assessmentEstimate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Retake Policy:</span>
                  <span>1 retake after 14 days</span>
                </div>
              </div>
            </div>

            {/* Related Opportunities */}
            {relatedOpportunities.length > 0 && (
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                  Related Projects
                </h3>
                <div className="space-y-3">
                  {relatedOpportunities.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/opportunities/${rel.id}`}
                      className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                    >
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-1 mb-1">
                        {rel.title}
                      </h4>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        {rel.estimatedRate}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Application Wizard Modal */}
      <ApplicationModal
        key={opp.id}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        preselectedOpportunity={opp}
      />
    </div>
  );
}
