'use client';

import React, { useState } from 'react';
import {
  UserPlus,
  Key,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'ML Research Lead' | 'Data Engineer' | 'Billing Admin';
  status: 'active' | 'invited';
}

const sampleMembers: TeamMember[] = [
  {
    id: 'MEM-01',
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@synthetix.ai',
    role: 'Owner',
    status: 'active',
  },
  {
    id: 'MEM-02',
    name: 'David Thorne',
    email: 'd.thorne@synthetix.ai',
    role: 'ML Research Lead',
    status: 'active',
  },
  {
    id: 'MEM-03',
    name: 'Priya Sharma',
    email: 'p.sharma@synthetix.ai',
    role: 'Data Engineer',
    status: 'active',
  },
];

export default function BusinessTeamPage() {
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText('bev_preview_placeholder_token');
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setInviteSuccess(true);
    setTimeout(() => {
      setInviteSuccess(false);
      setInviteEmail('');
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-5 border-b border-black/[0.06]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
            Access Control
          </span>
          <span className="text-xs text-zinc-400">·</span>
          <span className="text-xs text-zinc-500 font-mono">3 Sample Organization Seats</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
          Team Members &amp; API Credentials
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Invite research collaborators and manage API tokens for programmatic dataset ingestion.
        </p>
      </div>

      <FeatureStatusBanner
        featureName="Organization RBAC & Production API Key Vault"
        description="Live workspace seat invitations and production SDK key provisioning are currently in development. Shown values are illustrative placeholders."
      />

      {/* API Key Box */}
      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-700" />
            <h2 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider font-mono">
              Ingestion API Token (Placeholder)
            </h2>
          </div>
          <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            IN DEVELOPMENT
          </span>
        </div>
        <p className="text-xs text-zinc-500">
          Authenticate client SDK calls when creating batch evaluation prompts directly from your CI/CD training clusters.
        </p>
        <div className="flex items-center gap-3">
          <code className="flex-1 bg-zinc-50 border border-black/[0.08] rounded-xl px-3 py-2 text-xs font-mono text-zinc-700">
            bev_preview_placeholder_••••••••••••••
          </code>
          <button
            type="button"
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            {apiKeyCopied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{apiKeyCopied ? 'Copied Placeholder' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Invite form */}
      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
        <h2 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider font-mono pb-2 border-b border-black/[0.06]">
          Invite Organization Member
        </h2>
        <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="colleague@organization.ai"
            className="flex-1 bg-white border border-black/[0.09] rounded-xl px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:border-zinc-950"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0 cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{inviteSuccess ? 'Invite Queued (In Dev)' : 'Send Invite'}</span>
          </button>
        </form>
      </div>

      {/* Member List */}
      <div className="space-y-3">
        {sampleMembers.map((mem) => (
          <div
            key={mem.id}
            className="p-4 rounded-xl bg-white border border-black/[0.06] shadow-xs flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-950">{mem.name}</span>
                <span className="text-[10px] font-mono text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/70">
                  {mem.role}
                </span>
              </div>
              <span className="text-xs text-zinc-500 font-mono">{mem.email}</span>
            </div>

            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Sample Member
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
