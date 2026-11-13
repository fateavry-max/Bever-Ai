'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sliders,
  Users,
  Building2,
  FolderTree,
  CheckCircle2,
  Scale,
  Award,
  BadgeCheck,
  CircleDollarSign,
  Receipt,
  FileCheck2,
  Activity,
  History,
  UserCog,
  Settings,
  LogOut,
  Menu,
  X,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { BeverLogo } from '@/components/BeverLogo';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
  notReady?: boolean;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navGroups: { group: string; items: NavItem[] }[] = [
    {
      group: 'Core Operations',
      items: [
        { label: 'Mission Control', href: '/admin/dashboard', icon: Activity },
        { label: 'Global Projects', href: '/admin/projects', icon: FolderTree, count: 14 },
        { label: 'Tasks & Datasets', href: '/admin/tasks', icon: Sliders },
        { label: 'Submission Reviews', href: '/admin/reviews', icon: CheckCircle2 },
        { label: 'Contributor Disputes', href: '/admin/disputes', icon: Scale, notReady: true },
      ],
    },
    {
      group: 'Directory & RBAC',
      items: [
        { label: 'Contributor Pool', href: '/admin/contributors', icon: Users },
        { label: 'Enterprise Clients', href: '/admin/clients', icon: Building2, notReady: true },
        { label: 'Staff Roles & Perms', href: '/admin/roles', icon: UserCog, notReady: true },
      ],
    },
    {
      group: 'Benchmarks & Rubrics',
      items: [
        { label: 'Skill Assessments', href: '/admin/assessments', icon: Award, notReady: true },
        { label: 'Qualifications & Badges', href: '/admin/qualifications', icon: BadgeCheck, notReady: true },
      ],
    },
    {
      group: 'Financial Ledger',
      items: [
        { label: 'Platform Finance', href: '/admin/finance', icon: CircleDollarSign, notReady: true },
        { label: 'Payouts & Withdrawals', href: '/admin/payouts', icon: FileCheck2 },
        { label: 'Client Invoices', href: '/admin/invoices', icon: Receipt, notReady: true },
      ],
    },
    {
      group: 'System & Security',
      items: [
        { label: 'Platform Analytics', href: '/admin/analytics', icon: TrendingUp, notReady: true },
        { label: 'Security Audit Logs', href: '/admin/audit-logs', icon: History, notReady: true },
        { label: 'Escalations Support', href: '/admin/support', icon: AlertTriangle, notReady: true },
        { label: 'Global Settings', href: '/admin/settings', icon: Settings, notReady: true },
      ],
    },
  ];

  return (
    <ProtectedRoute allowedRoles={['admin']} environmentTitle="Bever Administration Mission Control">
      <div className="min-h-screen bg-[#FBFBFA] text-[#09090B] flex flex-col lg:flex-row font-sans">
        {/* ========================================================================= */}
        {/* ADMIN DESKTOP SIDEBAR                                                    */}
        {/* ========================================================================= */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-black/[0.06] shrink-0 select-none">
          {/* Brand header */}
          <div className="p-5 border-b border-black/[0.06]">
            <Link href="/admin/dashboard" className="flex items-center justify-between gap-2">
              <BeverLogo variant="compact" subtitle="Admin" />
              <span className="text-[10px] font-mono text-zinc-400 shrink-0">
                HQ-OPS
              </span>
            </Link>

            <div className="mt-3 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200/70 text-xs">
              <span className="text-zinc-800 font-medium">
                African AI Governance
              </span>
              <span className="font-mono text-zinc-500 text-[11px] tabular-nums">L4 RBAC</span>
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
                  {user?.avatarInitials || 'EV'}
                </div>
                <div className="truncate">
                  <p className="text-xs font-medium text-zinc-950 truncate">{user?.name || 'Elena Vance'}</p>
                  <p className="text-[11px] text-zinc-500 truncate">Staff ID: STAFF-HQ</p>
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
        {/* MAIN ADMIN WORKSPACE                                                     */}
        {/* ========================================================================= */}
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          {/* Topbar Navigation */}
          <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-black/[0.06] px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="lg:hidden p-2 text-zinc-600 hover:text-zinc-950 rounded-lg hover:bg-zinc-100 cursor-pointer"
                aria-label="Toggle Admin Navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-500">Security Clearance:</span>
                <span className="text-zinc-900 font-mono font-medium">
                  Level 4 (Super-Admin)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <Link
                href="/admin/tasks"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-white bg-zinc-950 hover:bg-zinc-800 px-3 py-1.5 rounded-lg transition-colors"
              >
                Publish Task
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
                    <BeverLogo variant="compact" subtitle="Admin" />
                    <button
                      onClick={() => setMobileSidebarOpen(false)}
                      className="p-1 text-zinc-500 hover:text-zinc-950"
                      aria-label="Close Admin Navigation"
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
