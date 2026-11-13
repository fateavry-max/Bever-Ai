'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search, ArrowRight } from 'lucide-react';
import { PublicLayout } from '@/components/layouts/PublicLayout';

const FAQS = [
  {
    q: 'What is Bever?',
    a: 'Bever is a global AI training and human intelligence platform. We connect independent professionals, subject-matter experts, linguists, and researchers worldwide with opportunities to evaluate, train, and improve artificial intelligence models through reinforcement learning, expert review, and structured feedback.',
    cat: 'General',
  },
  {
    q: 'Who can join Bever as a contributor?',
    a: 'Anyone with strong domain expertise, critical reasoning skills, and attention to detail. We welcome software engineers, mathematicians, creative writers, academic researchers, translators, and bilingual linguists from 85+ countries.',
    cat: 'Contributors',
  },
  {
    q: 'Can contributors work remotely from different countries?',
    a: 'Yes. Bever is built as a global, remote-first contributor platform. As long as you have a stable internet connection, an identity-verified account, and pass the necessary qualification tests, you can participate from any supported country.',
    cat: 'Contributors',
  },
  {
    q: 'How do contributors get paid and what is the schedule?',
    a: 'Bever processes payments weekly every Tuesday. Contributors are compensated according to verified hours and approved task submissions. We support automated ACH direct deposits to US bank accounts and cross-border bank transfers via trusted payout partners.',
    cat: 'Earnings',
  },
  {
    q: 'How do businesses work with Bever?',
    a: 'AI companies, research labs, and enterprise organizations partner with Bever to collect high-density fine-tuning datasets, run RLHF preference ranking pipelines, and evaluate model outputs against custom rubrics under strict SLAs and confidentiality.',
    cat: 'Business',
  },
  {
    q: 'How does Bever maintain data quality and agreement?',
    a: 'We utilize double-blind multi-rater reviews, statistical inter-annotator agreement tracking (Cohen’s Kappa & Krippendorff’s Alpha), automated gold-standard test question injection, and regular reviewer calibrations.',
    cat: 'Quality',
  },
  {
    q: 'How do I qualify for projects?',
    a: 'After creating an account, you can view available qualification assessments in your Contributor Dashboard. Each assessment contains rubric instructions and sample test cases. Passing grants immediate access to the respective project queue.',
    cat: 'Contributors',
  },
  {
    q: 'What account types exist on Bever?',
    a: 'Bever strictly segments between two external user roles: Contributor (for individuals training and evaluating AI) and Business (for companies and labs commissioning human supervisory feedback). Internal administration accounts are strictly provisioned by authorized staff.',
    cat: 'General',
  },
];

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const filtered = FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PublicLayout>
      <div className="py-20 sm:py-28 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-500 uppercase tracking-widest mb-3">
              <span>Help Center</span>
              <span className="text-zinc-300">/</span>
              <span>Knowledge Base</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#09090B] tracking-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-base text-zinc-600 leading-relaxed">
              Find clear answers about contributor qualification, weekly compensation, enterprise partnerships, and platform quality standards.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto mb-12">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics (e.g. payout, qualification, agreement)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-black/[0.08] rounded-xl text-sm text-[#09090B] placeholder-zinc-400 focus:outline-hidden focus:border-zinc-900 shadow-xs transition-colors"
            />
          </div>

          {/* Accordion */}
          <div className="space-y-3 mb-16">
            {filtered.map((faq, i) => {
              const isOpen = openIdx === i;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl bg-white border border-black/[0.06] shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-50/70 transition-colors"
                  >
                    <span className="text-sm font-semibold text-[#09090B]">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-500 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 text-sm text-zinc-600 leading-relaxed border-t border-black/[0.04]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer assistance card */}
          <div className="p-8 rounded-2xl bg-zinc-50 border border-black/[0.06] text-center">
            <h3 className="text-base font-semibold text-[#09090B] mb-2">Still have questions?</h3>
            <p className="text-xs text-zinc-500 mb-5">
              Our operations and support teams are available 24/7 to assist prospective contributors and enterprise partners.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#09090B] hover:bg-zinc-800 text-white font-medium text-xs rounded-full shadow-xs transition-all"
            >
              <span>Contact Bever Support</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
