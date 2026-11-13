'use client';

import React, { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { BeverLogo } from '@/components/BeverLogo';

function subscribeTheme(callback: () => void) {
  if (typeof document === 'undefined') return () => {};
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}

function getDarkSnapshot() {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

const getDarkServerSnapshot = () => false;

function subscribeScroll(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('scroll', callback, { passive: true });
  return () => window.removeEventListener('scroll', callback);
}

function getScrollSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.scrollY > 20;
}

const getScrollServerSnapshot = () => false;

interface NavbarProps {
  onOpenJoinModal?: (initialRole?: string) => void;
  onOpenLoginModal?: () => void;
  isLoggedIn?: boolean;
  userEmail?: string | null;
  onLogout?: () => void;
}

export function Navbar({
  onOpenJoinModal,
  onOpenLoginModal,
  isLoggedIn: propLoggedIn,
  userEmail: propUserEmail,
  onLogout: propLogout,
}: NavbarProps) {
  const pathname = usePathname();
  const auth = useAuth();

  const isLoggedIn = propLoggedIn !== undefined ? propLoggedIn : auth.isLoggedIn;
  const userEmail = propUserEmail !== undefined ? propUserEmail : auth.userEmail;
  const onLogout = propLogout || auth.logout;

  const isDark = useSyncExternalStore(subscribeTheme, getDarkSnapshot, getDarkServerSnapshot);
  const isScrolled = useSyncExternalStore(subscribeScroll, getScrollSnapshot, getScrollServerSnapshot);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    if (typeof document === 'undefined') return;
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    if (isCurrentlyDark) {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('bever-theme', 'light');
      } catch {}
    } else {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('bever-theme', 'dark');
      } catch {}
    }
  };

  const navLinks = [
    { label: 'Find Opportunities', href: '/opportunities' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'For Experts', href: '/for-experts' },
    { label: 'For Businesses', href: '/for-businesses' },
    { label: 'About Bever', href: '/about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl shadow-xs border-b border-slate-200/80 dark:border-slate-800/80 py-3'
          : 'bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-b border-slate-200/40 dark:border-slate-800/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Zone 1: Brand Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group focus:outline-hidden"
          >
            <BeverLogo variant="compact" />
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300 font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
                  title="View Contributor Profile & Payouts"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="truncate max-w-[120px]">{userEmail || 'Active Contributor'}</span>
                </Link>
                <Link
                  href="/profile"
                  className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap"
                >
                  My Profile
                </Link>
                <button
                  onClick={onLogout}
                  className="px-2.5 py-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                {onOpenLoginModal ? (
                  <button
                    onClick={onOpenLoginModal}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Log In
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors whitespace-nowrap"
                  >
                    Log In
                  </Link>
                )}

                {onOpenJoinModal ? (
                  <button
                    onClick={() => onOpenJoinModal()}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xs hover:shadow-md flex items-center gap-1.5 whitespace-nowrap group cursor-pointer"
                  >
                    <span>Join Bever</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ) : (
                  <Link
                    href="/apply"
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xs hover:shadow-md flex items-center gap-1.5 whitespace-nowrap group"
                  >
                    <span>Join Bever</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-hidden cursor-pointer"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-down Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3 text-base font-medium text-slate-800 dark:text-slate-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 border-b border-slate-100 dark:border-slate-800/50 ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-3 flex flex-col gap-3">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-sm flex items-center justify-between border border-emerald-200 dark:border-emerald-800/60"
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>{userEmail}</span>
                    </div>
                    <span className="text-xs font-semibold underline">View Profile</span>
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 text-center text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-xs"
                  >
                    My Contributor Dashboard & Payouts
                  </Link>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 text-center text-sm font-semibold text-rose-600 border border-rose-200 dark:border-rose-900 rounded-lg cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  {onOpenLoginModal ? (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenLoginModal();
                      }}
                      className="w-full py-2.5 text-center text-sm font-semibold text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer"
                    >
                      Log In
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 text-center text-sm font-semibold text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 rounded-lg block"
                    >
                      Log In
                    </Link>
                  )}

                  {onOpenJoinModal ? (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenJoinModal();
                      }}
                      className="w-full py-2.5 text-center text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-lg shadow-sm cursor-pointer"
                    >
                      Join Bever
                    </button>
                  ) : (
                    <Link
                      href="/apply"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 text-center text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-lg shadow-sm block"
                    >
                      Join Bever
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
