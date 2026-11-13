'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Key, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AuthLayout } from '@/components/layouts/AuthLayout';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setSuccess(true);
  };

  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Ensure your new password meets platform cryptographic complexity requirements."
    >
      {success ? (
        <div className="text-center py-6">
          <div className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-950 flex items-center justify-center mx-auto mb-4 border border-zinc-200">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-base font-semibold text-zinc-950 mb-2 font-display">Password Successfully Updated</h3>
          <p className="text-xs text-zinc-500 mb-6">
            Your credentials have been updated securely. You may now sign in to your workspace.
          </p>
          <Link
            href="/login"
            className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1.5">New Password</label>
            <div className="relative">
              <Key className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-zinc-50/70 border border-zinc-200 text-xs text-zinc-950 placeholder-zinc-400 focus:bg-white focus:outline-hidden focus:border-zinc-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1.5">Confirm New Password</label>
            <div className="relative">
              <Key className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-zinc-50/70 border border-zinc-200 text-xs text-zinc-950 placeholder-zinc-400 focus:bg-white focus:outline-hidden focus:border-zinc-900"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Update Password</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
