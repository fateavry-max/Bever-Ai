'use client';

import React from 'react';
import { FeatureStatusBanner } from '@/components/FeatureStatusBanner';

export default function AdminRolesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80">
              Role-Based Access
            </span>
            <span className="text-xs text-zinc-400">·</span>
            <span className="text-xs text-zinc-500 font-mono">Internal RBAC Policies</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            Internal Staff Roles &amp; RBAC Permissions
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Admin accounts must be provisioned securely by authorized staff. Configure granular permissions for reviewers and compliance officers.
          </p>
        </div>
      </div>

      <FeatureStatusBanner
        featureName="Staff Provisioning & Custom IAM Role Editor"
        description="Dynamic RBAC policy editing and hardware-key MFA enrollment enforcement are currently in development."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-zinc-950">Super-Admin (Level 4)</span>
            <span className="text-[10px] font-mono text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded font-semibold">
              Full Platform Control
            </span>
          </div>
          <p className="text-xs text-zinc-500 mb-3">
            Treasury disbursement releases, client contract modification, audit log exports, and internal staff provisioning.
          </p>
          <span className="text-xs font-mono text-zinc-600">Provisioning: Authorized Staff Only</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-zinc-950">Quality Reviewer (Level 2)</span>
            <span className="text-[10px] font-mono text-zinc-600 bg-zinc-100 border border-black/[0.06] px-2 py-0.5 rounded">
              Auditing Only
            </span>
          </div>
          <p className="text-xs text-zinc-500 mb-3">
            Inspect evaluator justifications, score consensus calibrations, and arbitrate flagged rubric deductions.
          </p>
          <span className="text-xs font-mono text-zinc-600">Scope: Read/Audit Queues</span>
        </div>
      </div>
    </div>
  );
}
