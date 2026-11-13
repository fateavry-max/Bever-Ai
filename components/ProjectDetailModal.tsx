'use client';

import React from 'react';
import {
  X,
  Clock,
  Globe2,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  FileCode,
  AlertCircle,
} from 'lucide-react';
import { Opportunity } from '../lib/opportunities';

interface ProjectDetailModalProps {
  opportunity: Opportunity | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (opportunity: Opportunity) => void;
}

export function ProjectDetailModal({
  opportunity,
  isOpen,
  onClose,
  onApply,
}: ProjectDetailModalProps) {
  if (!isOpen || !opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close project detail modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category Header */}
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
          <span>{opportunity.category}</span>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <span>{opportunity.difficulty} Level</span>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pr-8">
          {opportunity.title}
        </h3>

        {/* Quick Specs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 mb-6 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Benchmark Rate:</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              {opportunity.estimatedRate}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Availability:</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {opportunity.weeklyHours}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Language:</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {opportunity.language}
            </span>
          </div>
        </div>

        {/* Project Scope & Context */}
        <div className="mb-6 space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">
              Project Overview
            </h4>
            <p>{opportunity.fullDescription}</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">
              Key Contributor Deliverables
            </h4>
            <ul className="space-y-1.5">
              {opportunity.deliverables.map((deliv, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{deliv}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">
              Required Competencies & Tools
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {opportunity.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-[11px]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">
              Qualification Assessment Details
            </h4>
            <p className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Clock className="w-4 h-4 text-indigo-500" />
              <span>{opportunity.assessmentEstimate}. Clear instructions provided before starting.</span>
            </p>
          </div>
        </div>

        {/* Benchmark Disclaimer */}
        <div className="mb-6 p-3 rounded-xl bg-slate-100/70 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500 flex items-start gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span>
            Benchmark notice: Project task volumes and compensation are based on active client statements of work and successful assessment qualification.
          </span>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onApply(opportunity);
            }}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>Apply to this Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
