import React, { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { ProgressBar } from '../../components/progress-bar';
import { Button } from '../../components/button';
import { Text } from '../../components/typography';
import styles from '../page.module.css';
import profile_image from '../../assets/images/profile_image.svg';
import python_logo from '../../assets/images/python_logo.png';
import { useAuth } from '../../contexts/UserContext';
import { listCourses, getCourseCompletionPercent } from '../../api/coursesApi';
import type { Course } from '../../api/types';
import { getApiBase } from '../../api/client';

const ProfilePage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [percents, setPercents] = useState<Record<number, number>>({});
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await listCourses();
        if (cancelled) return;
        setCourses(list);
        const entries = await Promise.all(
          list.map(async (c) => {
            try {
              const p = await getCourseCompletionPercent(c.id);
              return [c.id, p.completion_percent] as const;
            } catch {
              return [c.id, 0] as const;
            }
          })
        );
        if (cancelled) return;
        setPercents(Object.fromEntries(entries));
      } catch (e) {
        if (!cancelled) setLoadError(e instanceof Error ? e.message : 'Ошибка загрузки');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!currentUser) {
    return null;
  }

  const adminUrl = `${getApiBase()}/admin/`;

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
      <main className={styles.main}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'left',
            gap: '5%',
            margin: '15px auto'
          }}
        >
          <img src={profile_image} alt='profile' />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '300px',
              justifyContent: 'flex-start'
            }}
          >
            <h1
              style={{
                color: '#00f0b1',
                margin: '32px 0 32px 5%',
                fontSize: '36px',
                fontFamily: 'monospace'
              }}
            >
              {currentUser.username}
            </h1>

            <div
              style={{
                fontFamily: 'Comfortaa',
                color: '#BBFAE9',
                margin: '0 0 0 5%',
                lineHeight: '1.5'
              }}
            >
              {currentUser.is_admin ? 'Роль: администратор' : 'Роль: студент'}
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              right: '10%',
              top: '114px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            {currentUser.is_admin && (
              <a
                href={adminUrl}
                target='_blank'
                rel='noreferrer'
                style={{
                  fontFamily: 'Comfortaa',
                  color: '#00F0B1',
                  textDecoration: 'none',
                  border: '1px solid rgba(0, 240, 177, 0.5)',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}
              >
                Управление учебными материалами
              </a>
            )}
            <Button onClick={logout} label='Выйти из аккаунта' sizeType='little' />
          </div>
        </div>

        <Text
          style={{
            fontFamily: 'Comfortaa',
            color: '#BBFAE9',
            margin: '40px 0 40px 0',
            lineHeight: '1.7'
          }}
        >
          Прогресс обучения синхронизируется с сервером.
        </Text>

        {loadError && <Text style={{ color: '#FD9E02' }}>{loadError}</Text>}

        {courses.map((course) => (
          <ProgressBar
            key={course.id}
            icon={<img src={python_logo} alt='' />}
            title={course.title}
            percent={percents[course.id] ?? 0}
          />
        ))}

        {courses.length === 0 && !loadError && (
          <Text>Пока нет курсов на платформе.</Text>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
