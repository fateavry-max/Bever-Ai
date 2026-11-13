'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ArrowRight,
  Globe,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { BeverLogo } from '@/components/BeverLogo';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const pathname = usePathname();
  const { isLoggedIn, role, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Platform', href: '/' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'AI Training', href: '/services' },
    { label: 'For Contributors', href: '/contributors' },
    { label: 'For Businesses', href: '/business' },
    { label: 'Resources', href: '/faq' },
  ];

  const getDashboardHref = () => {
    if (role === 'admin') return '/admin/dashboard';
    if (role === 'business') return '/business/dashboard';
    return '/contributor/dashboard';
  };

  return (
    <div className="min-h-screen bg-white text-[#09090B] flex flex-col font-sans selection:bg-zinc-950 selection:text-white">
      {/* ========================================================================= */}
      {/* PUBLIC HEADER NAVIGATION (Auralis 3-Zone Contract)                        */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/[0.06]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-8">
            {/* Zone 1: Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group shrink-0 focus:outline-hidden"
            >
              <BeverLogo variant="compact" />
            </Link>

            {/* Zone 2: Navigation links */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-zinc-600">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors whitespace-nowrap py-1 relative ${
                      isActive
                        ? 'text-zinc-950 font-semibold'
                        : 'hover:text-zinc-950'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-zinc-950 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Zone 3: Primary Actions */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-zinc-500 hidden md:inline">
                    {user?.name}
                  </span>
                  <Link
                    href={getDashboardHref()}
                    className="px-4 py-2 text-xs font-medium bg-zinc-950 hover:bg-zinc-800 text-white rounded-full transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <span>Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={logout}
                    className="px-2.5 py-1.5 text-xs text-zinc-500 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-3.5 py-2 text-xs font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 text-xs font-medium text-white bg-zinc-950 hover:bg-zinc-800 rounded-full transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <span>Join Bever</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-zinc-600 hover:text-zinc-950 rounded-lg hover:bg-zinc-100 focus:outline-hidden cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-zinc-950" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-black/[0.06] px-6 py-6 shadow-xl animate-in slide-in-from-top-3 duration-200">
            <div className="flex flex-col gap-3 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 border-b border-zinc-100 ${
                      isActive ? 'text-zinc-950 font-semibold' : 'text-zinc-600 hover:text-zinc-950'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-4 flex flex-col gap-3">
                {isLoggedIn ? (
                  <>
                    <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs flex items-center justify-between text-zinc-700">
                      <span>{user?.name} ({role})</span>
                      <span className="font-mono text-[10px] bg-zinc-200 px-2 py-0.5 rounded text-zinc-800">
                        {user?.applicantId || 'BEV-USER'}
                      </span>
                    </div>
                    <Link
                      href={getDashboardHref()}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 text-center text-xs font-medium text-white bg-zinc-950 rounded-full shadow-xs"
                    >
                      Open Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-2 text-center text-xs text-rose-600 hover:text-rose-700 border border-zinc-200 rounded-full cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 text-center text-xs font-medium text-zinc-800 border border-zinc-200 rounded-full hover:bg-zinc-50"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 text-center text-xs font-medium text-white bg-zinc-950 rounded-full shadow-xs"
                    >
                      Join Bever
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="grow">{children}</main>

      {/* ========================================================================= */}
      {/* PUBLIC FOOTER (Minimalist Transparent Auralis Style)                      */}
      {/* ========================================================================= */}
      <footer className="bg-[#FBFBFA] border-t border-black/[0.06] pt-20 pb-12 text-zinc-600 text-xs">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            {/* Col 1: Brand & Positioning */}
            <div className="col-span-2">
              <Link href="/" className="inline-block mb-4">
                <BeverLogo variant="footer" />
              </Link>
              <p className="text-zinc-950 font-medium text-xs mb-2">Human Intelligence. Better AI. · Train AI. Represent Africa.</p>
              <p className="text-zinc-500 text-xs leading-relaxed max-w-sm mb-5">
                Bever connects talented contributors and enterprise AI organizations worldwide to train, evaluate, and calibrate artificial intelligence models through verifiable human feedback.
              </p>
              <div className="flex items-center gap-2 text-zinc-500 font-mono text-[11px]">
                <Globe className="w-3.5 h-3.5 text-zinc-400" />
                <span>Global Contributor Network in 85+ Countries</span>
              </div>
            </div>

            {/* Col 2: Platform */}
            <div>
              <h4 className="text-zinc-950 font-semibold text-xs tracking-wider uppercase mb-3 text-[11px]">
                Platform
              </h4>
              <ul className="space-y-2.5 text-xs text-zinc-500">
                <li><Link href="/services" className="hover:text-zinc-950 transition-colors">AI Model Evaluation</Link></li>
                <li><Link href="/services" className="hover:text-zinc-950 transition-colors">Human Feedback & RLHF</Link></li>
                <li><Link href="/how-it-works" className="hover:text-zinc-950 transition-colors">How Bever Works</Link></li>
                <li><Link href="/security" className="hover:text-zinc-950 transition-colors">Trust & Security</Link></li>
                <li><Link href="/faq" className="hover:text-zinc-950 transition-colors">Knowledge Base & FAQ</Link></li>
              </ul>
            </div>

            {/* Col 3: Solutions */}
            <div>
              <h4 className="text-zinc-950 font-semibold text-xs tracking-wider uppercase mb-3 text-[11px]">
                Solutions
              </h4>
              <ul className="space-y-2.5 text-xs text-zinc-500">
                <li><Link href="/contributors" className="hover:text-zinc-950 transition-colors">For Contributors</Link></li>
                <li><Link href="/business" className="hover:text-zinc-950 transition-colors">For Enterprise AI Teams</Link></li>
                <li><Link href="/careers" className="hover:text-zinc-950 transition-colors">Careers at Bever</Link></li>
                <li><Link href="/contact" className="hover:text-zinc-950 transition-colors">Contact Our Team</Link></li>
              </ul>
            </div>

            {/* Col 4: Portals */}
            <div>
              <h4 className="text-zinc-950 font-semibold text-xs tracking-wider uppercase mb-3 text-[11px]">
                Access Portals
              </h4>
              <ul className="space-y-2.5 text-xs text-zinc-500">
                <li><Link href="/login" className="hover:text-zinc-950 transition-colors">Contributor Sign In</Link></li>
                <li><Link href="/login?type=business" className="hover:text-zinc-950 transition-colors">Business Client Portal</Link></li>
                <li><Link href="/login?type=admin" className="hover:text-zinc-950 transition-colors">Administration Mission Control</Link></li>
                <li><Link href="/register" className="hover:text-zinc-950 transition-colors">Apply as Contributor</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
            <p>© 2026 BEVER AI Technologies Inc. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              <span>Strict Application Segmentation</span>
              <span>·</span>
              <span>ISO 27001 & SOC 2 Type II Certified Pipeline</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
