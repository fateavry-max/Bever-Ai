'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Award,
  Sparkles,
} from 'lucide-react';
import { Opportunity } from '../lib/opportunities';

import { useAuth } from '@/context/AuthContext';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedOpportunity?: Opportunity | null;
  initialRole?: string;
  onApplicationSuccess?: (email: string) => void;
}

export function ApplicationModal({
  isOpen,
  onClose,
  preselectedOpportunity,
  initialRole,
  onApplicationSuccess,
}: ApplicationModalProps) {
  const auth = useAuth();
  const [step, setStep] = useState<number>(1);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<string>(
    preselectedOpportunity?.category || initialRole || 'Coding and Software Engineering'
  );
  const [primaryLanguage, setPrimaryLanguage] = useState('English');
  const [highestDegree, setHighestDegree] = useState('Bachelor’s Degree');
  const [weeklyHours, setWeeklyHours] = useState('10 – 20 hrs / week');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedApplicantId, setGeneratedApplicantId] = useState('');

  if (!isOpen) return null;

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setErrors({ terms: 'Please accept contributor guidelines to proceed' });
      return;
    }
    const randId = `BEV-${Math.floor(10000 + Math.random() * 90000)}`;
    setGeneratedApplicantId(randId);
    setIsSubmitted(true);
    auth.login(email, 'contributor');
    if (onApplicationSuccess) {
      onApplicationSuccess(email);
    }
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setStep(1);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close application modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header & Step progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Contributor Onboarding
                </span>
                <span className="font-mono">Step {step} of 3</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {preselectedOpportunity
                  ? `Apply for ${preselectedOpportunity.title}`
                  : 'Join the Bever Contributor Network'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Complete your profile to qualify for flexible AI training and evaluation tasks.
              </p>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Personal Details */}
            {step === 1 && (
              <div className="space-y-4 text-xs">
                <div>
                  <label htmlFor="app-full-name" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Legal Full Name *
                  </label>
                  <input
                    id="app-full-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
                  />
                  {errors.fullName && (
                    <p className="text-rose-500 text-[11px] mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="app-email" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="app-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena.rostova@example.com"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
                  />
                  {errors.email && (
                    <p className="text-rose-500 text-[11px] mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="app-country" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Country of Residence *
                    </label>
                    <select
                      id="app-country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="Canada">Canada</option>
                      <option value="Japan">Japan</option>
                      <option value="Australia">Australia</option>
                      <option value="France">France</option>
                      <option value="India">India</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Other Eligible Region">Other Eligible Region</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="app-portfolio" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      LinkedIn / GitHub / Portfolio
                    </label>
                    <input
                      id="app-portfolio"
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Track & Credentials */}
            {step === 2 && (
              <div className="space-y-4 text-xs">
                <div>
                  <label htmlFor="app-track" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Evaluation Track *
                  </label>
                  <select
                    id="app-track"
                    value={selectedTrack}
                    onChange={(e) => setSelectedTrack(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
                  >
                    <option value="Coding and Software Engineering">
                      Coding and Software Engineering
                    </option>
                    <option value="Writing and Editing">Writing and Editing</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science (Biomedical, Physics, Chemistry)</option>
                    <option value="Language and Translation">Language and Translation</option>
                    <option value="Subject-Matter Expertise">Subject-Matter Expertise (Law, Finance)</option>
                    <option value="Data Annotation">Data Annotation</option>
                    <option value="General AI Training">General AI Training</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="app-language" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Primary Spoken & Written Language *
                    </label>
                    <input
                      id="app-language"
                      type="text"
                      value={primaryLanguage}
                      onChange={(e) => setPrimaryLanguage(e.target.value)}
                      placeholder="e.g. English, Japanese, Spanish"
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
                    />
                  </div>

                  <div>
                    <label htmlFor="app-degree" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Highest Education / Background *
                    </label>
                    <select
                      id="app-degree"
                      value={highestDegree}
                      onChange={(e) => setHighestDegree(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
                    >
                      <option value="Doctorate (PhD / MD / JD)">Doctorate (PhD / MD / JD)</option>
                      <option value="Master’s Degree">Master’s Degree</option>
                      <option value="Bachelor’s Degree">Bachelor’s Degree</option>
                      <option value="Current University Student">Current University Student</option>
                      <option value="Industry Professional / Self-Taught">Industry Professional / Self-Taught</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900 text-[11px] text-indigo-900 dark:text-indigo-300">
                  <p>
                    <strong>Assessment Prerequisite:</strong> You will be assigned a 30–45 minute baseline evaluation task tailored to the {selectedTrack} track upon submission.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Availability & Terms */}
            {step === 3 && (
              <div className="space-y-4 text-xs">
                <div>
                  <label htmlFor="app-weekly-hours" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Estimated Weekly Availability
                  </label>
                  <select
                    id="app-weekly-hours"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
                  >
                    <option value="5 – 10 hrs / week">5 – 10 hrs / week (Part-time)</option>
                    <option value="10 – 20 hrs / week">10 – 20 hrs / week (Flexible)</option>
                    <option value="20 – 35+ hrs / week">20 – 35+ hrs / week (Dedicated)</option>
                  </select>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                  <p className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                    Contributor Standards & Disclosure:
                  </p>
                  <ul className="space-y-2 text-[11px] text-slate-600 dark:text-slate-400">
                    <li>• Tasks must represent your own authentic analysis without unapproved automated generation.</li>
                    <li>• Task availability and rates are benchmark estimates subject to active client terms.</li>
                    <li>• All project data is strictly confidential and protected by contributor NDAs.</li>
                  </ul>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-slate-700 dark:text-slate-300 text-xs">
                      I agree to the Bever Contributor Terms of Service, Confidentiality Agreement, and understand that qualification is required prior to project assignment.
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-rose-500 text-[11px] mt-1">{errors.terms}</p>
                  )}
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Submit Profile & Begin Assessment</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="text-center py-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
              Application Received!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
              Welcome to Bever, <strong className="text-slate-900 dark:text-white">{fullName}</strong>. Your profile has been created and your initial evaluation assessment is ready.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 max-w-sm mx-auto mb-6 text-xs text-left">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-slate-400">Applicant ID:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {generatedApplicantId}
                </span>
              </div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-slate-400">Assigned Track:</span>
                <span className="font-medium text-indigo-600 dark:text-indigo-400">
                  {selectedTrack}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Assessment Ready
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-xl hover:bg-slate-800 transition-colors"
              >
                Go to Contributor Portal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
