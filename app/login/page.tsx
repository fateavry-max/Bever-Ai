'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Mail, Key } from 'lucide-react';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { GoogleSignButton } from '@/components/GoogleSignButton';
import { useAuth, UserRole } from '@/context/AuthContext';
import { authenticateWithGoogle } from '@/lib/firebase';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect');
  const typeParam = searchParams.get('type') as UserRole | null;

  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(typeParam || 'contributor');
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    if (selectedRole === 'admin') {
      setErrorNotice('Administrative staff accounts require authorized staff credentials.');
      return;
    }
    setErrorNotice(null);
    setGoogleLoading(true);
    try {
      const result = await authenticateWithGoogle({ role: selectedRole });
      login(
        result.email,
        result.role,
        result.displayName,
        `BEV-${result.firebaseUser.uid.slice(0, 5).toUpperCase()}`,
        result.orgName
      );
      if (redirectTarget) {
        router.push(redirectTarget);
      } else if (result.role === 'business') {
        router.push('/business/dashboard');
      } else {
        router.push('/contributor/dashboard');
      }
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || '';
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setErrorNotice('Google sign-in window was closed before completing.');
      } else if (code === 'auth/popup-blocked') {
        setErrorNotice('Browser blocked the Google sign-in popup. Please allow popups and try again.');
      } else {
        setErrorNotice('Unable to sign in with Google. Please try again.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorNotice('Please provide a valid email address.');
      return;
    }
    if (!password.trim() || password.length < 6) {
      setErrorNotice('Password must be at least 6 characters.');
      return;
    }

    login(email.trim(), selectedRole);

    if (redirectTarget) {
      router.push(redirectTarget);
    } else if (selectedRole === 'admin') {
      router.push('/admin/dashboard');
    } else if (selectedRole === 'business') {
      router.push('/business/dashboard');
    } else {
      router.push('/contributor/dashboard');
    }
  };

  return (
    <AuthLayout
      title="Welcome to Bever"
      subtitle="Sign in to your partitioned environment to access your workspace."
    >
      {/* Role Selection Tabs */}
      <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-zinc-100 mb-6 text-xs font-medium">
        <button
          type="button"
          onClick={() => setSelectedRole('contributor')}
          className={`py-2 rounded-lg transition-all cursor-pointer ${
            selectedRole === 'contributor'
              ? 'bg-white text-zinc-950 shadow-xs font-semibold'
              : 'text-zinc-600 hover:text-zinc-950'
          }`}
        >
          Contributor
        </button>
        <button
          type="button"
          onClick={() => setSelectedRole('business')}
          className={`py-2 rounded-lg transition-all cursor-pointer ${
            selectedRole === 'business'
              ? 'bg-white text-zinc-950 shadow-xs font-semibold'
              : 'text-zinc-600 hover:text-zinc-950'
          }`}
        >
          Business
        </button>
        <button
          type="button"
          onClick={() => setSelectedRole('admin')}
          className={`py-2 rounded-lg transition-all cursor-pointer ${
            selectedRole === 'admin'
              ? 'bg-white text-zinc-950 shadow-xs font-semibold'
              : 'text-zinc-600 hover:text-zinc-950'
          }`}
        >
          Admin
        </button>
      </div>

      {errorNotice && (
        <div
          role="alert"
          className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs"
        >
          {errorNotice}
        </div>
      )}

      {selectedRole !== 'admin' && (
        <>
          <div className="mb-4">
            <GoogleSignButton
              label={`Sign in with Google`}
              loading={googleLoading}
              onClick={handleGoogleSignIn}
            />
          </div>

          <div className="relative flex items-center justify-center mb-4">
            <div className="border-t border-zinc-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-mono uppercase tracking-wider text-zinc-400 shrink-0">
              Or sign in with email
            </span>
            <div className="border-t border-zinc-200 w-full" />
          </div>
        </>
      )}

      {/* Form */}
      <form onSubmit={handleCustomLogin} className="space-y-4 mb-4">
        <div>
          <label htmlFor="login-email" className="block text-xs font-medium text-zinc-700 mb-1.5">
            {selectedRole === 'business'
              ? 'Work / Corporate Email'
              : selectedRole === 'admin'
              ? 'Authorized Staff Email'
              : 'Registered Contributor Email'}
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                selectedRole === 'business'
                  ? 'partner@enterprise.com'
                  : selectedRole === 'admin'
                  ? 'staff@bever.ai'
                  : 'contributor@bever.ai'
              }
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-zinc-50/70 border border-zinc-200 text-xs text-zinc-950 placeholder-zinc-400 focus:bg-white focus:outline-hidden focus:border-zinc-900 transition-colors"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="login-password" className="block text-xs font-medium text-zinc-700">Password</label>
            <Link
              href="/forgot-password"
              className="text-[11px] text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Key className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="login-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-zinc-50/70 border border-zinc-200 text-xs text-zinc-950 placeholder-zinc-400 focus:bg-white focus:outline-hidden focus:border-zinc-900 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Sign In as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-zinc-100 text-center text-xs text-zinc-500">
        Don&apos;t have an account yet?{' '}
        <Link href="/register" className="text-zinc-950 font-medium hover:underline">
          Register here
        </Link>
      </div>
    </AuthLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBFBFA]" />}>
      <LoginForm />
    </Suspense>
  );
}
