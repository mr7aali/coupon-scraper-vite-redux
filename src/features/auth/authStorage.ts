import type { AuthState } from './authSlice';

const AUTH_STORAGE_KEY = 'coupon-admin-auth';

export function loadAuthState(): Pick<AuthState, 'admin' | 'token'> {
  try {
    const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!rawValue) {
      return { admin: null, token: null };
    }

    const parsed = JSON.parse(rawValue) as Pick<AuthState, 'admin' | 'token'>;
    return {
      admin: parsed.admin ?? null,
      token: parsed.token ?? null,
    };
  } catch {
    return { admin: null, token: null };
  }
}

export function saveAuthState(state: Pick<AuthState, 'admin' | 'token'>) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
}

export function clearAuthState() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}
