'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, Github, Twitter, Linkedin } from 'lucide-react';
import { BeverLogo } from '@/components/BeverLogo';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand info */}
          <div className="col-span-2">
            <Link href="/" className="mb-4 inline-block">
              <BeverLogo variant="footer" />
            </Link>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mb-4">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Human Intelligence. Better AI.</span>
              <br />
              Bever connects talented people around the world with opportunities to train, evaluate and improve artificial intelligence systems.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors"
                aria-label="Bever on Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors"
                aria-label="Bever on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors"
                aria-label="Bever on GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Opportunities Column */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
              Opportunities
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/opportunities?category=Coding+and+Software+Engineering"
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  Software Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="/opportunities?category=Writing+and+Editing"
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  Writing & Editorial
                </Link>
              </li>
              <li>
                <Link
                  href="/opportunities?category=Mathematics"
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  Advanced Mathematics
                </Link>
              </li>
              <li>
                <Link
                  href="/opportunities?category=Language+and+Translation"
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  Language & Translation
                </Link>
              </li>
              <li>
                <Link
                  href="/opportunities?category=Data+Annotation"
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  Data Annotation
                </Link>
              </li>
              <li>
                <Link
                  href="/opportunities"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                >
                  View All 10 Tracks →
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/how-it-works" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/for-experts" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  For Experts
                </Link>
              </li>
              <li>
                <Link href="/for-businesses" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  For Businesses
                </Link>
              </li>
              <li>
                <Link href="/quality" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Trust & Quality
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Help & FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
              Company & Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  About Bever
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Join as Contributor
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Contributor Login
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Cookie Preferences
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Compliance & Ethics Disclaimer */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-2">
          <p>
            <strong className="text-slate-700 dark:text-slate-300">Benchmark Notice:</strong> BEVER is an AI training and evaluation platform built for global human intelligence workflows. Opportunity listings, compensation ranges, and performance metrics shown on this website represent active project tracks and benchmark compensation rates based on qualification status, task difficulty, and verified quality scores. Bever does not guarantee specific earnings or project volume without passing domain qualification assessments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <p>© 2026 BEVER AI Technologies Inc. All rights reserved.</p>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <Globe className="w-3.5 h-3.5 text-indigo-500" />
                Global Platform (85+ Countries Supported)
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
