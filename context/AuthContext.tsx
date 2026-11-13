'use client';

import React, { createContext, useContext, useEffect, useSyncExternalStore } from 'react';
import { signOutFirebase, testFirestoreConnection } from '@/lib/firebase';

export type UserRole = 'contributor' | 'business' | 'admin';

export interface UserSession {
  email: string;
  name: string;
  role: UserRole;
  applicantId: string;
  orgName?: string;
  avatarInitials: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  user: UserSession | null;
  userEmail: string | null;
  applicantId: string | null;
  role: UserRole | null;
  isInitialized: boolean;
  login: (email: string, role?: UserRole, name?: string, id?: string, orgName?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  userEmail: null,
  applicantId: null,
  role: null,
  isInitialized: false,
  login: () => {},
  logout: () => {},
});

function subscribeAuth(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('bever-auth-changed', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('bever-auth-changed', callback);
  };
}

let cachedSessionRaw = '';

function getStoredAuthSnapshot() {
  if (typeof window === 'undefined') return 'null';
  try {
    const raw = localStorage.getItem('bever-session');
    if (!raw) {
      const legacyEmail = localStorage.getItem('bever-user-email');
      const legacyId = localStorage.getItem('bever-applicant-id');
      if (legacyEmail) {
        const prefix = legacyEmail.split('@')[0] || 'Contributor';
        const derivedName = prefix
          .split(/[._-]/)
          .filter(Boolean)
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ');
        const initials = derivedName
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase();
        const legacySession: UserSession = {
          email: legacyEmail,
          name: derivedName || 'Contributor',
          role: 'contributor',
          applicantId: legacyId || 'BEV-98124',
          avatarInitials: initials || 'BC',
        };
        const str = JSON.stringify(legacySession);
        localStorage.setItem('bever-session', str);
        cachedSessionRaw = str;
        return str;
      }
      return 'null';
    }
    if (raw !== cachedSessionRaw) {
      cachedSessionRaw = raw;
    }
    return cachedSessionRaw;
  } catch {
    return 'null';
  }
}

const getStoredAuthServerSnapshot = () => 'null';

function deriveNameFromEmail(email: string): string {
  const prefix = email.split('@')[0] || '';
  const cleaned = prefix
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
  return cleaned || 'Bever Member';
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const sessionRaw = useSyncExternalStore(subscribeAuth, getStoredAuthSnapshot, getStoredAuthServerSnapshot);

  useEffect(() => {
    void testFirestoreConnection();
  }, []);

  let user: UserSession | null = null;
  if (sessionRaw && sessionRaw !== 'null') {
    try {
      user = JSON.parse(sessionRaw);
    } catch {
      user = null;
    }
  }

  const isLoggedIn = !!user;
  const userEmail = user?.email || null;
  const applicantId = user?.applicantId || null;
  const role = user?.role || null;

  const login = (
    email: string,
    userRole: UserRole = 'contributor',
    name?: string,
    id?: string,
    orgName?: string
  ) => {
    const resolvedName = name?.trim() || deriveNameFromEmail(email);

    const defaultId =
      id ||
      (userRole === 'admin'
        ? 'ADM-004'
        : userRole === 'business'
        ? `ORG-${Math.floor(1000 + Math.random() * 9000)}`
        : `BEV-${Math.floor(10000 + Math.random() * 90000)}`);

    const defaultOrg = userRole === 'business' ? orgName || 'Enterprise Partner' : undefined;

    const initials = resolvedName
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const session: UserSession = {
      email,
      name: resolvedName,
      role: userRole,
      applicantId: defaultId,
      orgName: defaultOrg,
      avatarInitials: initials || 'BM',
    };

    try {
      localStorage.setItem('bever-session', JSON.stringify(session));
      localStorage.setItem('bever-user-email', email);
      localStorage.setItem('bever-applicant-id', defaultId);
      window.dispatchEvent(new Event('bever-auth-changed'));
    } catch {}
  };

  const logout = () => {
    void signOutFirebase();
    try {
      localStorage.removeItem('bever-session');
      localStorage.removeItem('bever-user-email');
      localStorage.removeItem('bever-applicant-id');
      window.dispatchEvent(new Event('bever-auth-changed'));
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        userEmail,
        applicantId,
        role,
        isInitialized: true,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
