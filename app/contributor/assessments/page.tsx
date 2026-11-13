'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  Clock,
  CheckCircle2,
  Play,
  ShieldCheck,
} from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

interface Assessment {
  id: string;
  title: string;
  domain: string;
  durationMinutes: number;
  questionCount: number;
  passThreshold: number;
  status: 'passed' | 'not_started' | 'retake_eligible';
  score?: number;
  unlockedProjects: number;
  description: string;
}

const sampleAssessments: Assessment[] = [
  {
    id: 'ASM-CORE-RLHF',
    title: 'Foundational RLHF & Pairwise Annotation Rubric',
    domain: 'Core Training',
    durationMinutes: 20,
    questionCount: 12,
    passThreshold: 85,
    status: 'passed',
    score: 96,
    unlockedProjects: 8,
    description: 'Evaluates critical discernment of helpfulness vs harmlessness, hallucination detection, and structured justification writeups.',
  },
  {
    id: 'ASM-PY-ADV',
    title: 'Python AST, Type Annotations & Algorithmic Correctness',
    domain: 'Software Engineering',
    durationMinutes: 30,
    questionCount: 8,
    passThreshold: 90,
    status: 'passed',
    score: 98,
    unlockedProjects: 4,
    description: 'Diagnoses ability to evaluate complex algorithmic logic, Big-O complexities, and security vulnerabilities in generated Python code.',
  },
  {
    id: 'ASM-MATH-PROOF',
    title: 'Advanced Calculus, Linear Algebra & Formal Proofs',
    domain: 'Mathematics & Science',
    durationMinutes: 40,
    questionCount: 10,
    passThreshold: 90,
    status: 'passed',
    score: 94,
    unlockedProjects: 3,
    description: 'Formal step verification, LaTeX typesetting accuracy, and mathematical derivation validation.',
  },
  {
    id: 'ASM-REDTEAM',
    title: 'Adversarial Prompt Injection & Boundary Probing',
    domain: 'AI Safety & Red-Teaming',
    durationMinutes: 25,
    questionCount: 15,
    passThreshold: 88,
    status: 'not_started',
    unlockedProjects: 5,
    description: 'Simulates edge-case safety evaluations, detecting subtle multi-turn social engineering and policy violations.',
  },
  {
    id: 'ASM-MED-CLIN',
    title: 'Clinical Pharmacology & Diagnostic Reasoning',
    domain: 'Medical Science',
    durationMinutes: 45,
    questionCount: 12,
    passThreshold: 92,
    status: 'not_started',
    unlockedProjects: 2,
    description: 'Verifies contraindications, dosage calculations, and clinical rationale for Tier-1 medical foundational models.',
  },
];

export default function ContributorAssessmentsPage() {
  const [activeModal, setActiveModal] = useState<Assessment | null>(null);
  const [testStarted, setTestStarted] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs">
            <span className="font-mono text-zinc-500 font-medium">Evaluation Gateway</span>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-700 font-medium">3 Assessments Passed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight font-display">
            Qualification Benchmarks & Assessments
          </h1>
          <p className="text-xs text-zinc-500 mt-1 max-w-xl">
            Standardized, double-blind calibration assessments that prove your expertise to enterprise model creators.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 text-xs text-zinc-800 font-mono">
          <ShieldCheck className="w-4 h-4 text-zinc-600" />
          <span>Automated Rubric Grading</span>
        </div>
      </div>

      <FeatureStatusBanner
        featureName="Proctored Qualification Engine"
        description="Automated proctored test sessions and real-time rubric grading are not ready yet and are currently in development."
      />

      {/* Assessment cards */}
      <div className="space-y-4">
        {sampleAssessments.map((asm) => {
          const isPassed = asm.status === 'passed';
          return (
            <div
              key={asm.id}
              className="p-6 rounded-2xl bg-white border border-black/[0.06] hover:border-zinc-300 transition-all shadow-xs"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-zinc-500 font-medium">
                      {asm.domain}
                    </span>
                    <span className="text-zinc-300">·</span>
                    <span className="font-mono text-zinc-400">{asm.id}</span>
                  </div>
                  <h3 className="text-base font-semibold text-zinc-950 font-display">{asm.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{asm.description}</p>
                </div>

                <div className="flex flex-wrap lg:flex-col lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-zinc-100 shrink-0">
                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
                    <span className="flex items-center gap-1.5 tabular-nums">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      {asm.durationMinutes} mins
                    </span>
                    <span className="tabular-nums">{asm.questionCount} Questions</span>
                    <span className="tabular-nums">Pass: {asm.passThreshold}%</span>
                  </div>

                  {isPassed ? (
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-700 font-medium text-xs font-mono flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Score: {asm.score}% (Passed)</span>
                      </span>
                      <Link
                        href="/contributor/tasks"
                        className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200/80 text-zinc-900 text-xs font-medium rounded-lg transition-colors"
                      >
                        Tasks Unlocked
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setActiveModal(asm);
                        setTestStarted(false);
                      }}
                      className="px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Assessment</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Test Launch Modal Simulation */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white border border-black/[0.08] rounded-2xl p-6 shadow-xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-zinc-950" />
                <h3 className="text-base font-semibold text-zinc-950 font-display">Bever Calibration Test</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-zinc-400 hover:text-zinc-950 text-xs font-medium"
              >
                Close
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div>
                <span className="text-[11px] font-mono text-zinc-400 block mb-1">Assessment Track:</span>
                <p className="text-sm font-semibold text-zinc-950 font-display">{activeModal.title}</p>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{activeModal.description}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Duration:</span>
                  <span className="font-mono text-zinc-950 font-semibold tabular-nums">{activeModal.durationMinutes} Minutes</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Target Pass Threshold:</span>
                  <span className="font-mono text-zinc-950 font-semibold tabular-nums">{activeModal.passThreshold}%</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Unlocked Queues:</span>
                  <span className="font-mono text-zinc-950 tabular-nums">{activeModal.unlockedProjects} Active Enterprise Projects</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900">
                Not Ready Yet: Live proctored assessment runner and automated grading submission are currently in development.
              </div>
              {testStarted && (
                <div className="p-3 rounded-xl bg-zinc-100 border border-zinc-200 text-xs text-zinc-700 font-medium">
                  This assessment track is queued for upcoming release. Please check back once proctoring opens.
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-zinc-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-xs text-zinc-500 hover:text-zinc-950 font-medium cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => setTestStarted(true)}
                className="px-5 py-2.5 rounded-xl bg-zinc-200 text-zinc-700 font-medium text-xs transition-all cursor-pointer"
              >
                {testStarted ? 'Assessment Runner In Development' : 'Begin Proctored Session (In Dev)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
