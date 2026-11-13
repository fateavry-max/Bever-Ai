'use client';

import React, { useState } from 'react';
import {
  X,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Send,
  Users2,
  FileCheck,
} from 'lucide-react';

interface EnterpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnterpriseModal({ isOpen, onClose }: EnterpriseModalProps) {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [volume, setVolume] = useState('20 – 100 Contributor Specialists');
  const [selectedModalities, setSelectedModalities] = useState<string[]>([
    'RLHF & Alignment',
  ]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  if (!isOpen) return null;

  const modalitiesList = [
    'RLHF & Alignment',
    'Code Generation & Debugging',
    'Domain Expert Review (STEM, Law, Med)',
    'Multilingual & Localization (40+ Pairs)',
    'Data Annotation & Bounding',
    'Custom Red-Teaming & Safety',
  ];

  const toggleModality = (mod: string) => {
    if (selectedModalities.includes(mod)) {
      setSelectedModalities(selectedModalities.filter((m) => m !== mod));
    } else {
      setSelectedModalities([...selectedModalities, mod]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!workEmail.trim() || !workEmail.includes('@'))
      errs.workEmail = 'Valid work email is required';
    if (!companyName.trim()) errs.companyName = 'Company name is required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const ref = `ENT-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceId(ref);
    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close enterprise modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
                <Building2 className="w-3.5 h-3.5" />
                <span>Enterprise Inquiries</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Partner With Bever Enterprise
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Tell us about your model training objectives, workforce requirements, and desired delivery timelines.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="ent-full-name" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    id="ent-full-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
                  />
                  {errors.fullName && (
                    <p className="text-rose-500 text-[11px] mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="ent-work-email" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Work Email *
                  </label>
                  <input
                    id="ent-work-email"
                    type="email"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="marcus@company.ai"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
                  />
                  {errors.workEmail && (
                    <p className="text-rose-500 text-[11px] mt-1">{errors.workEmail}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="ent-company-name" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Company / Lab Name *
                  </label>
                  <input
                    id="ent-company-name"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Synthetix Labs"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
                  />
                  {errors.companyName && (
                    <p className="text-rose-500 text-[11px] mt-1">{errors.companyName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="ent-volume" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Workforce Scale Needed
                  </label>
                  <select
                    id="ent-volume"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
                  >
                    <option value="Pilot Track (< 20 Specialists)">Pilot Track (&lt; 20 Specialists)</option>
                    <option value="20 – 100 Contributor Specialists">20 – 100 Contributor Specialists</option>
                    <option value="100 – 500+ Distributed Annotators">100 – 500+ Distributed Annotators</option>
                    <option value="Enterprise Custom SLA">Enterprise Custom SLA</option>
                  </select>
                </div>
              </div>

              {/* Data Modalities Selection */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Training & Feedback Capabilities:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {modalitiesList.map((mod) => (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => toggleModality(mod)}
                      className={`p-2.5 rounded-xl text-left border transition-all flex items-center justify-between text-[11px] ${
                        selectedModalities.includes(mod)
                          ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 font-semibold text-indigo-900 dark:text-indigo-200'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      <span>{mod}</span>
                      {selectedModalities.includes(mod) && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="ent-message" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Project Scope or Requirements Overview
                </label>
                <textarea
                  id="ent-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline your target task types, latency goals, or domain complexity..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-xl hover:bg-slate-800 transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Enterprise Request</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
              Inquiry Dispatched
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
              Thank you, <strong className="text-slate-900 dark:text-white">{fullName}</strong>. An enterprise solutions director from Bever will contact you at <span className="font-mono">{workEmail}</span> within one business day.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 max-w-sm mx-auto mb-6 text-xs text-left">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-slate-400">Reference Ticket:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {referenceId}
                </span>
              </div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-slate-400">Organization:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {companyName}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Scale:</span>
                <span className="text-slate-600 dark:text-slate-300">{volume}</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
