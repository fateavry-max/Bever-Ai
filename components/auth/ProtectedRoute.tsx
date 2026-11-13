'use client';

import React, { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { ShieldAlert, Lock, ArrowRight } from 'lucide-react';
import { useAuth, UserRole } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  environmentTitle: string;
}

export function ProtectedRoute({ children, allowedRoles, environmentTitle }: ProtectedRouteProps) {
  const { isLoggedIn, role, user } = useAuth();
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#FBFBFA] flex flex-col items-center justify-center text-center p-6">
        <div className="w-8 h-8 border-2 border-zinc-300 border-t-zinc-950 rounded-full animate-spin mb-4" />
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
          Verifying {environmentTitle} Session...
        </p>
      </div>
    );
  }

  // Case 1: Unauthenticated
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FBFBFA] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-black/[0.08] rounded-2xl p-8 shadow-sm text-center">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-black/[0.06] flex items-center justify-center mx-auto mb-5 text-zinc-800">
            <Lock className="w-6 h-6" />
          </div>

          <span className="text-[11px] font-mono font-medium text-zinc-500 uppercase tracking-wider block mb-1.5">
            {environmentTitle} Access Restricted
          </span>
          <h1 className="text-2xl font-semibold tracking-tight text-[#09090B] mb-2">
            Authentication Required
          </h1>
          <p className="text-xs text-zinc-500 leading-relaxed mb-6">
            Access to this environment is strictly partitioned and restricted to authorized {allowedRoles.join(' or ')} accounts.
          </p>

          <div className="space-y-3">
            <Link
              href="/login"
              className="w-full py-2.5 px-4 bg-[#09090B] hover:bg-zinc-800 text-white font-medium text-xs rounded-full transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Sign In to Your Account</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/register"
              className="w-full py-2.5 px-4 bg-white hover:bg-zinc-50 border border-black/[0.08] text-zinc-800 font-medium text-xs rounded-full transition-all flex items-center justify-center"
            >
              <span>Create an Account</span>
            </Link>

            <Link
              href="/"
              className="block pt-2 text-[11px] text-zinc-500 hover:text-zinc-950 transition-colors"
            >
              ← Return to Bever Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: Authenticated but unauthorized role
  if (role && !allowedRoles.includes(role)) {
    const userDestination =
      role === 'contributor'
        ? '/contributor/dashboard'
        : role === 'business'
        ? '/business/dashboard'
        : '/admin/dashboard';

    return (
      <div className="min-h-screen bg-[#FBFBFA] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-amber-200 rounded-2xl p-8 text-center shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-5 text-amber-600">
            <ShieldAlert className="w-6 h-6" />
          </div>

          <span className="text-[11px] font-mono font-medium text-amber-700 uppercase tracking-wider block mb-1.5">
            Role Segmentation Enforcement
          </span>
          <h1 className="text-2xl font-semibold tracking-tight text-[#09090B] mb-2">
            Access Denied
          </h1>
          <p className="text-xs text-zinc-500 leading-relaxed mb-6">
            You are logged in as <strong className="text-zinc-950 capitalize">{role}</strong> ({user?.email}). This section is partitioned and only accessible by <strong className="text-zinc-950">{allowedRoles.join(' / ')}</strong> accounts.
          </p>

          <div className="space-y-3">
            <Link
              href={userDestination}
              className="w-full py-2.5 px-4 bg-[#09090B] hover:bg-zinc-800 text-white font-medium text-xs rounded-full transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Return to My Authorized Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/login"
              className="w-full py-2.5 px-4 bg-white hover:bg-zinc-50 border border-black/[0.08] text-zinc-700 font-medium text-xs rounded-full transition-all flex items-center justify-center"
            >
              <span>Switch or Log Into Another Account</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Case 3: Authorized
  return <>{children}</>;
}
