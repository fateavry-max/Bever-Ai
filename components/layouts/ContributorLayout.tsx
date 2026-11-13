'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CheckSquare,
  Briefcase,
  Send,
  Zap,
  Award,
  ShieldCheck,
  DollarSign,
  CreditCard,
  Bell,
  User,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { BeverLogo } from '@/components/BeverLogo';

interface ContributorLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
  notReady?: boolean;
}

export function ContributorLayout({ children }: ContributorLayoutProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navGroups: { group: string; items: NavItem[] }[] = [
    {
      group: 'Workspace',
      items: [
        { label: 'Dashboard', href: '/contributor/dashboard', icon: LayoutDashboard },
        { label: 'African AI Tasks', href: '/contributor/tasks', icon: CheckSquare },
        { label: 'Active Projects', href: '/contributor/projects', icon: Briefcase },
        { label: 'Submissions', href: '/contributor/submissions', icon: Send },
      ],
    },
    {
      group: 'Qualifications',
      items: [
        { label: 'Skills Matrix', href: '/contributor/skills', icon: Zap },
        { label: 'Assessments', href: '/contributor/assessments', icon: Award, notReady: true },
        { label: 'Credentials & Badges', href: '/contributor/qualifications', icon: ShieldCheck, notReady: true },
        { label: 'Onboarding Checklist', href: '/contributor/onboarding', icon: Sparkles },
      ],
    },
    {
      group: 'Finances',
      items: [
        { label: 'Earnings Ledger', href: '/contributor/earnings', icon: DollarSign },
        { label: 'Withdrawals & Payouts', href: '/contributor/payouts', icon: CreditCard },
      ],
    },
    {
      group: 'Account',
      items: [
        { label: 'Notifications', href: '/contributor/notifications', icon: Bell, count: 3, notReady: true },
        { label: 'Contributor Profile', href: '/contributor/profile', icon: User },
        { label: 'Help & Disputes', href: '/contributor/support', icon: HelpCircle, notReady: true },
        { label: 'Account Settings', href: '/contributor/settings', icon: Settings, notReady: true },
      ],
    },
  ];

  return (
    <ProtectedRoute allowedRoles={['contributor', 'admin']} environmentTitle="Contributor Workstation">
      <div className="min-h-screen bg-[#FBFBFA] text-[#09090B] flex flex-col lg:flex-row font-sans">
        {/* ========================================================================= */}
        {/* CONTRIBUTOR DESKTOP SIDEBAR                                              */}
        {/* ========================================================================= */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-black/[0.06] shrink-0 select-none">
          {/* Brand header */}
          <div className="p-5 border-b border-black/[0.06]">
            <Link href="/contributor/dashboard" className="flex items-center justify-between gap-2">
              <BeverLogo variant="compact" subtitle="Contributor" />
            </Link>

            <div className="mt-3 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200/70 text-xs">
              <span className="text-zinc-800 font-medium">
                African AI Portal
              </span>
              <span className="font-mono text-zinc-500 text-[11px] tabular-nums">
                {user?.applicantId || 'BEV-98124'}
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
            {navGroups.map((group) => (
              <div key={group.group}>
                <div className="px-3 text-[11px] uppercase tracking-wider text-zinc-400 font-medium mb-1.5">
                  {group.group}
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-zinc-100 text-zinc-950 font-semibold'
                            : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-zinc-950' : 'text-zinc-400'}`} />
                          <span className="truncate">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.notReady && (
                            <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/80">
                              In Dev
                            </span>
                          )}
                          {item.count !== undefined && (
                            <span
                              className={`text-[11px] font-mono tabular-nums ${
                                isActive ? 'text-zinc-950 font-bold' : 'text-zinc-400'
                              }`}
                            >
                              {item.count}
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Sidebar user footer */}
          <div className="p-4 border-t border-black/[0.06] bg-[#FAFAFA]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white font-mono text-xs flex items-center justify-center font-medium shrink-0">
                  {user?.avatarInitials || 'AR'}
                </div>
                <div className="truncate">
                  <p className="text-xs font-medium text-zinc-950 truncate">{user?.name || 'Alex Rivera'}</p>
                  <p className="text-[11px] text-zinc-500 truncate">{user?.email || 'alex.rivera@bever.ai'}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-zinc-200/60 text-xs">
              <Link href="/" className="text-[11px] text-zinc-500 hover:text-zinc-950 transition-colors">
                Public Site
              </Link>
              <button
                onClick={logout}
                className="text-[11px] text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1 cursor-pointer font-medium"
              >
                <LogOut className="w-3 h-3" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* MAIN CONTRIBUTOR WORKSPACE                                               */}
        {/* ========================================================================= */}
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          {/* Topbar Navigation */}
          <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-black/[0.06] px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="lg:hidden p-2 text-zinc-600 hover:text-zinc-950 rounded-lg hover:bg-zinc-100 cursor-pointer"
                aria-label="Toggle Contributor Navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-500">Contributor Workspace</span>
                <span className="text-zinc-300">/</span>
                <span className="text-zinc-900 font-medium">Active Queue</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <Link
                href="/contributor/tasks"
                className="px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium transition-colors"
              >
                Browse AI Tasks
              </Link>

              <Link
                href="/contributor/payouts"
                className="hidden md:flex items-center gap-1.5 text-xs text-zinc-700 bg-white px-3 py-1.5 rounded-lg border border-zinc-200/80 hover:border-zinc-400 transition-colors"
              >
                <span className="text-zinc-400">Wallet &amp; Payouts</span>
              </Link>

              <button
                onClick={logout}
                className="px-2.5 py-1 text-xs text-zinc-500 hover:text-zinc-950 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </header>

          {/* Mobile slide-out drawer */}
          {mobileSidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex">
              <div className="w-72 bg-white border-r border-black/[0.08] p-5 flex flex-col justify-between h-full overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                    <BeverLogo variant="compact" subtitle="Contributor" />
                    <button
                      onClick={() => setMobileSidebarOpen(false)}
                      className="p-1 text-zinc-500 hover:text-zinc-950"
                      aria-label="Close Contributor Navigation"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <nav className="mt-4 space-y-4">
                    {navGroups.map((group) => (
                      <div key={group.group}>
                        <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-1">
                          {group.group}
                        </div>
                        <div className="space-y-0.5">
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setMobileSidebarOpen(false)}
                              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium ${
                                pathname === item.href
                                  ? 'bg-zinc-100 text-zinc-950 font-semibold'
                                  : 'text-zinc-600 hover:bg-zinc-50'
                              }`}
                            >
                              <span>{item.label}</span>
                              <div className="flex items-center gap-1.5">
                                {item.notReady && (
                                  <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/80">
                                    In Dev
                                  </span>
                                )}
                                {item.count !== undefined && (
                                  <span className="text-[11px] font-mono text-zinc-400 tabular-nums">
                                    {item.count}
                                  </span>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </nav>
                </div>
                <div className="pt-4 border-t border-zinc-200">
                  <button
                    onClick={() => {
                      logout();
                      setMobileSidebarOpen(false);
                    }}
                    className="w-full py-2 text-xs font-medium text-rose-600 border border-rose-200 rounded-lg text-center"
                  >
                    Log Out
                  </button>
                </div>
              </div>
              <div className="flex-1" onClick={() => setMobileSidebarOpen(false)} />
            </div>
          )}

          {/* Page contents */}
          <main className="p-4 sm:p-6 lg:p-8 grow">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
