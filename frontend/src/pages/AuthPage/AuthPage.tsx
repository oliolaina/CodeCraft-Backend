import styles from '../page.module.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/UserContext';
import { AuthForm } from '../../components/auth-form';
import { Footer } from '../../components/footer';
import { Heading } from '../../components/typography';

const AuthPage: React.FC = () => {
  const { login, register, currentUser, authLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && currentUser) {
      navigate('/profile');
    }
  }, [currentUser, authLoading, navigate]);

  const handleLogin = async (username: string, password: string) => {
    if (!username.trim()) {
      setError('Введите имя пользователя');
      return;
    }
    if (password.length < 8) {
      setError('Пароль должен быть не короче 8 символов');
      return;
    }
    const result = await login(username, password);
    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.error || 'Ошибка входа');
    }
  };

  const handleRegister = async (username: string, password: string) => {
    if (!username.trim()) {
      setError('Введите имя пользователя');
      return;
    }
    if (password.length < 8) {
      setError('Пароль должен быть не короче 8 символов');
      return;
    }
    const result = await register(username, password);
    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.error || 'Ошибка регистрации');
    }
  };

  if (authLoading) {
    return null;
  }

  return (
    <div className={styles.page}>
      <Heading
        style={{
          color: '#00f0b1',
          margin: '32px auto',
          fontSize: '28px',
          fontFamily: 'monospace',
          textAlign: 'center'
        }}
      >
        Вход
      </Heading>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '60%',
          margin: '5vh auto 0'
        }}
      >
        <AuthForm onLogin={handleLogin} onRegister={handleRegister} error={error} />
        <Link to='/' style={{ margin: '16px auto', fontFamily: 'Comfortaa', color: '#fff' }}>
          На главную
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
