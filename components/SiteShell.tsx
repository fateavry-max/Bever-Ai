'use client';

import React from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContributorDashboardBanner } from '@/components/ContributorDashboardBanner';

function ShellInner({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, userEmail, applicantId, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Navbar
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLogout={logout}
      />

      {isLoggedIn && (
        <div className="pt-16">
          <ContributorDashboardBanner
            userEmail={userEmail || ''}
            applicantId={applicantId || 'BEV-78491'}
            onLogout={logout}
          />
        </div>
      )}

      <main className={`grow ${isLoggedIn ? 'pt-4' : 'pt-16'}`}>
        {children}
      </main>

      <Footer />
    </div>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ShellInner>{children}</ShellInner>
    </AuthProvider>
  );
}
