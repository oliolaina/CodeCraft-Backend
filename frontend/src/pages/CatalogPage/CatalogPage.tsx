import React, { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { LessonCard } from '../../components/lesson-card';
import { Heading, Text } from '../../components/typography';
import styles from '../page.module.css';
import { listCourses } from '../../api/coursesApi';
import type { Course } from '../../api/types';

const CatalogPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await listCourses();
        if (!cancelled) setCourses(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Не удалось загрузить курсы');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
        <Heading
          size={1}
          color='#FD9E02'
          style={{
            fontFamily: 'Comfortaa',
            textShadow: '0 0 20px #FFC76E',
            color: '#FD9E02',
            textAlign: 'center'
          }}
        >
          Каталог курсов
        </Heading>

        {error && (
          <Text style={{ color: '#FD9E02', margin: '24px auto', textAlign: 'center' }}>
            {error}
          </Text>
        )}

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            width: '90%',
            margin: '32px auto',
            justifyContent: 'center'
          }}
        >
          {courses.map((course) => (
            <LessonCard
              key={course.id}
              title={course.title}
              level='easy'
              description={course.description || 'Нажмите, чтобы открыть программу курса'}
              to={`/course/${course.id}`}
            />
          ))}
        </div>
        {!error && courses.length === 0 && (
          <Text style={{ textAlign: 'center' }}>Курсов пока нет. Добавьте их в админке Django.</Text>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;
