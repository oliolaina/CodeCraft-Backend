import type { Paginated } from './types';

const TOKEN_KEY = 'auth_token';

export function getApiBase(): string {
  const base = process.env.API_BASE_URL || 'http://127.0.0.1:8000';
  return base.replace(/\/$/, '');
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null): void {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

function buildHeaders(init?: HeadersInit, jsonBody?: boolean): Headers {
  const h = new Headers(init);
  if (jsonBody && !h.has('Content-Type')) {
    h.set('Content-Type', 'application/json');
  }
  const token = getToken();
  if (token) {
    h.set('Authorization', `Token ${token}`);
  }
  return h;
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = path.startsWith('http') ? path : `${getApiBase()}${path.startsWith('/') ? '' : '/'}${path}`;
  const hasBody = options.body !== undefined && options.body !== null;
  const headers = buildHeaders(options.headers, hasBody);
  const res = await fetch(url, { ...options, headers });
  const text = await res.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }
  if (res.status === 401) {
    setToken(null);
  }
  if (!res.ok) {
    const detail =
      typeof data === 'object' && data !== null && 'detail' in data
        ? String((data as { detail: unknown }).detail)
        : typeof data === 'object' && data !== null
          ? JSON.stringify(data)
          : res.statusText;
    throw new Error(detail || `HTTP ${res.status}`);
  }
  return data as T;
}

/** Собрать все страницы DRF PageNumberPagination. */
export async function fetchAllPages<T>(path: string): Promise<T[]> {
  const sep = path.includes('?') ? '&' : '?';
  let next: string | null = `${getApiBase()}${path.startsWith('/') ? '' : '/'}${path}${sep}page=1`;
  const out: T[] = [];
  while (next) {
    const page: Paginated<T> = await apiRequest<Paginated<T>>(next);
    out.push(...page.results);
    next = page.next;
  }
  return out;
}
