'use client';

import React, { useState } from 'react';
import {
  UserCheck,
  FileCheck2,
  Workflow,
  ArrowRight,
  ShieldCheck,
  Award,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

interface HowItWorksProps {
  onStartOnboarding: () => void;
}

export function HowItWorks({ onStartOnboarding }: HowItWorksProps) {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-3">
            <span>Workflow & Onboarding</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span>Three Simple Steps</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 text-balance">
            How Bever Works.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            From registration to verified task completion. Our structured qualification pipeline ensures high standards, transparent evaluations, and dependable workflows.
          </p>
        </div>

        {/* Step Selector Pills */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {[
              { num: 1, title: '1. Create Account' },
              { num: 2, title: '2. Qualify for Projects' },
              { num: 3, title: '3. Complete AI Tasks' },
            ].map((step) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  activeStep === step.num
                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Step Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm">
          {/* Left Column: Step Details */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              {activeStep === 1 && (
                <div className="animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-mono font-bold text-lg mb-6">
                    01
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    Create Your Account
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    Join Bever and build your professional contributor profile. Specify your academic background, programming languages, spoken idioms, and specialized domain expertise.
                  </p>
                  <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Zero application fees or hidden onboarding costs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Select primary domains (STEM, coding, translation, writing)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Secure profile with global ID verification</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeStep === 2 && (
                <div className="animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-mono font-bold text-lg mb-6">
                    02
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    Qualify for Projects
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    Complete relevant assessments to verify your skills and expertise. Assessments test critical evaluation ability, prompt adherence, and edge-case detection.
                  </p>
                  <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Objective rubric evaluations reviewed by senior specialists</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Clear guidelines provided before taking any assessment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Opportunity to qualify for multiple specialized tracks simultaneously</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeStep === 3 && (
                <div className="animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-mono font-bold text-lg mb-6">
                    03
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    Complete AI Training Tasks
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    Work on available projects, submit quality contributions and receive compensation according to project terms. Choose your own hours and track earnings via your dashboard.
                  </p>
                  <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Direct access to task queue whenever projects are open</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Structured feedback on submissions to improve your quality tier</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Regular, transparent payout schedules via trusted payment rails</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={onStartOnboarding}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors w-fit"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Column: Interactive UI Visual Representation */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
              {activeStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Contributor Profile Setup
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono">Step 1 of 3</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[11px] text-slate-400 block mb-1">Primary Discipline</span>
                      <strong className="text-slate-900 dark:text-white">Software Engineering & AI</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[11px] text-slate-400 block mb-1">Languages</span>
                      <strong className="text-slate-900 dark:text-white">English (Native), Japanese (N2)</strong>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="text-[11px] text-slate-400 block mb-2">Verified Competencies:</span>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-[11px]">
                        Python 3.12
                      </span>
                      <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-[11px]">
                        Distributed Systems
                      </span>
                      <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-[11px]">
                        Algorithm Auditing
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2">
                    <span className="flex items-center gap-1.5 text-emerald-600">
                      <ShieldCheck className="w-4 h-4" /> Identity Verification Ready
                    </span>
                    <span>Confidential Contributor ID</span>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Skill Assessment: Advanced Reasoning
                    </span>
                    <span className="text-amber-600 font-mono font-medium">Timed · 40 Mins</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        Section 1: Prompt Adherence & Constraint Checking
                      </span>
                      <span className="text-emerald-600 font-semibold text-[11px]">Passed (100%)</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-full" />
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        Section 2: Code Bug Localization & Truthfulness
                      </span>
                      <span className="text-indigo-600 font-semibold text-[11px]">94% Score</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full w-[94%]" />
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Qualification Approved: Eligible for Advanced Python & Systems Tier</span>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Active Contributor Task Queue
                    </span>
                    <span className="text-emerald-600 font-mono font-semibold">Active Session</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <strong className="block text-slate-900 dark:text-white">
                          Task #9182 · LLM Edge-Case Security Review
                        </strong>
                        <span className="text-[11px] text-slate-400">Completed · Quality Grade: A+</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        $45.00
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <strong className="block text-slate-900 dark:text-white">
                          Task #9183 · Multi-turn Factuality Verification
                        </strong>
                        <span className="text-[11px] text-slate-400">In Progress · 18 mins elapsed</span>
                      </div>
                      <span className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px] font-semibold">
                        In Progress
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Weekly Contributor Balance:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      $495.00 (Weekly Benchmark)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
