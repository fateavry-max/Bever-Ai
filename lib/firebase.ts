'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

let connectionTested = false;
export async function testFirestoreConnection(): Promise<void> {
  if (connectionTested || typeof window === 'undefined') return;
  connectionTested = true;
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}

export interface GoogleSignupOptions {
  role: 'contributor' | 'business';
  orgName?: string;
  domainInterest?: string;
}

export interface GoogleSignupResult {
  firebaseUser: FirebaseUser;
  email: string;
  displayName: string;
  role: 'contributor' | 'business';
  orgName?: string;
  isNewAccount: boolean;
}

export async function authenticateWithGoogle(
  options: GoogleSignupOptions
): Promise<GoogleSignupResult> {
  const result = await signInWithPopup(auth, googleProvider);
  const fbUser = result.user;

  if (!fbUser.email) {
    throw new Error('Google account did not return an email address.');
  }

  const cleanName = (fbUser.displayName || fbUser.email.split('@')[0] || 'Bever Member')
    .trim()
    .slice(0, 120);
  const cleanEmail = fbUser.email.trim().slice(0, 200);
  const userPath = `users/${fbUser.uid}`;
  const userRef = doc(db, 'users', fbUser.uid);

  let isNewAccount = false;
  let resolvedRole: 'contributor' | 'business' = options.role;
  let resolvedOrgName = options.role === 'business' ? (options.orgName || 'Enterprise Partner').trim().slice(0, 140) : undefined;

  try {
    const existingSnap = await getDoc(userRef);
    if (!existingSnap.exists()) {
      isNewAccount = true;
      const payload: Record<string, unknown> = {
        uid: fbUser.uid,
        email: cleanEmail,
        displayName: cleanName,
        role: options.role,
        authProvider: 'google',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      if (resolvedOrgName) {
        payload.orgName = resolvedOrgName;
      }
      if (options.role === 'contributor' && options.domainInterest) {
        payload.domainInterest = options.domainInterest.trim().slice(0, 120);
      }
      try {
        await setDoc(userRef, payload);
      } catch (writeErr) {
        handleFirestoreError(writeErr, OperationType.CREATE, userPath);
      }
    } else {
      const data = existingSnap.data();
      if (data.role === 'contributor' || data.role === 'business') {
        resolvedRole = data.role;
      }
      if (typeof data.orgName === 'string' && data.orgName.trim()) {
        resolvedOrgName = data.orgName.trim();
      }
      try {
        await setDoc(
          userRef,
          {
            displayName: cleanName,
            ...(resolvedOrgName ? { orgName: resolvedOrgName } : {}),
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (updateErr) {
        handleFirestoreError(updateErr, OperationType.UPDATE, userPath);
      }
    }
  } catch (err) {
    // Allow auth session to complete if Firestore read/write threw a non-offline permission/diagnostic error already logged
    if (err instanceof Error && err.message.startsWith('{')) {
      throw err;
    }
    handleFirestoreError(err, OperationType.GET, userPath);
  }

  return {
    firebaseUser: fbUser,
    email: cleanEmail,
    displayName: cleanName,
    role: resolvedRole,
    orgName: resolvedOrgName,
    isNewAccount,
  };
}

export async function signOutFirebase(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch {
    // Ignore if already signed out
  }
}
