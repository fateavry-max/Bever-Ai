'use client';

import React, { useState } from 'react';
import { PlusCircle, CheckCircle2 } from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

export default function AdminAssessmentsPage() {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
              Calibration Engine
            </span>
            <span className="text-xs text-zinc-400">·</span>
            <span className="text-xs text-zinc-500 font-mono">Sample Assessment Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            Skill Assessments &amp; Calibration Benchmarks
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Design diagnostic tests, configure automated grading rubrics, and set minimum pass thresholds for contributor queue qualification.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setNotice('Assessment authoring builder is currently in development.');
            setTimeout(() => setNotice(null), 4000);
          }}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 transition-colors cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Assessment</span>
        </button>
      </div>

      <FeatureStatusBanner
        featureName="Assessment Rubric Authoring & Automated Proctoring"
        description="Interactive question bank editing and automated scoring webhook deployment are currently in development."
      />

      {notice && (
        <div className="p-3.5 rounded-xl bg-zinc-950 text-white text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      <div className="space-y-3">
        <div className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-semibold text-cyan-700">ASM-CORE-RLHF</span>
              <span className="text-sm font-semibold text-zinc-950">Foundational RLHF &amp; Pairwise Annotation Rubric</span>
            </div>
            <p className="text-xs text-zinc-500 font-mono">Pass Threshold: 85% · 12 Questions · 20 Mins Duration</p>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Sample Spec
          </span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-semibold text-violet-700">ASM-PY-ADV</span>
              <span className="text-sm font-semibold text-zinc-950">Python AST, Type Annotations &amp; Algorithmic Correctness</span>
            </div>
            <p className="text-xs text-zinc-500 font-mono">Pass Threshold: 90% · 8 Questions · 30 Mins Duration</p>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Sample Spec
          </span>
        </div>
      </div>
    </div>
  );
}
