import { createContext, useContext } from 'react';
import type { UserProfile } from '../api/types';

export type AuthResult = { success: true } | { success: false; error: string };

export type AuthContextType = {
  currentUser: UserProfile | null;
  authLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<AuthResult>;
  register: (username: string, password: string) => Promise<AuthResult>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  authLoading: true,
  isAuthenticated: false,
  login: async () => ({ success: false, error: 'Контекст не инициализирован' }),
  register: async () => ({ success: false, error: 'Контекст не инициализирован' }),
  logout: () => {},
  refreshUser: async () => {}
});

export const useAuth = () => useContext(AuthContext);
