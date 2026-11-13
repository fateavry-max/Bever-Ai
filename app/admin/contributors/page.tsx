'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { buildBeverHeaders } from '@/lib/african-training-client';
import type {
  AfricanContributorProfile,
  ContributorLedgerSummary,
} from '@/lib/african-training';

interface EnrichedProfile extends AfricanContributorProfile {
  ledger: ContributorLedgerSummary;
}

export default function AdminContributorsPage() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<EnrichedProfile[]>([]);
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let active = true;
    async function load() {
      try {
        const res = await fetch('/api/african-training/profile?scope=all', {
          headers: buildBeverHeaders(user),
        });
        const data = await res.json();
        if (active) setProfiles(data.profiles || []);
      } catch {
        // Ignored
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [user]);

  const handleStatusChange = async (
    email: string,
    accountStatus: 'active' | 'flagged' | 'suspended'
  ) => {
    if (!user) return;
    try {
      const res = await fetch('/api/african-training/profile', {
        method: 'PATCH',
        headers: buildBeverHeaders(user),
        body: JSON.stringify({ email, accountStatus }),
      });
      const data = await res.json();
      if (res.ok && data.profile) {
        setProfiles((prev) =>
          prev.map((p) => (p.email === email ? { ...p, accountStatus } : p))
        );
        setNotice(`Updated account status for ${email} to ${accountStatus}.`);
      }
    } catch {
      // Ignored
    }
  };

  const filtered = profiles.filter((p) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    const langs = p.languagesSpoken.map((l) => l.language).join(' ');
    return `${p.name} ${p.email} ${p.country} ${langs}`.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="pb-5 border-b border-black/[0.06]">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-semibold block mb-1">
          Contributor Performance &amp; Compliance
        </span>
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
          African Contributor Performance Directory
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Monitor contributor languages, countries, quality scores, fraud flags, consent status, and account standing.
        </p>
      </div>

      {notice && (
        <div className="p-3.5 rounded-xl bg-zinc-950 text-white text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      <div className="p-4 rounded-xl bg-white border border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, country (Nigeria, Kenya...), or language..."
            className="w-full bg-zinc-50 border border-black/[0.08] rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-950"
          />
        </div>
        <span className="text-xs font-mono text-zinc-500">
          {filtered.length} contributor profiles
        </span>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-black/[0.06] text-zinc-400 font-mono text-[11px]">
                <th className="pb-3 font-medium">Contributor &amp; Country</th>
                <th className="pb-3 font-medium">Languages &amp; Accents</th>
                <th className="pb-3 font-medium">Quality Score</th>
                <th className="pb-3 font-medium">Approved / Pending</th>
                <th className="pb-3 font-medium">Flags &amp; Consent</th>
                <th className="pb-3 font-medium text-right">Status Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.05]">
              {filtered.map((p) => (
                <tr key={p.email} className="hover:bg-zinc-50/70">
                  <td className="py-3.5">
                    <p className="font-semibold text-zinc-950">{p.name}</p>
                    <p className="font-mono text-[11px] text-zinc-500">
                      {p.email} · {p.country}
                    </p>
                  </td>
                  <td className="py-3.5 max-w-xs">
                    <p className="text-zinc-900">
                      {p.languagesSpoken.map((l) => `${l.language} (${l.proficiency})`).join(', ')}
                    </p>
                    <p className="text-[11px] text-zinc-400">
                      {p.accentsDialects.join(' · ')}
                    </p>
                  </td>
                  <td className="py-3.5 font-mono font-semibold text-zinc-950 tabular-nums">
                    {p.qualityScore.toFixed(1)}%
                  </td>
                  <td className="py-3.5 font-mono tabular-nums">
                    <span className="text-emerald-700 font-semibold block">
                      ${p.ledger?.approvedEarningsUsd.toFixed(2) ?? '0.00'} approved
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      ${p.ledger?.pendingEarningsUsd.toFixed(2) ?? '0.00'} pending
                    </span>
                  </td>
                  <td className="py-3.5 font-mono text-[11px]">
                    <span className="block text-zinc-800">Flags: {p.fraudFlagsCount}</span>
                    <span className="text-zinc-500">
                      Consent: {p.consentSigned ? 'SIGNED' : 'PENDING'}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <select
                      aria-label={`Account status for ${p.name}`}
                      value={p.accountStatus}
                      onChange={(e) =>
                        handleStatusChange(
                          p.email,
                          e.target.value as 'active' | 'flagged' | 'suspended'
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-zinc-50 border border-black/[0.1] text-xs font-mono text-zinc-900"
                    >
                      <option value="active">active</option>
                      <option value="flagged">flagged</option>
                      <option value="suspended">suspended</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
