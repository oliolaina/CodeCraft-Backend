import { apiRequest, setToken } from './client';
import type { AuthResponse, UserProfile } from './types';

export async function registerUser(
  username: string,
  password: string,
  email = ''
): Promise<AuthResponse> {
  const data = await apiRequest<AuthResponse>('/api/auth/register/', {
    method: 'POST',
    body: JSON.stringify({ username, email: email || '', password })
  });
  setToken(data.token);
  return data;
}

export async function loginUser(username: string, password: string): Promise<AuthResponse> {
  const data = await apiRequest<AuthResponse>('/api/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
  setToken(data.token);
  return data;
}

export async function fetchMe(): Promise<UserProfile> {
  return apiRequest<UserProfile>('/api/auth/me/');
}

export function clearToken(): void {
  setToken(null);
}
