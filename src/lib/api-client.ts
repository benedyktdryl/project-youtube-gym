import { redirect } from 'react-router-dom';

const API_BASE = '/api';
const TOKEN_KEY = 'trainflow-token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token?: string | null) {
  if (!token) {
    localStorage.removeItem(TOKEN_KEY);
    return;
  }
  localStorage.setItem(TOKEN_KEY, token);
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? getToken() : null;
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');

  if (token) {
    headers.set('x-user-id', token);
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    throw redirect('/login');
  }

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    const error: any = new Error(errorBody.error || 'Request failed');
    error.status = res.status;
    throw error;
  }

  return res.json() as Promise<T>;
}
