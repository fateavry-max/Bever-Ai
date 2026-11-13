'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Database,
  CheckCircle,
  Shield,
  Languages,
  CheckCheck,
  Briefcase,
  BarChart3,
  ArrowRight,
  ShieldAlert,
  Lock,
  Send,
  Ticket,
} from 'lucide-react';

const ENTERPRISE_CAPABILITIES = [
  {
    icon: Database,
    title: 'Human Data Collection',
    description:
      'Original, bespoke supervisory datasets tailored to your model architecture: complex multi-turn prompts, reasoning traces, domain queries, and multimodal inputs.',
  },
  {
    icon: CheckCheck,
    title: 'AI Response Evaluation (RLHF & RLAIF)',
    description:
      'Rigorous human preference feedback, pairwise model comparisons, Likert multi-axis grading, and adversarial ranking for reinforcement learning pipelines.',
  },
  {
    icon: CheckCircle,
    title: 'Multimodal Data Annotation',
    description:
      'High-precision bounding boxes, semantic segmentation, audio transcription with timestamps, and visual question answering (VQA) ground truth.',
  },
  {
    icon: Briefcase,
    title: 'Subject-Matter Expert Assessments',
    description:
      'Direct access to thousands of vetted PhDs, physicians, software engineers, and mathematicians for frontier reasoning evaluation and validation.',
  },
  {
    icon: Languages,
    title: 'Multilingual Model Evaluation',
    description:
      'Native speaker evaluation across 40+ languages, including low-resource dialects, cultural localization, and cross-lingual semantic alignment.',
  },
  {
    icon: Shield,
    title: 'Enterprise Quality Assurance',
    description:
      'Multi-tier double-blind review loops, automated consensus scoring (Cohen’s Kappa > 0.85), golden task auditing, and anomaly detection.',
  },
  {
    icon: Building2,
    title: 'Dedicated Project Management',
    description:
      'Full-service delivery team providing agile scoping, custom rubric design, workforce management, and daily SLA reporting.',
  },
  {
    icon: BarChart3,
    title: 'Workforce & Pipeline Analytics',
    description:
      'Granular dashboards tracking inter-annotator agreement, error categorizations, velocity throughput, and task completion latency.',
  },
];

export default function ForBusinessesPage() {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [company, setCompany] = useState('');
  const [solutionType, setSolutionType] = useState('RLHF & Model Evaluation');
  const [volumeEstimate, setVolumeEstimate] = useState('10,000 – 50,000 tasks/month');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleEnterpriseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!workEmail.trim() || !workEmail.includes('@')) errs.workEmail = 'Valid business email is required';
    if (!company.trim()) errs.company = 'Company name is required';

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTicketId(`ENT-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 600);
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200">For Businesses</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-medium mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Enterprise AI Data & Evaluation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-4">
            Human Intelligence for Better AI.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Build better AI systems with high-quality human feedback, expert evaluation and scalable global contributor operations.
            From RLHF to domain-specific red teaming, Bever delivers verified supervisory data at production scale.
          </p>
        </div>

        {/* Enterprise Capabilities Grid */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-2">
              End-to-End Human Data Solutions
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configurable human-in-the-loop pipelines engineered for foundation model labs and enterprise AI teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ENTERPRISE_CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security & Governance Strip */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white mb-20 shadow-xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 block mb-2">
              Security & Compliance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Enterprise Data Governance by Design
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We treat proprietary model weights, internal customer data, and evaluation benchmarks with military-grade rigor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
              <Lock className="w-5 h-5 text-indigo-400 mb-2" />
              <h4 className="text-sm font-bold mb-1">SOC 2 Aligned Security</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Encrypted in transit and at rest (AES-256). Rigorous role-based access controls and zero-retention options.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
              <ShieldAlert className="w-5 h-5 text-indigo-400 mb-2" />
              <h4 className="text-sm font-bold mb-1">Comprehensive NDAs</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every contributor executes strict confidentiality agreements and IP assignment covenants before accessing project queues.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
              <CheckCheck className="w-5 h-5 text-indigo-400 mb-2" />
              <h4 className="text-sm font-bold mb-1">Double-Blind Redaction</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated PII scrubbing and anonymization so contributors never see sensitive enterprise identity data.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Enterprise Inquiry Intake */}
        <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-2">
              Contact Our Enterprise Team
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Discuss custom contributor cohorts, pilot project scoping, or custom SLA requirements.
            </p>
          </div>

          {ticketId ? (
            <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto mb-3">
                <Ticket className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-200 mb-1">
                Inquiry Received Successfully
              </h3>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 mb-4">
                Thank you for reaching out, <span className="font-semibold">{fullName}</span>. An enterprise solutions director from Bever will contact you at <span className="font-semibold">{workEmail}</span> within 24 business hours.
              </p>
              <div className="inline-block px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                Reference Ticket: {ticketId}
              </div>
            </div>
          ) : (
            <form onSubmit={handleEnterpriseSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Elena Vance"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                  {formErrors.fullName && (
                    <span className="text-[11px] text-rose-500 mt-1 block">{formErrors.fullName}</span>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="elena@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                  {formErrors.workEmail && (
                    <span className="text-[11px] text-rose-500 mt-1 block">{formErrors.workEmail}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Organization / Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Synthetix Labs"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                  {formErrors.company && (
                    <span className="text-[11px] text-rose-500 mt-1 block">{formErrors.company}</span>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Service Focus
                  </label>
                  <select
                    value={solutionType}
                    onChange={(e) => setSolutionType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white cursor-pointer"
                  >
                    <option value="RLHF & Model Evaluation">RLHF & Model Evaluation</option>
                    <option value="Domain Expert Annotation">Domain Expert Annotation (PhD/Eng)</option>
                    <option value="Model Red Teaming & Safety">Model Red Teaming & Safety</option>
                    <option value="Multilingual Localization">Multilingual Localization (40+ langs)</option>
                    <option value="Multimodal Data Labeling">Multimodal Data Labeling</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Estimated Monthly Volume
                </label>
                <select
                  value={volumeEstimate}
                  onChange={(e) => setVolumeEstimate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white cursor-pointer"
                >
                  <option value="< 10,000 tasks/month">Pilot / Exploratory (&lt; 10,000 tasks)</option>
                  <option value="10,000 – 50,000 tasks/month">Growth (10,000 – 50,000 tasks/month)</option>
                  <option value="50,000 – 250,000 tasks/month">Scale (50,000 – 250,000 tasks/month)</option>
                  <option value="250,000+ tasks/month">Frontier Enterprise (250,000+ tasks/month)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Project Scope & Specific Requirements
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about your target model capabilities, domain requirements, or timelines..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold hover:bg-indigo-600 dark:hover:bg-indigo-100 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Sending Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Enterprise Request</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
