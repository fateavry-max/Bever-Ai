'use client';

import React from 'react';
import {
  ShieldCheck,
  Lock,
  Server,
  EyeOff,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';
import { PublicLayout } from '@/components/layouts/PublicLayout';

const SECURITY_PILLARS = [
  {
    icon: Lock,
    title: 'Data Confidentiality & Strict NDAs',
    desc: 'All contributors execute binding global non-disclosure agreements before accessing evaluation queues. Proprietary client prompts and raw model completions are never indexed by external search engines or leaked.',
  },
  {
    icon: EyeOff,
    title: 'Double-Blind Anonymization',
    desc: 'Contributor identities are hidden from model providers, and model provenance is hidden from annotators during evaluation to prevent bias and prompt scraping.',
  },
  {
    icon: Server,
    title: 'SOC 2 Type II & ISO 27001 Alignment',
    desc: 'Our operational data storage enforces AES-256 encryption at rest and TLS 1.3 in transit. Client data is stored in isolated tenant boundaries with role-based access control.',
  },
  {
    icon: UserCheck,
    title: 'Rigorous Contributor KYC & Bot Protection',
    desc: 'Every contributor undergoes identity verification and automated anti-bot heuristic testing. Scripted and automated responses are flagged and instantly purged.',
  },
];

export default function SecurityPage() {
  return (
    <PublicLayout>
      <div className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-500 uppercase tracking-widest mb-3">
              <span>Trust & Governance</span>
              <span className="text-zinc-300">/</span>
              <span>Enterprise Compliance</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#09090B] tracking-tight mb-4">
              Enterprise Trust & Platform Security
            </h1>
            <p className="text-base text-zinc-600 leading-relaxed">
              How Bever protects intellectual property, ensures data provenance, and enforces rigorous quality standards at global scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {SECURITY_PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="p-8 rounded-2xl bg-white border border-black/[0.06] shadow-xs hover:border-black/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-black/[0.04] text-zinc-800 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#09090B] mb-2">{p.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Compliance overview */}
          <div className="p-8 rounded-2xl bg-zinc-50 border border-black/[0.06] max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-semibold text-[#09090B]">Responsible Data Ethics Commitment</h3>
            </div>
            <p className="text-sm text-zinc-600 leading-relaxed mb-4">
              Bever does not claim ownership of model weights or customer fine-tuning outputs. All ground truth datasets generated on client campaigns belong exclusively to the commissioning organization upon invoice settlement.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Audit logs and data purge certificates provided upon request.</span>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
