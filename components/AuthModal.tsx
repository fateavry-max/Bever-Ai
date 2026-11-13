'use client';

import React, { useState } from 'react';
import { X, Lock, Mail } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

export function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid contributor email.');
      return;
    }
    if (!password.trim() || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError('');
    onLoginSuccess(email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-black/[0.08] shadow-2xl overflow-hidden p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
          aria-label="Close login modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#09090B] text-white flex items-center justify-center font-semibold text-sm mb-3">
            B
          </div>
          <h3 className="text-xl font-semibold text-[#09090B]">
            Log in to Bever
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Access your active contributor task queue and workspace.
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label htmlFor="auth-email" className="block font-medium text-zinc-700 mb-1">
              Contributor Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contributor@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-zinc-50 border border-black/[0.08] text-[#09090B] focus:outline-hidden focus:border-zinc-900 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="auth-password" className="block font-medium text-zinc-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-zinc-50 border border-black/[0.08] text-[#09090B] focus:outline-hidden focus:border-zinc-900 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-xs font-medium text-white bg-[#09090B] rounded-full hover:bg-zinc-800 transition-colors shadow-xs cursor-pointer"
          >
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
