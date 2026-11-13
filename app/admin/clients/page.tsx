'use client';

import React, { useState } from 'react';
import { PlusCircle, CheckCircle2 } from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

interface ClientOrg {
  id: string;
  name: string;
  contactPerson: string;
  contractValue: string;
  activeProjects: number;
  slaTier: string;
  status: 'active' | 'negotiation' | 'paused';
}

const sampleClients: ClientOrg[] = [
  {
    id: 'ORG-SYNTH-849',
    name: 'Synthetix AI Corp',
    contactPerson: 'Dr. Sarah Chen',
    contractValue: '$1,200,000 / yr',
    activeProjects: 4,
    slaTier: 'Enterprise Dedicated (99.9%)',
    status: 'active',
  },
  {
    id: 'ORG-APEX-102',
    name: 'Apex Cognition Labs',
    contactPerson: 'James Wilson',
    contractValue: '$850,000 / yr',
    activeProjects: 3,
    slaTier: 'Tier 1 Enterprise',
    status: 'active',
  },
  {
    id: 'ORG-NEO-591',
    name: 'NeuraScale Frontier Models',
    contactPerson: 'Dr. Alistair Vance',
    contractValue: '$1,750,000 / yr',
    activeProjects: 7,
    slaTier: 'Platinum Frontier SLA',
    status: 'active',
  },
];

export default function AdminClientsPage() {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
              Enterprise Portfolio
            </span>
            <span className="text-xs text-zinc-400">·</span>
            <span className="text-xs text-zinc-500 font-mono">Sample Client Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            Enterprise Client Organizations
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Manage corporate client accounts, active contracts, dedicated SLA agreements, and billing arrangements.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setNotice('Enterprise tenant provisioning wizard is currently in development.');
            setTimeout(() => setNotice(null), 4000);
          }}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 transition-colors cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Provision New Client</span>
        </button>
      </div>

      <FeatureStatusBanner
        featureName="Multi-Tenant Organization Provisioning & CRM Sync"
        description="Automated workspace tenant creation, MSA contract binding, and billing metering sync are currently in development."
      />

      {notice && (
        <div className="p-3.5 rounded-xl bg-zinc-950 text-white text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      <div className="space-y-3">
        {sampleClients.map((client) => (
          <div
            key={client.id}
            className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/70">
                  {client.id}
                </span>
                <span className="text-base font-semibold text-zinc-950">{client.name}</span>
                <span className="text-xs text-zinc-500 font-mono">({client.contactPerson})</span>
              </div>
              <p className="text-xs text-zinc-500 font-mono">
                {client.slaTier} · {client.activeProjects} Active Campaigns
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs font-mono shrink-0">
              <div>
                <span className="text-zinc-500 block text-[10px]">Sample Contract Value</span>
                <span className="text-zinc-950 font-semibold text-sm">{client.contractValue}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                SAMPLE CLIENT
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
