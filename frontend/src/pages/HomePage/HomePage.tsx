import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { Cover } from '../../components/cover';
import { FeatureCard } from '../../components/feature-card';
import { AuthForm } from '../../components/auth-form';
import { useAuth } from '../../contexts/UserContext';
import { Heading, Text } from '../../components/typography';
import styles from '../page.module.css';
import cover from '../../assets/images/cover_main.png';
import pic1 from '../../assets/images/mainPagePics/pic1.svg';
import pic2 from '../../assets/images/mainPagePics/pic2.svg';
import pic3 from '../../assets/images/mainPagePics/pic3.svg';

const HomePage: React.FC = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className={styles.page}>
      <Header
        links={[
          { label: 'О проекте', to: '/#first' },
          { label: 'Блог', to: '/blog' },
          { label: 'Каталог', to: '/catalog' }
        ]}
        profileLink={{ label: 'Профиль', to: '/profile' }}
      />
      <Cover
        onStart={() => navigate('/catalog')}
        onCppClick={() => {}}
        onPythonClick={() => {}}
        backgroundUrl={cover}
      />
      <main className={styles.main}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '75%',
            gap: 24,
            flexWrap: 'wrap',
            margin: '40px auto'
          }}
        >
          <div
            id='first'
            style={{
              display: 'flex',
              gap: 24,
              justifyContent: 'space-between',
              margin: '50px 0'
            }}
          >
            <FeatureCard
              title='Практика с первого дня'
              text='Теория и задачи в одном месте. Теория знакомит с новой темой, а практические задания закрепляют знания.'
            />
            <img src={pic1} alt='pic1' />
          </div>
          <div
            style={{
              display: 'flex',
              gap: 50,
              justifyContent: 'space-between',
              margin: '50px 0'
            }}
          >
            <img src={pic2} alt='pic2' />
            <FeatureCard
              title='Для всех уровней'
              text='Найдите задачи для любого уровня: от новичка до эксперта. Развивайтесь в своем темпе.'
            />
          </div>
          <div
            style={{
              display: 'flex',
              gap: 24,
              justifyContent: 'space-between',
              margin: '50px 0'
            }}
          >
            <FeatureCard
              title='Прогресс всегда под рукой'
              text='Сохранение результатов и отслеживание вашего прогресса в обучении на сервере.'
            />
            <img src={pic3} alt='pic3' />
          </div>
        </div>

        <Heading
          size={1}
          color='#00F0B1'
          style={{
            fontFamily: 'Comfortaa',
            textShadow: '0 0 20px #06A77D',
            color: '#00F0B1',
            textAlign: 'center'
          }}
        >
          Начни учиться прямо сейчас!
        </Heading>
        <AuthForm onLogin={handleLogin} onRegister={handleRegister} error={error} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
