'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Building2, User } from 'lucide-react';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { GoogleSignButton } from '@/components/GoogleSignButton';
import { useAuth } from '@/context/AuthContext';
import { authenticateWithGoogle } from '@/lib/firebase';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [accountType, setAccountType] = useState<'contributor' | 'business'>('contributor');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [domainInterest, setDomainInterest] = useState('African Languages');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleGoogleSignup = async () => {
    setAuthError(null);
    setGoogleLoading(true);
    try {
      const result = await authenticateWithGoogle({
        role: accountType,
        orgName: accountType === 'business' ? orgName.trim() || undefined : undefined,
        domainInterest: accountType === 'contributor' ? domainInterest : undefined,
      });

      login(
        result.email,
        result.role,
        result.displayName,
        `BEV-${result.firebaseUser.uid.slice(0, 5).toUpperCase()}`,
        result.orgName
      );

      if (result.role === 'business') {
        router.push('/business/dashboard');
      } else {
        router.push(result.isNewAccount ? '/contributor/onboarding' : '/contributor/dashboard');
      }
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || '';
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setAuthError('Google sign-up window was closed before completing.');
      } else if (code === 'auth/popup-blocked') {
        setAuthError('Browser blocked the Google sign-up popup. Please allow popups and try again.');
      } else {
        setAuthError('Unable to complete Google sign-up. Please try again.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (accountType === 'contributor') {
      login(email, 'contributor', name);
      router.push('/contributor/onboarding');
    } else {
      login(email, 'business', name, undefined, orgName || 'Enterprise Corp');
      router.push('/business/dashboard');
    }
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Select your account type to register for the appropriate workspace."
    >
      {/* Account Type Toggle */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        <button
          type="button"
          onClick={() => setAccountType('contributor')}
          className={`p-3 rounded-xl border flex flex-col items-center text-center transition-all cursor-pointer ${
            accountType === 'contributor'
              ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
              : 'bg-zinc-50 border-zinc-200/80 text-zinc-600 hover:border-zinc-300'
          }`}
        >
          <User className={`w-5 h-5 mb-1.5 ${accountType === 'contributor' ? 'text-white' : 'text-zinc-400'}`} />
          <span className="text-xs font-semibold block">Contributor</span>
          <span className={`text-[10px] ${accountType === 'contributor' ? 'text-zinc-300' : 'text-zinc-500'}`}>Train &amp; evaluate AI</span>
        </button>

        <button
          type="button"
          onClick={() => setAccountType('business')}
          className={`p-3 rounded-xl border flex flex-col items-center text-center transition-all cursor-pointer ${
            accountType === 'business'
              ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
              : 'bg-zinc-50 border-zinc-200/80 text-zinc-600 hover:border-zinc-300'
          }`}
        >
          <Building2 className={`w-5 h-5 mb-1.5 ${accountType === 'business' ? 'text-white' : 'text-zinc-400'}`} />
          <span className="text-xs font-semibold block">Business Client</span>
          <span className={`text-[10px] ${accountType === 'business' ? 'text-zinc-300' : 'text-zinc-500'}`}>Commission datasets</span>
        </button>
      </div>

      {authError && (
        <div
          role="alert"
          className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs"
        >
          {authError}
        </div>
      )}

      {/* Google Sign-Up */}
      <div className="mb-5">
        <GoogleSignButton
          label={`Sign up with Google as ${accountType === 'business' ? 'Business Client' : 'Contributor'}`}
          loading={googleLoading}
          onClick={handleGoogleSignup}
        />
      </div>

      <div className="relative flex items-center justify-center mb-5">
        <div className="border-t border-zinc-200 w-full" />
        <span className="bg-white px-3 text-[11px] font-mono uppercase tracking-wider text-zinc-400 shrink-0">
          Or continue with email
        </span>
        <div className="border-t border-zinc-200 w-full" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label htmlFor="register-name" className="block text-xs font-medium text-zinc-700 mb-1.5">
            {accountType === 'business' ? 'Lead Contact Full Name' : 'Full Legal Name'}
          </label>
          <input
            id="register-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Chidinma Okafor"
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50/70 border border-zinc-200 text-xs text-zinc-950 placeholder-zinc-400 focus:bg-white focus:outline-hidden focus:border-zinc-900 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="register-email" className="block text-xs font-medium text-zinc-700 mb-1.5">
            {accountType === 'business' ? 'Corporate Work Email' : 'Email Address'}
          </label>
          <input
            id="register-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={accountType === 'business' ? 'name@company.com' : 'you@domain.com'}
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50/70 border border-zinc-200 text-xs text-zinc-950 placeholder-zinc-400 focus:bg-white focus:outline-hidden focus:border-zinc-900 transition-colors"
          />
        </div>

        {accountType === 'business' ? (
          <div>
            <label htmlFor="register-org" className="block text-xs font-medium text-zinc-700 mb-1.5">
              Company / Organization Name
            </label>
            <input
              id="register-org"
              type="text"
              required
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="e.g. Synthetix AI Research Inc."
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50/70 border border-zinc-200 text-xs text-zinc-950 placeholder-zinc-400 focus:bg-white focus:outline-hidden focus:border-zinc-900 transition-colors"
            />
          </div>
        ) : (
          <div>
            <label htmlFor="register-domain" className="block text-xs font-medium text-zinc-700 mb-1.5">
              Primary Domain Competency
            </label>
            <select
              id="register-domain"
              value={domainInterest}
              onChange={(e) => setDomainInterest(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50/70 border border-zinc-200 text-xs text-zinc-950 focus:bg-white focus:outline-hidden focus:border-zinc-900 cursor-pointer"
            >
              <option value="African Languages">African Languages &amp; Cultural Fluency</option>
              <option value="Voice & Speech Collection">Voice &amp; Speech Collection</option>
              <option value="Audio Transcription">Audio Transcription (Pidgin &amp; Local Languages)</option>
              <option value="Image Annotation">Image &amp; Video Annotation</option>
              <option value="Coding and Software Engineering">Coding &amp; Software Engineering</option>
              <option value="Mathematics">Advanced Mathematics &amp; Proof Verification</option>
              <option value="General AI Training">General Reasoning &amp; AI Evaluation</option>
            </select>
          </div>
        )}

        <div>
          <label htmlFor="register-password" className="block text-xs font-medium text-zinc-700 mb-1.5">
            Create Secure Password
          </label>
          <input
            id="register-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 characters"
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50/70 border border-zinc-200 text-xs text-zinc-950 placeholder-zinc-400 focus:bg-white focus:outline-hidden focus:border-zinc-900 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Register as {accountType === 'business' ? 'Business Client' : 'Contributor'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 text-[11px] text-zinc-500 leading-relaxed mb-6">
        <span className="font-semibold text-zinc-800 block mb-0.5">Administrative Staff Accounts</span>
        Administrative credentials cannot be registered publicly and are provisioned directly by Bever Operations.
      </div>

      <div className="text-center text-xs text-zinc-500">
        Already have an account?{' '}
        <Link href="/login" className="text-zinc-950 font-medium hover:underline">
          Sign in here
        </Link>
      </div>
    </AuthLayout>
  );
}
