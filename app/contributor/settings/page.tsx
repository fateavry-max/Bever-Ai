'use client';

import React, { useState } from 'react';
import {
  Shield,
  Save,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

export default function ContributorSettingsPage() {
  const { user } = useAuth();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [taskSurgeAlerts, setTaskSurgeAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-black/[0.06]">
        <div className="flex items-center gap-2 mb-1 text-xs">
          <span className="font-mono text-zinc-500 font-medium">Account Preferences</span>
          <span className="text-zinc-300">·</span>
          <span className="text-zinc-700 font-mono">Contributor Console</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight font-display">
          Contributor Settings & Security
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Manage your personal details, session credentials, notification thresholds, and security keys.
        </p>
      </div>

      <FeatureStatusBanner
        featureName="Account Security & 2FA Persistence"
        description="Server-side TOTP authenticator enrollment and profile preference persistence are currently in development."
      />

      <div className="space-y-6">
        {/* Personal Details */}
        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
          <h2 className="text-sm font-semibold text-zinc-950 uppercase font-mono pb-2 border-b border-black/[0.06]">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-zinc-600 font-medium mb-1">Full Legal Name</label>
              <input
                type="text"
                defaultValue={user?.name || 'Alex Rivera'}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 focus:outline-hidden focus:border-zinc-950"
              />
            </div>
            <div>
              <label className="block text-zinc-600 font-medium mb-1">Primary Email Address</label>
              <input
                type="email"
                defaultValue={user?.email || 'alex.rivera@bever.ai'}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 focus:outline-hidden focus:border-zinc-950"
              />
            </div>
          </div>
        </div>

        {/* Security & 2FA */}
        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
          <h2 className="text-sm font-semibold text-zinc-950 uppercase font-mono pb-2 border-b border-black/[0.06]">
            Authentication & Security
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-zinc-700" />
                <div>
                  <span className="font-semibold text-zinc-950 block">Two-Factor Authentication (2FA)</span>
                  <span className="text-zinc-500 text-[11px]">Require TOTP authenticator code on every sign-in</span>
                </div>
              </div>
              <button
                onClick={() => setTwoFactor(!twoFactor)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium cursor-pointer ${
                  twoFactor ? 'bg-zinc-950 text-white' : 'bg-zinc-200 text-zinc-600'
                }`}
              >
                {twoFactor ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
          <h2 className="text-sm font-semibold text-zinc-950 uppercase font-mono pb-2 border-b border-black/[0.06]">
            Notification Dispatches
          </h2>
          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={taskSurgeAlerts}
                onChange={(e) => setTaskSurgeAlerts(e.target.checked)}
                className="accent-zinc-950 w-4 h-4"
              />
              <span className="text-zinc-700">Email me when high-priority task surges open in my qualified domains</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="accent-zinc-950 w-4 h-4"
              />
              <span className="text-zinc-700">Email me on Tuesday payout disbursements and consensus review audits</span>
            </label>
          </div>
        </div>

        <div>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saved ? 'Saved Locally (Backend In Dev)' : 'Save Settings'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
