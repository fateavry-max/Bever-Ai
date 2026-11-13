'use client';

import React, { useState, useMemo, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Cookie, Check, ArrowLeft } from 'lucide-react';

function subscribeCookies(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('bever-cookie-changed', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('bever-cookie-changed', callback);
  };
}

let cachedCookieSnapshot = '{"analytics":true,"functional":true}';
function getCookieSnapshot() {
  if (typeof window === 'undefined') return '{"analytics":true,"functional":true}';
  try {
    const raw = localStorage.getItem('bever-cookie-pref');
    if (raw && raw !== cachedCookieSnapshot) {
      cachedCookieSnapshot = raw;
    } else if (!raw) {
      cachedCookieSnapshot = '{"analytics":true,"functional":true}';
    }
    return cachedCookieSnapshot;
  } catch {
    return '{"analytics":true,"functional":true}';
  }
}

const getCookieServerSnapshot = () => '{"analytics":true,"functional":true}';

export default function CookiePreferencesPage() {
  const cookieRaw = useSyncExternalStore(subscribeCookies, getCookieSnapshot, getCookieServerSnapshot);
  const initialPrefs = useMemo(() => {
    try {
      const parsed = JSON.parse(cookieRaw);
      return {
        analytics: typeof parsed.analytics === 'boolean' ? parsed.analytics : true,
        functional: typeof parsed.functional === 'boolean' ? parsed.functional : true,
      };
    } catch {
      return { analytics: true, functional: true };
    }
  }, [cookieRaw]);

  const [analyticsOverride, setAnalyticsOverride] = useState<boolean | null>(null);
  const [functionalOverride, setFunctionalOverride] = useState<boolean | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);

  const analyticsCookies = analyticsOverride !== null ? analyticsOverride : initialPrefs.analytics;
  const functionalCookies = functionalOverride !== null ? functionalOverride : initialPrefs.functional;

  const handleSave = () => {
    try {
      localStorage.setItem(
        'bever-cookie-pref',
        JSON.stringify({ analytics: analyticsCookies, functional: functionalCookies })
      );
      window.dispatchEvent(new Event('bever-cookie-changed'));
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2500);
    } catch {}
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200">Cookie Preferences</span>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Cookie Preferences
              </h1>
              <span className="text-xs text-slate-400">Manage how cookies are stored on your device</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            Bever uses cookies and browser local storage to maintain session security, remember theme preferences, and analyze platform performance. You can customize your preferences below.
          </p>

          <div className="space-y-6 mb-8">
            {/* Essential */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Strictly Necessary Cookies</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase">Required</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Required for user authentication, security validation, and project queue claim persistence. Cannot be disabled.
                </p>
              </div>
              <input type="checkbox" checked disabled className="w-4 h-4 opacity-70" />
            </div>

            {/* Functional */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Functional & Preference Cookies</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Used to remember UI settings such as dark/light theme mode and saved project search filters.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={functionalCookies}
                  onChange={(e) => setFunctionalOverride(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Analytics */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Performance & Analytics Cookies</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Helps us understand platform navigation patterns and assessment completion speed to improve user experience.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={analyticsCookies}
                  onChange={(e) => setAnalyticsOverride(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            {savedNotice ? (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>Preferences saved successfully!</span>
              </span>
            ) : (
              <span />
            )}
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold hover:bg-indigo-600 transition-colors cursor-pointer shadow-xs"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
