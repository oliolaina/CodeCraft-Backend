import { useState, useEffect, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext, AuthResult } from './contexts/UserContext';
import { clearToken, fetchMe, loginUser, registerUser } from './api/authApi';
import { getToken } from './api/client';
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import CoursePage from './pages/CoursePage/CoursePage';
import LessonPage from './pages/LessonPage/LessonPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import BlogPage from './pages/BlogPage/BlogPage';
import AuthPage from './pages/AuthPage/AuthPage';
import { PrivateRoute } from './components/private-route';
import type { UserProfile } from './api/types';

function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setCurrentUser(null);
      setAuthLoading(false);
      return;
    }
    try {
      const me = await fetchMe();
      setCurrentUser(me);
    } catch {
      setCurrentUser(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(async (username: string, password: string): Promise<AuthResult> => {
    try {
      const { user } = await loginUser(username, password);
      setCurrentUser(user);
      return { success: true };
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : 'Ошибка входа' };
    }
  }, []);

  const register = useCallback(async (username: string, password: string): Promise<AuthResult> => {
    try {
      const { user } = await registerUser(username, password, '');
      setCurrentUser(user);
      return { success: true };
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : 'Ошибка регистрации'
      };
    }
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setCurrentUser(null);
  }, []);

  const authValue = useMemo(
    () => ({
      currentUser,
      authLoading,
      isAuthenticated: Boolean(currentUser),
      login,
      register,
      logout,
      refreshUser
    }),
    [currentUser, authLoading, login, register, logout, refreshUser]
  );

  return (
    <AuthContext.Provider value={authValue}>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/catalog' element={<CatalogPage />} />
          <Route
            path='/course/:courseId'
            element={
              <PrivateRoute>
                <CoursePage />
              </PrivateRoute>
            }
          />
          <Route
            path='/lesson/:lessonId'
            element={
              <PrivateRoute>
                <LessonPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path='/blog' element={<BlogPage />} />
          <Route path='/auth' element={<AuthPage />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
