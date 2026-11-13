'use client';

import React from 'react';
import {
  PenTool,
  Code2,
  Binary,
  Microscope,
  Languages,
  BookOpen,
  Palette,
  CheckCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface ContributorCategoriesProps {
  onSelectCategoryTrack: (categoryName: string) => void;
}

export function ContributorCategories({ onSelectCategoryTrack }: ContributorCategoriesProps) {
  const categories = [
    {
      title: 'Writers & Editors',
      icon: PenTool,
      description:
        'Shape prose rhythm, tonal subtlety, and natural phrasing. Eliminate synthetic clichés and craft persuasive, clear content for AI alignment.',
      tasks: ['Style and voice calibration', 'Complex editorial rewrites', 'Rhetorical consistency review'],
      trackKey: 'Writing and Editing',
    },
    {
      title: 'Software Developers',
      icon: Code2,
      description:
        'Test programming reasoning, adversarial debugging, architecture patterns, and algorithm bounds across modern software stacks.',
      tasks: ['Edge-case unit testing', 'Security vulnerability detection', 'Framework migration benchmarking'],
      trackKey: 'Coding and Software Engineering',
    },
    {
      title: 'Mathematicians',
      icon: Binary,
      description:
        'Audit formal mathematical derivations, graduate-level algebraic proofs, combinatorial logic, and numerical accuracy.',
      tasks: ['LaTeX proof tree verification', 'Step-by-step logic checking', 'Adversarial puzzle generation'],
      trackKey: 'Mathematics',
    },
    {
      title: 'Scientists',
      icon: Microscope,
      description:
        'Critique biomedical literature summaries, chemical equations, physics principles, and experimental protocols with peer-review rigor.',
      tasks: ['Peer-reviewed DOI verification', 'Dosage and safety auditing', 'Mechanistic explanation grading'],
      trackKey: 'Science',
    },
    {
      title: 'Language Experts & Translators',
      icon: Languages,
      description:
        'Evaluate cultural registers, idiomatic translations, honorifics, and dialect nuances across 40+ global language pairs.',
      tasks: ['Colloquial idiom translation', 'Politeness/Keigo validation', 'Calque and literalism detection'],
      trackKey: 'Language and Translation',
    },
    {
      title: 'Researchers & Academics',
      icon: BookOpen,
      description:
        'Validate multi-step factual synthesis, citation authenticity, systematic literature extraction, and methodology soundness.',
      tasks: ['Complex source triangulation', 'Methodological critique', 'Epistemic claim classification'],
      trackKey: 'Subject-Matter Expertise',
    },
    {
      title: 'Creative Professionals',
      icon: Palette,
      description:
        'Benchmark creative narrative arcs, artistic prompt interpretation, visual composition critique, and multi-modal storytelling.',
      tasks: ['Visual prompt grounding', 'Narrative voice consistency', 'Creative problem-solving evaluation'],
      trackKey: 'Writing and Editing',
    },
    {
      title: 'General AI Evaluators',
      icon: CheckCircle,
      description:
        'Assess day-to-day conversational helpfulness, safety policy adherence, clear instruction-following, and web research factuality.',
      tasks: ['Constraint satisfaction audit', 'Neutrality and balance scoring', 'Search summary fact-checking'],
      trackKey: 'General AI Training',
    },
  ];

  return (
    <section id="for-experts" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-3">
            <span>Specialized Knowledge Domains</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span>Multidisciplinary Talent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 text-balance">
            Your Expertise Has a Place Here.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            AI systems improve only when guided by human discernment. Whatever your field of study or professional craft, your insight helps build more capable, truthful models.
          </p>
        </div>

        {/* Categories Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="group rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 backdrop-blur-sm"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center mb-5 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                  <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Typical Contributions:
                    </p>
                    {cat.tasks.map((task, tIdx) => (
                      <p key={tIdx} className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                        <span>{task}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => onSelectCategoryTrack(cat.trackKey)}
                    className="w-full py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1 group/btn"
                  >
                    <span>View Opportunities</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
