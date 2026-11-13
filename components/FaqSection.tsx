'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is Bever?',
      a: 'Bever is a global AI training and human intelligence platform. We connect independent professionals, subject-matter experts, linguists, and researchers worldwide with opportunities to evaluate, train, and improve artificial intelligence models through reinforcement learning, expert review, and structured feedback.',
    },
    {
      q: 'Who can join Bever?',
      a: 'Bever welcomes talented individuals across disciplines: software engineers, writers, editors, mathematicians, researchers, medical and life sciences specialists, bilingual translators, and general AI evaluators. Whether you are a full-time freelancer, a graduate student, or an industry practitioner, you can apply.',
    },
    {
      q: 'Can contributors work from different countries?',
      a: 'Yes. Bever is designed as an internationally distributed platform. Contributors can participate remotely from eligible regions worldwide, provided they meet identity verification and local compliance guidelines.',
    },
    {
      q: 'What types of projects are available?',
      a: 'Our projects span 10 core domains: General AI Training, Writing & Editing, Coding & Software Engineering, Mathematics, Science, Language & Translation, Data Annotation, Image & Video Evaluation, Audio Transcription, and Subject-Matter Expertise (e.g. Finance, Law, Medicine).',
    },
    {
      q: 'How do I qualify for projects?',
      a: 'After creating your profile, you can take skill-specific qualification assessments. These assessments test prompt comprehension, critical reasoning, factuality verification, and adherence to evaluation rubrics. Successful qualification unlocks corresponding project task queues.',
    },
    {
      q: 'How are contributors paid?',
      a: 'Compensation is calculated based on completed, verified tasks according to project benchmark terms. Payouts are distributed on a regular schedule (typically weekly or bi-weekly) via secure, established payment partners. Benchmark rates are clearly displayed prior to task acceptance.',
    },
    {
      q: 'Is experience required?',
      a: 'We have opportunities for varying levels of experience. Entry-level tracks (such as general conversational evaluation or basic data annotation) require keen attention to detail and strong language skills, while specialized tracks (such as graduate-level math or software engineering) require proven subject expertise.',
    },
    {
      q: 'Can experts apply?',
      a: 'Yes, domain specialists are in high demand. We have dedicated tracks for PhDs, CPAs, MDs, licensed attorneys, and senior engineers to evaluate complex multi-turn reasoning and domain-specific AI models.',
    },
    {
      q: 'How do businesses work with Bever?',
      a: 'Enterprise AI labs and corporate teams partner with Bever to source custom evaluation datasets, execute RLHF/RLAIF campaigns, perform double-blind model benchmarking, and deploy specialized human-in-the-loop workforces under strict SLAs and confidentiality.',
    },
    {
      q: 'How does Bever maintain quality?',
      a: 'Quality is maintained through multi-tier reviewer consensus, statistical inter-annotator agreement metrics, continuous contributor calibration tests, double-blind task assignment, and senior reviewer spot audits.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="about" className="py-20 md:py-28 relative bg-slate-50/50 dark:bg-slate-950/40 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 text-balance">
            Everything You Need to Know.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Clear answers about contributor qualification, project workflows, enterprise engagements, and platform standards.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/70 animate-in fade-in duration-200">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
