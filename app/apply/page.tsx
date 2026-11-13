'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  UserCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Shield,
  FileCheck,
  Award,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { OpportunityCategory } from '@/lib/opportunities';

const CATEGORIES: OpportunityCategory[] = [
  'General AI Training',
  'Writing and Editing',
  'Coding and Software Engineering',
  'Mathematics',
  'Science',
  'Language and Translation',
  'Data Annotation',
  'Image and Video Evaluation',
  'Audio Transcription',
  'Subject-Matter Expertise',
];

export default function ApplyPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<OpportunityCategory>('Coding and Software Engineering');
  const [primaryLanguage, setPrimaryLanguage] = useState('English');
  const [highestDegree, setHighestDegree] = useState('Bachelor’s Degree');
  const [weeklyHours, setWeeklyHours] = useState('10 – 20 hrs / week');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicantId, setApplicantId] = useState('');

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    return true;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!agreedToTerms) errs.terms = 'You must agree to the Contributor Integrity Covenant & Terms';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    const newId = `BEV-${Math.floor(10000 + Math.random() * 90000)}`;
    setApplicantId(newId);
    setIsSubmitted(true);
    login(email, 'contributor');
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200">Contributor Application</span>
        </div>

        {/* Progress Header */}
        {!isSubmitted && (
          <div className="mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-3">
              Join the Bever Contributor Community.
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-8">
              Complete your profile to unlock calibrated assessment queues for your domain of expertise.
            </p>

            {/* Stepper bar */}
            <div className="flex items-center justify-center gap-3">
              {[
                { num: 1, label: 'Profile' },
                { num: 2, label: 'Domain Track' },
                { num: 3, label: 'Availability & Terms' },
              ].map((s) => (
                <div key={s.num} className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                      currentStep === s.num
                        ? 'bg-indigo-600 text-white'
                        : currentStep > s.num
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {currentStep > s.num ? '✓' : s.num}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:inline ${
                      currentStep === s.num
                        ? 'text-slate-900 dark:text-white font-semibold'
                        : 'text-slate-400'
                    }`}
                  >
                    {s.label}
                  </span>
                  {s.num < 3 && <div className="w-8 h-0.5 bg-slate-200 dark:bg-slate-800" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Container Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-2">
                Application Submitted & Profile Activated!
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
                Welcome to Bever, <span className="font-semibold text-slate-900 dark:text-white">{fullName}</span>. Your contributor identity has been established and your credentials have been saved.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left max-w-md mx-auto mb-8 font-mono text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Applicant ID:</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{applicantId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Selected Track:</span>
                  <span className="text-slate-800 dark:text-slate-200">{selectedTrack}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">Ready for Assessment</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/opportunities"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold hover:bg-indigo-600 transition-colors shadow-xs"
                >
                  Explore Your Active Project Queue
                </Link>
                <Link
                  href="/contributor/dashboard"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 transition-colors"
                >
                  Open Contributor Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal info */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Step 1: Your Contributor Identity
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-rose-500 mt-1 block">{errors.fullName}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Primary Contact Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex.morgan@university.edu"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                    {errors.email && (
                      <span className="text-[11px] text-rose-500 mt-1 block">{errors.email}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Country of Residence
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Primary Working Language
                      </label>
                      <input
                        type="text"
                        value={primaryLanguage}
                        onChange={(e) => setPrimaryLanguage(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Portfolio, LinkedIn, or GitHub Profile (Optional)
                    </label>
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://github.com/username or linkedin.com/in/..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold hover:bg-indigo-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Continue to Domain Track</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Track & Education */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Step 2: Choose Your Primary Focus Area
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Primary Contributor Track
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedTrack(cat)}
                          className={`p-3 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                            selectedTrack === cat
                              ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 font-bold text-indigo-900 dark:text-indigo-200 ring-1 ring-indigo-500/30'
                              : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Highest Level of Education
                      </label>
                      <select
                        value={highestDegree}
                        onChange={(e) => setHighestDegree(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white cursor-pointer"
                      >
                        <option value="High School / Secondary">High School / Secondary</option>
                        <option value="Undergraduate Student">Current Undergraduate Student</option>
                        <option value="Bachelor’s Degree">Bachelor’s Degree</option>
                        <option value="Master’s Degree">Master’s Degree</option>
                        <option value="PhD / Doctorate">PhD / Doctorate Candidate or Holder</option>
                        <option value="Professional (MD, JD)">Professional License (MD, JD, CPA)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Weekly Availability Target
                      </label>
                      <select
                        value={weeklyHours}
                        onChange={(e) => setWeeklyHours(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white cursor-pointer"
                      >
                        <option value="5 – 10 hrs / week">5 – 10 hrs / week (Part-time)</option>
                        <option value="10 – 20 hrs / week">10 – 20 hrs / week (Flexible)</option>
                        <option value="20 – 35 hrs / week">20 – 35 hrs / week (Substantial)</option>
                        <option value="35+ hrs / week">35+ hrs / week (High volume)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-4 py-2.5 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold hover:bg-indigo-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Continue to Terms</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Terms and Commitment */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Step 3: Contributor Covenant & Availability
                  </h3>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      The Bever Contributor Quality & Confidentiality Pledge:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-slate-500 dark:text-slate-400">
                      <li>I confirm that all evaluation justifications I provide will be my original intellectual analysis.</li>
                      <li>I agree not to use automated LLM bots to generate responses to AI evaluation tasks.</li>
                      <li>I will maintain strict confidentiality regarding unreleased model responses and customer prompts.</li>
                      <li>I acknowledge that earnings are project-based and contingent on passing qualification assessments.</li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>
                        I understand and agree to the Bever Contributor Terms of Service, Privacy Policy, and Integrity Covenant.
                      </span>
                    </label>
                    {errors.terms && (
                      <span className="text-[11px] text-rose-500 mt-1 block">{errors.terms}</span>
                    )}
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-4 py-2.5 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold hover:bg-emerald-600 transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <span>Submit Application</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
