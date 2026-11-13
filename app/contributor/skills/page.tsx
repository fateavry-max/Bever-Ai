'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Award,
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: 'Coding & CS' | 'Math & Science' | 'Linguistics' | 'Safety & Policy';
  level: 'Expert (Tier 1)' | 'Proficient (Tier 2)' | 'Verified Base' | 'Locked';
  score: number; // 0-100
  rateMultiplier: string;
  activeProjects: number;
  status: 'verified' | 'in_review' | 'available_to_test';
}

const sampleSkills: Skill[] = [
  {
    id: 'SK-PY-01',
    name: 'Python (AST, Typing, PyTorch)',
    category: 'Coding & CS',
    level: 'Expert (Tier 1)',
    score: 98,
    rateMultiplier: '+35% ($55/hr)',
    activeProjects: 4,
    status: 'verified',
  },
  {
    id: 'SK-MATH-02',
    name: 'Differential Equations & LaTeX Proofs',
    category: 'Math & Science',
    level: 'Expert (Tier 1)',
    score: 96,
    rateMultiplier: '+40% ($58/hr)',
    activeProjects: 3,
    status: 'verified',
  },
  {
    id: 'SK-RLHF-03',
    name: 'Pairwise Preference Justification & RLHF',
    category: 'Safety & Policy',
    level: 'Proficient (Tier 2)',
    score: 91,
    rateMultiplier: '+20% ($42/hr)',
    activeProjects: 6,
    status: 'verified',
  },
  {
    id: 'SK-REDTEAM-04',
    name: 'Adversarial Jailbreak & Prompt Injection',
    category: 'Safety & Policy',
    level: 'Proficient (Tier 2)',
    score: 89,
    rateMultiplier: '+25% ($45/hr)',
    activeProjects: 2,
    status: 'verified',
  },
  {
    id: 'SK-RUST-05',
    name: 'Rust Memory Safety & Concurrency',
    category: 'Coding & CS',
    level: 'Locked',
    score: 0,
    rateMultiplier: '+50% ($65/hr)',
    activeProjects: 5,
    status: 'available_to_test',
  },
  {
    id: 'SK-MED-06',
    name: 'Clinical Reasoning & Pharmacokinetics',
    category: 'Math & Science',
    level: 'Locked',
    score: 0,
    rateMultiplier: '+60% ($75/hr)',
    activeProjects: 2,
    status: 'available_to_test',
  },
  {
    id: 'SK-LANG-07',
    name: 'Japanese (N1 Keigo Nuance Calibration)',
    category: 'Linguistics',
    level: 'Locked',
    score: 0,
    rateMultiplier: '+30% ($48/hr)',
    activeProjects: 3,
    status: 'available_to_test',
  },
];

export default function ContributorSkillsPage() {
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const categories = ['all', 'Coding & CS', 'Math & Science', 'Linguistics', 'Safety & Policy'];

  const filtered = sampleSkills.filter((s) =>
    selectedCat === 'all' ? true : s.category === selectedCat
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs">
            <span className="font-mono text-zinc-500 font-medium">Proficiency Matrix</span>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-700 font-medium">4 Verified Badges</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight font-display">
            Contributor Skills & Subject Expertise
          </h1>
          <p className="text-xs text-zinc-500 mt-1 max-w-xl">
            Certified proficiencies unlock high-tier specialized task queues with premium hourly rate multipliers.
          </p>
        </div>

        <Link
          href="/contributor/assessments"
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 shadow-xs transition-all"
        >
          <Award className="w-4 h-4" />
          <span>Take New Assessment</span>
        </Link>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-xl w-fit overflow-x-auto">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCat(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors cursor-pointer shrink-0 ${
              selectedCat === c
                ? 'bg-white text-zinc-950 shadow-xs font-semibold'
                : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((skill) => {
          const isVerified = skill.status === 'verified';
          return (
            <div
              key={skill.id}
              className="p-5 rounded-2xl bg-white border border-black/[0.06] hover:border-zinc-300 transition-all flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-mono text-zinc-500">
                    {skill.category}
                  </span>
                  {isVerified ? (
                    <span className="text-emerald-700 font-medium flex items-center gap-1 text-[11px] font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {skill.level}
                    </span>
                  ) : (
                    <span className="text-zinc-400 font-mono text-[11px] flex items-center gap-1">
                      <Lock className="w-3 h-3 text-zinc-400" />
                      Locked
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-zinc-950 mb-2 font-display">{skill.name}</h3>

                {isVerified ? (
                  <div className="space-y-2 my-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">Benchmark Score:</span>
                      <span className="font-mono text-zinc-950 font-semibold tabular-nums">{skill.score} / 100</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-zinc-950 rounded-full"
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-zinc-500 my-4 leading-relaxed">
                    Complete the 25-minute diagnostic test to unlock access to {skill.activeProjects} high-value active queues.
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 block">Rate Uplift</span>
                  <span className="text-xs font-mono font-medium text-zinc-950 tabular-nums">{skill.rateMultiplier}</span>
                </div>

                {isVerified ? (
                  <Link
                    href="/contributor/tasks"
                    className="px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200/80 text-zinc-900 text-xs font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>View Queues</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                ) : (
                  <Link
                    href="/contributor/assessments"
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200/80 text-xs font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>Unlock Test</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
