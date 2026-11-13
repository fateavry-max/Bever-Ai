'use client';

import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

export default function AdminSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [goldInjectionRate, setGoldInjectionRate] = useState('10');
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
            System Configuration
          </span>
          <span className="text-xs text-zinc-400">·</span>
          <span className="text-xs text-zinc-500 font-mono">Global Runtime Flags</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
          Global System Settings &amp; Feature Flags
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Super-admin controls over cluster parameters, global gold audit rates, and queue dispatcher timeouts.
        </p>
      </div>

      <FeatureStatusBanner
        featureName="Distributed Runtime Config & Feature Flag Propagation"
        description="Remote cluster config propagation and live maintenance-mode circuit breakers are currently in development. Controls update local preview state only."
      />

      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
          <h2 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider font-mono pb-2 border-b border-black/[0.06]">
            Queue Dispatch &amp; Quality Flags
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block text-zinc-600 mb-1">Gold Standard Injection Rate (%)</label>
              <input
                type="number"
                value={goldInjectionRate}
                onChange={(e) => setGoldInjectionRate(e.target.value)}
                className="w-full bg-zinc-50 border border-black/[0.09] rounded-xl px-3 py-2 text-zinc-950 focus:outline-hidden focus:border-zinc-950"
              />
            </div>
            <div>
              <label className="block text-zinc-600 mb-1">Task Lock Lease Timeout (Minutes)</label>
              <input
                type="number"
                defaultValue={30}
                className="w-full bg-zinc-50 border border-black/[0.09] rounded-xl px-3 py-2 text-zinc-950 focus:outline-hidden focus:border-zinc-950"
              />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
          <h2 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider font-mono pb-2 border-b border-black/[0.06]">
            Platform Maintenance Switch
          </h2>
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 border border-black/[0.06] text-xs gap-4">
            <div>
              <span className="font-semibold text-zinc-950 block">Platform Maintenance Mode</span>
              <span className="text-zinc-500 text-[11px]">Temporarily pauses task dispatch while maintaining read-only portal access</span>
            </div>
            <button
              type="button"
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold cursor-pointer ${
                maintenanceMode
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-zinc-200 text-zinc-700'
              }`}
            >
              {maintenanceMode ? 'ENABLED (PAUSED)' : 'DISABLED (NORMAL)'}
            </button>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saved ? 'Saved to Local Preview (In Dev)' : 'Apply Global Settings'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
