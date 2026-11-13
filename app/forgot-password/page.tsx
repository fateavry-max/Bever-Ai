'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AuthLayout } from '@/components/layouts/AuthLayout';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [dispatched, setDispatched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDispatched(true);
  };

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter your account email to receive a secure recovery link."
    >
      {dispatched ? (
        <div className="text-center py-6">
          <div className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-950 flex items-center justify-center mx-auto mb-4 border border-zinc-200">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-base font-semibold text-zinc-950 mb-2 font-display">Recovery Email Sent</h3>
          <p className="text-xs text-zinc-500 leading-relaxed mb-6">
            We have sent a secure password reset link to <strong className="text-zinc-950">{email}</strong>. Please check your inbox.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-950 hover:underline"
          >
            <span>Return to Login</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1.5">Registered Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-zinc-50/70 border border-zinc-200 text-xs text-zinc-950 placeholder-zinc-400 focus:bg-white focus:outline-hidden focus:border-zinc-900 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Send Recovery Instructions</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center pt-2">
            <Link href="/login" className="text-xs text-zinc-500 hover:text-zinc-950 transition-colors">
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
