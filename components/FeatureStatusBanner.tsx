'use client';

import React from 'react';
import { Construction } from 'lucide-react';

interface FeatureStatusBannerProps {
  featureName: string;
  description?: string;
  statusLabel?: string;
}

export function FeatureStatusBanner({
  featureName,
  description = 'This module is currently in development and not connected to live production services yet.',
  statusLabel = 'Not Ready Yet · In Development',
}: FeatureStatusBannerProps) {
  return (
    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-3">
      <Construction className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
      <div className="space-y-0.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-amber-950">{featureName}</span>
          <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
            {statusLabel}
          </span>
        </div>
        <p className="text-amber-800/90 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
