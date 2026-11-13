'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';
import { AuthLayout } from '@/components/layouts/AuthLayout';

export default function VerifyEmailPage() {
  const [resending, setResending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setNotice('A fresh verification token has been dispatched.');
    }, 800);
  };

  return (
    <AuthLayout
      title="Verify Your Email Address"
      subtitle="Confirm your identity to unlock task queues and project allocations."
    >
      <div className="text-center py-4">
        <div className="w-14 h-14 rounded-2xl bg-zinc-100 border border-zinc-200 text-zinc-950 flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-zinc-800" />
        </div>

        <p className="text-xs text-zinc-500 leading-relaxed mb-6">
          We have dispatched a verification email containing your 6-digit confirmation pin to your registered address.
        </p>

        {notice && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
            {notice}
          </div>
        )}

        <div className="space-y-2">
          <Link
            href="/login"
            className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Login</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="w-full py-2.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border border-zinc-200/80 text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
            <span>{resending ? 'Sending...' : 'Resend Verification Email'}</span>
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
