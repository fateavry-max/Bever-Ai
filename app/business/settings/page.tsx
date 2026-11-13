'use client';

import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

export default function BusinessSettingsPage() {
  const [ssoEnforced, setSsoEnforced] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState('198.51.100.0/24\n203.0.113.4');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-5 border-b border-black/[0.06]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
            Enterprise Governance
          </span>
          <span className="text-xs text-zinc-400">·</span>
          <span className="text-xs text-zinc-500 font-mono">SOC 2 Type II Parameters</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
          Enterprise Security &amp; Workspace Settings
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Configure single sign-on (SAML/Okta), corporate IP firewalls, and data purging triggers.
        </p>
      </div>

      <FeatureStatusBanner
        featureName="Enterprise SAML 2.0 SSO & IP Firewall Enforcement"
        description="IdP metadata syncing and live CIDR gateway filtering are currently in development. Controls below update local preview state only."
      />

      <div className="space-y-6">
        {/* SAML / SSO */}
        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
          <h2 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider font-mono pb-2 border-b border-black/[0.06]">
            SAML 2.0 / Single Sign-On (SSO)
          </h2>
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 border border-black/[0.06] text-xs gap-4">
            <div>
              <span className="font-semibold text-zinc-950 block">Enforce Enterprise SSO</span>
              <span className="text-zinc-500 text-[11px]">Require workspace members to authenticate via corporate Identity Provider</span>
            </div>
            <button
              type="button"
              onClick={() => setSsoEnforced(!ssoEnforced)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold cursor-pointer ${
                ssoEnforced
                  ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                  : 'bg-zinc-200 text-zinc-700'
              }`}
            >
              {ssoEnforced ? 'ENFORCED' : 'OPTIONAL'}
            </button>
          </div>
        </div>

        {/* IP Whitelisting */}
        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
          <h2 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider font-mono pb-2 border-b border-black/[0.06]">
            Authorized Corporate IP CIDR Blocks
          </h2>
          <p className="text-xs text-zinc-500">
            Restrict portal access and API token calls exclusively to authorized enterprise CIDRs.
          </p>
          <textarea
            rows={3}
            value={ipWhitelist}
            onChange={(e) => setIpWhitelist(e.target.value)}
            className="w-full bg-zinc-50 border border-black/[0.09] rounded-xl p-3 text-xs font-mono text-zinc-800 focus:outline-hidden focus:border-zinc-950"
          />
        </div>

        <div>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saved ? 'Saved to Local Preview (In Dev)' : 'Save Enterprise Settings'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
