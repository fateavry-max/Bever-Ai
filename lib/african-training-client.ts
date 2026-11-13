import type { UserSession } from '@/context/AuthContext';

export function buildBeverHeaders(user: UserSession | null): HeadersInit {
  if (!user) {
    return {
      'Content-Type': 'application/json',
      'x-bever-role': 'guest',
    };
  }

  return {
    'Content-Type': 'application/json',
    'x-bever-role': user.role,
    'x-bever-email': user.email,
    'x-bever-name': user.name,
    'x-bever-id': user.applicantId,
  };
}
